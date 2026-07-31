import { X, Heart } from "lucide-react";
import { getLocalizedProductById } from "../data/beautyProducts.js";

function DetailBlock({ label, children }) {
  if (!children) return null;
  const empty =
    (Array.isArray(children) && children.length === 0) ||
    (typeof children === "string" && !children.trim());
  if (empty) return null;
  return (
    <div className="bt-modal-block">
      <p className="bt-section-label">{label}</p>
      {children}
    </div>
  );
}

export default function BeautyProductModal({
  product,
  t,
  lang = "en",
  isFavorite,
  onClose,
  onToggleFavorite,
  onOpenSimilar,
}) {
  if (!product) return null;

  const similarIds = [
    ...(product.pairsWith || []),
    ...(product.similarProducts || product.similarAlternatives || []),
  ].filter((id, i, arr) => id && id !== product.id && arr.indexOf(id) === i);

  const similar = similarIds
    .map((id) => getLocalizedProductById(id, lang))
    .filter(Boolean)
    .slice(0, 6);

  const benefits = Array.isArray(product.benefits) ? product.benefits : [];
  const concerns = Array.isArray(product.concerns) ? product.concerns : [];
  const hairTypes = product.hairTypes || [];

  return (
    <div className="bt-modal-backdrop" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="bt-modal bt-modal--lux bt-modal--encyclopedia" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="bt-modal__close" onClick={onClose} aria-label={t("close")}>
          <X size={18} />
        </button>

        <div className="bt-modal__hero">
          <img src={product.image} alt="" className="bt-modal__img" />
        </div>

        <p className="bt-section-label">{product.categoryLabel}</p>
        <p className="bt-product-card__brand">{product.brand}</p>
        <h2 className="bt-modal__title">{product.name}</h2>
        <p className="bt-modal__desc">{product.description}</p>

        {(product.collectionLabels || []).length > 0 && (
          <div className="bt-collection-pills">
            {product.collectionLabels.map((label) => (
              <span key={label} className="bt-collection-pill">
                {label}
              </span>
            ))}
          </div>
        )}

        <div className="bt-modal-grid">
          <DetailBlock label={t("forWhom")}>
            <p className="bt-soft-copy">{product.forWhom}</p>
          </DetailBlock>
          <DetailBlock label={t("skinTypes")}>
            <p className="bt-soft-copy">{(product.perfectFor || []).join(" · ")}</p>
          </DetailBlock>
        </div>

        {hairTypes.length > 0 && (
          <DetailBlock label={t("hairTypes")}>
            <p className="bt-soft-copy">{hairTypes.join(" · ")}</p>
          </DetailBlock>
        )}

        <div className="bt-modal-grid">
          <DetailBlock label={t("concerns")}>
            <ul className="bt-soft-list">
              {concerns.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </DetailBlock>
          <DetailBlock label={t("benefits")}>
            <ul className="bt-soft-list">
              {benefits.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </DetailBlock>
        </div>

        <div className="bt-modal-grid">
          <DetailBlock label={t("ingredients")}>
            <p className="bt-soft-copy">{(product.ingredients || []).join(", ")}</p>
          </DetailBlock>
          <DetailBlock label={t("texture")}>
            <p className="bt-soft-copy">{product.texture}</p>
          </DetailBlock>
        </div>

        <div className="bt-modal-grid">
          <DetailBlock label={t("timeOfDay")}>
            <p className="bt-soft-copy">{product.timeOfDay}</p>
          </DetailBlock>
          <DetailBlock label={t("size")}>
            <p className="bt-soft-copy">{product.size}</p>
          </DetailBlock>
        </div>

        <div className="bt-modal-grid">
          <DetailBlock label={t("origin")}>
            <p className="bt-soft-copy">{product.origin}</p>
          </DetailBlock>
          <DetailBlock label={t("howToUse")}>
            <p className="bt-soft-copy">{product.howToUse}</p>
          </DetailBlock>
        </div>

        <DetailBlock label={t("avoid")}>
          <p className="bt-soft-copy">{product.avoid}</p>
        </DetailBlock>

        {product.dermNotes ? (
          <DetailBlock label={t("dermNotes")}>
            <p className="bt-soft-copy bt-soft-copy--note">{product.dermNotes}</p>
          </DetailBlock>
        ) : null}

        {similar.length > 0 && (
          <>
            <p className="bt-section-label">{t("pairsAndSimilar")}</p>
            <div className="bt-similar-row">
              {similar.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className="bt-similar-chip"
                  onClick={() => onOpenSimilar?.(p)}
                >
                  <img src={p.image} alt="" />
                  <span>
                    <strong>{p.brand}</strong>
                    {p.name}
                  </span>
                </button>
              ))}
            </div>
          </>
        )}

        <p className="bt-hint">
          {t("eduOnly")} · {t("photoCredit")}: {product.imageCredit}
        </p>

        <div className="bt-btn-row">
          <button type="button" className="bt-hero-cta" onClick={onToggleFavorite}>
            <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
            {t("addFavorite")}
          </button>
        </div>
      </div>
    </div>
  );
}
