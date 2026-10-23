/* =========================================================
   ending.js
   お買い物判定・エンディングランク計算・結果発表・#9110案内・アンケートスキップ
   （中高生モードのみアンケート強制・他モードは常時スキップ対応版）
   ========================================================= */

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

// ランク計算ロジック
function calculateRank(correctCount, total) {
  if (!total || total <= 0) {
    return (state.fooledCount === 0 && state.damages.money === 0)
      ? { rank: "S", title: "詐欺対策マスター", class: "rank-s" }
      : { rank: "D", title: "要注意レベル", class: "rank-d" };
  }
  const rate = (correctCount / total) * 100;
  if (rate >= 100) return { rank: "S", title: "詐欺対策マスター", class: "rank-s" };
  if (rate >= 80) return { rank: "A", title: "防犯上級者", class: "rank-a" };
  if (rate >= 60) return { rank: "B", title: "防犯中級者", class: "rank-b" };
  if (rate >= 40) return { rank: "C", title: "防犯見習い", class: "rank-c" };
  return { rank: "D", title: "要注意レベル", class: "rank-d" };
}

// ⑪ エンディング画面の描画
function showEnding() {
  const card = document.getElementById("ending-card");
  const totalQuestions = state.weeklyQuestions.length;
  const rankInfo = calculateRank(state.correctCount, totalQuestions);

  const isNoShopMode = (state.mode === "senior" || state.mode === "adult");
  const item = state.selectedItem;
  
  const isPerfect = (state.fooledCount === 0 && state.damages.money === 0);
  const canAfford = isPerfect || (isNoShopMode ? (state.money === 50000) : (state.money >= (item ? item.price : 0)));

  const endingCharacter = getPlayerImage(canAfford ? "playerHappy" : "playerSad");

  if (typeof recordAnalyticsClear === "function") {
    recordAnalyticsClear(state.money);
  }

  const joeCommentEl = document.getElementById("ending-joe-comment");
  if (joeCommentEl) {
    if (state.mode === "senior") {
      joeCommentEl.textContent = canAfford
        ? `見事全問正解です！ 1週間、大切な資産を完璧に守り抜きましたね！`
        : `1週間お疲れさまでした。学んだ防犯知識をぜひ日頃の防犯にお役立てください！`;
    } else if (state.mode === "adult") {
      joeCommentEl.textContent = canAfford
        ? `見事全問正解です！ 巧妙な手口を完璧に見抜きました！`
        : `1週間お疲れさまでした。身につけた知識を日常のリスク管理に活かしてください！`;
    } else if (state.mode === "elementary") {
      joeCommentEl.innerHTML = canAfford
        ? `${getPlayerDisplayName()}、1<ruby>週間<rt>しゅうかん</rt></ruby><ruby>本当<rt>ほんとう</rt></ruby>によく<ruby>頑張<rt>がんば</rt></ruby>ったね！ すばらしい<ruby>防犯<rt>ぼうはん</rt></ruby>パワーだよ！`
        : `${getPlayerDisplayName()}、<ruby>今回<rt>こんかい</rt></ruby>は<ruby>残念<rt>ざんねん</rt></ruby>だったね。でも<ruby>学<rt>まな</rt></ruby>んだことは <ruby>次<rt>つぎ</rt></ruby>にかならず<ruby>役立<rt>やくだ</rt></ruby>つよ！`;
    } else {
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
      <p class="damages-title">⚠️ 発生したその他の被害リスク</p>
      <ul>
        ${state.damages.personalInfo > 0 ? `<li>個人情報流出リスク: ${state.damages.personalInfo}回</li>` : ""}
        ${state.damages.account > 0 ? `<li>アカウント乗っ取りリスク: ${state.damages.account}回</li>` : ""}
        ${state.damages.line > 0 ? `<li>SNS乗っ取りリスク: ${state.damages.line}回</li>` : ""}
      </ul>
    </div>
  ` : "";

  const principlesHTML = `
    <div class="principles-panel">
      <p class="principles-title">🛡️ 大分県警 特殊詐欺対策3原則</p>
      ${THREE_PRINCIPLES.map(p => `
        <div class="principle-item">
          <span class="principle-head">${p.head}</span>
          <p class="principle-desc">${p.desc}</p>
        </div>
      `).join("")}
    </div>
  `;

  const police9110HTML = `
    <div class="police-9110-ending-banner">
      <div class="banner-icon-badge">🚨 警察相談窓口のご案内</div>
      <p class="banner-body-text">
        日頃の生活で「これって詐欺かな？」と怪しい連絡や不安を感じたときは、<br>
        全国共通の<strong>警察相談専用電話「#9110」</strong>または最寄りの警察署・交番へご相談ください。
      </p>
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
    ${police9110HTML}
  `;

  // ★ エンディング下部のアクションボタン制御（中高生モードのみアンケート強制・他モードは常時スキップ可能） ★
  const btnGroup = document.getElementById("ending-btn-group");
  if (btnGroup) {
    btnGroup.innerHTML = "";

    // 中高生モード（"teen"）以外、またはテストモード時は常にスキップボタンを表示
    const showSkipButton = (state.mode !== "teen" || state.isTestMode);

    if (showSkipButton) {
      const skipBtn = document.createElement("button");
      skipBtn.className = "btn btn-skip-to-title";
      skipBtn.type = "button";
      skipBtn.textContent = state.isTestMode ? "⏹️ 終了して製作者メニューへ" : "🚪 アンケートをスキップしてタイトルへ";
      skipBtn.onclick = () => {
        if (state.isTestMode) {
          exitTestMode();
        } else {
          restartGame();
        }
      };
      btnGroup.appendChild(skipBtn);
    }

    const surveyBtn = document.createElement("button");
    surveyBtn.className = "btn btn-primary";
    surveyBtn.type = "button";
    surveyBtn.textContent = "📋 アンケートへ進む";
    surveyBtn.onclick = showSurveyScreen;
    btnGroup.appendChild(surveyBtn);
  }

  showScreen("screen-ending");
}

function showSurveyScreen() {
  const form = document.getElementById("game-survey-form");
  const thanksCard = document.getElementById("survey-thanks-card");
  const alertMsg = document.getElementById("survey-validation-msg");

  if (form) {
    form.reset();
    form.classList.remove("is-hidden");
    form.querySelectorAll(".pill-btn").forEach(btn => btn.classList.remove("is-selected"));
    form.querySelectorAll("input[type='hidden']").forEach(inp => inp.value = "");
    form.querySelectorAll(".survey-q-item").forEach(item => item.classList.remove("is-invalid"));
  }

  if (thanksCard) thanksCard.classList.add("is-hidden");
  if (alertMsg) alertMsg.classList.add("is-hidden");

  showScreen("screen-survey");
}

function handleRetire() {
  if (confirm("途中でリタイアして最初からやり直しますか？")) {
    if (typeof recordAnalyticsDropout === "function") {
      recordAnalyticsDropout();
    }
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
  state.isTestMode = false;

  const badge = document.getElementById("test-mode-badge");
  const drawer = document.getElementById("test-controller-drawer");
  if (badge) badge.classList.add("is-hidden");
  if (drawer) drawer.classList.add("is-hidden");

  document.getElementById("status-bar").classList.add("hidden");
  showScreen("screen-title");
  renderTitleVisual();
}