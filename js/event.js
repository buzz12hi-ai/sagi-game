/* =========================================================
   event.js
   問題出題・選択肢回答判定・ダメージ計算・結果表示・進行制御
   （通常プレイ時分析データ自動記録・到達曜日再プレイ対応版）
   ========================================================= */

function showEvent() {
  // 全問題終了時は全モード共通で週末ふりかえり画面へ
  if (state.slotIndex >= state.weeklyQuestions.length) {
    showWeekRecap();
    return;
  }

  updateStatusBar();

  const slot = currentScheduleSlot();
  const isNewDay =
    state.slotIndex === 0 ||
    slot.weekdayIndex !== state.daySchedule[state.slotIndex - 1].weekdayIndex;

  if (isNewDay) {
    const dayComment =
      DAY_INTRO_COMMENTS[slot.weekdayName] ||
      "落ち着いて進めていこう！";
    showDayIntro(
      `${slot.weekdayName}曜日`,
      startEventFlow,
      dayComment
    );
  } else {
    startEventFlow();
  }
}

// ⑧ イベント問題画面の描画
function showQuestion() {
  const question = currentQuestion();
  const slot = currentScheduleSlot();

  const dayLabelText = slot.periodLabel
    ? `${slot.weekdayName}曜日・${slot.periodLabel}`
    : `${slot.weekdayName}曜日`;
  document.getElementById("event-daylabel").textContent = dayLabelText;
  
  const totalQCount = state.weeklyQuestions.length;
  document.getElementById("event-progress").textContent =
    `${state.slotIndex + 1} / ${totalQCount}問目`;

  document.getElementById("event-source").innerHTML = `📍 ${question.source}`;
  document.getElementById("event-title").innerHTML = question.title;
  document.getElementById("event-desc").innerHTML = question.desc;

  const supportMsgs = ["画像の内容をよく見よう！", "落ち着いて判断しよう！", "細部まで確認してみよう！"];
  setJoeSupportMessage(shuffleArray(supportMsgs)[0]);

  renderEventVisual(question);

  const popOverlay = document.getElementById("instant-pop-overlay");
  if (popOverlay) {
    popOverlay.classList.add("is-hidden");
    popOverlay.classList.remove("is-danger-flash");
  }

  const thinkingOverlay = document.getElementById("thinking-overlay");
  if (thinkingOverlay) thinkingOverlay.classList.add("is-hidden");

  const choiceList = document.getElementById("choice-list");
  choiceList.innerHTML = "";

  const dynamicChoices = getQuestionChoices(question);

  dynamicChoices.forEach((choice) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.type = "button";
    btn.innerHTML = choice.text;
    btn.addEventListener("click", () => handleChoiceWithDelay(choice));
    choiceList.appendChild(btn);
  });

  showScreen("screen-event");
}

function handleChoiceWithDelay(choice) {
  const thinkingOverlay = document.getElementById("thinking-overlay");
  if (thinkingOverlay) thinkingOverlay.classList.remove("is-hidden");

  setTimeout(() => {
    if (thinkingOverlay) thinkingOverlay.classList.add("is-hidden");
    handleChoice(choice);
  }, 800);
}

function getNextButtonLabel() {
  const nextIndex = state.slotIndex + 1;
  if (nextIndex >= state.weeklyQuestions.length) {
    return "1週間のふりかえりへ";
  }

  const currentWeekday = state.daySchedule[state.slotIndex].weekdayIndex;
  const nextWeekday = state.daySchedule[nextIndex].weekdayIndex;
  return currentWeekday === nextWeekday ? "次のできごとへ" : "次の日へ";
}

function resultCharacterFor(choiceType) {
  if (choiceType === "correct") return getPlayerImage("playerHappy");
  if (choiceType === "partial") return getPlayerImage("playerQuestion");
  return getPlayerImage("playerSad");
}

const REACTION_COMMENTS = {
  correct: ["確認して正解だった！", "ちゃんと判断できた！", "これで安心だね！"],
  partial: ["うーん、おしかったかも…", "もう一歩、気をつけたいね。"],
  wrong: ["危なかった…", "次は気をつけよう。", "確認することが大切だね！"]
};

function getReactionComment(choiceType) {
  const options = REACTION_COMMENTS[choiceType] || REACTION_COMMENTS.wrong;
  return shuffleArray(options)[0];
}

