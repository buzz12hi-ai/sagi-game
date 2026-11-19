/* =========================================================
   ending.js
   お買い物判定・エンディングランク計算・結果発表・#9110案内・
   専用統計データページ（大分県＋若年層ニセ警察＆闇バイト統計）・アンケート連携
   【全10問アンケート遷移・小学生総ルビ・XSS対策・完全対応版】
   ========================================================= */

function showShoppingScreen() {
  updateStatusBar();
  const card = document.getElementById("shopping-card");
  const item = state.selectedItem;
  const canAfford = state.money >= item.price;
  const isElem = state.mode === "elementary";

  const itemDisp = (isElem && item.rubyName) ? item.rubyName : escapeHTML(item.name);
  const priceText = isElem
    ? `${item.price.toLocaleString("ja-JP")}<ruby>円<rt>えん</rt></ruby>`
    : `¥${item.price.toLocaleString("ja-JP")}`;
  const moneyText = isElem
    ? `${state.money.toLocaleString("ja-JP")}<ruby>円<rt>えん</rt></ruby>`
    : `¥${state.money.toLocaleString("ja-JP")}`;

  if (isElem) {
    card.innerHTML = `
      ${itemVisualHTML(item, "shopping-photo")}
      <p class="shopping-title">${itemDisp}（${priceText}）</p>
      <p class="shopping-detail">
        <ruby>今<rt>いま</rt></ruby>の <ruby>所持金<rt>しょじきん</rt></ruby>は <strong>${moneyText}</strong> だよ。<br>
        ${
          canAfford
            ? `1<ruby>週間<rt>しゅうかん</rt></ruby>、お<ruby>金<rt>かね</rt></ruby>を <ruby>守<rt>まも</rt></ruby>った <ruby>成果<rt>せいか</rt></ruby>で <ruby>無事<rt>ぶじ</rt></ruby>に「${itemDisp}」を <ruby>買<rt>か</rt></ruby>うことが できました！`
            : `<ruby>残念<rt>ざんねん</rt></ruby>！ <ruby>被害<rt>ひがい</rt></ruby>によって お<ruby>金<rt>かね</rt></ruby>が <ruby>足<rt>た</rt></ruby>りず「${itemDisp}」を <ruby>買<rt>か</rt></ruby>うことが できませんでした…`
        }
      </p>
    `;
  } else {
    card.innerHTML = `
      ${itemVisualHTML(item, "shopping-photo")}
      <p class="shopping-title">${itemDisp}（${priceText}）</p>
      <p class="shopping-detail">
        今の所持金は <strong>${moneyText}</strong> だよ。<br>
        ${
          canAfford
            ? `1週間、お金を守った成果で無事に「${itemDisp}」を購入できました！`
            : `残念！被害によって所持金が足りず「${itemDisp}」を購入できませんでした…`
        }
      </p>
    `;
  }

  const bgImg = document.getElementById("shopping-bg-image");
  const playerImg = document.getElementById("shopping-player-image");
  const playerImage = getPlayerImage(canAfford ? "playerHappy" : "playerSad");
  setImageSafely(bgImg, IMAGE_ASSETS.backgrounds.convenienceStoreFallback);
  setImageSafely(playerImg, playerImage);
  applyCharacterBlend(playerImg, playerImage);

  showScreen("screen-shopping");
}

function calculateRank(correctCount, total) {
  const isElem = state.mode === "elementary";

  if (!total || total <= 0) {
    if (state.fooledCount === 0 && state.damages.money === 0) {
      return {
        rank: "S",
        title: isElem ? "<ruby>詐欺<rt>さぎ</rt></ruby><ruby>対策<rt>たいさく</rt></ruby>マスター" : "詐欺対策マスター",
        class: "rank-s"
      };
    }
    return {
      rank: "D",
      title: isElem ? "<ruby>要注意<rt>ようちゅうい</rt></ruby>レベル" : "要注意レベル",
      class: "rank-d"
    };
  }

  const rate = (correctCount / total) * 100;
  if (rate >= 100) {
    return {
      rank: "S",
      title: isElem ? "<ruby>詐欺<rt>さぎ</rt></ruby><ruby>対策<rt>たいさく</rt></ruby>マスター" : "詐欺対策マスター",
      class: "rank-s"
    };
  }
  if (rate >= 80) {
    return {
      rank: "A",
      title: isElem ? "<ruby>防犯<rt>ぼうはん</rt></ruby><ruby>上級者<rt>じょうきゅうしゃ</rt></ruby>" : "防犯上級者",
      class: "rank-a"
    };
  }
  if (rate >= 60) {
    return {
      rank: "B",
      title: isElem ? "<ruby>防犯<rt>ぼうはん</rt></ruby><ruby>中級者<rt>ちゅうきゅうしゃ</rt></ruby>" : "防犯中級者",
      class: "rank-b"
    };
  }
  if (rate >= 40) {
    return {
      rank: "C",
      title: isElem ? "<ruby>防犯<rt>ぼうはん</rt></ruby><ruby>見習<rt>みなら</rt></ruby>い" : "防犯見習い",
      class: "rank-c"
    };
  }
  return {
    rank: "D",
    title: isElem ? "<ruby>要注意<rt>ようちゅうい</rt></ruby>レベル" : "要注意レベル",
    class: "rank-d"
  };
}

