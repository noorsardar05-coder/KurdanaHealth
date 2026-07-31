import { useMemo, useEffect, useState } from "react";

const KEY = "kh_learning_streak_v1";

function todayKey() {
  return new Date().toDateString();
}

function yesterdayKey() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toDateString();
}

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { current: 0, longest: 0, lastDay: null };
    const parsed = JSON.parse(raw);
    return {
      current: Number(parsed.current) || 0,
      longest: Number(parsed.longest) || 0,
      lastDay: parsed.lastDay || null,
    };
  } catch {
    return { current: 0, longest: 0, lastDay: null };
  }
}

function save(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

/** Touch streak once per calendar day when the user opens the dashboard. */
export function touchLearningStreak() {
  const prev = load();
  const today = todayKey();
  if (prev.lastDay === today) return prev;

  const cont = prev.lastDay === yesterdayKey();
  const current = cont ? (prev.current || 0) + 1 : 1;
  const next = {
    current,
    longest: Math.max(prev.longest || 0, current),
    lastDay: today,
  };
  save(next);
  return next;
}

export function useLearningStreak() {
  const [streak, setStreak] = useState(() => load());

  useEffect(() => {
    setStreak(touchLearningStreak());
  }, []);

  return useMemo(
    () => ({
      current: streak.current,
      longest: Math.max(streak.longest, streak.current),
    }),
    [streak]
  );
}
