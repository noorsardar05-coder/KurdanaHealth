import { useMemo } from "react";
import { L } from "../utils/locale.js";
import {
  ARTICLE_CATEGORIES,
  BEAUTY_ARTICLES,
  getArticlesByCategory,
  getDeepGuides,
  getEditorPicks,
  getFeaturedArticles,
  getHairAndScalp,
  getIngredientSpotlight,
  getMakeupInspiration,
  getProductDeepDives,
  getShortReads,
  getTrendingArticles,
} from "../data/beautyArticles.js";
import BeautyArticleCard from "./BeautyArticleCard.jsx";
import BeautyArticleReader from "./BeautyArticleReader.jsx";

function Shelf({ title, children, emptyLabel }) {
  if (!children) return null;
  return (
    <div className="bt-mag-shelf">
      <h3 className="bt-subsection-title">{title}</h3>
      {children}
      {emptyLabel}
    </div>
  );
}

function Carousel({ children }) {
  return <div className="bt-mag-carousel">{children}</div>;
}

export default function BeautyDiscover({
  t,
  lang = "en",
  activeArticle = null,
  category = "all",
  onCategoryChange,
  onOpenArticle,
  onCloseArticle,
  savedArticleIds = [],
  recentArticleIds = [],
  onToggleSaveArticle,
  onOpenIngredient,
  onOpenProduct,
}) {
  const l = lang === "ku" ? "ku" : "en";

  const featured = useMemo(() => getFeaturedArticles(), []);
  const trending = useMemo(() => getTrendingArticles(), []);
  const editorPicks = useMemo(() => getEditorPicks(), []);
  const shortReads = useMemo(() => getShortReads(), []);
  const deepGuides = useMemo(() => getDeepGuides(), []);
  const ingredientSpot = useMemo(() => getIngredientSpotlight().slice(0, 8), []);
  const productDives = useMemo(() => getProductDeepDives().slice(0, 8), []);
  const hairScalp = useMemo(() => getHairAndScalp().slice(0, 8), []);
  const makeupInspo = useMemo(() => getMakeupInspiration().slice(0, 8), []);

  const filtered = useMemo(() => getArticlesByCategory(category), [category]);

  const savedArticles = useMemo(
    () =>
      savedArticleIds
        .map((id) => BEAUTY_ARTICLES.find((a) => a.id === id || a.slug === id))
        .filter(Boolean),
    [savedArticleIds],
  );

  const recentArticles = useMemo(
    () =>
      recentArticleIds
        .map((id) => BEAUTY_ARTICLES.find((a) => a.id === id || a.slug === id))
        .filter(Boolean),
    [recentArticleIds],
  );

  const hero = featured[0] || BEAUTY_ARTICLES[0];
  const heroSecondary = featured.slice(1, 3);

  if (activeArticle) {
    return (
      <section id="beauty-discover" className="bt-section bt-magazine">
        <BeautyArticleReader
          article={activeArticle}
          lang={l}
          t={t}
          onBack={onCloseArticle}
          onOpenArticle={onOpenArticle}
          onOpenIngredient={onOpenIngredient}
          onOpenProduct={onOpenProduct}
          isSaved={savedArticleIds.includes(activeArticle.id) || savedArticleIds.includes(activeArticle.slug)}
          onToggleSave={onToggleSaveArticle}
        />
      </section>
    );
  }

  const filtering = category && category !== "all";

  return (
    <section id="beauty-discover" className="bt-section bt-magazine">
      <p className="bt-section-label">{t("magazineEyebrow")}</p>
      <h2 className="bt-section-title">{t("discoverTitle")}</h2>
      <p className="bt-section-sub">{t("discoverSub")}</p>
      <p className="bt-library-count">
        {t("discoverCount").replace("{n}", String(BEAUTY_ARTICLES.length))}
      </p>

      <div className="bt-topic-chips" role="tablist" aria-label={t("discoverCategories")}>
        {ARTICLE_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={category === cat.id}
            className={`bt-chip ${category === cat.id ? "is-active" : ""}`}
            onClick={() => onCategoryChange?.(cat.id)}
          >
            {L(cat.label, l)}
          </button>
        ))}
      </div>

      {filtering && (
        <div className="bt-mag-filter-bar">
          <p className="bt-mag-filter-bar__label">
            {t("discoverFilterActive").replace("{category}", L(ARTICLE_CATEGORIES.find((c) => c.id === category)?.label, l))}
          </p>
          <button type="button" className="bt-text-link" onClick={() => onCategoryChange?.("all")}>
            {t("discoverClearFilter")}
          </button>
        </div>
      )}

      {filtering ? (
        <div className="bt-mag-results">
          <p className="bt-ing-results__count">
            {t("discoverResults").replace("{n}", String(filtered.length))}
          </p>
          {filtered.length === 0 ? (
            <p className="bt-empty">{t("noArticles")}</p>
          ) : (
            <div className="bt-mag-grid">
              {filtered.map((a) => (
                <BeautyArticleCard key={a.id} article={a} lang={l} t={t} onOpen={onOpenArticle} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          {hero && (
            <Shelf title={t("discoverFeatured")}>
              <div className="bt-mag-hero">
                <BeautyArticleCard article={hero} lang={l} t={t} variant="feature" onOpen={onOpenArticle} />
                {heroSecondary.length > 0 && (
                  <div className="bt-mag-hero__side">
                    {heroSecondary.map((a) => (
                      <BeautyArticleCard key={a.id} article={a} lang={l} t={t} variant="list" onOpen={onOpenArticle} />
                    ))}
                  </div>
                )}
              </div>
            </Shelf>
          )}

          <Shelf title={t("discoverTrending")}>
            <Carousel>
              {trending.map((a) => (
                <BeautyArticleCard key={a.id} article={a} lang={l} t={t} variant="compact" onOpen={onOpenArticle} />
              ))}
            </Carousel>
          </Shelf>

          <Shelf title={t("discoverBrowse")}>
            <div className="bt-mag-cat-grid">
              {ARTICLE_CATEGORIES.filter((c) => c.id !== "all").map((cat) => {
                const count = getArticlesByCategory(cat.id).length;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    className="bt-mag-cat-tile"
                    onClick={() => onCategoryChange?.(cat.id)}
                  >
                    <span className="bt-mag-cat-tile__name">{L(cat.label, l)}</span>
                    <span className="bt-mag-cat-tile__count">{count}</span>
                  </button>
                );
              })}
            </div>
          </Shelf>

          <Shelf title={t("discoverEditorPicks")}>
            <div className="bt-mag-editorial">
              {editorPicks.slice(0, 4).map((a) => (
                <BeautyArticleCard key={a.id} article={a} lang={l} t={t} variant="list" onOpen={onOpenArticle} />
              ))}
            </div>
          </Shelf>

          <Shelf title={t("discoverShortReads")}>
            <Carousel>
              {shortReads.map((a) => (
                <BeautyArticleCard key={a.id} article={a} lang={l} t={t} variant="compact" onOpen={onOpenArticle} />
              ))}
            </Carousel>
          </Shelf>

          <Shelf title={t("discoverDeepGuides")}>
            <div className="bt-mag-grid">
              {deepGuides.map((a) => (
                <BeautyArticleCard key={a.id} article={a} lang={l} t={t} onOpen={onOpenArticle} />
              ))}
            </div>
          </Shelf>

          <Shelf title={t("discoverIngredientSpot")}>
            <Carousel>
              {ingredientSpot.map((a) => (
                <BeautyArticleCard key={a.id} article={a} lang={l} t={t} variant="compact" onOpen={onOpenArticle} />
              ))}
            </Carousel>
          </Shelf>

          <Shelf title={t("discoverProductDives")}>
            <div className="bt-mag-grid">
              {productDives.map((a) => (
                <BeautyArticleCard key={a.id} article={a} lang={l} t={t} onOpen={onOpenArticle} />
              ))}
            </div>
          </Shelf>

          <Shelf title={t("discoverHairScalp")}>
            <Carousel>
              {hairScalp.map((a) => (
                <BeautyArticleCard key={a.id} article={a} lang={l} t={t} variant="compact" onOpen={onOpenArticle} />
              ))}
            </Carousel>
          </Shelf>

          <Shelf title={t("discoverMakeupInspo")}>
            <div className="bt-mag-grid">
              {makeupInspo.map((a) => (
                <BeautyArticleCard key={a.id} article={a} lang={l} t={t} variant="feature" onOpen={onOpenArticle} />
              ))}
            </div>
          </Shelf>

          <Shelf title={t("discoverSaved")}>
            {savedArticles.length === 0 ? (
              <p className="bt-soft-copy">{t("discoverSavedEmpty")}</p>
            ) : (
              <div className="bt-mag-list">
                {savedArticles.map((a) => (
                  <BeautyArticleCard key={a.id} article={a} lang={l} t={t} variant="list" onOpen={onOpenArticle} />
                ))}
              </div>
            )}
          </Shelf>

          <Shelf title={t("discoverRecent")}>
            {recentArticles.length === 0 ? (
              <p className="bt-soft-copy">{t("discoverRecentEmpty")}</p>
            ) : (
              <div className="bt-mag-list">
                {recentArticles.map((a) => (
                  <BeautyArticleCard key={a.id} article={a} lang={l} t={t} variant="list" onOpen={onOpenArticle} />
                ))}
              </div>
            )}
          </Shelf>
        </>
      )}
    </section>
  );
}
