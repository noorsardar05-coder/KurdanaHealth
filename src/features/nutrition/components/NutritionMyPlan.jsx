const GOAL_KEYS = {
  energy: "goalEnergy",
  balanced: "goalBalanced",
  muscle: "goalMuscle",
  weight: "goalWeight",
  digestion: "goalDigestion",
  structure: "goalStructure",
  hydration: "goalHydration",
  protein: "goalProtein",
  "blood-sugar": "goalBloodSugar",
  family: "goalFamily",
};

const DIET_KEYS = {
  omnivore: "dietOmni",
  vegetarian: "dietVeg",
  vegan: "dietVegan",
  pescatarian: "dietPesc",
  flexitarian: "dietFlex",
};

const MEAL_TIMING_KEYS = {
  "3": "meals3",
  "4": "meals4",
  "5": "meals5",
  "6": "meals6",
};

const BUDGET_KEYS = {
  budget: "budgetLow",
  moderate: "budgetMid",
  flexible: "budgetFlex",
};

const SKILL_KEYS = {
  beginner: "skillBeginner",
  comfortable: "skillComfort",
  confident: "skillConfident",
};

const ALLERGY_KEYS = {
  none: "allNone",
  dairy: "allDairy",
  gluten: "allGluten",
  nuts: "allNuts",
  eggs: "allEggs",
  shellfish: "allShell",
  soy: "allSoy",
};

const AVOID_KEYS = {
  none: "avoidNone",
  fried: "avoidFried",
  sugary: "avoidSugar",
  "red-meat": "avoidRedMeat",
  spicy: "avoidSpicy",
};

const CUISINE_KEYS = {
  kurdish: "cuiKurdish",
  "middle-eastern": "cuiME",
  mediterranean: "cuiMed",
  asian: "cuiAsian",
  western: "cuiWest",
};

function mapList(arr, keyMap, t) {
  if (!Array.isArray(arr) || !arr.length) return "—";
  return arr.map((v) => (keyMap[v] ? t(keyMap[v]) : v)).join(" · ");
}

export default function NutritionMyPlan({ t, profile, targets, onEditProfile }) {
  const notes = profile?.cookingTime
    ? t("planNotesCook")
        .replace("{min}", String(profile.cookingTime))
        .replace("{budget}", profile.budget ? t(BUDGET_KEYS[profile.budget] || "budgetMid") : t("budgetMid"))
        .replace("{skill}", profile.cookingSkill ? t(SKILL_KEYS[profile.cookingSkill] || "skillComfort") : t("skillComfort"))
    : "—";

  return (
    <section id="nutrition-plan" className="nu-section">
      <p className="nu-section-label">{t("navPlan")}</p>
      <h2 className="nu-section-title">{t("planTitle")}</h2>
      <p className="nu-section-sub">{t("planSub")}</p>

      <div className="nu-stat-grid">
        <div className="nu-stat">
          <p className="nu-stat__label">{t("caloriesEstimate")}</p>
          <p className="nu-stat__value">
            ~{targets?.caloriesEstimate || "—"} {t("kcal")}
          </p>
        </div>
        <div className="nu-stat">
          <p className="nu-stat__label">{t("proteinTarget")}</p>
          <p className="nu-stat__value">
            ~{targets?.proteinG || "—"} {t("grams")}
          </p>
        </div>
        <div className="nu-stat">
          <p className="nu-stat__label">{t("carbTarget")}</p>
          <p className="nu-stat__value">
            ~{targets?.carbsG || "—"} {t("grams")}
          </p>
        </div>
        <div className="nu-stat">
          <p className="nu-stat__label">{t("fatTarget")}</p>
          <p className="nu-stat__value">
            ~{targets?.fatG || "—"} {t("grams")}
          </p>
        </div>
        <div className="nu-stat">
          <p className="nu-stat__label">{t("fiberTarget")}</p>
          <p className="nu-stat__value">
            ~{targets?.fiberG || "—"} {t("grams")}
          </p>
        </div>
        <div className="nu-stat">
          <p className="nu-stat__label">{t("waterTarget")}</p>
          <p className="nu-stat__value">
            ~{targets?.waterMl || "—"} {t("ml")}
          </p>
        </div>
      </div>

      <div className="nu-card" style={{ marginTop: "1rem" }}>
        <p className="nu-section-label">{t("mealTiming")}</p>
        <p className="nu-soft">
          {profile?.mealsPerDay ? t(MEAL_TIMING_KEYS[profile.mealsPerDay] || "meals3") : "—"}
        </p>
        <p className="nu-section-label" style={{ marginTop: "0.85rem" }}>
          {t("preferences")}
        </p>
        <p className="nu-soft">
          {profile?.dietPref ? t(DIET_KEYS[profile.dietPref] || "dietOmni") : "—"}
        </p>
        <p className="nu-section-label" style={{ marginTop: "0.85rem" }}>
          {t("allergiesLabel")}
        </p>
        <p className="nu-soft">{mapList(profile?.allergies, ALLERGY_KEYS, t)}</p>
        <p className="nu-section-label" style={{ marginTop: "0.85rem" }}>
          {t("foodsLimit")}
        </p>
        <p className="nu-soft">{mapList(profile?.avoidFoods, AVOID_KEYS, t)}</p>
        <p className="nu-section-label" style={{ marginTop: "0.85rem" }}>
          {t("foodsInclude")}
        </p>
        <p className="nu-soft">{mapList(profile?.cuisines, CUISINE_KEYS, t)}</p>
        <p className="nu-section-label" style={{ marginTop: "0.85rem" }}>
          {t("weeklyGoals")}
        </p>
        <p className="nu-soft">{profile?.goal ? t(GOAL_KEYS[profile.goal] || "goalBalanced") : "—"}</p>
        <p className="nu-section-label" style={{ marginTop: "0.85rem" }}>
          {t("personalizedNotes")}
        </p>
        <p className="nu-soft">{notes}</p>
      </div>

      <p className="nu-disclaimer">{t("estimateDisclaimer")}</p>
      <div className="nu-actions">
        <button type="button" className="nu-btn nu-btn--soft" onClick={onEditProfile}>
          {t("editProfile")}
        </button>
      </div>
    </section>
  );
}
