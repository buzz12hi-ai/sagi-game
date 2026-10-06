/* =========================================================
   test-mode.js
   製作者用パスコード認証（A5158）＆ フルスクリーン管理コンソール ＆ 実演特化デバッグ制御
   【曜日移動＋3原則透視＋防犯ポイント確認・自動復帰版】
   ========================================================= */

const DEV_AUTH_PASSCODE = "A5158";
let isDevAuthenticated = false;

/* =========================================================
   1. パスコード正規化ロジック
   ========================================================= */

function normalizePasscode(input) {
  if (!input) return "";
  return input
    .trim()
    .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xFEE0))
    .toUpperCase();
}

/* =========================================================
   2. パスコード認証 ＆ フルスクリーン管理コンソール制御
   ========================================================= */

function handleOpenDevAuthEntry() {
  if (isDevAuthenticated) {
    closeAuthModal();
    openDevDashboard();
  } else {
    closeDevDashboard();
    openAuthModal();
  }
}

function openAuthModal() {
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
}

function verifyAndProceed() {
  const input = document.getElementById("auth-passcode-input");
  const errorEl = document.getElementById("auth-error-msg");
  const rawValue = input ? input.value : "";
  const normalizedCode = normalizePasscode(rawValue);

  if (normalizedCode === DEV_AUTH_PASSCODE) {
    if (errorEl) errorEl.classList.add("is-hidden");
    isDevAuthenticated = true;
    closeAuthModal();
    openDevDashboard();
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

function openDevDashboard() {
  closeAuthModal();
  const screen = document.getElementById("dev-dashboard-screen");
  if (screen) {
    screen.classList.remove("is-hidden");
  }
}

function closeDevDashboard() {
  const screen = document.getElementById("dev-dashboard-screen");
  if (screen) {
    screen.classList.add("is-hidden");
  }
}

function devLogout() {
  isDevAuthenticated = false;
  closeDevDashboard();
  closeAuthModal();
  alert("製作者認証からログアウトしました。");
}

/* =========================================================
   3. テストプレイモードの開始
   ========================================================= */

function startTestPlayMode() {
  closeDevDashboard();
  closeAuthModal();
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
   4. 警察発表・実演特化コントロール機能
   ========================================================= */

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

// 曜日選択決定ボタン
function jumpToSelectedWeekday() {
  if (!state.isTestMode) return;
  const selectEl = document.getElementById("test-select-weekday");
  if (!selectEl) return;
  jumpToWeekday(selectEl.value);
}

// 指定曜日へ移動（月〜日）
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

// 👁️ 3原則タグ・正解の透視（ハイライト表示）ON/OFF
function togglePrincipleTags() {
  if (!state.isTestMode) return;
  state.showPrincipleTags = !state.showPrincipleTags;

  const btn = document.getElementById("btn-test-toggle-hints");
  if (btn) {
    if (state.showPrincipleTags) {
      btn.textContent = "👁️ 3原則タグ表示: ON";
      btn.classList.add("is-active");
    } else {
      btn.textContent = "👁️ 3原則タグ表示: OFF";
      btn.classList.remove("is-active");
    }
  }

  const eventScreen = document.getElementById("screen-event");
  if (eventScreen && eventScreen.classList.contains("active")) {
    if (typeof refreshChoicesWithHints === "function") {
      refreshChoicesWithHints();
    }
  }
}

// 💡 防犯ポイント（カンペ）確認モーダルの開閉
function peekCurrentPoint() {
  if (!state.isTestMode) return;
  const q = currentQuestion();
  if (!q) {
    alert("出題中の問題がありません。");
    return;
  }

  const modal = document.getElementById("peek-point-modal");
  const qnameEl = document.getElementById("peek-point-qname");
  const pointEl = document.getElementById("peek-point-text");

  if (qnameEl) {
    qnameEl.innerHTML = `【${q.source || "状況"}】${q.title || ""}`;
  }
  if (pointEl) {
    pointEl.innerHTML = q.point || "防犯ポイントが設定されていません。";
  }

  if (modal) modal.classList.remove("is-hidden");
}

function closePeekPointModal() {
  const modal = document.getElementById("peek-point-modal");
  if (modal) modal.classList.add("is-hidden");
}

// エンディング直接シミュレーション
function testJumpEnding(type) {
  if (!state.isTestMode) return;

  if (type === "rank_s") {
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

// テストモード終了時：自動で製作者管理コンソールへ復帰
function exitTestMode() {
  if (confirm("テストプレイモードを終了し、製作者管理コンソールへ戻りますか？")) {
    state.isTestMode = false;
    state.showPrincipleTags = false;
    restartGame();
    if (isDevAuthenticated) {
      openDevDashboard();
    }
  }
}

/* =========================================================
   5. イベントリスナー初期化（直接バインド）
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const btnOpenAuth = document.getElementById("btn-open-dev-auth");
  if (btnOpenAuth) {
    btnOpenAuth.onclick = handleOpenDevAuthEntry;
  }

  const btnVerify = document.getElementById("btn-auth-verify");
  if (btnVerify) {
    btnVerify.onclick = verifyAndProceed;
  }

  const btnCancelAuth = document.getElementById("btn-auth-cancel");
  if (btnCancelAuth) {
    btnCancelAuth.onclick = closeAuthModal;
  }

  const authInput = document.getElementById("auth-passcode-input");
  if (authInput) {
    authInput.onkeydown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        verifyAndProceed();
      }
    };
  }

  // 管理コンソール・ヘッダーアクション
  const btnDashExit = document.getElementById("btn-dash-exit-game");
  if (btnDashExit) {
    btnDashExit.onclick = closeDevDashboard;
  }

  const btnDashLogout = document.getElementById("btn-dash-logout");
  if (btnDashLogout) {
    btnDashLogout.onclick = devLogout;
  }

  // 管理コンソール・3大カードクリック
  const cardAnalytics = document.getElementById("card-dash-analytics");
  if (cardAnalytics) {
    cardAnalytics.onclick = () => {
      closeDevDashboard();
      if (typeof openAnalyticsModal === "function") openAnalyticsModal();
    };
  }

  const cardTestplay = document.getElementById("card-dash-testplay");
  if (cardTestplay) {
    cardTestplay.onclick = startTestPlayMode;
  }

  const cardPreview = document.getElementById("card-dash-preview");
  if (cardPreview) {
    cardPreview.onclick = () => {
      closeDevDashboard();
      if (typeof openPreviewModal === "function") openPreviewModal();
    };
  }

  // 実演コントロールバー操作
  const btnToggleDrawer = document.getElementById("btn-toggle-test-drawer");
  if (btnToggleDrawer) {
    btnToggleDrawer.onclick = toggleTestDrawer;
  }

  const btnJumpWeekday = document.getElementById("btn-test-jump-weekday");
  if (btnJumpWeekday) {
    btnJumpWeekday.onclick = jumpToSelectedWeekday;
  }

  const btnSkipQ = document.getElementById("btn-test-skip-q");
  if (btnSkipQ) {
    btnSkipQ.onclick = skipCurrentQuestion;
  }

  const btnToggleHints = document.getElementById("btn-test-toggle-hints");
  if (btnToggleHints) {
    btnToggleHints.onclick = togglePrincipleTags;
  }

  const btnPeekPoint = document.getElementById("btn-test-peek-point");
  if (btnPeekPoint) {
    btnPeekPoint.onclick = peekCurrentPoint;
  }

  const btnClosePeek = document.getElementById("btn-close-peek-point");
  if (btnClosePeek) {
    btnClosePeek.onclick = closePeekPointModal;
  }
});