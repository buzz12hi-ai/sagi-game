/* =========================================================
   sub-view-2.js
   Joe-kun Invader Arcade Style Sheet (50 enemies, 3 waves + bosses, accordion results)
   ========================================================= */

(function () {
  "use strict";

  let sv2Running = false;
  let sv2RafId = null;
  let sv2LastTime = 0;

  let sv2PlayerX = 50; // % (6〜94)
  let sv2MoveDir = 0;  // -1: 左, 0: 停止, 1: 右
  let sv2LastShotTime = 0;

  let sv2Enemies = [];
  let sv2Bullets = [];

  // ウェーブ進行管理
  // 1: 雑魚 17体
  // 2: 雑魚 17体
  // 3: 雑魚 16体
  // 4: ボス戦 (銀＆銅)
  // 5: 最終決戦 (金ボス)
  let sv2Wave = 1;
  let sv2WaveSpawnCount = 0;
  const SV2_WAVE_TOTALS = [0, 17, 17, 16]; 
  let sv2SpawnCooldown = 0;
  let sv2DestroyedScamNames = []; // このウェーブで撃ち落とした詐欺名称の蓄積

  const SV2_SCAM_DATABASE = [
    { name: "🚨 架空請求詐欺", desc: "身に覚えのない有料動画等の未納料金を名目に、SMSやハガキで連絡させ、電子マネーや銀行振込で金をだまし取る手口。" },
    { name: "👮 ニセ警察詐欺", desc: "警察や検察官を名らい、「マネーロンダリングに関与している」「逮捕状が出ている」と脅して資産を移させる手口。" },
    { name: "💼 闇バイト", desc: "「高額報酬・荷物を運ぶだけ」といったSNSの甘い誘いに乗せられ、特殊詐欺の受け子や出し子として逮捕される犯罪。" },
    { name: "💰 還付金詐欺", desc: "市役所職員を名乗り、「医療費や税金の払い戻しがある」とATMへ誘導し、実際には犯人口座へ送金させる手口。" },
    { name: "📉 SNS型投資・ロマンス詐欺", desc: "SNSで親密になった相手から「絶対に儲かる投資がある」と勧誘され、架空の投資プラットフォームで金をだまし取られる手口。" },
    { name: "💻 サポート詐欺", desc: "パソコン閲覧中に突然ウイルス感染の偽警告と電話番号を表示し、サポート料名目で電子マネーをだまし取る手口。" },
    { name: "📦 宅配・不在通知の偽SMS", desc: "「荷物を持ち帰った」というSMSから偽アプリや偽サイトへ誘導し、IDやパスワード、個人情報を盗み取る手口。" },
    { name: "🌐 国際電話の悪用", desc: "＋から始まる海外の国際電話番号を利用し、自動音声や不審な着信で折り返し通話料金や個人情報を狙う手口。" },
    { name: "🏷️ オレオレ詐欺", desc: "「オレだけどカバンを落とした」と息子や孫を装い、緊急の現金が必要だと言って現金をだまし取る定番の手口。" },
    { name: "🎫 チケット転売詐欺", desc: "SNS上でライブチケット等の個人間取引を持ちかけ、代金を先払いさせた後に連絡を絶つ詐欺。" },
    { name: "🖨️ 屋根点検商法", desc: "「無料で屋根を見てあげる」と突然訪問し、わざと瓦を壊して高額な修繕工事契約を迫る悪質商法。" },
    { name: "🪙 電子マネー要求", desc: "詐欺の支払いに、足がつきにくいコンビニのプリペイド型電子マネーカードの番号を指定して要求する手口。" },
    { name: "📢 マイナンバー不審通知", desc: "「電子証明書の期限切れ」などを口実にSMSやメールを送り、偽サイトで暗証番号や個人情報を入力させる手口。" },
    { name: "📱 画面共有の悪用", desc: "通話アプリの画面共有機能を使わせ、スマホに届いたSMSの認証番号を盗み見たり不正送金させる極めて危険な手口。" },
    { name: "✉️ 税関・関税未納通知", desc: "「海外からの荷物が税関で止まっている」という偽メールを送り、クレジットカード情報を入力させるフィッシング手口。" }
  ];

  function getPlayerSpriteSrc() {
    return (typeof IMAGE_ASSETS !== "undefined" && IMAGE_ASSETS.characters && IMAGE_ASSETS.characters.joeCheer)
      ? IMAGE_ASSETS.characters.joeCheer
      : "resource/images/ジョー君応援.png";
  }

  function getEnemySilhouetteSrc() {
    return (typeof IMAGE_ASSETS !== "undefined" && IMAGE_ASSETS.characters && IMAGE_ASSETS.characters.silhouette)
      ? IMAGE_ASSETS.characters.silhouette
      : "resource/images/シルエット.png";
  }

  function getBossSpriteSrc(type) {
    const chars = (typeof IMAGE_ASSETS !== "undefined" && IMAGE_ASSETS.characters) ? IMAGE_ASSETS.characters : {};
    if (type === "gold") return chars.joeGold || "resource/images/金ジョー君.png";
    if (type === "silver") return chars.joeSilver || "resource/images/銀ジョー君.png";
    return chars.joeBronze || "resource/images/銅ジョー君.png";
  }

  function createInvaderDOM() {
    if (document.getElementById("sv2-overlay")) return;

    const overlay = document.createElement("div");
    overlay.id = "sv2-overlay";
    overlay.className = "sv2-overlay is-hidden";
    overlay.innerHTML = `
      <div class="sv2-window">
        <header class="sv2-header">
          <h2 class="sv2-title">👾 ジョーくんインベーダー (50体モード)</h2>
          <span id="sv2-status-chip" class="sv2-status-chip">Wave 1: 残り17体</span>
        </header>

        <p class="sv2-guide">
          【操作方法】「◀ 左へ」「▶ 右へ」で移動、「🚀 発射！」で撃退！全3Wave＋ボス戦を突破せよ！
        </p>

        <div class="sv2-field" id="sv2-field">
          <div class="sv2-defense-line"></div>
          <div id="sv2-enemies-layer"></div>
          <div id="sv2-bullets-layer"></div>
          <div id="sv2-effects-layer"></div>
          <div class="sv2-player" id="sv2-player">
            <img src="${getPlayerSpriteSrc()}" alt="ジョーくん">
          </div>

          <!-- Wave Clear Accordion Result Panel -->
          <div class="sv2-accordion-panel is-hidden" id="sv2-accordion-panel">
            <h3 class="sv2-acc-title" id="sv2-acc-title">🎉 Wave 1 クリア！</h3>
            <p class="sv2-acc-sub">このウェーブで撃ち落とした詐欺の解説（タップして展開）:</p>
            <div class="sv2-acc-list" id="sv2-acc-list"></div>
            <button type="button" id="sv2-btn-next-wave" class="sv2-res-btn is-replay">次へすすむ ▶</button>
          </div>

          <!-- Final Result Panel -->
          <div class="sv2-result-panel is-hidden" id="sv2-result-panel">
            <h3 class="sv2-result-title" id="sv2-result-title">🎉 完全防衛クリア！</h3>
            <p class="sv2-result-sub" id="sv2-result-sub">全50体の敵とボスをすべて撃退しました！</p>
            <div class="sv2-result-safety">
              詐欺には気を付けよう！<br>
              遊んでくれてありがとう！<br>
              怪しい話はすぐに信じず、必ず確認しよう！
            </div>
            <div class="sv2-result-btns">
              <button type="button" id="sv2-res-replay" class="sv2-res-btn is-replay">🔄 もう一度あそぶ</button>
              <button type="button" id="sv2-res-menu" class="sv2-res-btn">📋 ゲーム選択へ戻る</button>
              <button type="button" id="sv2-res-exit" class="sv2-res-btn">◀ タイトルへ戻る</button>
            </div>
          </div>
        </div>

        <div class="sv2-controls">
          <button type="button" id="sv2-btn-left" class="sv2-ctrl-btn">◀ 左へ</button>
          <button type="button" id="sv2-btn-fire" class="sv2-ctrl-btn is-fire">🚀 発射！</button>
          <button type="button" id="sv2-btn-right" class="sv2-ctrl-btn">▶ 右へ</button>
        </div>

        <div class="sv2-notice-box">
          🛡️ 詐欺には気を付けよう！ 怪しい話には「話さない・払わない・騙されない」
        </div>

        <div class="sv2-footer-btns">
          <button type="button" id="sv2-btn-back-menu" class="sv2-btn-sub">📋 ゲーム選択へ戻る</button>
          <button type="button" id="sv2-btn-exit" class="sv2-btn-sub sv2-btn-exit">◀ タイトルへ戻る</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    bindInvaderEvents();
  }

  function spawnSingleWaveEnemy() {
    const layer = document.getElementById("sv2-enemies-layer");
    if (!layer || sv2Wave > 3) return;

    const maxThisWave = SV2_WAVE_TOTALS[sv2Wave];
    if (sv2WaveSpawnCount >= maxThisWave) return;

    sv2WaveSpawnCount++;

    const scamObj = SV2_SCAM_DATABASE[Math.floor(Math.random() * SV2_SCAM_DATABASE.length)];
    const silhouetteSrc = getEnemySilhouetteSrc();
    const startX = 10 + Math.random() * 80;
    const startY = -8;

    const el = document.createElement("div");
    el.className = "sv2-enemy";
    el.style.left = `${startX}%`;
    el.style.top = `${startY}%`;

    const randKind = Math.random();
    if (randKind < 0.35) {
      el.innerHTML = `<img src="${silhouetteSrc}" alt="不審者">`;
    } else {
      el.innerHTML = `<span class="sv2-enemy-word">${scamObj.name}</span>`;
    }

    layer.appendChild(el);

    const speedMultiplier = 1.0 + (sv2Wave - 1) * 0.25;

    sv2Enemies.push({
      x: startX,
      y: startY,
      speedY: (6.0 + Math.random() * 4.0) * speedMultiplier,
      vx: (Math.random() - 0.5) * 16,
      alive: true,
      el: el,
      isBoss: false,
      hp: 1,
      scamData: scamObj
    });

    updateStatusChip();
  }

  function spawnWave4Bosses() {
    const layer = document.getElementById("sv2-enemies-layer");
    if (!layer) return;
    layer.innerHTML = "";
    sv2Enemies = [];

    const silverSrc = getBossSpriteSrc("silver");
    const bronzeSrc = getBossSpriteSrc("bronze");

    // 銅ジョー（左側・HP5）
    const elBronze = document.createElement("div");
    elBronze.className = "sv2-enemy";
    elBronze.style.left = "30%";
    elBronze.style.top = "14%";
    elBronze.innerHTML = `
      <div style="text-align:center;">
        <img src="${bronzeSrc}" alt="銅ボス" style="width:48px;height:48px;object-fit:contain;filter:drop-shadow(0 0 8px #CD7F32);">
        <div id="sv2-hp-bronze" style="font-size:10px;font-weight:900;color:#FFE39E;background:rgba(0,0,0,0.75);padding:1px 5px;border-radius:4px;">HP: 5</div>
      </div>
    `;
    layer.appendChild(elBronze);

    sv2Enemies.push({
      id: "bronze",
      x: 30,
      y: 14,
      vx: 18,
      speedY: 0.6,
      alive: true,
      el: elBronze,
      isBoss: true,
      hp: 5,
      maxHp: 5,
      scamData: { name: "🥉 銅のジョーボス", desc: "第4波のボスクラス！激しいフェイント攻撃をしてくる。" }
    });

    // 銀ジョー（右側・HP5）
    const elSilver = document.createElement("div");
    elSilver.className = "sv2-enemy";
    elSilver.style.left = "70%";
    elSilver.style.top = "14%";
    elSilver.innerHTML = `
      <div style="text-align:center;">
        <img src="${silverSrc}" alt="銀ボス" style="width:48px;height:48px;object-fit:contain;filter:drop-shadow(0 0 8px #C0C0C0);">
        <div id="sv2-hp-silver" style="font-size:10px;font-weight:900;color:#FFFFFF;background:rgba(0,0,0,0.75);padding:1px 5px;border-radius:4px;">HP: 5</div>
      </div>
    `;
    layer.appendChild(elSilver);

    sv2Enemies.push({
      id: "silver",
      x: 70,
      y: 14,
      vx: -18,
      speedY: 0.6,
      alive: true,
      el: elSilver,
      isBoss: true,
      hp: 5,
      maxHp: 5,
      scamData: { name: "🥈 銀のジョーボス", desc: "第4波の強敵ボス！素早く動き回るぞ。" }
    });

    updateStatusChip();
  }

  function spawnWave5Boss() {
    const layer = document.getElementById("sv2-enemies-layer");
    if (!layer) return;
    layer.innerHTML = "";
    sv2Enemies = [];

    const goldSrc = getBossSpriteSrc("gold");

    const elGold = document.createElement("div");
    elGold.className = "sv2-enemy";
    elGold.style.left = "50%";
    elGold.style.top = "12%";
    elGold.innerHTML = `
      <div style="text-align:center;">
        <img src="${goldSrc}" alt="金ボス" style="width:58px;height:58px;object-fit:contain;filter:drop-shadow(0 0 12px #FFD700);">
        <div id="sv2-hp-gold" style="font-size:11px;font-weight:900;color:#FFD700;background:rgba(0,0,0,0.85);padding:2px 6px;border-radius:4px;border:1px solid #FFD700;">★ 金ボス HP: 6 ★</div>
      </div>
    `;
    layer.appendChild(elGold);

    sv2Enemies.push({
      id: "gold",
      x: 50,
      y: 12,
      vx: 24,
      speedY: 0.75,
      alive: true,
      el: elGold,
      isBoss: true,
      hp: 6,
      maxHp: 6,
      scamData: { name: "🥇 金のジョー（ラスボス）", desc: "最終決戦の最強ボス！全ての防犯知識を総動員して撃破せよ！" }
    });

    updateStatusChip();
  }

  function clearBulletsAndEffects() {
    const bulletsLayer = document.getElementById("sv2-bullets-layer");
    const effectsLayer = document.getElementById("sv2-effects-layer");
    if (bulletsLayer) bulletsLayer.innerHTML = "";
    if (effectsLayer) effectsLayer.innerHTML = "";
    sv2Bullets = [];
  }

  function updateStatusChip() {
    const chip = document.getElementById("sv2-status-chip");
    if (!chip) return;

    if (sv2Wave <= 3) {
      const aliveOnScreen = sv2Enemies.filter((e) => e.alive).length;
      const maxThisWave = SV2_WAVE_TOTALS[sv2Wave];
      const remainingTotal = (maxThisWave - sv2WaveSpawnCount) + aliveOnScreen;
      chip.textContent = `Wave ${sv2Wave}: 残り${remainingTotal}体`;
    } else if (sv2Wave === 4) {
      const aliveBosses = sv2Enemies.filter((e) => e.alive);
      const hpText = aliveBosses.map(b => `${b.id === 'silver' ? '銀' : '銅'}:${b.hp}`).join(' / ');
      chip.textContent = `Wave 4 ボス戦 [${hpText || '撃破'}]`;
    } else if (sv2Wave === 5) {
      const goldBoss = sv2Enemies.find(e => e.id === "gold" && e.alive);
      chip.textContent = `最終決戦！ 金のジョー [HP: ${goldBoss ? goldBoss.hp : 0}]`;
    }
  }

  function updatePlayerUI() {
    const playerEl = document.getElementById("sv2-player");
    if (playerEl) {
      playerEl.style.left = `${sv2PlayerX}%`;
    }
  }

  function setControlsEnabled(enabled) {
    ["sv2-btn-left", "sv2-btn-fire", "sv2-btn-right"].forEach((id) => {
      const btn = document.getElementById(id);
      if (btn) btn.disabled = !enabled;
    });
  }

  function startInvaderGame() {
    stopLoop();
    const resultPanel = document.getElementById("sv2-result-panel");
    const accPanel = document.getElementById("sv2-accordion-panel");
    if (resultPanel) resultPanel.classList.add("is-hidden");
    if (accPanel) accPanel.classList.add("is-hidden");

    sv2PlayerX = 50;
    sv2MoveDir = 0;
    sv2Wave = 1;
    sv2WaveSpawnCount = 0;
    sv2SpawnCooldown = 0;
    sv2LastShotTime = 0;
    sv2DestroyedScamNames = [];

    clearBulletsAndEffects();
    const layer = document.getElementById("sv2-enemies-layer");
    if (layer) layer.innerHTML = "";
    sv2Enemies = [];

    spawnSingleWaveEnemy();
    spawnSingleWaveEnemy();
    spawnSingleWaveEnemy();

    updatePlayerUI();
    updateStatusChip();
    setControlsEnabled(true);

    sv2Running = true;
    sv2LastTime = performance.now();
    sv2RafId = requestAnimationFrame(gameLoop);
  }

  function openInvaderStage() {
    const overlay = document.getElementById("sv2-overlay");
    if (overlay) overlay.classList.remove("is-hidden");
    startInvaderGame();
  }

  function closeInvaderStage() {
    stopLoop();
    sv2MoveDir = 0;
    const overlay = document.getElementById("sv2-overlay");
    if (overlay) overlay.classList.add("is-hidden");
  }

  function stopLoop() {
    sv2Running = false;
    if (sv2RafId !== null) {
      cancelAnimationFrame(sv2RafId);
      sv2RafId = null;
    }
  }

  function showWaveAccordionPanel() {
    stopLoop();
    setControlsEnabled(false);

    const accPanel = document.getElementById("sv2-accordion-panel");
    const titleEl = document.getElementById("sv2-acc-title");
    const listEl = document.getElementById("sv2-acc-list");
    if (!accPanel || !listEl) return;

    if (titleEl) titleEl.textContent = `🎉 Wave ${sv2Wave} クリア！`;
    listEl.innerHTML = "";

    // このウェーブで撃ち落としたユニークな詐欺名称のリスト
    const uniqueScams = Array.from(new Set(sv2DestroyedScamNames));
    sv2DestroyedScamNames = []; // リセット

    if (uniqueScams.length === 0) {
      uniqueScams.push({ name: "🛡️ 防犯意識の向上", desc: "日頃から怪しい誘いに乗らない強い心が身につきました。" });
    }

    uniqueScams.forEach((scam) => {
      const item = document.createElement("div");
      item.className = "sv2-acc-item";
      item.innerHTML = `
        <div class="sv2-acc-header">
          <span>${scam.name}</span>
          <span class="sv2-acc-arrow">▼</span>
        </div>
        <div class="sv2-acc-body">
          <p>${scam.desc}</p>
        </div>
      `;

      item.querySelector(".sv2-acc-header").addEventListener("click", () => {
        item.classList.toggle("is-open");
      });

      listEl.appendChild(item);
    });

    accPanel.classList.remove("is-hidden");
  }

  function resumeNextWave() {
    const accPanel = document.getElementById("sv2-accordion-panel");
    if (accPanel) accPanel.classList.add("is-hidden");

    sv2Wave++;
    sv2WaveSpawnCount = 0;
    clearBulletsAndEffects();

    if (sv2Wave === 2 || sv2Wave === 3) {
      spawnSingleWaveEnemy();
      spawnSingleWaveEnemy();
    } else if (sv2Wave === 4) {
      spawnWave4Bosses();
    } else if (sv2Wave === 5) {
      spawnWave5Boss();
    }

    updateStatusChip();
    setControlsEnabled(true);
    sv2Running = true;
    sv2LastTime = performance.now();
    sv2RafId = requestAnimationFrame(gameLoop);
  }

  function finishInvaderGame(isWin) {
    stopLoop();
    sv2MoveDir = 0;
    setControlsEnabled(false);

    const panel = document.getElementById("sv2-result-panel");
    const titleEl = document.getElementById("sv2-result-title");
    const subEl = document.getElementById("sv2-result-sub");

    if (titleEl) {
      titleEl.classList.toggle("is-fail", !isWin);
      titleEl.textContent = isWin ? "🎉 完全防衛クリア！" : "⚠️ 防衛ライン突破！";
    }
    if (subEl) {
      subEl.textContent = isWin
        ? "全50体の敵と銀・銅・金のボスをすべて撃退しました！完璧な防犯力です！"
        : "ゲームオーバー！怪しい敵に防衛ラインを突破されました。次は全ボス撃退を目指そう！";
    }
    if (panel) panel.classList.remove("is-hidden");
  }

  function fireBullet() {
    if (!sv2Running) return;
    const now = performance.now();
    if (now - sv2LastShotTime < 190) return;
    if (sv2Bullets.length >= 4) return;

    const layer = document.getElementById("sv2-bullets-layer");
    if (!layer) return;

    sv2LastShotTime = now;
    const bulletEl = document.createElement("div");
    bulletEl.className = "sv2-bullet";
    const startY = 82;
    bulletEl.style.left = `${sv2PlayerX}%`;
    bulletEl.style.top = `${startY}%`;
    layer.appendChild(bulletEl);

    sv2Bullets.push({
      x: sv2PlayerX,
      y: startY,
      active: true,
      el: bulletEl
    });
  }

  function spawnHitEffect(x, y, isBig) {
    const layer = document.getElementById("sv2-effects-layer");
    if (!layer) return;
    const boom = document.createElement("div");
    boom.className = "sv2-boom";
    boom.textContent = isBig ? "🌟" : "💥";
    boom.style.left = `${x}%`;
    boom.style.top = `${y}%`;
    layer.appendChild(boom);

    setTimeout(() => {
      if (boom.parentNode) boom.parentNode.removeChild(boom);
    }, 450);
  }

  function gameLoop(now) {
    if (!sv2Running) return;

    const dt = Math.min(0.05, (now - sv2LastTime) / 1000);
    sv2LastTime = now;

    // 1. 自機移動
    if (sv2MoveDir !== 0) {
      sv2PlayerX = Math.max(6, Math.min(94, sv2PlayerX + sv2MoveDir * 66 * dt));
      updatePlayerUI();
    }

    // 2. 弾の移動 & 当たり判定
    for (let i = sv2Bullets.length - 1; i >= 0; i--) {
      const b = sv2Bullets[i];
      b.y -= 115 * dt;

      if (b.y < -5) {
        b.active = false;
      } else {
        for (let j = 0; j < sv2Enemies.length; j++) {
          const e = sv2Enemies[j];
          if (!e.alive) continue;
          const hitRange = e.isBoss ? 9.0 : 6.0;

          if (Math.abs(b.x - e.x) <= hitRange && Math.abs(b.y - e.y) <= (hitRange * 1.1)) {
            b.active = false;

            if (e.scamData) {
              sv2DestroyedScamNames.push(e.scamData);
            }

            if (e.isBoss) {
              e.hp -= 1;
              spawnHitEffect(e.x, e.y, true);

              const hpEl = document.getElementById(`sv2-hp-${e.id}`);
              if (hpEl) {
                if (e.id === "gold") {
                  hpEl.textContent = `★ 金ボス HP: ${Math.max(0, e.hp)} ★`;
                } else {
                  hpEl.textContent = `HP: ${Math.max(0, e.hp)}`;
                }
              }

              if (e.hp <= 0) {
                e.alive = false;
                if (e.el && e.el.parentNode) e.el.parentNode.removeChild(e.el);
                spawnHitEffect(e.x, e.y, true);
              }
            } else {
              e.alive = false;
              if (e.el && e.el.parentNode) e.el.parentNode.removeChild(e.el);
              spawnHitEffect(e.x, e.y, false);
            }

            updateStatusChip();
            break;
          }
        }
      }

      if (!b.active) {
        if (b.el && b.el.parentNode) b.el.parentNode.removeChild(b.el);
        sv2Bullets.splice(i, 1);
      } else {
        b.el.style.top = `${b.y}%`;
      }
    }

    // 3. Wave 1〜3の順次スポーン
    if (sv2Wave <= 3 && sv2WaveSpawnCount < SV2_WAVE_TOTALS[sv2Wave]) {
      sv2SpawnCooldown += dt;
      const activeCount = sv2Enemies.filter((e) => e.alive).length;
      if (activeCount < 4 || sv2SpawnCooldown > 1.0) {
        sv2SpawnCooldown = 0;
        spawnSingleWaveEnemy();
      }
    }

    // 4. ウェーブクリア＆次ステージ遷移判定
    const aliveEnemies = sv2Enemies.filter((e) => e.alive);
    if (aliveEnemies.length === 0) {
      if (sv2Wave <= 3 && sv2WaveSpawnCount >= SV2_WAVE_TOTALS[sv2Wave]) {
        showWaveAccordionPanel();
        return;
      } else if (sv2Wave === 4) {
        sv2Wave = 5;
        spawnWave5Boss();
      } else if (sv2Wave === 5) {
        finishInvaderGame(true);
        return;
      }
    }

    // 5. 敵の移動処理
    if (sv2Wave <= 3) {
      for (let i = 0; i < sv2Enemies.length; i++) {
        const e = sv2Enemies[i];
        if (!e.alive) continue;

        e.y += e.speedY * dt;
        e.x += Math.sin(now * 0.003 + i) * e.vx * dt;
        e.x = Math.max(8, Math.min(92, e.x));

        e.el.style.left = `${e.x}%`;
        e.el.style.top = `${e.y}%`;

        if (e.y >= 78) {
          finishInvaderGame(false);
          return;
        }
      }
    } else if (sv2Wave === 4) {
      for (let i = 0; i < sv2Enemies.length; i++) {
        const b = sv2Enemies[i];
        if (!b.alive) continue;

        b.x += b.vx * dt;
        if (b.x >= 88) {
          b.x = 88;
          b.vx *= -1;
        } else if (b.x <= 12) {
          b.x = 12;
          b.vx *= -1;
        }

        b.y += b.speedY * dt;
        b.el.style.left = `${b.x}%`;
        b.el.style.top = `${b.y}%`;

        if (b.y >= 78) {
          finishInvaderGame(false);
          return;
        }
      }
    } else if (sv2Wave === 5) {
      const gold = sv2Enemies[0];
      if (gold && gold.alive) {
        gold.x += gold.vx * dt;
        if (gold.x >= 88) {
          gold.x = 88;
          gold.vx *= -1;
        } else if (gold.x <= 12) {
          gold.x = 12;
          gold.vx *= -1;
        }

        gold.y += gold.speedY * dt;
        gold.el.style.left = `${gold.x}%`;
        gold.el.style.top = `${gold.y}%`;

        if (gold.y >= 78) {
          finishInvaderGame(false);
          return;
        }
      }
    }

    sv2RafId = requestAnimationFrame(gameLoop);
  }

  function backToMenu() {
    closeInvaderStage();
    if (window.SubViewBridge && typeof window.SubViewBridge.openMenu === "function") {
      window.SubViewBridge.openMenu();
    }
  }

  function bindInvaderEvents() {
    const btnLeft = document.getElementById("sv2-btn-left");
    const btnRight = document.getElementById("sv2-btn-right");
    const btnFire = document.getElementById("sv2-btn-fire");
    const btnNextWave = document.getElementById("sv2-btn-next-wave");
    const btnBackMenu = document.getElementById("sv2-btn-back-menu");
    const btnExit = document.getElementById("sv2-btn-exit");

    const resReplay = document.getElementById("sv2-res-replay");
    const resMenu = document.getElementById("sv2-res-menu");
    const resExit = document.getElementById("sv2-res-exit");

    if (btnLeft) {
      btnLeft.addEventListener("mousedown", () => { sv2MoveDir = -1; });
      btnLeft.addEventListener("touchstart", (e) => { e.preventDefault(); sv2MoveDir = -1; }, { passive: false });
    }
    if (btnRight) {
      btnRight.addEventListener("mousedown", () => { sv2MoveDir = 1; });
      btnRight.addEventListener("touchstart", (e) => { e.preventDefault(); sv2MoveDir = 1; }, { passive: false });
    }

    const stopMove = () => { sv2MoveDir = 0; };
    window.addEventListener("mouseup", stopMove);
    window.addEventListener("touchend", stopMove);
    window.addEventListener("touchcancel", stopMove);

    if (btnFire) btnFire.addEventListener("click", fireBullet);
    if (btnNextWave) btnNextWave.addEventListener("click", resumeNextWave);

    if (btnBackMenu) btnBackMenu.addEventListener("click", backToMenu);
    if (btnExit) btnExit.addEventListener("click", closeInvaderStage);

    if (resReplay) resReplay.addEventListener("click", startInvaderGame);
    if (resMenu) resMenu.addEventListener("click", backToMenu);
    if (resExit) resExit.addEventListener("click", closeInvaderStage);

    document.addEventListener("keydown", (e) => {
      const overlay = document.getElementById("sv2-overlay");
      if (!overlay || overlay.classList.contains("is-hidden")) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        sv2MoveDir = -1;
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        sv2MoveDir = 1;
      } else if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        fireBullet();
      }
    });

    document.addEventListener("keyup", (e) => {
      const overlay = document.getElementById("sv2-overlay");
      if (!overlay || overlay.classList.contains("is-hidden")) return;

      if ((e.key === "ArrowLeft" && sv2MoveDir === -1) || (e.key === "ArrowRight" && sv2MoveDir === 1)) {
        sv2MoveDir = 0;
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    createInvaderDOM();

    if (window.SubViewBridge && typeof window.SubViewBridge.registerGame === "function") {
      window.SubViewBridge.registerGame({
        id: "invader",
        icon: "👾",
        title: "ジョーくんインベーダー",
        desc: "全50体撃破！3Wave雑魚 ➜ 銀＆銅ボス ➜ 金ボスと戦う本格防衛ゲーム！",
        onOpen: openInvaderStage
      });
    }
  });
})();