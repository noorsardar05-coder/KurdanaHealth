import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Pill } from "lucide-react";
import GlassPanel from "../components/GlassPanel.jsx";
import { AFS_DRUGS, AFS_DRUG_DETAILS } from "../data/content.js";

export default function AntibioticUniverse({ t, tc, lang }) {
  const [q, setQ] = useState("");
  const [cls, setCls] = useState("");
  const D = AFS_DRUG_DETAILS[lang] || AFS_DRUG_DETAILS.en;

  const classes = useMemo(() => [...new Set(AFS_DRUGS.map((d) => d.classId))], []);

  const filtered = useMemo(() => {
    return AFS_DRUGS.filter((d) => {
      const name = d.names[lang] || d.names.en;
      if (q && !name.toLowerCase().includes(q.toLowerCase())) return false;
      if (cls && d.classId !== cls) return false;
      return true;
    });
  }, [q, cls, lang]);

  return (
    <section className="kh-section" id="universe">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}>
        <p className="kh-section__label">03 — Universe</p>
        <h2 className="kh-section__title kh-gradient-text">{tc("sectionUniverse")}</h2>
        <p className="kh-section__sub">{tc("sectionUniverseSub")}</p>
      </motion.div>

      <div className="mt-10 relative">
        <motion.div
          className="relative mb-8"
          animate={{ scale: q ? 1.02 : 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Search className="absolute start-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
          <input
            type="search"
            className="kh-input ps-12 text-lg"
            placeholder={tc("searchDrugs")}
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-8">
          <button type="button" className={`kh-chip ${!cls ? "active" : ""}`} onClick={() => setCls("")}>{t("filterAllClasses")}</button>
          {classes.map((c) => (
            <button key={c} type="button" className={`kh-chip ${cls === c ? "active" : ""}`} onClick={() => setCls(c)}>
              {t(`class_${c}`)}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((drug, i) => (
            <motion.div
              key={drug.id}
              className="kh-orbit-card kh-glass"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.05 }}
              whileHover={{ y: -8 }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#00D1C7]/15">
                  <Pill size={20} className="text-[#7CF9F2]" />
                </div>
                <div>
                  <h4 className="font-semibold">{drug.names[lang] || drug.names.en}</h4>
                  <p className="text-xs text-[#00D1C7] mt-0.5">{t(`class_${drug.classId}`)}</p>
                </div>
              </div>
              <p className="text-xs text-white/40 mb-2">{t("doctorOnly")}</p>
              <p className="text-sm text-white/55 leading-relaxed"><strong className="text-white/70">{t("drugNotFor")}:</strong> {D.defaultNot}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <GlassPanel className="mt-10 p-6">
        <ul className="space-y-2 text-sm text-white/55">
          {[1, 2, 3, 4].map((n) => (
            <li key={n}>• {t(`libraryEdu${n}`)}</li>
          ))}
        </ul>
      </GlassPanel>
    </section>
  );
}
