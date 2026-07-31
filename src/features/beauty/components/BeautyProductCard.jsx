function StarRow({ rating = 5 }) {
  const full = Math.round(Math.min(5, Math.max(0, rating)));
  return (
    <p className="bt-product-card__stars" aria-label={`${rating} out of 5`}>
      {"★★★★★".slice(0, full)}
      <span className="bt-product-card__stars-empty">{"★★★★★".slice(full)}</span>
    </p>
  );
}

export default function BeautyProductCard({
  product,
  t,
  onClick,
  onToggleFavorite,
  isFavorite = false,
  compact = false,
}) {
  const perfectFor = (product.perfectFor || product.skinTypes || []).slice(0, compact ? 2 : 3);

  return (
    <div className={`bt-product-card-shell ${compact ? "is-compact" : ""}`}>
      <button type="button" className="bt-product-card bt-product-card--library" onClick={onClick}>
        <div className="bt-product-card__wrap bt-product-card__wrap--bottle">
          <img
            src={product.image}
            alt={`${product.brand} ${product.name}`}
            className="bt-product-card__img bt-product-card__img--product"
            loading="lazy"
          />
        </div>
        <div className="bt-product-card__body">
          <p className="bt-product-card__brand">{product.brand}</p>
          <p className="bt-product-card__name">{product.name}</p>
          <StarRow rating={product.rating ?? 5} />
          {perfectFor.length > 0 && (
            <div className="bt-product-card__perfect">
              <p className="bt-product-card__perfect-label">{t("perfectFor")}</p>
              <ul>
                {perfectFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          <span className="bt-product-card__cta">{t("viewDetails")}</span>
        </div>
      </button>
      {onToggleFavorite && (
        <div className="bt-product-card__actions">
          <button
            type="button"
            className={`bt-mini-btn ${isFavorite ? "is-on" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(product.id);
            }}
          >
            {isFavorite ? "♥" : "♡"} {t("favorite")}
          </button>
        </div>
      )}
    </div>
  );
}
