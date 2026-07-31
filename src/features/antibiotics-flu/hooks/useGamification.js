import { useCallback, useState } from "react";
import { getAntibioticsUserKey } from "../../../utils/storage.js";

function keyXp(uk) {
  return `kurdana_afs_xp_${uk}`;
}
function keyBadges(uk) {
  return `kurdana_antibiotics_badges_${uk}`;
}
function keyStreak(uk) {
  return `kurdana_afs_streak_${uk}`;
}
function keyLastActive(uk) {
  return `kurdana_afs_last_active_${uk}`;
}

function loadXp(uk) {
  try {
    const v = parseInt(localStorage.getItem(keyXp(uk)), 10);
    return isNaN(v) ? 0 : v;
  } catch {
    return 0;
  }
}

function loadBadges(uk) {
  try {
    return JSON.parse(localStorage.getItem(keyBadges(uk)) || "{}");
  } catch {
    return {};
  }
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayStr() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

function loadStreak(uk) {
  try {
    return parseInt(localStorage.getItem(keyStreak(uk)), 10) || 0;
  } catch {
    return 0;
  }
}

function loadLastActive(uk) {
  try {
    return localStorage.getItem(keyLastActive(uk)) || "";
  } catch {
    return "";
  }
}

export function useGamification() {
  const uk = getAntibioticsUserKey();
  const [xp, setXp] = useState(() => loadXp(uk));
  const [badges, setBadges] = useState(() => loadBadges(uk));
  const [streak, setStreak] = useState(() => loadStreak(uk));

  const level = Math.floor(xp / 100) + 1;
  const progress = xp % 100;

  const recordActivity = useCallback(() => {
    const today = todayStr();
    const last = loadLastActive(uk);
    if (last === today) return;

    let nextStreak = 1;
    if (last === yesterdayStr()) {
      nextStreak = loadStreak(uk) + 1;
    }

    setStreak(nextStreak);
    try {
      localStorage.setItem(keyStreak(uk), String(nextStreak));
      localStorage.setItem(keyLastActive(uk), today);
    } catch {
      /* ignore */
    }
  }, [uk]);

  const addXp = useCallback(
    (n) => {
      recordActivity();
      setXp((prev) => {
        const next = prev + n;
        try {
          localStorage.setItem(keyXp(uk), String(next));
        } catch {
          /* ignore */
        }
        return next;
      });
    },
    [uk, recordActivity]
  );

  const unlockBadge = useCallback(
    (id) => {
      setBadges((prev) => {
        if (prev[id]) return prev;
        const next = { ...prev, [id]: true };
        try {
          localStorage.setItem(keyBadges(uk), JSON.stringify(next));
        } catch {
          /* ignore */
        }
        return next;
      });
    },
    [uk]
  );

  return { xp, level, progress, badges, streak, addXp, unlockBadge, recordActivity };
}
