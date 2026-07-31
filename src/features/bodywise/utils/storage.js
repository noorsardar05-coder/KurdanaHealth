/**
 * BodyWise progress — XP, streaks, achievements.
 * Key bumped for the educational redesign.
 */
const KEY = "bodywise_v4";

const DEFAULT = {
  xp: 0,
  level: 1,
  streak: 0,
  lastVisitDay: null,
  unlocked: [],
  achievements: [],
  lessonsDone: [],
  quizDone: [],
  gamesDone: [],
  visits: 0,
  enteredOnce: false,
};

export const ACHIEVEMENTS = [
  { id: "heart-explorer", organId: "heart", icon: "❤️", title: { en: "Heart Explorer", ku: "گەڕیدەی دڵ" }, xp: 50 },
  { id: "brain-genius", organId: "brain", icon: "🧠", title: { en: "Brain Genius", ku: "ژیری مێشک" }, xp: 50 },
  { id: "lung-lover", organId: "lungs", icon: "🫁", title: { en: "Lung Lover", ku: "خۆشەویستی سیهە" }, xp: 50 },
  { id: "bone-master", organId: "bones", icon: "🦴", title: { en: "Bone Master", ku: "مامۆستای ئێسک" }, xp: 50 },
  { id: "dna-detective", organId: "dna", icon: "🧬", title: { en: "DNA Detective", ku: "لێکۆڵەری دی ئێن ئەی" }, xp: 50 },
  { id: "myth-buster", icon: "🏆", title: { en: "Myth Buster", ku: "شکێنەری ئەفسانە" }, game: "fact-or-myth", xp: 80 },
  { id: "science-explorer", icon: "🏅", title: { en: "Science Explorer", ku: "گەڕیدەی زانست" }, xpNeed: 300 },
  { id: "quiz-champion", icon: "📝", title: { en: "Quiz Champion", ku: "پاڵەوانی پرسیار" }, quizCount: 5, xp: 60 },
  { id: "game-master", icon: "🎮", title: { en: "Game Master", ku: "مامۆستای یاری" }, gameCount: 4, xp: 70 },
  { id: "body-scholar", icon: "🌟", title: { en: "Body Scholar", ku: "زاناوی جەستە" }, organCount: 10, xp: 100 },
];

export function loadBodyWise() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT };
    return { ...DEFAULT, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT };
  }
}

export function saveBodyWise(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

export function xpToLevel(xp) {
  return Math.max(1, Math.floor(xp / 100) + 1);
}

export function levelProgress(xp) {
  return (xp % 100) / 100;
}

export function touchStreak(state) {
  const day = new Date().toDateString();
  if (state.lastVisitDay === day) return state;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const cont = state.lastVisitDay === yesterday.toDateString();
  return {
    ...state,
    lastVisitDay: day,
    streak: cont ? (state.streak || 0) + 1 : 1,
    visits: (state.visits || 0) + 1,
  };
}

function evaluateAchievements(next) {
  const earned = new Set(next.achievements || []);
  const organCompletes = new Set(
    (next.quizDone || []).filter((id) =>
      (next.lessonsDone || []).some((l) => l.startsWith(`${id}:`))
    )
  );
  // Count organs with full lesson path
  const organIds = new Set();
  (next.lessonsDone || []).forEach((l) => {
    const id = l.split(":")[0];
    if ((next.quizDone || []).includes(id)) organIds.add(id);
  });

  ACHIEVEMENTS.forEach((a) => {
    if (earned.has(a.id)) return;
    if (a.organId && organIds.has(a.organId)) {
      earned.add(a.id);
      next.xp = (next.xp || 0) + (a.xp || 0);
    }
    if (a.game && (next.gamesDone || []).includes(a.game)) {
      earned.add(a.id);
      next.xp = (next.xp || 0) + (a.xp || 0);
    }
    if (a.xpNeed && next.xp >= a.xpNeed) earned.add(a.id);
    if (a.quizCount && (next.quizDone || []).length >= a.quizCount) {
      earned.add(a.id);
      next.xp = (next.xp || 0) + (a.xp || 0);
    }
    if (a.gameCount && (next.gamesDone || []).length >= a.gameCount) {
      earned.add(a.id);
      next.xp = (next.xp || 0) + (a.xp || 0);
    }
    if (a.organCount && organIds.size >= a.organCount) {
      earned.add(a.id);
      next.xp = (next.xp || 0) + (a.xp || 0);
    }
  });
  next.achievements = [...earned];
  next.level = xpToLevel(next.xp || 0);
  return next;
}

export function addXp(state, amount, meta = {}) {
  let next = { ...state, xp: (state.xp || 0) + amount };
  next.level = xpToLevel(next.xp);
  if (meta.lessonId && !(next.lessonsDone || []).includes(meta.lessonId)) {
    next.lessonsDone = [...(next.lessonsDone || []), meta.lessonId];
  }
  if (meta.quizId && !(next.quizDone || []).includes(meta.quizId)) {
    next.quizDone = [...(next.quizDone || []), meta.quizId];
  }
  if (meta.gameId && !(next.gamesDone || []).includes(meta.gameId)) {
    next.gamesDone = [...(next.gamesDone || []), meta.gameId];
  }
  if (meta.organId && !(next.unlocked || []).includes(meta.organId)) {
    next.unlocked = [...(next.unlocked || []), meta.organId];
  }
  return evaluateAchievements(next);
}

export function completionPct(state, organCount = 15) {
  const quizzes = state.quizDone?.length || 0;
  return Math.min(100, Math.round((quizzes / Math.max(1, organCount)) * 100));
}
