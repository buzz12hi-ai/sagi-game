/* =========================================================
   ending.js
   お買い物判定・エンディングランク計算・結果発表・#9110案内・
   専用統計データページ（警察庁アプリルビ対応＆高齢者バナー拡大対応版）
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
    : `¥${item.money.toLocaleString("ja-JP")}`;

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
        <strong><ruby>警察<rt>けいさつ</rt></ruby><ruby>相談<rt>そうだん</rt></ruby><ruby>専用<rt>せんよう</rt></ruby><ruby>電話<rt>でんわ</rt></ruby>「#9110」</strong>または <ruby>近<rt>ちか</rt></ruby>くの<ruby>警察署<rt>けいさつしょ</rt></ruby>・おうちの<ruby>人<rt>ひと</rt></ruby>へ すぐ<ruby>相談<rt>そうだん</rt></ruby>！
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
        <span class="ending-stat-value">${state.fooledCount}${kenUnit}</span>
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
        <ruby>大分県<rt>おおいたけん</rt></ruby>や <ruby>全国<rt>ぜんこく</rt></ruby>の <ruby>警察<rt>けいさつ</rt></ruby><ruby>統計<rt>とうけい</rt></ruby>から、<ruby>現実<rt>げんじつ</rt></ruby>の <ruby>詐欺<rt>さぎ</rt></ruby><ruby>被害<rt>ひがい</rt></ruby>のトレンドを <ruby>確認<rt>かくにん</rt></ruby>しよう。
      `;
    } else {
      commentEl.innerHTML = `
        1週間お疲れさまでした！<br>
        大分県や全国の警察統計から、現実の詐欺被害のトレンドを確認しましょう。
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
          if (typeof commitFinalSession === "function") commitFinalSession(null);
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

function buildOitaStatsHTML(isElem) {
  const statsData = (typeof OITA_SCAM_STATS !== "undefined") ? OITA_SCAM_STATS : null;
  if (!statsData) return "";

  let seniorNoticeHTML = "";
  if (state.mode === "senior") {
    seniorNoticeHTML = `
      <div class="stats-senior-notice-banner">
        <span class="senior-notice-icon">🔍</span>
        <div class="senior-notice-text">
          <strong class="senior-notice-head">【表示に関するご案内】</strong><br>
          <span class="senior-notice-body">※以下の詐欺被害データや統計の文字が小さい場合は、お使いの端末やブラウザの拡大機能（画面をピンチアウトするなど）で大きくしてご覧ください。</span>
        </div>
      </div>
    `;
  }

  const maxCases = 400;
  const trendRowsHTML = statsData.yearlyTrend.map(row => {
    const widthPct = Math.min(100, Math.round((row.cases / maxCases) * 100));
    const yearLabelTxt = isElem ? row.yearLabel.replace(/令和(\d+)年/, '令和<rt>れいわ</rt></ruby>$1<ruby>年<rt>ねん</rt></ruby>') : row.yearLabel;
    const amountTxt = isElem ? row.amountText.replace(/約(\d+)億([\d,]+)万円/, '約<rt>やく</rt></ruby>$1<ruby>億<rt>おく</rt></ruby>$2<ruby>万円<rt>まんえん</rt></ruby>') : row.amountText;
    const caseUnit = isElem ? "<ruby>件<rt>けん</rt></ruby>" : "件";
    return `
      <div class="oita-bar-row">
        <div class="oita-bar-meta">
          <span class="oita-bar-year">${yearLabelTxt}</span>
          <span class="oita-bar-numbers">${row.cases}${caseUnit} ／ ${amountTxt}</span>
        </div>
        <div class="oita-bar-track">
          <div class="oita-bar-fill" style="width: ${widthPct}%;"></div>
        </div>
        ${row.note ? `<p class="oita-summary-note">${row.note}</p>` : ""}
      </div>
    `;
  }).join("");

  const ageRowsHTML = statsData.ageBreakdown.map(row => {
    const widthPct = Math.min(100, Math.round((row.pct / 40) * 100));
    const lblTxt = isElem ? row.label.replace(/(\d+)歳代/, '$1<ruby>歳代<rt>さいだい</rt></ruby>').replace(/未満/, '<ruby>未満<rt>みまん</rt></ruby>').replace(/以上/, '<ruby>以上<rt>いじょう</rt></ruby>') : row.label;
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

  const maxContactCount = 4000;
  const contactRowsHTML = (statsData.contactMethods || []).map(row => {
    const widthPct = Math.min(100, Math.round((row.count / maxContactCount) * 100));
    const caseUnit = isElem ? "<ruby>件<rt>けん</rt></ruby>" : "件";
    let labelTxt = row.label;
    if (isElem) {
      labelTxt = labelTxt
        .replace("バナー等広告 (YouTube・投資サイト等)", "<ruby>広告<rt>こうこく</rt></ruby>・バナー（YouTube・<ruby>投資<rt>とうし</rt></ruby>サイトなど）")
        .replace("ダイレクトメッセージ (Instagram・LINE等)", "<ruby>連絡<rt>れんらく</rt></ruby>メッセージ（Instagram・LINEなど）");
    }
    return `
      <div class="oita-bar-row">
        <div class="oita-bar-meta">
          <span class="oita-bar-year">${labelTxt}</span>
          <span class="oita-bar-numbers">${row.count.toLocaleString()}${caseUnit}</span>
        </div>
        <div class="oita-bar-track">
          <div class="oita-bar-fill is-contact" style="width: ${widthPct}%;"></div>
        </div>
      </div>
    `;
  }).join("");

  const maxRankingCases = 16000;
  const rankingRowsHTML = (statsData.scamRanking || []).map(row => {
    const widthPct = Math.min(100, Math.round((row.cases / maxRankingCases) * 100));
    const caseUnit = isElem ? "<ruby>件<rt>けん</rt></ruby>" : "件";
    let nameTxt = row.name;
    if (isElem) {
      nameTxt = nameTxt
        .replace("オレオレ詐欺 (ニセ警察含む)", "<ruby>家族<rt>かぞく</rt></ruby>を<ruby>装<rt>よそお</rt></ruby>う・ニセ<ruby>警察<rt>けいさつ</rt></ruby><ruby>詐欺<rt>さぎ</rt></ruby>")
        .replace("架空料金請求詐欺", "<ruby>架空料金請求<rt>かくうりょうきんせいきゅう</rt></ruby><ruby>詐欺<rt>さぎ</rt></ruby>")
        .replace("還付金詐欺", "<ruby>還付金<rt>かんぷきん</rt></ruby><ruby>詐欺<rt>さぎ</rt></ruby>")
        .replace("預貯金詐欺", "<ruby>預貯金<rt>よちょきん</rt></ruby><ruby>詐欺<rt>さぎ</rt></ruby>")
        .replace("キャッシュカード詐欺盗", "キャッシュカード<ruby>盗<rt>ぬす</rt></ruby>み");
    }
    return `
      <div class="oita-bar-row">
        <div class="oita-bar-meta">
          <span class="oita-bar-year">${row.rank}. ${nameTxt}</span>
          <span class="oita-bar-numbers">${row.cases.toLocaleString()}${caseUnit}</span>
        </div>
        <div class="oita-bar-track">
          <div class="oita-bar-fill is-ranking" style="width: ${widthPct}%;"></div>
        </div>
      </div>
    `;
  }).join("");

  const prefRankingData = [
    { rank: 1, name: "東京都", cases: 7215 },
    { rank: 2, name: "大阪府", cases: 3102 },
    { rank: 3, name: "神奈川県", cases: 2410 },
    { rank: 4, name: "埼玉県", cases: 2198 },
    { rank: 5, name: "千葉県", cases: 1850 }
  ];

  const maxPrefCases = 8000;
  const prefRankingHTML = prefRankingData.map(row => {
    const widthPct = Math.min(100, Math.round((row.cases / maxPrefCases) * 100));
    const caseUnit = isElem ? "<ruby>件<rt>けん</rt></ruby>" : "件";
    let nameTxt = row.name;
    if (isElem) {
      nameTxt = nameTxt
        .replace("東京都", "<ruby>東京都<rt>とうきょうと</rt></ruby>")
        .replace("大阪府", "<ruby>大阪府<rt>おおさかふ</rt></ruby>")
        .replace("神奈川県", "<ruby>神奈川県<rt>かながわけん</rt></ruby>")
        .replace("埼玉県", "<ruby>埼玉県<rt>さいたまけん</rt></ruby>")
        .replace("千葉県", "<ruby>千葉県<rt>ちばけん</rt></ruby>");
    }
    return `
      <div class="oita-bar-row">
        <div class="oita-bar-meta">
          <span class="oita-bar-year">${row.rank}. ${nameTxt}</span>
          <span class="oita-bar-numbers">${row.cases.toLocaleString()}${caseUnit}</span>
        </div>
        <div class="oita-bar-track">
          <div class="oita-bar-fill is-pref-ranking" style="width: ${widthPct}%;"></div>
        </div>
      </div>
    `;
  }).join("");

  // 小学生モード時の太字見出し・解説文のルビ対応定義
  const h3Title = isElem ? "<ruby>日本<rt>にほん</rt></ruby>および<ruby>大分県<rt>おおいたけん</rt></ruby>における<ruby>特殊詐欺<rt>とくしゅさぎ</rt></ruby>・SNS<ruby>型<rt>がた</rt></ruby><ruby>詐欺<rt>さぎ</rt></ruby>の<ruby>現実<rt>げんじつ</rt></ruby>" : "日本および大分県における特殊詐欺・SNS型詐欺の現実";
  const h4Title3 = isElem ? "③ 【<ruby>全国<rt>ぜんこく</rt></ruby>】SNS<ruby>型投資<rt>がたとうし</rt></ruby>・ロマンス<ruby>詐欺<rt>さぎ</rt></ruby>の<ruby>主な当初接触手段<rt>おもなとうしょせっしゅくしゅだん</rt></ruby>（<ruby>令和<rt>れいわ</rt></ruby>7<ruby>年<rt>ねん</rt></ruby>）" : "③ 【全国】SNS型投資・ロマンス詐欺の主な当初接触手段（令和7年）";
  const h4Title4 = isElem ? "④ 【<ruby>注意<rt>ちゅうい</rt></ruby>】<ruby>実際<rt>じっさい</rt></ruby>の<ruby>詐欺<rt>さぎ</rt></ruby>でよく<ruby>使<rt>つか</rt></ruby>われる<ruby>危険<rt>きけん</rt></ruby>な<ruby>誘<rt>さそ</rt></ruby>い<ruby>文句<rt>もんく</rt></ruby>" : "④ 【注意】実際の詐欺でよく使われる危険な誘い文句";
  const h4Title5 = isElem ? "⑤ 【<ruby>全国<rt>ぜんこく</rt></ruby>】<ruby>特殊詐欺<rt>とくしゅさぎ</rt></ruby>の<ruby>手口別認知件数<rt>てぐちべつにんちけんすう</rt></ruby>ランキング TOP5（<ruby>令和<rt>れいわ</rt></ruby>7<ruby>年<rt>ねん</rt></ruby>）" : "⑤ 【全国】特殊詐欺の手口別認知件数ランキング TOP5（令和7年）";
  const h4Title6 = isElem ? "⑥ 【<ruby>全国<rt>ぜんこく</rt></ruby>】ニセ<ruby>警察<rt>けいさつ</rt></ruby><ruby>詐欺<rt>さぎ</rt></ruby>の<ruby>多発<rt>たはつ</rt></ruby>と「<ruby>闇<rt>やみ</rt></ruby>バイト」の<ruby>現実<rt>げんじつ</rt></ruby>" : "⑥ 【全国】ニセ警察詐欺の多発と「闇バイト」の現実";
  const h4Title7 = isElem ? "⑦ <ruby>詐欺<rt>さぎ</rt></ruby>に<ruby>遭<rt>あ</rt></ruby>いそうになったときの<ruby>対処方法<rt>たいしょほう</rt></ruby>" : "⑦ 詐欺に遭いそうになったときの対処方法";
  const h4Title8 = isElem ? "⑧ <ruby>詐欺<rt>さぎ</rt></ruby>に<ruby>関<rt>かん</rt></ruby>する<ruby>相談窓口<rt>そうだんまどぐち</rt></ruby>" : "⑧ 詐欺に関する相談窓口";
  const h4Title9 = isElem ? "⑨ 【<ruby>全国<rt>ぜんこく</rt></ruby>】<ruby>都道府県別<rt>とどうふけんべつ</rt></ruby>の<ruby>詐欺被害件数<rt>さぎひがいけんすう</rt></ruby>ランキング TOP5（<ruby>令和<rt>れいわ</rt></ruby>7<ruby>年<rt>ねん</rt></ruby>）" : "⑨ 【全国】都道府県別の詐欺被害件数ランキング TOP5（令和7年）";
  const h4Title10 = isElem ? "⑩ <ruby>公式統計<rt>こうしきとうけい</rt></ruby>データ・<ruby>出典一覧<rt>しゅってんいちらん</rt></ruby>" : "⑩ 公式統計データ・出典一覧";

  // 1枚目：警察庁推奨アプリブロックの小学生モード用完全ルビ対応定義
  const h4TitleApp = isElem
    ? "📱 <ruby>警察庁推奨<rt>けいさつちょうすいしょう</rt></ruby>の <ruby>特殊詐欺対策<rt>とくしゅさぎたいさく</rt></ruby>アプリの ご<ruby>案内<rt>あんない</rt></ruby>"
    : "📱 警察庁推奨の特殊詐欺対策アプリのご案内";
  const appLeadTxt = isElem
    ? "<ruby>怪<rt>あや</rt></ruby>しい<ruby>電話<rt>でんわ</rt></ruby>を <ruby>自動<rt>じどう</rt></ruby>でブロック・<ruby>警告<rt>けいこく</rt></ruby>してくれる <ruby>警察庁推奨<rt>けいさつちょうすいしょう</rt></ruby>の <ruby>詐欺対策<rt>さぎたいさく</rt></ruby>アプリです。"
    : "怪しい電話を自動でブロック・警告してくれる警察庁推奨の詐欺対策アプリです。";
  const appNameTxt = isElem
    ? "🛡️ <ruby>詐欺対策<rt>さぎたいさく</rt></ruby> by NTTタウンページ"
    : "🛡️ 詐欺対策 by NTTタウンページ";
  const appDescTxt = isElem
    ? "<ruby>迷惑電話<rt>めいわくでんわ</rt></ruby>・<ruby>特殊詐欺<rt>とくしゅさぎ</rt></ruby>の <ruby>疑<rt>うたが</rt></ruby>いがある <ruby>着信<rt>ちゃくしん</rt></ruby>を <ruby>自動<rt>じどう</rt></ruby>で <ruby>検知<rt>けんち</rt></ruby>し、<ruby>画面<rt>がめん</rt></ruby>に <ruby>警告<rt>けいこく</rt></ruby>を <ruby>表示<rt>ひょうじ</rt></ruby>して <ruby>防犯<rt>ぼうはん</rt></ruby>！"
    : "迷惑電話・特殊詐欺の疑いがある着信を自動で検知し、画面に警告を表示して防犯！";
  const appBtnTxt = isElem
    ? "📱 <ruby>警察庁公式<rt>けいさつちょうこうしき</rt></ruby>ページで アプリを <ruby>詳<rt>くわ</rt></ruby>しく<ruby>見<rt>み</rt></ruby>る ▶"
    : "📱 警察庁公式ページでアプリを詳しく見る ▶";
  const appSourceTxt = isElem
    ? "<ruby>出典<rt>しゅってん</rt></ruby>：<ruby>警察庁<rt>けいさつちょう</rt></ruby>・SOS47 <ruby>特殊詐欺対策<rt>とくしゅさぎたいさく</rt></ruby>ページ"
    : "出典：警察庁・SOS47 特殊詐欺対策ページ";

  // 警察アプリアイコン画像の取得
  const policeAppIconSrc = (typeof IMAGE_ASSETS !== "undefined" && IMAGE_ASSETS.icons && IMAGE_ASSETS.icons.policeApp)
    ? IMAGE_ASSETS.icons.policeApp
    : "resource/images/警察アプリ.png";

  if (isElem) {
    return `
      ${seniorNoticeHTML}
      <div class="oita-stats-panel">
        <div class="oita-stats-header">
          <span class="oita-stats-badge">📊 <ruby>警察庁<rt>けいさつちょう</rt></ruby>・<ruby>大分県警察<rt>おおいたけんけいさつ</rt></ruby> <ruby>公式統計<rt>こうしきとうけい</rt></ruby>データ</span>
          <h3 class="oita-stats-title">${h3Title}</h3>
        </div>

        <div class="oita-summary-cards">
          <div class="oita-summary-card">
            <span class="oita-summary-label"><ruby>令和<rt>れいわ</rt></ruby>7<ruby>年<rt>ねん</rt></ruby> <ruby>大分県内<rt>おおいたけんない</rt></ruby>の<ruby>総被害<rt>そうひがい</rt></ruby></span>
            <span class="oita-summary-val">747<ruby>件<rt>けん</rt></ruby> ／ <ruby>約<rt>やく</rt></ruby>23<ruby>億<rt>おく</rt></ruby>7,302<ruby>万円<rt>まんえん</rt></ruby></span>
            <p class="oita-summary-note"><ruby>従来<rt>じゅうらい</rt></ruby>の<ruby>特殊詐欺<rt>とくしゅさぎ</rt></ruby>とSNS<ruby>型<rt>がた</rt></ruby><ruby>投資<rt>とうし</rt></ruby>・ロマンス<ruby>詐欺<rt>さぎ</rt></ruby>の<ruby>合計<rt>ごうけい</rt></ruby>。</p>
          </div>
          <div class="oita-summary-card is-navy">
            <span class="oita-summary-label">65<ruby>歳未満<rt>さいみまん</rt></ruby>の<ruby>被害割合<rt>ひがいわりあい</rt></ruby>（<ruby>大分県<rt>おおいたけん</rt></ruby>）</span>
            <span class="oita-summary-val">62.4%</span>
            <p class="oita-summary-note"><ruby>高齢者<rt>こうれいしゃ</rt></ruby>だけでなく、20代〜50代など<ruby>現役<rt>げんえき</rt></ruby>・<ruby>若年世代<rt>じゃくねんせだい</rt></ruby>が<ruby>被害<rt>ひがい</rt></ruby>の6<ruby>割<rt>わり</rt></ruby>を<ruby>占<rt>し</rt></ruby>める。</p>
          </div>
          <div class="oita-summary-card is-purple">
            <span class="oita-summary-label">ニセ<ruby>警察<rt>けいさつ</rt></ruby><ruby>詐欺<rt>さぎ</rt></ruby>の<ruby>最多被害年代<rt>さいたひがいねんだい</rt></ruby>（<ruby>全国<rt>ぜんこく</rt></ruby>）</span>
            <span class="oita-summary-val">20<ruby>代<rt>だい</rt></ruby>・30<ruby>代<rt>だい</rt></ruby>（<ruby>計<rt>けい</rt></ruby>3,957<ruby>件<rt>けん</rt></ruby>）</span>
            <p class="oita-summary-note"><ruby>固定電話<rt>こていでんわ</rt></ruby>を<ruby>持<rt>も</rt></ruby>たない<ruby>若年層<rt>じゃくねんそう</rt></ruby>のスマホへ<ruby>直接<rt>ちょくせつ</rt></ruby><ruby>電話<rt>でんわ</rt></ruby>がかかり<ruby>被害<rt>ひがい</rt></ruby>が<ruby>集中<rt>しゅうちゅう</rt></ruby>。</p>
          </div>
        </div>

        <!-- ① 大分県推移 -->
        <div class="oita-chart-block">
          <h4 class="oita-chart-subtitle">① <ruby>大分県内<rt>おおいたけんない</rt></ruby>の<ruby>特殊詐欺<rt>とくしゅさぎ</rt></ruby> <ruby>被害件数<rt>ひがいけんすう</rt></ruby>・<ruby>被害額<rt>ひがいがく</rt></ruby>の<ruby>推移<rt>すいい</rt></ruby>（<ruby>令和<rt>れいわ</rt></ruby>3〜7<ruby>年<rt>ねん</rt></ruby>）</h4>
          <p class="oita-chart-caption">5<ruby>年間<rt>ねんかん</rt></ruby>で<ruby>大分県内<rt>おおいたけんない</rt></ruby>の<ruby>被害額<rt>ひがいがく</rt></ruby>は<ruby>約<rt>やく</rt></ruby>10.5<ruby>倍<rt>ばい</rt></ruby>に<ruby>急増<rt>きゅうぞう</rt></ruby>。</p>
          <div class="oita-bars-list">${trendRowsHTML}</div>
          <p class="oita-block-source"><ruby>出典<rt>しゅってん</rt></ruby>：<ruby>大分県警察<rt>おおいたけんけいさつ</rt></ruby>「<ruby>安全<rt>あんぜん</rt></ruby>・<ruby>安心<rt>あんしん</rt></ruby>まちづくり<ruby>推進室通信<rt>すいしんしつしん</rt></ruby>」</p>
        </div>

        <!-- ② 年代別割合 -->
        <div class="oita-chart-block">
          <h4 class="oita-chart-subtitle">② <ruby>大分県内<rt>おおいたけんない</rt></ruby>の<ruby>被害者年代別割合<rt>ひがいしゃねんだいべつわりあい</rt></ruby>（<ruby>令和<rt>れいわ</rt></ruby>8<ruby>年<rt>ねん</rt></ruby>9<ruby>月末<rt>がつまつ</rt></ruby> <ruby>暫定値<rt>ざんていち</rt></ruby>）</h4>
          <p class="oita-chart-caption"><ruby>若年層<rt>じゃくねんそう</rt></ruby>から<ruby>高齢者<rt>こうれいしゃ</rt></ruby>まで、<ruby>全世代<rt>ぜんせだい</rt></ruby>が<ruby>詐欺<rt>さぎ</rt></ruby>グループのターゲット。</p>
          <div class="oita-bars-list">${ageRowsHTML}</div>
          <p class="oita-block-source"><ruby>出典<rt>しゅってん</rt></ruby>：<ruby>大分県警察本部<rt>おおいたけんけいさつほんぶ</rt></ruby>「<ruby>大分県<rt>おおいたけん</rt></ruby>の<ruby>犯罪情勢<rt>はんざいじょうせい</rt></ruby>」</p>
        </div>

        <!-- ③ 接触手段 -->
        <div class="oita-chart-block">
          <h4 class="oita-chart-subtitle">${h4Title3}</h4>
          <p class="oita-chart-caption">ネット<ruby>広告<rt>こうこく</rt></ruby>やDMから<ruby>巧妙<rt>こうみょう</rt></ruby>に<ruby>誘導<rt>ゆうどう</rt></ruby>されるケースが<ruby>多数<rt>たすう</rt></ruby>。</p>
          <div class="oita-bars-list">${contactRowsHTML}</div>
          <p class="oita-block-source"><ruby>出典<rt>しゅってん</rt></ruby>：<ruby>警察庁<rt>けいさつちょう</rt></ruby>「<ruby>令和<rt>れいわ</rt></ruby>7<ruby>年<rt>ねん</rt></ruby>における<ruby>特殊詐欺等<rt>とくしゅさぎとう</rt></ruby>の<ruby>認知<rt>にんち</rt></ruby>・<ruby>検挙状況<rt>けんきょじょうきょう</rt></ruby>」</p>
        </div>

        <!-- ④ 危険な誘い文句 -->
        <div class="oita-chart-block">
          <h4 class="oita-chart-subtitle">${h4Title4}</h4>
          <p class="oita-chart-caption">以下のようなフレーズは詐欺でよく使われるため、特に注意が必要です。</p>
          <div class="stats-warning-cards-grid">
            <div class="stats-warn-card">
              <strong>「<ruby>絶対儲<rt>ぜったいもう</rt></ruby>かる」「<ruby>元本保証<rt>がんぽんほしょう</rt></ruby>」</strong>
              <p><ruby>投資<rt>とうし</rt></ruby>に「<ruby>絶対<rt>ぜったい</rt></ruby>」はない。</p>
            </div>
            <div class="stats-warn-card">
              <strong><ruby>著名人<rt>ちょめいじん</rt></ruby>を<ruby>利用<rt>りよう</rt></ruby>した<ruby>投資広告<rt>とうしこうこく</rt></ruby></strong>
              <p><ruby>有名人<rt>ゆうめいじん</rt></ruby>の<ruby>画像<rt>がぞう</rt></ruby>を使った<ruby>偽広告<rt>にせこうこく</rt></ruby>に<ruby>注意<rt>ちゅうい</rt></ruby>。</p>
            </div>
            <div class="stats-warn-card">
              <strong>「<ruby>今日中<rt>きょうじゅう</rt></ruby>に<ruby>振<rt>ふ</rt></ruby>り<ruby>込<rt>こ</rt></ruby>まないと<ruby>逮捕<rt>たいほ</rt></ruby>」</strong>
              <p>警察官が捜査名目でSNSや電話を使い、金銭の振り込みを要求することはありません。</p>
            </div>
          </div>
          <p class="oita-block-source"><ruby>出典<rt>しゅってん</rt></ruby>：<ruby>警察庁<rt>けいさつちょう</rt></ruby>・<ruby>金融庁<rt>きんゆうちょう</rt></ruby></p>
        </div>

        <!-- ⑤ 手口別ランキング -->
        <div class="oita-chart-block">
          <h4 class="oita-chart-subtitle">${h4Title5}</h4>
          <p class="oita-chart-caption"><ruby>全国<rt>ぜんこく</rt></ruby>で<ruby>多<rt>おお</rt></ruby>く<ruby>発生<rt>はっせい</rt></ruby>している<ruby>手口<rt>てぐち</rt></ruby>の<ruby>上位<rt>じょうい</rt></ruby>5<ruby>選<rt>せん</rt></ruby>。</p>
          <div class="oita-bars-list">${rankingRowsHTML}</div>
          <p class="oita-block-source"><ruby>出典<rt>しゅってん</rt></ruby>：<ruby>警察庁<rt>けいさつちょう</rt></ruby>「<ruby>令和<rt>れいわ</rt></ruby>7<ruby>年<rt>ねん</rt></ruby>における<ruby>特殊詐欺等<rt>とくしゅさぎとう</rt></ruby>の<ruby>認知<rt>にんち</rt></ruby>・<ruby>検挙状況<rt>けんきょじょうきょう</rt></ruby>」</p>
        </div>

        <!-- ⑥ ニセ警察詐欺と闇バイト -->
        <div class="oita-chart-block is-youth-block">
          <h4 class="oita-chart-subtitle">${h4Title6}</h4>
          <p class="oita-chart-caption">
            「<ruby>警察<rt>けいさつ</rt></ruby>」を<ruby>騙<rt>だま</rt></ruby>す<ruby>詐欺<rt>さぎ</rt></ruby>は20〜30<ruby>代<rt>だい</rt></ruby>が<ruby>最多</ruby>。また<ruby>闇<rt>やみ</rt></ruby>バイトで<ruby>逮捕<rt>たいほ</rt></ruby>された<ruby>人<rt>ひと</rt></ruby>の<ruby>約<rt>やく</rt></ruby>6<ruby>割<rt>わり</rt></ruby>が10〜20<ruby>代<rt>だい</rt></ruby>の<ruby>若年層<rt>じゃくねんそう</rt></ruby>。
          </p>
          <div class="oita-sub-note is-purple-note">
            💡 <strong><ruby>重要<rt>じゅうよう</rt></ruby>：</strong> 「<ruby>荷物<rt>にもつ</rt></ruby>を<ruby>運<rt>はこ</rt></ruby>ぶだけ」のアルバイトは<ruby>犯罪<rt>はんざい</rt></ruby>の<ruby>実行役<rt>じっこうやく</rt></ruby>！
          </div>
          <p class="oita-block-source"><ruby>出典<rt>しゅってん</rt></ruby>：<ruby>警察庁<rt>けいさつちょう</rt></ruby></p>
        </div>

        <!-- ⑦ 対処方法 -->
        <div class="oita-chart-block">
          <h4 class="oita-chart-subtitle">${h4Title7}</h4>
          <p class="oita-chart-caption"><ruby>詐欺<rt>さぎ</rt></ruby>に<ruby>遭<rt>あ</rt></ruby>いそうになったとき、あるいは<ruby>遭<rt>あ</rt></ruby>ってしまったときの<ruby>対処法<rt>たいしょほう</rt></ruby>。</p>
          <div class="stats-warning-cards-grid">
            <div class="stats-warn-card">
              <strong>1. <ruby>怪<rt>あや</rt></ruby>しい<ruby>電話<rt>でんわ</rt></ruby>・DMへの<ruby>対応<rt>たいおう</rt></ruby></strong>
              <p>すぐ電話を切る、またはリンクを開かずにブロック・削除する。</p>
            </div>
            <div class="stats-warn-card">
              <strong>2. <ruby>金銭<rt>きんせん</rt></ruby>を<ruby>払<rt>はら</rt></ruby>う<ruby>前<rt>まえ</rt></ruby>の<ruby>確認<rt>かくにん</rt></ruby></strong>
              <p>家族や友人、または警察（#9110）に必ず相談してから動く。</p>
            </div>
            <div class="stats-warn-card">
              <strong>3. <ruby>情報<rt>じょうほう</rt></ruby>を<ruby>教<rt>おし</rt></ruby>えてしまったら</strong>
              <p>すぐに金融機関や警察へ連絡し、口座の停止やカードの利用を止める。</p>
            </div>
          </div>
          <p class="oita-block-source"><ruby>出典<rt>しゅってん</rt></ruby>：<ruby>警察庁<rt>けいさつちょう</rt></ruby>・<ruby>消費者庁<rt>しょうひしゃちょう</rt></ruby></p>
        </div>

        <!-- ⑧ 相談窓口 -->
        <div class="oita-chart-block">
          <h4 class="oita-chart-subtitle">${h4Title8}</h4>
          <p class="oita-chart-caption"><ruby>困<rt>こま</rt></ruby>ったときに<ruby>連絡<rt>れんらく</rt></ruby>できる<ruby>公的窓口<rt>こうてきまどぐち</rt></ruby>。</p>
          <div class="stats-warning-cards-grid">
            <div class="stats-warn-card">
              <strong>🚨 <ruby>警察相談専用電話<rt>けいさつそうだんせんようんでんわ</rt></ruby> 「#9110」</strong>
              <p>事件前のお金の相談や不審な電話の問い合わせに。</p>
            </div>
            <div class="stats-warn-card">
              <strong>📞 <ruby>消費者<rt>しょうひしゃ</rt></ruby>ホットライン 「188」</strong>
              <p>悪質商法や架空請求、契約トラブルの相談に。</p>
            </div>
            <div class="stats-warn-card">
              <strong>☎️ <ruby>緊急時<rt>きんきゅうじ</rt></ruby>の 「110番」</strong>
              <p>今まさに被害に遭っている、犯人が近くにいる場合の緊急通報に。</p>
            </div>
          </div>
          <p class="oita-block-source"><ruby>出典<rt>しゅってん</rt></ruby>：<ruby>警察庁<rt>けいさつちょう</rt></ruby>・<ruby>国民生活センター<rt>こくみんせいかつせんたー</rt></ruby></p>
        </div>

        <!-- ⑨ 都道府県別ランキング TOP5 -->
        <div class="oita-chart-block">
          <h4 class="oita-chart-subtitle">${h4Title9}</h4>
          <p class="oita-chart-caption"><ruby>全国<rt>ぜんこく</rt></ruby>で<ruby>特殊詐欺<rt>とくしゅさぎ</rt></ruby>の<ruby>被害<rt>ひがい</rt></ruby>が<ruby>多<rt>おお</rt></ruby>い<ruby>上位<rt>じょうい</rt></ruby>5<ruby>都府県<rt>とふけん</rt></ruby>と<ruby>大分県<rt>おおいたけん</rt></ruby>の<ruby>状況<rt>じょうこう</rt></ruby>。</p>
          <div class="oita-bars-list">${prefRankingHTML}</div>
          <div class="oita-sub-note is-purple-note" style="margin-top:10px;">
            📍 <strong><ruby>大分県<rt>おおいたけん</rt></ruby>の<ruby>順位<rt>じゅんい</rt></ruby>：</strong> <ruby>全国<rt>ぜんこく</rt></ruby><strong>35位<rt>い</rt></ruby><ruby>前後<rt>ぜんご</rt></ruby></strong>（47都道府県中・<ruby>認知<rt>にんち</rt></ruby>400<ruby>件<rt>けん</rt></ruby>）
          </div>
          <p class="oita-block-source"><ruby>出典<rt>しゅってん</rt></ruby>：<ruby>警察庁<rt>けいさつちょう</rt></ruby>「<ruby>令和<rt>れいわ</rt></ruby>7<ruby>年<rt>ねん</rt></ruby>における<ruby>特殊詐欺等<rt>とくしゅさぎとう</rt></ruby>の<ruby>認知<rt>にんち</rt></ruby>・<ruby>検挙状況<rt>けんきょじょうきょう</rt></ruby>」</p>
        </div>

        <!-- 📱 警察庁推奨アプリ紹介ブロック（小学生モード完全ふりがな対応） -->
        <div class="oita-chart-block" style="border: 2.5px solid #2E9E82; background: #EAF8F4;">
          <h4 class="oita-chart-subtitle" style="border-left-color: #2E9E82; color: #16654E;">${h4TitleApp}</h4>
          <p class="oita-chart-caption">${appLeadTxt}</p>
          
          <div class="police-app-showcase-card">
            <div class="police-app-icon-wrap">
              <img src="${policeAppIconSrc}" alt="詐欺対策アプリ" class="police-app-icon-img" onerror="this.style.display='none';">
            </div>
            <div class="police-app-info-wrap">
              <strong class="police-app-name">${appNameTxt}</strong>
              <p class="police-app-desc">${appDescTxt}</p>
            </div>
          </div>

          <div style="margin-top: 12px; text-align: center;">
            <a href="https://www.npa.go.jp/bureau/safetylife/sos47/apps/" target="_blank" rel="noopener" class="btn btn-primary" style="display: inline-block; width: auto; padding: 11px 24px; font-size: 14.5px; background: #2E9E82; border-radius: 999px;">
              ${appBtnTxt}
            </a>
          </div>
          <p class="oita-block-source" style="margin-top: 8px;">${appSourceTxt}</p>
        </div>

        <!-- ⑩ 公式統計データ・出典一覧 -->
        <div class="oita-chart-block">
          <h4 class="oita-chart-subtitle">${h4Title10}</h4>
          <ul class="stats-sources-list">
            <li><ruby>警察庁<rt>けいさつちょう</rt></ruby>：<a href="https://www.npa.go.jp/" target="_blank" rel="noopener"><ruby>特殊詐欺等<rt>とくしゅさぎとう</rt></ruby>の<ruby>認知<rt>にんち</rt></ruby>・<ruby>検挙状況<rt>けんきょじょうきょう</rt></ruby>（<ruby>令和<rt>れいわ</rt></ruby>7<ruby>年<rt>ねん</rt></ruby><ruby>確定値<rt>かくていち</rt></ruby>）</a></li>
            <li><ruby>大分県警察<rt>おおいたけんけいさつ</rt></ruby>：<a href="https://www.pref.oita.jp/site/oitakenkei/" target="_blank" rel="noopener"><ruby>大分県<rt>おおいたけん</rt></ruby>の<ruby>犯罪情勢<rt>はんざいじょうせい</rt></ruby>・<ruby>安全<rt>あんぜん</rt></ruby>・<ruby>安心<rt>あんしん</rt></ruby>まちづくり<ruby>推進室通信<rt>すいしんしつしん</rt></ruby></a></li>
            <li><ruby>金融庁<rt>きんゆうちょう</rt></ruby>：<a href="https://www.fsa.go.jp/" target="_blank" rel="noopener"><ruby>投資詐欺<rt>とうしさぎ</rt></ruby>に<ruby>関<rt>かん</rt></ruby>する<ruby>注意喚起<rt>ちゅういかんき</rt></ruby>資料</a></li>
            <li><ruby>国民生活センター<rt>こくみんせいかつせんたー</rt></ruby>：<a href="https://www.kokusen.go.jp/" target="_blank" rel="noopener"><ruby>消費者<rt>しょうひしゃ</rt></ruby>ホットライン188</a></li>
            <li><ruby>警察庁SOS47<rt>けいさつちょうえすおーえす47</rt></ruby>：<a href="https://www.npa.go.jp/bureau/safetylife/sos47/apps/" target="_blank" rel="noopener"><ruby>警察庁推奨<rt>けいさつちょうすいしょう</rt></ruby>アプリページ</a></li>
          </ul>
        </div>
      </div>
    `;
  }

  return `
    ${seniorNoticeHTML}
    <div class="oita-stats-panel">
      <div class="oita-stats-header">
        <span class="oita-stats-badge">📊 警察庁・大分県警察 公式統計データ</span>
        <h3 class="oita-stats-title">日本および大分県における特殊詐欺・SNS型詐欺の現実</h3>
      </div>

      <div class="oita-summary-cards">
        <div class="oita-summary-card">
          <span class="oita-summary-label">令和7年 大分県内の総被害</span>
          <span class="oita-summary-val">747件 ／ 約23億7,302万円</span>
          <p class="oita-summary-note">従来の特殊詐欺（400件・約8.6億円）とSNS型投資・ロマンス詐欺（347件・約15.1億円）の合計。</p>
        </div>
        <div class="oita-summary-card is-navy">
          <span class="oita-summary-label">65歳未満の被害割合（大分県）</span>
          <span class="oita-summary-val">62.4%</span>
          <p class="oita-summary-note">高齢者だけでなく、20代〜50代など現役・若年世代が被害の6割以上を占める。</p>
        </div>
        <div class="oita-summary-card is-purple">
          <span class="oita-summary-label">ニセ警察詐欺の最多被害年代（全国）</span>
          <span class="oita-summary-val">20代・30代（計3,957件）</span>
          <p class="oita-summary-note">固定電話を持たない若年層のスマホへ直接電話がかかり被害が集中。</p>
        </div>
      </div>

      <!-- ブロック1: 大分県推移 -->
      <div class="oita-chart-block">
        <h4 class="oita-chart-subtitle">① 大分県内の特殊詐欺 被害件数・被害額の推移（令和3年〜7年）</h4>
        <p class="oita-chart-caption">5年間で大分県内の特殊詐欺被害額は約10.5倍に急増。</p>
        <div class="oita-bars-list">${trendRowsHTML}</div>
        <p class="oita-block-source">出典：大分県警察「安全・安心まちづくり推進室通信」・宇佐市「特殊詐欺発生状況」</p>
      </div>

      <!-- ブロック2: 大分県年代別割合 -->
      <div class="oita-chart-block">
        <h4 class="oita-chart-subtitle">② 大分県内の被害者年代別割合（令和8年9月末 暫定値）</h4>
        <p class="oita-chart-caption">若年層から高齢者まで、全世代が詐欺グループのターゲット。</p>
        <div class="oita-bars-list">${ageRowsHTML}</div>
        <p class="oita-block-source">出典：大分県警察本部「大分県の犯罪情勢」</p>
      </div>

      <!-- ブロック3: 接触手段（グラフ付き） -->
      <div class="oita-chart-block">
        <h4 class="oita-chart-subtitle">③ 【全国】SNS型投資・ロマンス詐欺の主な当初接触手段（令和7年）</h4>
        <p class="oita-chart-caption">ネット広告やダイレクトメッセージから巧妙に誘導されるケースが多数。</p>
        <div class="oita-bars-list">${contactRowsHTML}</div>
        <p class="oita-block-source">出典：警察庁「令和7年における特殊詐欺及びSNS型投資・ロマンス詐欺の認知・検挙状況等について（確定値）」</p>
      </div>

      <!-- ブロック4: 詐欺広告・誘い文句の特徴（表現改善版） -->
      <div class="oita-chart-block">
        <h4 class="oita-chart-subtitle">④ 【注意】実際の詐欺でよく使われる危険な誘い文句</h4>
        <p class="oita-chart-caption">以下のようなフレーズは詐欺でよく使われるため、特に注意が必要です。</p>
        <div class="stats-warning-cards-grid">
          <div class="stats-warn-card">
            <strong>「絶対儲かる」「元本保証」</strong>
            <p>投資に「絶対」はありません。金融庁に未登録の業者による勧誘は詐欺です。</p>
          </div>
          <div class="stats-warn-card">
            <strong>著名人を利用した投資広告</strong>
            <p>有名人の画像を無断使用した偽広告からLINEグループへ誘導する手口が急増中。</p>
          </div>
          <div class="stats-warn-card">
            <strong>「今日中に振り込まないと逮捕」</strong>
            <p>警察官が捜査名目でSNSや電話を使い、金銭の振り込みを要求することはありません。</p>
          </div>
        </div>
        <p class="oita-block-source">出典：警察庁・金融庁 注意喚起資料</p>
      </div>

      <!-- ブロック5: 特殊詐欺種類別ランキング TOP5（グラフ付き） -->
      <div class="oita-chart-block">
        <h4 class="oita-chart-subtitle">⑤ 【全国】特殊詐欺の手口別認知件数ランキング TOP5（令和7年）</h4>
        <p class="oita-chart-caption">全国で最も多く発生している特殊詐欺の手口上位5選。</p>
        <div class="oita-bars-list">${rankingRowsHTML}</div>
        <p class="oita-block-source">出典：警察庁「令和7年における特殊詐欺及びSNS型投資・ロマンス詐欺の認知・検挙状況等について（確定値）」</p>
      </div>

      <!-- ブロック6: ニセ警察詐欺＆闇バイト -->
      <div class="oita-chart-block is-youth-block">
        <h4 class="oita-chart-subtitle">⑥ 【全国】ニセ警察詐欺の多発と「闇バイト」の現実</h4>
        <p class="oita-chart-caption">
          「警察」を騙る詐欺は30代・20代が最多。また闇バイトで逮捕された人の約6割が10代・20代の若年層です。
        </p>
        <div class="oita-sub-note is-purple-note">
          💡 <strong>ポイント:</strong> 「荷物を運ぶだけ」「口座を貸すだけ」のアルバイトは特殊詐欺の実行役です。一度個人情報を渡すと脅迫されて抜け出せなくなります！
        </div>
        <p class="oita-block-source">出典：警察庁「令和7年における特殊詐欺等の認知・検挙状況等」</p>
      </div>

      <!-- ⑦ 対処方法 -->
      <div class="oita-chart-block">
        <h4 class="oita-chart-subtitle">⑦ 詐欺に遭いそうになったときの対処方法</h4>
        <p class="oita-chart-caption">詐欺に遭いそうになったとき、あるいは遭ってしまったときの対処法。</p>
        <div class="stats-warning-cards-grid">
          <div class="stats-warn-card">
            <strong>1. 怪しい電話・DMへの対応</strong>
            <p>すぐ電話を切る、またはリンクを開かずにブロック・削除する。</p>
          </div>
          <div class="stats-warn-card">
            <strong>2. 金銭を払う前の確認</strong>
            <p>家族や友人、または警察（#9110）に必ず相談してから動く。</p>
          </div>
          <div class="stats-warn-card">
            <strong>3. 情報を教えてしまったら</strong>
            <p>すぐに金融機関や警察へ連絡し、口座の停止やカードの利用を止める。</p>
          </div>
        </div>
        <p class="oita-block-source">出典：警察庁・消費者庁</p>
      </div>

      <!-- ⑧ 相談窓口 -->
      <div class="oita-chart-block">
        <h4 class="oita-chart-subtitle">⑧ 詐欺に関する相談窓口</h4>
        <p class="oita-chart-caption">困ったときに連絡できる公的窓口。</p>
        <div class="stats-warning-cards-grid">
          <div class="stats-warn-card">
            <strong>🚨 警察相談専用電話 「#9110」</strong>
            <p>事件前のお金の相談や不審な電話の問い合わせに。</p>
          </div>
          <div class="stats-warn-card">
            <strong>📞 消費者ホットライン 「188」</strong>
            <p>悪質商法や架空請求、契約トラブルの相談に。</p>
          </div>
          <div class="stats-warn-card">
            <strong>☎️ 緊急時の 「110番」</strong>
            <p>今まさに被害に遭っている、犯人が近くにいる場合の緊急通報に。</p>
          </div>
        </div>
        <p class="oita-block-source">出典：警察庁・国民生活センター</p>
      </div>

      <!-- ⑨ 都道府県別ランキング TOP5 -->
      <div class="oita-chart-block">
        <h4 class="oita-chart-subtitle">⑨ 【全国】都道府県別の詐欺被害件数ランキング TOP5（令和7年）</h4>
        <p class="oita-chart-caption">全国で特殊詐欺の被害が多い上位5都府県と大分県の状況。</p>
        <div class="oita-bars-list">${prefRankingHTML}</div>
        <div class="oita-sub-note is-purple-note" style="margin-top:10px;">
          📍 <strong>大分県の順位：</strong> 全国<strong>35位前後</strong>（47都道府県中・認知400件）
        </div>
        <p class="oita-block-source">出典：警察庁「令和7年における特殊詐欺及びSNS型投資・ロマンス詐欺の認知・検挙状況等について（確定値）」</p>
      </div>

      <!-- 📱 警察庁推奨アプリ紹介ブロック（画像アイコン組み込み） -->
      <div class="oita-chart-block" style="border: 2.5px solid #2E9E82; background: #EAF8F4;">
        <h4 class="oita-chart-subtitle" style="border-left-color: #2E9E82; color: #16654E;">📱 警察庁推奨の特殊詐欺対策アプリのご案内</h4>
        <p class="oita-chart-caption">怪しい電話を自動でブロック・警告してくれる警察庁推奨の詐欺対策アプリです。</p>
        
        <div class="police-app-showcase-card">
          <div class="police-app-icon-wrap">
            <img src="${policeAppIconSrc}" alt="詐欺対策アプリ" class="police-app-icon-img" onerror="this.style.display='none';">
          </div>
          <div class="police-app-info-wrap">
            <strong class="police-app-name">🛡️ 詐欺対策 by NTTタウンページ</strong>
            <p class="police-app-desc">迷惑電話・特殊詐欺の疑いがある着信を自動で検知し、画面に警告を表示して防犯！</p>
          </div>
        </div>

        <div style="margin-top: 12px; text-align: center;">
          <a href="https://www.npa.go.jp/bureau/safetylife/sos47/apps/" target="_blank" rel="noopener" class="btn btn-primary" style="display: inline-block; width: auto; padding: 11px 24px; font-size: 14.5px; background: #2E9E82; border-radius: 999px;">
            📱 警察庁公式ページでアプリを詳しく見る ▶
          </a>
        </div>
        <p class="oita-block-source" style="margin-top: 8px;">出典：警察庁・SOS47 特殊詐欺対策ページ</p>
      </div>

      <!-- ⑩ 公式統計データ・出典一覧 -->
      <div class="oita-chart-block">
        <h4 class="oita-chart-subtitle">⑩ 公式統計データ・出典一覧</h4>
        <ul class="stats-sources-list">
          <li>警察庁：<a href="https://www.npa.go.jp/" target="_blank" rel="noopener">「令和7年における特殊詐欺及びSNS型投資・ロマンス詐欺の認知・検挙状況等について（令和7年確定値）」</a></li>
          <li>大分県警察：<a href="https://www.pref.oita.jp/site/oitakenkei/" target="_blank" rel="noopener">「大分県の犯罪情勢」・安全・安心まちづくり推進室通信</a></li>
          <li>金融庁：<a href="https://www.fsa.go.jp/" target="_blank" rel="noopener">投資詐欺に関する注意喚起資料</a></li>
          <li>国民生活センター：<a href="https://www.kokusen.go.jp/" target="_blank" rel="noopener">消費者ホットライン188</a></li>
          <li>警察庁SOS47：<a href="https://www.npa.go.jp/bureau/safetylife/sos47/apps/" target="_blank" rel="noopener">警察庁推奨アプリページ</a></li>
        </ul>
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