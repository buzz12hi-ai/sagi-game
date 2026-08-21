/* =========================================================
   ui.js
   -----------------------------------------------------------
   UI描画・4モード表示制御・資料タップ拡大モーダル制御
   デバッグ情報出力 ＆ 全問リアルモック画面即時フォールバック完全対応
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
    mockContainer.style.overflow = "auto";
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

/* ★ 全問題対応：超リアルモック画面HTML生成カタログ ★ */
function generateFallbackMockHTML(question) {
  const qId = question.id;

  // 1. サポート詐欺（Microsoft/ウイルス警告画面）
  if (qId === "q_adult_colleague_help" || qId === "q_senior_web_support") {
    return `
      <div style="background:#B30000; color:#fff; width:100%; height:100%; min-height:280px; padding:16px; box-sizing:border-box; font-family:sans-serif; border-radius:8px; display:flex; flex-direction:column; justify-content:space-between; box-shadow:inset 0 0 20px rgba(0,0,0,0.5);">
        <div style="border-bottom:2px solid #fff; padding-bottom:6px;">
          <div style="font-size:18px; font-weight:bold; display:flex; align-items:center; gap:6px;">
            <span>🚨</span> Microsoft セキュリティ警告
          </div>
          <div style="font-size:11px; opacity:0.9;">エラーコード: 0x80070422 - スパイウェア検出</div>
        </div>
        <div style="background:#FFFFFF; color:#222; padding:12px; border-radius:6px; font-size:13px; line-height:1.5; box-shadow:0 4px 12px rgba(0,0,0,0.3);">
          <strong style="color:#C00000; font-size:15px;">【緊急】システムがロックされました</strong><br>
          個人情報・パスワードが漏洩する危険があります。<br>
          直ちに下記のサポート窓口へお電話ください。<br>
          <div style="text-align:center; margin-top:8px; font-size:18px; font-weight:bold; color:#0055AA; background:#EBF3FA; padding:6px; border-radius:4px;">
            📞 050-3196-XXXX（通話無料）
          </div>
        </div>
        <div style="font-size:11px; opacity:0.9; text-align:center; background:rgba(0,0,0,0.3); padding:4px; border-radius:4px;">
          ※電源を切るとPCが完全に破壊されます
        </div>
      </div>
    `;
  }

  // 2. 警察・PayPay不正利用
  if (qId === "q_adult_police_paypay_scam" || qId === "q_elem_police_mail" || qId === "q_teen_police_mail") {
    return `
      <div style="background:#FFFFFF; color:#111; width:100%; height:100%; min-height:280px; padding:14px; box-sizing:border-box; font-family:sans-serif; border-radius:8px; border:2px solid #1B2A4A; display:flex; flex-direction:column; justify-content:space-between;">
        <div style="background:#1B2A4A; color:#fff; padding:8px 12px; border-radius:4px; font-size:13.5px; font-weight:bold; display:flex; justify-content:space-between;">
          <span>サイバー犯罪対策課 通達</span>
          <span style="color:#FF4D4D;">緊急</span>
        </div>
        <div style="font-size:12.5px; line-height:1.6; padding:8px 4px;">
          <strong>差出人:</strong> police-alert@secure-check.com<br>
          <strong>件名:</strong> 【重要】特殊詐欺口座利用の検知と法的措置<br>
          <div style="margin-top:6px; background:#F5F7FA; padding:8px; border-left:4px solid #1B2A4A; font-size:12px;">
            あなた名義のアカウントが特殊詐欺に悪用された疑いがあります。<br>
            24時間以内に本人認証を行わない場合、全口座を凍結し法的措置へ移行します。
          </div>
        </div>
        <div style="background:#FF0033; color:#fff; text-align:center; padding:9px; border-radius:6px; font-weight:bold; font-size:13px;">
          緊急本人確認リンク（認証へ）
        </div>
      </div>
    `;
  }

  // 3. 銀行ワンタイム・OTP詐欺
  if (qId === "q_adult_bank_otp_scam") {
    return `
      <div style="background:#F2F4F8; color:#333; width:100%; height:100%; min-height:280px; padding:14px; box-sizing:border-box; font-family:sans-serif; border-radius:8px; display:flex; flex-direction:column; justify-content:space-between;">
        <div style="background:#1B2A4A; color:#fff; padding:8px 12px; border-radius:4px; font-weight:bold; font-size:14px;">
          都市銀行 セキュリティ認証
        </div>
        <div style="background:#fff; border:1px solid #DCE3EE; padding:12px; border-radius:6px; font-size:12.5px; line-height:1.6;">
          <div style="color:#E85C4A; font-weight:bold; margin-bottom:4px;">【重要】取引規制解除の手続き</div>
          第三者による不正アクセスを検知しました。<br>
          解除のため、届いた<strong>ワンタイムパスワード（6桁）</strong>を入力してください。
          <div style="margin-top:8px; background:#F8FAFC; border:1.5px dashed #4A5A7C; padding:6px; text-align:center; font-size:16px; font-weight:bold; letter-spacing:4px;">
            [ _ _ _ _ _ _ ]
          </div>
        </div>
        <div style="font-size:11px; color:#888; text-align:center;">URL: http://bank-security-verify.net</div>
      </div>
    `;
  }

  // 4. 国税庁・e-Tax 還付金 / 差押え
  if (qId === "q_adult_etax_scam" || qId === "q_senior_mail_tax") {
    return `
      <div style="background:#FFFFFF; color:#222; width:100%; height:100%; min-height:280px; padding:14px; box-sizing:border-box; font-family:sans-serif; border-radius:8px; border:2px solid #005A9C; display:flex; flex-direction:column; justify-content:space-between;">
        <div style="border-bottom:2px solid #005A9C; padding-bottom:6px; display:flex; justify-content:space-between; align-items:center;">
          <span style="font-weight:bold; color:#005A9C; font-size:15px;">国税庁 e-Tax 電子納税</span>
          <span style="font-size:11px; background:#E5F0FA; color:#005A9C; padding:2px 6px; border-radius:4px;">重要通達</span>
        </div>
        <div style="font-size:12.5px; line-height:1.6;">
          <strong>【重要なお知らせ】</strong><br>
          未納または過年度還付の手続きが必要です。<br>
          期限：<strong>本日24時まで</strong><br>
          下記ボタンより口座情報およびクレジットカード情報を入力してください。
        </div>
        <div style="background:#005A9C; color:#fff; text-align:center; padding:9px; border-radius:6px; font-weight:bold; font-size:13.5px;">
          e-Tax オンライン払戻・納付手続き
        </div>
      </div>
    `;
  }

  // 5. 闇バイト
  if (qId === "q_teen_dark_job") {
    return `
      <div style="background:#111; color:#fff; width:100%; height:100%; min-height:280px; padding:14px; box-sizing:border-box; font-family:sans-serif; border-radius:8px; display:flex; flex-direction:column; justify-content:space-between;">
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

  // 6. チケット転売
  if (qId === "q_teen_ticket_scam") {
    return `
      <div style="background:#0F172A; color:#fff; width:100%; height:100%; min-height:280px; padding:14px; box-sizing:border-box; font-family:sans-serif; border-radius:8px; display:flex; flex-direction:column; justify-content:space-between;">
        <div style="display:flex; align-items:center; gap:8px; border-bottom:1px solid #334155; padding-bottom:6px;">
          <div style="font-size:20px;">🎫</div>
          <div style="font-weight:bold; font-size:14px;">チケット譲渡【公式トレード外】</div>
        </div>
        <div style="font-size:12.5px; line-height:1.6; background:#1E293B; padding:10px; border-radius:6px;">
          【譲】〇〇 TOUR 2026 アリーナ最前列 2連番<br>
          【求】定価（1枚 12,000円）<br><br>
          急用で行けなくなりました😭<br>
          PayPay送金確認後に電子チケット分配します！
        </div>
        <div style="text-align:center; color:#38BDF8; font-size:12px; font-weight:bold;">💬 DMにて取引詳細</div>
      </div>
    `;
  }

  // 7. 著作権侵害警告DM
  if (qId === "q_teen_copyright_dm") {
    return `
      <div style="background:#000; color:#fff; width:100%; height:100%; min-height:280px; padding:14px; box-sizing:border-box; font-family:sans-serif; border-radius:8px; display:flex; flex-direction:column; justify-content:space-between;">
        <div style="display:flex; align-items:center; gap:8px; border-bottom:1px solid #333; padding-bottom:6px;">
          <span style="font-size:18px;">⚠️</span>
          <span style="font-weight:bold; font-size:14px;">Copyright Support Team</span>
        </div>
        <div style="font-size:12.5px; line-height:1.6; background:#1A1A1A; padding:10px; border-radius:6px;">
          【重要】あなたの投稿について著作権侵害の通報がありました。<br>
          24時間以内に下記URLより異議申し立てを行わない場合、アカウントが永久削除されます。<br><br>
          <span style="color:#0095F6; text-decoration:underline;">https://instagram-copyright-appeal.com</span>
        </div>
        <div style="text-align:center; color:#888; font-size:11px;">Instagram Official Bot</div>
      </div>
    `;
  }

  // 8. マイナポータル
  if (qId === "q_adult_myna_scam") {
    return `
      <div style="background:#FFF9E6; color:#222; width:100%; height:100%; min-height:280px; padding:14px; box-sizing:border-box; font-family:sans-serif; border-radius:8px; border:2px solid #E5A000; display:flex; flex-direction:column; justify-content:space-between;">
        <div style="background:#D97706; color:#fff; padding:6px 10px; border-radius:4px; font-weight:bold; font-size:13.5px;">
          デジタル庁 マイナポータル通達
        </div>
        <div style="font-size:12.5px; line-height:1.6; padding:4px;">
          <strong>【電子証明書 有効期限切れ警告】</strong><br>
          マイナンバーカードの電子証明書の有効期限が切れています。<br>
          本日中に更新されない場合、保険証連携および公金口座受取が停止されます。<br>
          更新URL: http://myna-portal-auth.com
        </div>
        <div style="background:#D97706; color:#fff; text-align:center; padding:9px; border-radius:6px; font-weight:bold; font-size:13px;">
          暗証番号を再登録して更新する
        </div>
      </div>
    `;
  }

  // 9. 電気ガスライフライン停止
  if (qId === "q_adult_utility_scam") {
    return `
      <div style="background:#1C1917; color:#fff; width:100%; height:100%; min-height:280px; padding:14px; box-sizing:border-box; font-family:sans-serif; border-radius:8px; border:2px solid #EA580C; display:flex; flex-direction:column; justify-content:space-between;">
        <div style="background:#EA580C; color:#fff; padding:6px 10px; border-radius:4px; font-weight:bold; font-size:13.5px;">
          電力供給センター【緊急予告】
        </div>
        <div style="font-size:12.5px; line-height:1.6; background:#292524; padding:10px; border-radius:6px;">
          電気料金（4,980円）の未払いが確認されました。<br>
          <strong>本日18:00</strong> までにお支払いが確認できない場合、電力の供給を停止いたします。<br><br>
          支払いサイト: http://power-pay-bill.net
        </div>
        <div style="background:#EA580C; color:#fff; text-align:center; padding:9px; border-radius:6px; font-weight:bold; font-size:13px;">
          今すぐクレジットカードで決済する
        </div>
      </div>
    `;
  }

  // 10. 排水管清掃チラシ
  if (qId === "q_senior_visit_pipe_clean") {
    return `
      <div style="background:#FFFFFF; color:#222; width:100%; height:100%; min-height:280px; padding:14px; box-sizing:border-box; font-family:sans-serif; border-radius:8px; border:3px dashed #0284C7; display:flex; flex-direction:column; justify-content:space-between;">
        <div style="background:#0284C7; color:#fff; text-align:center; padding:6px; border-radius:4px; font-weight:bold; font-size:14px;">
          地域一斉 排水管高圧洗浄キャンペーン！
        </div>
        <div style="text-align:center; padding:8px 0;">
          <div style="font-size:13px; color:#555;">通常価格 25,000円のところ</div>
          <div style="font-size:26px; font-weight:900; color:#DC2626;">特別価格 3,000円！</div>
          <div style="font-size:11px; color:#666; margin-top:4px;">※近隣一括施工のため本日限りの破格値！</div>
        </div>
        <div style="font-size:11.5px; background:#F0F9FF; padding:8px; border-radius:4px; color:#0369A1; text-align:center;">
          📞 0120-XXX-XXX（今すぐお電話を！）
        </div>
      </div>
    `;
  }

  // 汎用リッチモック（SMS / DM / 公式通知風カード）
  return `
    <div style="background:#1B2A4A; color:#fff; width:100%; height:100%; min-height:280px; padding:14px; box-sizing:border-box; font-family:sans-serif; border-radius:8px; display:flex; flex-direction:column; justify-content:space-between; border:2px solid #F5A623;">
      <div style="border-bottom:1px solid rgba(255,255,255,0.2); padding-bottom:6px; font-weight:bold; font-size:14px; color:#F5A623; display:flex; justify-content:space-between;">
        <span>📍 ${question.source || "通知"}</span>
        <span style="font-size:11px; background:rgba(255,255,255,0.2); padding:2px 6px; border-radius:4px;">未読</span>
      </div>
      <div style="background:rgba(255,255,255,0.1); padding:12px; border-radius:6px; font-size:13px; line-height:1.6; margin:8px 0;">
        <div style="font-weight:bold; font-size:14.5px; margin-bottom:6px; color:#FFFFFF;">${question.title.replace(/<[^>]+>/g, '')}</div>
        <div style="opacity:0.95; font-size:12.5px;">${question.desc ? question.desc.replace(/<[^>]+>/g, '') : "届いた内容を慎重に確認してください。"}</div>
      </div>
      <div style="font-size:11.5px; color:#F5A623; text-align:center; background:rgba(0,0,0,0.3); padding:5px; border-radius:4px;">
        🔍 タップ / クリックで資料を拡大表示
      </div>
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

  // 既存のモックHTMLを初期化
  const existingMock = visual.querySelector(".event-mock-container");
  if (existingMock) existingMock.remove();

  if (question.screenshot) {
    visual.classList.add("is-screenshot-mode");
    setImageSafely(bgImg, null);
    setImageSafely(characterImg, null);
    applyCharacterBlend(characterImg, null);

    if (zoomBadge) zoomBadge.classList.remove("is-hidden");

    // ★ 解決策：画像チェック前にまずリアルモック画面を即時描画（真っ黒になる瞬間をゼロにする）
    const mockHTML = generateFallbackMockHTML(question);
    const mockContainer = document.createElement("div");
    mockContainer.className = "event-mock-container";
    mockContainer.style.width = "100%";
    mockContainer.style.height = "100%";
    mockContainer.style.display = "flex";
    mockContainer.innerHTML = mockHTML;
    visual.appendChild(mockContainer);

    screenshotImg.classList.add("is-hidden");
    visual.onclick = () => openImageModal(null, mockHTML);

    // ★ プリロードで実在ファイルが存在する場合のみ画像に自動切り替え
    const imgTester = new Image();
    imgTester.onload = () => {
      // 画像が存在する場合はモックを消して本物の画像を表示
      mockContainer.remove();
      screenshotImg.src = question.screenshot;
      screenshotImg.classList.remove("is-hidden");
      visual.onclick = () => openImageModal(question.screenshot, null);
    };
    imgTester.onerror = () => {
      // 画像が存在しない場合はモック画面のまま維持
      screenshotImg.classList.add("is-hidden");
    };
    imgTester.src = question.screenshot;

    return;
  }

  // screenshot がない問題（背景＋立ち絵）
  visual.classList.remove("is-screenshot-mode");
  screenshotImg.classList.add("is-hidden");
  visual.onclick = null;
  
  if (zoomBadge) zoomBadge.classList.add("is-hidden");
  
  const effectiveBg = question.bg || IMAGE_ASSETS.backgrounds.livingRoom;
  setImageSafely(bgImg, effectiveBg);
  
  setImageSafely(characterImg, question.character);
  applyCharacterBlend(characterImg, question.character);
}