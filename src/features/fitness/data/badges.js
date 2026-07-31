export const BADGE_DEFS = [
  { id: "first_workout", icon: "🏆", key: "badgeFirst", target: 1, metric: "workouts" },
  { id: "streak_7", icon: "🔥", key: "badgeStreak7", target: 7, metric: "streak" },
  { id: "minutes_100", icon: "💪", key: "badge100Min", target: 100, metric: "minutes" },
  { id: "core_queen", icon: "👑", key: "badgeCoreQueen", target: 1, metric: "core" },
  { id: "cardio_starter", icon: "💨", key: "badgeCardioStarter", target: 1, metric: "cardio" },
  { id: "consistency_hero", icon: "⭐", key: "badgeConsistency", target: 5, metric: "workouts" },
];

export function getBadgeProgress(badgeId, progress) {
  const def = BADGE_DEFS.find((b) => b.id === badgeId);
  if (!def) return { current: 0, target: 1, pct: 0 };

  let current = 0;
  switch (def.metric) {
    case "workouts":
      current = progress.workoutsCompleted || 0;
      break;
    case "streak":
      current = progress.streak || 0;
      break;
    case "minutes":
      current = progress.totalMinutes || 0;
      break;
    case "core":
      current = (progress.history || []).some((h) => h.categories?.includes("core")) ? 1 : 0;
      break;
    case "cardio":
      current = (progress.history || []).some((h) => h.categories?.includes("cardio")) ? 1 : 0;
      break;
    default:
      current = 0;
  }

  const target = def.target;
  const pct = target > 0 ? Math.min(100, Math.round((current / target) * 100)) : 0;
  return { current, target, pct };
}

export function evaluateBadges(progress, lastWorkout) {
  const earned = new Set(progress.badges || []);
  if (progress.workoutsCompleted >= 1) earned.add("first_workout");
  if (progress.streak >= 7) earned.add("streak_7");
  if (progress.totalMinutes >= 100) earned.add("minutes_100");
  if (lastWorkout?.categories?.includes("core")) earned.add("core_queen");
  if (lastWorkout?.categories?.includes("cardio")) earned.add("cardio_starter");
  if (progress.workoutsCompleted >= 5) earned.add("consistency_hero");
  return [...earned];
}
