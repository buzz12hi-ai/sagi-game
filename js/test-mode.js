/* =========================================================
   test-mode.js
   製作者用パスコード認証（A5158）＆ テストプレイ専用デバッグ制御
   【通常プレイへの影響ゼロ・分析データ非反映・全曜日/問題/演出即時確認】
   ========================================================= */

const DEV_AUTH_PASSCODE = "A5158";
let pendingAuthAction = null; // "analytics" | "testplay"

/* =========================================================
   1. パスコード認証モーダル制御
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

function handleAuthSubmit() {
  const input = document.getElementById("auth-passcode-input");
  const errorEl = document.getElementById("auth-error-msg");
  const typedCode = input ? input.value.trim().toUpperCase() : "";

  if (typedCode === DEV_AUTH_PASSCODE) {
    closeAuthModal();
    if (pendingAuthAction === "analytics") {
      openAnalyticsModal();
    } else if (pendingAuthAction === "testplay") {
      startTestPlayMode();
    }
  } else {
    if (errorEl) {
      errorEl.textContent = "⚠️ パスコードが正しくありません。";
      errorEl.classList.remove("is-hidden");
    }
    if (input) {
      input.value = "";
      input.focus();
    }
  }
}

/* =========================================================
   2. テストプレイモードの開始
   ========================================================= */

function startTestPlayMode() {
  state.isTestMode = true;

  // TEST MODE バッジとデバッグバーを表示
  const badge = document.getElementById("test-mode-badge");
  const drawer = document.getElementById("test-controller-drawer");
  if (badge) badge.classList.remove("is-hidden");
  if (drawer) drawer.classList.remove("is-hidden");

  // デバイス選択はデフォルト（または現在設定）を適用し、モード選択へ進む
  showScreen("screen-mode-select");
}

/* =========================================================
   3. テストプレイ専用コントロール機能
   ========================================================= */

// コントロールバーの開閉トグル
function toggleTestDrawer() {
  const drawer = document.getElementById("test-controller-drawer");
  if (drawer) {
    drawer.classList.toggle("is-collapsed");
  }
}

// 曜日へ自由ジャンプ（月〜日）
function jumpToWeekday(weekdayIndex) {
  if (!state.isTestMode) return;
  const targetDay = Number(weekdayIndex);

  // 該当曜日の最初のスロットを探す
  const targetSlotIdx = state.daySchedule.findIndex(s => s.weekdayIndex === targetDay);
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

// 所持金の直接変更
function setTestMoney(amount) {
  if (!state.isTestMode) return;
  state.money = Number(amount);
  updateMoneyDisplay();
}

// 各種エンディング・買い物の即時シミュレーション
function testJumpEnding(type) {
  if (!state.isTestMode) return;

  if (type === "shop_success") {
    state.money = 60000;
    if (!state.selectedItem) state.selectedItem = ITEMS[ITEMS.length - 1];
    showShoppingScreen();
  } else if (type === "shop_fail") {
    state.money = 0;
    if (!state.selectedItem) state.selectedItem = ITEMS[ITEMS.length - 1];
    showShoppingScreen();
  } else if (type === "rank_s") {
    state.correctCount = state.weeklyQuestions.length;
    state.fooledCount = 0;
    state.money = 50000;
    state.damages = { money: 0, personalInfo: 0, account: 0, line: 0 };
    showEnding();
  } else if (type === "rank_d") {
    state.correctCount = 0;
    state.fooledCount = state.weeklyQuestions.length;
    state.money = 0;
    state.damages = { money: 50000, personalInfo: 3, account: 2, line: 2 };
    showEnding();
  }
}