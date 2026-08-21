/* =========================================================
   main.js
   -----------------------------------------------------------
   4モード分岐・動的4択・判定演出・エンディング・アンケート制御
   （大人・高齢者モード：名前入力・欲しい物スキップ対応）
   ========================================================= */

function renderTitleVisual() {
  const titleJoeImg = document.getElementById("title-joe-image");
  if (titleJoeImg) {
    setImageSafely(titleJoeImg, getJoeImage("cheer"));
    applyCharacterBlend(titleJoeImg, getJoeImage("cheer"));
  }
}

// ① 「はじめる」クリックで「表示デザイン選択画面」へ
function handleStartClick() {
  showScreen("screen-device-select");
}

// ①.05 表示デザイン（デバイスレイアウト）選択処理
function handleSelectDevice(selectedDevice) {
  state.deviceLayout = selectedDevice;
  const shell = document.getElementById("app-shell");

  if (shell) {
    if (selectedDevice === "mobile") {
      shell.classList.add("layout-mobile");
      shell.classList.remove("layout-desktop");
    } else {
      shell.classList.add("layout-desktop");
      shell.classList.remove("layout-mobile");
    }
  }

  // デバイス選択後、モード選択画面へ遷移
  showScreen("screen-mode-select");
}

// ①.1 モード選択処理（4モード）
function handleSelectMode(selectedMode) {
  state.mode = selectedMode;

  const shell = document.getElementById("app-shell");
  if (shell) {
    if (selectedMode === "senior") {
      shell.classList.add("is-senior-mode");
    } else {
      shell.classList.remove("is-senior-mode");
    }
  }

  if (selectedMode === "senior") {
    // 高齢者モード：名前入力・欲しい物選択をスキップ
    state.playerName = "あなた";
    state.selectedItem = null;
    showJoeIntro(startSeniorWeek);
  } else if (selectedMode === "adult") {
    // 一般（大人）モード：名前入力・欲しい物選択をスキップして直接自己紹介へ
    state.playerName = "あなた";
    state.selectedItem = null;
    showJoeIntro(startAdultWeek);
  } else {
    // 小学生・中高生モード：名前入力へ進み、欲しい物選択も行う
    openNameInput();
  }
}

function openNameInput() {
  const nameInputImg = document.getElementById("name-guide-image");
  setImageSafely(nameInputImg, getJoeImage("happy"));
  applyCharacterBlend(nameInputImg, getJoeImage("happy"));

  const inputEl = document.getElementById("input-player-name");
  if (inputEl) inputEl.value = "";

  const errorEl = document.getElementById("name-input-error");
  if (errorEl) errorEl.classList.add("is-hidden");

  showScreen("screen-name-input");
}

function handleNameSubmit() {
  const inputEl = document.getElementById("input-player-name");
  const errorEl = document.getElementById("name-input-error");
  const typedName = inputEl ? inputEl.value.trim() : "";

  if (!typedName) {
    if (errorEl) errorEl.classList.remove("is-hidden");
    if (inputEl) inputEl.focus();
    return;
  }

  if (errorEl) errorEl.classList.add("is-hidden");
  state.playerName = typedName;

  // 小学生・中高生モードは欲しい物選択へ
  showJoeIntro(goToItemSelect);
}

function goToItemSelect() {
  document.getElementById("status-bar").classList.add("hidden");
  const list = document.getElementById("item-list");
  list.innerHTML = "";

  ITEMS.forEach((item) => {
    const card = document.createElement("button");
    card.className = "item-card";
    card.type = "button";
    card.innerHTML = `
      ${itemVisualHTML(item, "item-photo")}
      <span class="item-name">${item.name}</span>
      <span class="item-price">¥${item.price.toLocaleString("ja-JP")}</span>
    `;
    card.addEventListener("click", () => startWeek(item));
    list.appendChild(card);
  });

  const guideImg = document.getElementById("item-guide-image");
  setJoeExpression("happy");
  setImageSafely(guideImg, getJoeImage("happy"));
  applyCharacterBlend(guideImg, getJoeImage("happy"));

  showScreen("screen-item");
}

