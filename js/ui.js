/* =========================================================
   ui.js
   -----------------------------------------------------------
   UI描画・4モード表示制御・資料タップ拡大モーダル制御
   デバッグ情報出力 ＆ 画像未作成時リアルモック画面自動生成対応
   ========================================================= */

// デバッグモード設定（trueでコンソール出力有効化）
window.DEBUG_MODE = true;

function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach((el) => {
    el.classList.toggle("active", el.id === screenId);
  });
}

function setImageSafely(imgElement, src, onFail) {
  if (!imgElement) return;
  if (!src) {
    imgElement.removeAttribute("src");
    imgElement.classList.add("is-hidden");
    return;
  }

  imgElement.classList.remove("is-hidden");

  imgElement.onerror = () => {
    const currentSrc = imgElement.getAttribute("src") || "";
    if (currentSrc.startsWith("images/")) {
      imgElement.src = "../resource/images/" + currentSrc.replace("images/", "");
    } else if (currentSrc.startsWith("../resource/images/")) {
      imgElement.src = "resource/images/" + currentSrc.replace("../resource/images/", "");
    } else {
      imgElement.classList.add("is-hidden");
      if (typeof onFail === "function") {
        onFail();
      }
    }
  };

  imgElement.src = src;
}

const JOE_EXPRESSIONS = {
  normal:    IMAGE_ASSETS.characters.joe,
  happy:     IMAGE_ASSETS.characters.joeHappy,
  sad:       IMAGE_ASSETS.characters.joeSad,
  surprised: IMAGE_ASSETS.characters.joeSurprised,
  thinking:  IMAGE_ASSETS.characters.joeThinking,
  cheer:     IMAGE_ASSETS.characters.joeCheer,
  worry:     IMAGE_ASSETS.characters.joeWorry,
  angry:     IMAGE_ASSETS.characters.joeAngry,
  relax:     IMAGE_ASSETS.characters.joeRelax
};

function getJoeImage(expression) {
  return JOE_EXPRESSIONS[expression] || JOE_EXPRESSIONS.normal;
}

function setJoeExpression(expression) {
  state.joeExpression = expression;
  const joeImgSrc = getJoeImage(expression);

  const targetImgIds = [
    "item-guide-image", "synopsis-guide-image", "dayintro-guide-image",
    "narration-guide-image", "result-guide-image", "week-recap-guide-image",
    "ending-guide-image", "intro-guide-image", "action-guide-image", "title-joe-image",
    "survey-guide-image"
  ];

  targetImgIds.forEach(id => {
    const img = document.getElementById(id);
    if (img) {
      setImageSafely(img, joeImgSrc);
      applyCharacterBlend(img, joeImgSrc);
    }
  });
}

// 主人公画像（モード別切替対応）
function getPlayerImage(expressionType) {
  if (state.mode === "senior") {
    const map = {
      playerNeutral:    IMAGE_ASSETS.characters.seniorNeutral,
      playerHappy:      IMAGE_ASSETS.characters.seniorHappy,
      playerSad:        IMAGE_ASSETS.characters.seniorSad,
      playerQuestion:   IMAGE_ASSETS.characters.seniorQuestion,
      playerWorry:      IMAGE_ASSETS.characters.seniorWorry,
      playerWalking:    IMAGE_ASSETS.characters.seniorWalking,
      playerSmartphone: IMAGE_ASSETS.characters.seniorSmartphone
    };
    return map[expressionType] || IMAGE_ASSETS.characters.seniorNeutral;
  } else {
    const map = {
      playerNeutral:    IMAGE_ASSETS.characters.studentNeutral,
      playerHappy:      IMAGE_ASSETS.characters.studentHappy,
      playerSad:        IMAGE_ASSETS.characters.studentSad,
      playerQuestion:   IMAGE_ASSETS.characters.studentQuestion,
      playerWorry:      IMAGE_ASSETS.characters.studentWorry,
      playerWalking:    IMAGE_ASSETS.characters.studentWalking,
      playerSmartphone: IMAGE_ASSETS.characters.studentSmartphone
    };
    return map[expressionType] || IMAGE_ASSETS.characters.studentNeutral;
  }
}

function setJoeSupportMessage(msg) {
  const bubble = document.getElementById("joe-support-bubble");
  const textEl = document.getElementById("joe-support-text");
  if (!bubble || !textEl) return;

  if (msg) {
    textEl.textContent = msg;
    bubble.classList.remove("is-hidden");
  } else {
    bubble.classList.add("is-hidden");
  }
}

function updateMoneyDisplay() {
  const moneyEl = document.getElementById("money-display");
  const walletBox = document.getElementById("wallet-chip-box");
  
  if (moneyEl) {
    moneyEl.textContent = state.money.toLocaleString("ja-JP");
  }

  if (walletBox) {
    if (state.money <= 0) {
      walletBox.classList.add("is-danger");
    } else {
      walletBox.classList.remove("is-danger");
    }
  }
}

