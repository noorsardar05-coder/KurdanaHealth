import { useMemo } from "react";
import {
  X,
  FlaskConical,
  Sparkles,
  Sun,
  Moon,
  Shield,
  AlertCircle,
  Beaker,
  BookOpen,
  Stethoscope,
  HelpCircle,
  ArrowRightLeft,
} from "lucide-react";
import {
  getIngredientById,
  localizeIngredient,
  matchProductsForIngredient,
} from "../data/beautyIngredients.js";

function DetailBlock({ label, icon: Icon, children }) {
  if (!children) return null;
  const empty = typeof children === "string" && !children.trim();
  if (empty) return null;
  return (
    <div className="bt-modal-block bt-ing-modal__block">
      <p className="bt-section-label bt-ing-modal__label">
        {Icon && <Icon size={14} strokeWidth={1.75} aria-hidden="true" />}
        {label}
      </p>
      <div className="bt-soft-copy">{children}</div>
    </div>
  );
}

function RelatedRow({ title, ids, lang, t, onOpen }) {
  if (!ids?.length) return null;
  const items = ids.map((id) => localizeIngredient(getIngredientById(id), lang)).filter(Boolean);
  if (!items.length) return null;
  return (
    <div className="bt-ing-modal__related">
      <p className="bt-section-label">{title}</p>
      <div className="bt-ing-modal__related-chips">
        {items.map((ing) => (
          <button key={ing.id} type="button" className="bt-ing-related-chip" onClick={() => onOpen?.(ing)}>
            {ing.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function BeautyIngredientModal({
  ingredient,
  t,
  lang = "en",
  products = [],
  onClose,
  onOpenIngredient,
  onProductClick,
}) {
  const ing = useMemo(
    () => (ingredient?.id ? localizeIngredient(getIngredientById(ingredient.id) || ingredient, lang) : null),
    [ingredient, lang],
  );

  const libraryMatches = useMemo(() => {
    if (!ing) return [];
    const raw = getIngredientById(ing.id) || ing;
    return matchProductsForIngredient(raw, products).slice(0, 6);
  }, [ing, products]);

  if (!ing) return null;

  const heroBg = ing.hue || "linear-gradient(145deg, #f7f0e8 0%, #f3e4e6 55%, #ebe4f0 100%)";

  return (
    <div className="bt-modal-backdrop" role="dialog" aria-modal="true" onClick={onClose}>
      <div
        className="bt-modal bt-modal--lux bt-modal--encyclopedia bt-ing-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="bt-modal__close" onClick={onClose} aria-label={t("close")}>
          <X size={18} />
        </button>

        <div className="bt-ing-modal__hero" style={{ background: heroBg }}>
          <div className="bt-ing-modal__hero-icon" aria-hidden="true">
            <FlaskConical size={36} strokeWidth={1.25} />
          </div>
          <p className="bt-section-label">{ing.sectionLabel}</p>
          <h2 className="bt-ing-modal__title">{ing.name}</h2>
          {ing.aliases?.length > 0 && (
            <p className="bt-ing-modal__aliases">
              {t("ingAlsoKnown")}: {ing.aliases.join(" · ")}
            </p>
          )}
        </div>

        <div className="bt-ing-modal__badges">
          {ing.beginnerFriendly && (
            <span className="bt-ing-badge">
              <Sparkles size={12} />
              {t("ingBeginnerFriendly")}
            </span>
          )}
          <span className="bt-ing-badge">
            <Sun size={12} />
            {ing.timing}
          </span>
          <span className="bt-ing-badge">
            <Moon size={12} />
            {ing.frequency}
          </span>
          <span className="bt-ing-badge bt-ing-badge--evidence">{ing.evidenceLevel}</span>
        </div>

        <p className="bt-modal__desc">{ing.description}</p>

        {ing.educationalNote && (
          <div className="bt-ing-modal__note">
            <BookOpen size={16} strokeWidth={1.75} aria-hidden="true" />
            <p>{ing.educationalNote}</p>
          </div>
        )}

        <div className="bt-ing-modal__quick">
          <div className="bt-ing-quick-card">
            <Shield size={18} strokeWidth={1.5} />
            <p className="bt-ing-quick-card__label">{t("ingBestFor")}</p>
            <p className="bt-ing-quick-card__value">{ing.bestSkinTypes}</p>
          </div>
          <div className="bt-ing-quick-card">
            <Beaker size={18} strokeWidth={1.5} />
            <p className="bt-ing-quick-card__label">{t("ingTexture")}</p>
            <p className="bt-ing-quick-card__value">{ing.texture}</p>
          </div>
          <div className="bt-ing-quick-card">
            <AlertCircle size={18} strokeWidth={1.5} />
            <p className="bt-ing-quick-card__label">{t("ingPh")}</p>
            <p className="bt-ing-quick-card__value">{ing.ph}</p>
          </div>
        </div>

        <div className="bt-modal-grid">
          <DetailBlock label={t("ingWhoUse")} icon={Sparkles}>
            {ing.whoShouldUse}
          </DetailBlock>
          <DetailBlock label={t("ingWhoAvoid")} icon={AlertCircle}>
            {ing.whoShouldAvoid}
          </DetailBlock>
        </div>

        <DetailBlock label={t("ingBenefits")} icon={Sparkles}>
          {ing.benefits}
        </DetailBlock>
        <DetailBlock label={t("ingSideEffects")} icon={AlertCircle}>
          {ing.sideEffects}
        </DetailBlock>

        <div className="bt-modal-grid">
          <DetailBlock label={t("ingMixesWith")} icon={ArrowRightLeft}>
            {ing.mixesWith}
          </DetailBlock>
          <DetailBlock label={t("ingAvoidWith")} icon={AlertCircle}>
            {ing.avoidWith}
          </DetailBlock>
        </div>

        <div className="bt-modal-grid">
          <DetailBlock label={t("ingPercentage")} icon={Beaker}>
            {ing.percentageRange}
          </DetailBlock>
          <DetailBlock label={t("ingPregnancy")} icon={Shield}>
            {ing.pregnancySafety}
          </DetailBlock>
        </div>

        <DetailBlock label={t("ingFamousExamples")} icon={BookOpen}>
          {ing.famousProducts}
        </DetailBlock>

        <div className="bt-ing-modal__myth">
          <p className="bt-section-label">{t("ingMythFact")}</p>
          <p className="bt-soft-copy">{ing.mythVsFact}</p>
        </div>

        {ing.beginnerTip && (
          <div className="bt-ing-modal__tip">
            <Sparkles size={16} strokeWidth={1.75} aria-hidden="true" />
            <div>
              <p className="bt-section-label">{t("ingBeginnerTip")}</p>
              <p className="bt-soft-copy">{ing.beginnerTip}</p>
            </div>
          </div>
        )}

        {ing.dermNote && (
          <div className="bt-ing-modal__derm">
            <Stethoscope size={16} strokeWidth={1.75} aria-hidden="true" />
            <div>
              <p className="bt-section-label">{t("ingDermNote")}</p>
              <p className="bt-soft-copy">{ing.dermNote}</p>
            </div>
          </div>
        )}

        <RelatedRow
          title={t("ingSimilar")}
          ids={ing.similar}
          lang={lang}
          onOpen={onOpenIngredient}
        />
        <RelatedRow
          title={t("ingStronger")}
          ids={ing.stronger}
          lang={lang}
          onOpen={onOpenIngredient}
        />
        <RelatedRow
          title={t("ingGentler")}
          ids={ing.gentler}
          lang={lang}
          onOpen={onOpenIngredient}
        />

        {libraryMatches.length > 0 && (
          <div className="bt-ing-modal__library">
            <p className="bt-section-label">{t("ingLibraryMatches")}</p>
            <p className="bt-hint">{t("ingLibraryHint")}</p>
            <div className="bt-ing-modal__products">
              {libraryMatches.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className="bt-cam-product-row"
                  onClick={() => onProductClick?.(p)}
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

        {ing.faqs?.length > 0 && (
          <div className="bt-ing-modal__faqs">
            <p className="bt-section-label">
              <HelpCircle size={14} strokeWidth={1.75} aria-hidden="true" />
              {t("ingFaqs")}
            </p>
            {ing.faqs.map((faq) => (
              <details key={faq.q} className="bt-ing-faq">
                <summary>{faq.q}</summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        )}

        <p className="bt-disclaimer-inline">{t("ingDisclaimer")}</p>
      </div>
    </div>
  );
}
