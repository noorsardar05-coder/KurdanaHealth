import { RefreshCw } from "lucide-react";

export default function FitnessRetakeQuiz({ t, onRetake }) {
  return (
    <section className="ft-retake glass" id="fitness-settings" aria-label={t("profileTitle")}>
      <div className="ft-retake__body">
        <h3 className="ft-section-label">{t("profileTitle")}</h3>
        <p className="ft-retake__desc">{t("retakeQuizDesc")}</p>
      </div>
      <button type="button" className="ft-btn ft-btn--soft ft-retake__btn" onClick={onRetake}>
        <RefreshCw size={16} />
        {t("retakeQuiz")}
      </button>
    </section>
  );
}
