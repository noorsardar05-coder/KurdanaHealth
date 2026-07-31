const LANGUAGE_KEY = "language";
const LANGUAGE_CHOSEN_KEY = "language_chosen";
const INTRO_SEEN_KEY = "kh_intro_seen";
const USER_KEY = "user";

/** Embedded /public apps use separate localStorage keys — keep them aligned with the main app language. */
export function syncEmbeddedAppLanguages(lang) {
  const isKu = lang === "ku";
  try {
    localStorage.setItem("mh_lang", isKu ? "ku" : "en");
    localStorage.setItem("ftm-lang", isKu ? "ku" : "en");
    localStorage.setItem("bodywise_lang_v1", isKu ? "ku" : "en");
    localStorage.setItem("kurdana_afs_lang", isKu ? "ckb" : "en");
    localStorage.setItem("beauty_lang_v2", isKu ? "ku" : "en");
    localStorage.setItem("kurdana_antibiotics_language_kurdana_antibiotics_guest", isKu ? "ku" : "en");
    localStorage.setItem("noor_community_lang", isKu ? "ku" : "en");
  } catch {
    // ignore quota / private mode
  }
}

export function getLanguage() {
  try {
    const user = getUser();
    if (user?.language) return user.language === "ku" ? "ku" : "en";
  } catch {
    // ignore
  }
  return localStorage.getItem(LANGUAGE_KEY) || "en";
}

/** True once the user has completed the first-run language step (or migrated from an older session). */
export function hasChosenLanguage() {
  if (localStorage.getItem(LANGUAGE_CHOSEN_KEY) === "1") return true;

  // Migrate existing sessions that already picked a language before this flag existed.
  if (localStorage.getItem(LANGUAGE_KEY)) {
    markLanguageChosen();
    return true;
  }

  try {
    const raw = localStorage.getItem(USER_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.language) {
        markLanguageChosen();
        return true;
      }
    }
  } catch {
    // ignore
  }

  return false;
}

export function markLanguageChosen() {
  localStorage.setItem(LANGUAGE_CHOSEN_KEY, "1");
}

/** True once the KurdanaHealth + Kurdish welcome intro has finished this browser session. */
export function hasSeenIntro() {
  try {
    return sessionStorage.getItem(INTRO_SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

export function markIntroSeen() {
  try {
    sessionStorage.setItem(INTRO_SEEN_KEY, "1");
  } catch {
    // ignore
  }
}

export function setLanguage(language) {
  const lang = language === "ku" ? "ku" : "en";
  localStorage.setItem(LANGUAGE_KEY, lang);
  markLanguageChosen();
  syncEmbeddedAppLanguages(lang);

  try {
    const user = getUser();
    if (user) setUser({ ...user, language: lang });
  } catch {
    // ignore
  }
}

/** Where to send someone who has already chosen a language. */
export function getAppEntryRoute() {
  return getUser() ? "/dashboard" : "/login";
}

export function getUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.name || !parsed?.gender || !parsed?.language) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function logoutUser() {
  localStorage.removeItem(USER_KEY);
}

/** Stable id segment for per-user localStorage (matches public/fitness/fitness-app.js). */
export function getFitnessUserKey() {
  if (typeof window === "undefined") return "guest";
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
    const g = u.gender || "x";
    return `${slug || "user"}_${g}`;
  } catch {
    return "guest";
  }
}

/** Same stable id as fitness; anonymous users use `kurdana_beauty_guest` for beauty localStorage (see public/beauty/beauty-app.js). */
export function getBeautyUserKey() {
  const k = getFitnessUserKey();
  return k === "guest" ? "kurdana_beauty_guest" : k;
}

/** Per-user key for antibiotics-flu embedded app (see public/antibiotics-flu/afs-app.js). */
export function getAntibioticsUserKey() {
  const k = getFitnessUserKey();
  return k === "guest" ? "kurdana_antibiotics_guest" : k;
}
