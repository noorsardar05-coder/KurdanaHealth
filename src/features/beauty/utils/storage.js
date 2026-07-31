import { getBeautyUserKey } from "../../../utils/storage.js";

const keys = {
  quiz: () => `kurdana_beauty_quiz_${getBeautyUserKey()}`,
  analysis: () => `kurdana_beauty_analysis_${getBeautyUserKey()}`,
  camera: () => `kurdana_beauty_camera_${getBeautyUserKey()}`,
  routine: () => `kurdana_beauty_routine_${getBeautyUserKey()}`,
  journal: () => `kurdana_beauty_tracker_${getBeautyUserKey()}`,
  favorites: () => `kurdana_beauty_favorites_${getBeautyUserKey()}`,
  savedArticles: () => `kurdana_beauty_saved_articles_${getBeautyUserKey()}`,
  recentArticles: () => `kurdana_beauty_recent_articles_${getBeautyUserKey()}`,
  compare: () => `kurdana_beauty_compare_${getBeautyUserKey()}`,
  streak: () => `kurdana_beauty_streak_${getBeautyUserKey()}`,
  privacy: () => `kurdana_beauty_privacy_${getBeautyUserKey()}`,
};

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    if (parsed === null || parsed === undefined) return fallback;
    return parsed;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadBeautyQuiz() {
  return readJson(keys.quiz(), null);
}

export function saveBeautyQuiz(answers) {
  writeJson(keys.quiz(), { ...answers, completedAt: new Date().toISOString() });
}

export function loadBeautyAnalysis() {
  return readJson(keys.analysis(), null);
}

export function saveBeautyAnalysis(data) {
  if (data == null) {
    try {
      localStorage.removeItem(keys.analysis());
    } catch {
      /* ignore */
    }
    return;
  }
  // Quiz insights only — never store photos
  const { previewCanvas, previewUrl, imageData, photo, ...safe } = data;
  writeJson(keys.analysis(), { ...safe, at: new Date().toISOString() });
}

/** Camera observations metadata only — never stores image bytes. */
export function loadBeautyCameraAnalysis() {
  return readJson(keys.camera(), null);
}

export function saveBeautyCameraAnalysis(data) {
  if (data == null) {
    try {
      localStorage.removeItem(keys.camera());
    } catch {
      /* ignore */
    }
    return;
  }
  const {
    previewCanvas,
    previewUrl,
    imageData,
    photo,
    quality,
    ...rest
  } = data;
  // Persist checklist status labels only — drop heavy metrics / canvases
  const qualityLite = quality
    ? {
        checklist: quality.checklist || null,
        blockers: quality.blockers || [],
        pass: Boolean(quality.pass),
      }
    : null;
  writeJson(keys.camera(), {
    ...rest,
    quality: qualityLite,
    source: "camera",
    at: new Date().toISOString(),
  });
}

export function loadRoutineProgress() {
  const fallback = { morning: {}, evening: {}, weekly: {}, streak: 0, lastDate: null };
  const data = readJson(keys.routine(), fallback);
  if (!data || typeof data !== "object" || Array.isArray(data)) return fallback;
  return {
    ...fallback,
    ...data,
    morning: data.morning && typeof data.morning === "object" ? data.morning : {},
    evening: data.evening && typeof data.evening === "object" ? data.evening : {},
    weekly: data.weekly && typeof data.weekly === "object" ? data.weekly : {},
  };
}

export function saveRoutineProgress(data) {
  writeJson(keys.routine(), data);
}

export function loadJournalEntries() {
  const data = readJson(keys.journal(), []);
  return Array.isArray(data) ? data : [];
}

export function saveJournalEntries(entries) {
  const list = Array.isArray(entries) ? entries : [];
  writeJson(keys.journal(), list.slice(0, 90));
}

export function loadFavorites() {
  const data = readJson(keys.favorites(), []);
  return Array.isArray(data) ? data : [];
}

export function saveFavorites(ids) {
  writeJson(keys.favorites(), ids);
}

export function loadSavedArticles() {
  const data = readJson(keys.savedArticles(), []);
  return Array.isArray(data) ? data : [];
}

export function saveSavedArticles(ids) {
  writeJson(keys.savedArticles(), Array.isArray(ids) ? ids : []);
}

export function loadRecentArticles() {
  const data = readJson(keys.recentArticles(), []);
  return Array.isArray(data) ? data : [];
}

export function saveRecentArticles(ids) {
  const list = Array.isArray(ids) ? ids : [];
  writeJson(keys.recentArticles(), list.slice(0, 12));
}

export function loadCompareList() {
  const data = readJson(keys.compare(), []);
  return Array.isArray(data) ? data : [];
}

export function saveCompareList(ids) {
  writeJson(keys.compare(), ids.slice(0, 3));
}

export function loadPrivacyPrefs() {
  return readJson(keys.privacy(), { cameraOk: false, savePhotos: false });
}

export function savePrivacyPrefs(prefs) {
  writeJson(keys.privacy(), prefs);
}
