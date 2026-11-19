/* =========================================================
   setup.js
   ゲーム準備・揺れ設定連携・モード選択・名前入力・ルール画面・欲しい物選択・あらすじ
   （ルール画面新設・小学生総ルビ・XSSエスケープ対応版）
   ========================================================= */

// ① 「はじめる」クリックで「表示デザイン選択画面」へ
function handleStartClick() {
  state.isTestMode = false;
  const badge = document.getElementById("test-mode-badge");
  const drawer = document.getElementById("test-controller-drawer");
  if (badge) badge.classList.add("is-hidden");
  if (drawer) drawer.classList.add("is-hidden");

  showScreen("screen-device-select");
}

// ①.05 表示デザイン選択処理 ➜ 「画面の揺れ・点滅設定画面」へ進む
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

  if (typeof applyMotionPreference === "function") {
    applyMotionPreference(state.reduceMotion);
  }
  showScreen("screen-motion-setting");
}

// ①.08 揺れ・点滅設定完了 ➜ 「モード選択画面」へ進む
function handleMotionSettingNext() {
  showScreen("screen-mode-select");
}

// ①.1 モード選択処理（4モード）
// ※中高生モード（"teen"）選択時のみ、初回か確認する画面（screen-experience-select）へ分岐
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

  if (typeof applyModeTextsUI === "function") {
    applyModeTextsUI();
  }

  if (selectedMode === "teen") {
    showScreen("screen-experience-select");
  } else {
    proceedAfterModeSelection(selectedMode);
  }
}

// ①.15 【中高生モード専用】プレイ経験選択処理
function handleSelectExperience(hasPlayed) {
  state.hasPlayedBefore = Boolean(hasPlayed);
  proceedAfterModeSelection(state.mode);
}

// モード選択完了後の共通進行分岐
function proceedAfterModeSelection(selectedMode) {
  if (selectedMode === "senior") {
    state.playerName = "あなた";
    state.selectedItem = null;
    showJoeIntro(startSeniorWeek);
  } else if (selectedMode === "adult") {
    state.playerName = "あなた";
    state.selectedItem = null;
    showJoeIntro(startAdultWeek);
  } else {
    openNameInput();
  }
}

// ①.2 名前入力画面の初期化・表示
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

  showJoeIntro(showRulesScreen);
}

function handleNameSkip() {
  const errorEl = document.getElementById("name-input-error");
  if (errorEl) errorEl.classList.add("is-hidden");

  state.playerName = "あなた";
  showJoeIntro(showRulesScreen);
}

// ①.8 ルール説明画面（小学生・中高生モード専用：目標選択画面の直前に表示）
function showRulesScreen() {
  const guideImg = document.getElementById("rules-guide-image");
  setJoeExpression("happy");
  setImageSafely(guideImg, getJoeImage("happy"));
  applyCharacterBlend(guideImg, getJoeImage("happy"));

  const bodyEl = document.getElementById("rules-card-body");
  if (bodyEl) {
    if (state.mode === "elementary") {
      bodyEl.innerHTML = `
        <h2 class="rules-card-title">📖 ゲームの ルール</h2>
        <div class="rules-list">
          <div class="rule-item">
            <span class="rule-item-head">💰 <ruby>最初<rt>さいしょ</rt></ruby>の おこづかいは 50,000<ruby>円<rt>えん</rt></ruby>！</span>
            <ruby>欲<rt>ほ</rt></ruby>しいものを ひとつ <ruby>目標<rt>もくひょう</rt></ruby>に <ruby>選<rt>えら</rt></ruby>んで、<ruby>日曜日<rt>にちようび</rt></ruby>に <ruby>買<rt>か</rt></ruby>えるように お<ruby>金<rt>かね</rt></ruby>を <ruby>守<rt>まも</rt></ruby>りぬこう！
          </div>
          <div class="rule-item">
            <span class="rule-item-head">🛡️ <ruby>詐欺<rt>さぎ</rt></ruby>（うそ）に <ruby>気<rt>き</rt></ruby>をつけよう！</span>
            あやしい メールや <ruby>誘<rt>さそ</rt></ruby>いに <ruby>騙<rt>だま</rt></ruby>されると、おこづかいが <ruby>減<rt>へ</rt></ruby>ってしまうよ。<ruby>正<rt>ただ</rt></ruby>しい <ruby>行動<rt>こうどう</rt></ruby>を <ruby>選<rt>えら</rt></ruby>ぼう！
          </div>
          <div class="rule-item rule-highlight-bonus">
            <span class="rule-item-head">✨ <ruby>困<rt>こま</rt></ruby>っている<ruby>人<rt>ひと</rt></ruby>を <ruby>助<rt>たす</rt></ruby>けると ＋300<ruby>円<rt>えん</rt></ruby>！</span>
            <ruby>街<rt>まち</rt></ruby>や おうちで <ruby>困<rt>こま</rt></ruby>っている<ruby>人<rt>ひと</rt></ruby>を <ruby>助<rt>たす</rt></ruby>けると、お<ruby>礼<rt>れい</rt></ruby>で お<ruby>金<rt>かね</rt></ruby>が <strong>300<ruby>円<rt>えん</rt></ruby> <ruby>増<rt>ふ</rt></ruby>える</strong>ことがあるよ！<br>
            <ruby>大切<rt>たいせつ</rt></ruby>な チャンスになるかも…！？
          </div>
        </div>
      `;
    } else {
      bodyEl.innerHTML = `
        <h2 class="rules-card-title">📖 ゲームのルール</h2>
        <div class="rules-list">
          <div class="rule-item">
            <span class="rule-item-head">💰 最初のお小遣いは 50,000円！</span>
            欲しいアイテムを1つ目標に選び、日曜日に買えるように1週間お金を守り抜こう！
          </div>
          <div class="rule-item">
            <span class="rule-item-head">🛡️ 詐欺やトラブルを見抜こう！</span>
            怪しいDMや偽通知に騙されると所持金が減ってしまう。落ち着いて正しい対応を選ぼう！
          </div>
          <div class="rule-item rule-highlight-bonus">
            <span class="rule-item-head">✨ 困っている人を助けると ＋300円！</span>
            街中や家庭で困っている人を助けると、お礼で所持金が <strong>300円増える</strong>ことがあるよ！<br>
            目標達成のカギになるかも…！？
          </div>
        </div>
      `;
    }
  }

  showScreen("screen-rules");
}

