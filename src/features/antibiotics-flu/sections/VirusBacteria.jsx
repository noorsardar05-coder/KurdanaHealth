import { motion } from "framer-motion";
import { Bug, Microscope } from "lucide-react";
import { AFS_INFECTIONS, AFS_ABX_LABELS } from "../data/content.js";

export default function VirusBacteria({ t, tc, lang }) {
  const labels = AFS_ABX_LABELS[lang] || AFS_ABX_LABELS.en;

  return (
    <section className="kh-section" id="compare">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}>
        <p className="kh-section__label">04 — Compare</p>
        <h2 className="kh-section__title kh-gradient-text">{tc("sectionCompare")}</h2>
        <p className="kh-section__sub">{tc("sectionCompareSub")}</p>
      </motion.div>

      <motion.div
        className="kh-split kh-glass mt-12"
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <div className="kh-split__side kh-split__side--viral">
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity }}>
            <Bug size={48} className="text-[#7CF9F2] mb-4" strokeWidth={1.2} />
          </motion.div>
          <h3 className="text-2xl font-bold mb-2">{tc("viralSide")}</h3>
          <p className="text-white/50 text-sm mb-6">{tc("viralSummary")}</p>
          <p className="text-sm text-white/60">{labels.no}</p>
        </div>
        <div className="kh-split__side kh-split__side--bacterial">
          <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 6, repeat: Infinity }}>
            <Microscope size={48} className="text-[#5CE1E6] mb-4" strokeWidth={1.2} />
          </motion.div>
          <h3 className="text-2xl font-bold mb-2">{tc("bacterialSide")}</h3>
          <p className="text-white/50 text-sm mb-6">{tc("bacterialSummary")}</p>
          <p className="text-sm text-white/60">{labels.maybe}</p>
        </div>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {AFS_INFECTIONS.slice(0, 6).map((inf, i) => (
          <motion.div
            key={inf.id}
            className="kh-glass rounded-2xl p-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
          >
            <span className="text-xs font-bold px-2 py-1 rounded-full bg-[#00D1C7]/15 text-[#7CF9F2]">
              {labels[inf.abx] || inf.abx}
            </span>
            <h4 className="font-semibold mt-3 mb-2">{inf.names[lang]}</h4>
            <p className="text-sm text-white/50">{inf.sym[lang]}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
