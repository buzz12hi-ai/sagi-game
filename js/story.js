/* =========================================================
   story.js
   会話・あらすじ・自己紹介・通知・週末ふりかえりストーリー演出
   （2人並列・スマホ背景多段階バインド対応版）
   ========================================================= */

const FALLBACK_SCENE_BG = IMAGE_ASSETS.backgrounds.livingRoom;

function getDisplaySpeakerName(speaker) {
  return (speaker === "主人公" || speaker === "あなた") ? getPlayerRawName() : speaker;
}

function showJoeIntro(onNext) {
  const bgImg = document.getElementById("intro-bg-image");
  const guideImg = document.getElementById("intro-guide-image");
  const introTextEl = document.getElementById("intro-text");

  setImageSafely(bgImg, IMAGE_ASSETS.backgrounds.schoolRoute);
  setJoeExpression("happy");
  setImageSafely(guideImg, getJoeImage("happy"));
  applyCharacterBlend(guideImg, getJoeImage("happy"));

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
        この1週間、${getPlayerDisplayName()}の防犯チャレンジをサポートするよ！<br>
        税金・投資・サブスク・ビジネスなど、日常に潜む巧妙な詐欺やトラブルを一緒に見抜いていこう！
      `;
    } else if (state.mode === "elementary") {
      introTextEl.innerHTML = `
        はじめまして！ ぼくは ジョーくんだよ！<br><br>
        この1<ruby>週間<rt>しゅうかん</rt></ruby>、${getPlayerDisplayName()}を しっかりサポートするよ！<br>
        あやしい<ruby>詐欺<rt>さぎ</rt></ruby>（うそ）を<ruby>見<rt>み</rt></ruby>ぬく<ruby>力<rt>ちから</rt></ruby>を いっしょに <ruby>身<rt>み</rt></ruby>につけよう！
      `;
    } else {
      introTextEl.innerHTML = `
        はじめまして！ 僕はジョーくん！<br><br>
        この1週間、${getPlayerDisplayName()}をしっかりサポートするよ！<br>
        SNSやゲーム、ネットに潜む詐欺やトラブルを見抜く力を一緒に身につけよう！
      `;
    }
  }

  showScreen("screen-intro");
  document.getElementById("btn-intro-next").onclick = onNext;
}

function startEventFlow() {
  state.dialogueIndex = 0;
  
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

  const actions = DAILY_ACTIONS_BY_DAY[weekdayName] || DAILY_ACTIONS_BY_DAY["月"];
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

function showNarration() {
  const question = currentQuestion();
  const slot = currentScheduleSlot();
  const dayLabelText = slot.periodLabel
    ? `${slot.weekdayName}曜日・${slot.periodLabel}`
    : `${slot.weekdayName}曜日`;

  document.getElementById("narration-daylabel").textContent = dayLabelText;
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
  const question = currentQuestion();
  if (question && question.dialogue && question.dialogue.length > 0) {
    showDialogueLine();
  } else {
    goToAfterDialogue();
  }
}

function showDialogueLine() {
  const question = currentQuestion();
  const line = question.dialogue[state.dialogueIndex];
  const isPlayerSpeaking = line.speaker === "主人公" || line.speaker === "あなた";

  document.getElementById("dialogue-speaker").innerHTML = getDisplaySpeakerName(line.speaker);
  const textEl = document.getElementById("dialogue-line");

  if (!isPlayerSpeaking) {
    textEl.innerHTML = `
      <span class="typing-indicator">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </span>
    `;
    setTimeout(() => {
      textEl.innerHTML = line.line;
    }, 380);
  } else {
    textEl.innerHTML = line.line;
  }

  renderDialogueStage(question, line);
  showScreen("screen-dialogue");
}

function goToDialogueNext() {
  const question = currentQuestion();
  state.dialogueIndex += 1;

  if (question && state.dialogueIndex < question.dialogue.length) {
    showDialogueLine();
  } else {
    goToAfterDialogue();
  }
}

function renderDialogueStage(question, line) {
  const bgImg = document.getElementById("dialogue-bg-image");
  const leftImg = document.getElementById("dialogue-left-image");
  const rightImg = document.getElementById("dialogue-right-image");

  setImageSafely(bgImg, question.bg || FALLBACK_SCENE_BG);

  const playerImage = getPlayerImage("playerNeutral");
  setImageSafely(leftImg, playerImage);
  applyCharacterBlend(leftImg, playerImage);

  setImageSafely(rightImg, question.character);
  applyCharacterBlend(rightImg, question.character);

  const isPlayerSpeaking = line.speaker === "主人公" || line.speaker === "あなた";
  leftImg.classList.toggle("is-speaking", isPlayerSpeaking);
  rightImg.classList.toggle("is-speaking", !isPlayerSpeaking && Boolean(question.character));
}

function goToAfterDialogue() {
  const question = currentQuestion();
  if (question && question.notification) {
    showPikonNotification();
  } else {
    showQuestion();
  }
}

// スマホ通知画面（壁紙1・2の完全ランダム切替・バイブ・フラッシュ）
function showPikonNotification() {
  const question = currentQuestion();
  const notifTextEl = document.getElementById("notification-text");
  if (notifTextEl) {
    notifTextEl.innerHTML = question.notification;
  }
  
  const bgImg = document.getElementById("notification-bg-image");
  const playerImg = document.getElementById("notification-player-image");
  const phonePlayerImg = getPlayerImage("playerSmartphone");
  
  // スマホ壁紙1とスマホ壁紙2を50%の確率でランダム選出
  const isWallpaperOne = Math.random() < 0.5;
  const chosenWallpaper = isWallpaperOne
    ? IMAGE_ASSETS.backgrounds.phoneWallpaper1
    : IMAGE_ASSETS.backgrounds.phoneWallpaper2;

  setImageSafely(bgImg, chosenWallpaper);

  // 主人公画像のセット
  if (playerImg) {
    setImageSafely(playerImg, phonePlayerImg);
    applyCharacterBlend(playerImg, phonePlayerImg);
  }

  const phoneFrame = document.querySelector(".smartphone-frame.tall-phone");
  const notifCard = document.getElementById("notification-toast");

  if (phoneFrame) {
    phoneFrame.classList.remove("is-vibrating");
    void phoneFrame.offsetWidth;
    phoneFrame.classList.add("is-vibrating");
  }

  if (notifCard) {
    notifCard.classList.remove("is-flashing");
    void notifCard.offsetWidth;
    notifCard.classList.add("is-flashing");
  }

  if (typeof navigator !== "undefined" && navigator.vibrate) {
    try {
      navigator.vibrate([120, 60, 120, 60, 150]);
    } catch (e) {}
  }

  showScreen("screen-notification");

  setTimeout(() => {
    if (phoneFrame) phoneFrame.classList.remove("is-vibrating");
    showQuestion();
  }, 2200);
}

// 週末ふりかえり画面（主人公＝左、ジョーくん＝右の2人並び）
function showWeekRecap() {
  const bgImg = document.getElementById("week-recap-bg-image");
  const playerImg = document.getElementById("week-recap-player-image");
  const guideImg = document.getElementById("week-recap-guide-image");
  const recapTextEl = document.getElementById("week-recap-text");

  setImageSafely(bgImg, IMAGE_ASSETS.backgrounds.livingRoom);

  // 主人公画像（左側）
  const playerImage = getPlayerImage("playerHappy");
  setImageSafely(playerImg, playerImage);
  applyCharacterBlend(playerImg, playerImage);

  // ジョーくん画像（右側）
  setJoeExpression("cheer");
  if (guideImg) {
    const joeImgSrc = getJoeImage("cheer");
    setImageSafely(guideImg, joeImgSrc);
    applyCharacterBlend(guideImg, joeImgSrc);
  }

  if (recapTextEl) {
    if (state.mode === "senior") {
      recapTextEl.innerHTML = `
        1週間のチャレンジ、本当にお疲れさまでした。<br><br>
        固定電話への連絡、突然の訪問業者、スマートフォンへのSMSなど……<br>
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
        1<ruby>週間<rt>しゅうかん</rt></ruby>、すべての チャレンジが おわったよ！<br>
        ${getPlayerDisplayName()}、<ruby>本当<rt>ほんとう</rt></ruby>に よく<ruby>頑張<rt>がんば</rt></ruby>ったね！<br><br>
        あやしいメールやメッセージ、<ruby>危<rt>あぶ</rt></ruby>ないお<ruby>誘<rt>さそ</rt></ruby>いも おちついて <ruby>見<rt>み</rt></ruby>ぬいてきたね。<br><br>
        ✨ <strong>さぁ！ ずっと まちにまった お<ruby>買<rt>か</rt></ruby>いものの <ruby>時間<rt>じかん</rt></ruby>だ！</strong><br>
        お<ruby>小遣<rt>こづか</rt></ruby>いを まもって、<ruby>欲<rt>ほ</rt></ruby>しかったものは かえるかな…！？
      `;
    } else {
      recapTextEl.innerHTML = `
        1週間、すべてのトラブルと出来事を乗り切ったぞ！<br>
        ${getPlayerDisplayName()}、本当によく冷静に対処してきたね！<br><br>
        届いた不審なDM、偽の通知、怪しい誘いにも騙されず、しっかり自分のお金を守り抜いてきた。<br><br>
        ✨ <strong>さあ！ 待ちに待った買い物の時間だ！</strong><br>
        目標にしていたあのアイテムを、無事に手に入れることはできるのか……！？
      `;
    }
  }

  showScreen("screen-week-recap");
}