// エンディング画面（結果・防犯力・3原則の表示 ➜ データ専用ページへ誘導）
function showEnding() {
  const card = document.getElementById("ending-card");
  const totalQuestions = state.weeklyQuestions.length;
  const rankInfo = calculateRank(state.correctCount, totalQuestions);
  const isElem = state.mode === "elementary";

  const isNoShopMode = (state.mode === "senior" || state.mode === "adult");
  const item = state.selectedItem;

  const isPerfect = (state.fooledCount === 0 && state.damages.money === 0);
  const canAfford = isPerfect || (isNoShopMode ? (state.money === 50000) : (state.money >= (item ? item.price : 0)));

  let endingCharacterSrc = "";
  if (rankInfo.rank === "S") {
    endingCharacterSrc = getJoeImage("happy");
  } else if (rankInfo.rank === "A" || rankInfo.rank === "B") {
    endingCharacterSrc = getJoeImage("cheer");
  } else if (rankInfo.rank === "C") {
    endingCharacterSrc = getJoeImage("worry");
  } else {
    endingCharacterSrc = getJoeImage("sad");
  }

  if (typeof recordAnalyticsClear === "function") {
    recordAnalyticsClear(state.money);
  }

  if (typeof stagePendingSession === "function") {
    stagePendingSession();
  }

  const safeDispName = escapeHTML(getPlayerDisplayName());
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
    } else if (isElem) {
      joeCommentEl.innerHTML = canAfford
        ? `${safeDispName}、1<ruby>週間<rt>しゅうかん</rt></ruby> <ruby>本当<rt>ほんとう</rt></ruby>によく <ruby>頑張<rt>がんば</rt></ruby>ったね！ すばらしい <ruby>防犯<rt>ぼうはん</rt></ruby>パワーだよ！`
        : `${safeDispName}、<ruby>今回<rt>こんかい</rt></ruby>は <ruby>残念<rt>ざんねん</rt></ruby>だったね。でも <ruby>学<rt>まな</rt></ruby>んだことは <ruby>次<rt>つぎ</rt></ruby>に かならず <ruby>役立<rt>やくだ</rt></ruby>つよ！`;
    } else {
      joeCommentEl.textContent = canAfford
        ? `${safeDispName}、1週間本当によく頑張ったね！素晴らしい防犯意識だよ！`
        : `${safeDispName}、今回は残念だったね。でも学んだ知識は必ず次につながるよ！`;
    }
  }

  setJoeExpression(canAfford ? "happy" : "cheer");
  const guideImg = document.getElementById("ending-guide-image");
  setImageSafely(guideImg, getJoeImage(state.joeExpression));
  applyCharacterBlend(guideImg, getJoeImage(state.joeExpression));

  const skillSource = (isElem && typeof SKILL_MAP_ELEMENTARY !== "undefined")
    ? SKILL_MAP_ELEMENTARY
    : SKILL_MAP;

  const learnedSkills = state.answeredQuestions
    .filter(a => a.isCorrect && skillSource[a.questionId])
    .map(a => skillSource[a.questionId]);

  const skillsHTML = learnedSkills.length > 0 ? `
    <div class="ending-lessons">
      <p class="ending-lessons-title">${isElem ? "🌟 <ruby>今回<rt>こんかい</rt></ruby> <ruby>身<rt>み</rt></ruby>についた <ruby>防犯力<rt>ぼうはんりょく</rt></ruby>" : "🌟 今回身についた防犯力"}</p>
      <ul class="ending-lessons-list">
        ${learnedSkills.map(skill => `<li>${skill}</li>`).join("")}
      </ul>
    </div>
  ` : "";

  const hasOtherDamages = state.damages.personalInfo > 0 || state.damages.account > 0 || state.damages.line > 0;
  const kaiUnit = isElem ? "<ruby>回<rt>かい</rt></ruby>" : "回";
  const damagesBreakdownHTML = hasOtherDamages ? `
    <div class="damages-breakdown">
      <p class="damages-title">${isElem ? "⚠️ <ruby>発生<rt>はっせい</rt></ruby>した そのほかの <ruby>被害<rt>ひがい</rt></ruby>リスク" : "⚠️ 発生したその他の被害リスク"}</p>
      <ul>
        ${state.damages.personalInfo > 0 ? `<li>${isElem ? "<ruby>個人<rt>こじん</rt></ruby><ruby>情報<rt>じょうほう</rt></ruby>が <ruby>漏<rt>も</rt></ruby>れるリスク" : "個人情報流出リスク"}: ${state.damages.personalInfo}${kaiUnit}</li>` : ""}
        ${state.damages.account > 0 ? `<li>${isElem ? "アカウントを <ruby>乗<rt>の</rt></ruby>っ<ruby>取<rt>と</rt></ruby>られるリスク" : "アカウント乗っ取りリスク"}: ${state.damages.account}${kaiUnit}</li>` : ""}
        ${state.damages.line > 0 ? `<li>${isElem ? "SNS・メッセージアプリを <ruby>乗<rt>の</rt></ruby>っ<ruby>取<rt>と</rt></ruby>られるリスク" : "SNS・メッセージアプリ乗っ取りリスク"}: ${state.damages.line}${kaiUnit}</li>` : ""}
      </ul>
    </div>
  ` : "";

  let principlesSource = THREE_PRINCIPLES;
  if (isElem && typeof THREE_PRINCIPLES_ELEMENTARY !== "undefined") {
    principlesSource = THREE_PRINCIPLES_ELEMENTARY;
  } else if (state.mode === "senior" && typeof THREE_PRINCIPLES_SENIOR !== "undefined") {
    principlesSource = THREE_PRINCIPLES_SENIOR;
  }

  const principlesHTML = `
    <div class="principles-panel">
      <p class="principles-title">${isElem ? "🛡️ <ruby>大分県警<rt>おおいたけんけい</rt></ruby> <ruby>特殊<rt>とくしゅ</rt></ruby><ruby>詐欺<rt>さぎ</rt></ruby><ruby>対策<rt>たいさく</rt></ruby>3<ruby>原則<rt>げんそく</rt></ruby>" : "🛡️ 大分県警 特殊詐欺対策3原則"}</p>
      ${principlesSource.map(p => `
        <div class="principle-item">
          <span class="principle-head">${p.head}</span>
          <p class="principle-desc">${p.desc}</p>
        </div>
      `).join("")}
    </div>
  `;

  const police9110HTML = isElem ? `
    <div class="police-9110-ending-banner">
      <div class="banner-icon-badge">🚨 <ruby>警察<rt>けいさつ</rt></ruby><ruby>相談<rt>そうだん</rt></ruby><ruby>窓口<rt>まどぐち</rt></ruby></div>
      <p class="banner-body-text">
        <ruby>普段<rt>ふだん</rt></ruby>の <ruby>生活<rt>せいかつ</rt></ruby>で「これって <ruby>詐欺<rt>さぎ</rt></ruby>かな？」と <ruby>怪<rt>あや</rt></ruby>しい <ruby>連絡<rt>れんらく</rt></ruby>や <ruby>不安<rt>ふあん</rt></ruby>を <ruby>感<rt>かん</rt></ruby>じたときは、<br>
        <ruby>全国<rt>ぜんこく</rt></ruby><ruby>共通<rt>きょうつう</rt></ruby>の<strong><ruby>警察<rt>けいさつ</rt></ruby><ruby>相談<rt>そうだん</rt></ruby><ruby>専用<rt>せんよう</rt></ruby><ruby>電話<rt>でんわ</rt></ruby>「#9110」</strong>や <ruby>近<rt>ちか</rt></ruby>くの <ruby>警察署<rt>けいさつしょ</rt></ruby>・おうちの<ruby>人<rt>ひと</rt></ruby>に ご<ruby>相談<rt>そうだん</rt></ruby>ください。
      </p>
    </div>
  ` : `
    <div class="police-9110-ending-banner">
      <div class="banner-icon-badge">🚨 警察相談窓口</div>
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
        <img class="ending-character-image" src="${endingCharacterSrc}" alt="結果">
      </div>
    `;
    titleHTML = `
      <p class="ending-title ${canAfford ? 'is-good' : 'is-bad'}">
        ${canAfford ? `🎉 資産防衛・リスク回避 成功！` : `防犯診断 結果発表`}
      </p>
    `;
  } else {
    const itemDisp = (isElem && item && item.rubyName) ? item.rubyName : escapeHTML(item ? item.name : "");
    visualHTML = `
      <div class="ending-visual">
        <img class="ending-character-image" src="${endingCharacterSrc}" alt="結果">
        ${itemVisualHTML(item, "ending-item-photo")}
      </div>
    `;
    if (isElem) {
      titleHTML = `
        <p class="ending-title ${canAfford ? 'is-good' : 'is-bad'}">
          ${canAfford ? `🎉 ${itemDisp}の <ruby>購入<rt>こうにゅう</rt></ruby><ruby>成功<rt>せいこう</rt></ruby>！` : `${itemDisp}の <ruby>購入<rt>こうにゅう</rt></ruby><ruby>失敗<rt>しっぱい</rt></ruby>…`}
        </p>
      `;
    } else {
      titleHTML = `
        <p class="ending-title ${canAfford ? 'is-good' : 'is-bad'}">
          ${canAfford ? `🎉 ${itemDisp}の購入成功！` : `${itemDisp}の購入失敗…`}
        </p>
      `;
    }
  }

  const kenUnit = isElem ? "<ruby>件<rt>けん</rt></ruby>" : "件";
  const yenUnit = isElem ? "<ruby>円<rt>えん</rt></ruby>" : "円";

  card.innerHTML = `
    <div class="rank-badge-container">
      <span class="rank-badge ${rankInfo.class}">${rankInfo.rank}ランク</span>
      <span class="rank-title">${rankInfo.title}</span>
    </div>

    ${visualHTML}
    ${titleHTML}

    <div class="ending-stats-grid">
      <div class="ending-stat">
        <span class="ending-stat-label">${isElem ? "<ruby>防<rt>ふせ</rt></ruby>げた <ruby>詐欺<rt>さぎ</rt></ruby>" : "防げた詐欺"}</span>
        <span class="ending-stat-value">${state.preventedScamsCount}${kenUnit}</span>
      </div>
      <div class="ending-stat">
        <span class="ending-stat-label">${isElem ? "<ruby>見抜<rt>みぬ</rt></ruby>けなかった <ruby>回数<rt>かいすう</rt></ruby>" : "見抜けなかった回数"}</span>
        <span class="ending-stat-value">${state.fooledCount}${kaiUnit}</span>
      </div>
      <div class="ending-stat">
        <span class="ending-stat-label">${isElem ? "<ruby>最終<rt>さいしゅう</rt></ruby><ruby>防衛<rt>ぼうえい</rt></ruby><ruby>残高<rt>ざんだか</rt></ruby>" : "最終防衛残高"}</span>
        <span class="ending-stat-value">${isElem ? `${state.money.toLocaleString("ja-JP")}${yenUnit}` : `¥${state.money.toLocaleString("ja-JP")}`}</span>
      </div>
      <div class="ending-stat">
        <span class="ending-stat-label">${isElem ? "<ruby>被害<rt>ひがい</rt></ruby><ruby>総額<rt>そうがく</rt></ruby>" : "被害総額"}</span>
        <span class="ending-stat-value">${isElem ? `${state.damages.money.toLocaleString("ja-JP")}${yenUnit}` : `¥${state.damages.money.toLocaleString("ja-JP")}`}</span>
      </div>
    </div>

    ${damagesBreakdownHTML}
    ${skillsHTML}
    ${principlesHTML}
    ${police9110HTML}
  `;

  // 下部ボタン：必ず専用統計データ画面へ進む
  const btnGroup = document.getElementById("ending-btn-group");
  if (btnGroup) {
    btnGroup.innerHTML = "";

    const toDataBtn = document.createElement("button");
    toDataBtn.className = "btn btn-primary";
    toDataBtn.type = "button";
    toDataBtn.innerHTML = isElem
      ? "📊 <ruby>大分県<rt>おおいたけん</rt></ruby>・<ruby>全国<rt>ぜんこく</rt></ruby>の <ruby>被害<rt>ひがい</rt></ruby>データを <ruby>見<rt>み</rt></ruby>る ▶"
      : "📊 大分県・全国の詐欺被害データを見る ▶";
    toDataBtn.onclick = showOitaStatsScreen;
    btnGroup.appendChild(toDataBtn);
  }

  showScreen("screen-ending");
}

