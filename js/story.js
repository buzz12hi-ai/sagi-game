/* =========================================================
   story.js
   会話・あらすじ・自己紹介・通知・週末ふりかえりストーリー演出
   （会話「前へ戻る」機能・揺れ控えめ対応・表記修正・小学生総ルビ対応版）
   ========================================================= */

const FALLBACK_SCENE_BG = IMAGE_ASSETS.backgrounds.livingRoom;

let isDialogueTransitioning = false;
let notificationAutoTimer = null;

function getDisplaySpeakerName(speaker) {
  if (speaker === "主人公" || speaker === "あなた") {
    return escapeHTML(getPlayerRawName());
  }
  return speaker;
}

function showJoeIntro(onNext) {
  const bgImg = document.getElementById("intro-bg-image");
  const guideImg = document.getElementById("intro-guide-image");
  const introTextEl = document.getElementById("intro-text");

  setImageSafely(bgImg, IMAGE_ASSETS.backgrounds.schoolRoute);
  setJoeExpression("happy");
  setImageSafely(guideImg, getJoeImage("happy"));
  applyCharacterBlend(guideImg, getJoeImage("happy"));

  const safeDispName = escapeHTML(getPlayerDisplayName());

  if (introTextEl) {
    if (state.mode === "senior") {
      introTextEl.innerHTML = `
        はじめまして！ 私は防犯サポーターのジョーくんです！<br><br>
        この1週間、あなたの生活に潜む「詐欺の手口」を見抜くお手伝いをします。<br>
        大切なお金と暮らしを守るため、一緒に落ち着いて見分けていきましょう！
      `;
    } else if (state.mode === "adult") {
      introTextEl.innerHTML = `
        はじめまして！ 僕はジョーくん！<br><br>
        この1週間、${safeDispName}の防犯チャレンジをサポートするよ！<br>
        税金・投資・サブスク・ビジネスなど、日常に潜む巧妙な詐欺やトラブルを一緒に見抜いていこう！
      `;
    } else if (state.mode === "elementary") {
      introTextEl.innerHTML = `
        はじめまして！ ぼくは ジョーくんだよ！<br><br>
        この 1<ruby>週間<rt>しゅうかん</rt></ruby>、${safeDispName}を しっかりサポートするよ！<br>
        <ruby>怪<rt>あや</rt></ruby>しい <ruby>詐欺<rt>さぎ</rt></ruby>（うそ）を <ruby>見<rt>み</rt></ruby>ぬく <ruby>力<rt>ちから</rt></ruby>を いっしょに <ruby>身<rt>み</rt></ruby>につけよう！
      `;
    } else {
      introTextEl.innerHTML = `
        はじめまして！ 僕はジョーくん！<br><br>
        この1週間、${safeDispName}をしっかりサポートするよ！<br>
        SNSやゲーム、ネットに潜む詐欺やトラブルを見抜く力を一緒に身につけよう！
      `;
    }
  }

  showScreen("screen-intro");
  document.getElementById("btn-intro-next").onclick = onNext;
}

function startEventFlow() {
  state.dialogueIndex = 0;
  isDialogueTransitioning = false;

  const slot = currentScheduleSlot();
  const weekdayName = slot.weekdayName;

  if ((state.mode === "elementary" || state.mode === "teen") && !slot.isSunday && slot.isFirstOfSlot && DAILY_ACTIONS_BY_DAY[weekdayName]) {
    showDailyActionChoice(weekdayName);
  } else {
    continueEventFlow();
  }
}

function showDailyActionChoice(weekdayName) {
  const bgImg = document.getElementById("action-bg-image");
  const guideImg = document.getElementById("action-guide-image");

  setImageSafely(bgImg, IMAGE_ASSETS.backgrounds.schoolRoute);
  setJoeExpression("normal");
  setImageSafely(guideImg, getJoeImage("normal"));
  applyCharacterBlend(guideImg, getJoeImage("normal"));

  const choiceListEl = document.getElementById("action-choice-list");
  choiceListEl.innerHTML = "";

  const isElem = state.mode === "elementary";
  const actionSource = (isElem && typeof DAILY_ACTIONS_BY_DAY_ELEMENTARY !== "undefined")
    ? DAILY_ACTIONS_BY_DAY_ELEMENTARY
    : DAILY_ACTIONS_BY_DAY;

  const actions = actionSource[weekdayName] || actionSource["月"];
  actions.forEach(act => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "choice-btn";
    btn.innerHTML = act.label;
    btn.onclick = () => {
      processActionChoice(act.cat);
    };
    choiceListEl.appendChild(btn);
  });

  showScreen("screen-daily-action");
}

