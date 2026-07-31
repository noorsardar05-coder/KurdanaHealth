import { L } from "../utils/locale.js";
import { getRecipeBySlug } from "../data/nutritionRecipes.js";

function greetingKey() {
  const h = new Date().getHours();
  if (h < 12) return "greetMorning";
  if (h < 17) return "greetAfternoon";
  return "greetEvening";
}

function pct(value, target) {
  if (!target) return 0;
  return Math.min(100, Math.round((Number(value) / Number(target)) * 100));
}

function ProgressStat({ label, value, target, unit, emptyLabel }) {
  const hasProgress = Number(value) > 0;
  return (
    <div className="nu-stat">
      <p className="nu-stat__label">{label}</p>
      {hasProgress ? (
        <>
          <p className="nu-stat__value">
            {value} {unit}
          </p>
          <div className="nu-meter" aria-hidden="true">
            <span style={{ width: `${pct(value, target)}%` }} />
          </div>
        </>
      ) : (
        <p className="nu-stat__empty">{emptyLabel}</p>
      )}
    </div>
  );
}

export default function NutritionHome({
  t,
  lang,
  userName,
  targets,
  tracker,
  mealPlan,
  todayKey,
  onOpenMeals,
  onOpenTracker,
  onOpenRecipe,
}) {
  const name = userName || (lang === "ku" ? "هاوڕێ" : "friend");
  const todayMeals = mealPlan?.[todayKey] || {};
  const slots = ["breakfast", "lunch", "dinner"];
  const filled = slots.filter((s) => todayMeals[s]?.recipeId).length;
  const hasAnyProgress =
    filled > 0 || tracker.waterMl > 0 || tracker.proteinG > 0 || tracker.fiberG > 0 || tracker.energy;

  return (
    <section id="nutrition-home" className="nu-section">
      <div className="nu-hero">
        <p className="nu-section-label">{t("brandBadge")}</p>
        <h2>
          {t(greetingKey())}, {name}
        </h2>
        <p>{t("homeHeroSub")}</p>
        <div className="nu-actions">
          <button type="button" className="nu-btn nu-btn--primary" onClick={onOpenMeals}>
            {t("viewTodayMeals")}
          </button>
          <button type="button" className="nu-btn nu-btn--soft" onClick={onOpenMeals}>
            {t("logMeal")}
          </button>
          <button type="button" className="nu-btn nu-btn--ghost" onClick={onOpenTracker}>
            {t("checkHydration")}
          </button>
        </div>
      </div>

      {!hasAnyProgress && <p className="nu-empty">{t("emptyStart")}</p>}

      <div className="nu-stat-grid">
        <div className="nu-stat">
          <p className="nu-stat__label">{t("todayPlan")}</p>
          {filled > 0 ? (
            <p className="nu-stat__value">
              {filled}/{slots.length}
            </p>
          ) : (
            <p className="nu-stat__empty">{t("emptyStart")}</p>
          )}
        </div>
        <ProgressStat
          label={t("waterProgress")}
          value={tracker.waterMl || 0}
          target={targets?.waterMl}
          unit={t("ml")}
          emptyLabel={t("notStartedYet")}
        />
        <ProgressStat
          label={t("proteinProgress")}
          value={tracker.proteinG || 0}
          target={targets?.proteinG}
          unit={t("grams")}
          emptyLabel={t("notStartedYet")}
        />
        <ProgressStat
          label={t("fiberProgress")}
          value={tracker.fiberG || 0}
          target={targets?.fiberG}
          unit={t("grams")}
          emptyLabel={t("notStartedYet")}
        />
        <div className="nu-stat">
          <p className="nu-stat__label">{t("energyCheckin")}</p>
          <p className="nu-stat__value">
            {tracker.energy === "low"
              ? t("energyLow")
              : tracker.energy === "mixed"
                ? t("energyMixed")
                : tracker.energy === "steady"
                  ? t("energySteady")
                  : "—"}
          </p>
        </div>
        <div className="nu-stat">
          <p className="nu-stat__label">{t("weeklyConsistency")}</p>
          {(tracker.weekDays || 0) > 0 ? (
            <p className="nu-stat__value">{tracker.weekDays}/7</p>
          ) : (
            <p className="nu-stat__empty">{t("notStartedYet")}</p>
          )}
        </div>
      </div>

      <h3 className="nu-subsection-title" style={{ marginTop: "1.5rem" }}>
        {t("todayPlan")}
      </h3>
      <div className="nu-meal-day">
        {slots.map((slot) => {
          const entry = todayMeals[slot];
          const recipe = entry?.recipeId ? getRecipeBySlug(entry.recipeId) : null;
          return (
            <div key={slot} className="nu-meal-slot">
              <div>
                <p className="nu-meal-slot__title">{t(slot)}</p>
                <p className="nu-meal-slot__name">{recipe ? L(recipe.title, lang) : t("emptyStart")}</p>
              </div>
              {recipe && (
                <button type="button" className="nu-btn nu-btn--ghost" onClick={() => onOpenRecipe(recipe)}>
                  {t("viewRecipe")}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