function showMoneyDelta(amount) {
  const popEl = document.getElementById("money-pop");
  if (!popEl) return;

  popEl.classList.remove("is-hidden", "is-plus", "is-minus");
  void popEl.offsetWidth;

  if (amount > 0) {
    popEl.textContent = `+${amount.toLocaleString("ja-JP")}円`;
    popEl.classList.add("is-plus");
  } else if (amount < 0) {
    popEl.textContent = `${amount.toLocaleString("ja-JP")}円`;
    popEl.classList.add("is-minus");
  } else {
    return;
  }

  setTimeout(() => {
    popEl.classList.add("is-hidden");
  }, 1600);
}

function updateTargetItemDisplay() {
  const chip = document.getElementById("target-item-display");
  const nameEl = document.getElementById("target-item-name");
  if (!chip || !nameEl) return;

  if ((state.mode === "elementary" || state.mode === "teen") && state.selectedItem) {
    nameEl.textContent = state.selectedItem.name;
    chip.classList.remove("is-hidden");
  } else {
    chip.classList.add("is-hidden");
  }
}

function renderDayTracker() {
  const tracker = document.getElementById("day-tracker");
  if (!tracker) return;
  tracker.innerHTML = "";

  const slot = currentScheduleSlot();
  const currentWeekdayIndex = slot.weekdayIndex;

  const allLabels = (state.mode === "senior" || state.mode === "adult")
    ? SEVEN_DAY_LABELS
    : [...WEEKDAY_LABELS, SHOPPING_LABEL];

  allLabels.forEach((label, i) => {
    const dot = document.createElement("div");
    dot.className = "day-dot";
    if (i < currentWeekdayIndex) dot.classList.add("is-done");
    if (i === currentWeekdayIndex) dot.classList.add("is-current");
    dot.textContent = label;
    tracker.appendChild(dot);
  });
}

function updateStatusBar() {
  document.getElementById("status-bar").classList.remove("hidden");
  renderDayTracker();
  updateMoneyDisplay();
  updateTargetItemDisplay();
}

function itemVisualHTML(item, imgClass) {
  if (item && item.image) {
    return `<img class="${imgClass}" src="${item.image}" alt="${item.name}">`;
  }
  return `<span class="item-emoji ${imgClass}-emoji">${item ? item.emoji : "🛡️"}</span>`;
}

function applyCharacterBlend(imgElement, src) {
  if (!imgElement) return;
  imgElement.classList.remove("blend-multiply", "blend-screen");
}

function showDayIntro(label, onNext, comment) {
  const slot = currentScheduleSlot();
  
  document.getElementById("dayintro-label").textContent = `${slot.weekdayName}曜日`;
  document.getElementById("dayintro-daynum").textContent = slot.dayNumber;
  document.getElementById("dayintro-comment").textContent = comment || "";

  const bgImg = document.getElementById("dayintro-bg-image");
  const guideImg = document.getElementById("dayintro-guide-image");
  setImageSafely(bgImg, IMAGE_ASSETS.backgrounds.schoolRoute);

  setJoeExpression("cheer");
  setImageSafely(guideImg, getJoeImage(state.joeExpression));
  applyCharacterBlend(guideImg, getJoeImage(state.joeExpression));

  showScreen("screen-dayintro");

  const bannerEl = document.getElementById("dayintro-banner");
  if (bannerEl) {
    bannerEl.classList.remove("is-animating");
    void bannerEl.offsetWidth;
    bannerEl.classList.add("is-animating");
  }

  document.getElementById("btn-dayintro-next").onclick = onNext;
}

/* ★ 資料・画像ポップアップモーダル制御 ★ */
function openImageModal(imgSrc, mockHTML) {
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("image-modal-img");
  const modalBody = modal ? modal.querySelector(".image-modal-body") : null;
  if (!modal || !modalBody) return;

  // 既存のモック画面があれば消去
  const oldMock = modalBody.querySelector(".modal-mock-container");
  if (oldMock) oldMock.remove();

  if (imgSrc) {
    if (modalImg) {
      modalImg.classList.remove("is-hidden");
      setImageSafely(modalImg, imgSrc);
    }
  } else if (mockHTML) {
    if (modalImg) modalImg.classList.add("is-hidden");
    const mockContainer = document.createElement("div");
    mockContainer.className = "modal-mock-container";
    mockContainer.style.width = "100%";
    mockContainer.style.height = "100%";
    mockContainer.innerHTML = mockHTML;
    modalBody.appendChild(mockContainer);
  }

  modal.classList.remove("is-hidden");
}

