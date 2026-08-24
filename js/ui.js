/* =========================================================
   ui.js
   UI描画・4モード表示制御・ピンチズーム・会話ログ・Mac文字コード自動修復
   ========================================================= */

window.DEBUG_MODE = true;

function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach((el) => {
    el.classList.toggle("active", el.id === screenId);
  });
}

/* ★ Mac特有の日本語ファイル名（NFD/NFC）を自動補正して必ず表示する安全関数 ★ */
function setImageSafely(imgElement, src) {
  if (!imgElement) return;
  if (!src) {
    imgElement.removeAttribute("src");
    imgElement.classList.add("is-hidden");
    return;
  }

  imgElement.classList.remove("is-hidden");

  imgElement.onerror = () => {
    if (!imgElement.dataset.triedNFD) {
      imgElement.dataset.triedNFD = "true";
      imgElement.src = src.normalize("NFD");
      return;
    }
    if (!imgElement.dataset.triedEncoded) {
      imgElement.dataset.triedEncoded = "true";
      imgElement.src = encodeURI(src);
      return;
    }
    if (!imgElement.dataset.triedNFDEncoded) {
      imgElement.dataset.triedNFDEncoded = "true";
      imgElement.src = encodeURI(src.normalize("NFD"));
      return;
    }

    imgElement.classList.add("is-hidden");
  };

  delete imgElement.dataset.triedNFD;
  delete imgElement.dataset.triedEncoded;
  delete imgElement.dataset.triedNFDEncoded;

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

// 主人公画像のモード別切替（小学生/中高生・一般大人・高齢者）
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
  } else if (state.mode === "adult") {
    const map = {
      playerNeutral:    IMAGE_ASSETS.characters.adultNeutral,
      playerHappy:      IMAGE_ASSETS.characters.adultHappy,
      playerSad:        IMAGE_ASSETS.characters.adultSad,
      playerQuestion:   IMAGE_ASSETS.characters.adultQuestion,
      playerThinking:   IMAGE_ASSETS.characters.adultThinking,
      playerWorry:      IMAGE_ASSETS.characters.adultWorry,
      playerWalking:    IMAGE_ASSETS.characters.adultWalking,
      playerSmartphone: IMAGE_ASSETS.characters.adultSmartphone,
      playerAngry:      IMAGE_ASSETS.characters.adultAngry
    };
    return map[expressionType] || IMAGE_ASSETS.characters.adultNeutral;
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
  setImageSafely(bgImg, null);

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

/* ★ 資料・画像ポップアップ（スマホ対応ピンチズーム・パン・タップ拡大） ★ */
let zoomState = {
  scale: 1,
  startDistance: 0,
  initialScale: 1,
  lastTapTime: 0,
  startX: 0,
  startY: 0,
  translateX: 0,
  translateY: 0,
  isDragging: false
};

function updateImageTransform(modalImg) {
  if (!modalImg) return;
  modalImg.style.transform = `scale(${zoomState.scale}) translate(${zoomState.translateX}px, ${zoomState.translateY}px)`;
}

function resetZoom(modalImg) {
  zoomState.scale = 1;
  zoomState.translateX = 0;
  zoomState.translateY = 0;
  if (modalImg) {
    modalImg.style.transform = `scale(1) translate(0px, 0px)`;
    modalImg.classList.remove("is-zoomed");
  }
}

function openImageModal(imgSrc) {
  if (!imgSrc) return;
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("image-modal-img");
  const scrollArea = document.getElementById("image-modal-scroll-area");
  if (!modal || !modalImg) return;

  setImageSafely(modalImg, imgSrc);
  resetZoom(modalImg);
  modal.classList.remove("is-hidden");

  if (scrollArea) {
    scrollArea.scrollTop = 0;
    scrollArea.scrollLeft = 0;
  }

  // 1. タップ / クリック / ダブルタップでズーム
  modalImg.onclick = (e) => {
    e.stopPropagation();
    const now = Date.now();
    // シングルタップ/ダブルタップ兼用トグル
    if (zoomState.scale > 1.2) {
      resetZoom(modalImg);
    } else {
      zoomState.scale = 2.2;
      modalImg.classList.add("is-zoomed");
      updateImageTransform(modalImg);
    }
  };

  // 2. スマホ実機の 2本指ピンチイン・ピンチアウト処理
  modalImg.ontouchstart = (e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      zoomState.startDistance = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );
      zoomState.initialScale = zoomState.scale;
    } else if (e.touches.length === 1 && zoomState.scale > 1) {
      zoomState.isDragging = true;
      zoomState.startX = e.touches[0].pageX - zoomState.translateX;
      zoomState.startY = e.touches[0].pageY - zoomState.translateY;
    }
  };

  modalImg.ontouchmove = (e) => {
    if (e.touches.length === 2 && zoomState.startDistance > 0) {
      e.preventDefault();
      const currentDist = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );
      const factor = currentDist / zoomState.startDistance;
      let nextScale = zoomState.initialScale * factor;
      nextScale = Math.min(Math.max(1.0, nextScale), 3.5); // 1倍〜3.5倍に制限
      zoomState.scale = nextScale;
      updateImageTransform(modalImg);
    } else if (e.touches.length === 1 && zoomState.isDragging && zoomState.scale > 1) {
      e.preventDefault();
      zoomState.translateX = (e.touches[0].pageX - zoomState.startX);
      zoomState.translateY = (e.touches[0].pageY - zoomState.startY);
      updateImageTransform(modalImg);
    }
  };

  modalImg.ontouchend = (e) => {
    if (e.touches.length < 2) {
      zoomState.startDistance = 0;
    }
    if (e.touches.length === 0) {
      zoomState.isDragging = false;
      if (zoomState.scale <= 1.05) {
        resetZoom(modalImg);
      }
    }
  };

  // 等倍リセットボタン
  const resetBtn = document.getElementById("btn-zoom-reset");
  if (resetBtn) {
    resetBtn.onclick = (e) => {
      e.stopPropagation();
      resetZoom(modalImg);
    };
  }
}

