import { X } from "lucide-react";
import { L } from "../utils/locale.js";

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

export default function NutritionRecipeModal({ recipe, lang, t, isFavorite, onClose, onToggleFavorite }) {
  if (!recipe) return null;
  const ingredients = recipe.ingredients || [];
  const instructions = recipe.instructions?.[lang === "ku" ? "ku" : "en"] || recipe.instructions?.en || [];

  return (
    <div className="nu-modal-backdrop" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="nu-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="nu-modal__close" onClick={onClose} aria-label={t("close")}>
          <X size={16} />
        </button>
        <SafeImg src={recipe.image} alt={L(recipe.title, lang)} className="nu-modal__img" />
        <h2>{L(recipe.title, lang)}</h2>
        <p className="nu-soft">{L(recipe.description, lang)}</p>
        <p className="nu-recipe-card__meta">
          {t("prepTime")} {recipe.preparationTime} {t("minutes")} · {t("cookTime")} {recipe.cookingTime}{" "}
          {t("minutes")} · {t("servings")} {recipe.servings}
        </p>
        <p className="nu-recipe-card__meta">
          ~{recipe.caloriesEstimate} {t("kcal")} · P{recipe.protein}
          {t("grams")} · C{recipe.carbohydrates}
          {t("grams")} · F{recipe.fat}
          {t("grams")} · Fiber {recipe.fiber}
          {t("grams")}
        </p>
        <div className="nu-actions">
          <button type="button" className="nu-btn nu-btn--soft" onClick={() => onToggleFavorite?.(recipe.id)}>
            {isFavorite ? t("saved") : t("saveFavorite")}
          </button>
        </div>
        {L(recipe.whyFits, lang) && (
          <>
            <p className="nu-section-label" style={{ marginTop: "0.85rem" }}>
              {t("whyFits")}
            </p>
            <p className="nu-soft">{L(recipe.whyFits, lang)}</p>
          </>
        )}
        <p className="nu-section-label" style={{ marginTop: "0.85rem" }}>
          {t("ingredients")}
        </p>
        <ul className="nu-list">
          {ingredients.map((ing, i) => (
            <li key={i}>
              {L(ing.name, lang)}
              {ing.amount ? ` — ${ing.amount}${ing.unit ? ` ${ing.unit}` : ""}` : ""}
            </li>
          ))}
        </ul>
        <p className="nu-section-label" style={{ marginTop: "0.85rem" }}>
          {t("instructions")}
        </p>
        <ol className="nu-list">
          {instructions.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
        {(recipe.allergens || []).length > 0 && (
          <>
            <p className="nu-section-label" style={{ marginTop: "0.85rem" }}>
              {t("allergens")}
            </p>
            <p className="nu-soft">{recipe.allergens.join(" · ")}</p>
          </>
        )}
        {L(recipe.substitutions, lang) && (
          <>
            <p className="nu-section-label" style={{ marginTop: "0.85rem" }}>
              {t("substitutions")}
            </p>
            <p className="nu-soft">{L(recipe.substitutions, lang)}</p>
          </>
        )}
        {L(recipe.storageInstructions, lang) && (
          <>
            <p className="nu-section-label" style={{ marginTop: "0.85rem" }}>
              {t("storage")}
            </p>
            <p className="nu-soft">{L(recipe.storageInstructions, lang)}</p>
          </>
        )}
        <p className="nu-hint">{t("educationalOnly")}</p>
      </div>
    </div>
  );
}

export function NutritionFoodModal({ food, lang, t, onClose }) {
  if (!food) return null;
  return (
    <div className="nu-modal-backdrop" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="nu-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="nu-modal__close" onClick={onClose} aria-label={t("close")}>
          <X size={16} />
        </button>
        <h2>{L(food.name, lang)}</h2>
        <p className="nu-recipe-card__meta">
          {t("servingSize")}: {L(food.servingSize, lang)} · ~{food.caloriesEstimate} {t("kcal")}
        </p>
        <p className="nu-soft">
          P{food.protein}
          {t("grams")} · C{food.carbohydrates}
          {t("grams")} · F{food.fat}
          {t("grams")} · Fiber {food.fiber}
          {t("grams")}
        </p>
        {(food.vitamins || []).length > 0 && (
          <>
            <p className="nu-section-label" style={{ marginTop: "0.75rem" }}>
              {t("vitamins")}
            </p>
            <p className="nu-soft">{food.vitamins.join(" · ")}</p>
          </>
        )}
        {(food.minerals || []).length > 0 && (
          <>
            <p className="nu-section-label" style={{ marginTop: "0.75rem" }}>
              {t("minerals")}
            </p>
            <p className="nu-soft">{food.minerals.join(" · ")}</p>
          </>
        )}
        {(food.allergens || []).length > 0 && (
          <>
            <p className="nu-section-label" style={{ marginTop: "0.75rem" }}>
              {t("allergens")}
            </p>
            <p className="nu-soft">{food.allergens.join(" · ")}</p>
          </>
        )}
        {L(food.suitabilityNotes, lang) && (
          <>
            <p className="nu-section-label" style={{ marginTop: "0.75rem" }}>
              {t("suitability")}
            </p>
            <p className="nu-soft">{L(food.suitabilityNotes, lang)}</p>
          </>
        )}
        {L(food.preparationMethods, lang) && (
          <>
            <p className="nu-section-label" style={{ marginTop: "0.75rem" }}>
              {t("prepMethods")}
            </p>
            <p className="nu-soft">{L(food.preparationMethods, lang)}</p>
          </>
        )}
        <p className="nu-hint">{t("educationalOnly")}</p>
      </div>
    </div>
  );
}
