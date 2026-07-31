import { useState } from "react";
import { motion } from "framer-motion";
import { Droplets, Moon, Thermometer, Activity } from "lucide-react";
import { useFluTracker } from "../hooks/useFluTracker.js";

function MiniChart({ values, color = "#3D9970" }) {
  const max = Math.max(...values, 1);
  const w = 120;
  const h = 40;
  const pts = values.length
    ? values
        .map((v, i) => {
          const x = (i / Math.max(values.length - 1, 1)) * w;
          const y = h - (v / max) * h;
          return `${x},${y}`;
        })
        .join(" ")
    : "";
  return (
    <svg width={w} height={h} className="opacity-80" aria-hidden="true">
      {pts && <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
  );
}

function JourneySlider({ label, value, min, max, step, unit, onChange }) {
  return (
    <label className="block">
      <div className="flex justify-between items-baseline mb-2">
        <span className="text-sm text-[#6b6560]">{label}</span>
        <span className="text-lg font-medium tabular-nums">
          {value}
          {unit && <span className="text-sm font-normal text-[#6b6560] ms-1">{unit}</span>}
        </span>
      </div>
      <input
        type="range"
        className="kh-range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

export default function RecoveryJourney({ t, tc }) {
  const { entries, addEntry, removeEntry, trends } = useFluTracker(t);
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    temp: "37.0",
    severity: "3",
    hydration: "6",
    sleep: "7",
    symptoms: "",
    notes: "",
  });

  const submit = (e) => {
    e.preventDefault();
    addEntry(form);
    setForm((f) => ({ ...f, symptoms: "", notes: "" }));
  };

  const milestones = [
    { n: 1, title: "tl_early_title", body: "tl_early_body" },
    { n: 2, title: "tl_peak_title", body: "tl_peak_body" },
    { n: 3, title: "tl_rec_title", body: "tl_rec_body" },
  ];

  const severityLabels = ["", t("sevMild"), t("sevMod"), t("sevMod"), t("sevSev"), t("sevSev")];

  return (
    <section className="kh-section" id="recovery">
      <div className="kh-wrap">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-20">
          <div className="lg:col-span-5">
            <p className="kh-eyebrow">{tc("navRecovery")}</p>
            <h2 className="kh-display text-[clamp(2rem,5vw,3rem)] mb-4">{tc("sectionRecovery")}</h2>
            <p className="kh-lead mb-10">{tc("sectionRecoverySub")}</p>

            <div className="kh-score-ring mb-8" style={{ "--kh-score-pct": `${trends.healthScore}%` }}>
              <span>{trends.healthScore}</span>
              <span className="text-xs text-[#6b6560] font-sans mt-1">{tc("healthScore")}</span>
            </div>

            <p className="text-sm text-[#6b6560]">
              {tc("outlook")}: <strong className="text-[#141414] font-medium">{t(trends.outlook)}</strong>
            </p>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <div className="grid grid-cols-2 gap-4">
              {[
                { Icon: Thermometer, label: t("trendFever"), val: trends.temps.at(-1), chart: trends.temps, suffix: "°C" },
                { Icon: Activity, label: t("trendSymptom"), val: trends.sevs.at(-1), chart: trends.sevs },
                { Icon: Droplets, label: t("trendHydration"), val: trends.hyd.at(-1), chart: trends.hyd },
                { Icon: Moon, label: t("trendSleep"), val: trends.sleep.at(-1), chart: trends.sleep, suffix: "h" },
              ].map(({ Icon, label, val, chart, suffix }) => (
                <div key={label} className="kh-card !p-5">
                  <Icon size={18} strokeWidth={1.5} className="text-[#3d9970] mb-3" />
                  <p className="text-xs text-[#6b6560] mb-1">{label}</p>
                  <p className="text-xl font-medium mb-2">
                    {val ?? "—"}
                    {val != null && suffix ? suffix : ""}
                  </p>
                  <MiniChart values={chart.filter((x) => !isNaN(x))} />
                </div>
              ))}
            </div>

            <div className="kh-journey-rail">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.n}
                  className="kh-journey-day kh-card"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <p className="text-xs text-[#3d9970] font-medium mb-2">
                    {tc("day")} {m.n}
                  </p>
                  <h4 className="font-medium mb-2">{t(m.title)}</h4>
                  <p className="text-sm text-[#6b6560]">{t(m.body)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 grid lg:grid-cols-2 gap-12 items-start">
          <div className="kh-card">
            <h3 className="font-medium text-lg mb-1">{tc("todayEntry")}</h3>
            <p className="text-sm text-[#6b6560] mb-8">{tc("recoveryHowFeel")}</p>
            <form onSubmit={submit} className="space-y-8">
              <label className="block">
                <span className="text-xs text-[#6b6560] uppercase tracking-wider">{t("fieldDate")}</span>
                <input
                  type="date"
                  className="kh-input mt-1.5"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </label>

              <JourneySlider
                label={t("fieldTemp")}
                value={form.temp}
                min="35"
                max="41"
                step="0.1"
                unit="°C"
                onChange={(v) => setForm({ ...form, temp: v })}
              />

              <div>
                <JourneySlider
                  label={t("fieldSeverity")}
                  value={form.severity}
                  min="1"
                  max="5"
                  step="1"
                  onChange={(v) => setForm({ ...form, severity: v })}
                />
                <p className="text-xs text-[#3d9970] mt-1">{severityLabels[parseInt(form.severity, 10)] || ""}</p>
              </div>

              <JourneySlider
                label={t("fieldHydration")}
                value={form.hydration}
                min="0"
                max="10"
                step="1"
                onChange={(v) => setForm({ ...form, hydration: v })}
              />

              <JourneySlider
                label={t("fieldSleep")}
                value={form.sleep}
                min="0"
                max="14"
                step="0.5"
                unit="h"
                onChange={(v) => setForm({ ...form, sleep: v })}
              />

              <label className="block">
                <span className="text-xs text-[#6b6560]">{t("fieldSymptoms")}</span>
                <textarea
                  className="kh-input mt-1.5 min-h-[72px] resize-none"
                  placeholder={tc("recoverySymptomsPlaceholder")}
                  value={form.symptoms}
                  onChange={(e) => setForm({ ...form, symptoms: e.target.value })}
                />
              </label>

              <button type="submit" className="kh-btn kh-btn--primary w-full sm:w-auto">
                {tc("saveLog")}
              </button>
            </form>
          </div>

          <div className="space-y-4">
            {entries.length === 0 && <p className="text-[#6b6560] text-sm">{t("historyEmpty")}</p>}
            {entries.slice(0, 6).map((e, i) => (
              <motion.div
                key={e.id}
                layout
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="kh-card kh-card--lift !py-4 !px-5 flex justify-between gap-4"
              >
                <div>
                  <p className="font-medium">{e.date}</p>
                  <p className="text-sm text-[#6b6560] mt-1">
                    {e.temp}°C · {t("fieldSeverity")} {e.severity} · {t("fieldHydration")} {e.hydration}
                  </p>
                  {e.symptomsText && <p className="text-sm text-[#6b6560] mt-2">{e.symptomsText}</p>}
                </div>
                <button
                  type="button"
                  className="text-xs text-[#6b6560] hover:text-[#141414] shrink-0"
                  onClick={() => removeEntry(e.id)}
                >
                  {t("btnDeleteEntry")}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
