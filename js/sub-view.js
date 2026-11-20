/* =========================================================
   sub-view.js (Complete Version)
   - 20-tap passcode unlock (7777)
   - Prototype selection menu (with Trial badge)
   - UFO Catcher (30 piled-up prizes: 12 Jo-kun + 18 fraud plates with popup tips)
   ========================================================= */

(function () {
  "use strict";

  const SV_PASSCODE = "7777";
  const SV_REQUIRED_TAPS = 20;
  const SV_TAP_TIMEOUT_MS = 4000;

  let svTapCount = 0;
  let svTapTimer = null;

  let svCraneX = 50;
  let svIsAnimating = false;
  let svMoveInterval = null;
  let svPrizes = [];
  let svCaughtCount = 0;

  const svRegisteredGames = [];

  function registerSubGame(gameDef) {
    if (!gameDef || !gameDef.id || !gameDef.title || typeof gameDef.onOpen !== "function") return;
    if (!svRegisteredGames.some((g) => g.id === gameDef.id)) {
      svRegisteredGames.push(gameDef);
    }
  }

  window.SubViewBridge = {
    registerGame: registerSubGame,
    openMenu: openMenuOverlay
  };

  // 12 Jo-kun characters + 18 anti-fraud text plates = 30 piled prizes
  function getAllPrizeEntries() {
    const chars = (typeof IMAGE_ASSETS !== "undefined" && IMAGE_ASSETS.characters)
      ? IMAGE_ASSETS.characters
      : {};

    return [
      { kind: "img",  label: "通常ジョーくん",       src: chars.joe || "resource/images/ジョー君通常.png", tip: "基本のジョーくん。日頃から防犯意識を高く持とう！" },
      { kind: "img",  label: "喜びジョーくん",       src: chars.joeHappy || "resource/images/ジョー君喜.png", tip: "詐欺を見破ると嬉しいね！冷静な判断が身を守る！" },
      { kind: "img",  label: "哀しみジョーくん",     src: chars.joeSad || "resource/images/ジョー君哀.png", tip: "被害に遭うと悲しい思いをします。怪しい話は絶対に信じない！" },
      { kind: "img",  label: "驚きジョーくん",       src: chars.joeSurprised || "resource/images/ジョー君驚き.png", tip: "「えっ、自分が狙われるの？」油断禁物、誰でも標的になります。" },
      { kind: "img",  label: "考えるジョーくん",     src: chars.joeThinking || "resource/images/ジョー君考える.png", tip: "「これって本当かな？」と一呼吸置いて考えることが詐欺を防ぐコツ！" },
      { kind: "img",  label: "応援ジョーくん",       src: chars.joeCheer || "resource/images/ジョー君応援.png", tip: "家族や地域のみんなで声を掛け合い、詐欺を追い出そう！" },
      { kind: "img",  label: "困りジョーくん",       src: chars.joeWorry || "resource/images/ジョー君困り.png", tip: "焦って対応すると罠にハマるよ。困ったら家族や警察に相談！" },
      { kind: "img",  label: "怒りジョーくん",       src: chars.joeAngry || "resource/images/ジョー君怒.png", tip: "巧妙な手口でだます詐欺グループを許さない！" },
      { kind: "img",  label: "リラックスジョーくん", src: chars.joeRelax || "resource/images/ジョー君楽.png", tip: "日頃から落ち着いた心構えで、防犯3原則を守ろう！" },
      { kind: "img",  label: "金ジョーくん",         src: chars.joeGold || "resource/images/金ジョー君.png", tip: "レアな金ジョーくん！財産を完全に守り抜いた証拠！" },
      { kind: "img",  label: "銀ジョーくん",         src: chars.joeSilver || "resource/images/銀ジョー君.png", tip: "銀のジョーくん！日頃の防犯対策がバッチリできているね！" },
      { kind: "img",  label: "銅ジョーくん",         src: chars.joeBronze || "resource/images/銅ジョー君.png", tip: "銅のジョーくん！さらに防犯知識を深めていこう！" },
      
      { kind: "text", label: "🚨 詐欺に気を付けよう！",       colorClass: "", tip: "怪しい電話やメールはすぐ切る・開かない！" },
      { kind: "text", label: "🛡️ 話さない・払わない・騙されない", colorClass: "is-green", tip: "大分県警が推奨する特殊詐欺対策の3原則！" },
      { kind: "text", label: "📞 迷ったら #9110 へ相談！",  colorClass: "is-blue", tip: "警察相談専用電話「#9110」や最寄りの警察署へすぐ連絡！" },
      { kind: "text", label: "👮 ニセ警察詐欺に注意",         colorClass: "", tip: "「逮捕する」と脅して現金を要求する手口は100%詐欺！" },
      { kind: "text", label: "💼 闇バイトは犯罪の実行役",     colorClass: "is-green", tip: "「運ぶだけ」の仕事は特殊詐欺！絶対に加担しない！" },
      { kind: "text", label: "💸 SNS型投資・ロマンス詐欺",   colorClass: "is-blue", tip: "SNSで知り合った外国籍の相手や投資話は詐欺を疑う！" },
      { kind: "text", label: "📄 架空請求・未納料金",         colorClass: "", tip: "身に覚えのない請求は無視！電子マネーを買わせる手口は詐欺！" },
      { kind: "text", label: "💰 還付金詐欺（ATM操作）",     colorCategory: "", tip: "ATMで税金や医療費が戻ると言われたら詐欺！" },
      { kind: "text", label: "💻 サポート詐欺（偽警告）",     colorClass: "is-green", tip: "PCの警告音や電話番号にかけない！ブラウザを閉じる！" },
      { kind: "text", label: "💳 キャッシュカード詐欺",     colorClass: "is-blue", tip: "警察や銀行がカードを預かったり暗証番号を聞くことは絶対ない！" },
      { kind: "text", label: "📦 宅配・不在通知の偽SMS",     colorClass: "", tip: "リンク先の偽アプリから個人情報やパスワードが盗まれる！" },
      { kind: "text", label: "🌐 国際電話番号（＋）の悪用",    colorClass: "is-green", tip: "海外からの不審な電話やSMSは出ない・折り返さない！" },
      { kind: "text", label: "🏷️ オレオレ詐欺・預貯金詐欺",   colorClass: "is-blue", tip: "「オレだけど…」と家族を装う電話は必ず元の番号にかけ直す！" },
      { kind: "text", label: "🎫 チケット・グッズ転売詐欺",   colorClass: "", tip: "SNSでの個人間先払い取引は99%お金が持ち逃げされる！" },
      { kind: "text", label: "🖨️ 火災保険・屋根点検商法",     colorClass: "is-green", tip: "「無料で点検する」と訪問する業者は瓦を壊して高額契約させる！" },
      { kind: "text", label: "🪙 暗号資産・電子マネー送金",   colorClass: "is-blue", tip: "指定された電子マネーや仮想通貨の送金要求はすべて詐欺！" },
      { kind: "text", label: "📢 マイナンバー不審通知",       colorClass: "", tip: "行政機関がSMSで暗証番号やパスワード入力を求めることはない！" },
      { kind: "text", label: "⚠️ 怪しい話は必ず確認・相談",   colorClass: "is-green", tip: "一人で判断せず、家族や警察に相談することが一番の防御！" }
    ];
  }

  // 30景品用の床積み座標（下部にゴチャ積み）
  const SV_LAYOUT_SLOTS = [
    { x: 12, y: 72 }, { x: 24, y: 75 }, { x: 36, y: 73 }, { x: 48, y: 76 }, { x: 60, y: 73 }, { x: 72, y: 75 }, { x: 84, y: 72 },
    { x: 18, y: 82 }, { x: 30, y: 80 }, { x: 42, y: 83 }, { x: 54, y: 81 }, { x: 66, y: 83 }, { x: 78, y: 80 },
    { x: 15, y: 88 }, { x: 27, y: 89 }, { x: 39, y: 87 }, { x: 51, y: 90 }, { x: 63, y: 88 }, { x: 75, y: 89 }, { x: 85, y: 87 },
    { x: 20, y: 66 }, { x: 34, y: 68 }, { x: 48, y: 65 }, { x: 62, y: 67 }, { x: 76, y: 66 },
    { x: 14, y: 54 }, { x: 29, y: 57 }, { x: 44, y: 53 }, { x: 59, y: 56 }, { x: 74, y: 54 }
  ];

  function createSubViewDOM() {
    if (document.getElementById("sv-auth-overlay")) return;

    // 1. パスコード画面
    const authOverlay = document.createElement("div");
    authOverlay.id = "sv-auth-overlay";
    authOverlay.className = "sv-overlay is-hidden";
    authOverlay.innerHTML = `
      <div class="sv-auth-card">
        <span class="sv-auth-badge">🔒 SECRET ACCESS</span>
        <h3 class="sv-auth-title">秘密のパスワードを入力</h3>
        <p class="sv-auth-desc">4桁のパスワードを入力すると、おまけのミニゲームが開きます。</p>
        <input type="password" id="sv-auth-input" class="sv-auth-input" inputmode="numeric" maxlength="8" placeholder="••••">
        <p id="sv-auth-error" class="sv-auth-error is-hidden">⚠️ パスワードが違います。もう一度入力してください。</p>
        <div class="sv-auth-btns">
          <button type="button" id="sv-auth-submit" class="sv-auth-btn-primary">決定</button>
          <button type="button" id="sv-auth-cancel" class="sv-auth-btn-cancel">タイトルへ戻る</button>
        </div>
      </div>
    `;
    document.body.appendChild(authOverlay);

    // 2. ミニゲーム選択画面
    const menuOverlay = document.createElement("div");
    menuOverlay.id = "sv-menu-overlay";
    menuOverlay.className = "sv-overlay is-hidden";
    menuOverlay.innerHTML = `
      <div class="sv-menu-card">
        <div class="sv-beta-badge">
          <h2>試作品</h2>
          <p>※まだ試験段階中です</p>
        </div>
        <header class="sv-menu-header">
          <span class="sv-menu-badge">🎮 SECRET BONUS ROOM</span>
          <h2 class="sv-menu-title">おまけミニゲーム選択</h2>
          <p class="sv-menu-sub">あそびたいミニゲームをえらんでね！</p>
        </header>
        <div class="sv-menu-list" id="sv-menu-list"></div>
        <div class="sv-menu-notice">
          🛡️ 息抜きのミニゲーム中も、実生活での詐欺には要注意！<br>
          怪しい話には「話さない・払わない・騙されない」を忘れずに！
        </div>
        <button type="button" id="sv-menu-exit" class="sv-menu-exit-btn">◀ タイトルへ戻る</button>
      </div>
    `;
    document.body.appendChild(menuOverlay);

    // 3. UFOキャッチャー本体
    const gameOverlay = document.createElement("div");
    gameOverlay.id = "sv-game-overlay";
    gameOverlay.className = "sv-overlay is-hidden";
    gameOverlay.innerHTML = `
      <div class="sv-stage-window">
        <header class="sv-header">
          <h2 class="sv-title">🛸 ジョーくんUFOキャッチャー</h2>
          <span id="sv-counter" class="sv-counter">ゲット: 0 / 30</span>
        </header>

        <p class="sv-guide">
          【操作方法】「◀ 左へ」「▶ 右へ」でクレーンを動かし、「⬇️ つかむ！」ボタンでキャッチしよう！
        </p>

        <div class="sv-case" id="sv-case">
          <div class="sv-rail"></div>
          <div class="sv-crane is-open" id="sv-crane">
            <div class="sv-trolley"></div>
            <div class="sv-wire" id="sv-wire"></div>
            <div class="sv-claw">
              <div class="sv-claw-core"></div>
              <div class="sv-arm sv-arm-l"></div>
              <div class="sv-arm sv-arm-r"></div>
            </div>
            <div class="sv-caught-slot" id="sv-caught-slot"></div>
          </div>
          <div class="sv-items-layer" id="sv-items-layer"></div>
        </div>

        <div id="sv-result-banner" class="sv-result-banner is-hidden"></div>

        <div class="sv-controls">
          <button type="button" id="sv-btn-left" class="sv-ctrl-btn">◀ 左へ</button>
          <button type="button" id="sv-btn-catch" class="sv-ctrl-btn is-catch">⬇️ つかむ！</button>
          <button type="button" id="sv-btn-right" class="sv-ctrl-btn">▶ 右へ</button>
        </div>

        <div class="sv-notice-box">
          遊んでくれてありがとう！<br>
          楽しいゲームの外でも、詐欺には気を付けよう！<br>
          怪しい話はすぐに信じず、必ず確認しよう！
        </div>

        <div class="sv-footer-btns">
          <button type="button" id="sv-btn-reset" class="sv-btn-sub">🔄 ならべ直す</button>
          <button type="button" id="sv-btn-back-menu" class="sv-btn-sub sv-btn-menu">📋 ゲーム選択へ戻る</button>
          <button type="button" id="sv-btn-exit" class="sv-btn-sub sv-btn-exit">◀ タイトルへ戻る</button>
        </div>
      </div>
    `;
    document.body.appendChild(gameOverlay);

    registerSubGame({
      id: "crane",
      icon: "🛸",
      title: "ジョーくんUFOキャッチャー",
      desc: "全30種のジョーくん＋詐欺特徴プレートをクレーンでキャッチ！",
      onOpen: openGameStage
    });

    bindSubViewEvents();
  }

  function normalizeDigits(val) {
    return (val || "").trim().replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xFEE0));
  }

  function openAuthPrompt() {
    const authOverlay = document.getElementById("sv-auth-overlay");
    const input = document.getElementById("sv-auth-input");
    const errorEl = document.getElementById("sv-auth-error");
    if (input) input.value = "";
    if (errorEl) errorEl.classList.add("is-hidden");
    if (authOverlay) authOverlay.classList.remove("is-hidden");
    setTimeout(() => { if (input) input.focus(); }, 80);
  }

  function closeAuthPrompt() {
    const authOverlay = document.getElementById("sv-auth-overlay");
    if (authOverlay) authOverlay.classList.add("is-hidden");
  }

  function verifyAuthPrompt() {
    const input = document.getElementById("sv-auth-input");
    const errorEl = document.getElementById("sv-auth-error");
    const code = normalizeDigits(input ? input.value : "");

    if (code === SV_PASSCODE) {
      if (errorEl) errorEl.classList.add("is-hidden");
      closeAuthPrompt();
      openMenuOverlay();
    } else {
      if (errorEl) errorEl.classList.remove("is-hidden");
      if (input) { input.value = ""; input.focus(); }
    }
  }

  function openMenuOverlay() {
    const menuOverlay = document.getElementById("sv-menu-overlay");
    const listEl = document.getElementById("sv-menu-list");
    if (listEl) {
      listEl.innerHTML = "";
      svRegisteredGames.forEach((game) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "sv-menu-item-btn";
        btn.innerHTML = `
          <span class="sv-menu-item-icon">${game.icon || "🎮"}</span>
          <div class="sv-menu-item-info">
            <span class="sv-menu-item-title">${game.title}</span>
            <span class="sv-menu-item-desc">${game.desc || ""}</span>
          </div>
        `;
        btn.addEventListener("click", () => {
          closeMenuOverlay();
          game.onOpen();
        });
        listEl.appendChild(btn);
      });
    }
    if (menuOverlay) menuOverlay.classList.remove("is-hidden");
  }

  function closeMenuOverlay() {
    const menuOverlay = document.getElementById("sv-menu-overlay");
    if (menuOverlay) menuOverlay.classList.add("is-hidden");
  }

  function resetPrizes() {
    const layer = document.getElementById("sv-items-layer");
    const banner = document.getElementById("sv-result-banner");
    const caughtSlot = document.getElementById("sv-caught-slot");
    if (!layer) return;

    layer.innerHTML = "";
    if (caughtSlot) caughtSlot.innerHTML = "";
    if (banner) banner.classList.add("is-hidden");

    const entries = getAllPrizeEntries();
    const shuffledSlots = [...SV_LAYOUT_SLOTS].sort(() => Math.random() - 0.5);

    svPrizes = entries.map((entry, idx) => {
      const slot = shuffledSlots[idx];
      let el;

      if (entry.kind === "text") {
        el = document.createElement("div");
        el.className = `sv-text-prize ${entry.colorClass || ""}`;
        el.textContent = entry.label;
      } else {
        el = document.createElement("img");
        el.src = entry.src;
        el.alt = entry.label;
        el.className = "sv-item";
      }

      el.style.left = `${slot.x}%`;
      el.style.top = `${slot.y}%`;
      layer.appendChild(el);

      return {
        id: idx,
        kind: entry.kind,
        label: entry.label,
        tip: entry.tip,
        src: entry.src || null,
        colorClass: entry.colorClass || "",
        x: slot.x,
        y: slot.y,
        caught: false,
        el: el
      };
    });

    svCaughtCount = 0;
    svCraneX = 50;
    updateCranePosition();
    updateCounterUI();
  }

  function openGameStage() {
    resetPrizes();
    const gameOverlay = document.getElementById("sv-game-overlay");
    if (gameOverlay) gameOverlay.classList.remove("is-hidden");
  }

  function closeGameStage() {
    stopMovingCrane();
    const gameOverlay = document.getElementById("sv-game-overlay");
    if (gameOverlay) gameOverlay.classList.add("is-hidden");
  }

  function updateCranePosition() {
    const crane = document.getElementById("sv-crane");
    if (crane) crane.style.left = `${svCraneX}%`;
  }

  function updateCounterUI() {
    const counter = document.getElementById("sv-counter");
    if (counter) counter.textContent = `ゲット: ${svCaughtCount} / ${svPrizes.length}`;
  }

  function moveCrane(delta) {
    if (svIsAnimating) return;
    svCraneX = Math.max(10, Math.min(90, svCraneX + delta));
    updateCranePosition();
  }

  function startMovingCrane(delta) {
    if (svIsAnimating) return;
    stopMovingCrane();
    moveCrane(delta);
    svMoveInterval = setInterval(() => { moveCrane(delta); }, 90);
  }

  function stopMovingCrane() {
    if (svMoveInterval) {
      clearInterval(svMoveInterval);
      svMoveInterval = null;
    }
  }

  function setControlsDisabled(disabled) {
    ["sv-btn-left", "sv-btn-catch", "sv-btn-right", "sv-btn-reset"].forEach((id) => {
      const btn = document.getElementById(id);
      if (btn) btn.disabled = disabled;
    });
  }

  function triggerCatch() {
    if (svIsAnimating) return;
    stopMovingCrane();

    const crane = document.getElementById("sv-crane");
    const wire = document.getElementById("sv-wire");
    const caughtSlot = document.getElementById("sv-caught-slot");
    const banner = document.getElementById("sv-result-banner");
    const caseEl = document.getElementById("sv-case");
    if (!crane || !wire || !caseEl) return;

    svIsAnimating = true;
    setControlsDisabled(true);
    if (banner) banner.classList.add("is-hidden");
    if (caughtSlot) caughtSlot.innerHTML = "";

    crane.classList.remove("is-closed");
    crane.classList.add("is-open");

    let target = null;
    let minDist = Infinity;
    svPrizes.forEach((p) => {
      if (p.caught) return;
      const dist = Math.abs(p.x - svCraneX);
      if (dist <= 14 && dist < minDist) {
        minDist = dist;
        target = p;
      }
    });

    const caseHeight = caseEl.clientHeight || 310;
    const dropWireHeight = target
      ? Math.max(60, Math.round(caseHeight * (target.y / 100) - 52))
      : Math.round(caseHeight * 0.65);

    setTimeout(() => { wire.style.height = `${dropWireHeight}px`; }, 80);

    setTimeout(() => {
      crane.classList.remove("is-open");
      crane.classList.add("is-closed");

      if (target) {
        target.caught = true;
        target.el.classList.add("is-captured");
        if (caughtSlot) {
          if (target.kind === "text") {
            const plate = document.createElement("div");
            plate.className = `sv-caught-text-prize ${target.colorClass || ""}`;
            plate.textContent = target.label;
            caughtSlot.appendChild(plate);
          } else {
            const caughtImg = document.createElement("img");
            caughtImg.src = target.src;
            caughtImg.alt = target.label;
            caughtSlot.appendChild(caughtImg);
          }
        }
      }
    }, 840);

    setTimeout(() => { wire.style.height = "16px"; }, 1120);

    setTimeout(() => {
      if (caughtSlot) caughtSlot.innerHTML = "";
      crane.classList.remove("is-closed");
      crane.classList.add("is-open");

      if (target) {
        svCaughtCount += 1;
        updateCounterUI();
        if (banner) {
          banner.classList.remove("is-hidden", "is-miss");
          if (svCaughtCount >= svPrizes.length) {
            banner.textContent = `🏆 全30個コンプリート！【特徴】現実の詐欺に絶対負けない最強の防衛力！`;
          } else {
            banner.textContent = `🎉 「${target.label}」ゲット！【特徴】${target.tip}`;
          }
        }
      } else {
        if (banner) {
          banner.classList.remove("is-hidden");
          banner.classList.add("is-miss");
          banner.textContent = "おしい！もう少し景品の真上をねらってみよう！";
        }
      }

      svIsAnimating = false;
      setControlsDisabled(false);
    }, 1900);
  }

  function bindSubViewEvents() {
    const authSubmit = document.getElementById("sv-auth-submit");
    const authCancel = document.getElementById("sv-auth-cancel");
    const authInput = document.getElementById("sv-auth-input");

    if (authSubmit) authSubmit.addEventListener("click", verifyAuthPrompt);
    if (authCancel) authCancel.addEventListener("click", closeAuthPrompt);
    if (authInput) {
      authInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          verifyAuthPrompt();
        }
      });
    }

    const btnLeft = document.getElementById("sv-btn-left");
    const btnRight = document.getElementById("sv-btn-right");
    const btnCatch = document.getElementById("sv-btn-catch");
    const btnReset = document.getElementById("sv-btn-reset");
    const btnBackMenu = document.getElementById("sv-btn-back-menu");
    const btnExit = document.getElementById("sv-btn-exit");

    if (btnLeft) {
      btnLeft.addEventListener("mousedown", () => startMovingCrane(-5));
      btnLeft.addEventListener("touchstart", (e) => { e.preventDefault(); startMovingCrane(-5); }, { passive: false });
    }
    if (btnRight) {
      btnRight.addEventListener("mousedown", () => startMovingCrane(5));
      btnRight.addEventListener("touchstart", (e) => { e.preventDefault(); startMovingCrane(5); }, { passive: false });
    }

    window.addEventListener("mouseup", stopMovingCrane);
    window.addEventListener("touchend", stopMovingCrane);
    window.addEventListener("touchcancel", stopMovingCrane);

    if (btnCatch) btnCatch.addEventListener("click", triggerCatch);
    if (btnReset) btnReset.addEventListener("click", resetPrizes);
    if (btnBackMenu) {
      btnBackMenu.addEventListener("click", () => {
        closeGameStage();
        openMenuOverlay();
      });
    }
    if (btnExit) {
      btnExit.addEventListener("click", () => {
        closeGameStage();
        closeMenuOverlay();
      });
    }

    document.addEventListener("keydown", (e) => {
      const gameOverlay = document.getElementById("sv-game-overlay");
      if (!gameOverlay || gameOverlay.classList.contains("is-hidden")) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        moveCrane(-5);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        moveCrane(5);
      } else if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        triggerCatch();
      }
    });
  }

  function initTitleTrigger() {
    const titleJoeImg = document.getElementById("title-joe-image");
    const titleScreen = document.getElementById("screen-title");
    const startBtn = document.getElementById("btn-start");
    if (!titleJoeImg || !titleScreen) return;

    titleJoeImg.style.touchAction = "manipulation";
    titleJoeImg.style.userSelect = "none";
    titleJoeImg.style.webkitUserSelect = "none";

    titleJoeImg.addEventListener("click", () => {
      if (!titleScreen.classList.contains("active")) {
        svTapCount = 0;
        return;
      }

      svTapCount++;
      if (svTapTimer) clearTimeout(svTapTimer);
      svTapTimer = setTimeout(() => { svTapCount = 0; }, SV_TAP_TIMEOUT_MS);

      if (svTapCount >= SV_REQUIRED_TAPS) {
        svTapCount = 0;
        if (svTapTimer) clearTimeout(svTapTimer);
        openAuthPrompt();
      }
    });

    if (startBtn) {
      startBtn.addEventListener("click", () => {
        svTapCount = 0;
        if (svTapTimer) clearTimeout(svTapTimer);
      });
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    createSubViewDOM();
    initTitleTrigger();
  });
})();