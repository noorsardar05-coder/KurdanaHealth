import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import PlanExerciseCard from "./PlanExerciseCard.jsx";
import ExerciseDetailModal from "./ExerciseDetailModal.jsx";

function PlanSection({ title, items, lang, t, onStart, onDetail, startIndex }) {
  if (!items?.length) return null;
  return (
    <div className="ft-plan-section">
      <h3 className="ft-plan-section__title">{title}</h3>
      <div className="ft-plan-cards">
        {items.map((ex, i) => (
          <PlanExerciseCard
            key={ex.id}
            exercise={ex}
            lang={lang}
            t={t}
            index={startIndex + i}
            onStart={onStart}
            onDetail={onDetail}
          />
        ))}
      </div>
    </div>
  );
}

export default function SmartPlanPanel({
  t,
  lang,
  plan,
  onStart,
  onSave,
  saved,
}) {
  const [detailExercise, setDetailExercise] = useState(null);

  if (!plan) {
    return (
      <section className="ft-panel glass ft-plan-empty" id="fitness-plan">
        <div className="ft-plan-empty__icon" aria-hidden="true">📋</div>
        <h2 className="ft-panel__title">{t("planTitle")}</h2>
        <p className="ft-panel__desc">{t("planEmptyDesc")}</p>
      </section>
    );
  }

  const safety = [];
  if (plan.safetyNotes?.includes("knee")) safety.push(t("safetyKnee"));
  if (plan.safetyNotes?.includes("back")) safety.push(t("safetyBack"));
  if (plan.safetyNotes?.includes("pregnancy")) safety.push(t("safetyPregnancy"));

  const warmupCount = plan.warmup?.length || 0;
  const mainCount = plan.main?.length || 0;

  return (
    <section className="ft-panel glass ft-plan-panel" id="fitness-plan">
      <div className="ft-plan-panel__head">
        <div>
          <h2 className="ft-panel__title">{t("planTitle")}</h2>
          <p className="ft-panel__desc">{t("planDesc")}</p>
        </div>
        <motion.button
          type="button"
          className="ft-btn ft-btn--primary ft-btn--lg"
          onClick={onStart}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Play size={18} fill="currentColor" />
          {t("startWorkout")}
        </motion.button>
      </div>

      <div className="ft-plan-meta">
        <span className="ft-meta-chip">{plan.exerciseCount} {t("exerciseCount")}</span>
        <span className="ft-meta-chip">{plan.totalDuration} {t("minUnit")}</span>
        <span className="ft-meta-chip">
          {t(`diff${plan.difficulty === "advanced" ? "Adv" : plan.difficulty === "intermediate" ? "Inter" : "Beginner"}`)}
        </span>
        <span className="ft-meta-chip">~{plan.caloriesEstimate} {t("caloriesShort")}</span>
      </div>

      {safety.length > 0 && (
        <div className="ft-safety">
          <strong>{t("safetyNotes")}:</strong> {safety.join(" · ")}
        </div>
      )}

      <PlanSection
        title={t("warmupLabel")}
        items={plan.warmup}
        lang={lang}
        t={t}
        onStart={onStart}
        onDetail={setDetailExercise}
        startIndex={0}
      />
      <PlanSection
        title={t("mainLabel")}
        items={plan.main}
        lang={lang}
        t={t}
        onStart={onStart}
        onDetail={setDetailExercise}
        startIndex={warmupCount}
      />
      <PlanSection
        title={t("cooldownLabel")}
        items={plan.cooldown}
        lang={lang}
        t={t}
        onStart={onStart}
        onDetail={setDetailExercise}
        startIndex={warmupCount + mainCount}
      />

      <div className="ft-plan-footer">
        <button type="button" className="ft-btn ft-btn--accent" onClick={onSave}>
          {saved ? t("planSaved") : t("savePlan")}
        </button>
      </div>

      {detailExercise && (
        <ExerciseDetailModal
          exercise={detailExercise}
          lang={lang}
          t={t}
          onClose={() => setDetailExercise(null)}
          onStart={(ex) => {
            setDetailExercise(null);
            onStart(ex);
          }}
        />
      )}
    </section>
  );
}
