/* =========================================================
   state.js
   ゲーム状態管理・出題バランス抽出ロジック
   【全モード 詐欺4・本物2・助ける1（計7問）統一対応版】
   ========================================================= */

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const state = {
  deviceLayout: "mobile",
  reduceMotion: Boolean(prefersReducedMotion),
  hasPlayedBefore: false,
  mode: "adult",
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
  answeredQuestions: [],

  isTestMode: false,
  showPrincipleTags: false
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

function buildDaySchedule(mode) {
  const schedule = [];
  // 全モード共通で1日1問×7日間（月〜日）の全7スロットに統一
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
  return schedule;
}

function pickWeeklyQuestions(mode) {
  let pool = [];
  if (mode === "senior") {
    pool = shuffleArray(QUESTIONS_SENIOR);
  } else if (mode === "adult") {
    pool = shuffleArray(QUESTIONS_ADULT);
  } else if (mode === "teen") {
    pool = shuffleArray(QUESTIONS_TEEN);
  } else {
    pool = shuffleArray(QUESTIONS_ELEMENTARY);
  }

  // 詐欺4問 ＋ 本物2問 ＋ 助ける1問 ＝ 合計7問で全モード統一抽出
  const scamPicked = pool.filter(q => q.category === "scam").slice(0, 4);
  const realPicked = pool.filter(q => q.category === "real").slice(0, 2);
  const helpPicked = pool.filter(q => q.category === "help").slice(0, 1);

  return shuffleArray([...scamPicked, ...realPicked, ...helpPicked]);
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