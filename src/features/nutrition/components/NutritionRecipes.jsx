import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { L } from "../utils/locale.js";
import {
  NUTRITION_RECIPES,
  RECIPE_CATEGORIES,
  getRecipesByCategory,
  searchRecipes,
} from "../data/nutritionRecipes.js";
import { FOOD_CATEGORIES, NUTRITION_FOODS, searchFoods } from "../data/nutritionFoods.js";

function SafeImg({ src, alt, className }) {
  return (
    <img
      src={src}
      alt={alt || ""}
      className={className}
      loading="lazy"
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src =
          "data:image/svg+xml," +
          encodeURIComponent(
            `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#E9E0D0"/><stop offset="1" stop-color="#A7B39B"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>`,
          );
      }}
    />
  );
}

export default function NutritionRecipes({
  t,
  lang,
  favorites,
  onToggleFavorite,
  onOpenRecipe,
  onOpenFood,
}) {
  const [tab, setTab] = useState("recipes");
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");

  const recipes = useMemo(() => {
    let list = q.trim() ? searchRecipes(q) : getRecipesByCategory(cat);
    return list;
  }, [cat, q]);

  const foods = useMemo(() => {
    if (q.trim()) return searchFoods(q);
    if (cat === "all") return NUTRITION_FOODS.slice(0, 60);
    return NUTRITION_FOODS.filter((f) => f.category === cat).slice(0, 80);
  }, [cat, q]);

  const cats = tab === "recipes" ? RECIPE_CATEGORIES : FOOD_CATEGORIES;

  return (
    <section id="nutrition-recipes" className="nu-section">
      <p className="nu-section-label">{t("navRecipes")}</p>
      <h2 className="nu-section-title">{tab === "recipes" ? t("recipesTitle") : t("foodsTitle")}</h2>
      <p className="nu-section-sub">{tab === "recipes" ? t("recipesSub") : t("foodsSub")}</p>
      <p className="nu-soft">
        {tab === "recipes"
          ? t("recipeCount").replace("{n}", String(NUTRITION_RECIPES.length))
          : t("foodCount").replace("{n}", String(NUTRITION_FOODS.length))}
      </p>

      <div className="nu-chip-row">
        <button type="button" className={`nu-chip ${tab === "recipes" ? "is-active" : ""}`} onClick={() => { setTab("recipes"); setCat("all"); }}>
          {t("navRecipes")}
        </button>
        <button type="button" className={`nu-chip ${tab === "foods" ? "is-active" : ""}`} onClick={() => { setTab("foods"); setCat("all"); }}>
          {t("foodsTitle")}
        </button>
      </div>

      <div className="nu-search">
        <Search size={16} aria-hidden="true" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={tab === "recipes" ? t("searchRecipes") : t("searchFoods")}
          aria-label={tab === "recipes" ? t("searchRecipes") : t("searchFoods")}
        />
      </div>

      <div className="nu-chip-row">
        {cats.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`nu-chip ${cat === c.id ? "is-active" : ""}`}
            onClick={() => setCat(c.id)}
          >
            {L(c.label, lang)}
          </button>
        ))}
      </div>

      {tab === "recipes" ? (
        <div className="nu-grid">
          {recipes.map((r) => (
            <button key={r.id} type="button" className="nu-recipe-card" onClick={() => onOpenRecipe(r)}>
              <SafeImg src={r.image} alt={L(r.title, lang)} className="nu-recipe-card__img" />
              <div className="nu-recipe-card__body">
                <h3 className="nu-recipe-card__title">{L(r.title, lang)}</h3>
                <p className="nu-soft" style={{ fontSize: "0.78rem" }}>
                  {L(r.description, lang)}
                </p>
                <p className="nu-recipe-card__meta">
                  {r.preparationTime + r.cookingTime} {t("minutes")} · ~{r.caloriesEstimate} {t("kcal")} · P
                  {r.protein}
                  {t("grams")}
                </p>
                <button
                  type="button"
                  className={`nu-btn nu-btn--ghost ${favorites.includes(r.id) ? "is-on" : ""}`}
                  style={{ marginTop: "0.55rem" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(r.id);
                  }}
                >
                  {favorites.includes(r.id) ? t("saved") : t("saveFavorite")}
                </button>
              </div>
            </button>
          ))}
          {!recipes.length && <p className="nu-empty">{t("noResults")}</p>}
        </div>
      ) : (
        <div className="nu-grid">
          {foods.map((f) => (
            <button key={f.id} type="button" className="nu-food-card" onClick={() => onOpenFood(f)}>
              <div className="nu-food-card__swatch" aria-hidden="true">
                ✿
              </div>
              <div className="nu-food-card__body">
                <h3 className="nu-food-card__title">{L(f.name, lang)}</h3>
                <p className="nu-food-card__meta">
                  ~{f.caloriesEstimate} {t("kcal")} · P{f.protein}
                  {t("grams")} · F{f.fiber}
                  {t("grams")}
                </p>
              </div>
            </button>
          ))}
          {!foods.length && <p className="nu-empty">{t("noResults")}</p>}
        </div>
      )}
    </section>
  );
}
