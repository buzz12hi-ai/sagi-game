/* =========================================================
   ui.js
   UI描画・4モード表示制御・揺れ控えめ反映・小学生総ルビ切替・ピンチズーム・会話ログ
   【進捗ゲージリアルタイム連動・即時反映完全版】
   ========================================================= */

window.DEBUG_MODE = false;

function escapeHTML(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach((el) => {
    el.classList.toggle("active", el.id === screenId);
  });

  const screenArea = document.getElementById("screen-area");
  if (screenArea) {
    screenArea.scrollTop = 0;
  }
}

function setImageSafely(imgElement, src) {
  if (!imgElement) return;
  if (!src) {
    imgElement.removeAttribute("src");
    imgElement.classList.add("is-hidden");
    return;
  }

  let cleanSrc = src;
  try {
    cleanSrc = decodeURI(src);
  } catch (e) {
    cleanSrc = src;
  }

  imgElement.classList.remove("is-hidden");

  imgElement.onerror = () => {
    imgElement.onerror = null;
    imgElement.removeAttribute("src");
    imgElement.classList.add("is-hidden");
  };

  imgElement.src = cleanSrc;
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
    "survey-guide-image", "rules-guide-image"
  ];

  targetImgIds.forEach(id => {
    const img = document.getElementById(id);
    if (img) {
      setImageSafely(img, joeImgSrc);
      applyCharacterBlend(img, joeImgSrc);
    }
  });
}

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

function applyMotionPreference(isReduced) {
  state.reduceMotion = Boolean(isReduced);
  const shell = document.getElementById("app-shell");
  if (shell) {
    shell.classList.toggle("reduce-motion", state.reduceMotion);
  }

  const statusLabel = document.getElementById("motion-switch-status-label");
  const toggleBtn = document.getElementById("btn-toggle-motion");
  const toggleText = document.getElementById("motion-toggle-text");
  const miniBtn = document.getElementById("btn-status-motion-toggle");

  if (statusLabel) {
    statusLabel.textContent = state.reduceMotion
      ? "現在の設定：控えめ（揺れ・点滅なし）"
      : "現在の設定：通常の演出（揺れ・点滅あり）";
  }

  if (toggleBtn) {
    toggleBtn.classList.toggle("is-reduced", state.reduceMotion);
    toggleBtn.setAttribute("aria-pressed", state.reduceMotion ? "true" : "false");
  }

  if (toggleText) {
    toggleText.textContent = state.reduceMotion ? "揺れ・点滅：OFF（控えめ）" : "揺れ・点滅：ON";
  }

  if (miniBtn) {
    miniBtn.classList.toggle("is-reduced", state.reduceMotion);
    if (state.mode === "elementary") {
      miniBtn.innerHTML = state.reduceMotion
        ? "✨ <ruby>揺<rt>ゆ</rt></ruby>れ:OFF"
        : "✨ <ruby>揺<rt>ゆ</rt></ruby>れ:ON";
    } else {
      miniBtn.textContent = state.reduceMotion ? "✨ 揺れ:OFF" : "✨ 揺れ:ON";
    }
  }
}

function toggleMotionPreference() {
  applyMotionPreference(!state.reduceMotion);
}

