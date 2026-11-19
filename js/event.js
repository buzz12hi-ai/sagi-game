/* =========================================================
   event.js
   問題出題・選択肢回答判定・ダメージ計算・結果表示・進行制御
   （揺れ控えめ静止表示・一般名称化・小学生総ルビ対応版）
   ========================================================= */

function showEvent() {
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
    const isElem = state.mode === "elementary";
    const commentSource = (isElem && typeof DAY_INTRO_COMMENTS_ELEMENTARY !== "undefined")
      ? DAY_INTRO_COMMENTS_ELEMENTARY
      : DAY_INTRO_COMMENTS;

    const dayComment =
      commentSource[slot.weekdayName] ||
      (isElem ? "<ruby>落<rt>お</rt></ruby>ち<ruby>着<rt>つ</rt></ruby>いて <ruby>進<rt>すす</rt></ruby>めていこう！" : "落ち着いて進めていこう！");

    showDayIntro(
      `${slot.weekdayName}曜日`,
      startEventFlow,
      dayComment
    );
  } else {
    startEventFlow();
  }
}

function showQuestion() {
  const question = currentQuestion();
  const slot = currentScheduleSlot();
  const isElem = state.mode === "elementary";

  const dayLabelEl = document.getElementById("event-daylabel");
  if (dayLabelEl) {
    if (typeof formatDayLabelHtml === "function") {
      dayLabelEl.innerHTML = formatDayLabelHtml(slot);
    } else {
      const dayLabelText = slot.periodLabel
        ? `${slot.weekdayName}曜日・${slot.periodLabel}`
        : `${slot.weekdayName}曜日`;
      dayLabelEl.textContent = dayLabelText;
    }
  }

  const totalQCount = state.weeklyQuestions.length;
  const progressEl = document.getElementById("event-progress");
  if (progressEl) {
    progressEl.innerHTML = isElem
      ? `${state.slotIndex + 1} / ${totalQCount}<ruby>問目<rt>もんめ</rt></ruby>`
      : `${state.slotIndex + 1} / ${totalQCount}問目`;
  }

  document.getElementById("event-source").innerHTML = `📍 ${question.source}`;
  document.getElementById("event-title").innerHTML = question.title;
  document.getElementById("event-desc").innerHTML = question.desc;

  const supportMsgs = isElem
    ? [
        "<ruby>画像<rt>がぞう</rt></ruby>の <ruby>内容<rt>ないよう</rt></ruby>を よく<ruby>見<rt>み</rt></ruby>よう！",
        "<ruby>落<rt>お</rt></ruby>ち<ruby>着<rt>つ</rt></ruby>いて <ruby>判断<rt>はんだん</rt></ruby>しよう！",
        "すみずみまで <ruby>確認<rt>かくにん</rt></ruby>してみよう！"
      ]
    : ["画像の内容をよく見よう！", "落ち着いて判断しよう！", "細部まで確認してみよう！"];
  setJoeSupportMessage(shuffleArray(supportMsgs)[0]);

  renderEventVisual(question);

  const popOverlay = document.getElementById("instant-pop-overlay");
  if (popOverlay) {
    popOverlay.classList.add("is-hidden");
    popOverlay.classList.remove("is-danger-flash", "is-danger-static");
  }

  const thinkingOverlay = document.getElementById("thinking-overlay");
  if (thinkingOverlay) thinkingOverlay.classList.add("is-hidden");

  renderChoices(question);

  showScreen("screen-event");
}

