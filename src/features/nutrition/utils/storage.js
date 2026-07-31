import { getUser } from "../../../utils/storage.js";

function getNutritionUserKey() {
  const user = getUser();
  if (!user) return "kurdana_nutrition_guest";
  return user.id || user.email || user.name || "kurdana_nutrition_guest";
}

const keys = {
  profile: () => `kurdana_nutrition_profile_${getNutritionUserKey()}`,
  plan: () => `kurdana_nutrition_plan_${getNutritionUserKey()}`,
  meals: () => `kurdana_nutrition_meals_${getNutritionUserKey()}`,
  tracker: () => `kurdana_nutrition_tracker_${getNutritionUserKey()}`,
  favorites: () => `kurdana_nutrition_fav_recipes_${getNutritionUserKey()}`,
  grocery: () => `kurdana_nutrition_grocery_${getNutritionUserKey()}`,
  onboardingDraft: () => `kurdana_nutrition_onboard_draft_${getNutritionUserKey()}`,
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

export function loadNutritionProfile() {
  return readJson(keys.profile(), null);
}

export function saveNutritionProfile(profile) {
  writeJson(keys.profile(), { ...profile, updatedAt: new Date().toISOString() });
}

export function loadMealPlan() {
  return readJson(keys.meals(), {});
}

export function saveMealPlan(plan) {
  writeJson(keys.meals(), plan || {});
}

export function loadTracker() {
  const fallback = { waterMl: 0, proteinG: 0, fiberG: 0, energy: null, mealsLogged: [], date: null };
  const data = readJson(keys.tracker(), fallback);
  return data && typeof data === "object" ? { ...fallback, ...data } : fallback;
}

export function saveTracker(data) {
  writeJson(keys.tracker(), data);
}

export function loadFavoriteRecipes() {
  const data = readJson(keys.favorites(), []);
  return Array.isArray(data) ? data : [];
}

export function saveFavoriteRecipes(ids) {
  writeJson(keys.favorites(), Array.isArray(ids) ? ids : []);
}

export function loadGroceryList() {
  const data = readJson(keys.grocery(), []);
  return Array.isArray(data) ? data : [];
}

export function saveGroceryList(items) {
  writeJson(keys.grocery(), Array.isArray(items) ? items : []);
}

export function loadOnboardingDraft() {
  return readJson(keys.onboardingDraft(), null);
}

export function saveOnboardingDraft(draft) {
  if (draft == null) {
    try {
      localStorage.removeItem(keys.onboardingDraft());
    } catch {
      /* ignore */
    }
    return;
  }
  writeJson(keys.onboardingDraft(), draft);
}
