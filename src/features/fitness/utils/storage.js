const USER_KEY = "user";

function getCurrentUserId() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return "guest";
    const u = JSON.parse(raw);
    if (!u || typeof u.name !== "string" || !String(u.name).trim()) return "guest";
    const slug = String(u.name)
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\u0600-\u06FF]+/g, "_")
      .replace(/_+/g, "_")
      .replace(/^_|_$/g, "")
      .slice(0, 64);
    return `${slug || "user"}_${u.gender || "x"}`;
  } catch {
    return "guest";
  }
}

const keys = {
  progress: () => `kurdana_fitness_progress_${getCurrentUserId()}`,
  quiz: () => `kurdana_fitness_quiz_${getCurrentUserId()}`,
  plan: () => `kurdana_fitness_plan_${getCurrentUserId()}`,
  logs: () => `kurdana_fitness_logs_${getCurrentUserId()}`,
  reminder: () => `kurdana_fitness_reminder_${getCurrentUserId()}`,
  reminderUntil: () => `kurdana_fitness_reminder_until_${getCurrentUserId()}`,
  quote: () => `kurdana_fitness_quote_${getCurrentUserId()}`,
  lang: () => `kurdana_fitness_lang_${getCurrentUserId()}`,
  savedPlan: () => `kurdana_fitness_saved_plan_${getCurrentUserId()}`,
  readiness: () => `kurdana_fitness_readiness_${getCurrentUserId()}`,
  sound: () => `kurdana_fitness_sound_${getCurrentUserId()}`,
  favorites: () => `kurdana_fitness_favorites_${getCurrentUserId()}`,
};

export function loadSoundEnabled() {
  const v = localStorage.getItem(keys.sound());
  return v === null ? true : v === "1";
}

export function saveSoundEnabled(on) {
  localStorage.setItem(keys.sound(), on ? "1" : "0");
}

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function loadProgress() {
  const p = readJson(keys.progress(), {});
  const today = new Date().toISOString().slice(0, 10);
  return {
    workoutsCompleted: Number(p.workoutsCompleted) || 0,
    streak: Number(p.streak) || 0,
    points: Number(p.points) || 0,
    lastWorkoutDate: p.lastWorkoutDate || "",
    totalMinutes: Number(p.totalMinutes) || 0,
    caloriesEstimate: Number(p.caloriesEstimate) || 0,
    exercisesToday: p.exercisesTodayDate === today ? Number(p.exercisesToday) || 0 : 0,
    exercisesTodayDate: today,
    weeklyMinutes: Array.isArray(p.weeklyMinutes) && p.weeklyMinutes.length === 7
      ? p.weeklyMinutes.map((n) => Number(n) || 0)
      : [0, 0, 0, 0, 0, 0, 0],
    badges: Array.isArray(p.badges) ? p.badges : [],
    moveCheckins: Number(p.moveCheckins) || 0,
    lastMovedUi: p.lastMovedUi || "",
    history: Array.isArray(p.history) ? p.history : [],
  };
}

export function saveProgress(p) {
  localStorage.setItem(keys.progress(), JSON.stringify(p));
}

export function loadQuiz() {
  return readJson(keys.quiz(), null);
}

export function saveQuiz(q) {
  localStorage.setItem(keys.quiz(), JSON.stringify({ ...q, quizCompleted: true }));
}

export function loadDailyPlan() {
  return readJson(keys.plan(), null);
}

export function saveDailyPlan(plan) {
  if (!plan?.list?.length) return;
  localStorage.setItem(
    keys.plan(),
    JSON.stringify({
      seedDate: plan.seedDate,
      cycle: plan.cycle,
      intensity: plan.intensity,
      difficulty: plan.difficulty,
      exerciseIds: plan.list.map((x) => x.id),
      totalDuration: plan.totalDuration,
      safetyNotes: plan.safetyNotes,
      createdAt: new Date().toISOString(),
    })
  );
}

export function loadSavedPlan() {
  return readJson(keys.savedPlan(), null);
}

export function saveSavedPlan(plan) {
  if (!plan) return;
  localStorage.setItem(keys.savedPlan(), JSON.stringify(plan));
}

export function loadReadiness() {
  const today = new Date().toISOString().slice(0, 10);
  const r = readJson(keys.readiness(), null);
  if (!r || r.date !== today) return null;
  return r.value;
}

export function saveReadiness(value) {
  localStorage.setItem(
    keys.readiness(),
    JSON.stringify({ date: new Date().toISOString().slice(0, 10), value })
  );
}

export function loadFitnessLang() {
  return localStorage.getItem(keys.lang()) || "en";
}

export function saveFitnessLang(lang) {
  localStorage.setItem(keys.lang(), lang);
}

export function loadQuoteIndex() {
  return Number(localStorage.getItem(keys.quote())) || 0;
}

export function saveQuoteIndex(i) {
  localStorage.setItem(keys.quote(), String(i));
}

export function loadReminder() {
  return {
    label: localStorage.getItem(keys.reminder()) || "",
    until: Number(localStorage.getItem(keys.reminderUntil())) || 0,
  };
}

export function saveReminder(label, untilMs) {
  localStorage.setItem(keys.reminder(), label);
  localStorage.setItem(keys.reminderUntil(), String(untilMs));
}

export function clearReminder() {
  localStorage.removeItem(keys.reminder());
  localStorage.removeItem(keys.reminderUntil());
}

export function appendWorkoutLog(entry) {
  const logs = readJson(keys.logs(), []);
  logs.unshift(entry);
  localStorage.setItem(keys.logs(), JSON.stringify(logs.slice(0, 30)));
}

export function loadWorkoutLogs() {
  return readJson(keys.logs(), []);
}

export function loadFavorites(supportedIds = null) {
  const ids = readJson(keys.favorites(), []);
  if (!Array.isArray(ids)) return [];
  if (!supportedIds) return ids;
  const allowed = new Set(supportedIds);
  const filtered = ids.filter((id) => allowed.has(id));
  if (filtered.length !== ids.length) saveFavorites(filtered);
  return filtered;
}

export function saveFavorites(ids) {
  localStorage.setItem(keys.favorites(), JSON.stringify(ids));
}
