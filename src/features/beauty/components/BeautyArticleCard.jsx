import { L } from "../utils/locale.js";

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
            `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f7f0e8"/><stop offset="1" stop-color="#f3e4e6"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>`,
          );
      }}
    />
  );
}

export default function BeautyArticleCard({
  article,
  lang = "en",
  t,
  onOpen,
  variant = "default",
}) {
  if (!article) return null;
  const title = L(article.title, lang);
  const excerpt = L(article.excerpt, lang);
  const alt = L(article.imageAlt, lang) || title;
  const topicKey = TOPIC_KEYS[article.category] || "topicAll";
  const mins = article.readingTime || article.readMin || 5;

  if (variant === "compact") {
    return (
      <button type="button" className="bt-mag-card bt-mag-card--compact" onClick={() => onOpen?.(article)}>
        <SafeImg src={article.image} alt={alt} className="bt-mag-card__thumb" />
        <div className="bt-mag-card__body">
          <p className="bt-section-label">{t(topicKey)}</p>
          <h3 className="bt-mag-card__title">{title}</h3>
          <p className="bt-mag-card__meta">
            {mins} {t("minRead")}
          </p>
        </div>
      </button>
    );
  }

  if (variant === "feature") {
    return (
      <button type="button" className="bt-mag-card bt-mag-card--feature" onClick={() => onOpen?.(article)}>
        <SafeImg src={article.image} alt={alt} className="bt-mag-card__img" />
        <div className="bt-mag-card__veil" />
        <div className="bt-mag-card__overlay">
          <p className="bt-section-label">{t(topicKey)}</p>
          <h3 className="bt-mag-card__title">{title}</h3>
          <p className="bt-mag-card__excerpt">{excerpt}</p>
          <p className="bt-mag-card__meta">
            {mins} {t("minRead")} · {t("readArticle")}
          </p>
        </div>
      </button>
    );
  }

  if (variant === "list") {
    return (
      <button type="button" className="bt-mag-card bt-mag-card--list" onClick={() => onOpen?.(article)}>
        <SafeImg src={article.image} alt={alt} className="bt-mag-card__thumb" />
        <div className="bt-mag-card__body">
          <p className="bt-section-label">{t(topicKey)}</p>
          <h3 className="bt-mag-card__title">{title}</h3>
          <p className="bt-mag-card__excerpt">{excerpt}</p>
          <p className="bt-mag-card__meta">
            {mins} {t("minRead")}
          </p>
        </div>
      </button>
    );
  }

  return (
    <button type="button" className="bt-mag-card bt-mag-card--default" onClick={() => onOpen?.(article)}>
      <SafeImg src={article.image} alt={alt} className="bt-mag-card__img" />
      <div className="bt-mag-card__body">
        <p className="bt-section-label">{t(topicKey)}</p>
        <h3 className="bt-mag-card__title">{title}</h3>
        <p className="bt-mag-card__excerpt">{excerpt}</p>
        <p className="bt-mag-card__meta">
          {mins} {t("minRead")} · {t("readArticle")}
        </p>
      </div>
    </button>
  );
}