function closeImageModal() {
  const modal = document.getElementById("image-modal");
  if (modal) {
    modal.classList.add("is-hidden");
  }
}

/* ★ デバッグ情報ログ出力 ★ */
function outputDebugQuestionInfo(question) {
  if (!window.DEBUG_MODE || !question) return;

  const imageFileName = question.screenshot 
    ? question.screenshot.split("/").pop() 
    : (question.character ? question.character.split("/").pop() : "なし");

  const debugText = `[DEBUG] MODE: ${state.mode} | QUESTION ID: ${question.id} | IMAGE: ${decodeURIComponent(imageFileName)}`;
  console.log(`%c${debugText}`, "color: #00e676; background: #1B2A4A; font-weight: bold; padding: 4px 8px; border-radius: 4px;");
}

/* ★ 画像未作成時・リアルモック画面HTML生成フォールバック ★ */
function generateFallbackMockHTML(question) {
  const qId = question.id;

  // 1. サポート詐欺（Microsoft偽警告）
  if (qId === "q_adult_colleague_help" || qId === "q_senior_web_support") {
    return `
      <div style="background:#C00000; color:#fff; width:100%; height:100%; padding:16px; box-sizing:border-box; font-family:sans-serif; border-radius:8px; display:flex; flex-direction:column; justify-content:space-between;">
        <div style="border-bottom:2px solid #fff; padding-bottom:8px;">
          <div style="font-size:18px; font-weight:bold;">⚠️ Microsoft セキュリティ警告</div>
          <div style="font-size:12px; opacity:0.9;">システムアラート: 0x80070422 - Trojanスパイウェア検出</div>
        </div>
        <div style="background:#fff; color:#000; padding:12px; border-radius:6px; font-size:13px; line-height:1.5;">
          <strong style="color:#C00000; font-size:15px;">お使いのPCはロックされました</strong><br>
          個人情報・パスワードが流出する恐れがあります。<br>
          直ちに下記のサポート窓口へお電話ください。<br>
          <div style="text-align:center; margin-top:8px; font-size:18px; font-weight:bold; color:#0055AA;">
            📞 050-3196-XXXX（フリーダイヤル）
          </div>
        </div>
        <div style="font-size:11px; opacity:0.85; text-align:center;">※電源を切るとPCが完全に破壊されます</div>
      </div>
    `;
  }

  // 2. 銀行ワンタイム・OTP詐欺
  if (qId === "q_adult_bank_otp_scam") {
    return `
      <div style="background:#F2F4F8; color:#333; width:100%; height:100%; padding:14px; box-sizing:border-box; font-family:sans-serif; border-radius:8px; display:flex; flex-direction:column; justify-content:space-between;">
        <div style="background:#1B2A4A; color:#fff; padding:8px 12px; border-radius:4px; font-weight:bold; font-size:14px;">
          都市銀行 セキュリティ認証
        </div>
        <div style="background:#fff; border:1px solid #DCE3EE; padding:12px; border-radius:6px; font-size:12.5px; line-height:1.6;">
          <div style="color:#E85C4A; font-weight:bold; margin-bottom:6px;">【重要】取引規制解除の手続き</div>
          第三者による不正アクセスを検知しました。<br>
          本人認証のため、スマホに届いた<strong>ワンタイムパスワード（6桁）</strong>を入力してください。
          <div style="margin-top:10px; background:#F8FAFC; border:1.5px dashed #4A5A7C; padding:8px; text-align:center; font-size:16px; font-weight:bold; letter-spacing:4px;">
            [ _ _ _ _ _ _ ]
          </div>
        </div>
        <div style="font-size:11px; color:#888; text-align:center;">URL: http://bank-security-verify.net</div>
      </div>
    `;
  }

  // 3. 国税庁・e-Tax 還付金
  if (qId === "q_adult_etax_scam" || qId === "q_senior_mail_tax") {
    return `
      <div style="background:#FFFFFF; color:#222; width:100%; height:100%; padding:14px; box-sizing:border-box; font-family:sans-serif; border-radius:8px; border:2px solid #005A9C; display:flex; flex-direction:column; justify-content:space-between;">
        <div style="border-bottom:2px solid #005A9C; padding-bottom:6px; display:flex; justify-content:space-between; align-items:center;">
          <span style="font-weight:bold; color:#005A9C; font-size:15px;">国税庁 e-Tax 電子納税</span>
          <span style="font-size:11px; background:#E5F0FA; color:#005A9C; padding:2px 6px; border-radius:4px;">重要通達</span>
        </div>
        <div style="font-size:12.5px; line-height:1.6;">
          <strong>【過年度税金還付通知】</strong><br>
          過年度確定申告に伴う還付金：<strong>38,400円</strong><br>
          払戻口座の有効期限が迫っております。<br>
          下記ボタンより口座番号・暗証番号を入力してください。
        </div>
        <div style="background:#005A9C; color:#fff; text-align:center; padding:10px; border-radius:6px; font-weight:bold; font-size:14px;">
          還付金受取口座を登録する
        </div>
      </div>
    `;
  }

  // 4. 闇バイト
  if (qId === "q_teen_dark_job") {
    return `
      <div style="background:#111; color:#fff; width:100%; height:100%; padding:14px; box-sizing:border-box; font-family:sans-serif; border-radius:8px; display:flex; flex-direction:column; justify-content:space-between;">
        <div style="display:flex; align-items:center; gap:8px;">
          <div style="width:36px; height:36px; border-radius:50%; background:#FFD700; color:#000; display:flex; align-items:center; justify-content:center; font-weight:bold;">即</div>
          <div>
            <div style="font-weight:bold; font-size:14px;">即日日払い案件@公式</div>
            <div style="font-size:11px; color:#888;">@high_pay_job</div>
          </div>
        </div>
        <div style="font-size:13px; line-height:1.6; background:#222; padding:10px; border-radius:6px;">
          🔥【超高額案件】日給50,000円〜<br>
          ・仕事内容: 荷物を受け取って運ぶだけ📦<br>
          ・未経験/学生大歓迎！即日手渡し💰<br>
          ・#日払い #高額バイト #書類運搬<br>
          ※身分証写真DMで即決！
        </div>
        <div style="text-align:center; color:#FFD700; font-size:12px; font-weight:bold;">💬 DMで今すぐ応募</div>
      </div>
    `;
  }

  // 汎用モック（SMS / 通知画面風）
  return `
    <div style="background:#1B2A4A; color:#fff; width:100%; height:100%; padding:14px; box-sizing:border-box; font-family:sans-serif; border-radius:8px; display:flex; flex-direction:column; justify-content:space-between;">
      <div style="border-bottom:1px solid rgba(255,255,255,0.2); padding-bottom:6px; font-weight:bold; font-size:14px; color:#F5A623;">
        📍 ${question.source || "通知"}
      </div>
      <div style="background:rgba(255,255,255,0.1); padding:12px; border-radius:6px; font-size:13px; line-height:1.6;">
        <div style="font-weight:bold; font-size:14px; margin-bottom:4px;">${question.title.replace(/<[^>]+>/g, '')}</div>
        ${question.desc ? question.desc.replace(/<[^>]+>/g, '') : "画面の指示内容を確認してください。"}
      </div>
      <div style="font-size:11px; opacity:0.8; text-align:center;">🔍 クリック / タップで拡大</div>
    </div>
  `;
}

