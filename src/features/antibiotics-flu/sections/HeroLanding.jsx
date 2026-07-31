import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { HeroIllustration } from "../components/illustrations/index.jsx";

const fade = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } };

export default function HeroLanding({ tc, onBegin, onRecovery }) {
  const features = [
    { title: "feature1Title", desc: "feature1Desc" },
    { title: "feature2Title", desc: "feature2Desc" },
    { title: "feature3Title", desc: "feature3Desc" },
  ];

  return (
    <section className="kh-section pb-8" id="top">
      <div className="kh-wrap">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <motion.div {...fade}>
            <p className="kh-eyebrow">{tc("welcome")}</p>
            <h1 className="kh-display text-[clamp(2.5rem,6vw,4.25rem)] whitespace-pre-line mb-6">
              {tc("heroTitle")}
            </h1>
            <p className="kh-lead mb-10">{tc("heroSub")}</p>
            <div className="flex flex-wrap gap-3">
              <button type="button" className="kh-btn kh-btn--primary" onClick={onBegin}>
                {tc("heroCta")}
              </button>
              <button type="button" className="kh-btn kh-btn--ghost" onClick={onRecovery}>
                {tc("heroCtaSecondary")}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative"
          >
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
              <HeroIllustration />
            </motion.div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-24 pt-16 border-t border-[#eceae6]">
          {features.map(({ title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <Sparkles size={18} strokeWidth={1.5} className="text-[#3d9970] mb-4" />
              <h3 className="font-medium text-lg mb-2">{tc(title)}</h3>
              <p className="text-[#6b6560] text-[0.9375rem] leading-relaxed">{tc(desc)}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="flex justify-center mt-20 text-[#6b6560] text-sm gap-2"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <ArrowDown size={16} strokeWidth={1.5} />
        </motion.div>
      </div>
    </section>
  );
}
