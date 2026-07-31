import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, ArrowLeft, Scale } from "lucide-react";
import {
  ESSENTIAL_CATEGORIES,
  ESSENTIALS,
  getEssential,
  essentialsByCategory,
  recommendEssentials,
  COMPARE_TRAITS,
} from "../data/essentials.js";
import { loadCompare, saveCompare } from "../utils/storage.js";

export function Ltxt(obj, lang) {
  if (!obj) return "";
  if (typeof obj === "string") return obj;
  return lang === "ku" ? obj.ku : obj.en;
}

export default function Essentials({ lang, tx, profile }) {
  const [category, setCategory] = useState("all");
  const [productId, setProductId] = useState(null);
  const [view, setView] = useState("grid");
  const [openFaq, setOpenFaq] = useState(null);
  const [compare, setCompare] = useState(() => loadCompare());

  const smartMatch = useMemo(() => recommendEssentials(profile), [profile]);
  const products = category === "all" ? ESSENTIALS : essentialsByCategory(category);
  const product = productId ? getEssential(productId) : null;

  function addCompare(id) {
    if (compare.includes(id)) return;
    if (compare.length >= 3) return;
    const next = [...compare, id];
    setCompare(next);
    saveCompare(next);
  }

  function clearCompare() {
    setCompare([]);
    saveCompare([]);
  }

  if (view === "compare") {
    const items = compare.map(getEssential).filter(Boolean);
    const cat = items[0]?.category;
    const traits = COMPARE_TRAITS[cat] || [];

    return (
      <motion.div className="ftm-page-enter" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <button type="button" className="ftm-back-btn" onClick={() => setView("grid")}>
          <ArrowLeft size={16} />
          {tx("back")}
        </button>
        <h1 className="ftm-h1 ftm-display">{tx("compare")}</h1>
        <div className="ftm-compare-table">
          <table>
            <thead>
              <tr>
                <th>{tx("essentials")}</th>
                {items.map((p) => (
                  <th key={p.id}>{Ltxt(p.name, lang)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{tx("bestFor")}</td>
                {items.map((p) => (
                  <td key={p.id}>{Ltxt(p.bestFor, lang)}</td>
                ))}
              </tr>
              <tr>
                <td>{tx("notFor")}</td>
                {items.map((p) => (
                  <td key={p.id}>{Ltxt(p.notFor, lang)}</td>
                ))}
              </tr>
              {traits.map((trait) => (
                <tr key={trait}>
                  <td>{trait}</td>
                  {items.map((p) => (
                    <td key={p.id}>—</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button type="button" className="ftm-btn ftm-btn--ghost ftm-mt" onClick={clearCompare}>
          {tx("clearCompare")}
        </button>
      </motion.div>
    );
  }

  if (product) {
    return (
      <motion.div
        className="ftm-page-enter"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button type="button" className="ftm-back-btn" onClick={() => setProductId(null)}>
          <ArrowLeft size={16} />
          {tx("back")}
        </button>

        <img src={product.image} alt={`${product.brand} ${Ltxt(product.name, lang)}`} className="ftm-product-detail__hero" />
        <p className="ftm-text-muted">{product.brand}</p>
        <h1 className="ftm-h1 ftm-display">{Ltxt(product.name, lang)}</h1>

        <div className="ftm-product-detail__section">
          <h3>{tx("whatIs")}</h3>
          <p>{Ltxt(product.whatIs, lang)}</p>
        </div>
        <div className="ftm-product-detail__section">
          <h3>{tx("whyLove")}</h3>
          <p>{Ltxt(product.whyLove, lang)}</p>
        </div>
        <div className="ftm-product-detail__section">
          <h3>{tx("bestFor")}</h3>
          <p>{Ltxt(product.bestFor, lang)}</p>
        </div>
        <div className="ftm-product-detail__section">
          <h3>{tx("notFor")}</h3>
          <p>{Ltxt(product.notFor, lang)}</p>
        </div>

        <div className="ftm-pros-cons ftm-product-detail__section">
          <div>
            <h3>{tx("pros")}</h3>
            <ul>
              {product.pros.map((p, i) => (
                <li key={i}>{Ltxt(p, lang)}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>{tx("cons")}</h3>
            <ul>
              {product.cons.map((c, i) => (
                <li key={i}>{Ltxt(c, lang)}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="ftm-product-detail__section">
          <h3>{tx("cleaning")}</h3>
          {product.cleaning.map((c, i) => (
            <p key={i}>{Ltxt(c, lang)}</p>
          ))}
        </div>
        <div className="ftm-product-detail__section">
          <h3>{tx("safety")}</h3>
          {product.safety.map((s, i) => (
            <p key={i}>{Ltxt(s, lang)}</p>
          ))}
        </div>
        <div className="ftm-product-detail__section">
          <h3>{tx("ageRec")}</h3>
          <p>{Ltxt(product.age, lang)}</p>
        </div>

        {product.alternatives?.length > 0 && (
          <div className="ftm-product-detail__section">
            <h3>{tx("alternatives")}</h3>
            <div className="ftm-chip-row">
              {product.alternatives.map((altId) => {
                const alt = getEssential(altId);
                if (!alt) return null;
                return (
                  <button
                    key={altId}
                    type="button"
                    className="ftm-chip"
                    onClick={() => setProductId(altId)}
                  >
                    {Ltxt(alt.name, lang)}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {product.faq?.length > 0 && (
          <div className="ftm-product-detail__section">
            <h3>{tx("faq")}</h3>
            <div className="ftm-faq">
              {product.faq.map((f, i) => (
                <div key={i} className="ftm-faq__item">
                  <button
                    type="button"
                    className="ftm-faq__q"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    {Ltxt(f.q, lang)}
                    {openFaq === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {openFaq === i && <div className="ftm-faq__a">{Ltxt(f.a, lang)}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {!compare.includes(product.id) && compare.length < 3 && (
          <div className="ftm-stack ftm-mt">
            <button type="button" className="ftm-btn ftm-btn--accent ftm-btn--wide" onClick={() => addCompare(product.id)}>
              {tx("addCompare")}
            </button>
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="ftm-page-enter"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <section className="ftm-section">
        <h1 className="ftm-h1 ftm-display">{tx("essTitle")}</h1>
        <p className="ftm-lead">{tx("essSub")}</p>
        <div className="ftm-ess-banner">{tx("essGuide")}</div>
      </section>

      {compare.length > 0 && (
        <section className="ftm-section">
          <button type="button" className="ftm-btn ftm-btn--accent" onClick={() => setView("compare")}>
            <Scale size={16} />
            {tx("compare")} ({compare.length}/3)
          </button>
        </section>
      )}

      <section className="ftm-section">
        <p className="ftm-label">{tx("smartMatch")}</p>
        <div className="ftm-smart-match">
          {smartMatch.map((p) => (
            <div key={p.id} className="ftm-ess-card ftm-smart-match__item" onClick={() => setProductId(p.id)} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && setProductId(p.id)}>
              <img src={p.image} alt={`${p.brand} ${Ltxt(p.name, lang)}`} className="ftm-ess-card__img" />
              <div className="ftm-ess-card__body">
                <span className="ftm-ess-card__brand">{p.brand}</span>
                <p className="ftm-ess-card__name">{Ltxt(p.name, lang)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="ftm-section">
        <div className="ftm-chip-row ftm-mb">
          <button
            type="button"
            className={`ftm-chip ${category === "all" ? "is-selected" : ""}`}
            onClick={() => setCategory("all")}
          >
            {lang === "ku" ? "هەموو" : "All"}
          </button>
          {ESSENTIAL_CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`ftm-chip ${category === c.id ? "is-selected" : ""}`}
              onClick={() => setCategory(c.id)}
            >
              {Ltxt(c, lang)}
            </button>
          ))}
        </div>

        <div className="ftm-ess-grid">
          {products.map((p) => (
            <div
              key={p.id}
              className="ftm-ess-card"
              onClick={() => setProductId(p.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setProductId(p.id)}
            >
              <img src={p.image} alt={`${p.brand} ${Ltxt(p.name, lang)}`} className="ftm-ess-card__img" />
              <div className="ftm-ess-card__body">
                <span className="ftm-ess-card__brand">{p.brand}</span>
                <p className="ftm-ess-card__name">{Ltxt(p.name, lang)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
