import { getUser } from "../../../utils/storage.js";

function userKey() {
  const user = getUser();
  if (!user) return "guest";
  return user.id || user.email || user.name || "guest";
}

const keys = {
  state: () => `kh_mh_v2_state_${userKey()}`,
  galaxy: () => `kh_mh_v2_galaxy_${userKey()}`,
  journal: () => `kh_mh_v2_journal_${userKey()}`,
  gratitude: () => `kh_mh_v3_gratitude_${userKey()}`,
  mirror: () => `kh_mh_v2_mirror_${userKey()}`,
  library: () => `kh_mh_v3_library_${userKey()}`,
  galaxyFav: () => `kh_mh_v3_galaxy_fav_${userKey()}`,
  reflections: () => `kh_mh_v3_reflections_${userKey()}`,
};

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function dateKey(d = new Date()) {
  return d.toISOString().slice(0, 10);
}

export function defaultState() {
  return {
    name: "",
    mood: null,
    moodDate: null,
    moodHistory: [],
    lastOpen: null,
    visitCount: 0,
    preferredTool: null,
    panicUsed: 0,
    darkMode: false,
  };
}

export function loadState() {
  return { ...defaultState(), ...read(keys.state(), {}) };
}

export function saveState(state) {
  write(keys.state(), state);
}

export function loadGalaxy() {
  return read(keys.galaxy(), {});
}

export function saveGalaxy(galaxy) {
  write(keys.galaxy(), galaxy);
}

export function addGalaxyStar(mood) {
  const g = loadGalaxy();
  const day = dateKey();
  g[day] = { mood, at: Date.now() };
  saveGalaxy(g);
  return g;
}

export function loadJournal() {
  return read(keys.journal(), []);
}

export function saveJournal(entries) {
  write(keys.journal(), entries);
}

export function loadMirrorSaves() {
  return read(keys.mirror(), []);
}

export function saveMirrorSaves(entries) {
  write(keys.mirror(), entries);
}

export function deleteMirrorSave(id) {
  const next = loadMirrorSaves().filter((e) => e.id !== id);
  saveMirrorSaves(next);
  return next;
}

export function clearMirrorSaves() {
  saveMirrorSaves([]);
}

export function defaultGratitude() {
  return {
    entries: [],
    streak: 0,
    longestStreak: 0,
    lastEntryDate: null,
  };
}

export function loadGratitude() {
  return { ...defaultGratitude(), ...read(keys.gratitude(), {}) };
}

export function saveGratitude(data) {
  write(keys.gratitude(), data);
}

function yesterdayKey() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return dateKey(d);
}

/** Add a private gratitude blossom. One blossom per save action. */
export function addGratitudeLeaf(text, mood = null) {
  const prev = loadGratitude();
  const today = dateKey();
  const trimmed = String(text || "").trim();
  if (!trimmed) return prev;

  let streak = 1;
  if (prev.lastEntryDate === today) {
    streak = prev.streak || 1;
  } else if (prev.lastEntryDate === yesterdayKey()) {
    streak = (prev.streak || 0) + 1;
  }

  const used = new Set((prev.entries || []).map((e) => e.slot).filter((s) => s != null));
  let slot = 0;
  const maxSlots = 48;
  const candidates = [];
  for (let i = 0; i < maxSlots; i++) {
    if (!used.has(i)) candidates.push(i);
  }
  if (candidates.length) {
    slot = candidates[Math.floor(Math.random() * candidates.length)];
  } else {
    slot = Math.floor(Math.random() * maxSlots);
  }

  const now = Date.now();
  const entry = {
    id: `bloom_${now}_${Math.random().toString(36).slice(2, 7)}`,
    text: trimmed.slice(0, 500),
    date: today,
    createdAt: now,
    slot,
    color: Math.floor(Math.random() * 5),
    mood: mood || null,
  };

  const next = {
    entries: [entry, ...(prev.entries || [])].slice(0, 365),
    streak,
    longestStreak: Math.max(prev.longestStreak || 0, streak),
    lastEntryDate: today,
  };
  saveGratitude(next);
  return next;
}

/* ─── Library progress / saved topics ─── */

export function defaultLibrary() {
  return { viewed: [], saved: [], quiz: {}, progress: {} };
}

export function loadLibrary() {
  return { ...defaultLibrary(), ...read(keys.library(), {}) };
}

export function saveLibrary(data) {
  write(keys.library(), data);
}

