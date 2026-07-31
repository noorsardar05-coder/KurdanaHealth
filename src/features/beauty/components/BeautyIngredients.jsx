import { useMemo, useState } from "react";
import { Search, FlaskConical, Sparkles } from "lucide-react";
import {
  INGREDIENT_SECTIONS,
  INGREDIENT_FILTERS,
  getLocalizedIngredients,
} from "../data/beautyIngredients.js";
import { L } from "../utils/locale.js";

export default function BeautyIngredients({ t, lang = "en", onIngredientClick }) {
  const [search, setSearch] = useState("");
  const [section, setSection] = useState("all");
  const [filter, setFilter] = useState("all");

  const ingredients = useMemo(() => getLocalizedIngredients(lang), [lang]);

  const filtered = useMemo(() => {
    let list = [...ingredients];
    if (section !== "all") list = list.filter((i) => i.category === section);
    if (filter !== "all") {
      list = list.filter((i) => (i.filters || []).includes(filter));
    }
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter((i) => (i.searchText || "").includes(q));
    }
    list.sort((a, b) => String(a.name).localeCompare(String(b.name), lang === "ku" ? "ckb" : "en"));
    return list;
  }, [ingredients, section, filter, search, lang]);

  const sectioned = useMemo(() => {
    if (section !== "all" || filter !== "all" || search.trim()) return null;
    return INGREDIENT_SECTIONS.map((sec) => ({
      ...sec,
      label: L(sec.label, lang),
      items: ingredients.filter((i) => i.category === sec.id).slice(0, 12),
    })).filter((s) => s.items.length);
  }, [ingredients, section, filter, search, lang]);

  return (
    <section id="beauty-ingredients" className="bt-section bt-ingredients">
      <p className="bt-section-label">{t("ingEyebrow")}</p>
      <h2 className="bt-section-title">{t("ingTitle")}</h2>
      <p className="bt-section-sub">{t("ingSub")}</p>
      <p className="bt-library-count">
        {t("ingCount").replace("{n}", String(ingredients.length))}
      </p>
      <p className="bt-disclaimer-inline">{t("ingDisclaimer")}</p>

      <div className="bt-ing-search">
        <Search size={16} strokeWidth={1.75} aria-hidden="true" />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("ingSearchPlaceholder")}
          aria-label={t("ingSearchPlaceholder")}
        />
      </div>

      <p className="bt-chip-heading">{t("ingFilters")}</p>
      <div className="bt-library-chips" role="tablist" aria-label={t("ingFilters")}>
        <button
          type="button"
          className={`bt-chip ${filter === "all" ? "is-active" : ""}`}
          onClick={() => setFilter("all")}
        >
          {t("ingAllFilters")}
        </button>
        {INGREDIENT_FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            className={`bt-chip ${filter === f.id ? "is-active" : ""}`}
            onClick={() => setFilter(f.id)}
          >
            {L(f.label, lang)}
          </button>
        ))}
      </div>

      <p className="bt-chip-heading">{t("ingCategories")}</p>
      <div className="bt-library-chips" role="tablist" aria-label={t("ingCategories")}>
        <button
          type="button"
          className={`bt-chip ${section === "all" ? "is-active" : ""}`}
          onClick={() => setSection("all")}
        >
          {t("ingAllCategories")}
        </button>
        {INGREDIENT_SECTIONS.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`bt-chip ${section === s.id ? "is-active" : ""}`}
            onClick={() => setSection(s.id)}
          >
            {L(s.label, lang)}
          </button>
        ))}
      </div>

      {sectioned ? (
        sectioned.map((sec) => (
          <div key={sec.id} className="bt-ing-shelf">
            <div className="bt-section-head">
              <h3 className="bt-subsection-title">{sec.label}</h3>
              <button
                type="button"
                className="bt-text-link"
                onClick={() => setSection(sec.id)}
              >
                {t("ingViewAll")}
              </button>
            </div>
            <div className="bt-ing-grid">
              {sec.items.map((ing) => (
                <IngredientCard
                  key={ing.id}
                  ingredient={ing}
                  t={t}
                  onClick={() => onIngredientClick?.(ing)}
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="bt-ing-results">
          <p className="bt-ing-results__count">
            {t("ingResults").replace("{n}", String(filtered.length))}
          </p>
          {filtered.length === 0 ? (
            <p className="bt-soft-copy">{t("ingEmpty")}</p>
          ) : (
            <div className="bt-ing-grid">
              {filtered.map((ing) => (
                <IngredientCard
                  key={ing.id}
                  ingredient={ing}
                  t={t}
                  onClick={() => onIngredientClick?.(ing)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function IngredientCard({ ingredient, t, onClick }) {
  return (
    <button type="button" className="bt-ing-card" onClick={onClick}>
      <div
        className="bt-ing-card__hero"
        style={{ background: ingredient.hue || "linear-gradient(145deg, #f7f0e8, #f3e4e6)" }}
        aria-hidden="true"
      >
        <FlaskConical size={22} strokeWidth={1.5} />
        {ingredient.beginnerFriendly && (
          <span className="bt-ing-card__badge">
            <Sparkles size={11} />
            {t("ingBeginner")}
          </span>
        )}
      </div>
      <div className="bt-ing-card__body">
        <p className="bt-ing-card__cat">{ingredient.sectionLabel}</p>
        <h3 className="bt-ing-card__name">{ingredient.name}</h3>
        <p className="bt-ing-card__desc">{ingredient.description}</p>
        <p className="bt-ing-card__meta">
          {ingredient.timing} · {ingredient.frequency}
        </p>
      </div>
    </button>
  );
}
