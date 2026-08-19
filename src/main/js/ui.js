/* =========================================================
   ui.js
   -----------------------------------------------------------
   UI描画・主人公立ち絵切替（学生/高齢者）・不透明合成
   ========================================================= */

function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach((el) => {
    el.classList.toggle("active", el.id === screenId);
  });
}

function setImageSafely(imgElement, src) {
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
    "ending-guide-image", "intro-guide-image", "action-guide-image", "title-joe-image"
  ];

  targetImgIds.forEach(id => {
    const img = document.getElementById(id);
    if (img) {
      setImageSafely(img, joeImgSrc);
      applyCharacterBlend(img, joeImgSrc);
    }
  });
}

// 主人公画像（学生 / 高齢者モード切替対応）
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

  if (state.mode !== "senior" && state.selectedItem) {
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

  const allLabels = state.mode === "senior"
    ? SENIOR_WEEKDAY_LABELS
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

function renderEventVisual(question) {
  const screenshotImg = document.getElementById("event-screenshot-image");
  const bgImg = document.getElementById("event-bg-image");
  const characterImg = document.getElementById("event-character-image");
  const visual = document.getElementById("event-visual");

  if (question.screenshot) {
    visual.classList.add("is-screenshot-mode");
    setImageSafely(screenshotImg, question.screenshot);
    setImageSafely(bgImg, null);
    setImageSafely(characterImg, null);
    applyCharacterBlend(characterImg, null);
    return;
  }

  visual.classList.remove("is-screenshot-mode");
  setImageSafely(screenshotImg, null);
  
  const effectiveBg = question.bg || IMAGE_ASSETS.backgrounds.livingRoom;
  setImageSafely(bgImg, effectiveBg);
  
  setImageSafely(characterImg, question.character);
  applyCharacterBlend(characterImg, question.character);
}