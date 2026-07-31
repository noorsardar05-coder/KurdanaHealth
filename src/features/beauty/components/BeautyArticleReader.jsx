import { useMemo, useState } from "react";
import { ArrowLeft, Bookmark, BookmarkCheck, Share2 } from "lucide-react";
import { L } from "../utils/locale.js";
import { getArticleBySlug } from "../data/beautyArticles.js";
import { getIngredientById, localizeIngredient } from "../data/beautyIngredients.js";
import { getLocalizedProductById } from "../data/beautyProducts.js";
import BeautyArticleCard from "./BeautyArticleCard.jsx";

const TOPIC_KEYS = {
  makeup: "topicMakeup",
  skincare: "topicSkincare",
  "korean-beauty": "topicKorean",
  "french-pharmacy": "topicFrench",
  haircare: "topicHair",
  "scalp-care": "topicScalp",
  "lip-care": "topicLips",
  nails: "topicNails",
  fragrance: "topicPerfume",
  "beauty-trends": "topicTrends",
  ingredients: "topicIngredients",
  "product-guides": "topicProductGuides",
  "sensitive-skin": "topicSensitive",
  "beginner-guides": "topicBeginner",
  "luxury-beauty": "topicLuxury",
  "self-care": "topicSelfCare",
};

export default function BeautyArticleReader({
  article,
  lang = "en",
  t,
  onBack,
  onOpenArticle,
  onOpenIngredient,
  onOpenProduct,
  isSaved = false,
  onToggleSave,
}) {
  const relatedArticles = useMemo(
    () =>
      (article?.relatedArticleIds || [])
        .map((id) => getArticleBySlug(id))
        .filter(Boolean)
        .slice(0, 4),
    [article],
  );

  const relatedIngredients = useMemo(
    () =>
      (article?.relatedIngredientIds || [])
        .map((id) => localizeIngredient(getIngredientById(id), lang))
        .filter(Boolean)
        .slice(0, 4),
    [article, lang],
  );

  const relatedProducts = useMemo(
    () =>
      (article?.relatedProductIds || [])
        .map((id) => getLocalizedProductById(id, lang))
        .filter(Boolean)
        .slice(0, 4),
    [article, lang],
  );

  if (!article) return null;

  const title = L(article.title, lang);
  const excerpt = L(article.excerpt, lang);
  const alt = L(article.imageAlt, lang) || title;
  const author = L(article.author, lang);
  const langKey = lang === "ku" ? "ku" : "en";
  const paragraphs = Array.isArray(article.body?.[langKey]) ? article.body[langKey] : article.body?.en || [];
  const takeaways = Array.isArray(article.takeaways?.[langKey])
    ? article.takeaways[langKey]
    : article.takeaways?.en || [];
  const mins = article.readingTime || article.readMin || 5;
  const topicKey = TOPIC_KEYS[article.category] || "topicAll";

  const handleShare = async () => {
    const url = `${window.location.origin}${window.location.pathname}#/category/beauty/discover/${article.slug || article.id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title, text: excerpt, url });
        return;
      }
    } catch {
      /* cancelled */
    }
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      /* ignore */
    }
  };

  return (
    <article className="bt-article-reader" aria-labelledby="bt-article-title">
      <div className="bt-article-reader__toolbar">
        <button type="button" className="bt-ghost-btn bt-article-reader__back" onClick={onBack}>
          <ArrowLeft size={16} />
          {t("backToMagazine")}
        </button>
        <div className="bt-article-reader__actions">
          <button
            type="button"
            className={`bt-icon-btn ${isSaved ? "is-on" : ""}`}
            onClick={() => onToggleSave?.(article)}
            aria-label={isSaved ? t("unsaveArticle") : t("saveArticle")}
            title={isSaved ? t("unsaveArticle") : t("saveArticle")}
          >
            {isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
          </button>
          <button
            type="button"
            className="bt-icon-btn"
            onClick={handleShare}
            aria-label={t("shareArticle")}
            title={t("shareArticle")}
          >
            <Share2 size={18} />
          </button>
        </div>
      </div>

      <div className="bt-article-reader__hero">
        <img
          src={article.image}
          alt={alt}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              "data:image/svg+xml," +
              encodeURIComponent(
                `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="700"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f7f0e8"/><stop offset="1" stop-color="#f3e4e6"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>`,
              );
          }}
        />
        <div className="bt-article-reader__veil" />
      </div>

      <div className="bt-article-reader__inner">
        <p className="bt-section-label">{t(topicKey)}</p>
        <h1 id="bt-article-title" className="bt-article-reader__title">
          {title}
        </h1>
        <p className="bt-article-reader__excerpt">{excerpt}</p>
        <p className="bt-article-reader__meta">
          {author} · {mins} {t("minRead")}
          {article.updatedAt ? ` · ${article.updatedAt}` : ""}
        </p>

        <div className="bt-article-reader__body">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {takeaways.length > 0 && (
          <div className="bt-article-reader__takeaways">
            <h2 className="bt-subsection-title">{t("keyTakeaways")}</h2>
            <ul>
              {takeaways.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {relatedIngredients.length > 0 && (
          <div className="bt-article-reader__related">
            <h2 className="bt-subsection-title">{t("relatedIngredients")}</h2>
            <div className="bt-ing-modal__related-chips">
              {relatedIngredients.map((ing) => (
                <button
                  key={ing.id}
                  type="button"
                  className="bt-ing-related-chip"
                  onClick={() => onOpenIngredient?.(ing)}
                >
                  {ing.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {relatedProducts.length > 0 && (
          <div className="bt-article-reader__related">
            <h2 className="bt-subsection-title">{t("relatedLibraryProducts")}</h2>
            <p className="bt-hint">{t("relatedLibraryHint")}</p>
            <div className="bt-ing-modal__products">
              {relatedProducts.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className="bt-cam-product-row"
                  onClick={() => onOpenProduct?.(p)}
                >
                  <img src={p.image} alt="" className="bt-cam-product-row__img" />
                  <div className="bt-cam-product-row__body">
                    <p className="bt-product-card__brand">{p.brand}</p>
                    <p className="bt-product-card__name">{p.name}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {relatedArticles.length > 0 && (
          <div className="bt-article-reader__related">
            <h2 className="bt-subsection-title">{t("relatedArticles")}</h2>
            <div className="bt-mag-list">
              {relatedArticles.map((a) => (
                <BeautyArticleCard
                  key={a.id}
                  article={a}
                  lang={lang}
                  t={t}
                  variant="list"
                  onOpen={onOpenArticle}
                />
              ))}
            </div>
          </div>
        )}

        <p className="bt-hint">{t("eduOnly")}</p>
      </div>
    </article>
  );
}