function renderChoices(question) {
  const choiceList = document.getElementById("choice-list");
  if (!choiceList) return;
  choiceList.innerHTML = "";

  const dynamicChoices = getQuestionChoices(question);

  dynamicChoices.forEach((choice) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.type = "button";

    // 3原則透視タグ表示
    if (state.isTestMode && state.showPrincipleTags) {
      let badgeHTML = "";
      if (choice.type === "correct") {
        btn.classList.add("hint-safe");
        badgeHTML = `<span class="hint-badge-tag tag-safe">🟢【騙されない】</span>`;
      } else if (choice.principleTag === "speak") {
        btn.classList.add("hint-speak");
        badgeHTML = `<span class="hint-badge-tag tag-speak">🔴【喋った】</span>`;
      } else if (choice.principleTag === "pay") {
        btn.classList.add("hint-pay");
        badgeHTML = `<span class="hint-badge-tag tag-pay">🔴【払った】</span>`;
      } else {
        btn.classList.add("hint-fooled");
        badgeHTML = `<span class="hint-badge-tag tag-fooled">🟡【騙された】</span>`;
      }
      btn.innerHTML = `${badgeHTML}${choice.text}`;
    } else {
      btn.innerHTML = choice.text;
    }

    btn.addEventListener("click", () => handleChoiceWithDelay(choice));
    choiceList.appendChild(btn);
  });
}