function startWeek(item) {
  state.selectedItem = item;
  initGameState();
  showSynopsis();
}

function startAdultWeek() {
  initGameState();
  showSynopsis();
}

function startSeniorWeek() {
  initGameState();
  showSynopsis();
}

function initGameState() {
  state.money = 50000;
  state.slotIndex = 0;
  state.dialogueIndex = 0;
  state.correctCount = 0;
  state.fooledCount = 0;
  state.preventedScamsCount = 0;
  state.damages = { money: 0, personalInfo: 0, account: 0, line: 0 };
  state.answeredQuestions = [];
  
  // モード別ランダム抽出
  state.weeklyQuestions = pickWeeklyQuestions(state.mode);
  state.daySchedule = buildDaySchedule(state.mode);
}

// あらすじ画面
function showSynopsis() {
  const card = document.getElementById("synopsis-card");

  if (state.mode === "senior") {
    card.innerHTML = `
      特殊詐欺の被害件数は年々増加し、その手口は非常に巧妙になっています。<br><br>
      警察や市役所を騙る電話、突然の訪問業者、携帯電話への不審なメッセージなど、詐欺は日常のふとした瞬間にやってきます。<br><br>
      大切なお金と安心を守るため、これから始まる1週間（全7問）の詐欺対策チャレンジに挑戦しましょう！
    `;
  } else if (state.mode === "adult") {
    card.innerHTML = `
      あなたの1週間の防犯チャレンジが始まります。<br><br>
      税金の還付や未納通知、サブスクリプションの自動更新トラブル、銀行を騙る不正アクセス、巧妙な投資・副業勧誘など、大人の日常やビジネスには巧妙な罠が潜んでいます。<br><br>
      手元資金50,000円を守り抜きながら、1日1問（全7問）のリアルな詐欺・正規通知を正しく見極めましょう！
    `;
  } else if (state.mode === "elementary") {
    const item = state.selectedItem;
    card.innerHTML = `
      キミの <ruby>名<rt>な</rt></ruby><ruby>前<rt>まえ</rt></ruby>は「${getPlayerRawName()}」。<br><br>
      ずっと <ruby>欲<rt>ほ</rt></ruby>しかった「${item.name}（¥${item.price.toLocaleString("ja-JP")}）」を、お<ruby>小遣<rt>こづか</rt></ruby>いで <ruby>買<rt>か</rt></ruby>うと <ruby>決<rt>き</rt></ruby>めたよ！<br>
      50,000<ruby>円<rt>えん</rt></ruby>を しっかり <ruby>守<rt>まも</rt></ruby>りながら、1<ruby>週間<rt>しゅうかん</rt></ruby>をすごそう。<br><br>
      でも、ネットや まちの<ruby>中<rt>なか</rt></ruby>には、いろんな「あやしい<ruby>罠<rt>わな</rt></ruby>」が まっているよ……。<br>
      さあ、${getPlayerDisplayName()}の 1<ruby>週間<rt>しゅうかん</rt></ruby>が、いま スタート！
    `;
  } else {
    // 中高生モード (teen)
    const item = state.selectedItem;
    card.innerHTML = `
      キミの名前は「${getPlayerRawName()}」。<br><br>
      ずっと欲しかった「${item.name}（¥${item.price.toLocaleString("ja-JP")}）」を、自分のお小遣いで買うと決めた。<br>
      50,000円を守りながら、1週間を過ごすことになる。<br><br>
      でも、街にもSNSやネットの中にも、色々な「落とし穴」が潜んでいる……。<br>
      さあ、${getPlayerDisplayName()}の1週間が、いま始まる。
    `;
  }

  const bgImg = document.getElementById("synopsis-bg-image");
  const guideImg = document.getElementById("synopsis-guide-image");
  
  setImageSafely(bgImg, IMAGE_ASSETS.backgrounds.schoolRoute);
  setImageSafely(guideImg, null);

  showScreen("screen-synopsis");
}

