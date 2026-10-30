/* =========================================================
   analytics.js
   製作者用「制作・分析」データ管理・自動集計・CSV出力・リセット
   【Step 3: Firestoreクラウド集計・変換アダプター・隔離救済UI対応版】
   ========================================================= */

const ANALYTICS_STORAGE_KEY = "scam_hunter_analytics_v1";
const OFFLINE_QUEUE_KEY = "scam_hunter_offline_queue_v1";
const PENDING_SURVEY_KEY = "scam_hunter_pending_survey_v1";
const QUARANTINE_QUEUE_KEY = "scam_hunter_quarantine_queue_v1";
const SUBMITTED_IDS_KEY = "scam_hunter_submitted_ids_v1";

let principleChartInstance = null;
let cloudAnalyticsData = null; // クラウドから取得した集計済みデータを保持

// =========================================================
// 1. セッション管理 & ストレージヘルパー
// =========================================================

function generateSessionId() {
  const ts = Date.now().toString(36);
  const rand = Math.random().toString(36).substring(2, 10);
  return `sess_${ts}_${rand}`;
}

function getSubmittedIds() {
  try {
    const raw = localStorage.getItem(SUBMITTED_IDS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function markSessionAsSubmitted(sessionId) {
  if (!sessionId) return;
  try {
    const ids = getSubmittedIds();
    if (!ids.includes(sessionId)) {
      ids.push(sessionId);
      localStorage.setItem(SUBMITTED_IDS_KEY, JSON.stringify(ids));
    }
  } catch (e) {}
}

function getOfflineQueue() {
  try {
    const raw = localStorage.getItem(OFFLINE_QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveOfflineQueue(queue) {
  try {
    localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));
  } catch (e) {}
}

function getQuarantineQueue() {
  try {
    const raw = localStorage.getItem(QUARANTINE_QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveQuarantineQueue(queue) {
  try {
    localStorage.setItem(QUARANTINE_QUEUE_KEY, JSON.stringify(queue));
  } catch (e) {}
}

function pushToQuarantineQueue(item) {
  if (!item || !item.sessionId) return;
  const q = getQuarantineQueue();
  if (!q.some(x => x.sessionId === item.sessionId)) {
    q.push({
      ...item,
      quarantinedAt: new Date().toISOString()
    });
    saveQuarantineQueue(q);
  }
}

// =========================================================
// 2. クラウド用セッションペイロード構築
// =========================================================

function buildSessionPayload(options = {}) {
  const auth = typeof getFirebaseAuth === "function" ? getFirebaseAuth() : null;
  const ownerUid = (auth && auth.currentUser) ? auth.currentUser.uid : "ANONYMOUS_LOCAL";
  const sid = state.sessionId || generateSessionId();
  state.sessionId = sid;

  return {
    sessionId: sid,
    ownerUid: ownerUid,
    createdAt: new Date().toISOString(),
    mode: state.mode || "adult",
    playerName: (typeof getPlayerRawName === "function" ? getPlayerRawName() : (state.playerName || "あなた")).slice(0, 20),
    deviceLayout: state.deviceLayout === "desktop" ? "desktop" : "mobile",
    hasPlayedBefore: Boolean(state.hasPlayedBefore),
    isCompleted: options.isCompleted !== undefined ? options.isCompleted : true,
    dropoutDay: options.dropoutDay || null,
    finalMoney: Math.max(-500000, Math.min(100000, Number(state.money) || 0)),
    correctCount: Math.min(10, Math.max(0, Number(state.correctCount) || 0)),
    fooledCount: Math.min(10, Math.max(0, Number(state.fooledCount) || 0)),
    damages: {
      money: Math.max(0, Number(state.damages.money) || 0),
      personalInfo: Math.min(10, Math.max(0, Number(state.damages.personalInfo) || 0)),
      account: Math.min(10, Math.max(0, Number(state.damages.account) || 0)),
      line: Math.min(10, Math.max(0, Number(state.damages.line) || 0))
    },
    answers: Array.isArray(state.answeredQuestions) ? state.answeredQuestions.slice(0, 10) : [],
    survey: options.survey || null,
    isTestMode: false
  };
}

// =========================================================
// 3. 非破壊アトミック送信 & オフライン分離
// =========================================================

async function sendSessionToFirestore(payload) {
  if (state.isTestMode || payload.isTestMode) return;

  const db = typeof getFirestoreDb === "function" ? getFirestoreDb() : null;
  const isOnline = navigator.onLine && (typeof isFirebaseCloudReady === "function" ? isFirebaseCloudReady() : false);

  if (!db || !isOnline) {
    enqueueOfflineSession(payload);
    return;
  }

  const submittedIds = getSubmittedIds();
  if (submittedIds.includes(payload.sessionId)) {
    return;
  }

  try {
    const docRef = db.collection("game_sessions").doc(payload.sessionId);
    const finalData = {
      ...payload,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    await db.runTransaction(async (transaction) => {
      const snap = await transaction.get(docRef);
      if (snap.exists) {
        throw new Error("ALREADY_EXISTS");
      }
      transaction.set(docRef, finalData);
    });

    markSessionAsSubmitted(payload.sessionId);
    removeSessionFromOfflineQueue(payload.sessionId);
    console.log("[Firebase] セッションの新規保存に成功しました:", payload.sessionId);
  } catch (error) {
    handleSessionSendError(error, payload);
  }
}

async function handleSessionSendError(error, payload) {
  console.warn("[Firebase] セッション送信エラーを検知:", error);

  if (error.message === "ALREADY_EXISTS") {
    markSessionAsSubmitted(payload.sessionId);
    removeSessionFromOfflineQueue(payload.sessionId);
    return;
  }

  const code = error.code || "";
  const isNetworkIssue = !navigator.onLine || code === "unavailable" || code === "deadline-exceeded";

  if (isNetworkIssue) {
    enqueueOfflineSession(payload);
    return;
  }

  if (code === "permission-denied") {
    const db = typeof getFirestoreDb === "function" ? getFirestoreDb() : null;
    if (db) {
      try {
        const snap = await db.collection("game_sessions").doc(payload.sessionId).get();
        if (snap.exists) {
          markSessionAsSubmitted(payload.sessionId);
          removeSessionFromOfflineQueue(payload.sessionId);
          return;
        }
      } catch (e) {}
    }

    pushToQuarantineQueue({
      sessionId: payload.sessionId,
      payload: payload,
      error: code
    });
    removeSessionFromOfflineQueue(payload.sessionId);
    return;
  }

  pushToQuarantineQueue({
    sessionId: payload.sessionId,
    payload: payload,
    error: error.message || "UNKNOWN"
  });
  removeSessionFromOfflineQueue(payload.sessionId);
}

function enqueueOfflineSession(payload) {
  if (state.isTestMode || payload.isTestMode) return;
  const queue = getOfflineQueue();
  if (!queue.some(item => item.sessionId === payload.sessionId)) {
    queue.push({
      sessionId: payload.sessionId,
      payload: payload,
      queuedAt: new Date().toISOString()
    });
    saveOfflineQueue(queue);
    console.log("[Firebase] オフラインキューにセッションを退避しました:", payload.sessionId);
  }
}

function removeSessionFromOfflineQueue(sessionId) {
  const queue = getOfflineQueue().filter(item => item.sessionId !== sessionId);
  saveOfflineQueue(queue);
}

async function flushOfflineQueue() {
  if (state.isTestMode) return;
  if (!navigator.onLine || (typeof isFirebaseCloudReady === "function" && !isFirebaseCloudReady())) return;

  const queue = getOfflineQueue();
  if (queue.length === 0) return;

  console.log(`[Firebase] オフラインキュー (${queue.length}件) の再送を試行します...`);
  for (const item of queue) {
    if (!item.payload.isTestMode) {
      await sendSessionToFirestore(item.payload);
    } else {
      removeSessionFromOfflineQueue(item.sessionId);
    }
  }
}

// =========================================================
// 4. アンケート前離脱保護（ステージングバッファ）
// =========================================================

function stagePendingSession() {
  if (state.isTestMode) return;
  const payload = buildSessionPayload({ isCompleted: true, survey: null });
  try {
    localStorage.setItem(PENDING_SURVEY_KEY, JSON.stringify(payload));
  } catch (e) {}
}

function commitFinalSession(surveyAnswers = null) {
  if (state.isTestMode) return;

  let payload = null;
  try {
    const raw = localStorage.getItem(PENDING_SURVEY_KEY);
    if (raw) payload = JSON.parse(raw);
  } catch (e) {}

  if (!payload) {
    payload = buildSessionPayload({ isCompleted: true, survey: surveyAnswers });
  } else {
    payload.survey = surveyAnswers;
  }

  try {
    localStorage.removeItem(PENDING_SURVEY_KEY);
  } catch (e) {}

  sendSessionToFirestore(payload);
}

function commitDropoutSession(dropoutDay) {
  if (state.isTestMode) return;

  try {
    localStorage.removeItem(PENDING_SURVEY_KEY);
  } catch (e) {}

  const payload = buildSessionPayload({
    isCompleted: false,
    dropoutDay: dropoutDay || "月",
    survey: null
  });

  sendSessionToFirestore(payload);
}

function reclaimPendingSurveySession() {
  if (state.isTestMode) return;

  try {
    const raw = localStorage.getItem(PENDING_SURVEY_KEY);
    if (raw) {
      const payload = JSON.parse(raw);
      localStorage.removeItem(PENDING_SURVEY_KEY);
      if (!payload.isTestMode) {
        console.log("[Firebase] 前回のアンケート未回答セッションを回収・確定送信します:", payload.sessionId);
        sendSessionToFirestore(payload);
      }
    }
  } catch (e) {}
}

// =========================================================
// 5. 既存ローカル分析データ管理（代替描画用に維持）
// =========================================================

function getDefaultAnalyticsData() {
  return {
    totalPlays: 0,
    completedPlays: 0,
    totalScoreSum: 0,
    modePlays: { elementary: 0, teen: 0, adult: 0, senior: 0 },
    modeClears: { elementary: 0, teen: 0, adult: 0, senior: 0 },
    questionStats: {},
    dropoutsByDay: { "月": 0, "火": 0, "水": 0, "木": 0, "金": 0, "土": 0, "日": 0 },
    principleFailures: { speak: 0, pay: 0, fooled: 0 },
    surveys: [],
    lastUpdated: new Date().toISOString()
  };
}

function getAnalyticsData() {
  try {
    const raw = localStorage.getItem(ANALYTICS_STORAGE_KEY);
    if (!raw) return getDefaultAnalyticsData();
    const parsed = JSON.parse(raw);
    return {
      ...getDefaultAnalyticsData(),
      ...parsed,
      principleFailures: {
        ...getDefaultAnalyticsData().principleFailures,
        ...(parsed.principleFailures || {})
      },
      surveys: Array.isArray(parsed.surveys) ? parsed.surveys : []
    };
  } catch (e) {
    return getDefaultAnalyticsData();
  }
}

function saveAnalyticsData(data) {
  try {
    data.lastUpdated = new Date().toISOString();
    localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {}
}

function recordAnalyticsGameStart(mode) {
  if (state.isTestMode) return;

  reclaimPendingSurveySession();

  state.sessionId = generateSessionId();
  state.isSessionSubmitted = false;

  const data = getAnalyticsData();
  data.totalPlays += 1;
  if (data.modePlays[mode] !== undefined) {
    data.modePlays[mode] += 1;
  }
  saveAnalyticsData(data);
}

function recordAnalyticsAnswer(questionId, isCorrect, principleTag, answerDetail) {
  if (state.isTestMode || !questionId) return;

  const data = getAnalyticsData();
  if (!data.questionStats[questionId]) {
    data.questionStats[questionId] = { attempts: 0, corrects: 0 };
  }
  data.questionStats[questionId].attempts += 1;
  if (isCorrect) {
    data.questionStats[questionId].corrects += 1;
  } else if (principleTag && data.principleFailures[principleTag] !== undefined) {
    data.principleFailures[principleTag] += 1;
  }
  saveAnalyticsData(data);
}

function recordAnalyticsDropout() {
  if (state.isTestMode) return;

  const slot = currentScheduleSlot();
  const currentDay = slot ? slot.weekdayName : "月";

  const data = getAnalyticsData();
  if (data.dropoutsByDay[currentDay] !== undefined) {
    data.dropoutsByDay[currentDay] += 1;
  }
  saveAnalyticsData(data);
}

function recordAnalyticsClear(finalMoney) {
  if (state.isTestMode) return;

  const data = getAnalyticsData();
  data.completedPlays += 1;
  data.totalScoreSum += Number(finalMoney) || 0;
  if (data.modeClears[state.mode] !== undefined) {
    data.modeClears[state.mode] += 1;
  }
  saveAnalyticsData(data);
}

function recordSurveySubmission(answers) {
  if (state.isTestMode) return;

  const data = getAnalyticsData();
  data.surveys.push({
    submittedAt: new Date().toLocaleString("ja-JP"),
    playerName: getPlayerRawName(),
    mode: state.mode,
    ...answers
  });
  saveAnalyticsData(data);

  commitFinalSession(answers);
}

// =========================================================
// 6. クラウドデータ変換アダプター (Firestore -> 既存集計構造)
// =========================================================

function buildAnalyticsFromFirestoreDocs(snapshot) {
  const data = getDefaultAnalyticsData();
  const docs = [];
  const seenIds = new Set();

  // テストデータの混入と二重計上を除外
  snapshot.forEach(doc => {
    const d = doc.data();
    if (!seenIds.has(d.sessionId) && d.isTestMode === false) {
      seenIds.add(d.sessionId);
      docs.push(d);
    }
  });

  data.totalPlays = docs.length;

  docs.forEach(doc => {
    if (data.modePlays[doc.mode] !== undefined) {
      data.modePlays[doc.mode] += 1;
    }

    if (doc.isCompleted) {
      data.completedPlays += 1;
      data.totalScoreSum += (Number(doc.finalMoney) || 0);
      if (data.modeClears[doc.mode] !== undefined) {
        data.modeClears[doc.mode] += 1;
      }
    } else {
      if (doc.dropoutDay && data.dropoutsByDay[doc.dropoutDay] !== undefined) {
        data.dropoutsByDay[doc.dropoutDay] += 1;
      }
    }

    if (Array.isArray(doc.answers)) {
      doc.answers.forEach(ans => {
        const qId = ans.questionId;
        if (!data.questionStats[qId]) {
          data.questionStats[qId] = { attempts: 0, corrects: 0 };
        }
        data.questionStats[qId].attempts += 1;
        if (ans.isCorrect) {
          data.questionStats[qId].corrects += 1;
        } else {
          const pTag = ans.principleTag;
          if (pTag && data.principleFailures[pTag] !== undefined) {
            data.principleFailures[pTag] += 1;
          }
        }
      });
    }

    if (doc.survey) {
      data.surveys.push({
        submittedAt: doc.survey.submittedAt || (doc.createdAt ? new Date(doc.createdAt.seconds * 1000).toLocaleString("ja-JP") : ""),
        playerName: doc.playerName,
        mode: doc.mode,
        ...doc.survey
      });
    }
  });

  return data;
}

// =========================================================
// 7. UI描画・ダッシュボード・CSV・隔離データ救済
// =========================================================

async function openAnalyticsModal() {
  const modal = document.getElementById("analytics-modal");
  if (!modal) return;

  const db = typeof getFirestoreDb === "function" ? getFirestoreDb() : null;
  const isOnline = navigator.onLine;

  if (!db || !isOnline) {
    alert("オフラインのため、クラウドデータの取得に失敗しました。ローカルデータを表示します。");
    cloudAnalyticsData = null;
    renderAnalyticsDashboard();
    modal.classList.remove("is-hidden");
    return;
  }

  // 簡易ローディング表示
  const summaryGrid = document.querySelector(".analytics-summary-grid");
  if (summaryGrid) {
    document.getElementById("stat-total-plays").textContent = "読込中...";
    document.getElementById("stat-clear-rate").textContent = "読込中...";
    document.getElementById("stat-avg-score").textContent = "読込中...";
    document.getElementById("stat-survey-count").textContent = "読込中...";
  }
  
  modal.classList.remove("is-hidden");

  try {
    const snapshot = await db.collection("game_sessions").get();
    cloudAnalyticsData = buildAnalyticsFromFirestoreDocs(snapshot);
    renderAnalyticsDashboard();
    checkAndRenderQuarantineQueue();
  } catch (error) {
    console.error("[Firebase] データ取得エラー:", error);
    alert("クラウドデータの取得に失敗しました。権限がないか通信エラーです。ローカルデータを表示します。");
    cloudAnalyticsData = null;
    renderAnalyticsDashboard();
  }
}

function checkAndRenderQuarantineQueue() {
  let banner = document.getElementById("quarantine-rescue-banner");
  if (banner) banner.remove();

  const qQueue = getQuarantineQueue();
  if (qQueue.length === 0) return;

  const container = document.querySelector(".analytics-body");
  const actionBar = document.querySelector(".analytics-actions-bar");
  
  banner = document.createElement("div");
  banner.id = "quarantine-rescue-banner";
  banner.style.cssText = "background: #FFF5F5; border: 2px solid #E85C4A; padding: 12px; border-radius: 8px; margin-bottom: 16px;";
  
  banner.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
      <div>
        <strong style="color: #E85C4A;">⚠️ 未反映の隔離データが ${qQueue.length} 件あります</strong>
        <p style="margin: 4px 0 0; font-size: 13px; color: #4A5A7C;">ルール違反や通信エラーで弾かれたデータです。確認してクラウドへ反映できます。</p>
      </div>
      <div style="display: flex; gap: 8px;">
        <button id="btn-rescue-quarantine" style="background: #E85C4A; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-weight: bold; cursor: pointer;">クラウドに反映</button>
        <button id="btn-discard-quarantine" style="background: #FFFFFF; color: #E85C4A; border: 1px solid #E85C4A; padding: 6px 12px; border-radius: 4px; font-weight: bold; cursor: pointer;">破棄する</button>
      </div>
    </div>
  `;
  
  container.insertBefore(banner, actionBar.nextSibling);

  document.getElementById("btn-rescue-quarantine").onclick = async () => {
    const db = typeof getFirestoreDb === "function" ? getFirestoreDb() : null;
    if (!db) {
      alert("データベースに接続できません。");
      return;
    }
    const btn = document.getElementById("btn-rescue-quarantine");
    btn.textContent = "処理中...";
    btn.disabled = true;

    const remaining = [];
    let rescuedCount = 0;
    
    for (const item of qQueue) {
      try {
        const docRef = db.collection("game_sessions").doc(item.sessionId);
        const snap = await docRef.get();
        if (snap.exists) {
          // すでに存在するので上書きせずキューから安全に削除
          rescuedCount++;
        } else {
          // 存在しないので、サーバー時刻を再注入して新規作成（管理者権限で実行）
          const finalData = { ...item.payload, createdAt: firebase.firestore.FieldValue.serverTimestamp() };
          await docRef.set(finalData);
          rescuedCount++;
        }
      } catch (e) {
        console.error("[Firebase] 救済処理中にエラー:", e);
        remaining.push(item);
      }
    }
    
    saveQuarantineQueue(remaining);
    alert(`${rescuedCount}件の隔離データの処理が完了しました。`);
    
    // UIを更新
    if (remaining.length === 0) {
      const b = document.getElementById("quarantine-rescue-banner");
      if (b) b.remove();
    } else {
      checkAndRenderQuarantineQueue();
    }
  };

  document.getElementById("btn-discard-quarantine").onclick = () => {
    if (confirm("テスト時のゴミデータなどを破棄しますか？この操作は取り消せません。")) {
      saveQuarantineQueue([]);
      const b = document.getElementById("quarantine-rescue-banner");
      if (b) b.remove();
    }
  };
}

function closeAnalyticsModal() {
  const modal = document.getElementById("analytics-modal");
  if (modal) modal.classList.add("is-hidden");
  if (typeof isDevAuthenticated !== "undefined" && isDevAuthenticated) {
    if (typeof openDevDashboard === "function") openDevDashboard();
  }
}

function renderAnalyticsDashboard() {
  // クラウドデータが存在すればそれを使用、なければローカルデータを代替使用
  const data = cloudAnalyticsData || getAnalyticsData();
  const filterMode = document.getElementById("analytics-mode-filter") ? document.getElementById("analytics-mode-filter").value : "all";

  const totalPlays = data.totalPlays;
  const completedPlays = data.completedPlays;
  const clearRate = totalPlays > 0 ? ((completedPlays / totalPlays) * 100).toFixed(1) : 0;
  const avgScore = completedPlays > 0 ? Math.round(data.totalScoreSum / completedPlays) : 0;
  const surveyCount = data.surveys.length;

  document.getElementById("stat-total-plays").textContent = `${totalPlays.toLocaleString()} 回`;
  document.getElementById("stat-clear-rate").textContent = `${clearRate} %`;
  document.getElementById("stat-avg-score").textContent = `¥${avgScore.toLocaleString()}`;
  document.getElementById("stat-survey-count").textContent = `${surveyCount.toLocaleString()} 件`;

  document.getElementById("stat-mode-elementary").textContent = `${data.modePlays.elementary || 0} 回`;
  document.getElementById("stat-mode-teen").textContent = `${data.modePlays.teen || 0} 回`;
  document.getElementById("stat-mode-adult").textContent = `${data.modePlays.adult || 0} 回`;
  document.getElementById("stat-mode-senior").textContent = `${data.modePlays.senior || 0} 回`;

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

  renderPrincipleChart(data);
  renderSurveyDashboard(data);
  renderQuestionStatsList(data, filterMode);
}

function renderPrincipleChart(data) {
  const container = document.getElementById("principle-chart-container");
  if (!container) return;
  container.innerHTML = "";

  const speak = data.principleFailures.speak || 0;
  const pay = data.principleFailures.pay || 0;
  const fooled = data.principleFailures.fooled || 0;
  const total = speak + pay + fooled;

  if (total === 0) {
    container.innerHTML = `
      <p class="principle-empty-notice">
        ※ まだプレイでの不正解（被害データ）が記録されていません。<br>
        プレイで被害が発生すると、3原則の弱点内訳が自動で円グラフ化されます。
      </p>
    `;
    return;
  }

  const rateSpeak = ((speak / total) * 100).toFixed(1);
  const ratePay = ((pay / total) * 100).toFixed(1);
  const rateFooled = ((fooled / total) * 100).toFixed(1);

  const canvasBox = document.createElement("div");
  canvasBox.className = "principle-chart-canvas-box";

  const legendBox = document.createElement("div");
  legendBox.className = "principle-legend-box";
  legendBox.innerHTML = `
    <div class="principle-legend-item">
      <div class="legend-tag-group">
        <span class="legend-color-dot dot-speak"></span>
        <span class="legend-label">①「話さない」違反（情報流出）</span>
      </div>
      <span class="legend-val">${speak}件 (${rateSpeak}%)</span>
    </div>
    <div class="principle-legend-item">
      <div class="legend-tag-group">
        <span class="legend-color-dot dot-pay"></span>
        <span class="legend-label">②「渡さない」違反（送金・電子マネー）</span>
      </div>
      <span class="legend-val">${pay}件 (${ratePay}%)</span>
    </div>
    <div class="principle-legend-item">
      <div class="legend-tag-group">
        <span class="legend-color-dot dot-fooled"></span>
        <span class="legend-label">③「騙されない」違反（言いくるめ）</span>
      </div>
      <span class="legend-val">${fooled}件 (${rateFooled}%)</span>
    </div>
  `;

  if (typeof window.Chart !== "undefined") {
    const canvas = document.createElement("canvas");
    canvas.id = "analytics-principle-canvas";
    canvasBox.appendChild(canvas);
    container.appendChild(canvasBox);
    container.appendChild(legendBox);

    if (principleChartInstance) principleChartInstance.destroy();

    try {
      principleChartInstance = new Chart(canvas, {
        type: "doughnut",
        data: {
          labels: ["話さない違反", "渡さない違反", "騙されない違反"],
          datasets: [{
            data: [speak, pay, fooled],
            backgroundColor: ["#E85C4A", "#D9534F", "#F5A623"],
            borderWidth: 2,
            borderColor: "#FFFFFF"
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: (ctx) => ` ${ctx.label}: ${ctx.raw}件` } }
          },
          cutout: "55%"
        }
      });
      return;
    } catch (e) {}
  }

  canvasBox.innerHTML = createSvgDonutChart([
    { value: speak, color: "#E85C4A" },
    { value: pay, color: "#D9534F" },
    { value: fooled, color: "#F5A623" }
  ], total);

  container.appendChild(canvasBox);
  container.appendChild(legendBox);
}

function createSvgDonutChart(slices, total) {
  let cumulativePercent = 0;
  function getCoordinatesForPercent(percent) {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  }

  const paths = slices.map(slice => {
    if (slice.value === 0) return "";
    const startPercent = cumulativePercent;
    cumulativePercent += slice.value / total;
    const endPercent = cumulativePercent;

    if (slice.value === total) {
      return `<circle cx="0" cy="0" r="0.8" fill="none" stroke="${slice.color}" stroke-width="0.38" />`;
    }

    const [startX, startY] = getCoordinatesForPercent(startPercent);
    const [endX, endY] = getCoordinatesForPercent(endPercent);
    const largeArcFlag = (slice.value / total) > 0.5 ? 1 : 0;

    return `
      <path d="M ${startX} ${startY} A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}"
            fill="none" stroke="${slice.color}" stroke-width="0.38" />
    `;
  }).join("");

  return `
    <svg viewBox="-1.2 -1.2 2.4 2.4" style="transform: rotate(-90deg); width: 100%; height: 100%;">
      ${paths}
    </svg>
  `;
}

function renderSurveyDashboard(data) {
  const container = document.getElementById("survey-analytics-dashboard");
  if (!container) return;
  container.innerHTML = "";

  const list = data.surveys || [];
  if (list.length === 0) {
    container.innerHTML = `
      <p class="principle-empty-notice">
        ※ まだ受講者アンケートの回答データがありません。<br>
        ゲームクリア後にアンケートが送信されると、ここに全10問のグラフ・集計が自動表示されます。
      </p>
    `;
    return;
  }

  const choiceQuestions = [
    { key: "q1", title: "Q1. 防犯意識の変化", labels: { "1": "大いに高まった", "2": "高まった", "3": "あまり変わらない", "4": "変わらない" } },
    { key: "q2", title: "Q2. 防犯3原則の理解度", labels: { "1": "とても分かりやすかった", "2": "分かりやすかった", "3": "少し難しかった", "4": "難しかった" } },
    { key: "q3", title: "Q3. 実生活での実践意欲", labels: { "1": "必ず確認・相談する", "2": "気をつけて行動する", "3": "少し不安がある" } },
    { key: "q4", title: "Q4. 全体的な満足度", labels: { "1": "大変満足", "2": "満足", "3": "普通", "4": "不満" } },
    { key: "q6", title: "Q6. 詐欺見分け方の理解度", labels: { "1": "とても分かるようになった", "2": "少し分かるようになった", "3": "あまり変わらない", "4": "まだ難しい" } },
    { key: "q7", title: "Q7. 難しかった問題の把握", labels: { "1": "たくさんあった", "2": "いくつかあった", "3": "あまりなかった", "4": "なかった" } },
    { key: "q8", title: "Q8. 解説の有用性", labels: { "1": "とても役立った", "2": "役立った", "3": "あまり役立たなかった", "4": "役立たなかった" } },
    { key: "q9", title: "Q9. 家族・友人への共有意欲", labels: { "1": "ぜひ伝えたい", "2": "できれば伝えたい", "3": "あまり思わない", "4": "思わない" } }
  ];

  const grid = document.createElement("div");
  grid.className = "survey-charts-grid";

  choiceQuestions.forEach(q => {
    const counts = {};
    Object.keys(q.labels).forEach(k => counts[k] = 0);
    list.forEach(ans => {
      const v = ans[q.key];
      if (counts[v] !== undefined) counts[v] += 1;
    });

    const card = document.createElement("div");
    card.className = "survey-stat-card";
    
    let barsHTML = "";
    Object.entries(q.labels).forEach(([valKey, valLabel]) => {
      const c = counts[valKey] || 0;
      const rate = list.length > 0 ? ((c / list.length) * 100).toFixed(1) : 0;
      barsHTML += `
        <div class="survey-bar-row">
          <div class="survey-bar-labels">
            <span>${valLabel}</span>
            <strong>${c}件 (${rate}%)</strong>
          </div>
          <div class="survey-bar-track">
            <div class="survey-bar-fill" style="width: ${rate}%;"></div>
          </div>
        </div>
      `;
    });

    card.innerHTML = `
      <h4 class="survey-stat-qtitle">${q.title}</h4>
      <div class="survey-bars-list">${barsHTML}</div>
    `;
    grid.appendChild(card);
  });

  container.appendChild(grid);

  const textReviewsBox = document.createElement("div");
  textReviewsBox.className = "survey-text-reviews-container";
  
  let q5ItemsHTML = "";
  let q10ItemsHTML = "";

  list.slice().reverse().forEach(ans => {
    if (ans.q5 && ans.q5.trim() !== "") {
      q5ItemsHTML += `<li class="review-comment-item"><strong>${ans.playerName || "受講者"}:</strong> ${ans.q5.replace(/<[^>]+>/g, '')}</li>`;
    }
    if (ans.q10 && ans.q10.trim() !== "") {
      q10ItemsHTML += `<li class="review-comment-item"><strong>${ans.playerName || "受講者"}:</strong> ${ans.q10.replace(/<[^>]+>/g, '')}</li>`;
    }
  });

  textReviewsBox.innerHTML = `
    <div class="review-column">
      <h4 class="review-col-title">💬 Q5. 印象に残った手口・感想（最新順）</h4>
      <ul class="review-comments-list">${q5ItemsHTML || '<li class="no-comment">記述なし</li>'}</ul>
    </div>
    <div class="review-column">
      <h4 class="review-col-title">🛠️ Q10. 改善要望・気になった点（最新順）</h4>
      <ul class="review-comments-list">${q10ItemsHTML || '<li class="no-comment">記述なし</li>'}</ul>
    </div>
  `;

  container.appendChild(textReviewsBox);
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

  calculatedStats.forEach(q => {
    const rateText = q.rate !== null ? `${q.rate}%` : "未プレイ";
    const attemptsText = `${q.corrects} / ${q.attempts}問 正解`;

    let barClass = "";
    if (q.rate !== null) {
      if (q.rate < 50) barClass = "is-low";
      else if (q.rate < 80) barClass = "is-mid";
    }

    const item = document.createElement("div");
    item.className = "analytics-q-item is-playable";
    item.title = "クリックしてこの問題を実演プレイ";
    item.innerHTML = `
      <div class="q-item-header">
        <span class="q-item-title">[${q.modeLabel} Q${q.qNum}] ${q.title.replace(/<[^>]+>/g, '')}</span>
        <div class="q-item-meta-right">
          <span class="q-item-rate">${rateText} (${attemptsText})</span>
          <button type="button" class="btn-q-item-play">🎯 実演</button>
        </div>
      </div>
      <div class="q-item-bar-track">
        <div class="q-item-bar-fill ${barClass}" style="width: ${q.rate !== null ? q.rate : 0}%;"></div>
      </div>
    `;

    item.addEventListener("click", () => {
      launchDirectQuestion(q.id, q.modeKey);
    });

    listContainer.appendChild(item);
  });
}

function launchDirectQuestion(questionId, modeKey) {
  const modal = document.getElementById("analytics-modal");
  if (modal) modal.classList.add("is-hidden");

  state.isTestMode = true;

  const badge = document.getElementById("test-mode-badge");
  const drawer = document.getElementById("test-controller-drawer");
  if (badge) badge.classList.remove("is-hidden");
  if (drawer) {
    drawer.classList.remove("is-hidden");
    drawer.classList.remove("is-collapsed");
    if (typeof updateDrawerArrow === "function") updateDrawerArrow(true);
  }

  state.mode = modeKey;
  const shell = document.getElementById("app-shell");
  if (shell) {
    if (modeKey === "senior") shell.classList.add("is-senior-mode");
    else shell.classList.remove("is-senior-mode");
  }

  if (modeKey === "senior" || modeKey === "adult") {
    state.playerName = "あなた";
    state.selectedItem = null;
  } else {
    state.playerName = state.playerName || "あなた";
    if (!state.selectedItem && typeof ITEMS !== "undefined" && ITEMS.length > 0) {
      state.selectedItem = ITEMS[0];
    }
  }

  let pool = [];
  if (modeKey === "elementary" && typeof QUESTIONS_ELEMENTARY !== "undefined") pool = QUESTIONS_ELEMENTARY;
  else if (modeKey === "teen" && typeof QUESTIONS_TEEN !== "undefined") pool = QUESTIONS_TEEN;
  else if (modeKey === "adult" && typeof QUESTIONS_ADULT !== "undefined") pool = QUESTIONS_ADULT;
  else if (modeKey === "senior" && typeof QUESTIONS_SENIOR !== "undefined") pool = QUESTIONS_SENIOR;

  let targetQuestion = pool.find(q => q.id === questionId);
  if (!targetQuestion) {
    const allPools = [
      ...(typeof QUESTIONS_ELEMENTARY !== "undefined" ? QUESTIONS_ELEMENTARY : []),
      ...(typeof QUESTIONS_TEEN !== "undefined" ? QUESTIONS_TEEN : []),
      ...(typeof QUESTIONS_ADULT !== "undefined" ? QUESTIONS_ADULT : []),
      ...(typeof QUESTIONS_SENIOR !== "undefined" ? QUESTIONS_SENIOR : [])
    ];
    targetQuestion = allPools.find(q => q.id === questionId);
  }

  if (!targetQuestion) {
    alert("指定された問題データが見つかりませんでした。");
    return;
  }

  state.weeklyQuestions = [targetQuestion];
  state.daySchedule = [{
    weekdayIndex: 0,
    dayNumber: "実演",
    weekdayName: "実演",
    periodLabel: "",
    isFirstOfSlot: true,
    isSunday: false
  }];
  state.slotIndex = 0;
  state.dialogueIndex = 0;

  updateStatusBar();
  continueEventFlow();
}

function exportAnalyticsCSV() {
  const data = cloudAnalyticsData || getAnalyticsData();
  let csv = "\uFEFF";
  csv += "SCAM HUNTER - プレイ分析・受講者アンケート総合データエクスポート\n";
  csv += `エクスポート日時,${new Date().toLocaleString("ja-JP")}\n\n`;

  csv += "【基本サマリー】\n";
  csv += `総プレイ回数,${data.totalPlays}\n`;
  csv += `クリア回数,${data.completedPlays}\n`;
  csv += `クリア率,${data.totalPlays > 0 ? ((data.completedPlays / data.totalPlays) * 100).toFixed(1) : 0}%\n`;
  csv += `平均スコア,¥${data.completedPlays > 0 ? Math.round(data.totalScoreSum / data.completedPlays) : 0}\n`;
  csv += `アンケート回答数,${data.surveys.length}\n\n`;

  csv += "【モード別プレイ数】\n";
  csv += `小学生モード,${data.modePlays.elementary || 0}\n`;
  csv += `中高生モード,${data.modePlays.teen || 0}\n`;
  csv += `一般モード,${data.modePlays.adult || 0}\n`;
  csv += `高齢者モード,${data.modePlays.senior || 0}\n\n`;

  csv += "【防犯3原則 違反要因内訳】\n";
  csv += `「話さない」違反（情報流出）,${data.principleFailures.speak || 0}件\n`;
  csv += `「渡さない」違反（金銭振込・電子マネー）,${data.principleFailures.pay || 0}件\n`;
  csv += `「騙されない」違反（虚偽説明を信じた）,${data.principleFailures.fooled || 0}件\n\n`;

  csv += "【曜日別離脱数】\n";
  Object.entries(data.dropoutsByDay).forEach(([day, count]) => {
    csv += `${day}曜日,${count}人\n`;
  });
  csv += "\n";

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
  csv += "\n";

  csv += "【受講者アンケート全回答データ（全10問）】\n";
  csv += "回答日時,受講者名,プレイモード,Q1(意識変化),Q2(3原則理解),Q3(実践意欲),Q4(満足度),Q5(印象・感想),Q6(見分け理解),Q7(難問把握),Q8(解説有用性),Q9(共有意欲),Q10(改善要望)\n";

  const q1Map = { "1": "大いに高まった", "2": "高まった", "3": "あまり変わらない", "4": "変わらない" };
  const q2Map = { "1": "とても分かりやすかった", "2": "分かりやすかった", "3": "少し難しかった", "4": "難しかった" };
  const q3Map = { "1": "必ず確認・相談する", "2": "気をつけて行動する", "3": "少し不安がある" };
  const q4Map = { "1": "大変満足", "2": "満足", "3": "普通", "4": "不満" };
  const q6Map = { "1": "とても分かるようになった", "2": "少し分かるようになった", "3": "あまり変わらない", "4": "まだ難しい" };
  const q7Map = { "1": "たくさんあった", "2": "いくつかあった", "3": "あまりなかった", "4": "なかった" };
  const q8Map = { "1": "とても役立った", "2": "役立った", "3": "あまり役立たなかった", "4": "役立たなかった" };
  const q9Map = { "1": "ぜひ伝えたい", "2": "できれば伝えたい", "3": "あまり思わない", "4": "思わない" };

  data.surveys.forEach(s => {
    const a1 = q1Map[s.q1] || s.q1 || "";
    const a2 = q2Map[s.q2] || s.q2 || "";
    const a3 = q3Map[s.q3] || s.q3 || "";
    const a4 = q4Map[s.q4] || s.q4 || "";
    const a5 = `"${(s.q5 || "").replace(/"/g, '""').replace(/\n/g, ' ')}"`;
    const a6 = q6Map[s.q6] || s.q6 || "";
    const a7 = q7Map[s.q7] || s.q7 || "";
    const a8 = q8Map[s.q8] || s.q8 || "";
    const a9 = q9Map[s.q9] || s.q9 || "";
    const a10 = `"${(s.q10 || "").replace(/"/g, '""').replace(/\n/g, ' ')}"`;

    csv += `${s.submittedAt},"${s.playerName}",${s.mode},"${a1}","${a2}","${a3}","${a4}",${a5},"${a6}","${a7}","${a8}","${a9}",${a10}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `scam_hunter_analytics_full_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function resetAnalyticsData() {
  if (confirm("【警告】ローカルの蓄積データをリセットしますか？\n※クラウドのデータは削除されません。")) {
    saveAnalyticsData(getDefaultAnalyticsData());
    cloudAnalyticsData = null;
    renderAnalyticsDashboard();
    alert("ローカルの分析データを初期化しました。");
  }
}

function initSurveyFormEvents() {
  const form = document.getElementById("game-survey-form");
  if (!form) return;

  form.querySelectorAll(".pill-options-group").forEach(group => {
    const hiddenInp = group.parentElement.querySelector("input[type='hidden']");
    group.querySelectorAll(".pill-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        group.querySelectorAll(".pill-btn").forEach(b => b.classList.remove("is-selected"));
        btn.classList.add("is-selected");
        if (hiddenInp) hiddenInp.value = btn.dataset.val;
        group.parentElement.classList.remove("is-invalid");
      });
    });
  });

  const submitBtn = document.getElementById("btn-submit-survey");
  if (submitBtn) {
    submitBtn.addEventListener("click", () => {
      const requiredItems = form.querySelectorAll(".survey-q-item[data-required='true']");
      let hasError = false;
      let firstInvalid = null;

      requiredItems.forEach(item => {
        const hiddenInp = item.querySelector("input[type='hidden']");
        if (!hiddenInp || !hiddenInp.value) {
          item.classList.add("is-invalid");
          hasError = true;
          if (!firstInvalid) firstInvalid = item;
        } else {
          item.classList.remove("is-invalid");
        }
      });

      const alertMsg = document.getElementById("survey-validation-msg");
      if (hasError) {
        if (alertMsg) alertMsg.classList.remove("is-hidden");
        if (firstInvalid) firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }

      if (alertMsg) alertMsg.classList.add("is-hidden");

      const answers = {
        q1: form.querySelector("input[name='q1']").value,
        q2: form.querySelector("input[name='q2']").value,
        q3: form.querySelector("input[name='q3']").value,
        q4: form.querySelector("input[name='q4']").value,
        q5: form.querySelector("textarea[name='q5']").value.trim(),
        q6: form.querySelector("input[name='q6']").value,
        q7: form.querySelector("input[name='q7']").value,
        q8: form.querySelector("input[name='q8']").value,
        q9: form.querySelector("input[name='q9']").value,
        q10: form.querySelector("textarea[name='q10']").value.trim(),
        submittedAt: new Date().toISOString()
      };

      recordSurveySubmission(answers);

      form.classList.add("is-hidden");
      const thanksCard = document.getElementById("survey-thanks-card");
      if (thanksCard) {
        thanksCard.classList.remove("is-hidden");
        thanksCard.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  }
}

window.addEventListener("online", () => {
  flushOfflineQueue();
});

document.addEventListener("DOMContentLoaded", () => {
  initSurveyFormEvents();
  setTimeout(() => {
    reclaimPendingSurveySession();
    flushOfflineQueue();
  }, 1000);
});