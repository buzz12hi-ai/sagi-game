/* =========================================================
   validator.js
   起動時自動整合性バリデーター
   全モード・全問題の画像パス・必須項目・3原則タグを自動検査
   ========================================================= */

function validateAllQuestions() {
  const allModes = [
    { name: "小学生", questions: QUESTIONS_ELEMENTARY },
    { name: "中高生", questions: QUESTIONS_TEEN },
    { name: "一般（大人）", questions: QUESTIONS_ADULT },
    { name: "高齢者", questions: QUESTIONS_SENIOR }
  ];

  const seenIds = new Set();
  const imageUsageMap = new Map();
  let totalErrors = 0;
  let totalWarnings = 0;

  console.group("%c🛡️ [防犯ゲーム] データ整合性自動チェック開始", "color: #1B2A4A; font-weight: bold; font-size: 13px;");

  allModes.forEach((modeObj) => {
    if (!modeObj.questions || !Array.isArray(modeObj.questions)) {
      console.error(`[モードエラー] モード「${modeObj.name}」の問題データ配列が存在しません。`);
      totalErrors++;
      return;
    }

    modeObj.questions.forEach((q, index) => {
      const qNum = index + 1;
      const qPrefix = `[${modeObj.name} Q${qNum}: ${q.id || "ID未設定"}]`;

      // 1. 問題IDの検証
      if (!q.id) {
        console.error(`${qPrefix} 問題ID (id) が設定されていません。`);
        totalErrors++;
      } else if (seenIds.has(q.id)) {
        console.error(`${qPrefix} 問題ID「${q.id}」が他の問題と重複しています。`);
        totalErrors++;
      } else {
        seenIds.add(q.id);
      }

      // 2. 必須テキスト項目の検証
      if (!q.title || q.title.trim() === "") {
        console.error(`${qPrefix} タイトル (title) が未設定です。`);
        totalErrors++;
      }
      if (!q.category || !["scam", "real", "help"].includes(q.category)) {
        console.error(`${qPrefix} 区分 (category) が不正です。'scam', 'real', 'help' のいずれかを指定してください。`);
        totalErrors++;
      }
      if (!q.point || q.point.trim() === "") {
        console.warn(`${qPrefix} 防犯ポイント (point) が未設定です。`);
        totalWarnings++;
      }

      // 3. 選択肢および3原則タグの検証
      if (!q.correctChoices || !Array.isArray(q.correctChoices) || q.correctChoices.length === 0) {
        console.error(`${qPrefix} 正解の選択肢 (correctChoices) が設定されていません。`);
        totalErrors++;
      } else {
        const correct = q.correctChoices[0];
        if (!correct.principleTag || correct.principleTag !== "safe") {
          console.warn(`${qPrefix} 正解の選択肢に principleTag: 'safe' が設定されていません。`);
          totalWarnings++;
        }
      }

      if (!q.wrongChoices || !Array.isArray(q.wrongChoices) || q.wrongChoices.length < 3) {
        console.warn(`${qPrefix} 不正解の選択肢 (wrongChoices) が3つ未満です（現在: ${q.wrongChoices ? q.wrongChoices.length : 0}個）。`);
        totalWarnings++;
      } else {
        const wrongTags = new Set(q.wrongChoices.map(c => c.principleTag));
        ["speak", "pay", "fooled"].forEach(expectedTag => {
          if (!wrongTags.has(expectedTag)) {
            console.warn(`${qPrefix} 不正解の選択肢に 3原則タグ「${expectedTag}」が含まれていません。`);
            totalWarnings++;
          }
        });
      }

      // 4. 画像指定の検証
      if (q.screenshot !== undefined && q.screenshot !== null) {
        if (typeof q.screenshot !== "string" || q.screenshot.trim() === "") {
          console.error(`${qPrefix} screenshot に無効な値が設定されています。`);
          totalErrors++;
        } else {
          const usedList = imageUsageMap.get(q.screenshot) || [];
          usedList.push({ mode: modeObj.name, id: q.id, title: q.title });
          imageUsageMap.set(q.screenshot, usedList);
        }
      }

      if (q.character !== undefined && q.character !== null && typeof q.character !== "string") {
        console.error(`${qPrefix} 立ち絵画像 (character) のパスが無効です。`);
        totalErrors++;
      }
      if (q.bg !== undefined && q.bg !== null && typeof q.bg !== "string") {
        console.error(`${qPrefix} 背景画像 (bg) のパスが無効です。`);
        totalErrors++;
      }
    });
  });

  // 5. 画像重複の警告
  imageUsageMap.forEach((uses, imgSrc) => {
    if (uses.length > 2) {
      console.warn(`[画像重複警告] 画像「${imgSrc}」が複数の問題（${uses.length}箇所）で共有されています。`, uses);
      totalWarnings++;
    }
  });

  if (totalErrors === 0 && totalWarnings === 0) {
    console.log("%c✅ 全問題データ（64問）および3原則タグの整合性チェックに合格しました。異常はありません。", "color: #2E9E82; font-weight: bold;");
  } else {
    console.log(
      `%c⚠️ 整合性チェック完了: エラー ${totalErrors}件, 警告 ${totalWarnings}件 を検知しました。`,
      totalErrors > 0 ? "color: #E85C4A; font-weight: bold;" : "color: #F5A623; font-weight: bold;"
    );
  }

  console.groupEnd();
}

// ページ読み込み完了時に自動実行
window.addEventListener("DOMContentLoaded", () => {
  if (typeof QUESTIONS_ELEMENTARY !== "undefined") {
    validateAllQuestions();
  }
});