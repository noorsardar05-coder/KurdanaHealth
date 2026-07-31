import { caloriesForExercise, isLowImpact, matchesBodyArea, secPerExercise } from "./exerciseHelpers.js";

const LIMITATION_KEYS = {
  none: [],
  knee_pain: ["knee_pain"],
  back_pain: ["back_pain"],
  pregnancy_safe: ["pregnancy"],
  low_impact: ["low_impact"],
  no_jumping: ["jumping", "high_impact"],
};

function exercisePassesLimitations(ex, lims, quiz) {
  const avoid = ex.avoidLimitations || [];
  for (const L of lims) {
    if (avoid.includes(L)) return false;
  }
  if (quiz.limitations?.includes("low_impact") || quiz.limitations?.includes("pregnancy_safe")) {
    if (!isLowImpact(ex) && ["cardio", "plyometric"].includes(ex.category)) return false;
  }
  if (quiz.limitations?.includes("no_jumping")) {
    const n = (ex.nameEn || "").toLowerCase();
    if (n.includes("jump") || n.includes("jack") || n.includes("burpee")) return false;
  }
  if (quiz.equipment === "none") {
    const eq = (ex.equipmentEn || "").toLowerCase();
    if (eq && eq !== "none" && !eq.includes("mat optional")) return false;
  }
  if (quiz.energy === "tired" && ex.difficulty === "advanced") return false;
  return true;
}

function exerciseMatchesGoal(ex, goal) {
  if (!goal || goal === "general_health") return true;
  return (ex.goals || []).includes(goal) || ex.goal === goal;
}

function exerciseMatchesLevel(ex, level) {
  const order = { beginner: 0, intermediate: 1, advanced: 2 };
  return (order[ex.difficulty] ?? 1) <= (order[level] ?? 0) + 1;
}

function exerciseMatchesStyle(ex, style) {
  if (!style) return true;
  const cat = ex.category || "";
  if (style === "calm" || style === "stretching") return ["stretching", "mobility", "flexibility", "cooldown", "cool-down", "low-impact"].includes(cat);
  if (style === "intense" || style === "quick_burn") return ["cardio", "strength", "legs", "glutes"].includes(cat);
  if (style === "guided") return true;
  return true;
}

function scoreExercise(ex, quiz, intensity) {
  let score = 1;
  const cats = [ex.category, ...(ex.categories || [])];
  const goal = quiz.goal;
  if (goal === "weight_loss") score += cats.includes("cardio") ? 5 : 2;
  if (goal === "muscle_gain") score += cats.includes("strength") ? 5 : 2;
  if (goal === "flexibility") score += cats.includes("stretching") || cats.includes("mobility") ? 5 : 1;
  if (goal === "stamina") score += cats.includes("cardio") ? 5 : 1;
  if (intensity === "high" && ex.difficulty === "advanced") score += 2;
  if (intensity === "low" && ex.difficulty === "beginner") score += 2;
  if (quiz.bodyArea && quiz.bodyArea !== "full_body") score += 1;
  return score;
}

function chooseUnique(pool, n, seedShift) {
  const out = [];
  const seen = new Set();
  const ordered = pool.slice().sort((a, b) => a.id.localeCompare(b.id));
  const start = seedShift % Math.max(ordered.length, 1);
  for (let i = 0; i < ordered.length && out.length < n; i++) {
    const ex = ordered[(i + start) % ordered.length];
    if (seen.has(ex.id)) continue;
    seen.add(ex.id);
    out.push(ex);
  }
  return out;
}

function planSizeForTime(timeKey, level) {
  const t = Number(timeKey) || 10;
  if (t <= 5) return 4;
  if (t <= 10) return level === "advanced" ? 8 : 6;
  if (t <= 20) return level === "advanced" ? 10 : 8;
  if (t <= 30) return 10;
  return 12;
}

function intensityFromQuiz(quiz, mode) {
  if (mode === "tired" || quiz.energy === "tired") return "low";
  if (mode === "harder") return "high";
  if (mode === "easier") return "low";
  if (quiz.style === "intense" || quiz.style === "quick_burn") return "high";
  if (quiz.style === "calm" || quiz.style === "stretching") return "low";
  if (quiz.energy === "strong") return "high";
  return "medium";
}

function difficultyLabel(level, intensity) {
  if (intensity === "low") return "beginner";
  if (intensity === "high") return "advanced";
  return level || "beginner";
}