function renderEventVisual(question) {
  outputDebugQuestionInfo(question);

  const screenshotImg = document.getElementById("event-screenshot-image");
  const bgImg = document.getElementById("event-bg-image");
  const characterImg = document.getElementById("event-character-image");
  const visual = document.getElementById("event-visual");
  const zoomBadge = document.getElementById("zoom-hint-badge");

  // 既存のモックHTMLがあれば除去
  const existingMock = visual.querySelector(".event-mock-container");
  if (existingMock) existingMock.remove();

  if (question.screenshot) {
    visual.classList.add("is-screenshot-mode");
    setImageSafely(bgImg, null);
    setImageSafely(characterImg, null);
    applyCharacterBlend(characterImg, null);

    if (zoomBadge) zoomBadge.classList.remove("is-hidden");

    // 画像読み込み失敗時のフォールバック処理を登録
    setImageSafely(screenshotImg, question.screenshot, () => {
      // 画像が存在しない場合はリアルモック画面を自動生成して表示
      screenshotImg.classList.add("is-hidden");
      const mockHTML = generateFallbackMockHTML(question);
      const mockContainer = document.createElement("div");
      mockContainer.className = "event-mock-container";
      mockContainer.style.width = "100%";
      mockContainer.style.height = "100%";
      mockContainer.innerHTML = mockHTML;
      visual.appendChild(mockContainer);

      visual.onclick = () => openImageModal(null, mockHTML);
    });

    visual.onclick = () => openImageModal(question.screenshot, null);
    return;
  }

  // screenshot がない問題（背景＋立ち絵）
  visual.classList.remove("is-screenshot-mode");
  setImageSafely(screenshotImg, null);
  visual.onclick = null;
  
  if (zoomBadge) zoomBadge.classList.add("is-hidden");
  
  const effectiveBg = question.bg || IMAGE_ASSETS.backgrounds.livingRoom;
  setImageSafely(bgImg, effectiveBg);
  
  setImageSafely(characterImg, question.character);
  applyCharacterBlend(characterImg, question.character);
}