const ITEM_DIFFICULTY_GROUPS = [
  {
    key: "初級",
    icon: "🟢",
    label: "初級",
    rubyLabel: "<ruby>初級<rt>しょきゅう</rt></ruby>",
    desc: "比較的達成しやすい目標",
    rubyDesc: "お<ruby>金<rt>かね</rt></ruby>を <ruby>守<rt>まも</rt></ruby>りやすい <ruby>目標<rt>もくひょう</rt></ruby>",
    class: "group-beginner"
  },
  {
    key: "普通",
    icon: "🔵",
    label: "普通",
    rubyLabel: "<ruby>普通<rt>ふつう</rt></ruby>",
    desc: "少し頑張れば狙える目標",
    rubyDesc: "<ruby>少<rt>すこ</rt></ruby>し <ruby>頑張<rt>がんば</rt></ruby>れば <ruby>狙<rt>ねら</rt></ruby>える <ruby>目標<rt>もくひょう</rt></ruby>",
    class: "group-normal"
  },
  {
    key: "上級",
    icon: "🟣",
    label: "上級",
    rubyLabel: "<ruby>上級<rt>じょうきゅう</rt></ruby>",
    desc: "かなりお金を守る必要がある目標",
    rubyDesc: "しっかり お<ruby>金<rt>かね</rt></ruby>を <ruby>守<rt>まも</rt></ruby>る <ruby>必要<rt>ひつよう</rt></ruby>がある <ruby>目標<rt>もくひょう</rt></ruby>",
    class: "group-advanced"
  },
  {
    key: "MAX",
    icon: "🔴",
    label: "MAX",
    rubyLabel: "MAX",
    desc: "最高難易度",
    rubyDesc: "<ruby>最高<rt>さいこう</rt></ruby>レベル",
    class: "group-max"
  }
];