function showEvent() {
  if (state.slotIndex >= state.weeklyQuestions.length) {
    if (state.mode === "senior" || state.mode === "adult") {
      showWeekRecap();
    } else {
      showShoppingScreen();
    }
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
      "落ち着いて考えながら進めよう！";
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

  const supportMsgs = ["落ち着いて判断しよう！", "怪しいポイントを探してみよう！", "じっくり考えて選んでね！"];
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
  }, 900);
}

function getNextButtonLabel() {
  const nextIndex = state.slotIndex + 1;
  if (nextIndex >= state.weeklyQuestions.length) {
    return (state.mode === "senior" || state.mode === "adult") ? "結果発表へ" : "買い物へ";
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
  wrong: ["危なかった…", "次は気をつけよう。", "相談することが大切だね！"]
};

function getReactionComment(choiceType) {
  const options = REACTION_COMMENTS[choiceType] || REACTION_COMMENTS.wrong;
  return shuffleArray(options)[0];
}

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

  const popOverlay = document.getElementById("instant-pop-overlay");
  const popBadge = document.getElementById("instant-pop-badge");
  const popMoney = document.getElementById("instant-pop-money");
  const popSub = document.getElementById("instant-pop-sub");

  popBadge.classList.remove("is-correct", "is-partial", "is-wrong");
  popMoney.classList.remove("is-plus", "is-minus", "is-zero");
  if (popOverlay) popOverlay.classList.remove("is-danger-flash");

  if (question.category === "real" && isCorrect) {
    popBadge.textContent = "⭕ 本物を見抜けた！";
    popBadge.classList.add("is-correct");
    popSub.textContent = "正しい手続きで安全に確認できました！";
    setJoeExpression("happy");
  } else if (isCorrect) {
    popBadge.textContent = "✨ 詐欺を防げた！";
    popBadge.classList.add("is-correct");
    popSub.textContent = "冷静な判断でお金をしっかり守れたね！";
    setJoeExpression("cheer");
  } else {
    popBadge.textContent = "⚠️ 危険！だまされてしまった…";
    popBadge.classList.add("is-wrong");
    popSub.textContent = `被害：${Math.abs(choice.money).toLocaleString("ja-JP")}円！`;
    setJoeExpression("sad");

    if (popOverlay) popOverlay.classList.remove("is-danger-flash");
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
    badge.textContent = "⭕ 本物を見抜けた！";
    badge.classList.add("is-correct");
    pointTitleEl.textContent = "🎉 無事に確認完了！ポイント";
  } else if (isCorrect) {
    badge.textContent = "⭕ 詐欺を防げた！";
    badge.classList.add("is-correct");
    pointTitleEl.textContent = "今回の防犯ポイント";
  } else {
    badge.textContent = "❌ 詐欺被害！";
    badge.classList.add("is-wrong");
    pointTitleEl.textContent = "防犯のポイント";

    if (choice.damageType === "personal_info") {
      damageAlertEl.textContent = "⚠️ 個人情報流出リスク！";
      damageAlertEl.classList.remove("is-hidden");
    } else if (choice.damageType === "account") {
      damageAlertEl.textContent = "⚠️ アカウント乗っ取りリスク！";
      damageAlertEl.classList.remove("is-hidden");
    } else if (choice.damageType === "line_takeover") {
      damageAlertEl.textContent = "⚠️ LINE・SNS乗っ取りリスク！";
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
  }, 1400);
}

function goToNextDay() {
  state.slotIndex += 1;
  showEvent();
}