function closeImageModal() {
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("image-modal-img");
  if (modal) {
    modal.classList.add("is-hidden");
  }
  if (modalImg) {
    resetZoom(modalImg);
  }
}

/* ★ 会話・通知ログ見直しモーダル制御 ★ */
function openLogModal() {
  const modal = document.getElementById("log-modal");
  const contentEl = document.getElementById("log-modal-content");
  if (!modal || !contentEl) return;

  const question = currentQuestion();
  if (!question) return;

  let html = `<div class="log-timeline">`;

  if (question.narration) {
    html += `
      <div class="log-entry log-narration">
        <span class="log-badge">📖 状況</span>
        <p class="log-text">${question.narration.replace(/\n/g, "<br>")}</p>
      </div>
    `;
  }

  if (question.dialogue && question.dialogue.length > 0) {
    html += `<div class="log-chat-stream">`;
    question.dialogue.forEach(line => {
      const isPlayer = (line.speaker === "主人公" || line.speaker === "あなた");
      const speakerName = isPlayer ? getPlayerDisplayName() : line.speaker;
      html += `
        <div class="log-chat-bubble ${isPlayer ? 'is-player' : 'is-npc'}">
          <span class="log-speaker-name">${speakerName}</span>
          <p class="log-line-text">${line.line.replace(/\n/g, "<br>")}</p>
        </div>
      `;
    });
    html += `</div>`;
  }

  if (question.notification) {
    html += `
      <div class="log-entry log-notification">
        <span class="log-badge">📱 届いた通知</span>
        <p class="log-text">${question.notification}</p>
      </div>
    `;
  }

  html += `</div>`;
  contentEl.innerHTML = html;
  modal.classList.remove("is-hidden");
}

function closeLogModal() {
  const modal = document.getElementById("log-modal");
  if (modal) {
    modal.classList.add("is-hidden");
  }
}

function renderEventVisual(question) {
  const screenshotImg = document.getElementById("event-screenshot-image");
  const bgImg = document.getElementById("event-bg-image");
  const characterImg = document.getElementById("event-character-image");
  const visual = document.getElementById("event-visual");
  const zoomBadge = document.getElementById("zoom-hint-badge");

  if (window.DEBUG_MODE) {
    const imgInfo = question.screenshot ? question.screenshot : (question.character || question.bg || "なし");
    console.log(`[DEBUG] MODE: ${state.mode} | QUESTION ID: ${question.id} | IMAGE: ${imgInfo}`);
  }

  if (question.screenshot) {
    visual.classList.add("is-screenshot-mode");
    setImageSafely(screenshotImg, question.screenshot);
    setImageSafely(bgImg, null);
    setImageSafely(characterImg, null);
    applyCharacterBlend(characterImg, null);
    
    if (zoomBadge) zoomBadge.classList.remove("is-hidden");

    visual.onclick = () => openImageModal(question.screenshot);
    return;
  }

  visual.classList.remove("is-screenshot-mode");
  setImageSafely(screenshotImg, null);
  visual.onclick = null;
  
  if (zoomBadge) zoomBadge.classList.add("is-hidden");
  
  const effectiveBg = question.bg || IMAGE_ASSETS.backgrounds.livingRoom;
  setImageSafely(bgImg, effectiveBg);
  
  setImageSafely(characterImg, question.character);
  applyCharacterBlend(characterImg, question.character);
}