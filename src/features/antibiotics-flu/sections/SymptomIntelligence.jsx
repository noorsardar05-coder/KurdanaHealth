import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Sparkles, Brain } from "lucide-react";
import GlassPanel from "../components/GlassPanel.jsx";
import MagneticButton from "../components/MagneticButton.jsx";
import { analyzeSymptoms, RF_KEYS, SYM_KEYS } from "../logic/symptomAnalysis.js";

const STEPS = ["red", "symptoms", "details", "result"];

export default function SymptomIntelligence({ t, tc }) {
  const [step, setStep] = useState(0);
  const [redFlags, setRedFlags] = useState({});
  const [symptoms, setSymptoms] = useState({});
  const [duration, setDuration] = useState("dur35");
  const [temp, setTemp] = useState("tempNormal");
  const [severity, setSeverity] = useState("sevMod");
  const [result, setResult] = useState(null);

  const anyRed = RF_KEYS.some((k) => redFlags[k]);

  const toggle = (obj, set, key) => set({ ...obj, [key]: !obj[key] });

  const selfCareMap = {
    pattern_flu: "selfCareFlu",
    pattern_cold: "selfCareCold",
    pattern_viral: "selfCareViral",
    pattern_bact: "selfCareBact",
    pattern_urgent: "selfCareUrgent",
  };

  const runAnalysis = () => {
    const res = analyzeSymptoms({ symptoms, redFlags, duration, temp, severity });
    setResult(res);
    setStep(3);
  };

  const chipOpts = {
    duration: ["dur12", "dur35", "dur6"],
    temp: ["tempNormal", "tempMild", "tempHigh"],
    severity: ["sevMild", "sevMod", "sevSev"],
  };

  return (
    <section className="kh-section" id="symptom">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}>
        <p className="kh-section__label">01 — Intelligence</p>
        <h2 className="kh-section__title kh-gradient-text">{tc("sectionSymptom")}</h2>
        <p className="kh-section__sub">{tc("sectionSymptomSub")}</p>
      </motion.div>

      <GlassPanel glow className="mt-12 p-6 sm:p-10">
        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/10">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00D1C7]/15">
            <Brain className="text-[#7CF9F2]" size={24} />
          </div>
          <div>
            <p className="text-sm text-white/50 flex items-center gap-2">
              <Sparkles size={14} className="text-[#00D1C7]" />
              AI Pattern Engine
            </p>
            <p className="text-xs text-white/40 mt-0.5">{tc("notDiagnosis")}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {STEPS.map((s, i) => (
            <span
              key={s}
              className={`text-xs font-semibold px-3 py-1 rounded-full ${i <= step ? "bg-[#00D1C7]/20 text-[#7CF9F2]" : "bg-white/5 text-white/30"}`}
            >
              {i + 1}
            </span>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {anyRed && (
            <motion.div
              key="urgent"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-6 flex gap-3 rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-red-200"
            >
              <AlertTriangle size={22} className="shrink-0" />
              <p className="text-sm">{tc("urgentBanner")}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="red" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h3 className="text-lg font-semibold mb-4">{t("redFlagTitle")}</h3>
              <div className="grid sm:grid-cols-2 gap-1">
                {RF_KEYS.map((k) => (
                  <label key={k} className="kh-check kh-chip--warn">
                    <input type="checkbox" checked={!!redFlags[k]} onChange={() => toggle(redFlags, setRedFlags, k)} />
                    <span>{t(`rf_${k}`)}</span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}
          {step === 1 && (
            <motion.div key="sym" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h3 className="text-lg font-semibold mb-4">{t("symptomsTitle")}</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-1">
                {SYM_KEYS.map((k) => (
                  <label key={k} className="kh-check">
                    <input type="checkbox" checked={!!symptoms[k]} onChange={() => toggle(symptoms, setSymptoms, k)} />
                    <span>{t(`sym_${k}`)}</span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}
          {step === 2 && (
            <motion.div key="det" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              {Object.entries(chipOpts).map(([key, opts]) => (
                <div key={key}>
                  <p className="text-xs uppercase tracking-wider text-white/40 mb-2">{t(`lbl${key.charAt(0).toUpperCase()}${key.slice(1)}`)}</p>
                  <div className="flex flex-wrap gap-2">
                    {opts.map((opt) => {
                      const cur = key === "duration" ? duration : key === "temp" ? temp : severity;
                      const set = key === "duration" ? setDuration : key === "temp" ? setTemp : setSeverity;
                      return (
                        <button key={opt} type="button" className={`kh-chip ${cur === opt ? "active" : ""}`} onClick={() => set(opt)}>
                          {t(opt)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
          {step === 3 && result && (
            <motion.div key="res" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="grid sm:grid-cols-2 gap-4">
              {[
                { title: t("patternLabel"), body: `${t("mayMatch")} ${t(result.patternKey)}`, icon: "🔍" },
                { title: t("selfCareTitle"), body: t(selfCareMap[result.patternKey] || "selfCareViral") },
                { title: t("seekDoctorTitle"), body: t("seekCare") },
                { title: t("abxEduTitle"), body: `${t("abx_out_not_helpful")} ${t("abx_out_no_leftover")}` },
                { title: t("riskLevel"), body: t(result.risk) },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <p className="text-2xl mb-2">{card.icon || "💡"}</p>
                  <h4 className="font-semibold text-[#7CF9F2] mb-2">{card.title}</h4>
                  <p className="text-sm text-white/60 leading-relaxed">{card.body}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 flex flex-wrap gap-3 justify-end">
          {step > 0 && step < 3 && (
            <MagneticButton variant="ghost" onClick={() => setStep((s) => s - 1)}>{tc("back")}</MagneticButton>
          )}
          {step < 2 && (
            <MagneticButton onClick={() => setStep((s) => s + 1)}>{tc("continue")}</MagneticButton>
          )}
          {step === 2 && (
            <MagneticButton onClick={runAnalysis}>{tc("analyze")}</MagneticButton>
          )}
        </div>
      </GlassPanel>
    </section>
  );
}