function showShoppingScreen() {
  updateStatusBar();
  const card = document.getElementById("shopping-card");
  const item = state.selectedItem;
  const canAfford = state.money >= item.price;

  card.innerHTML = `
    ${itemVisualHTML(item, "shopping-photo")}
    <p class="shopping-title">${item.name}（¥${item.price.toLocaleString("ja-JP")}）</p>
    <p class="shopping-detail">
      今の所持金は <strong>¥${state.money.toLocaleString("ja-JP")}</strong> だよ。<br>
      ${canAfford ? `1週間、お金を守った成果で無事に「${item.name}」を購入できました！` : `残念！被害によって所持金が足りず「${item.name}」を購入できませんでした…`}
    </p>
  `;

  const bgImg = document.getElementById("shopping-bg-image");
  const playerImg = document.getElementById("shopping-player-image");
  const playerImage = getPlayerImage(canAfford ? "playerHappy" : "playerSad");
  setImageSafely(bgImg, IMAGE_ASSETS.backgrounds.convenienceStoreFallback);
  setImageSafely(playerImg, playerImage);
  applyCharacterBlend(playerImg, playerImage);

  showScreen("screen-shopping");
}

function calculateRank(correctCount, total) {
  const rate = (correctCount / total) * 100;
  if (rate >= 100) return { rank: "S", title: "詐欺対策マスター", class: "rank-s" };
  if (rate >= 80) return { rank: "A", title: "防犯上級者", class: "rank-a" };
  if (rate >= 60) return { rank: "B", title: "防犯中級者", class: "rank-b" };
  if (rate >= 40) return { rank: "C", title: "防犯見習い", class: "rank-c" };
  return { rank: "D", title: "要注意レベル", class: "rank-d" };
}

