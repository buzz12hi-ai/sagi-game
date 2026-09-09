/* =========================================================
   test-mode.js
   製作者用パスコード認証（A5158）＆ テストプレイ専用デバッグ制御
   【開閉矢印・曜日決定・正誤シミュレーション・被害付加・画面直行対応版】
   ========================================================= */

const DEV_AUTH_PASSCODE = "A5158";
let pendingAuthAction = null; // "analytics" | "testplay"

/* =========================================================
   1. パスコード正規化ロジック
   ========================================================= */

// 全角英数字を半角に変換し、前後の空白を除去して大文字へ揃える
function normalizePasscode(input) {
  if (!input) return "";
  return input
    .trim()
    .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xFEE0))
    .toUpperCase();
}

/* =========================================================
   2. パスコード認証モーダル制御
   ========================================================= */

function openAuthModal(targetAction) {
  pendingAuthAction = targetAction;
  const modal = document.getElementById("auth-modal");
  const input = document.getElementById("auth-passcode-input");
  const errorEl = document.getElementById("auth-error-msg");

  if (input) input.value = "";
  if (errorEl) errorEl.classList.add("is-hidden");
  if (modal) modal.classList.remove("is-hidden");

  setTimeout(() => {
    if (input) input.focus();
  }, 100);
}

function closeAuthModal() {
  const modal = document.getElementById("auth-modal");
  if (modal) modal.classList.add("is-hidden");
  pendingAuthAction = null;
}

// 共通パスコード判定処理
function verifyPasscode() {
  const input = document.getElementById("auth-passcode-input");
  const errorEl = document.getElementById("auth-error-msg");
  const rawValue = input ? input.value : "";
  const normalizedCode = normalizePasscode(rawValue);

  if (normalizedCode === DEV_AUTH_PASSCODE) {
    if (errorEl) errorEl.classList.add("is-hidden");
    return true;
  }

  if (errorEl) {
    errorEl.textContent = "⚠️ パスコードが正しくありません。";
    errorEl.classList.remove("is-hidden");
  }
  if (input) {
    input.value = "";
    input.focus();
  }
  return false;
}

// 「📊 制作・分析画面」実行ハンドラ
function handleAuthAnalytics() {
  if (verifyPasscode()) {
    closeAuthModal();
    openAnalyticsModal();
  }
}

// 「🛠️ テストプレイ」実行ハンドラ
function handleAuthTestPlay() {
  if (verifyPasscode()) {
    closeAuthModal();
    startTestPlayMode();
  }
}

// Enterキー用ハンドラ
function handleAuthSubmit() {
  if (!verifyPasscode()) return;
  
  closeAuthModal();
  if (pendingAuthAction === "testplay") {
    startTestPlayMode();
  } else {
    openAnalyticsModal();
  }
}

/* =========================================================
   3. テストプレイモードの開始
   ========================================================= */

function startTestPlayMode() {
  state.isTestMode = true;

  const badge = document.getElementById("test-mode-badge");
  const drawer = document.getElementById("test-controller-drawer");
  if (badge) badge.classList.remove("is-hidden");
  if (drawer) {
    drawer.classList.remove("is-hidden");
    drawer.classList.remove("is-collapsed");
    updateDrawerArrow(true);
  }

  showScreen("screen-mode-select");
}

/* =========================================================
   4. テストプレイ専用コントロール機能
   ========================================================= */

// ドロワーの開閉トグルと矢印アイコン（▲/▼）の切り替え
function toggleTestDrawer() {
  const drawer = document.getElementById("test-controller-drawer");
  if (!drawer) return;

  const willCollapse = !drawer.classList.contains("is-collapsed");
  drawer.classList.toggle("is-collapsed");
  updateDrawerArrow(!willCollapse);
}

function updateDrawerArrow(isOpen) {
  const arrowEl = document.getElementById("test-drawer-arrow");
  if (arrowEl) {
    arrowEl.textContent = isOpen ? "▼" : "▲";
  }
}

// 選択された曜日に決定ボタンで移動
function jumpToSelectedWeekday() {
  if (!state.isTestMode) return;
  const selectEl = document.getElementById("test-select-weekday");
  if (!selectEl) return;
  jumpToWeekday(selectEl.value);
}

// 曜日へ自由ジャンプ（月〜日）
function jumpToWeekday(weekdayIndex) {
  if (!state.isTestMode) return;
  const targetDay = Number(weekdayIndex);

  const targetSlotIdx = state.daySchedule.findIndex((s) => s.weekdayIndex === targetDay);
  if (targetSlotIdx !== -1) {
    state.slotIndex = targetSlotIdx;
    state.dialogueIndex = 0;
    showEvent();
  }
}

