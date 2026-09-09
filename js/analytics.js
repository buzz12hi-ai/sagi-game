/* =========================================================
   analytics.js
   製作者用「制作・分析」データ管理・自動集計・CSV出力・リセット
   【通常プレイのみ自動記録／テストプレイは完全遮断・Googleフォーム非依存】
   ========================================================= */

const ANALYTICS_STORAGE_KEY = "scam_hunter_analytics_v1";

// 分析データの初期構造
function getDefaultAnalyticsData() {
  return {
    totalPlays: 0,
    completedPlays: 0,
    totalScoreSum: 0,
    modePlays: {
      elementary: 0,
      teen: 0,
      adult: 0,
      senior: 0
    },
    modeClears: {
      elementary: 0,
      teen: 0,
      adult: 0,
      senior: 0
    },
    questionStats: {}, // { [qId]: { attempts: 0, corrects: 0 } }
    dropoutsByDay: {
      "月": 0, "火": 0, "水": 0, "木": 0, "金": 0, "土": 0, "日": 0
    },
    lastUpdated: new Date().toISOString()
  };
}

// データ取得
function getAnalyticsData() {
  try {
    const raw = localStorage.getItem(ANALYTICS_STORAGE_KEY);
    if (!raw) return getDefaultAnalyticsData();
    return { ...getDefaultAnalyticsData(), ...JSON.parse(raw) };
  } catch (e) {
    console.warn("[Analytics] データの読み込みに失敗しました:", e);
    return getDefaultAnalyticsData();
  }
}

// データ保存
function saveAnalyticsData(data) {
  try {
    data.lastUpdated = new Date().toISOString();
    localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn("[Analytics] データの保存に失敗しました:", e);
  }
}

/* =========================================================
   データ記録用フック（※通常プレイ時のみ実行・テスト時は完全遮断）
   ========================================================= */

// ① ゲーム開始時
function recordAnalyticsGameStart(mode) {
  if (state.isTestMode) return; // テスト時は遮断

  const data = getAnalyticsData();
  data.totalPlays += 1;
  if (data.modePlays[mode] !== undefined) {
    data.modePlays[mode] += 1;
  }
  saveAnalyticsData(data);
}

// ② 問題回答時
function recordAnalyticsAnswer(questionId, isCorrect) {
  if (state.isTestMode) return; // テスト時は遮断
  if (!questionId) return;

  const data = getAnalyticsData();
  if (!data.questionStats[questionId]) {
    data.questionStats[questionId] = { attempts: 0, corrects: 0 };
  }
  data.questionStats[questionId].attempts += 1;
  if (isCorrect) {
    data.questionStats[questionId].corrects += 1;
  }
  saveAnalyticsData(data);
}

// ③ リタイア・途中離脱時
function recordAnalyticsDropout() {
  if (state.isTestMode) return; // テスト時は遮断

  const slot = currentScheduleSlot();
  const currentDay = slot ? slot.weekdayName : "月";

  const data = getAnalyticsData();
  if (data.dropoutsByDay[currentDay] !== undefined) {
    data.dropoutsByDay[currentDay] += 1;
  }
  saveAnalyticsData(data);
}

// ④ 最終クリア・エンディング到達時
function recordAnalyticsClear(finalMoney) {
  if (state.isTestMode) return; // テスト時は遮断

  const data = getAnalyticsData();
  data.completedPlays += 1;
  data.totalScoreSum += Number(finalMoney) || 0;
  if (data.modeClears[state.mode] !== undefined) {
    data.modeClears[state.mode] += 1;
  }
  saveAnalyticsData(data);
}

/* =========================================================
   制作・分析画面の集計 ＆ UI描画
   ========================================================= */

function openAnalyticsModal() {
  const modal = document.getElementById("analytics-modal");
  if (!modal) return;

  renderAnalyticsDashboard();
  modal.classList.remove("is-hidden");
}

function closeAnalyticsModal() {
  const modal = document.getElementById("analytics-modal");
  if (modal) {
    modal.classList.add("is-hidden");
  }
}