export function markTopicViewed(topicId) {
  const lib = loadLibrary();
  const viewed = [topicId, ...(lib.viewed || []).filter((id) => id !== topicId)].slice(0, 40);
  const progress = { ...(lib.progress || {}) };
  const prev = progress[topicId] || { opened: 0, quizDone: false, sections: [] };
  progress[topicId] = { ...prev, opened: (prev.opened || 0) + 1, lastViewed: Date.now() };
  const next = { ...lib, viewed, progress };
  saveLibrary(next);
  return next;
}

export function toggleSavedTopic(topicId) {
  const lib = loadLibrary();
  const has = (lib.saved || []).includes(topicId);
  const saved = has
    ? (lib.saved || []).filter((id) => id !== topicId)
    : [topicId, ...(lib.saved || [])].slice(0, 60);
  const next = { ...lib, saved };
  saveLibrary(next);
  return next;
}

export function markQuizDone(topicId, score, total) {
  const lib = loadLibrary();
  const quiz = { ...(lib.quiz || {}), [topicId]: { score, total, at: Date.now() } };
  const progress = { ...(lib.progress || {}) };
  const prev = progress[topicId] || { opened: 0, quizDone: false, sections: [] };
  progress[topicId] = { ...prev, quizDone: true };
  const next = { ...lib, quiz, progress };
  saveLibrary(next);
  return next;
}

export function topicProgressPct(topicId, lib = null) {
  const data = lib || loadLibrary();
  const p = data.progress?.[topicId];
  if (!p) return 0;
  let n = 0;
  if (p.opened) n += 40;
  if (p.quizDone || data.quiz?.[topicId]) n += 60;
  return Math.min(100, n);
}

/* ─── Galaxy favorites / saved stars ─── */

export function loadGalaxyFavorites() {
  return read(keys.galaxyFav(), { saved: [], favorites: [] });
}

export function saveGalaxyFavorites(data) {
  write(keys.galaxyFav(), data);
}

export function toggleGalaxySave(messageId) {
  const data = loadGalaxyFavorites();
  const has = (data.saved || []).includes(messageId);
  const saved = has
    ? (data.saved || []).filter((id) => id !== messageId)
    : [messageId, ...(data.saved || [])].slice(0, 120);
  const next = { ...data, saved };
  saveGalaxyFavorites(next);
  return next;
}

export function toggleGalaxyFavorite(messageId) {
  const data = loadGalaxyFavorites();
  const has = (data.favorites || []).includes(messageId);
  const favorites = has
    ? (data.favorites || []).filter((id) => id !== messageId)
    : [messageId, ...(data.favorites || [])].slice(0, 120);
  const next = { ...data, favorites };
  saveGalaxyFavorites(next);
  return next;
}

/* ─── Daily reflections ─── */

export function loadReflections() {
  return read(keys.reflections(), []);
}

export function saveReflection(question, answer, lang) {
  const trimmed = String(answer || "").trim();
  if (!trimmed) return loadReflections();
  const entry = {
    id: `ref_${Date.now()}`,
    question,
    answer: trimmed.slice(0, 400),
    lang,
    date: dateKey(),
    at: Date.now(),
  };
  const next = [entry, ...loadReflections()].slice(0, 90);
  write(keys.reflections(), next);
  return next;
}

export function getTreeStage(leafCount) {
  if (leafCount >= 100) return "blooming";
  if (leafCount >= 30) return "growing";
  if (leafCount >= 10) return "small";
  return "seed";
}

/** Growth + milestone flags for the blossom tree. */
export function getTreeGrowth(leafCount = 0) {
  const n = Math.max(0, Number(leafCount) || 0);
  const fullness = Math.min(1, Math.log10(n + 1) / Math.log10(120));
  const month = new Date().getMonth();
  let season = "spring";
  if (month >= 5 && month <= 7) season = "summer";
  else if (month >= 8 && month <= 10) season = "autumn";
  else if (month === 11 || month <= 1) season = "winter";

  return {
    stage: getTreeStage(n),
    season,
    fullness,
    showClusters: n >= 10,
    showColorful: n >= 30,
    showBird: n >= 100 || season === "summer",
    showButterflies: n >= 250 || (season === "spring" && n >= 20),
    showFallingPetals: n >= 500 || season === "autumn",
    showFlowers: n >= 10,
    snow: season === "winter" && n >= 5,
  };
}

export function getDisplayName(state) {
  if (state?.name?.trim()) return state.name.trim();
  const user = getUser();
  if (user?.name) return String(user.name).split(" ")[0];
  return "";
}