function goToItemSelect() {
  document.getElementById("status-bar").classList.add("hidden");
  const container = document.getElementById("item-list");
  container.innerHTML = "";

  const isElem = state.mode === "elementary";

  ITEM_DIFFICULTY_GROUPS.forEach(groupDef => {
    const groupItems = ITEMS.filter(item => item.group === groupDef.key);
    if (groupItems.length === 0) return;

    const sectionEl = document.createElement("div");
    sectionEl.className = `item-group-section ${groupDef.class}`;

    const headerEl = document.createElement("div");
    headerEl.className = "item-group-header";
    headerEl.innerHTML = `
      <div class="item-group-title-row">
        <span class="item-group-badge">${groupDef.icon} ${isElem ? groupDef.rubyLabel : groupDef.label}</span>
      </div>
      <p class="item-group-desc">${isElem ? groupDef.rubyDesc : groupDef.desc}</p>
    `;
    sectionEl.appendChild(headerEl);

    const gridEl = document.createElement("div");
    gridEl.className = "item-grid";

    groupItems.forEach((item) => {
      const card = document.createElement("button");
      card.className = "item-card";
      card.type = "button";
      const displayName = (isElem && item.rubyName) ? item.rubyName : item.name;
      const priceText = isElem
        ? `${item.price.toLocaleString("ja-JP")}<ruby>円<rt>えん</rt></ruby>`
        : `¥${item.price.toLocaleString("ja-JP")}`;

      card.innerHTML = `
        ${itemVisualHTML(item, "item-photo")}
        <span class="item-name">${displayName}</span>
        <span class="item-price">${priceText}</span>
      `;
      card.addEventListener("click", () => startWeek(item));
      gridEl.appendChild(card);
    });

    sectionEl.appendChild(gridEl);
    container.appendChild(sectionEl);
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

  state.weeklyQuestions = pickWeeklyQuestions(state.mode);
  state.daySchedule = buildDaySchedule(state.mode);

  if (typeof recordAnalyticsGameStart === "function") {
    recordAnalyticsGameStart(state.mode);
  }
}

function showSynopsis() {
  const card = document.getElementById("synopsis-card");
  const safeRawName = escapeHTML(getPlayerRawName());
  const safeDispName = escapeHTML(getPlayerDisplayName());

  if (state.mode === "senior") {
    card.innerHTML = `
      特殊詐欺の被害件数は年々増加し、その手口は非常に巧妙になっています。<br><br>
      警察や市役所を騙る電話、突然の訪問業者、携帯電話への不審なメッセージなど、詐欺は日常のふとした瞬間にやってきます。<br><br>
      大切なお金と安心を守るため、これから始まる1週間の防犯チャレンジに挑戦しましょう！
    `;
  } else if (state.mode === "adult") {
    card.innerHTML = `
      あなたの1週間の防犯チャレンジが始まります。<br><br>
      税金の還付通知、サブスクリプションの自動更新トラブル、銀行を騙る不正アクセス、マッチングアプリの金銭要求など、大人の日常には巧妙な罠が潜んでいます。<br><br>
      手元資金50,000円を守り抜きながら、1週間のリアルな通知や連絡を正しく見極めましょう！
    `;
  } else if (state.mode === "elementary") {
    const item = state.selectedItem;
    const itemDisp = (item && item.rubyName) ? item.rubyName : (item ? item.name : "");
    card.innerHTML = `
      キミの <ruby>名前<rt>なまえ</rt></ruby>は「${safeRawName}」。<br><br>
      ずっと <ruby>欲<rt>ほ</rt></ruby>しかった「${itemDisp}（${item.price.toLocaleString("ja-JP")}<ruby>円<rt>えん</rt></ruby>）」を、お<ruby>小遣<rt>こづか</rt></ruby>いで <ruby>買<rt>か</rt></ruby>うと <ruby>決<rt>き</rt></ruby>めたよ！<br>
      50,000<ruby>円<rt>えん</rt></ruby>を しっかり <ruby>守<rt>まも</rt></ruby>りながら、1<ruby>週間<rt>しゅうかん</rt></ruby>を すごそう。<br><br>
      ネットや まちの<ruby>中<rt>なか</rt></ruby>の いろんな <ruby>出来事<rt>できごと</rt></ruby>に <ruby>落<rt>お</rt></ruby>ち<ruby>着<rt>つ</rt></ruby>いて チャレンジしよう！
    `;
  } else {
    const item = state.selectedItem;
    card.innerHTML = `
      キミの名前は「${safeRawName}」。<br><br>
      ずっと欲しかった「${escapeHTML(item.name)}（¥${item.price.toLocaleString("ja-JP")}）」を、自分のお小遣いで買うと決めた。<br>
      50,000円を守りながら、1週間を過ごすことになる。<br><br>
      街にもSNSやネットの中にも、色々な通知や連絡が届く……。<br>
      さあ、${safeDispName}の1週間が、いま始まる。
    `;
  }

  const bgImg = document.getElementById("synopsis-bg-image");
  const guideImg = document.getElementById("synopsis-guide-image");

  setImageSafely(bgImg, IMAGE_ASSETS.backgrounds.schoolRoute);
  setImageSafely(guideImg, null);

  showScreen("screen-synopsis");
}