// 現在の問題をスキップ
function skipCurrentQuestion() {
  if (!state.isTestMode) return;
  state.slotIndex += 1;
  showEvent();
}

// 候補A: 判定シミュレーション（強制正解 / 強制不正解）
function forceTestAnswer(isCorrect) {
  if (!state.isTestMode) return;

  const question = currentQuestion();
  if (!question) return;

  if (isCorrect) {
    const choice = (question.correctChoices && question.correctChoices.length > 0)
      ? { ...question.correctChoices[0], type: "correct" }
      : { text: "[TEST] 強制正解", money: 0, principleTag: "safe", type: "correct", explain: "テスト機能による強制正解処理です。" };
    handleChoice(choice);
  } else {
    const choice = (question.wrongChoices && question.wrongChoices.length > 0)
      ? { ...question.wrongChoices[0], type: "wrong" }
      : { text: "[TEST] 強制不正解", money: -15000, principleTag: "fooled", damageType: "money", type: "wrong", explain: "テスト機能による強制不正解処理です。" };
    handleChoice(choice);
  }
}

// 候補B: 被害リスクの直接付加
function addTestDamage(type) {
  if (!state.isTestMode) return;

  if (type === "personalInfo") {
    state.damages.personalInfo += 1;
  } else if (type === "account") {
    state.damages.account += 1;
  } else if (type === "line") {
    state.damages.line += 1;
  }
  state.fooledCount += 1;

  showMoneyDelta(-10000);
  state.damages.money += 10000;
  state.money = Math.max(0, state.money - 10000);
  updateMoneyDisplay();
}

// 候補C: 画面直行ショートカット（買い物 / アンケート）
function jumpToDirectScreen(screenName) {
  if (!state.isTestMode) return;

  if (screenName === "shopping") {
    if (!state.selectedItem && typeof ITEMS !== "undefined" && ITEMS.length > 0) {
      state.selectedItem = ITEMS[0];
    }
    showShoppingScreen();
  } else if (screenName === "survey") {
    showSurveyScreen();
  }
}

// 候補D: テストモード終了（通常へ戻る）
function exitTestMode() {
  if (confirm("テストプレイモードを終了し、通常のタイトル画面へ戻りますか？")) {
    state.isTestMode = false;
    restartGame();
  }
}

// 所持金の直接変更
function setTestMoney(amount) {
  if (!state.isTestMode) return;
  state.money = Number(amount);
  updateMoneyDisplay();
}

// エンディングの直接シミュレーション
function testJumpEnding(type) {
  if (!state.isTestMode) return;

  if (type === "shop_success") {
    state.money = 60000;
    if (!state.selectedItem && typeof ITEMS !== "undefined" && ITEMS.length > 0) {
      state.selectedItem = ITEMS[ITEMS.length - 1];
    }
    showShoppingScreen();
  } else if (type === "shop_fail") {
    state.money = 0;
    if (!state.selectedItem && typeof ITEMS !== "undefined" && ITEMS.length > 0) {
      state.selectedItem = ITEMS[ITEMS.length - 1];
    }
    showShoppingScreen();
  } else if (type === "rank_s") {
    state.correctCount = state.weeklyQuestions.length || 7;
    state.fooledCount = 0;
    state.money = 50000;
    state.damages = { money: 0, personalInfo: 0, account: 0, line: 0 };
    showEnding();
  } else if (type === "rank_d") {
    state.correctCount = 0;
    state.fooledCount = state.weeklyQuestions.length || 7;
    state.money = 0;
    state.damages = { money: 50000, personalInfo: 3, account: 2, line: 2 };
    showEnding();
  }
}

/* =========================================================
   5. イベントリスナー自動初期化
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  // パスコードモーダル用
  const btnAnalytics = document.getElementById("btn-auth-analytics");
  if (btnAnalytics) {
    btnAnalytics.addEventListener("click", handleAuthAnalytics);
  }

  const btnTestPlay = document.getElementById("btn-auth-testplay");
  if (btnTestPlay) {
    btnTestPlay.addEventListener("click", handleAuthTestPlay);
  }

  const authInput = document.getElementById("auth-passcode-input");
  if (authInput) {
    authInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleAuthSubmit();
      }
    });
  }

  // テストコントロールバー用
  const btnToggleDrawer = document.getElementById("btn-toggle-test-drawer");
  if (btnToggleDrawer) {
    btnToggleDrawer.addEventListener("click", toggleTestDrawer);
  }

  const btnJumpWeekday = document.getElementById("btn-test-jump-weekday");
  if (btnJumpWeekday) {
    btnJumpWeekday.addEventListener("click", jumpToSelectedWeekday);
  }

  const btnSkipQ = document.getElementById("btn-test-skip-q");
  if (btnSkipQ) {
    btnSkipQ.addEventListener("click", skipCurrentQuestion);
  }
});