function showEnding() {
  const card = document.getElementById("ending-card");
  const totalQuestions = state.weeklyQuestions.length;
  const rankInfo = calculateRank(state.correctCount, totalQuestions);

  const isNoShopMode = (state.mode === "senior" || state.mode === "adult");
  const item = state.selectedItem;
  const canAfford = isNoShopMode ? (state.money === 50000) : (state.money >= (item ? item.price : 0));

  const endingCharacter = getPlayerImage(canAfford ? "playerHappy" : "playerSad");

  const joeCommentEl = document.getElementById("ending-joe-comment");
  if (joeCommentEl) {
    if (state.mode === "senior") {
      joeCommentEl.textContent = canAfford
        ? `見事全問正解です！ 1週間、大切な資産を完璧に守り抜きましたね！`
        : `1週間お疲れさまでした。学んだ防犯知識をぜひ日頃の防犯にお役立てください！`;
    } else if (state.mode === "adult") {
      joeCommentEl.textContent = canAfford
        ? `見事全問正解です！ 巧妙な詐欺手口を完璧に見抜きました！`
        : `1週間お疲れさまでした。身につけた知識を日常のリスク管理に活かしてください！`;
    } else if (state.mode === "elementary") {
      joeCommentEl.innerHTML = canAfford
        ? `${getPlayerDisplayName()}、1<ruby>週間<rt>しゅうかん</rt></ruby><ruby>本当<rt>ほんとう</rt></ruby>によく<ruby>頑張<rt>がんば</rt></ruby>ったね！ すばらしい<ruby>防犯<rt>ぼうはん</rt></ruby>パワーだよ！`
        : `${getPlayerDisplayName()}、<ruby>今回<rt>こんかい</rt></ruby>は<ruby>残念<rt>ざんねん</rt></ruby>だったね。でも<ruby>学<rt>まな</rt></ruby>んだことは <ruby>次<rt>つぎ</rt></ruby>にかならず<ruby>役立<rt>やくだ</rt></ruby>つよ！`;
    } else {
      // teen
      joeCommentEl.textContent = canAfford
        ? `${getPlayerDisplayName()}、1週間本当によく頑張ったね！素晴らしい防犯意識だよ！`
        : `${getPlayerDisplayName()}、今回は残念だったね。でも学んだ知識は必ず次につながるよ！`;
    }
  }

  setJoeExpression(canAfford ? "happy" : "cheer");
  const guideImg = document.getElementById("ending-guide-image");
  setImageSafely(guideImg, getJoeImage(state.joeExpression));
  applyCharacterBlend(guideImg, getJoeImage(state.joeExpression));

  const learnedSkills = state.answeredQuestions
    .filter(a => a.isCorrect && SKILL_MAP[a.questionId])
    .map(a => SKILL_MAP[a.questionId]);

  const skillsHTML = learnedSkills.length > 0 ? `
    <div class="ending-lessons">
      <p class="ending-lessons-title">🌟 今回身についた防犯力</p>
      <ul class="ending-lessons-list">
        ${learnedSkills.map(skill => `<li>${skill}</li>`).join("")}
      </ul>
    </div>
  ` : "";

  const hasOtherDamages = state.damages.personalInfo > 0 || state.damages.account > 0 || state.damages.line > 0;
  const damagesBreakdownHTML = hasOtherDamages ? `
    <div class="damages-breakdown">
      <p class="damages-title">⚠️ 発生したその他の被害</p>
      <ul>
        ${state.damages.personalInfo > 0 ? `<li>個人情報流出リスク: ${state.damages.personalInfo}回</li>` : ""}
        ${state.damages.account > 0 ? `<li>アカウント乗っ取りリスク: ${state.damages.account}回</li>` : ""}
        ${state.damages.line > 0 ? `<li>SNS・LINE乗っ取りリスク: ${state.damages.line}回</li>` : ""}
      </ul>
    </div>
  ` : "";

  const principlesHTML = `
    <div class="principles-panel">
      <p class="principles-title">🛡️ 特殊詐欺対策3原則</p>
      ${THREE_PRINCIPLES.map(p => `
        <div class="principle-item">
          <span class="principle-head">${p.head}</span>
          <p class="principle-desc">${p.desc}</p>
        </div>
      `).join("")}
    </div>
  `;

  let visualHTML = "";
  let titleHTML = "";

  if (isNoShopMode) {
    visualHTML = `
      <div class="ending-visual">
        <img class="ending-character-image" src="${endingCharacter}" alt="結果">
      </div>
    `;
    titleHTML = `
      <p class="ending-title ${canAfford ? 'is-good' : 'is-bad'}">
        ${canAfford ? `🎉 資産防衛・リスク回避 成功！` : `防犯診断 結果発表`}
      </p>
    `;
  } else {
    visualHTML = `
      <div class="ending-visual">
        <img class="ending-character-image" src="${endingCharacter}" alt="結果">
        ${itemVisualHTML(item, "ending-item-photo")}
      </div>
    `;
    titleHTML = `
      <p class="ending-title ${canAfford ? 'is-good' : 'is-bad'}">
        ${canAfford ? `🎉 ${item.name}の購入成功！` : `${item.name}の購入失敗…`}
      </p>
    `;
  }

  card.innerHTML = `
    <div class="rank-badge-container">
      <span class="rank-badge ${rankInfo.class}">${rankInfo.rank}ランク</span>
      <span class="rank-title">${rankInfo.title}</span>
    </div>

    ${visualHTML}
    ${titleHTML}

    <div class="ending-stats-grid">
      <div class="ending-stat">
        <span class="ending-stat-label">防げた詐欺</span>
        <span class="ending-stat-value">${state.preventedScamsCount}件</span>
      </div>
      <div class="ending-stat">
        <span class="ending-stat-label">見抜けなかった回数</span>
        <span class="ending-stat-value">${state.fooledCount}回</span>
      </div>
      <div class="ending-stat">
        <span class="ending-stat-label">最終防衛残高</span>
        <span class="ending-stat-value">¥${state.money.toLocaleString("ja-JP")}</span>
      </div>
      <div class="ending-stat">
        <span class="ending-stat-label">被害総額</span>
        <span class="ending-stat-value">¥${state.damages.money.toLocaleString("ja-JP")}</span>
      </div>
    </div>

    ${damagesBreakdownHTML}
    ${skillsHTML}
    ${principlesHTML}
  `;

  showScreen("screen-ending");
}

