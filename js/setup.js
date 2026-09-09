/* =========================================================
   setup.js
   ゲーム準備・モード選択・名前入力・欲しい物選択・状態初期化・あらすじ
   （分析データ自動記録・テストプレイ連携対応版）
   ========================================================= */

// ① 「はじめる」クリックで「表示デザイン選択画面」へ
function handleStartClick() {
  state.isTestMode = false; // 通常プレイとして開始
  const badge = document.getElementById("test-mode-badge");
  const drawer = document.getElementById("test-controller-drawer");
  if (badge) badge.classList.add("is-hidden");
  if (drawer) drawer.classList.add("is-hidden");

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

// 名前決定時の処理
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

  showJoeIntro(goToItemSelect);
}

// 名前入力スキップ処理（名前を「あなた」として進行）
function handleNameSkip() {
  const errorEl = document.getElementById("name-input-error");
  if (errorEl) errorEl.classList.add("is-hidden");
  
  state.playerName = "あなた";
  showJoeIntro(goToItemSelect);
}

// 難易度グループ定義テーブル
const ITEM_DIFFICULTY_GROUPS = [
  { key: "初級", icon: "🟢", label: "初級", desc: "比較的達成しやすい目標", class: "group-beginner" },
  { key: "普通", icon: "🔵", label: "普通", desc: "少し頑張れば狙える目標", class: "group-normal" },
  { key: "上級", icon: "🟣", label: "上級", desc: "かなりお金を守る必要がある目標", class: "group-advanced" },
  { key: "MAX",  icon: "🔴", label: "MAX",  desc: "最高難易度", class: "group-max" }
];

// ② 欲しい物選択画面（4段階グループ別表示）
function goToItemSelect() {
  document.getElementById("status-bar").classList.add("hidden");
  const container = document.getElementById("item-list");
  container.innerHTML = "";

  ITEM_DIFFICULTY_GROUPS.forEach(groupDef => {
    const groupItems = ITEMS.filter(item => item.group === groupDef.key);
    if (groupItems.length === 0) return;

    const sectionEl = document.createElement("div");
    sectionEl.className = `item-group-section ${groupDef.class}`;

    const headerEl = document.createElement("div");
    headerEl.className = "item-group-header";
    headerEl.innerHTML = `
      <div class="item-group-title-row">
        <span class="item-group-badge">${groupDef.icon} ${groupDef.label}</span>
      </div>
      <p class="item-group-desc">${groupDef.desc}</p>
    `;
    sectionEl.appendChild(headerEl);

    const gridEl = document.createElement("div");
    gridEl.className = "item-grid";

    groupItems.forEach((item) => {
      const card = document.createElement("button");
      card.className = "item-card";
      card.type = "button";
      card.innerHTML = `
        ${itemVisualHTML(item, "item-photo")}
        <span class="item-name">${item.name}</span>
        <span class="item-price">¥${item.price.toLocaleString("ja-JP")}</span>
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

// ゲーム状態の初期化
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

  // ★ 通常プレイ時のみ、プレイ開始を分析ストレージに自動記録 ★
  if (typeof recordAnalyticsGameStart === "function") {
    recordAnalyticsGameStart(state.mode);
  }
}

// ③ あらすじ画面
function showSynopsis() {
  const card = document.getElementById("synopsis-card");

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
    card.innerHTML = `
      キミの <ruby>名<rt>な</rt></ruby><ruby>前<rt>まえ</rt></ruby>は「${getPlayerRawName()}」。<br><br>
      ずっと <ruby>欲<rt>ほ</rt></ruby>しかった「${item.name}（¥${item.price.toLocaleString("ja-JP")}）」を、お<ruby>小遣<rt>こづか</rt></ruby>いで <ruby>買<rt>か</rt></ruby>うと <ruby>決<rt>き</rt></ruby>めたよ！<br>
      50,000<ruby>円<rt>えん</rt></ruby>を しっかり <ruby>守<rt>まも</rt></ruby>りながら、1<ruby>週間<rt>しゅうかん</rt></ruby>をすごそう。<br><br>
      ネットや まちの<ruby>中<rt>なか</rt></ruby>の いろんな<ruby>出来事<rt>できごと</rt></ruby>に おちついて チャレンジしよう！
    `;
  } else {
    // teen
    const item = state.selectedItem;
    card.innerHTML = `
      キミの名前は「${getPlayerRawName()}」。<br><br>
      ずっと欲しかった「${item.name}（¥${item.price.toLocaleString("ja-JP")}）」を、自分のお小遣いで買うと決めた。<br>
      50,000円を守りながら、1週間を過ごすことになる。<br><br>
      街にもSNSやネットの中にも、色々な通知や連絡が届く……。<br>
      さあ、${getPlayerDisplayName()}の1週間が、いま始まる。
    `;
  }

  const bgImg = document.getElementById("synopsis-bg-image");
  const guideImg = document.getElementById("synopsis-guide-image");
  
  setImageSafely(bgImg, IMAGE_ASSETS.backgrounds.schoolRoute);
  setImageSafely(guideImg, null);

  showScreen("screen-synopsis");
}