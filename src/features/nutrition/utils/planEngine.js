/**
 * Estimate daily nutrition targets from profile.
 * Educational estimates only — not medical prescriptions.
 */
export function estimateNutritionTargets(profile = {}) {
  const activityMult = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very: 1.9,
  };

  const weight = Number(profile.weightKg) || 65;
  const height = Number(profile.heightCm) || 165;
  const ageMid = {
    "under-18": 16,
    "18-24": 21,
    "25-34": 29,
    "35-44": 39,
    "45-54": 49,
    "55-64": 59,
    "65-plus": 68,
  };
  const age = ageMid[profile.ageRange] || 30;
  const sexFactor = profile.sex === "male" ? 5 : profile.sex === "female" ? -161 : -78;

  const bmr = 10 * weight + 6.25 * height - 5 * age + sexFactor;
  const mult = activityMult[profile.activity] || 1.375;
  let calories = Math.round(bmr * mult);

  const adjustMap = {
    energy: 0,
    balanced: 0,
    muscle: 200,
    weight: -250,
    digestion: 0,
    structure: 0,
    hydration: 0,
    protein: 100,
    "blood-sugar": -50,
    family: 0,
  };
  calories += adjustMap[profile.goal] || 0;
  calories = Math.max(1400, Math.min(3200, calories));

  const proteinPerKg = profile.goal === "muscle" || profile.goal === "protein" ? 1.6 : 1.2;
  const protein = Math.round(weight * proteinPerKg);
  const fat = Math.round((calories * 0.28) / 9);
  const carbs = Math.round((calories - protein * 4 - fat * 9) / 4);
  const fiber = profile.goal === "digestion" ? 30 : 25;
  const waterMl = Math.round(weight * 35);

  return {
    caloriesEstimate: calories,
    proteinG: protein,
    carbsG: Math.max(120, carbs),
    fatG: fat,
    fiberG: fiber,
    waterMl,
    note: "estimate",
  };
}

export function buildWeekDates(from = new Date()) {
  const start = new Date(from);
  start.setHours(0, 0, 0, 0);
  const day = start.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  start.setDate(start.getDate() + mondayOffset);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d.toISOString().slice(0, 10);
  });
}

export function dateKey(d = new Date()) {
  return new Date(d).toISOString().slice(0, 10);
}