function renderAnalyticsDashboard() {
  const data = getAnalyticsData();
  const filterMode = document.getElementById("analytics-mode-filter") ? document.getElementById("analytics-mode-filter").value : "all";

  // 1. サマリー計算
  const totalPlays = data.totalPlays;
  const completedPlays = data.completedPlays;
  const clearRate = totalPlays > 0 ? ((completedPlays / totalPlays) * 100).toFixed(1) : 0;
  const avgScore = completedPlays > 0 ? Math.round(data.totalScoreSum / completedPlays) : 0;

  document.getElementById("stat-total-plays").textContent = `${totalPlays.toLocaleString()} 回`;
  document.getElementById("stat-clear-rate").textContent = `${clearRate} %`;
  document.getElementById("stat-avg-score").textContent = `¥${avgScore.toLocaleString()}`;

  // 2. モード別プレイ数
  document.getElementById("stat-mode-elementary").textContent = `${data.modePlays.elementary || 0} 回`;
  document.getElementById("stat-mode-teen").textContent = `${data.modePlays.teen || 0} 回`;
  document.getElementById("stat-mode-adult").textContent = `${data.modePlays.adult || 0} 回`;
  document.getElementById("stat-mode-senior").textContent = `${data.modePlays.senior || 0} 回`;

  // 3. 曜日別離脱率
  const dropContainer = document.getElementById("analytics-drop-chart");
  if (dropContainer) {
    dropContainer.innerHTML = "";
    const days = ["月", "火", "水", "木", "金", "土", "日"];
    const totalDrops = Object.values(data.dropoutsByDay).reduce((a, b) => a + b, 0);

    days.forEach(day => {
      const dropCount = data.dropoutsByDay[day] || 0;
      const rate = totalDrops > 0 ? ((dropCount / totalDrops) * 100).toFixed(1) : 0;

      const row = document.createElement("div");
      row.className = "drop-chart-row";
      row.innerHTML = `
        <span class="drop-day-label">${day}曜</span>
        <div class="drop-bar-track">
          <div class="drop-bar-fill" style="width: ${rate}%;"></div>
        </div>
        <span class="drop-rate-text">${dropCount}人 (${rate}%)</span>
      `;
      dropContainer.appendChild(row);
    });
  }

  // 4. 問題別正答率の計算＆リスト生成
  renderQuestionStatsList(data, filterMode);
}

function renderQuestionStatsList(data, filterMode) {
  const listContainer = document.getElementById("analytics-q-list");
  if (!listContainer) return;
  listContainer.innerHTML = "";

  const allQuestions = [];
  if (typeof QUESTIONS_ELEMENTARY !== "undefined") {
    QUESTIONS_ELEMENTARY.forEach((q, i) => allQuestions.push({ ...q, modeKey: "elementary", modeLabel: "小学生", qNum: i + 1 }));
  }
  if (typeof QUESTIONS_TEEN !== "undefined") {
    QUESTIONS_TEEN.forEach((q, i) => allQuestions.push({ ...q, modeKey: "teen", modeLabel: "中高生", qNum: i + 1 }));
  }
  if (typeof QUESTIONS_ADULT !== "undefined") {
    QUESTIONS_ADULT.forEach((q, i) => allQuestions.push({ ...q, modeKey: "adult", modeLabel: "一般", qNum: i + 1 }));
  }
  if (typeof QUESTIONS_SENIOR !== "undefined") {
    QUESTIONS_SENIOR.forEach((q, i) => allQuestions.push({ ...q, modeKey: "senior", modeLabel: "高齢者", qNum: i + 1 }));
  }

  const calculatedStats = [];

  allQuestions.forEach(q => {
    if (filterMode !== "all" && q.modeKey !== filterMode) return;

    const stat = data.questionStats[q.id] || { attempts: 0, corrects: 0 };
    const attempts = stat.attempts;
    const corrects = stat.corrects;
    const rate = attempts > 0 ? ((corrects / attempts) * 100).toFixed(1) : null;

    calculatedStats.push({
      ...q,
      attempts,
      corrects,
      rate: rate !== null ? Number(rate) : null
    });
  });

  // ワースト問題・ベスト問題のサマリー特定
  const validRanked = calculatedStats.filter(s => s.attempts >= 1);
  validRanked.sort((a, b) => (a.rate || 0) - (b.rate || 0));

  const worstEl = document.getElementById("stat-worst-question");
  const bestEl = document.getElementById("stat-best-question");

  if (worstEl) {
    if (validRanked.length > 0) {
      const worst = validRanked[0];
      worstEl.textContent = `${worst.modeLabel} Q${worst.qNum} (${worst.rate}%)`;
    } else {
      worstEl.textContent = "データなし";
    }
  }

  if (bestEl) {
    if (validRanked.length > 0) {
      const best = validRanked[validRanked.length - 1];
      bestEl.textContent = `${best.modeLabel} Q${best.qNum} (${best.rate}%)`;
    } else {
      bestEl.textContent = "データなし";
    }
  }

  // 問題一覧の表示
  calculatedStats.forEach(q => {
    const rateText = q.rate !== null ? `${q.rate}%` : "未プレイ";
    const attemptsText = `${q.corrects} / ${q.attempts}問 正解`;

    let barClass = "";
    if (q.rate !== null) {
      if (q.rate < 50) barClass = "is-low";
      else if (q.rate < 80) barClass = "is-mid";
    }

    const item = document.createElement("div");
    item.className = "analytics-q-item";
    item.innerHTML = `
      <div class="q-item-header">
        <span class="q-item-title">[${q.modeLabel} Q${q.qNum}] ${q.title.replace(/<[^>]+>/g, '')}</span>
        <span class="q-item-rate">${rateText} (${attemptsText})</span>
      </div>
      <div class="q-item-bar-track">
        <div class="q-item-bar-fill ${barClass}" style="width: ${q.rate !== null ? q.rate : 0}%;"></div>
      </div>
    `;
    listContainer.appendChild(item);
  });
}

