import { useMemo, useState } from "react";
import { L } from "../utils/locale.js";
import { getRecipeBySlug, NUTRITION_RECIPES } from "../data/nutritionRecipes.js";
import { buildWeekDates } from "../utils/planEngine.js";

const SLOTS = [
  "breakfast",
  "morningSnack",
  "lunch",
  "afternoonSnack",
  "dinner",
  "eveningSnack",
];

function SafeImg({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt || ""}
      className="nu-meal-slot__img"
      loading="lazy"
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src =
          "data:image/svg+xml," +
          encodeURIComponent(
            `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="120"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#E9E0D0"/><stop offset="1" stop-color="#A7B39B"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>`,
          );
      }}
    />
  );
}

function slotMealType(slot) {
  if (slot === "breakfast") return "breakfast";
  if (slot === "lunch") return "lunch";
  if (slot === "dinner") return "dinner";
  return "snack";
}

export default function NutritionMeals({
  t,
  lang,
  mealPlan,
  todayKey,
  profile,
  onUpdatePlan,
  onOpenRecipe,
  grocery,
  onToggleGrocery,
  onRebuildGrocery,
  onRemoveGrocery,
  onAdjustGroceryServings,
}) {
  const [view, setView] = useState("today");
  const week = useMemo(() => buildWeekDates(), []);
  const [day, setDay] = useState(todayKey);
  const [swapFrom, setSwapFrom] = useState(null);
  const [filter, setFilter] = useState({ quick: false, budget: false, cuisine: false, diet: false });
  const [noteSlot, setNoteSlot] = useState(null);
  const activeDay = view === "today" ? todayKey : day;
  const dayPlan = mealPlan?.[activeDay] || {};

  const filteredPool = useMemo(() => {
    let pool = NUTRITION_RECIPES;
    if (filter.quick) pool = pool.filter((r) => r.preparationTime + r.cookingTime <= 30);
    if (filter.budget) pool = pool.filter((r) => r.costLevel === "budget" || r.costLevel === "low");
    if (filter.cuisine && profile?.cuisines?.length) {
      pool = pool.filter((r) => profile.cuisines.some((c) => (r.cuisine || "").includes(c) || (r.dietaryTags || []).includes(c)));
    }
    if (filter.diet && profile?.dietPref) {
      const pref = profile.dietPref;
      if (pref === "vegan") pool = pool.filter((r) => (r.dietaryTags || []).includes("vegan"));
      else if (pref === "vegetarian") {
        pool = pool.filter((r) => (r.dietaryTags || []).some((d) => d === "vegetarian" || d === "vegan"));
      }
    }
    return pool.length ? pool : NUTRITION_RECIPES;
  }, [filter, profile]);

  const suggestForSlot = (slot) => {
    const mealType = slotMealType(slot);
    const pool = filteredPool.filter((r) => r.mealType === mealType);
    const pick = pool[Math.floor(Math.random() * pool.length)] || filteredPool[0] || NUTRITION_RECIPES[0];
    onUpdatePlan({
      ...mealPlan,
      [activeDay]: {
        ...(mealPlan[activeDay] || {}),
        [slot]: { recipeId: pick.id, eaten: false, notes: dayPlan[slot]?.notes || "" },
      },
    });
  };

  const patchSlot = (slot, patch) => {
    const current = dayPlan[slot] || {};
    onUpdatePlan({
      ...mealPlan,
      [activeDay]: {
        ...dayPlan,
        [slot]: { ...current, ...patch },
      },
    });
  };

  const clearSlot = (slot) => {
    const copy = { ...dayPlan };
    delete copy[slot];
    onUpdatePlan({ ...mealPlan, [activeDay]: copy });
  };

  const duplicateToTomorrow = (slot) => {
    const entry = dayPlan[slot];
    if (!entry) return;
    const idx = week.indexOf(activeDay);
    const nextDay = week[Math.min(week.length - 1, idx + 1)] || activeDay;
    onUpdatePlan({
      ...mealPlan,
      [nextDay]: { ...(mealPlan[nextDay] || {}), [slot]: { ...entry } },
    });
  };

  const handleSwapDay = (otherDay) => {
    if (!swapFrom || swapFrom === otherDay) {
      setSwapFrom(null);
      return;
    }
    onUpdatePlan({
      ...mealPlan,
      [swapFrom]: mealPlan[otherDay] || {},
      [otherDay]: mealPlan[swapFrom] || {},
    });
    setSwapFrom(null);
  };

  const groupedGrocery = useMemo(() => {
    const map = {};
    (grocery || []).forEach((item) => {
      const cat = item.category || "other";
      if (!map[cat]) map[cat] = [];
      map[cat].push(item);
    });
    return Object.entries(map);
  }, [grocery]);

  return (
    <section id="nutrition-meals" className="nu-section">
      <p className="nu-section-label">{t("navMeals")}</p>
      <h2 className="nu-section-title">{t("mealsTitle")}</h2>
      <p className="nu-section-sub">{t("mealsSub")}</p>

      <div className="nu-chip-row" role="tablist">
        {["today", "week", "calendar"].map((v) => (
          <button
            key={v}
            type="button"
            className={`nu-chip ${view === v ? "is-active" : ""}`}
            onClick={() => setView(v)}
          >
            {t(v === "today" ? "mealsToday" : v === "week" ? "mealsWeek" : "mealsCalendar")}
          </button>
        ))}
      </div>

      <div className="nu-chip-row">
        {[
          ["quick", "filterQuick"],
          ["budget", "filterBudget"],
          ["cuisine", "filterCuisine"],
          ["diet", "filterDiet"],
        ].map(([key, labelKey]) => (
          <button
            key={key}
            type="button"
            className={`nu-chip ${filter[key] ? "is-active" : ""}`}
            onClick={() => setFilter((f) => ({ ...f, [key]: !f[key] }))}
          >
            {t(labelKey)}
          </button>
        ))}
      </div>

      {view !== "today" && (
        <div className="nu-week-tabs">
          {week.map((d) => (
            <button
              key={d}
              type="button"
              className={`nu-chip ${activeDay === d ? "is-active" : ""} ${swapFrom === d ? "is-swap" : ""}`}
              onClick={() => {
                if (swapFrom) handleSwapDay(d);
                else setDay(d);
              }}
            >
              {d.slice(5)}
            </button>
          ))}
          <button
            type="button"
            className={`nu-chip ${swapFrom ? "is-active" : ""}`}
            onClick={() => setSwapFrom(swapFrom ? null : activeDay)}
          >
            {t("swapDays")}
          </button>
        </div>
      )}

      {view === "calendar" && (
        <div className="nu-calendar-grid">
          {week.map((d) => {
            const plan = mealPlan?.[d] || {};
            const count = SLOTS.filter((s) => plan[s]?.recipeId).length;
            return (
              <button
                key={d}
                type="button"
                className={`nu-calendar-day ${activeDay === d ? "is-active" : ""}`}
                onClick={() => {
                  setDay(d);
                  setView("week");
                }}
              >
                <span className="nu-calendar-day__date">{d.slice(5)}</span>
                <span className="nu-calendar-day__count">{count}/6</span>
              </button>
            );
          })}
        </div>
      )}

      {view !== "calendar" && (
        <div className="nu-meal-day">
          {SLOTS.map((slot) => {
            const entry = dayPlan[slot];
            const recipe = entry?.recipeId ? getRecipeBySlug(entry.recipeId) : null;
            return (
              <div key={slot} className="nu-meal-slot nu-meal-slot--rich">
                {recipe && <SafeImg src={recipe.image} alt={L(recipe.title, lang)} />}
                <div className="nu-meal-slot__body">
                  <p className="nu-meal-slot__title">{t(slot)}</p>
                  <p className="nu-meal-slot__name">{recipe ? L(recipe.title, lang) : "—"}</p>
                  {recipe && (
                    <p className="nu-recipe-card__meta">
                      ~{recipe.caloriesEstimate} {t("kcal")} · P {recipe.protein}
                      {t("grams")} · C {recipe.carbohydrates}
                      {t("grams")} · F {recipe.fat}
                      {t("grams")} · Fi {recipe.fiber}
                      {t("grams")} · {recipe.preparationTime + recipe.cookingTime} {t("minutes")}
                    </p>
                  )}
                  {entry?.notes && <p className="nu-hint">{entry.notes}</p>}
                  {entry?.eaten && <p className="nu-hint">✓ {t("markEaten")}</p>}
                  {noteSlot === slot && (
                    <textarea
                      className="nu-notes"
                      rows={2}
                      placeholder={t("notesHint")}
                      value={entry?.notes || ""}
                      onChange={(e) => patchSlot(slot, { notes: e.target.value })}
                      onBlur={() => setNoteSlot(null)}
                      autoFocus
                    />
                  )}
                </div>
                <div className="nu-meal-slot__actions">
                  <button type="button" className="nu-btn nu-btn--soft" onClick={() => suggestForSlot(slot)}>
                    {recipe ? t("replaceMeal") : t("addMeal")}
                  </button>
                  {recipe && (
                    <>
                      <button type="button" className="nu-btn nu-btn--ghost" onClick={() => onOpenRecipe(recipe)}>
                        {t("viewRecipe")}
                      </button>
                      <button
                        type="button"
                        className="nu-btn nu-btn--ghost"
                        onClick={() => patchSlot(slot, { eaten: !entry?.eaten })}
                      >
                        {t("markEaten")}
                      </button>
                      <button type="button" className="nu-btn nu-btn--ghost" onClick={() => duplicateToTomorrow(slot)}>
                        {t("duplicateMeal")}
                      </button>
                      <button type="button" className="nu-btn nu-btn--ghost" onClick={() => suggestForSlot(slot)}>
                        {t("generateAlt")}
                      </button>
                      <button type="button" className="nu-btn nu-btn--ghost" onClick={() => setNoteSlot(slot)}>
                        {t("addNotes")}
                      </button>
                      <button type="button" className="nu-btn nu-btn--ghost" onClick={() => clearSlot(slot)}>
                        {t("skipMeal")}
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <h3 className="nu-subsection-title" style={{ marginTop: "1.5rem" }}>
        {t("groceryList")}
      </h3>
      <div className="nu-actions">
        <button type="button" className="nu-btn nu-btn--soft" onClick={onRebuildGrocery}>
          {t("groupByCategory")}
        </button>
        <button type="button" className="nu-btn nu-btn--ghost" onClick={() => window.print()}>
          {t("exportPrint")}
        </button>
      </div>
      <div className="nu-card" style={{ marginTop: "0.75rem" }}>
        {!grocery?.length ? (
          <p className="nu-soft">{t("emptyStart")}</p>
        ) : (
          groupedGrocery.map(([cat, items]) => (
            <div key={cat} className="nu-grocery-group">
              <p className="nu-section-label">{cat}</p>
              {items.map((item) => (
                <div key={item.id} className="nu-grocery-item nu-grocery-item--row">
                  <label>
                    <input
                      type="checkbox"
                      checked={Boolean(item.checked)}
                      onChange={() => onToggleGrocery(item.id)}
                    />
                    <span>
                      {item.name} {item.servings > 1 ? `· ×${item.servings}` : ""}
                    </span>
                  </label>
                  <div className="nu-grocery-item__actions">
                    {onAdjustGroceryServings && (
                      <>
                        <button
                          type="button"
                          className="nu-btn nu-btn--ghost"
                          onClick={() => onAdjustGroceryServings(item.id, Math.max(1, (item.servings || 1) - 1))}
                        >
                          −
                        </button>
                        <button
                          type="button"
                          className="nu-btn nu-btn--ghost"
                          onClick={() => onAdjustGroceryServings(item.id, (item.servings || 1) + 1)}
                        >
                          +
                        </button>
                      </>
                    )}
                    {onRemoveGrocery && (
                      <button type="button" className="nu-btn nu-btn--ghost" onClick={() => onRemoveGrocery(item.id)}>
                        {t("removeIngredient")}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </section>
  );
}
