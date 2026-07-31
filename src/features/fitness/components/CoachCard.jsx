import { COACH_TIPS } from "../data/tips.js";

export default function CoachCard({ t, lang, progress, readiness, onRecommend }) {
  const encourage = [t("coachEncourage1"), t("coachEncourage2"), t("coachEncourage3")];
  const msg = encourage[progress.workoutsCompleted % encourage.length];
  const workoutTip = COACH_TIPS.workout[progress.streak % COACH_TIPS.workout.length];
  const recoveryTip = COACH_TIPS.recovery[progress.totalMinutes % COACH_TIPS.recovery.length];

  const recommend =
    readiness === "low"
      ? lang === "ku"
        ? "ئەمڕۆ ٥–١٠ خولەک کێشان یان ڕۆیشتن لە شوێنی خۆت هەوڵ بدە."
        : "Try 5–10 minutes of stretching or walking in place today."
      : readiness === "high"
        ? lang === "ku"
          ? "وزەت بەرزە — پلانی ئەمڕۆت بە تەواوی بکە!"
          : "Your energy is high — go for your full plan today!"
        : lang === "ku"
          ? "پلانی ئەمڕۆت دەستپێبکە — گەرمکردنەوە لەگەڵ ٣ وەرزش سەرەکی."
          : "Start your plan — warm-up plus 3 main exercises is a great win.";

  return (
    <section className="ft-coach glass" id="fitness-coach">
      <div className="ft-coach__icon" aria-hidden="true">🌿</div>
      <div className="ft-coach__body">
        <h2 className="ft-panel__title">{t("coachTitle")}</h2>
        <p className="ft-panel__desc">{t("coachSub")}</p>
        <p className="ft-coach__msg">{msg}</p>

        <button type="button" className="ft-btn ft-btn--soft" onClick={onRecommend}>
          {t("coachAsk")}
        </button>
        <p className="ft-coach__rec">{recommend}</p>

        <div className="ft-coach-tips">
          <div>
            <strong>{t("coachWorkoutTips")}</strong>
            <p>{lang === "ku" ? workoutTip.ku : workoutTip.en}</p>
          </div>
          <div>
            <strong>{t("coachRecovery")}</strong>
            <p>{lang === "ku" ? recoveryTip.ku : recoveryTip.en}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
