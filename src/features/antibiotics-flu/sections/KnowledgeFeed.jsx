import { motion } from "framer-motion";
import { AFS_ARTICLES } from "../data/content.js";

const GRADIENTS = [
  "linear-gradient(135deg, #00D1C7 0%, #0B172A 100%)",
  "linear-gradient(135deg, #5CE1E6 0%, #0f2038 100%)",
  "linear-gradient(135deg, #7CF9F2 0%, #0B172A 80%)",
  "linear-gradient(160deg, #00a89f 0%, #0B172A 100%)",
  "linear-gradient(145deg, #5CE1E6 30%, #0B172A 100%)",
  "linear-gradient(120deg, #00D1C7 20%, #0f2038 100%)",
  "linear-gradient(155deg, #7CF9F2 0%, #0B172A 90%)",
];

export default function KnowledgeFeed({ tc, lang }) {
  return (
    <section className="kh-section" id="feed">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}>
        <p className="kh-section__label">06 — Discover</p>
        <h2 className="kh-section__title kh-gradient-text">{tc("sectionFeed")}</h2>
        <p className="kh-section__sub">{tc("sectionFeedSub")}</p>
      </motion.div>

      <div className="mt-12 grid sm:grid-cols-2 gap-6">
        {AFS_ARTICLES.map((article, i) => (
          <motion.article
            key={article.id}
            className="kh-mag-card kh-glass"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: (i % 4) * 0.08 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="kh-mag-card__gradient" style={{ background: GRADIENTS[i % GRADIENTS.length] }} />
            <div className="kh-mag-card__body">
              <span className="text-xs font-bold tracking-widest text-white/60 mb-3">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold leading-tight mb-3">{article.titles[lang]}</h3>
              <p className="text-sm text-white/75 leading-relaxed">{article.bodies[lang]}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