// 専用統計データ画面（大分県推移・年代別・全国若年層ニセ警察＆闇バイト統計）
function showOitaStatsScreen() {
  const isElem = state.mode === "elementary";

  const guideImg = document.getElementById("stats-guide-image");
  setJoeExpression("thinking");
  setImageSafely(guideImg, getJoeImage("thinking"));
  applyCharacterBlend(guideImg, getJoeImage("thinking"));

  const commentEl = document.getElementById("stats-joe-comment");
  if (commentEl) {
    if (isElem) {
      commentEl.innerHTML = `
        1<ruby>週間<rt>しゅうかん</rt></ruby> お<ruby>疲<rt>つか</rt></ruby>れさま！<br>
        <ruby>大分県<rt>おおいたけん</rt></ruby>や <ruby>全国<rt>ぜんこく</rt></ruby>でも、お<ruby>年寄<rt>としよ</rt></ruby>りだけでなく <strong><ruby>若<rt>わか</rt></ruby>い<ruby>人<rt>ひと</rt></ruby>や <ruby>子<rt>こ</rt></ruby>ども</strong>を ねらった <ruby>詐欺<rt>さぎ</rt></ruby>が たくさん <ruby>起<rt>お</rt></ruby>きているんだ。<ruby>実際<rt>じっさい</rt></ruby>の <ruby>数字<rt>すうじ</rt></ruby>を <ruby>見<rt>み</rt></ruby>てみよう！
      `;
    } else {
      commentEl.innerHTML = `
        1週間お疲れさまでした！<br>
        大分県や全国でも、高齢者だけでなく<strong>10代・20代・30代の若い世代</strong>を狙った手口や闇バイトが急増しています。公式の犯罪統計から実態を確認しましょう！
      `;
    }
  }

  const container = document.getElementById("stats-page-container");
  if (container) {
    container.innerHTML = buildOitaStatsHTML(isElem);
  }

  const btnGroup = document.getElementById("stats-page-btn-group");
  if (btnGroup) {
    btnGroup.innerHTML = "";

    const showSkipButton = (state.mode !== "teen" || state.isTestMode || state.hasPlayedBefore);

    if (showSkipButton) {
      const skipBtn = document.createElement("button");
      skipBtn.className = "btn btn-skip-to-title";
      skipBtn.type = "button";
      if (state.isTestMode) {
        skipBtn.textContent = "⏹️ 終了して製作者メニューへ";
      } else {
        skipBtn.innerHTML = isElem
          ? "🚪 アンケートを スキップして タイトルへ"
          : "🚪 アンケートをスキップしてタイトルへ";
      }
      skipBtn.onclick = () => {
        if (state.isTestMode) {
          exitTestMode();
        } else {
          if (typeof commitFinalSession === "function") {
            commitFinalSession(null);
          }
          restartGame();
        }
      };
      btnGroup.appendChild(skipBtn);
    }

    const surveyBtn = document.createElement("button");
    surveyBtn.className = "btn btn-survey";
    surveyBtn.type = "button";
    surveyBtn.innerHTML = isElem
      ? "📋 アンケートへ <ruby>進<rt>すす</rt></ruby>む"
      : "📋 アンケートへ進む";
    surveyBtn.onclick = showSurveyScreen;
    btnGroup.appendChild(surveyBtn);
  }

  showScreen("screen-oita-stats");
}

