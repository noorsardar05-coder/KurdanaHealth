import { motion } from "framer-motion";
import { AFS_INFECTIONS, AFS_ABX_LABELS } from "../data/content.js";
import { VirusIllustration, BacteriaIllustration } from "../components/illustrations/index.jsx";

export default function VirusCompare({ t, tc, lang }) {
  const labels = AFS_ABX_LABELS[lang] || AFS_ABX_LABELS.en;

  return (
    <section className="kh-section" id="compare">
      <div className="kh-wrap">
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="kh-eyebrow">{tc("navCompare")}</p>
          <h2 className="kh-display text-[clamp(2rem,5vw,3rem)] mb-4">{tc("sectionCompare")}</h2>
          <p className="kh-lead mx-auto">{tc("sectionCompareSub")}</p>
        </div>

        <motion.div
          className="kh-split mb-16"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="kh-split__pane text-center sm:text-start">
            <VirusIllustration className="w-20 h-20 mx-auto sm:mx-0 mb-6" />
            <h3 className="text-2xl font-medium mb-3">{tc("viralSide")}</h3>
            <p className="text-[#6b6560] leading-relaxed mb-4">{tc("viralSummary")}</p>
            <p className="text-sm font-medium text-[#3d9970]">{labels.no}</p>
          </div>
          <div className="kh-split__pane text-center sm:text-start">
            <BacteriaIllustration className="w-20 h-20 mx-auto sm:mx-0 mb-6" />
            <h3 className="text-2xl font-medium mb-3">{tc("bacterialSide")}</h3>
            <p className="text-[#6b6560] leading-relaxed mb-4">{tc("bacterialSummary")}</p>
            <p className="text-sm font-medium text-[#6b6560]">{labels.maybe}</p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {AFS_INFECTIONS.map((inf, i) => (
            <motion.div
              key={inf.id}
              className="kh-card"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-[#e8f6f3] text-[#3d9970] mb-4">
                {labels[inf.abx] || inf.abx}
              </span>
              <h4 className="text-lg font-medium mb-2">{inf.names[lang]}</h4>
              <p className="text-sm text-[#6b6560] leading-relaxed mb-3">{inf.sym[lang]}</p>
              <p className="text-sm text-[#6b6560]"><span className="text-[#141414]">{t("selfCareTitle")}:</span> {inf.do[lang]}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