/* =========================================================
   CSVエクスポート ＆ データリセット
   ========================================================= */

// 分析データをCSVダウンロード
function exportAnalyticsCSV() {
  const data = getAnalyticsData();
  let csv = "\uFEFF"; // UTF-8 BOM
  csv += "SCAM HUNTER - プレイ分析データエクスポート\n";
  csv += `エクスポート日時,${new Date().toLocaleString("ja-JP")}\n\n`;

  // サマリー
  csv += "【基本サマリー】\n";
  csv += `総プレイ回数,${data.totalPlays}\n`;
  csv += `クリア回数,${data.completedPlays}\n`;
  csv += `クリア率,${data.totalPlays > 0 ? ((data.completedPlays / data.totalPlays) * 100).toFixed(1) : 0}%\n`;
  csv += `平均スコア,¥${data.completedPlays > 0 ? Math.round(data.totalScoreSum / data.completedPlays) : 0}\n\n`;

  // モード別
  csv += "【モード別プレイ数】\n";
  csv += `小学生モード,${data.modePlays.elementary || 0}\n`;
  csv += `中高生モード,${data.modePlays.teen || 0}\n`;
  csv += `一般モード,${data.modePlays.adult || 0}\n`;
  csv += `高齢者モード,${data.modePlays.senior || 0}\n\n`;

  // 曜日別離脱
  csv += "【曜日別離脱数】\n";
  Object.entries(data.dropoutsByDay).forEach(([day, count]) => {
    csv += `${day}曜日,${count}人\n`;
  });
  csv += "\n";

  // 問題別詳細
  csv += "【問題別正答率】\n";
  csv += "モード,問題番号,問題ID,タイトル,回答数,正解数,正答率\n";

  const allQuestions = [];
  if (typeof QUESTIONS_ELEMENTARY !== "undefined") QUESTIONS_ELEMENTARY.forEach((q, i) => allQuestions.push({ ...q, mode: "小学生", num: i + 1 }));
  if (typeof QUESTIONS_TEEN !== "undefined") QUESTIONS_TEEN.forEach((q, i) => allQuestions.push({ ...q, mode: "中高生", num: i + 1 }));
  if (typeof QUESTIONS_ADULT !== "undefined") QUESTIONS_ADULT.forEach((q, i) => allQuestions.push({ ...q, mode: "一般", num: i + 1 }));
  if (typeof QUESTIONS_SENIOR !== "undefined") QUESTIONS_SENIOR.forEach((q, i) => allQuestions.push({ ...q, mode: "高齢者", num: i + 1 }));

  allQuestions.forEach(q => {
    const stat = data.questionStats[q.id] || { attempts: 0, corrects: 0 };
    const rate = stat.attempts > 0 ? ((stat.corrects / stat.attempts) * 100).toFixed(1) : "0";
    const cleanTitle = (q.title || "").replace(/<[^>]+>/g, '').replace(/,/g, '、');
    csv += `${q.mode},Q${q.num},${q.id},"${cleanTitle}",${stat.attempts},${stat.corrects},${rate}%\n`;
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `scam_hunter_analytics_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// 蓄積データを安全にリセット
function resetAnalyticsData() {
  if (confirm("【警告】蓄積されたプレイ分析データをすべてリセット（初期化）しますか？\n※この操作は取り消せません。")) {
    saveAnalyticsData(getDefaultAnalyticsData());
    renderAnalyticsDashboard();
    alert("分析データを初期化しました。");
  }
}