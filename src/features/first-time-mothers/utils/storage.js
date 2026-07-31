import { getUser } from "../../../utils/storage.js";

function userKey() {
  const user = getUser();
  if (!user) return "guest";
  return user.id || user.email || user.name || "guest";
}

const keys = {
  profile: () => `kh_mothers_v6_profile_${userKey()}`,
  state: () => `kh_mothers_v6_state_${userKey()}`,
  saved: () => `kh_mothers_v6_saved_${userKey()}`,
  compare: () => `kh_mothers_v6_compare_${userKey()}`,
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

export function loadProfile() {
  return read(keys.profile(), null);
}

export function saveProfile(profile) {
  write(keys.profile(), profile);
}

export function defaultState() {
  return {
    mood: null,
    moodDate: null,
    babySleep: null,
    sleepDate: null,
    water: 0,
    waterDate: null,
    pain: null,
    painDate: null,
    recoveryMood: null,
    recoveryGoals: {},
    feeds: [],
    feedTimer: null,
    milestones: {},
    celebrate: null,
    lastVideo: null,
  };
}

export function loadState() {
  return { ...defaultState(), ...read(keys.state(), {}) };
}

export function saveState(state) {
  write(keys.state(), state);
}

export function loadSaved() {
  return read(keys.saved(), []);
}

export function saveSaved(ids) {
  write(keys.saved(), ids);
}

export function loadCompare() {
  return read(keys.compare(), []);
}

export function saveCompare(ids) {
  write(keys.compare(), ids.slice(0, 3));
}
