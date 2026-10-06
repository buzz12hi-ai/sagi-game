/* =========================================================
   main.js
   アプリケーション統合エントリポイント
   （タイトルレアリティ抽選・製作者機能・イベントリスナー一括登録・画面初期化）
   ========================================================= */

// タイトル画面のジョーくん選出（金 0.1% / 銀 1.0% / 銅 5.0% / ノーマル全9表情ランダム 93.9%）
function renderTitleVisual() {
  const titleJoeImg = document.getElementById("title-joe-image");
  if (!titleJoeImg) return;

  const rand = Math.random() * 100;
  let imgSrc;

  if (rand < 0.1) {
    imgSrc = IMAGE_ASSETS.characters.joeGold;
  } else if (rand < 1.1) {
    imgSrc = IMAGE_ASSETS.characters.joeSilver;
  } else if (rand < 6.1) {
    imgSrc = IMAGE_ASSETS.characters.joeBronze;
  } else {
    const allNormalJoeList = [
      IMAGE_ASSETS.characters.joe,
      IMAGE_ASSETS.characters.joeHappy,
      IMAGE_ASSETS.characters.joeSad,
      IMAGE_ASSETS.characters.joeSurprised,
      IMAGE_ASSETS.characters.joeThinking,
      IMAGE_ASSETS.characters.joeCheer,
      IMAGE_ASSETS.characters.joeWorry,
      IMAGE_ASSETS.characters.joeAngry,
      IMAGE_ASSETS.characters.joeRelax
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

// 3. 制作・分析画面モーダル制御
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

// 4. ゲーム本編：モード選択（4モード）
document.getElementById("btn-mode-elementary").addEventListener("click", () => handleSelectMode("elementary"));
document.getElementById("btn-mode-teen").addEventListener("click", () => handleSelectMode("teen"));
document.getElementById("btn-mode-adult").addEventListener("click", () => handleSelectMode("adult"));
document.getElementById("btn-mode-senior").addEventListener("click", () => handleSelectMode("senior"));

// 5. 名前入力 ＆ スキップ
document.getElementById("btn-name-submit").addEventListener("click", handleNameSubmit);
const btnNameSkip = document.getElementById("btn-name-skip");
if (btnNameSkip) {
  btnNameSkip.addEventListener("click", handleNameSkip);
}

// 6. あらすじ・ストーリー進行
document.getElementById("btn-synopsis-next").addEventListener("click", showEvent);
document.getElementById("btn-narration-next").addEventListener("click", handleNarrationNext);
document.getElementById("btn-dialogue-next").addEventListener("click", goToDialogueNext);
document.getElementById("btn-next").addEventListener("click", goToNextDay);

// 7. 週末ふりかえり画面 → 買い物/エンディングへの分岐
document.getElementById("btn-week-recap-next").addEventListener("click", () => {
  if (state.mode === "senior" || state.mode === "adult") {
    showEnding();
  } else {
    showShoppingScreen();
  }
});

// 8. 買い物 → エンディング → アンケート → 再スタート
document.getElementById("btn-ending").addEventListener("click", showEnding);
document.getElementById("btn-to-survey").addEventListener("click", showSurveyScreen);
document.getElementById("btn-restart").addEventListener("click", restartGame);

// 9. リタイアボタン
const retireBtn = document.getElementById("btn-retire");
if (retireBtn) {
  retireBtn.addEventListener("click", handleRetire);
}

// 10. 画像拡大モーダル制御
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

// 11. 会話ログ見直しボタン（問題画面 ＆ 結果画面）
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

// 12. 初回読み込み・画面復帰時（pageshow / BFCache）対応
window.addEventListener("pageshow", () => {
  renderTitleVisual();
});

document.addEventListener("DOMContentLoaded", () => {
  renderTitleVisual();
});

// 初期画面の起動
renderTitleVisual();
showScreen("screen-title");