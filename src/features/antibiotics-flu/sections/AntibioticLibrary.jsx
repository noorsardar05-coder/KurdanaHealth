import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Search, X } from "lucide-react";
import { AFS_DRUGS, AFS_DRUG_DETAILS } from "../data/content.js";
import { PillIllustration } from "../components/illustrations/index.jsx";

const USE_FILTERS = [
  { id: "use_resp", tag: "resp" },
  { id: "use_skin", tag: "skin" },
  { id: "use_uti", tag: "uti" },
  { id: "use_gi", tag: "gi" },
  { id: "use_broad", tag: "broad" },
];

function matchesSearch(drug, query, lang) {
  if (!query.trim()) return true;
  const q = query.trim().toLowerCase();
  const en = (drug.names.en || "").toLowerCase();
  const ku = (drug.names.ku || "").toLowerCase();
  const local = (drug.names[lang] || "").toLowerCase();
  return en.includes(q) || ku.includes(q) || local.includes(q);
}

function DrugDetailSheet({ drug, lang, t, D, onClose }) {
  if (!drug) return null;
  const name = drug.names[lang] || drug.names.en;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <motion.article
        className="relative w-full sm:max-w-lg max-h-[90vh] bg-white rounded-t-[20px] sm:rounded-[20px] border border-[#eceae6] shadow-2xl flex flex-col overflow-hidden"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-[#eceae6] shrink-0">
          <div className="flex items-center gap-4 min-w-0">
            <PillIllustration className="w-14 h-14 shrink-0" />
            <div className="min-w-0">
              <h3 className="text-xl font-medium truncate">{name}</h3>
              <p className="text-sm text-[#3d9970] mt-0.5">{t(`class_${drug.classId}`)}</p>
            </div>
          </div>
          <button type="button" className="p-1 text-[#6b6560] hover:text-[#141414] shrink-0" onClick={onClose} aria-label="Close">
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-6 space-y-6 flex-1">
          <p className="text-xs text-[#6b6560] uppercase tracking-wider">{t("doctorOnly")}</p>

          {[
            { label: t("drugUses"), text: D.defaultUses },
            { label: t("drugNotFor"), text: D.defaultNot },
            { label: t("drugResist"), text: D.defaultResist },
          ].map(({ label, text }) => (
            <div key={label}>
              <h4 className="font-medium text-sm mb-2">{label}</h4>
              <p className="text-[#6b6560] text-[0.9375rem] leading-relaxed">{text}</p>
            </div>
          ))}

          <div className="rounded-xl bg-[#fef7f5] border border-[#f0ddd8] px-4 py-3 text-sm text-[#8b4a3a] leading-relaxed">
            {D.defaultWarn}
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

export default function AntibioticLibrary({ t, tc, lang }) {
  const [q, setQ] = useState("");
  const [cls, setCls] = useState("");
  const [useFilter, setUseFilter] = useState("");
  const [notViralOnly, setNotViralOnly] = useState(false);
  const [selected, setSelected] = useState(null);

  const D = AFS_DRUG_DETAILS[lang] || AFS_DRUG_DETAILS.en;
  const classes = useMemo(() => [...new Set(AFS_DRUGS.map((d) => d.classId))], []);

  const filtered = useMemo(() => {
    const useTag = USE_FILTERS.find((f) => f.id === useFilter)?.tag;

    return AFS_DRUGS.filter((d) => {
      if (!matchesSearch(d, q, lang)) return false;
      if (cls && d.classId !== cls) return false;
      if (useTag && !d.tags.includes(useTag)) return false;
      if (notViralOnly && !d.tags.includes("not_flu")) return false;
      return true;
    });
  }, [q, cls, useFilter, notViralOnly, lang]);

  return (
    <section className="kh-section kh-section--surface" id="library">
      <div className="kh-wrap">
        <div className="max-w-xl mb-16">
          <p className="kh-eyebrow">{tc("navLibrary")}</p>
          <h2 className="kh-display text-[clamp(2rem,5vw,3rem)] mb-4">{tc("sectionLibrary")}</h2>
          <p className="kh-lead">{tc("sectionLibrarySub")}</p>
        </div>

        <div className="relative max-w-md mb-8">
          <Search size={18} strokeWidth={1.5} className="absolute start-4 top-1/2 -translate-y-1/2 text-[#6b6560] pointer-events-none" />
          <input
            type="search"
            className="kh-input kh-input--search"
            placeholder={tc("searchDrugs")}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label={tc("searchDrugs")}
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <button type="button" className={`kh-chip ${!cls ? "selected" : ""}`} onClick={() => setCls("")}>
            {t("filterAllClasses")}
          </button>
          {classes.map((c) => (
            <button key={c} type="button" className={`kh-chip ${cls === c ? "selected" : ""}`} onClick={() => setCls(c)}>
              {t(`class_${c}`)}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <button type="button" className={`kh-chip ${!useFilter ? "selected" : ""}`} onClick={() => setUseFilter("")}>
            {tc("filterAllUses")}
          </button>
          {USE_FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`kh-chip ${useFilter === f.id ? "selected" : ""}`}
              onClick={() => setUseFilter(f.id)}
            >
              {t(f.id)}
            </button>
          ))}
        </div>

        <label className="inline-flex items-center gap-2 text-sm text-[#6b6560] mb-12 cursor-pointer select-none">
          <input
            type="checkbox"
            className="rounded border-[#eceae6] text-[#3d9970] focus:ring-[#d4ede4]"
            checked={notViralOnly}
            onChange={(e) => setNotViralOnly(e.target.checked)}
          />
          {t("filterNotFlu")}
        </label>

        <ul className="text-sm text-[#6b6560] space-y-2 mb-12 max-w-2xl">
          {[1, 2, 3, 4].map((n) => (
            <li key={n}>· {t(`libraryEdu${n}`)}</li>
          ))}
        </ul>

        {filtered.length === 0 ? (
          <p className="text-[#6b6560] text-center py-16">{t("noResults")}</p>
        ) : (
          <div className="space-y-4">
            {filtered.map((drug) => (
              <motion.article
                key={drug.id}
                layout
                className="kh-card kh-card--lift flex flex-col sm:flex-row gap-6 sm:items-center cursor-pointer group"
                onClick={() => setSelected(drug)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setSelected(drug)}
              >
                <PillIllustration className="w-16 h-16 shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-medium mb-1">{drug.names[lang] || drug.names.en}</h3>
                  <p className="text-sm text-[#3d9970] mb-3">{t(`class_${drug.classId}`)}</p>
                  <p className="text-sm text-[#6b6560] leading-relaxed line-clamp-2">
                    <span className="text-[#141414]">{t("drugNotFor")}:</span> {D.defaultNot}
                  </p>
                </div>
                <ChevronRight
                  size={20}
                  strokeWidth={1.5}
                  className="text-[#6b6560] shrink-0 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
                />
              </motion.article>
            ))}
          </div>
        )}

        <p className="text-xs text-[#6b6560] mt-10 text-center">
          {filtered.length} {t("libraryNote")}
        </p>
      </div>

      <AnimatePresence>
        {selected && (
          <DrugDetailSheet drug={selected} lang={lang} t={t} D={D} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