// 最終アンケート画面の表示
function showSurveyScreen() {
  const bgImg = document.getElementById("survey-bg-image");
  const guideImg = document.getElementById("survey-guide-image");
  const surveyTextEl = document.getElementById("survey-text");

  setImageSafely(bgImg, IMAGE_ASSETS.backgrounds.schoolRoute);
  
  setJoeExpression("cheer");
  setImageSafely(guideImg, getJoeImage("cheer"));
  applyCharacterBlend(guideImg, getJoeImage("cheer"));

  if (surveyTextEl) {
    surveyTextEl.innerHTML = `
      最後にアンケートに協力してほしいジョー！<br>
      ゲームをプレイして感じたことを教えてね！
    `;
  }

  showScreen("screen-survey");
}

function handleRetire() {
  if (confirm("途中でリタイアして最初からやり直しますか？")) {
    restartGame();
  }
}

function restartGame() {
  state.playerName = "";
  state.money = 50000;
  state.selectedItem = null;
  state.weeklyQuestions = [];
  state.daySchedule = [];
  state.slotIndex = 0;
  state.dialogueIndex = 0;
  state.correctCount = 0;
  state.fooledCount = 0;
  state.preventedScamsCount = 0;
  state.damages = { money: 0, personalInfo: 0, account: 0, line: 0 };
  state.answeredQuestions = [];
  document.getElementById("status-bar").classList.add("hidden");
  showScreen("screen-title");
}

/* =========================================================
   イベントリスナー登録
   ========================================================= */
document.getElementById("btn-start").addEventListener("click", handleStartClick);

// デバイスレイアウト選択ボタン
document.getElementById("btn-device-mobile").addEventListener("click", () => handleSelectDevice("mobile"));
document.getElementById("btn-device-desktop").addEventListener("click", () => handleSelectDevice("desktop"));

// モード選択ボタン（4モード）
document.getElementById("btn-mode-elementary").addEventListener("click", () => handleSelectMode("elementary"));
document.getElementById("btn-mode-teen").addEventListener("click", () => handleSelectMode("teen"));
document.getElementById("btn-mode-adult").addEventListener("click", () => handleSelectMode("adult"));
document.getElementById("btn-mode-senior").addEventListener("click", () => handleSelectMode("senior"));

document.getElementById("btn-name-submit").addEventListener("click", handleNameSubmit);
document.getElementById("btn-synopsis-next").addEventListener("click", showEvent);
document.getElementById("btn-narration-next").addEventListener("click", handleNarrationNext);
document.getElementById("btn-dialogue-next").addEventListener("click", goToDialogueNext);
document.getElementById("btn-next").addEventListener("click", goToNextDay);

document.getElementById("btn-week-recap-next").addEventListener("click", () => {
  if (state.mode === "senior" || state.mode === "adult") {
    showEnding();
  } else {
    showShoppingScreen();
  }
});

document.getElementById("btn-ending").addEventListener("click", showEnding);
document.getElementById("btn-to-survey").addEventListener("click", showSurveyScreen);
document.getElementById("btn-restart").addEventListener("click", restartGame);

const retireBtn = document.getElementById("btn-retire");
if (retireBtn) {
  retireBtn.addEventListener("click", handleRetire);
}

// 画像拡大モーダルの閉じるイベント登録
const closeImageModalBtn = document.getElementById("btn-close-image-modal");
if (closeImageModalBtn) {
  closeImageModalBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closeImageModal();
  });
}

const imageModalOverlay = document.getElementById("image-modal");
if (imageModalOverlay) {
  imageModalOverlay.addEventListener("click", (e) => {
    if (e.target === imageModalOverlay) {
      closeImageModal();
    }
  });
}

renderTitleVisual();
showScreen("screen-title");