export function getPlanCycleSeed() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function filterForQuiz(exercises, quiz) {
  const lims = (quiz.limitations || [])
    .filter((l) => l !== "none")
    .flatMap((l) => LIMITATION_KEYS[l] || [l]);
  return exercises.filter(
    (ex) =>
      exerciseMatchesGoal(ex, quiz.goal) &&
      exerciseMatchesLevel(ex, quiz.level) &&
      exercisePassesLimitations(ex, lims, quiz) &&
      exerciseMatchesStyle(ex, quiz.style) &&
      matchesBodyArea(ex, quiz.bodyArea)
  );
}

export function buildWorkoutPlan(exercises, quiz, opts = {}) {
  const mode = opts.mode || "normal";
  const intensity = intensityFromQuiz(quiz, mode);
  const targetN = planSizeForTime(quiz.time, quiz.level);
  let pool = filterForQuiz(exercises, quiz);
  if (pool.length < targetN + 2) {
    pool = exercises.filter((ex) => exerciseMatchesLevel(ex, quiz.level));
  }
  const weighted = pool.slice().sort((a, b) => scoreExercise(b, quiz, intensity) - scoreExercise(a, quiz, intensity));
  const warmPool = weighted.filter((ex) => ["warm-up", "cardio", "mobility", "flexibility"].includes(ex.category));
  const coolPool = weighted.filter((ex) => ["cooldown", "cool-down", "flexibility", "mobility", "stretching"].includes(ex.category));
  const mainPool = weighted.filter((ex) => !warmPool.includes(ex) && !coolPool.includes(ex));
  const warmCount = quiz.level === "beginner" ? 2 : 1;
  const coolCount = 1;
  const mainCount = Math.max(2, targetN - warmCount - coolCount);
  const seed = mode === "harder" ? 11 : mode === "easier" ? 3 : 7;
  const warmup = chooseUnique(warmPool.length ? warmPool : weighted, warmCount, seed);
  const used = new Set(warmup.map((x) => x.id));
  const main = chooseUnique((mainPool.length ? mainPool : weighted).filter((x) => !used.has(x.id)), mainCount, seed + 2);
  main.forEach((x) => used.add(x.id));
  const cooldown = chooseUnique((coolPool.length ? coolPool : weighted).filter((x) => !used.has(x.id)), coolCount, seed + 4);
  const list = [...warmup, ...main, ...cooldown];
  const totalDuration = Math.round(list.reduce((s, ex) => s + secPerExercise(ex), 0) / 60);
  const caloriesEstimate = list.reduce((s, ex) => s + caloriesForExercise(ex), 0);
  const safetyNotes = [];
  if (quiz.limitations?.includes("knee_pain")) safetyNotes.push("knee");
  if (quiz.limitations?.includes("back_pain")) safetyNotes.push("back");
  if (quiz.limitations?.includes("pregnancy_safe")) safetyNotes.push("pregnancy");
  const easierPool = pool.filter((ex) => ex.difficulty === "beginner" && isLowImpact(ex));
  const harderPool = pool.filter((ex) => ex.difficulty === "advanced" || ex.category === "cardio");
  return {
    seedDate: getPlanCycleSeed(),
    cycle: ["A", "B", "C"][Math.floor(Date.now() / 86400000) % 3],
    intensity,
    difficulty: difficultyLabel(quiz.level, intensity),
    warmup,
    main,
    cooldown,
    list,
    totalDuration,
    caloriesEstimate,
    exerciseCount: list.length,
    safetyNotes,
    easierVersion: chooseUnique(easierPool, Math.max(3, list.length - 2), 1),
    harderVersion: chooseUnique(harderPool, list.length + 2, 5),
  };
}

export function hydrateSavedPlan(saved, exercises, quiz) {
  if (!saved?.exerciseIds?.length || saved.seedDate !== getPlanCycleSeed()) return null;
  const byId = new Map(exercises.map((x) => [x.id, x]));
  const list = saved.exerciseIds.map((id) => byId.get(id)).filter(Boolean);
  // Regenerate legacy plans if even one removed/unsupported exercise is present.
  if (!list.length || list.length !== saved.exerciseIds.length) return null;
  const warmup = list.filter((ex) => ["warm-up", "cardio", "mobility", "flexibility"].includes(ex.category)).slice(0, 2);
  const cooldown = list.filter((ex) => ["cooldown", "cool-down", "flexibility", "mobility", "stretching"].includes(ex.category)).slice(-1);
  const warmIds = new Set(warmup.map((x) => x.id));
  const coolIds = new Set(cooldown.map((x) => x.id));
  const main = list.filter((x) => !warmIds.has(x.id) && !coolIds.has(x.id));
  return {
    ...saved,
    warmup,
    main,
    cooldown,
    list,
    totalDuration: saved.totalDuration || Math.round(list.reduce((s, ex) => s + secPerExercise(ex), 0) / 60),
    exerciseCount: list.length,
  };
}