// ⑨ 選択後の解説・所持金増減・ダメージ処理
function handleChoice(choice) {
  const question = currentQuestion();

  state.money += choice.money;
  showMoneyDelta(choice.money);
  updateMoneyDisplay();

  const isCorrect = choice.type === "correct" || choice.money > 0 || (choice.money === 0 && !choice.damageType);
  if (isCorrect) {
    state.correctCount += 1;
    if (question.category === "scam") {
      state.preventedScamsCount += 1;
    }
  } else {
    state.fooledCount += 1;
    if (choice.damageType) {
      if (choice.damageType === "personal_info") state.damages.personalInfo += 1;
      if (choice.damageType === "account") state.damages.account += 1;
      if (choice.damageType === "line_takeover") state.damages.line += 1;
    }
    if (choice.money < 0) {
      state.damages.money += Math.abs(choice.money);
    }
  }

  state.answeredQuestions.push({
    questionId: question.id,
    isCorrect: isCorrect
  });

  // ★ 通常プレイ時のみ、問題ごとの正誤を分析データに記録 ★
  if (typeof recordAnalyticsAnswer === "function") {
    recordAnalyticsAnswer(question.id, isCorrect);
  }

  const popOverlay = document.getElementById("instant-pop-overlay");
  const popBadge = document.getElementById("instant-pop-badge");
  const popMoney = document.getElementById("instant-pop-money");
  const popSub = document.getElementById("instant-pop-sub");

  popBadge.classList.remove("is-correct", "is-partial", "is-wrong");
  popMoney.classList.remove("is-plus", "is-minus", "is-zero");
  if (popOverlay) popOverlay.classList.remove("is-danger-flash");

  if (question.category === "real" && isCorrect) {
    popBadge.textContent = "⭕ 安全に確認できた！";
    popBadge.classList.add("is-correct");
    popSub.textContent = "正規の手続きで正しく処理できました！";
    setJoeExpression("happy");
  } else if (isCorrect) {
    popBadge.textContent = "✨ 被害を防げた！";
    popBadge.classList.add("is-correct");
    popSub.textContent = "冷静な判断でお金をしっかり守れたね！";
    setJoeExpression("cheer");
  } else {
    popBadge.textContent = "⚠️ 被害発生！";
    popBadge.classList.add("is-wrong");
    popSub.textContent = `被害額：${Math.abs(choice.money).toLocaleString("ja-JP")}円！`;
    setJoeExpression("sad");

    if (popOverlay) popOverlay.classList.add("is-danger-flash");
  }

  if (choice.money > 0) {
    popMoney.textContent = `＋${choice.money.toLocaleString("ja-JP")}円`;
    popMoney.classList.add("is-plus");
  } else if (choice.money < 0) {
    popMoney.textContent = `－${Math.abs(choice.money).toLocaleString("ja-JP")}円`;
    popMoney.classList.add("is-minus");
  } else {
    popMoney.textContent = "±0円";
    popMoney.classList.add("is-zero");
  }

  if (popOverlay) popOverlay.classList.remove("is-hidden");

  const badge = document.getElementById("result-badge");
  const reactionText = document.getElementById("result-reaction");
  const moneyText = document.getElementById("result-money");
  const damageAlertEl = document.getElementById("result-damage-alert");
  const currentMoneyText = document.getElementById("result-current-money");
  const explain = document.getElementById("result-explain");
  const pointTitleEl = document.getElementById("result-point-title");
  const pointText = document.getElementById("result-point");
  const resultCharacterImg = document.getElementById("result-character-image");

  badge.classList.remove("is-correct", "is-partial", "is-wrong");
  moneyText.classList.remove("is-plus", "is-minus", "is-zero");
  damageAlertEl.classList.add("is-hidden");

  if (question.category === "real" && isCorrect) {
    badge.textContent = "⭕ 安全に確認完了！";
    badge.classList.add("is-correct");
    pointTitleEl.textContent = "🎉 正規手続きのポイント";
  } else if (isCorrect) {
    badge.textContent = "⭕ 被害を防げた！";
    badge.classList.add("is-correct");
    pointTitleEl.textContent = "今回の防犯ポイント";
  } else {
    badge.textContent = "❌ トラブル発生！";
    badge.classList.add("is-wrong");
    pointTitleEl.textContent = "防犯のポイント";

    if (choice.damageType === "personal_info") {
      damageAlertEl.textContent = "⚠️ 個人情報流出リスク！";
      damageAlertEl.classList.remove("is-hidden");
    } else if (choice.damageType === "account") {
      damageAlertEl.textContent = "⚠️ アカウント乗っ取りリスク！";
      damageAlertEl.classList.remove("is-hidden");
    } else if (choice.damageType === "line_takeover") {
      damageAlertEl.textContent = "⚠️ SNS・LINE乗っ取りリスク！";
      damageAlertEl.classList.remove("is-hidden");
    }
  }

  reactionText.textContent = getReactionComment(isCorrect ? "correct" : "wrong");

  if (choice.money > 0) {
    moneyText.textContent = `＋${choice.money.toLocaleString("ja-JP")}円`;
    moneyText.classList.add("is-plus");
  } else if (choice.money < 0) {
    moneyText.textContent = `－${Math.abs(choice.money).toLocaleString("ja-JP")}円`;
    moneyText.classList.add("is-minus");
  } else {
    moneyText.textContent = "所持金の増減なし（0円）";
    moneyText.classList.add("is-zero");
  }

  currentMoneyText.textContent = `現在の所持金：¥${state.money.toLocaleString("ja-JP")}`;
  explain.innerHTML = choice.explain;
  pointText.innerHTML = question.point || "";

  const guideImg = document.getElementById("result-guide-image");
  setImageSafely(guideImg, getJoeImage(state.joeExpression));
  applyCharacterBlend(guideImg, getJoeImage(state.joeExpression));

  setImageSafely(resultCharacterImg, resultCharacterFor(isCorrect ? "correct" : "wrong"));
  document.getElementById("btn-next").textContent = getNextButtonLabel();

  setTimeout(() => {
    if (popOverlay) {
      popOverlay.classList.add("is-hidden");
      popOverlay.classList.remove("is-danger-flash");
    }
    showScreen("screen-result");
  }, 1200);
}

function goToNextDay() {
  state.slotIndex += 1;
  showEvent();
}