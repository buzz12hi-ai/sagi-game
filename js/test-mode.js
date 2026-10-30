/* =========================================================
   test-mode.js
   製作者用パスコード認証 ＆ フルスクリーン管理コンソール ＆ 実演特化デバッグ制御
   【全角半角自動正規化 ＆ Firebase Auth 連携版】
   ========================================================= */

// 管理者アカウント情報（固定）
const ADMIN_EMAIL = "maikerumuxia8@gmail.com";
const ADMIN_FIREBASE_PASSWORD = "AA5158";

let isDevAuthenticated = false;

// 全角英数字を半角英数字・大文字に正規化する関数
function normalizePasscode(input) {
  if (!input) return "";
  return input
    .trim()
    .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xFEE0))
    .toUpperCase();
}

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
  const descEl = document.querySelector(".auth-modal-desc");
  
  if (descEl) descEl.textContent = "製作者用パスコード（AA5158）を入力してください";

  if (input) {
    input.value = "";
    input.type = "password";
  }
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

async function verifyAndProceed() {
  const input = document.getElementById("auth-passcode-input");
  const errorEl = document.getElementById("auth-error-msg");
  const btn = document.getElementById("btn-auth-verify");
  // 全角（ＡＡ５１５８等）が入っても自動で半角大文字「AA5158」に変換
  const enteredPasscode = normalizePasscode(input ? input.value : "");

  // パスコードチェック
  if (enteredPasscode !== "AA5158") {
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

  const auth = typeof getFirebaseAuth === "function" ? getFirebaseAuth() : null;
  if (!auth) {
    if (errorEl) {
      errorEl.textContent = "⚠️ クラウド通信が初期化されていません。";
      errorEl.classList.remove("is-hidden");
    }
    return false;
  }

  if (btn) {
    btn.textContent = "認証中...";
    btn.disabled = true;
  }

  try {
    // Firebase Auth で管理者ログインを実行
    await auth.signInWithEmailAndPassword(ADMIN_EMAIL, ADMIN_FIREBASE_PASSWORD);
    isDevAuthenticated = true;
    if (errorEl) errorEl.classList.add("is-hidden");
    closeAuthModal();
    openDevDashboard();
  } catch (error) {
    console.warn("[Firebase Auth] 管理者ログイン失敗:", error);
    if (errorEl) {
      errorEl.textContent = "⚠️ クラウド認証に失敗しました。承認済みドメイン設定等をご確認ください。";
      errorEl.classList.remove("is-hidden");
    }
    if (input) {
      input.value = "";
      input.focus();
    }
  } finally {
    if (btn) {
      btn.textContent = "認証して進む";
      btn.disabled = false;
    }
  }
  
  return isDevAuthenticated;
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

async function devLogout() {
  const auth = typeof getFirebaseAuth === "function" ? getFirebaseAuth() : null;
  if (auth) {
    try {
      await auth.signOut();
      if (typeof autoSignInAnonymously === "function") {
        await autoSignInAnonymously();
      }
    } catch (e) {
      console.warn("[Firebase Auth] ログアウト処理エラー:", e);
    }
  }
  isDevAuthenticated = false;
  closeDevDashboard();
  closeAuthModal();
  alert("製作者認証からログアウトしました。");
}

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

function jumpToSelectedWeekday() {
  if (!state.isTestMode) return;
  const selectEl = document.getElementById("test-select-weekday");
  if (!selectEl) return;
  jumpToWeekday(selectEl.value);
}

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

function skipCurrentQuestion() {
  if (!state.isTestMode) return;
  state.slotIndex += 1;
  showEvent();
}

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

document.addEventListener("DOMContentLoaded", () => {
  const btnOpenAuth = document.getElementById("btn-open-dev-auth");
  if (btnOpenAuth) btnOpenAuth.onclick = handleOpenDevAuthEntry;

  const btnVerify = document.getElementById("btn-auth-verify");
  if (btnVerify) btnVerify.onclick = verifyAndProceed;

  const btnCancelAuth = document.getElementById("btn-auth-cancel");
  if (btnCancelAuth) btnCancelAuth.onclick = closeAuthModal;

  const authInput = document.getElementById("auth-passcode-input");
  if (authInput) {
    authInput.onkeydown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        verifyAndProceed();
      }
    };
  }

  const btnDashExit = document.getElementById("btn-dash-exit-game");
  if (btnDashExit) {
    btnDashExit.onclick = () => {
      closeDevDashboard();
      state.isTestMode = false;
    };
  }

  const btnDashLogout = document.getElementById("btn-dash-logout");
  if (btnDashLogout) btnDashLogout.onclick = devLogout;

  const cardAnalytics = document.getElementById("card-dash-analytics");
  if (cardAnalytics) {
    cardAnalytics.onclick = () => {
      closeDevDashboard();
      if (typeof openAnalyticsModal === "function") openAnalyticsModal();
    };
  }

  const cardTestplay = document.getElementById("card-dash-testplay");
  if (cardTestplay) cardTestplay.onclick = startTestPlayMode;

  const cardPreview = document.getElementById("card-dash-preview");
  if (cardPreview) {
    cardPreview.onclick = () => {
      closeDevDashboard();
      if (typeof openPreviewModal === "function") openPreviewModal();
    };
  }

  const btnToggleDrawer = document.getElementById("btn-toggle-test-drawer");
  if (btnToggleDrawer) btnToggleDrawer.onclick = toggleTestDrawer;

  const btnJumpWeekday = document.getElementById("btn-test-jump-weekday");
  if (btnJumpWeekday) btnJumpWeekday.onclick = jumpToSelectedWeekday;

  const btnSkipQ = document.getElementById("btn-test-skip-q");
  if (btnSkipQ) btnSkipQ.onclick = skipCurrentQuestion;

  const btnToggleHints = document.getElementById("btn-test-toggle-hints");
  if (btnToggleHints) btnToggleHints.onclick = togglePrincipleTags;

  const btnPeekPoint = document.getElementById("btn-test-peek-point");
  if (btnPeekPoint) btnPeekPoint.onclick = peekCurrentPoint;

  const btnClosePeek = document.getElementById("btn-close-peek-point");
  if (btnClosePeek) btnClosePeek.onclick = closePeekPointModal;
});