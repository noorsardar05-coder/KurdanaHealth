import { useMemo } from "react";

const ACTIVITY_SCORES = { sedentary: 48, light: 62, moderate: 78, active: 90 };
const GOAL_MOOD = { wellness: 85, fitness: 80, nutrition: 82, mental: 75, weight: 70, skin: 78 };

function daySeed() {
  const d = new Date();
  return d.getFullYear() * 1000 + d.getMonth() * 50 + d.getDate();
}

export function useWellnessSnapshot(user) {
  return useMemo(() => {
    const seed = daySeed();
    const activity = ACTIVITY_SCORES[user?.activity] ?? 65;
    const mood = GOAL_MOOD[user?.goal] ?? 78;
    const sleep = 6.5 + ((seed % 15) / 10);
    const hydration = 5 + (seed % 4);
    const nutrition = 68 + (seed % 20);

    const wellness = Math.round(
      (activity + mood + Math.min(sleep / 8, 1) * 100 + hydration * 8 + nutrition) / 5
    );

    const streak = 3 + (seed % 12);

    return {
      wellness: Math.min(98, Math.max(52, wellness)),
      sleep: sleep.toFixed(1),
      hydration,
      activity,
      mood,
      nutrition,
      sleepPct: Math.min(100, Math.round((sleep / 8) * 100)),
      hydrationPct: Math.min(100, Math.round((hydration / 8) * 100)),
      streak,
    };
  }, [user?.activity, user?.goal]);
}

export function greetingKey(date = new Date()) {
  const h = date.getHours();
  if (h < 12) return "greetingMorning";
  if (h < 18) return "greetingAfternoon";
  return "greetingEvening";
}