function processActionChoice(actionCat) {
  state.selectedAction = actionCat;
  continueEventFlow();
}

function continueEventFlow() {
  const question = currentQuestion();
  if (question && question.narration) {
    showNarration();
  } else {
    handleNarrationNext();
  }
}

function formatDayLabelHtml(slot) {
  if (state.mode === "elementary") {
    let periodHtml = "";
    if (slot.periodLabel === "午前") periodHtml = "・<ruby>午前<rt>ごぜん</rt></ruby>";
    else if (slot.periodLabel === "午後") periodHtml = "・<ruby>午後<rt>ごご</rt></ruby>";
    else if (slot.periodLabel) periodHtml = `・${slot.periodLabel}`;
    return `${slot.weekdayName}<ruby>曜日<rt>ようび</rt></ruby>${periodHtml}`;
  }
  return slot.periodLabel
    ? `${slot.weekdayName}曜日・${slot.periodLabel}`
    : `${slot.weekdayName}曜日`;
}

function showNarration() {
  const question = currentQuestion();
  const slot = currentScheduleSlot();

  document.getElementById("narration-daylabel").innerHTML = formatDayLabelHtml(slot);
  document.getElementById("narration-text").innerHTML = question.narration.replace(/\n/g, "<br>");
  document.getElementById("narration-scroll").scrollTop = 0;

  const bgImg = document.getElementById("narration-bg-image");
  const guideImg = document.getElementById("narration-guide-image");

  setImageSafely(bgImg, question.bg || FALLBACK_SCENE_BG);

  setJoeExpression("thinking");
  setImageSafely(guideImg, getJoeImage("thinking"));
  applyCharacterBlend(guideImg, getJoeImage("thinking"));

  showScreen("screen-narration");
}

function handleNarrationNext() {
  if (isDialogueTransitioning) return;
  isDialogueTransitioning = true;
  setTimeout(() => { isDialogueTransitioning = false; }, 300);

  const question = currentQuestion();
  const dialogues = (question && question.dialogue) ? question.dialogue : [];
  if (dialogues.length > 0) {
    showDialogueLine();
  } else {
    goToAfterDialogue();
  }
}

// 会話表示（「前へ」ボタンの有効/無効制御を含む）
function showDialogueLine() {
  const question = currentQuestion();
  const dialogues = (question && question.dialogue) ? question.dialogue : [];
  const line = dialogues[state.dialogueIndex];

  document.getElementById("dialogue-speaker").innerHTML = getDisplaySpeakerName(line.speaker);
  const textEl = document.getElementById("dialogue-line");
  textEl.innerHTML = line.line;

  const prevBtn = document.getElementById("btn-dialogue-prev");
  if (prevBtn) {
    const canGoPrev = state.dialogueIndex > 0 || Boolean(question && question.narration);
    prevBtn.disabled = !canGoPrev;
  }

  renderDialogueStage(question, line);
  showScreen("screen-dialogue");
}

function goToDialoguePrev() {
  if (isDialogueTransitioning) return;
  isDialogueTransitioning = true;
  setTimeout(() => { isDialogueTransitioning = false; }, 300);

  const question = currentQuestion();
  if (state.dialogueIndex > 0) {
    state.dialogueIndex -= 1;
    showDialogueLine();
  } else if (question && question.narration) {
    showNarration();
  }
}

function goToDialogueNext() {
  if (isDialogueTransitioning) return;
  isDialogueTransitioning = true;
  setTimeout(() => { isDialogueTransitioning = false; }, 300);

  const question = currentQuestion();
  const dialogues = (question && question.dialogue) ? question.dialogue : [];
  state.dialogueIndex += 1;

  if (state.dialogueIndex < dialogues.length) {
    showDialogueLine();
  } else {
    goToAfterDialogue();
  }
}