function refreshChoicesWithHints() {
  const q = currentQuestion();
  if (q) renderChoices(q);
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
  const isElem = state.mode === "elementary";
  const nextIndex = state.slotIndex + 1;

  if (nextIndex >= state.weeklyQuestions.length) {
    return isElem
      ? "1<ruby>週間<rt>しゅうかん</rt></ruby>の ふりかえりへ"
      : "1週間のふりかえりへ";
  }

  const currentWeekday = state.daySchedule[state.slotIndex].weekdayIndex;
  const nextWeekday = state.daySchedule[nextIndex].weekdayIndex;

  if (currentWeekday === nextWeekday) {
    return isElem ? "<ruby>次<rt>つぎ</rt></ruby>の できごとへ" : "次のできごとへ";
  }
  return isElem ? "<ruby>次<rt>つぎ</rt></ruby>の <ruby>日<rt>ひ</rt></ruby>へ" : "次の日へ";
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

const REACTION_COMMENTS_ELEMENTARY = {
  correct: [
    "<ruby>確認<rt>かくにん</rt></ruby>して <ruby>正解<rt>せいかい</rt></ruby>だった！",
    "ちゃんと <ruby>判断<rt>はんだん</rt></ruby>できた！",
    "これで <ruby>安心<rt>あんしん</rt></ruby>だね！"
  ],
  partial: [
    "うーん、おしかったかも…",
    "もう<ruby>一歩<rt>いっぽ</rt></ruby>、<ruby>気<rt>き</rt></ruby>をつけたいね。"
  ],
  wrong: [
    "<ruby>危<rt>あぶ</rt></ruby>なかった…",
    "<ruby>次<rt>つぎ</rt></ruby>は <ruby>気<rt>き</rt></ruby>をつけよう。",
    "<ruby>確認<rt>かくにん</rt></ruby>することが <ruby>大切<rt>たいせつ</rt></ruby>だね！"
  ]
};

function getReactionComment(choiceType) {
  const source = state.mode === "elementary" ? REACTION_COMMENTS_ELEMENTARY : REACTION_COMMENTS;
  const options = source[choiceType] || source.wrong;
  return shuffleArray(options)[0];
}

// 選択後の判定・集計・被害計算
function handleChoice(choice) {
  const question = currentQuestion();
  const isElem = state.mode === "elementary";

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

  const answerDetail = {
    questionId: question.id,
    isCorrect: isCorrect,
    principleTag: choice.principleTag || "safe",
    damageType: choice.damageType || null,
    money: Number(choice.money) || 0
  };

  state.answeredQuestions.push(answerDetail);

  if (typeof recordAnalyticsAnswer === "function") {
    recordAnalyticsAnswer(question.id, isCorrect, choice.principleTag, answerDetail);
  }

  const popOverlay = document.getElementById("instant-pop-overlay");
  const popBadge = document.getElementById("instant-pop-badge");
  const popMoney = document.getElementById("instant-pop-money");
  const popSub = document.getElementById("instant-pop-sub");

  popBadge.classList.remove("is-correct", "is-partial", "is-wrong");
  popMoney.classList.remove("is-plus", "is-minus", "is-zero");
  if (popOverlay) {
    popOverlay.classList.remove("is-danger-flash", "is-danger-static");
  }

  if (question.category === "real" && isCorrect) {
    popBadge.innerHTML = isElem
      ? "⭕ <ruby>安全<rt>あんぜん</rt></ruby>に <ruby>確認<rt>かくにん</rt></ruby>できた！"
      : "⭕ 安全に確認できた！";
    popBadge.classList.add("is-correct");
    popSub.innerHTML = isElem
      ? "<ruby>正<rt>ただ</rt></ruby>しい <ruby>方法<rt>ほうほう</rt></ruby>で <ruby>確認<rt>かくにん</rt></ruby>できたよ！"
      : "正規の手続きで正しく処理できました！";
    setJoeExpression("happy");
  } else if (isCorrect) {
    popBadge.innerHTML = isElem
      ? "✨ <ruby>被害<rt>ひがい</rt></ruby>を <ruby>防<rt>ふせ</rt></ruby>げた！"
      : "✨ 被害を防げた！";
    popBadge.classList.add("is-correct");
    popSub.innerHTML = isElem
      ? "<ruby>落<rt>お</rt></ruby>ち<ruby>着<rt>つ</rt></ruby>いた <ruby>判断<rt>はんだん</rt></ruby>で お<ruby>金<rt>かね</rt></ruby>を しっかり<ruby>守<rt>まも</rt></ruby>れたね！"
      : "冷静な判断でお金をしっかり守れたね！";
    setJoeExpression("cheer");
  } else {
    popBadge.innerHTML = isElem
      ? "⚠️ <ruby>被害<rt>ひがい</rt></ruby><ruby>発生<rt>はっせい</rt></ruby>！"
      : "⚠️ 被害発生！";
    popBadge.classList.add("is-wrong");
    popSub.innerHTML = isElem
      ? `<ruby>被害額<rt>ひがいがく</rt></ruby>：${Math.abs(choice.money).toLocaleString("ja-JP")}<ruby>円<rt>えん</rt></ruby>！`
      : `被害額：${Math.abs(choice.money).toLocaleString("ja-JP")}円！`;
    setJoeExpression("sad");

    if (popOverlay) {
      if (state.reduceMotion) {
        popOverlay.classList.add("is-danger-static");
      } else {
        popOverlay.classList.add("is-danger-flash");
      }
    }
  }

  const yenUnit = isElem ? "<ruby>円<rt>えん</rt></ruby>" : "円";
  if (choice.money > 0) {
    popMoney.innerHTML = `＋${choice.money.toLocaleString("ja-JP")}${yenUnit}`;
    popMoney.classList.add("is-plus");
  } else if (choice.money < 0) {
    popMoney.innerHTML = `－${Math.abs(choice.money).toLocaleString("ja-JP")}${yenUnit}`;
    popMoney.classList.add("is-minus");
  } else {
    popMoney.innerHTML = `±0${yenUnit}`;
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
    badge.innerHTML = isElem
      ? "⭕ <ruby>安全<rt>あんぜん</rt></ruby>に <ruby>確認<rt>かくにん</rt></ruby><ruby>完了<rt>かんりょう</rt></ruby>！"
      : "⭕ 安全に確認完了！";
    badge.classList.add("is-correct");
    pointTitleEl.innerHTML = isElem
      ? "🎉 <ruby>安全<rt>あんぜん</rt></ruby>な <ruby>手続<rt>てつづ</rt></ruby>きの ポイント"
      : "🎉 正規手続きのポイント";
  } else if (isCorrect) {
    badge.innerHTML = isElem
      ? "⭕ <ruby>被害<rt>ひがい</rt></ruby>を <ruby>防<rt>ふせ</rt></ruby>げた！"
      : "⭕ 被害を防げた！";
    badge.classList.add("is-correct");
    pointTitleEl.innerHTML = isElem
      ? "<ruby>今回<rt>こんかい</rt></ruby>の <ruby>防犯<rt>ぼうはん</rt></ruby>ポイント"
      : "今回の防犯ポイント";
  } else {
    badge.innerHTML = isElem
      ? "❌ トラブル<ruby>発生<rt>はっせい</rt></ruby>！"
      : "❌ トラブル発生！";
    badge.classList.add("is-wrong");
    pointTitleEl.innerHTML = isElem
      ? "<ruby>防犯<rt>ぼうはん</rt></ruby>の ポイント"
      : "防犯のポイント";

    if (choice.damageType === "personal_info") {
      damageAlertEl.innerHTML = isElem
        ? "⚠️ <ruby>個人<rt>こじん</rt></ruby><ruby>情報<rt>じょうほう</rt></ruby><ruby>流出<rt>りゅうしゅつ</rt></ruby>リスク！"
        : "⚠️ 個人情報流出リスク！";
      damageAlertEl.classList.remove("is-hidden");
    } else if (choice.damageType === "account") {
      damageAlertEl.innerHTML = isElem
        ? "⚠️ アカウント<ruby>乗<rt>の</rt></ruby>っ<ruby>取<rt>と</rt></ruby>りリスク！"
        : "⚠️ アカウント乗っ取りリスク！";
      damageAlertEl.classList.remove("is-hidden");
    } else if (choice.damageType === "line_takeover") {
      damageAlertEl.innerHTML = isElem
        ? "⚠️ SNS・メッセージアプリ <ruby>乗<rt>の</rt></ruby>っ<ruby>取<rt>と</rt></ruby>りリスク！"
        : "⚠️ SNS・メッセージアプリ乗っ取りリスク！";
      damageAlertEl.classList.remove("is-hidden");
    }
  }

  reactionText.innerHTML = getReactionComment(isCorrect ? "correct" : "wrong");

  if (choice.money > 0) {
    moneyText.innerHTML = `＋${choice.money.toLocaleString("ja-JP")}${yenUnit}`;
    moneyText.classList.add("is-plus");
  } else if (choice.money < 0) {
    moneyText.innerHTML = `－${Math.abs(choice.money).toLocaleString("ja-JP")}${yenUnit}`;
    moneyText.classList.add("is-minus");
  } else {
    moneyText.innerHTML = isElem
      ? "<ruby>所持金<rt>しょじきん</rt></ruby>の <ruby>増減<rt>ぞうげん</rt></ruby>なし（0<ruby>円<rt>えん</rt></ruby>）"
      : "所持金の増減なし（0円）";
    moneyText.classList.add("is-zero");
  }

  currentMoneyText.innerHTML = isElem
    ? `<ruby>現在<rt>げんざい</rt></ruby>の <ruby>所持金<rt>しょじきん</rt></ruby>：${state.money.toLocaleString("ja-JP")}<ruby>円<rt>えん</rt></ruby>`
    : `現在の所持金：¥${state.money.toLocaleString("ja-JP")}`;
  explain.innerHTML = choice.explain;
  pointText.innerHTML = question.point || "";

  const guideImg = document.getElementById("result-guide-image");
  setImageSafely(guideImg, getJoeImage(state.joeExpression));
  applyCharacterBlend(guideImg, getJoeImage(state.joeExpression));

  setImageSafely(resultCharacterImg, resultCharacterFor(isCorrect ? "correct" : "wrong"));
  document.getElementById("btn-next").innerHTML = getNextButtonLabel();

  setTimeout(() => {
    if (popOverlay) {
      popOverlay.classList.add("is-hidden");
      popOverlay.classList.remove("is-danger-flash", "is-danger-static");
    }
    showScreen("screen-result");
  }, 1200);
}

function goToNextDay() {
  state.slotIndex += 1;
  showEvent();
}