function setHtmlById(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

function setPillLabels(groupId, labels) {
  const group = document.getElementById(groupId);
  if (!group) return;
  const btns = group.querySelectorAll(".pill-btn");
  btns.forEach((btn, idx) => {
    if (labels[idx] !== undefined) btn.innerHTML = labels[idx];
  });
}

function applyModeTextsUI() {
  const isElem = state.mode === "elementary";

  setHtmlById("target-item-label", isElem ? "<ruby>目標<rt>もくひょう</rt></ruby>:" : "目標:");
  setHtmlById("money-yen-label", isElem ? "<ruby>円<rt>えん</rt></ruby>" : "円");
  setHtmlById("btn-retire", isElem ? "やめる" : "リタイア");
  applyMotionPreference(state.reduceMotion);

  setHtmlById("name-input-prompt", isElem
    ? "こんにちは！<br><ruby>君<rt>きみ</rt></ruby>の<ruby>名前<rt>なまえ</rt></ruby>を <ruby>教<rt>おし</rt></ruby>えて！"
    : "こんにちは！<br>君の名前を教えて！"
  );
  setHtmlById("name-input-error", isElem
    ? "⚠️ <ruby>名前<rt>なまえ</rt></ruby>を <ruby>入力<rt>にゅうりょく</rt></ruby>してください！"
    : "⚠️ 名前を入力してください！"
  );
  const nameInp = document.getElementById("input-player-name");
  if (nameInp) {
    nameInp.placeholder = isElem ? "なまえを いれてね" : "名前を入力してください";
  }
  setHtmlById("btn-name-submit", isElem ? "<ruby>決定<rt>けってい</rt></ruby>" : "決定");
  setHtmlById("btn-name-skip", isElem
    ? "スキップ（「あなた」で <ruby>進<rt>すす</rt></ruby>む）"
    : "スキップ（「あなた」で進む）"
  );

  setHtmlById("btn-intro-next", isElem ? "<ruby>次<rt>つぎ</rt></ruby>へ <ruby>進<rt>すす</rt></ruby>む" : "次へ進む");
  setHtmlById("rules-joe-lead", isElem
    ? "チャレンジを <ruby>始<rt>はじ</rt></ruby>める<ruby>前<rt>まえ</rt></ruby>に、ゲームのルールを <ruby>確認<rt>かくにん</rt></ruby>しよう！"
    : "チャレンジを始める前に、ゲームのルールを確認しよう！"
  );
  setHtmlById("btn-rules-next", isElem
    ? "<ruby>目標<rt>もくひょう</rt></ruby>を <ruby>選<rt>えら</rt></ruby>びにいく ▶"
    : "目標を選びに行く ▶"
  );

  setHtmlById("item-intro-title", isElem
    ? "1<ruby>週間後<rt>しゅうかんご</rt></ruby>、<ruby>欲<rt>ほ</rt></ruby>しいものを <ruby>買<rt>か</rt></ruby>えるかな？"
    : "1週間後、欲しいものを買えるかな？"
  );
  setHtmlById("item-intro-sub", isElem
    ? "<ruby>今週<rt>こんしゅう</rt></ruby>のおこづかい 50,000<ruby>円<rt>えん</rt></ruby>を <ruby>守<rt>mamo</rt></ruby>って、お<ruby>買<rt>か</rt></ruby>い<ruby>物<rt>もの</rt></ruby>に <ruby>挑戦<rt>ちょうせん</rt></ruby>しよう！"
    : "今週のおこづかい50,000円を守って、買い物に挑戦しよう！"
  );
  setHtmlById("item-guide-line", isElem
    ? "<ruby>何<rt>なに</rt></ruby>を <ruby>買<rt>か</rt></ruby>いたい？ <ruby>目標<rt>もくひょう</rt></ruby>を <ruby>選<rt>えら</rt></ruby>ぼう！"
    : "何を買いたい？目標を選ぼう！"
  );

  setHtmlById("synopsis-panel-title", isElem ? "これまでの あらすじ" : "これまでのあらすじ");
  setHtmlById("btn-synopsis-next", isElem ? "<ruby>月曜日<rt>げつようび</rt></ruby>へ" : "月曜日へ");
  setHtmlById("btn-dayintro-next", isElem ? "<ruby>次<rt>つぎ</rt></ruby>へ" : "次へ");

  setHtmlById("action-choice-prompt", isElem
    ? "<ruby>今日<rt>きょう</rt></ruby>の <ruby>行動<rt>こうどう</rt></ruby>を <ruby>選<rt>えら</rt></ruby>ぼう！（<ruby>正解<rt>せいかい</rt></ruby>・<ruby>不正解<rt>ふせいかい</rt></ruby>は ありません）"
    : "今日の行動を選ぼう！（正解・不正解はありません）"
  );
  setHtmlById("action-prompt-text", isElem
    ? "<ruby>学校<rt>がっこう</rt></ruby>が <ruby>終<rt>お</rt></ruby>わったよ！ この<ruby>後<rt>あと</rt></ruby>は どうする？"
    : "学校が終わったよ！この後はどうする？"
  );

  setHtmlById("btn-narration-next", isElem ? "<ruby>次<rt>つぎ</rt></ruby>へ" : "次へ");
  setHtmlById("btn-dialogue-prev", isElem ? "◀ <ruby>前<rt>まえ</rt></ruby>へ" : "◀ 前へ");
  setHtmlById("btn-dialogue-next", isElem ? "<ruby>次<rt>つぎ</rt></ruby>へ ▶" : "次へ ▶");

  setHtmlById("phone-date-text", isElem ? "10<ruby>月<rt>がつ</rt></ruby>15<ruby>日<rt>にち</rt></ruby>(<ruby>月<rt>げつ</rt></ruby>)" : "10月15日(月)");
  setHtmlById("phone-app-name", isElem ? "メッセージ" : "メッセージ");
  setHtmlById("phone-app-time", isElem ? "たった<ruby>今<rt>いま</rt></ruby>" : "たった今");
  setHtmlById("phone-bottom-guide-line", isElem
    ? "あ、スマホが <ruby>鳴<rt>な</rt></ruby>った！ <ruby>通知<rt>つうち</rt></ruby>を チェックしよう。"
    : "あ、スマホが鳴った！通知をチェックしよう。"
  );

  setHtmlById("zoom-hint-text", isElem ? "🔍 タップで <ruby>拡大<rt>かくだい</rt></ruby>" : "🔍 ピンチ・タップで拡大");
  setHtmlById("btn-open-log-event", isElem
    ? "📜 <ruby>直前<rt>ちょくぜん</rt></ruby>の <ruby>会話<rt>かいわ</rt></ruby>・<ruby>通知<rt>つうち</rt></ruby>を <ruby>見直<rt>みなお</rt></ruby>す"
    : "📜 直前の会話・通知を見直す"
  );
  setHtmlById("event-choice-prompt", isElem ? "あなたなら、どうする？" : "あなたなら、どうする？");
  setHtmlById("thinking-text", isElem ? "<ruby>考<rt>かんが</rt></ruby>え<ruby>中<rt>ちゅう</rt></ruby>..." : "判断中...");

  setHtmlById("result-9110-badge", isElem ? "🚨 <ruby>警察<rt>けいさつ</rt></ruby><ruby>相談<rt>そうだん</rt></ruby><ruby>窓口<rt>まどぐち</rt></ruby>" : "🚨 警察相談窓口");
  setHtmlById("result-9110-text", isElem
    ? "<ruby>怪<rt>あや</rt></ruby>しい<ruby>電話<rt>でんわ</rt></ruby>やメール、お<ruby>金<rt>かね</rt></ruby>の<ruby>話<rt>はなし</rt></ruby>で <ruby>少<rt>すこ</rt></ruby>しでも <ruby>迷<rt>まよ</rt></ruby>ったら<br><strong><ruby>警察<rt>けいさつ</rt></ruby><ruby>相談<rt>そうだん</rt></ruby><ruby>専用<rt>せんよう</rt></ruby><ruby>電話<rt>でんわ</rt></ruby>「#9110」</strong>または <ruby>近<rt>ちか</rt></ruby>くの<ruby>警察署<rt>けいさつしょ</rt></ruby>・おうちの<ruby>人<rt>ひと</rt></ruby>へ すぐ<ruby>相談<rt>そうだん</rt></ruby>！"
    : "不審な電話やメール、お金の話で少しでも迷ったら<br><strong>警察相談専用電話「#9110」</strong>または最寄りの警察署へすぐ相談！"
  );
  setHtmlById("btn-open-log", isElem
    ? "📜 <ruby>直前<rt>ちょくぜん</rt></ruby>の <ruby>会話<rt>かいわ</rt></ruby>・<ruby>通知<rt>つうち</rt></ruby>を <ruby>見直<rt>みなお</rt></ruby>す"
    : "📜 直前の会話・通知を見直す"
  );

  setHtmlById("btn-week-recap-next", isElem ? "<ruby>次<rt>つぎ</rt></ruby>へ <ruby>進<rt>すす</rt></ruby>む" : "次へ進む");
  setHtmlById("shopping-heading", isElem ? "<ruby>日曜日<rt>にちようび</rt></ruby>：お<ruby>買<rt>か</rt></ruby>い<ruby>物<rt>もの</rt></ruby>タイム" : "日曜日：お買い物タイム");
  setHtmlById("btn-ending", isElem ? "<ruby>結果<rt>けっか</rt></ruby>を <ruby>見<rt>み</rt></ruby>る" : "結果を見る");

  setHtmlById("image-modal-hint", isElem ? "🔍 タップで <ruby>拡大<rt>かくだい</rt></ruby>" : "🔍 ピンチ / タップで拡大");
  setHtmlById("btn-zoom-reset", isElem ? "↺ もとに<ruby>戻<rt>もど</rt></ruby>す" : "↺ 等倍");
  setHtmlById("btn-close-image-modal", isElem ? "✕ <ruby>閉<rt>と</rt></ruby>じる" : "✕ 閉じる");
  setHtmlById("log-modal-title", isElem ? "📜 <ruby>直前<rt>ちょくぜん</rt></ruby>の やり<ruby>取<rt>と</rt></ruby>り（<ruby>会話<rt>かいわ</rt></ruby>ログ）" : "📜 直前のやり取り（会話ログ）");
  setHtmlById("btn-close-log-modal", isElem ? "✕ <ruby>閉<rt>と</rt></ruby>じる" : "✕ 閉じる");

  setHtmlById("survey-header-text", isElem
    ? "1<ruby>週間<rt>しゅうかん</rt></ruby> <ruby>本当<rt>ほんとう</rt></ruby>に お<ruby>疲<rt>つか</rt></ruby>れさまでした！<br><ruby>学<rt>まな</rt></ruby>んだことや <ruby>感<rt>かん</rt></ruby>じたことを <ruby>教<rt>おし</rt></ruby>えてね！（<ruby>全<rt>ぜん</rt></ruby>10<ruby>問<rt>もん</rt></ruby>・<ruby>約<rt>やく</rt></ruby>1<ruby>分<rt>ふん</rt></ruby>）"
    : "1週間本当にお疲れさまでした！<br>学んだことや感じたことを教えてほしいな！（全10問・約1分）"
  );
  setHtmlById("survey-parta-title", isElem ? "🛡️ <ruby>防犯<rt>ぼうはん</rt></ruby><ruby>意識<rt>いしき</rt></ruby>・<ruby>行動<rt>こうどう</rt></ruby>の <ruby>変化<rt>へんか</rt></ruby>" : "🛡️ 防犯意識・行動の変化");
  setHtmlById("survey-partb-title", isElem ? "📖 ゲームの <ruby>分<rt>わ</rt></ruby>かりやすさ・<ruby>難<rt>むずか</rt></ruby>しさ・<ruby>解説<rt>かいせつ</rt></ruby>" : "📖 ゲームの分かりやすさ・難易度・解説");
  setHtmlById("survey-partc-title", isElem ? "💬 まわりへの <ruby>共有<rt>きょうゆう</rt></ruby>・<ruby>感想<rt>かんそう</rt></ruby>・<ruby>改善点<rt>かいぜんてん</rt></ruby>" : "💬 周囲への共有・感想・改善点");
}

function setJoeSupportMessage(msg) {
  const bubble = document.getElementById("joe-support-bubble");
  const textEl = document.getElementById("joe-support-text");
  if (!bubble || !textEl) return;

  if (msg) {
    textEl.innerHTML = msg;
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

  const yenUnit = state.mode === "elementary" ? "<ruby>円<rt>えん</rt></ruby>" : "円";
  if (amount > 0) {
    popEl.innerHTML = `+${amount.toLocaleString("ja-JP")}${yenUnit}`;
    popEl.classList.add("is-plus");
  } else if (amount < 0) {
    popEl.innerHTML = `${amount.toLocaleString("ja-JP")}${yenUnit}`;
    popEl.classList.add("is-minus");
  } else {
    return;
  }

  setTimeout(() => {
    popEl.classList.add("is-hidden");
  }, 1600);
}

// 所持金変更時に即時ゲージ幅を再計算して反映する関数
function updateTargetItemDisplay() {
  const chip = document.getElementById("target-item-display");
  const nameEl = document.getElementById("target-item-name");
  const gaugeFill = document.getElementById("statusBar-gauge-fill");
  if (!chip || !nameEl) return;

  if (state.selectedItem) {
    const isElem = state.mode === "elementary";
    const itemDisp = (isElem && state.selectedItem.rubyName) ? state.selectedItem.rubyName : escapeHTML(state.selectedItem.name);
    const priceText = isElem
      ? `${state.selectedItem.price.toLocaleString("ja-JP")}<ruby>円<rt>えん</rt></ruby>`
      : `¥${state.selectedItem.price.toLocaleString("ja-JP")}`;

    nameEl.innerHTML = `${itemDisp} (${priceText})`;
    chip.classList.remove("is-hidden");

    if (gaugeFill) {
      const targetPrice = Number(state.selectedItem.price) || 1;
      const currentMoney = Number(state.money) || 0;
      
      let ratio = (currentMoney / targetPrice) * 100;
      ratio = Math.max(0, Math.min(100, ratio));

      gaugeFill.style.width = `${ratio}%`;

      gaugeFill.classList.remove("is-warning", "is-danger");
      if (currentMoney < targetPrice) {
        gaugeFill.classList.add("is-danger");
      } else if (ratio < 60) {
        gaugeFill.classList.add("is-warning");
      }
    }
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

  const allLabels = (typeof SEVEN_DAY_LABELS !== "undefined")
    ? SEVEN_DAY_LABELS
    : ["月", "火", "水", "木", "金", "土", "日"];

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
  applyMotionPreference(state.reduceMotion);
}

function itemVisualHTML(item, imgClass) {
  if (item && item.image) {
    return `<img class="${imgClass}" src="${item.image}" alt="${escapeHTML(item.name)}">`;
  }
  return `<span class="item-emoji ${imgClass}-emoji">${item ? item.emoji : "🛡️"}</span>`;
}

function applyCharacterBlend(imgElement, src) {
  if (!imgElement) return;
  imgElement.classList.remove("blend-multiply", "blend-screen");
}

const DAY_BACKGROUND_MAP = {
  "月": IMAGE_ASSETS.backgrounds.schoolRoute,
  "火": IMAGE_ASSETS.backgrounds.schoolRoute2,
  "水": IMAGE_ASSETS.backgrounds.school,
  "木": IMAGE_ASSETS.backgrounds.livingRoom,
  "金": IMAGE_ASSETS.backgrounds.myRoom,
  "土": IMAGE_ASSETS.backgrounds.convenienceStoreFallback,
  "日": IMAGE_ASSETS.backgrounds.entrance
};

function showDayIntro(label, onNext, comment) {
  const slot = currentScheduleSlot();

  const labelEl = document.getElementById("dayintro-label");
  if (labelEl) {
    labelEl.innerHTML = state.mode === "elementary"
      ? `${slot.weekdayName}<ruby>曜日<rt>ようび</rt></ruby>`
      : `${slot.weekdayName}曜日`;
  }
  document.getElementById("dayintro-daynum").textContent = slot.dayNumber;
  document.getElementById("dayintro-comment").innerHTML = (comment || "").replace(/\n/g, "<br>");

  const bgImg = document.getElementById("dayintro-bg-image");
  const guideImg = document.getElementById("dayintro-guide-image");
  const dayBgSrc = DAY_BACKGROUND_MAP[slot.weekdayName] || IMAGE_ASSETS.backgrounds.schoolRoute;

  setImageSafely(bgImg, dayBgSrc);

  setJoeExpression("cheer");
  setImageSafely(guideImg, getJoeImage(state.joeExpression));
  applyCharacterBlend(guideImg, getJoeImage(state.joeExpression));

  showScreen("screen-dayintro");

  const bannerEl = document.getElementById("dayintro-banner");
  if (bannerEl) {
    bannerEl.classList.remove("is-animating");
    void bannerEl.offsetWidth;
    if (!state.reduceMotion) {
      bannerEl.classList.add("is-animating");
    }
  }

  document.getElementById("btn-dayintro-next").onclick = onNext;
}

let zoomState = {
  scale: 1,
  startDistance: 0,
  initialScale: 1,
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

  modalImg.onclick = (e) => {
    e.stopPropagation();
    if (zoomState.scale > 1.2) {
      resetZoom(modalImg);
    } else {
      zoomState.scale = 2.2;
      modalImg.classList.add("is-zoomed");
      updateImageTransform(modalImg);
    }
  };

  const touchArea = scrollArea || modalImg;

  touchArea.ontouchstart = (e) => {
    if (e.touches.length === 2) {
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

  touchArea.ontouchmove = (e) => {
    if (e.touches.length === 2 && zoomState.startDistance > 0) {
      const currentDist = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );
      const factor = currentDist / zoomState.startDistance;
      let nextScale = zoomState.initialScale * factor;
      nextScale = Math.min(Math.max(1.0, nextScale), 3.5);
      zoomState.scale = nextScale;
      updateImageTransform(modalImg);
    } else if (e.touches.length === 1 && zoomState.isDragging && zoomState.scale > 1) {
      zoomState.translateX = (e.touches[0].pageX - zoomState.startX);
      zoomState.translateY = (e.touches[0].pageY - zoomState.startY);
      updateImageTransform(modalImg);
    }
  };

  touchArea.ontouchend = (e) => {
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

function openLogModal() {
  const modal = document.getElementById("log-modal");
  const contentEl = document.getElementById("log-modal-content");
  if (!modal || !contentEl) return;

  const question = currentQuestion();
  if (!question) return;

  const isElem = state.mode === "elementary";
  let html = `<div class="log-timeline">`;

  if (question.narration) {
    html += `
      <div class="log-entry log-narration">
        <span class="log-badge">${isElem ? "📖 <ruby>状況<rt>じょうきょう</rt></ruby>" : "📖 状況"}</span>
        <p class="log-text">${question.narration.replace(/\n/g, "<br>")}</p>
      </div>
    `;
  }

  if (question.dialogue && question.dialogue.length > 0) {
    html += `<div class="log-chat-stream">`;
    question.dialogue.forEach(line => {
      const isPlayer = (line.speaker === "主人公" || line.speaker === "あなた");
      const speakerName = isPlayer ? escapeHTML(getPlayerDisplayName()) : line.speaker;
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
        <span class="log-badge">${isElem ? "📱 <ruby>届<rt>とど</rt></ruby>いた<ruby>通知<rt>つうち</rt></ruby>" : "📱 届いた通知"}</span>
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