// 左右の立ち絵（主人公・NPC）を正しく配置・表示する関数
function renderDialogueStage(question, line) {
  const bgImg = document.getElementById("dialogue-bg-image");
  const leftImg = document.getElementById("dialogue-left-image");
  const rightImg = document.getElementById("dialogue-right-image");

  setImageSafely(bgImg, question.bg || FALLBACK_SCENE_BG);

  // 左側：プレイヤー（主人公）
  const playerImage = getPlayerImage("playerNeutral");
  if (leftImg) {
    setImageSafely(leftImg, playerImage);
    leftImg.classList.remove("is-hidden", "dialogue-left");
    leftImg.classList.add("story-player-image", "dialogue-left");
    applyCharacterBlend(leftImg, playerImage);
  }

  // 右側：NPC（question.characterに設定されているもの）
  if (rightImg) {
    if (question.character) {
      setImageSafely(rightImg, question.character);
      rightImg.classList.remove("is-hidden", "dialogue-right");
      rightImg.classList.add("story-player-image", "dialogue-right");
      applyCharacterBlend(rightImg, question.character);
    } else {
      rightImg.removeAttribute("src");
      rightImg.classList.add("is-hidden");
    }
  }

  const isPlayerSpeaking = line.speaker === "主人公" || line.speaker === "あなた";
  if (leftImg) leftImg.classList.toggle("is-speaking", isPlayerSpeaking);
  if (rightImg) rightImg.classList.toggle("is-speaking", !isPlayerSpeaking && Boolean(question.character));
}

function goToAfterDialogue() {
  const question = currentQuestion();
  if (question && question.notification) {
    showPikonNotification();
  } else {
    showQuestion();
  }
}

// スマホ通知画面（揺れ控えめ時は振動・バイブを停止）
function showPikonNotification() {
  const question = currentQuestion();
  const notifTextEl = document.getElementById("notification-text");
  if (notifTextEl) {
    notifTextEl.innerHTML = question.notification;
  }

  const bgImg = document.getElementById("notification-bg-image");
  const playerImg = document.getElementById("notification-player-image");

  const isWallpaperOne = Math.random() < 0.5;
  const chosenWallpaper = isWallpaperOne
    ? IMAGE_ASSETS.backgrounds.phoneWallpaper1
    : IMAGE_ASSETS.backgrounds.phoneWallpaper2;

  setImageSafely(bgImg, chosenWallpaper);

  if (playerImg) {
    playerImg.removeAttribute("src");
    playerImg.classList.add("is-hidden");
  }

  const phoneFrame = document.querySelector(".smartphone-frame.tall-phone");
  const notifCard = document.getElementById("notification-toast");

  if (phoneFrame) {
    phoneFrame.classList.remove("is-vibrating");
    if (!state.reduceMotion) {
      void phoneFrame.offsetWidth;
      phoneFrame.classList.add("is-vibrating");
    }
  }

  if (notifCard) {
    notifCard.classList.remove("is-flashing");
    if (!state.reduceMotion) {
      void notifCard.offsetWidth;
      notifCard.classList.add("is-flashing");
    }
  }

  if (!state.reduceMotion && typeof navigator !== "undefined" && navigator.vibrate) {
    try {
      navigator.vibrate([120, 60, 120, 60, 150]);
    } catch (e) {}
  }

  showScreen("screen-notification");

  const bottomGuide = document.getElementById("phone-bottom-guide-line");
  if (bottomGuide) {
    bottomGuide.innerHTML = state.mode === "elementary"
      ? "あ、スマホが <ruby>鳴<rt>な</rt></ruby>った！ <ruby>通知<rt>つうち</rt></ruby>を チェックしよう。"
      : "あ、スマホが鳴った！通知をチェックしよう。";
  }

  const screenEl = document.getElementById("screen-notification");

  if (notificationAutoTimer) {
    clearTimeout(notificationAutoTimer);
    notificationAutoTimer = null;
  }

  const proceedToQuestion = (e) => {
    if (e) e.stopPropagation();
    if (notificationAutoTimer) {
      clearTimeout(notificationAutoTimer);
      notificationAutoTimer = null;
    }
    if (screenEl) screenEl.onclick = null;

    if (phoneFrame) phoneFrame.classList.remove("is-vibrating");
    showQuestion();
  };

  if (screenEl) screenEl.onclick = null;
  setTimeout(() => {
    if (screenEl) screenEl.onclick = proceedToQuestion;
  }, 250);

  notificationAutoTimer = setTimeout(proceedToQuestion, 1500);
}

