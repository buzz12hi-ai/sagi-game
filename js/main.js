/* =========================================================
   main.js
   アプリケーション統合エントリポイント
   （タイトルレアリティ抽選・製作者機能・イベントリスナー一括登録・画面初期化）
   ========================================================= */

// ★ タイトル画面のジョーくん選出（金 0.1% / 銀 1.0% / 銅 5.0% / ノーマル全9表情ランダム 93.9%） ★
function renderTitleVisual() {
  const titleJoeImg = document.getElementById("title-joe-image");
  if (!titleJoeImg) return;

  const rand = Math.random() * 100; // 0.0 〜 100.0 の乱数
  let imgSrc;

  if (rand < 0.1) {
    // 🥇 金ジョー君 (UR): 0.1%
    imgSrc = IMAGE_ASSETS.characters.joeGold;
  } else if (rand < 1.1) {
    // 🥈 銀ジョー君 (SR): 1.0% (0.1%〜1.1%)
    imgSrc = IMAGE_ASSETS.characters.joeSilver;
  } else if (rand < 6.1) {
    // 🥉 銅ジョー君 (R): 5.0% (1.1%〜6.1%)
    imgSrc = IMAGE_ASSETS.characters.joeBronze;
  } else {
    // 🐻 ノーマル枠 (93.9%): 全9表情からランダム選出
    const allNormalJoeList = [
      IMAGE_ASSETS.characters.joe,          // 通常
      IMAGE_ASSETS.characters.joeHappy,     // 喜
      IMAGE_ASSETS.characters.joeSad,       // 哀
      IMAGE_ASSETS.characters.joeSurprised, // 驚き
      IMAGE_ASSETS.characters.joeThinking,  // 考える
      IMAGE_ASSETS.characters.joeCheer,     // 応援
      IMAGE_ASSETS.characters.joeWorry,     // 困り
      IMAGE_ASSETS.characters.joeAngry,     // 怒
      IMAGE_ASSETS.characters.joeRelax      // 楽
    ];
    imgSrc = allNormalJoeList[Math.floor(Math.random() * allNormalJoeList.length)];
  }

  setImageSafely(titleJoeImg, imgSrc);
  applyCharacterBlend(titleJoeImg, imgSrc);
}

/* =========================================================
   イベントリスナー一括登録
   ========================================================= */

// 1. タイトル画面 → 表示デザイン選択
document.getElementById("btn-start").addEventListener("click", handleStartClick);

// 2. 表示デザイン（デバイス）選択
document.getElementById("btn-device-mobile").addEventListener("click", () => handleSelectDevice("mobile"));
document.getElementById("btn-device-desktop").addEventListener("click", () => handleSelectDevice("desktop"));

// 3. 製作者用パスコード認証ランチャー
const btnOpenDevAuth = document.getElementById("btn-open-dev-auth");
if (btnOpenDevAuth) {
  btnOpenDevAuth.addEventListener("click", () => openAuthModal("analytics"));
}

const btnAuthCancel = document.getElementById("btn-auth-cancel");
if (btnAuthCancel) {
  btnAuthCancel.addEventListener("click", closeAuthModal);
}

// 4. 制作・分析画面モーダル制御
const btnCloseAnalytics = document.getElementById("btn-close-analytics");
if (btnCloseAnalytics) {
  btnCloseAnalytics.addEventListener("click", closeAnalyticsModal);
}

const btnExportCsv = document.getElementById("btn-export-csv");
if (btnExportCsv) {
  btnExportCsv.addEventListener("click", exportAnalyticsCSV);
}

const btnResetAnalytics = document.getElementById("btn-reset-analytics");
if (btnResetAnalytics) {
  btnResetAnalytics.addEventListener("click", resetAnalyticsData);
}

const analyticsModeFilter = document.getElementById("analytics-mode-filter");
if (analyticsModeFilter) {
  analyticsModeFilter.addEventListener("change", renderAnalyticsDashboard);
}

// 5. ゲーム本編：モード選択（4モード）
document.getElementById("btn-mode-elementary").addEventListener("click", () => handleSelectMode("elementary"));
document.getElementById("btn-mode-teen").addEventListener("click", () => handleSelectMode("teen"));
document.getElementById("btn-mode-adult").addEventListener("click", () => handleSelectMode("adult"));
document.getElementById("btn-mode-senior").addEventListener("click", () => handleSelectMode("senior"));

// 6. 名前入力 ＆ スキップ
document.getElementById("btn-name-submit").addEventListener("click", handleNameSubmit);
const btnNameSkip = document.getElementById("btn-name-skip");
if (btnNameSkip) {
  btnNameSkip.addEventListener("click", handleNameSkip);
}

// 7. あらすじ・ストーリー進行
document.getElementById("btn-synopsis-next").addEventListener("click", showEvent);
document.getElementById("btn-narration-next").addEventListener("click", handleNarrationNext);
document.getElementById("btn-dialogue-next").addEventListener("click", goToDialogueNext);
document.getElementById("btn-next").addEventListener("click", goToNextDay);

// 8. 週末ふりかえり画面 → 買い物/エンディングへの分岐
document.getElementById("btn-week-recap-next").addEventListener("click", () => {
  if (state.mode === "senior" || state.mode === "adult") {
    showEnding();
  } else {
    showShoppingScreen();
  }
});

// 9. 買い物 → エンディング → アンケート → 再スタート
document.getElementById("btn-ending").addEventListener("click", showEnding);
document.getElementById("btn-to-survey").addEventListener("click", showSurveyScreen);
document.getElementById("btn-restart").addEventListener("click", restartGame);

// 10. リタイアボタン
const retireBtn = document.getElementById("btn-retire");
if (retireBtn) {
  retireBtn.addEventListener("click", handleRetire);
}

// 11. 画像拡大モーダル制御
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

// 12. 会話ログ見直しボタン（問題画面 ＆ 結果画面）
const openLogBtnResult = document.getElementById("btn-open-log");
if (openLogBtnResult) {
  openLogBtnResult.addEventListener("click", openLogModal);
}

const openLogBtnEvent = document.getElementById("btn-open-log-event");
if (openLogBtnEvent) {
  openLogBtnEvent.addEventListener("click", openLogModal);
}

const closeLogBtn = document.getElementById("btn-close-log-modal");
if (closeLogBtn) {
  closeLogBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closeLogModal();
  });
}

const logModalOverlay = document.getElementById("log-modal");
if (logModalOverlay) {
  logModalOverlay.addEventListener("click", (e) => {
    if (e.target === logModalOverlay) {
      closeLogModal();
    }
  });
}

// 13. 初回読み込み・画面復帰時（pageshow / BFCache）対応
window.addEventListener("pageshow", () => {
  renderTitleVisual();
});

document.addEventListener("DOMContentLoaded", () => {
  renderTitleVisual();
});

// 初期画面の起動
renderTitleVisual();
showScreen("screen-title");