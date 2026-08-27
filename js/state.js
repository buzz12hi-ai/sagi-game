/* =========================================================
   state.js
   ゲーム状態管理・出題バランス抽出ロジック
   【全モード月〜日（小学生・中高生：計10問・詐欺7問配分版）】
   ========================================================= */

const state = {
  deviceLayout: "mobile", // "mobile" | "desktop"
  mode: "adult",          // "elementary" | "teen" | "adult" | "senior"
  playerName: "",
  money: 50000,
  selectedItem: null,
  weeklyQuestions: [],
  daySchedule: [],
  slotIndex: 0,
  dialogueIndex: 0,
  correctCount: 0,
  
  joeExpression: "normal",
  selectedAction: null,
  
  damages: {
    money: 0,
    personalInfo: 0,
    account: 0,
    line: 0
  },
  fooledCount: 0,
  preventedScamsCount: 0,
  answeredQuestions: []
};

function getPlayerDisplayName() {
  if (state.mode === "senior" || state.mode === "adult") return "あなた";
  const name = state.playerName ? state.playerName.trim() : "キミ";
  return `${name}さん`;
}

function getPlayerRawName() {
  if (state.mode === "senior" || state.mode === "adult") return "あなた";
  return state.playerName ? state.playerName.trim() : "キミ";
}

const SEVEN_DAY_LABELS = ["月", "火", "水", "木", "金", "土", "日"];

function shuffleArray(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/* モード別日程スケジュールの生成 */
function buildDaySchedule(mode) {
  const schedule = [];

  if (mode === "senior" || mode === "adult") {
    // 高齢者・一般大人モード：月〜日 1日1問（計7問）
    for (let day = 0; day < 7; day++) {
      schedule.push({
        weekdayIndex: day,
        dayNumber: `DAY${day + 1}`,
        weekdayName: SEVEN_DAY_LABELS[day],
        periodLabel: "",
        isFirstOfSlot: true,
        isSunday: day === 6
      });
    }
  } else {
    // 小学生・中高生モード：月(2), 火(2), 水(1), 木(2), 金(1), 土(1), 日(1) 計10問
    const doubleDayIndexes = new Set([0, 1, 3]); // 月・火・木が2問

    for (let day = 0; day < 7; day++) {
      const questionsOnThisDay = doubleDayIndexes.has(day) ? 2 : 1;
      for (let slot = 0; slot < questionsOnThisDay; slot++) {
        schedule.push({
          weekdayIndex: day,
          dayNumber: `DAY${day + 1}`,
          weekdayName: SEVEN_DAY_LABELS[day],
          periodLabel: questionsOnThisDay === 2 ? (slot === 0 ? "午前" : "午後") : "",
          isFirstOfSlot: slot === 0,
          isSunday: day === 6
        });
      }
    }
  }

  return schedule;
}

/* モード別問題の完全ランダム抽出（指定配分ルール準拠） */
function pickWeeklyQuestions(mode) {
  if (mode === "senior") {
    // 高齢者モード（計7問）：詐欺 5問 ＋ 本物 2問（助ける 0問）
    const pool = shuffleArray(QUESTIONS_SENIOR);
    const scamPicked = pool.filter(q => q.category === "scam").slice(0, 5);
    const realPicked = pool.filter(q => q.category === "real").slice(0, 2);
    return shuffleArray([...scamPicked, ...realPicked]);
  } else if (mode === "adult") {
    // 一般（大人）モード（計7問）：詐欺 5問 ＋ 本物 1問 ＋ 助ける 1問
    const pool = shuffleArray(QUESTIONS_ADULT);
    const scamPicked = pool.filter(q => q.category === "scam").slice(0, 5);
    const realPicked = pool.filter(q => q.category === "real").slice(0, 1);
    const helpPicked = pool.filter(q => q.category === "help").slice(0, 1);
    return shuffleArray([...scamPicked, ...realPicked, ...helpPicked]);
  } else if (mode === "teen") {
    // 中高生モード（計10問）：詐欺 7問 ＋ 本物 2問 ＋ 助ける 1問
    const pool = shuffleArray(QUESTIONS_TEEN);
    const scamPicked = pool.filter(q => q.category === "scam").slice(0, 7);
    const realPicked = pool.filter(q => q.category === "real").slice(0, 2);
    const helpPicked = pool.filter(q => q.category === "help").slice(0, 1);
    return shuffleArray([...scamPicked, ...realPicked, ...helpPicked]);
  } else {
    // 小学生モード（計10問）：詐欺 7問 ＋ 本物 2問 ＋ 助ける 1問
    const pool = shuffleArray(QUESTIONS_ELEMENTARY);
    const scamPicked = pool.filter(q => q.category === "scam").slice(0, 7);
    const realPicked = pool.filter(q => q.category === "real").slice(0, 2);
    const helpPicked = pool.filter(q => q.category === "help").slice(0, 1);
    return shuffleArray([...scamPicked, ...realPicked, ...helpPicked]);
  }
}

function currentQuestion() {
  return state.weeklyQuestions[state.slotIndex];
}

function currentScheduleSlot() {
  if (state.slotIndex < state.daySchedule.length) {
    return state.daySchedule[state.slotIndex];
  }
  return {
    weekdayIndex: 6,
    dayNumber: "DAY7",
    weekdayName: "日",
    periodLabel: "",
    isFirstOfSlot: true,
    isSunday: true
  };
}