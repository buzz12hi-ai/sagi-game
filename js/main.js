/* =========================================================
   main.js
   アプリケーション統合エントリポイント
   （イベントリスナー登録・グローバル関数連携安定化版）
   ========================================================= */

window.DEBUG_MODE = false;

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

// 404や画像パスのエンコードエラーを防ぐための安全デコード調整
function getSafeImageUrl(path) {
  if (!path) return "";
  try {
    return decodeURI(path);
  } catch (e) {
    return path;
  }
}

/* =========================================================
   イベントリスナー一括登録
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  // 1. タイトル画面 → 表示デザイン選択
  const btnStart = document.getElementById("btn-start");
  if (btnStart) btnStart.addEventListener("click", handleStartClick);

  // 2. 表示デザイン選択
  const btnDevMobile = document.getElementById("btn-device-mobile");
  if (btnDevMobile) btnDevMobile.addEventListener("click", () => handleSelectDevice("mobile"));

  const btnDevDesktop = document.getElementById("btn-device-desktop");
  if (btnDevDesktop) btnDevDesktop.addEventListener("click", () => handleSelectDevice("desktop"));

  // 2.1 画面の揺れ・点滅設定
  const btnToggleMotion = document.getElementById("btn-toggle-motion");
  if (btnToggleMotion) btnToggleMotion.addEventListener("click", toggleMotionPreference);

  const btnStatusMotionToggle = document.getElementById("btn-status-motion-toggle");
  if (btnStatusMotionToggle) btnStatusMotionToggle.addEventListener("click", toggleMotionPreference);

  const btnMotionNext = document.getElementById("btn-motion-next");
  if (btnMotionNext) btnMotionNext.addEventListener("click", handleMotionSettingNext);

  // 2.2 中高生モードのプレイ経験確認
  const btnExpFirst = document.getElementById("btn-exp-first");
  if (btnExpFirst) btnExpFirst.addEventListener("click", () => handleSelectExperience(false));

  const btnExpRepeated = document.getElementById("btn-exp-repeated");
  if (btnExpRepeated) btnExpRepeated.addEventListener("click", () => handleSelectExperience(true));

  // 3. 制作・分析画面モーダル制御
  const btnCloseAnalytics = document.getElementById("btn-close-analytics");
  if (btnCloseAnalytics) btnCloseAnalytics.addEventListener("click", closeAnalyticsModal);

  const btnExportCsv = document.getElementById("btn-export-csv");
  if (btnExportCsv) btnExportCsv.addEventListener("click", exportAnalyticsCSV);

  const btnResetAnalytics = document.getElementById("btn-reset-analytics");
  if (btnResetAnalytics) btnResetAnalytics.addEventListener("click", resetAnalyticsData);

  const analyticsModeFilter = document.getElementById("analytics-mode-filter");
  if (analyticsModeFilter) analyticsModeFilter.addEventListener("change", renderAnalyticsDashboard);

  // 4. モード選択
  const btnModeElem = document.getElementById("btn-mode-elementary");
  if (btnModeElem) btnModeElem.addEventListener("click", () => handleSelectMode("elementary"));

  const btnModeTeen = document.getElementById("btn-mode-teen");
  if (btnModeTeen) btnModeTeen.addEventListener("click", () => handleSelectMode("teen"));

  const btnModeAdult = document.getElementById("btn-mode-adult");
  if (btnModeAdult) btnModeAdult.addEventListener("click", () => handleSelectMode("adult"));

  const btnModeSenior = document.getElementById("btn-mode-senior");
  if (btnModeSenior) btnModeSenior.addEventListener("click", () => handleSelectMode("senior"));

  // 5. 名前入力 ＆ スキップ ＆ ルール画面
  const btnNameSubmit = document.getElementById("btn-name-submit");
  if (btnNameSubmit) btnNameSubmit.addEventListener("click", handleNameSubmit);

  const btnNameSkip = document.getElementById("btn-name-skip");
  if (btnNameSkip) btnNameSkip.addEventListener("click", handleNameSkip);

  const btnRulesNext = document.getElementById("btn-rules-next");
  if (btnRulesNext) btnRulesNext.addEventListener("click", goToItemSelect);

  // 6. あらすじ・ストーリー進行
  const btnSynopsisNext = document.getElementById("btn-synopsis-next");
  if (btnSynopsisNext) btnSynopsisNext.addEventListener("click", showEvent);

  const btnNarrationNext = document.getElementById("btn-narration-next");
  if (btnNarrationNext) btnNarrationNext.addEventListener("click", handleNarrationNext);

  const btnDialoguePrev = document.getElementById("btn-dialogue-prev");
  if (btnDialoguePrev) btnDialoguePrev.addEventListener("click", goToDialoguePrev);

  const btnDialogueNext = document.getElementById("btn-dialogue-next");
  if (btnDialogueNext) btnDialogueNext.addEventListener("click", goToDialogueNext);

  const btnNext = document.getElementById("btn-next");
  if (btnNext) btnNext.addEventListener("click", goToNextDay);

  // 7. 週末ふりかえり画面
  const btnWeekRecapNext = document.getElementById("btn-week-recap-next");
  if (btnWeekRecapNext) {
    btnWeekRecapNext.addEventListener("click", () => {
      if (state.mode === "senior" || state.mode === "adult") {
        showEnding();
      } else {
        showShoppingScreen();
      }
    });
  }

  // 8. 買い物 → エンディング → 再スタート
  const btnEnding = document.getElementById("btn-ending");
  if (btnEnding) btnEnding.addEventListener("click", showEnding);

  const btnRestart = document.getElementById("btn-restart");
  if (btnRestart) btnRestart.addEventListener("click", () => {
    if (typeof restartGame === "function") restartGame();
  });

  // 9. リタイアボタン
  const retireBtn = document.getElementById("btn-retire");
  if (retireBtn) retireBtn.addEventListener("click", handleRetire);

  // 10. 画像拡大モーダル制御（確実な閉じる処理）
  const closeImageModalBtn = document.getElementById("btn-close-image-modal");
  if (closeImageModalBtn) {
    closeImageModalBtn.onclick = (e) => {
      e.stopPropagation();
      closeImageModal();
    };
  }

  const imageModalOverlay = document.getElementById("image-modal");
  if (imageModalOverlay) {
    imageModalOverlay.onclick = (e) => {
      if (e.target === imageModalOverlay) closeImageModal();
    };
  }

  // 11. 会話ログ見直しボタン
  const openLogBtnResult = document.getElementById("btn-open-log");
  if (openLogBtnResult) openLogBtnResult.addEventListener("click", openLogModal);

  const openLogBtnEvent = document.getElementById("btn-open-log-event");
  if (openLogBtnEvent) openLogBtnEvent.addEventListener("click", openLogModal);

  const closeLogBtn = document.getElementById("btn-close-log-modal");
  if (closeLogBtn) {
    closeLogBtn.onclick = (e) => {
      e.stopPropagation();
      closeLogModal();
    };
  }

  const logModalOverlay = document.getElementById("log-modal");
  if (logModalOverlay) {
    logModalOverlay.onclick = (e) => {
      if (e.target === logModalOverlay) closeLogModal();
    };
  }

  applyMotionPreference(state.reduceMotion);
  renderTitleVisual();
});

window.addEventListener("pageshow", () => {
  renderTitleVisual();
});

renderTitleVisual();
showScreen("screen-title");