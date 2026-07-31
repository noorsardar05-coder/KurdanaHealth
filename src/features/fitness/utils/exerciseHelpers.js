export function exName(ex, lang) {
  return lang === "ku" ? ex.nameKu || ex.nameEn : ex.nameEn;
}

export function exInstruction(ex, lang) {
  return lang === "ku" ? ex.instructionKu || ex.instructionEn : ex.instructionEn;
}

export function exSafety(ex, lang) {
  return lang === "ku" ? ex.safetyTipKu || ex.safetyTipEn : ex.safetyTipEn;
}

export function exMuscles(ex, lang) {
  return lang === "ku" ? ex.musclesKu || ex.musclesEn : ex.musclesEn;
}

export function exEquipment(ex, lang) {
  return lang === "ku" ? ex.equipmentKu || ex.equipmentEn : ex.equipmentEn;
}

export function secPerExercise(ex) {
  if (ex.durationSec) return Math.min(Math.max(ex.durationSec, 20), 120);
  if (ex.reps) return Math.min(Math.max(ex.reps * 4, 30), 90);
  return 45;
}

export function caloriesForExercise(ex) {
  if (ex.caloriesEstimate) return ex.caloriesEstimate;
  const sec = secPerExercise(ex);
  const cat = ex.category || "";
  const rate = ["cardio", "warm-up"].includes(cat) ? 8 : ["stretching", "cooldown", "mobility", "flexibility"].includes(cat) ? 3 : 6;
  return Math.round((sec / 60) * rate);
}

export function exDetail(ex, lang) {
  if (ex.durationSec) return lang === "ku" ? `${ex.durationSec} چرکە` : `${ex.durationSec}s`;
  if (ex.reps) return lang === "ku" ? `${ex.reps} دووبارەکردنەوە` : `${ex.reps} reps`;
  return lang === "ku" ? "٣٠ چرکە" : "30s";
}

export function isLowImpact(ex) {
  const cats = [ex.category, ...(ex.categories || [])];
  return cats.some((c) => ["low-impact", "low impact", "stretching", "mobility", "cooldown", "cool-down"].includes(c));
}

export function parseSteps(ex, lang) {
  const text = exInstruction(ex, lang);
  const parts = text.split(/[.;]\s+/).filter(Boolean);
  if (parts.length >= 2) return parts.slice(0, 4);
  return [text, lang === "ku" ? "هەناسە بە ئارامی بکە." : "Breathe steadily.", lang === "ku" ? "ئەگەر ئازار هەبوو وەستە." : "Stop if you feel sharp pain."];
}

export function exTags(ex) {
  if (Array.isArray(ex.tags) && ex.tags.length) return ex.tags;
  const tags = new Set();
  if (ex.category) tags.add(ex.category);
  (ex.categories || []).forEach((c) => tags.add(c));
  if (ex.goal) tags.add(ex.goal);
  (ex.goals || []).forEach((g) => tags.add(g));
  if (isLowImpact(ex)) tags.add("low-impact");
  return [...tags].slice(0, 6);
}

export function exGoalLabel(ex, lang, t) {
  const goal = ex.goal || ex.goals?.[0];
  const map = {
    weight_loss: "optWeightLoss",
    muscle_gain: "optMuscle",
    flexibility: "optFlex",
    stamina: "optStamina",
    general_health: "optGeneral",
  };
  return goal && t ? t(map[goal] || "optGeneral") : goal || "—";
}

export function findLowImpactAlt(ex, pool) {
  const alt = pool.find(
    (e) =>
      e.id !== ex.id &&
      e.category === ex.category &&
      isLowImpact(e) &&
      (e.musclesEn || "").split(",")[0] === (ex.musclesEn || "").split(",")[0]
  );
  return alt || pool.find((e) => e.id !== ex.id && isLowImpact(e) && e.category === ex.category);
}