// 統計HTMLビルダー（大分県統計＋警察庁確定値・若年層＆闇バイト統計）
function buildOitaStatsHTML(isElem) {
  const statsData = (typeof OITA_SCAM_STATS !== "undefined") ? OITA_SCAM_STATS : null;
  if (!statsData) return "";

  const maxCases = 400;
  const trendRowsHTML = statsData.yearlyTrend.map(row => {
    const widthPct = Math.min(100, Math.round((row.cases / maxCases) * 100));
    const yearTxt = isElem ? row.rubyYearLabel : row.yearLabel;
    const amtTxt = isElem ? row.rubyAmountText : row.amountText;
    const caseUnit = isElem ? "<ruby>件<rt>けん</rt></ruby>" : "件";
    const noteTxt = isElem ? (row.rubyNote || "") : (row.note || "");

    return `
      <div class="oita-bar-row">
        <div class="oita-bar-meta">
          <span class="oita-bar-year">${yearTxt}</span>
          <span class="oita-bar-numbers">${row.cases}${caseUnit} ／ ${amtTxt}</span>
        </div>
        <div class="oita-bar-track">
          <div class="oita-bar-fill" style="width: ${widthPct}%;"></div>
        </div>
        ${noteTxt ? `<p class="oita-summary-note">${noteTxt}</p>` : ""}
      </div>
    `;
  }).join("");

  const ageRowsHTML = statsData.ageBreakdown.map(row => {
    const widthPct = Math.min(100, Math.round((row.pct / 40) * 100));
    const lblTxt = isElem ? row.rubyLabel : row.label;
    return `
      <div class="oita-bar-row">
        <div class="oita-bar-meta">
          <span class="oita-bar-year">${lblTxt}</span>
          <span class="oita-bar-numbers">${row.pct.toFixed(1)}%</span>
        </div>
        <div class="oita-bar-track">
          <div class="oita-bar-fill ${row.highlight ? 'is-age-highlight' : 'is-age'}" style="width: ${widthPct}%;"></div>
        </div>
      </div>
    `;
  }).join("");

  const maxPoliceCases = 2300;
  const nisePoliceRowsHTML = (statsData.nisePoliceByAge || []).map(row => {
    const widthPct = Math.min(100, Math.round((row.cases / maxPoliceCases) * 100));
    const lblTxt = isElem ? row.rubyLabel : row.label;
    const detailTxt = isElem ? row.rubyDetail : row.detail;
    const caseUnit = isElem ? "<ruby>件<rt>けん</rt></ruby>" : "件";
    return `
      <div class="oita-bar-row">
        <div class="oita-bar-meta">
          <span class="oita-bar-year">${lblTxt}</span>
          <span class="oita-bar-numbers">${row.cases.toLocaleString()}${caseUnit} <small style="font-size: 11px; color: #4A5A7C;">(${detailTxt})</small></span>
        </div>
        <div class="oita-bar-track">
          <div class="oita-bar-fill ${row.highlight ? 'is-youth-highlight' : 'is-age'}" style="width: ${widthPct}%;"></div>
        </div>
      </div>
    `;
  }).join("");

  const darkJobRowsHTML = (statsData.darkJobArrestByAge || []).map(row => {
    const widthPct = Math.min(100, Math.round((row.pct / 25) * 100));
    const lblTxt = isElem ? row.rubyLabel : row.label;
    return `
      <div class="oita-bar-row">
        <div class="oita-bar-meta">
          <span class="oita-bar-year">${lblTxt}</span>
          <span class="oita-bar-numbers">${row.pct.toFixed(1)}%</span>
        </div>
        <div class="oita-bar-track">
          <div class="oita-bar-fill ${row.highlight ? 'is-dark-byte' : 'is-age'}" style="width: ${widthPct}%;"></div>
        </div>
      </div>
    `;
  }).join("");

  if (isElem) {
    return `
      <div class="oita-stats-panel">
        <div class="oita-stats-header">
          <span class="oita-stats-badge">📊 <ruby>警察<rt>けいさつ</rt></ruby>の <ruby>公式<rt>こうしき</rt></ruby>データ</span>
          <h3 class="oita-stats-title"><ruby>大分県<rt>おおいたけん</rt></ruby>と <ruby>全国<rt>ぜんこく</rt></ruby>における <ruby>詐欺<rt>さぎ</rt></ruby><ruby>被害<rt>ひがい</rt></ruby>の <ruby>現実<rt>げんじつ</rt></ruby></h3>
        </div>

        <div class="oita-summary-cards">
          <div class="oita-summary-card">
            <span class="oita-summary-label"><ruby>令和<rt>れいわ</rt></ruby>7<ruby>年<rt>ねん</rt></ruby> <ruby>大分県内<rt>おおいたけんない</rt></ruby>の <ruby>総被害<rt>そうひがい</rt></ruby></span>
            <span class="oita-summary-val">747<ruby>件<rt>けん</rt></ruby> ／ <ruby>約<rt>やく</rt></ruby>23<ruby>億<rt>おく</rt></ruby>7,302<ruby>万円<rt>まんえん</rt></ruby></span>
            <p class="oita-summary-note"><ruby>従来<rt>じゅうらい</rt></ruby>の <ruby>特殊<rt>とくしゅ</rt></ruby><ruby>詐欺<rt>さぎ</rt></ruby>と SNS<ruby>型<rt>がた</rt></ruby><ruby>詐欺<rt>さぎ</rt></ruby>を <ruby>合<rt>あ</rt></ruby>わせた 1<ruby>年間<rt>ねんかん</rt></ruby>の <ruby>大分県内<rt>おおいたけんない</rt></ruby>の <ruby>被害<rt>ひがい</rt></ruby>です。</p>
          </div>
          <div class="oita-summary-card is-navy">
            <span class="oita-summary-label">65<ruby>歳未満<rt>さいみまん</rt></ruby>の <ruby>被害<rt>ひがい</rt></ruby><ruby>割合<rt>わりあい</rt></ruby>（<ruby>大分県<rt>おおいたけん</rt></ruby>・<ruby>令和<rt>れいわ</rt></ruby>8<ruby>年<rt>ねん</rt></ruby>）</span>
            <span class="oita-summary-val">62.4%</span>
            <p class="oita-summary-note">お<ruby>年寄<rt>としよ</rt></ruby>りだけでなく、<ruby>若<rt>わか</rt></ruby>い<ruby>人<rt>ひと</rt></ruby>や <ruby>大人<rt>おとな</rt></ruby>が <ruby>被害<rt>ひがい</rt></ruby>の 6<ruby>割<rt>わり</rt></ruby>を <ruby>占<rt>し</rt></ruby>めています。</p>
          </div>
          <div class="oita-summary-card is-purple">
            <span class="oita-summary-label">ニセ<ruby>警察<rt>けいさつ</rt></ruby><ruby>詐欺<rt>さぎ</rt></ruby>で <ruby>一番<rt>いちばん</rt></ruby><ruby>多<rt>おお</rt></ruby>い <ruby>年齢<rt>ねんれい</rt></ruby>（<ruby>全国<rt>ぜんこく</rt></ruby>）</span>
            <span class="oita-summary-val">20<ruby>代<rt>だい</rt></ruby>・30<ruby>代<rt>だい</rt></ruby>（<ruby>計<rt>けい</rt></ruby>3,957<ruby>件<rt>けん</rt></ruby>）</span>
            <p class="oita-summary-note">スマホに <ruby>突然<rt>とつぜん</rt></ruby> <ruby>電話<rt>でんわ</rt></ruby>がかかってくる <ruby>手口<rt>てぐち</rt></ruby>で、<ruby>若<rt>わか</rt></ruby>い<ruby>世代<rt>せだい</rt></ruby>が <ruby>集中<rt>しゅうちゅう</rt></ruby>して ねらわれています。</p>
          </div>
        </div>

        <div class="oita-chart-block">
          <h4 class="oita-chart-subtitle">① <ruby>大分県内<rt>おおいたけんない</rt></ruby>の <ruby>被害<rt>ひがい</rt></ruby><ruby>件数<rt>けんすう</rt></ruby>・<ruby>被害額<rt>ひがいがく</rt></ruby>の <ruby>推移<rt>すいい</rt></ruby>（<ruby>令和<rt>れいわ</rt></ruby>3<ruby>年<rt>ねん</rt></ruby>〜7<ruby>年<rt>ねん</rt></ruby>）</h4>
          <p class="oita-chart-caption">5<ruby>年間<rt>ねんかん</rt></ruby>で <ruby>大分県内<rt>おおいたけんない</rt></ruby>の <ruby>特殊<rt>とくしゅ</rt></ruby><ruby>詐欺<rt>さぎ</rt></ruby>の <ruby>被害額<rt>ひがいがく</rt></ruby>は <ruby>約<rt>やく</rt></ruby>10.5<ruby>倍<rt>ばい</rt></ruby>に <ruby>急増<rt>きゅうぞう</rt></ruby>しています。</p>
          <div class="oita-bars-list">${trendRowsHTML}</div>
          <p class="oita-block-source"><ruby>出典<rt>しゅってん</rt></ruby>：<ruby>大分県警察<rt>おおいたけんけいさつ</rt></ruby>「<ruby>安全<rt>あんぜん</rt></ruby>・<ruby>安心<rt>あんしん</rt></ruby>まちづくり<ruby>推進室通信<rt>すいしんしつしん</rt></ruby>」・<ruby>宇佐市<rt>うさし</rt></ruby>「<ruby>特殊詐欺<rt>とくしゅさぎ</rt></ruby><ruby>発生状況<rt>はっせいじょうきょう</rt></ruby>」</p>
        </div>

        <div class="oita-chart-block">
          <h4 class="oita-chart-subtitle">② <ruby>大分県内<rt>おおいたけんない</rt></ruby>の <ruby>被害者<rt>ひがいしゃ</rt></ruby>の <ruby>年代別<rt>ねんだいべつ</rt></ruby><ruby>割合<rt>わりあい</rt></ruby>（<ruby>令和<rt>れいわ</rt></ruby>8<ruby>年<rt>ねん</rt></ruby>9<ruby>月末<rt>がつまつ</rt></ruby> <ruby>暫定値<rt>ざんていち</rt></ruby>）</h4>
          <p class="oita-chart-caption">20<ruby>歳未満<rt>さいみまん</rt></ruby>から <ruby>高齢者<rt>こうれいしゃ</rt></ruby>まで、すべての <ruby>世代<rt>せだい</rt></ruby>に <ruby>被害<rt>ひがい</rt></ruby>が <ruby>広<rt>ひろ</rt></ruby>がっています。</p>
          <div class="oita-bars-list">${ageRowsHTML}</div>
          <p class="oita-block-source"><ruby>出典<rt>しゅってん</rt></ruby>：<ruby>大分県警察本部<rt>おおいたけんけいさつほんぶ</rt></ruby>「<ruby>大分県<rt>おおいたけん</rt></ruby>の<ruby>犯罪情勢<rt>はんざいじょうせい</rt></ruby>（<ruby>令和<rt>れいわ</rt></ruby>8<ruby>年<rt>ねん</rt></ruby>9<ruby>月末現在<rt>がつまつげんざい</rt></ruby>）」</p>
        </div>

        <div class="oita-chart-block is-youth-block">
          <h4 class="oita-chart-subtitle">③ 【<ruby>全国<rt>ぜんこく</rt></ruby>】ニセ<ruby>警察<rt>けいさつ</rt></ruby><ruby>詐欺<rt>さぎ</rt></ruby>の <ruby>年代別<rt>ねんだいべつ</rt></ruby><ruby>被害<rt>ひがい</rt></ruby><ruby>件数<rt>けんすう</rt></ruby>（<ruby>令和<rt>れいわ</rt></ruby>7<ruby>年<rt>ねん</rt></ruby>・<ruby>計<rt>けい</rt></ruby>11,012<ruby>件<rt>けん</rt></ruby>）</h4>
          <p class="oita-chart-caption">
            「たいほする」とおどす ニセ<ruby>警察<rt>けいさつ</rt></ruby><ruby>詐欺<rt>さぎ</rt></ruby>は、<strong>30<ruby>代<rt>だい</rt></ruby>が <ruby>全年代<rt>ぜんねんだい</rt></ruby>で <ruby>一番<rt>いちばん</rt></ruby><ruby>多<rt>おお</rt></ruby>く、20<ruby>代<rt>だい</rt></ruby>が 2<ruby>番目<rt>ばんめ</rt></ruby></strong>に <ruby>多<rt>おお</rt></ruby>いです（9<ruby>割以上<rt>わりいじょう</rt></ruby>が スマホへの <ruby>電話<rt>でんわ</rt></ruby>）。
          </p>
          <div class="oita-bars-list">${nisePoliceRowsHTML}</div>
          <p class="oita-sub-note is-purple-note">
            💡 <strong>ここがポイント:</strong> <ruby>架空<rt>かくう</rt></ruby><ruby>料金<rt>りょうきん</rt></ruby><ruby>請求<rt>せいきゅう</rt></ruby>（にせサイトや SMS）でも 20<ruby>代<rt>だい</rt></ruby>は 1,062<ruby>件<rt>けん</rt></ruby>と <ruby>多<rt>おお</rt></ruby>く、<ruby>悪用<rt>あくよう</rt></ruby>された <ruby>電話番号<rt>でんわばんごう</rt></ruby>の 75.5%が「＋」から<ruby>始<rt>はじ</rt></ruby>まる <ruby>国際<rt>こくさい</rt></ruby><ruby>電話<rt>でんわ</rt></ruby>でした。
          </p>
          <p class="oita-block-source"><ruby>出典<rt>しゅってん</rt></ruby>：<ruby>警察庁<rt>けいさつちょう</rt></ruby>「<ruby>令和<rt>れいわ</rt></ruby>7<ruby>年<rt>ねん</rt></ruby>における<ruby>特殊詐欺<rt>とくしゅさぎ</rt></ruby><ruby>等<rt>とう</rt></ruby>の<ruby>認知<rt>にんち</rt></ruby>・<ruby>検挙状況<rt>けんきょじょうきょう</rt></ruby>（<ruby>確定値<rt>かくていち</rt></ruby>）」</p>
        </div>

        <div class="oita-chart-block">
          <h4 class="oita-chart-subtitle">④ 【<ruby>全国<rt>ぜんこく</rt></ruby>】「<ruby>闇<rt>やみ</rt></ruby>バイト」などの <ruby>実行役<rt>じっこうやく</rt></ruby>で つかまった <ruby>年齢<rt>ねんれい</rt></ruby>の <ruby>割合<rt>わりあい</rt></ruby></h4>
          <p class="oita-chart-caption">
            SNSの「<ruby>高額<rt>こうがく</rt></ruby>バイト」に だまされて つかまった<ruby>人<rt>ひと</rt></ruby>の <strong>57.8%（<ruby>約<rt>やく</rt></ruby>6<ruby>割<rt>わり</rt></ruby>）が 10<ruby>代<rt>だい</rt></ruby>・20<ruby>代<rt>だい</rt></ruby></strong>です。
          </p>
          <div class="oita-bars-list">${darkJobRowsHTML}</div>
          <p class="oita-sub-note">
            ⚠️ 「はこぶだけ」「<ruby>書類<rt>しょるい</rt></ruby>を <ruby>受<rt>う</rt></ruby>け<ruby>取<rt>と</rt></ruby>るだけ」の <ruby>仕事<rt>しごと</rt></ruby>は <ruby>犯罪<rt>はんざい</rt></ruby>です。いちど かかわると <ruby>脅<rt>おど</rt></ruby>されて にげられなくなります！
          </p>
          <p class="oita-block-source"><ruby>出典<rt>しゅってん</rt></ruby>：<ruby>警察庁<rt>けいさつちょう</rt></ruby>「<ruby>令和<rt>れいわ</rt></ruby>7<ruby>年<rt>ねん</rt></ruby>の<ruby>犯罪情勢<rt>はんざいじょうせい</rt></ruby>」</p>
        </div>
      </div>
    `;
  }

  return `
    <div class="oita-stats-panel">
      <div class="oita-stats-header">
        <span class="oita-stats-badge">📊 警察庁・大分県警察 公式データ</span>
        <h3 class="oita-stats-title">大分県と全国における詐欺被害の現実</h3>
      </div>

      <div class="oita-summary-cards">
        <div class="oita-summary-card">
          <span class="oita-summary-label">令和7年 大分県内の総被害</span>
          <span class="oita-summary-val">747件 ／ 約23億7,302万円</span>
          <p class="oita-summary-note">従来の特殊詐欺（400件・約8.6億円）とSNS型投資・ロマンス詐欺（347件・約15.1億円）の合計です。</p>
        </div>
        <div class="oita-summary-card is-navy">
          <span class="oita-summary-label">65歳未満の被害割合（大分県・令和8年）</span>
          <span class="oita-summary-val">62.4%</span>
          <p class="oita-summary-note">65歳以上（37.6%）だけでなく、20代〜50代など現役・若年世代が被害の6割以上を占めています。</p>
        </div>
        <div class="oita-summary-card is-purple">
          <span class="oita-summary-label">ニセ警察詐欺の最多被害年代（全国）</span>
          <span class="oita-summary-val">20代・30代（計3,957件）</span>
          <p class="oita-summary-note">「逮捕状」等で脅すニセ警察詐欺は、固定電話を持たない若年層のスマホへ直接電話がかかり被害が集中しています。</p>
        </div>
      </div>

      <div class="oita-chart-block">
        <h4 class="oita-chart-subtitle">① 大分県内の特殊詐欺 被害件数・被害額の推移（令和3年〜令和7年）</h4>
        <p class="oita-chart-caption">5年間で大分県内の特殊詐欺被害額は約10.5倍に急増しています。</p>
        <div class="oita-bars-list">${trendRowsHTML}</div>
        <p class="oita-block-source">出典：大分県警察「安全・安心まちづくり推進室通信」・宇佐市「特殊詐欺発生状況」</p>
      </div>

      <div class="oita-chart-block">
        <h4 class="oita-chart-subtitle">② 大分県内の被害者年代別割合（令和8年9月末 暫定値）</h4>
        <p class="oita-chart-caption">若年層から高齢者まで、全世代が詐欺グループのターゲットとなっています。</p>
        <div class="oita-bars-list">${ageRowsHTML}</div>
        <p class="oita-block-source">出典：大分県警察本部「大分県の犯罪情勢（令和8年9月末現在・暫定値）」</p>
      </div>

      <div class="oita-chart-block is-youth-block">
        <h4 class="oita-chart-subtitle">③ 【全国】ニセ警察詐欺の年代別認知件数（令和7年・個人計11,012件）</h4>
        <p class="oita-chart-caption">
          「警察」や「検察」を騙る詐欺は、<strong>30代（2,239件）が全世代最多、20代（1,718件）が第2位</strong>です（接触の9割以上が携帯電話着信）。
        </p>
        <div class="oita-bars-list">${nisePoliceRowsHTML}</div>
        <p class="oita-sub-note is-purple-note">
          💡 <strong>若年層被害の実態:</strong> 架空料金請求詐欺（偽サイトやSMS）でも20代は1,062件と多発。また犯行に使われた電話番号の75.5%が「＋」から始まる国際電話番号でした。
        </p>
        <p class="oita-block-source">出典：警察庁「令和7年における特殊詐欺及びSNS型投資・ロマンス詐欺の認知・検挙状況等について（確定値）」</p>
      </div>

      <div class="oita-chart-block">
        <h4 class="oita-chart-subtitle">④ 【全国】「闇バイト」等の実行役検挙人員 年齢別割合</h4>
        <p class="oita-chart-caption">
          SNS等の闇バイトに加担して逮捕された人員の<strong>57.8%（約6割）が10代・20代</strong>です。
        </p>
        <div class="oita-bars-list">${darkJobRowsHTML}</div>
        <p class="oita-sub-note">
          ⚠️ 「荷物を運ぶだけ」「口座を貸すだけ」のアルバイトは特殊詐欺の実行役（受け子・出し子）です。一度個人情報を渡すと脅迫されて抜け出せなくなります！
        </p>
        <p class="oita-block-source">出典：警察庁「令和7年の犯罪情勢」</p>
      </div>
    </div>
  `;
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
    const slot = currentScheduleSlot();
    const dropoutDay = slot ? slot.weekdayName : "月";

    if (typeof recordAnalyticsDropout === "function") {
      recordAnalyticsDropout();
    }
    if (typeof commitDropoutSession === "function") {
      commitDropoutSession(dropoutDay);
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
  state.sessionId = null;
  state.isSessionSubmitted = false;

  const shell = document.getElementById("app-shell");
  if (shell) {
    shell.classList.remove("is-senior-mode");
  }

  const badge = document.getElementById("test-mode-badge");
  const drawer = document.getElementById("test-controller-drawer");
  if (badge) badge.classList.add("is-hidden");
  if (drawer) drawer.classList.add("is-hidden");

  document.getElementById("status-bar").classList.add("hidden");
  showScreen("screen-title");
  renderTitleVisual();
}