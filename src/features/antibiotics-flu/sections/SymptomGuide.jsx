import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { analyzeSymptoms, RF_KEYS, SYM_KEYS } from "../logic/symptomAnalysis.js";

const STEPS = 4;

export default function SymptomGuide({ t, tc }) {
  const [step, setStep] = useState(0);
  const [redFlags, setRedFlags] = useState({});
  const [symptoms, setSymptoms] = useState({});
  const [duration, setDuration] = useState("dur35");
  const [temp, setTemp] = useState("tempNormal");
  const [severity, setSeverity] = useState("sevMod");
  const [result, setResult] = useState(null);

  const anyRed = RF_KEYS.some((k) => redFlags[k]);
  const prompts = [tc("conversationalHi"), tc("conversationalSymptoms"), tc("conversationalDetails"), tc("conversationalDone")];

  const toggle = (obj, set, key) => set({ ...obj, [key]: !obj[key] });

  const next = () => {
    if (step === 2) {
      setResult(analyzeSymptoms({ symptoms, redFlags, duration, temp, severity }));
    }
    setStep((s) => Math.min(s + 1, STEPS - 1));
  };

  const selfCareMap = {
    pattern_flu: "selfCareFlu",
    pattern_cold: "selfCareCold",
    pattern_viral: "selfCareViral",
    pattern_bact: "selfCareBact",
    pattern_urgent: "selfCareUrgent",
  };

  const seekCareMap = {
    pattern_flu: "seekFlu",
    pattern_cold: "seekCold",
    pattern_viral: "seekViral",
    pattern_bact: "seekBact",
    pattern_urgent: "seekUrgent",
  };

  return (
    <section className="kh-section kh-section--surface" id="symptom">
      <div className="kh-wrap max-w-2xl mx-auto">
        <p className="kh-eyebrow text-center">{t("tabSymptom")}</p>
        <h2 className="kh-display text-[clamp(2rem,5vw,3rem)] text-center mb-4">{tc("sectionSymptom")}</h2>
        <p className="kh-lead text-center mx-auto mb-16">{tc("sectionSymptomSub")}</p>

        <div className="kh-progress">
          {Array.from({ length: STEPS }).map((_, i) => (
            <div key={i} className={`kh-progress__dot ${i < step ? "done" : ""} ${i === step ? "current" : ""}`} />
          ))}
        </div>

        {anyRed && step < 3 && (
          <div className="kh-alert mb-8">
            <AlertCircle size={20} strokeWidth={1.5} className="shrink-0 mt-0.5" />
            <p>{tc("urgentBanner")}</p>
          </div>
        )}

        <div className="kh-card min-h-[320px] flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.35 }}
              className="flex-1"
            >
              <p className="text-[#6b6560] text-sm mb-6">{prompts[step]}</p>

              {step === 0 && (
                <div className="flex flex-wrap gap-2">
                  {RF_KEYS.map((k) => (
                    <button
                      key={k}
                      type="button"
                      className={`kh-chip kh-chip--warn ${redFlags[k] ? "selected" : ""}`}
                      onClick={() => toggle(redFlags, setRedFlags, k)}
                    >
                      {t(`rf_${k}`)}
                    </button>
                  ))}
                </div>
              )}

              {step === 1 && (
                <div className="flex flex-wrap gap-2">
                  {SYM_KEYS.map((k) => (
                    <button
                      key={k}
                      type="button"
                      className={`kh-chip ${symptoms[k] ? "selected" : ""}`}
                      onClick={() => toggle(symptoms, setSymptoms, k)}
                    >
                      {t(`sym_${k}`)}
                    </button>
                  ))}
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8">
                  {[
                    { label: "lblDuration", opts: ["dur12", "dur35", "dur6"], val: duration, set: setDuration },
                    { label: "lblTemp", opts: ["tempNormal", "tempMild", "tempHigh"], val: temp, set: setTemp },
                    { label: "lblSeverity", opts: ["sevMild", "sevMod", "sevSev"], val: severity, set: setSeverity },
                  ].map(({ label, opts, val, set }) => (
                    <div key={label}>
                      <p className="text-xs uppercase tracking-wider text-[#6b6560] mb-3">{t(label)}</p>
                      <div className="flex flex-wrap gap-2">
                        {opts.map((o) => (
                          <button key={o} type="button" className={`kh-chip ${val === o ? "selected" : ""}`} onClick={() => set(o)}>
                            {t(o)}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {step === 3 && result && (
                <div className="space-y-6">
                  {result.anyRed && (
                    <div className="kh-alert">
                      <AlertCircle size={20} strokeWidth={1.5} className="shrink-0 mt-0.5" />
                      <p>{t("urgentBody")}</p>
                    </div>
                  )}
                  <p className="text-xs text-[#6b6560]">{tc("notDiagnosis")}</p>
                  {[
                    { h: t("patternLabel"), p: `${t("mayMatch")} ${t(result.patternKey)}`, highlight: true },
                    { h: t("selfCareTitle"), p: t(selfCareMap[result.patternKey] || "selfCareViral") },
                    { h: t("seekDoctorTitle"), p: t(seekCareMap[result.patternKey] || "seekCare") },
                    { h: t("abxEduTitle"), p: `${t("abx_out_not_helpful")} ${t("abx_out_no_leftover")}` },
                  ].map(({ h, p, highlight }) => (
                    <motion.div
                      key={h}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`pb-6 border-b border-[#eceae6] last:border-0 last:pb-0 ${highlight ? "rounded-xl bg-[#fafaf8] -mx-2 px-4 py-4 border-0" : ""}`}
                    >
                      <h4 className="font-medium mb-2">{h}</h4>
                      <p className="text-[#6b6560] text-[0.9375rem] leading-relaxed">{p}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between items-center mt-10 pt-6 border-t border-[#eceae6]">
            <button
              type="button"
              className="kh-btn kh-btn--text"
              disabled={step === 0}
              onClick={() => setStep((s) => s - 1)}
            >
              <ChevronLeft size={18} /> {tc("back")}
            </button>
            {step < STEPS - 1 ? (
              <button type="button" className="kh-btn kh-btn--primary" onClick={next}>
                {step === 2 ? tc("analyze") : tc("continue")} <ChevronRight size={18} />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