const EQUIPMENT_MAP = {
  none: ["none", "هیچ", ""],
  dumbbells: ["dumbbell", "weight"],
  band: ["band", "resistance"],
  mat: ["mat"],
  chair: ["chair"],
};

const BODY_AREA_MAP = {
  full_body: ["full body", "هەموو جەستە"],
  core: ["core", "abs", "ناوەڕاست"],
  legs: ["leg", "quad", "قاچ"],
  arms: ["arm", "bicep", "بازوو"],
  back: ["back", "پشت"],
  glutes: ["glute", "گلوت"],
  cardio: ["cardio", "heart"],
};

export function matchesEquipment(ex, equipment) {
  if (!equipment || equipment === "any") return true;
  const requested = equipment.toLowerCase();
  const eq = (ex.equipmentEn || "none").toLowerCase();
  const terms = EQUIPMENT_MAP[requested];
  if (requested === "none") return !eq || eq === "none" || terms.some((t) => eq.includes(t));
  if (terms) return terms.some((t) => eq.includes(t));
  return eq === requested;
}

export function matchesBodyArea(ex, area) {
  if (!area || area === "full_body") return true;
  const muscle = (ex.musclesEn || "").toLowerCase();
  const muscleKu = ex.musclesKu || "";
  const terms = BODY_AREA_MAP[area] || [];
  return terms.some((t) => muscle.includes(t.toLowerCase()) || muscleKu.includes(t));
}

export function matchesDuration(ex, maxMin) {
  if (!maxMin) return true;
  const sec = secPerExercise(ex);
  return sec <= maxMin * 60;
}

const MUSCLE_CATEGORY_MAP = {
  chest: ["chest", "pectoral", "سینە"],
  back: ["back", "lat", "پشت"],
  shoulders: ["shoulder", "delt", "شان"],
  biceps: ["bicep", "بایسێپ"],
  triceps: ["tricep", "سێنەپشک", "ترایسێپ"],
  arms: ["arm", "bicep", "tricep", "بازوو"],
  legs: ["leg", "quad", "hamstring", "قاچ", "ڕان"],
  glutes: ["glute", "گلوت"],
  "full-body": ["full body", "هەموو جەستە"],
};

function matchesMuscleCategory(ex, category) {
  const terms = MUSCLE_CATEGORY_MAP[category];
  if (!terms) return ex.category === category || (ex.categories || []).includes(category);
  const hay = `${ex.musclesEn || ""} ${ex.musclesKu || ""} ${ex.category || ""}`.toLowerCase();
  return terms.some((t) => hay.includes(t.toLowerCase()));
}

export function filterExercises(exercises, filters, lang = "en") {
  const term = (filters.search || "").toLowerCase();
  return exercises.filter((ex) => {
    if (term) {
      const hit =
        ex.nameEn?.toLowerCase().includes(term) ||
        ex.nameKu?.includes(term) ||
        ex.musclesEn?.toLowerCase().includes(term) ||
        ex.musclesKu?.includes(term);
      if (!hit) return false;
    }
    if (filters.category) {
      const cat = filters.category;
      const inCat = ex.category === cat || (ex.categories || []).includes(cat);
      if (!inCat && !matchesMuscleCategory(ex, cat)) return false;
    }
    if (filters.level && ex.difficulty !== filters.level) return false;
    if (filters.goal && !(ex.goals || []).includes(filters.goal) && ex.goal !== filters.goal) return false;
    if (filters.equipment && !matchesEquipment(ex, filters.equipment)) return false;
    if (filters.bodyArea && !matchesBodyArea(ex, filters.bodyArea)) return false;
    if (filters.duration && !matchesDuration(ex, Number(filters.duration))) return false;
    if (filters.muscle) {
      const m = filters.muscle.toLowerCase();
      const en = (ex.musclesEn || "").toLowerCase();
      const ku = ex.musclesKu || "";
      if (!en.includes(m) && !ku.includes(filters.muscle)) return false;
    }
    if (filters.lowImpactOnly && !isLowImpact(ex)) return false;
    return true;
  });
}
