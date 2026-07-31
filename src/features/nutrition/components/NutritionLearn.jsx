import { useMemo, useState } from "react";
import { L } from "../utils/locale.js";
import {
  LEARN_ARTICLES,
  LEARN_CATEGORIES,
  getFeaturedLearn,
  getTrendingLearn,
  getLearnArticle,
} from "../data/nutritionLearn.js";
import { X } from "lucide-react";

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

function ArticleReader({ article, lang, t, onClose }) {
  if (!article) return null;
  const body = article.body?.[lang === "ku" ? "ku" : "en"] || article.body?.en || [];
  const takeaways = article.takeaways?.[lang === "ku" ? "ku" : "en"] || [];
  return (
    <div className="nu-modal-backdrop" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="nu-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="nu-modal__close" onClick={onClose} aria-label={t("close")}>
          <X size={16} />
        </button>
        <SafeImg src={article.image} alt={L(article.title, lang)} className="nu-modal__img" />
        <h2>{L(article.title, lang)}</h2>
        <p className="nu-soft">{L(article.excerpt, lang)}</p>
        <p className="nu-recipe-card__meta">
          {article.readingTime} {t("minRead")}
        </p>
        <div style={{ marginTop: "0.85rem" }}>
          {body.map((p, i) => (
            <p key={i} className="nu-soft" style={{ marginBottom: "0.75rem", color: "var(--nutrition-charcoal)" }}>
              {p}
            </p>
          ))}
        </div>
        {takeaways.length > 0 && (
          <>
            <p className="nu-section-label" style={{ marginTop: "0.75rem" }}>
              Key takeaways
            </p>
            <ul className="nu-list">
              {takeaways.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </>
        )}
        <p className="nu-hint">{t("educationalOnly")}</p>
      </div>
    </div>
  );
}

export default function NutritionLearn({ t, lang }) {
  const [cat, setCat] = useState("all");
  const [active, setActive] = useState(null);
  const list = useMemo(() => {
    if (cat === "all") return LEARN_ARTICLES;
    return LEARN_ARTICLES.filter((a) => a.category === cat);
  }, [cat]);

  return (
    <section id="nutrition-learn" className="nu-section">
      <p className="nu-section-label">{t("navLearn")}</p>
      <h2 className="nu-section-title">{t("learnTitle")}</h2>
      <p className="nu-section-sub">{t("learnSub")}</p>
      <div className="nu-chip-row">
        {LEARN_CATEGORIES.map((c) => (
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
      <div style={{ display: "grid", gap: "0.65rem" }}>
        {list.map((a) => (
          <button key={a.id} type="button" className="nu-learn-card" onClick={() => setActive(a)}>
            <SafeImg src={a.image} alt="" />
            <div>
              <h3 className="nu-recipe-card__title" style={{ fontSize: "1rem" }}>
                {L(a.title, lang)}
              </h3>
              <p className="nu-soft" style={{ fontSize: "0.78rem" }}>
                {L(a.excerpt, lang)}
              </p>
              <p className="nu-recipe-card__meta">
                {a.readingTime} {t("minRead")} · {t("readMore")}
              </p>
            </div>
          </button>
        ))}
      </div>
      {active && (
        <ArticleReader
          article={getLearnArticle(active.slug) || active}
          lang={lang}
          t={t}
          onClose={() => setActive(null)}
        />
      )}
    </section>
  );
}

export function NutritionDiscover({ t, lang, onOpenRecipe, featuredRecipes = [], trendingRecipes = [] }) {
  const featured = getFeaturedLearn();
  const trending = getTrendingLearn();
  const [active, setActive] = useState(null);

  return (
    <section id="nutrition-discover" className="nu-section">
      <p className="nu-section-label">{t("navDiscover")}</p>
      <h2 className="nu-section-title">{t("discoverTitle")}</h2>
      <p className="nu-section-sub">{t("discoverSub")}</p>

      <h3 className="nu-subsection-title">{t("featured")}</h3>
      <div style={{ display: "grid", gap: "0.65rem", marginBottom: "1.25rem" }}>
        {featured.map((a) => (
          <button key={a.id} type="button" className="nu-learn-card" onClick={() => setActive(a)}>
            <SafeImg src={a.image} alt="" />
            <div>
              <h3 className="nu-recipe-card__title" style={{ fontSize: "1rem" }}>
                {L(a.title, lang)}
              </h3>
              <p className="nu-soft" style={{ fontSize: "0.78rem" }}>
                {L(a.excerpt, lang)}
              </p>
            </div>
          </button>
        ))}
      </div>

      <h3 className="nu-subsection-title">{t("trending")}</h3>
      <div className="nu-grid" style={{ marginBottom: "1.25rem" }}>
        {trendingRecipes.slice(0, 6).map((r) => (
          <button key={r.id} type="button" className="nu-recipe-card" onClick={() => onOpenRecipe?.(r)}>
            <SafeImg src={r.image} alt={L(r.title, lang)} className="nu-recipe-card__img" />
            <div className="nu-recipe-card__body">
              <h3 className="nu-recipe-card__title">{L(r.title, lang)}</h3>
              <p className="nu-recipe-card__meta">
                ~{r.caloriesEstimate} {t("kcal")}
              </p>
            </div>
          </button>
        ))}
      </div>

      <h3 className="nu-subsection-title">{t("featured")} recipes</h3>
      <div className="nu-grid">
        {featuredRecipes.slice(0, 6).map((r) => (
          <button key={r.id} type="button" className="nu-recipe-card" onClick={() => onOpenRecipe?.(r)}>
            <SafeImg src={r.image} alt={L(r.title, lang)} className="nu-recipe-card__img" />
            <div className="nu-recipe-card__body">
              <h3 className="nu-recipe-card__title">{L(r.title, lang)}</h3>
            </div>
          </button>
        ))}
      </div>

      {active && (
        <ArticleReader article={active} lang={lang} t={t} onClose={() => setActive(null)} />
      )}
      {/* silence unused */}
      <span style={{ display: "none" }}>{trending.length}</span>
    </section>
  );
}
