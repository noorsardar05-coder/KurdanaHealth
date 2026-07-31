import { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, X } from "lucide-react";
import { AFS_ARTICLES } from "../data/content.js";

const COVERS = ["#E8F6F3", "#D4EDE4", "#FAFAF8", "#E8F6F3", "#D4EDE4", "#FAFAF8", "#E8F6F3"];

function ArticleReader({ article, lang, tc, onClose, onSave, saved }) {
  const bodyRef = useRef(null);
  const [readPct, setReadPct] = useState(0);

  const onScroll = useCallback(() => {
    const el = bodyRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setReadPct(max > 0 ? Math.min(100, Math.round((el.scrollTop / max) * 100)) : 100);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <motion.article
        className="relative w-full sm:max-w-xl max-h-[92vh] bg-white rounded-t-[20px] sm:rounded-[20px] border border-[#eceae6] shadow-2xl flex flex-col overflow-hidden"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="h-1 bg-[#eceae6] shrink-0">
          <motion.div className="h-full bg-[#3d9970]" animate={{ width: `${readPct}%` }} transition={{ duration: 0.15 }} />
        </div>
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#eceae6] shrink-0">
          <span className="text-xs text-[#6b6560]">{readPct}% {tc("progress")}</span>
          <div className="flex items-center gap-3">
            <button type="button" className="text-xs text-[#6b6560] flex items-center gap-1" onClick={() => onSave(article.id)}>
              <Bookmark size={14} strokeWidth={1.5} fill={saved.has(article.id) ? "currentColor" : "none"} />
              {saved.has(article.id) ? tc("saved") : tc("saveArticle")}
            </button>
            <button type="button" className="p-1 text-[#6b6560] hover:text-[#141414]" onClick={onClose} aria-label="Close">
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
        <div ref={bodyRef} onScroll={onScroll} className="overflow-y-auto px-6 py-8 flex-1">
          <h3 className="kh-display text-2xl sm:text-3xl mb-6">{article.titles[lang]}</h3>
          <p className="text-[#6b6560] leading-[1.8] text-[1.0625rem] whitespace-pre-line">{article.bodies[lang]}</p>
        </div>
      </motion.article>
    </motion.div>
  );
}

export default function DiscoverMagazine({ tc, lang }) {
  const [saved, setSaved] = useState(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem("kh_afs_saved") || "[]"));
    } catch {
      return new Set();
    }
  });
  const [reading, setReading] = useState(null);

  const toggleSave = (id) => {
    setSaved((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        localStorage.setItem("kh_afs_saved", JSON.stringify([...next]));
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  const [featured, ...rest] = AFS_ARTICLES;

  return (
    <section className="kh-section kh-section--surface" id="discover">
      <div className="kh-wrap">
        <div className="mb-16">
          <p className="kh-eyebrow">{tc("navDiscover")}</p>
          <h2 className="kh-display text-[clamp(2rem,5vw,3rem)] mb-4">{tc("sectionFeed")}</h2>
          <p className="kh-lead">{tc("sectionFeedSub")}</p>
        </div>

        {featured && (
          <motion.article
            className="kh-mag mb-12 grid md:grid-cols-2 cursor-pointer"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={() => setReading(featured)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setReading(featured)}
          >
            <div className="kh-mag__cover min-h-[240px]" style={{ background: COVERS[0] }}>
              <span className="text-xs font-medium uppercase tracking-widest text-[#3d9970]">{tc("featured")}</span>
            </div>
            <div className="kh-mag__body flex flex-col justify-center">
              <h3 className="kh-display text-2xl sm:text-3xl mb-4">{featured.titles[lang]}</h3>
              <p className="text-[#6b6560] leading-relaxed mb-6 line-clamp-4">{featured.bodies[lang]}</p>
              <div className="flex items-center gap-4 text-sm text-[#6b6560]">
                <span>3 {tc("readTime")}</span>
                <button
                  type="button"
                  className="flex items-center gap-1 hover:text-[#141414]"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSave(featured.id);
                  }}
                >
                  <Bookmark size={16} strokeWidth={1.5} fill={saved.has(featured.id) ? "currentColor" : "none"} />
                  {saved.has(featured.id) ? tc("saved") : tc("saveArticle")}
                </button>
              </div>
            </div>
          </motion.article>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((article, i) => (
            <motion.article
              key={article.id}
              className="kh-mag cursor-pointer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.06 }}
              onClick={() => setReading(article)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setReading(article)}
            >
              <div className="kh-mag__cover" style={{ background: COVERS[(i + 1) % COVERS.length], minHeight: 140 }}>
                <span className="text-xs text-[#6b6560]">{String(i + 2).padStart(2, "0")}</span>
              </div>
              <div className="kh-mag__body">
                <h4 className="font-medium text-lg mb-2 leading-snug">{article.titles[lang]}</h4>
                <p className="text-sm text-[#6b6560] line-clamp-3">{article.bodies[lang]}</p>
                <button
                  type="button"
                  className="mt-4 text-xs text-[#6b6560] flex items-center gap-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSave(article.id);
                  }}
                >
                  <Bookmark size={14} strokeWidth={1.5} fill={saved.has(article.id) ? "currentColor" : "none"} />
                  {saved.has(article.id) ? tc("saved") : tc("saveArticle")}
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {reading && (
          <ArticleReader
            article={reading}
            lang={lang}
            tc={tc}
            saved={saved}
            onClose={() => setReading(null)}
            onSave={toggleSave}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
