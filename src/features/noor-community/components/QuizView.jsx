import { useState } from "react";
import { Award } from "lucide-react";
import { t, L } from "../i18n/index.js";
import { getDiseaseProgress, updateDiseaseProgress } from "../utils/storage.js";

export default function QuizView({ lang, disease, state, setState, onBack, onHome }) {
  const tx = (k, vars) => t(k, lang, vars);
  const questions = disease.quiz || [];
  const progress = getDiseaseProgress(state, disease.id);

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [finalScore, setFinalScore] = useState(null);

  if (!progress.completed && !progress.badge) {
    return (
      <div className="noor-card">
        <p className="noor-body">{tx("noQuizYet")}</p>
        <button type="button" className="noor-btn noor-btn--primary" style={{ marginTop: 14 }} onClick={onBack}>
          {tx("startLesson")}
        </button>
      </div>
    );
  }

  if (!questions.length) {
    return <p className="noor-empty">{tx("errorLoad")}</p>;
  }

  const q = questions[index];
  const passThreshold = Math.ceil(questions.length * 0.66);

  function choose(i) {
    if (revealed) return;
    setSelected(i);
    setRevealed(true);
    if (i === q.correct) setScore((s) => s + 1);
  }

  function next() {
    const answeredScore = score;
    if (index >= questions.length - 1) {
      const badge = answeredScore >= passThreshold;
      setState(
        updateDiseaseProgress(state, disease.id, {
          quizScore: answeredScore,
          quizTotal: questions.length,
          badge,
          completed: true,
        })
      );
      setFinalScore(answeredScore);
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setRevealed(false);
  }

  function restart() {
    setIndex(0);
    setSelected(null);
    setRevealed(false);
    setScore(0);
    setFinished(false);
    setFinalScore(null);
  }

  if (finished) {
    const shownScore = finalScore ?? 0;
    const badgeOn = shownScore >= passThreshold;
    return (
      <div>
        <div className="noor-card" style={{ marginBottom: 14 }}>
          <h2 className="noor-h2">{tx("weeklyQuiz")}</h2>
          <p className="noor-body">{tx("quizScore", { n: shownScore, t: questions.length })}</p>
          {badgeOn ? (
            <div className="noor-badge" style={{ marginTop: 16 }}>
              <div className="noor-badge__icon">
                <Award size={22} />
              </div>
              <div>
                <strong>{tx("badgeEarned")}</strong>
                <p className="noor-body" style={{ margin: "4px 0 0" }}>
                  {L(disease.badge, lang) || disease.badge?.en}
                </p>
                <p className="noor-body" style={{ margin: "6px 0 0", fontSize: "0.88rem" }}>
                  {tx("quizPass")}
                </p>
              </div>
            </div>
          ) : (
            <p className="noor-safety" style={{ marginTop: 14 }}>
              {tx("quizRetryHint")}
            </p>
          )}
        </div>
        <div className="noor-cta-row">
          <button type="button" className="noor-btn noor-btn--secondary" onClick={restart}>
            {tx("retakeQuiz")}
          </button>
          <button type="button" className="noor-btn noor-btn--primary" onClick={onHome}>
            {tx("home")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="noor-lesson__head">
        <div>
          <p className="noor-lesson__step">{tx("sectionOf", { n: index + 1, t: questions.length })}</p>
          <h1 className="noor-lesson__title">{tx("weeklyQuiz")}</h1>
        </div>
        <button type="button" className="noor-btn noor-btn--ghost" onClick={onBack}>
          {tx("back")}
        </button>
      </div>

      <div className="noor-card">
        <p className="noor-quiz__q">{L(q.q, lang)}</p>
        <div className="noor-quiz__opts">
          {(q.options || []).map((opt, i) => {
            let cls = "noor-quiz__opt";
            if (revealed && i === q.correct) cls += " is-correct";
            else if (revealed && selected === i && i !== q.correct) cls += " is-wrong";
            else if (selected === i) cls += " is-on";
            return (
              <button key={i} type="button" className={cls} onClick={() => choose(i)}>
                {L(opt, lang)}
              </button>
            );
          })}
        </div>
        {revealed && <div className="noor-explain">{L(q.explain, lang)}</div>}
      </div>

      {revealed && (
        <div className="noor-cta-row" style={{ marginTop: 14 }}>
          <button type="button" className="noor-btn noor-btn--primary noor-btn--wide" onClick={next}>
            {index >= questions.length - 1 ? tx("continue") : tx("next")}
          </button>
        </div>
      )}
    </div>
  );
}