// 週末ふりかえり画面（2人並列）
function showWeekRecap() {
  const bgImg = document.getElementById("week-recap-bg-image");
  const playerImg = document.getElementById("week-recap-player-image");
  const guideImg = document.getElementById("week-recap-guide-image");
  const recapTextEl = document.getElementById("week-recap-text");

  setImageSafely(bgImg, IMAGE_ASSETS.backgrounds.livingRoom);

  const playerImage = getPlayerImage("playerHappy");
  setImageSafely(playerImg, playerImage);
  applyCharacterBlend(playerImg, playerImage);

  setJoeExpression("cheer");
  if (guideImg) {
    const joeImgSrc = getJoeImage("cheer");
    setImageSafely(guideImg, joeImgSrc);
    applyCharacterBlend(guideImg, joeImgSrc);
  }

  const safeDispName = escapeHTML(getPlayerDisplayName());

  if (recapTextEl) {
    if (state.mode === "senior") {
      recapTextEl.innerHTML = `
        1週間のチャレンジ、本当にお疲れさまでした。<br><br>
        固定電話への連絡、突然の訪問業者、スマートフォンへのSMS（ショートメッセージ）など……<br>
        日常に潜むさまざまな手口に、落ち着いて対処することができましたね。<br><br>
        それでは、この1週間の防犯判定と成果を確認しましょう！
      `;
    } else if (state.mode === "adult") {
      recapTextEl.innerHTML = `
        1週間の防犯チャレンジ、お疲れさまでした！<br><br>
        巧妙な税務・行政通知、サブスク架空請求、職場のサポート詐欺、投資勧誘など……<br>
        日常やビジネスに潜む数々の落とし穴に、冷静に向き合うことができましたね。<br><br>
        それでは、1週間の防犯診断結果を確認しましょう！
      `;
    } else if (state.mode === "elementary") {
      recapTextEl.innerHTML = `
        1<ruby>週間<rt>しゅうかん</rt></ruby>、すべての チャレンジが <ruby>終<rt>お</rt></ruby>わったよ！<br>
        ${safeDispName}、<ruby>本当<rt>ほんとう</rt></ruby>に よく <ruby>頑張<rt>がんば</rt></ruby>ったね！<br><br>
        <ruby>怪<rt>あや</rt></ruby>しいメールや メッセージ、<ruby>危<rt>あぶ</rt></ruby>ない お<ruby>誘<rt>さそ</rt></ruby>いも <ruby>落<rt>お</rt></ruby>ち<ruby>着<rt>つ</rt></ruby>いて <ruby>見<rt>み</rt></ruby>ぬいてきたね。<br><br>
        ✨ <strong>さぁ！ ずっと <ruby>待<rt>ま</rt></ruby>ちに待った お<ruby>買<rt>か</rt></ruby>い<ruby>物<rt>もの</rt></ruby>の <ruby>時間<rt>じかん</rt></ruby>だ！</strong><br>
        お<ruby>小遣<rt>こづか</rt></ruby>いを <ruby>守<rt>まも</rt></ruby>って、<ruby>欲<rt>ほ</rt></ruby>しかったものは <ruby>買<rt>か</rt></ruby>えるかな…！？
      `;
    } else {
      recapTextEl.innerHTML = `
        1週間、すべてのトラブルと出来事を乗り切ったぞ！<br>
        ${safeDispName}、本当によく冷静に対処してきたね！<br><br>
        届いた不審なDM、偽の通知、怪しい誘いにも騙されず、しっかり自分のお金を守り抜いてきた。<br><br>
        ✨ <strong>さあ！ 待ちに待った買い物の時間だ！</strong><br>
        目標にしていたあのアイテムを、無事に手に入れることはできるのか……！？
      `;
    }
  }

  showScreen("screen-week-recap");
}