import { useMemo, useState } from "react";
import { t, L, isPending } from "../i18n/index.js";
import BodyArt from "./BodyArt.jsx";
import { updateDiseaseProgress, getDiseaseProgress } from "../utils/storage.js";

function Text({ field, lang, tx }) {
  if (isPending(field, lang) || L(field, lang) == null) {
    return <p className="noor-body">{tx("contentPending")}</p>;
  }
  return <p className="noor-body">{L(field, lang)}</p>;
}

function ListBlock({ items, lang, tx }) {
  const rows = (items || []).map((item) => L(item, lang)).filter(Boolean);
  if (!rows.length) return <p className="noor-body">{tx("contentPending")}</p>;
  return (
    <ul className="noor-list">
      {rows.map((row, i) => (
        <li key={i}>{row}</li>
      ))}
    </ul>
  );
}

export default function WeeklyDiseaseExperience({
  lang,
  disease,
  state,
  setState,
  onQuiz,
  onBack,
}) {
  const tx = (k, vars) => t(k, lang, vars);
  const progress = getDiseaseProgress(state, disease.id);
  const [section, setSection] = useState(progress.sectionIndex || 0);
  const [openSymptom, setOpenSymptom] = useState(null);
  const [openMyth, setOpenMyth] = useState(null);

  const flowLabels = [tx("normalProcess"), tx("changeBegins"), tx("symptomsAppear")];

  const sections = useMemo(() => {
    const list = [
      { id: "intro", title: tx("whatIsIt") },
      { id: "body", title: tx("bodyConnection") },
      { id: "flow", title: tx("whatHappens") },
      { id: "symptoms", title: tx("commonSymptoms") },
      { id: "causes", title: tx("causesTitle") },
      { id: "diagnosis", title: tx("diagnosisTitle") },
      { id: "treatment", title: tx("treatmentTitle") },
    ];
    if (disease.prevention?.length) {
      list.push({ id: "prevention", title: tx("preventionTitle") });
    }
    list.push(
      { id: "myths", title: tx("mythVsFact") },
      { id: "facts", title: tx("didYouKnow") },
      { id: "help", title: tx("seekHelpTitle") },
      { id: "sources", title: tx("sources") }
    );
    return list;
  }, [disease, lang]);

  const total = sections.length;
  const current = sections[Math.min(section, total - 1)];

  function persist(index, completed = false) {
    setState(
      updateDiseaseProgress(state, disease.id, {
        sectionIndex: index,
        completed: completed || progress.completed,
      })
    );
  }

  function goNext() {
    if (section >= total - 1) {
      persist(total - 1, true);
      return;
    }
    const next = section + 1;
    setSection(next);
    persist(next);
  }

  function goPrev() {
    if (section <= 0) {
      onBack?.();
      return;
    }
    const prev = section - 1;
    setSection(prev);
    persist(prev);
  }

  function renderBody() {
    switch (current.id) {
      case "intro":
        return <Text field={disease.introduction} lang={lang} tx={tx} />;
      case "body":
        return (
          <>
            <p className="noor-body">{tx(`bodySystems.${disease.bodySystem}`)}</p>
            <BodyArt kind={disease.heroIllustration} className="noor-body-svg" />
          </>
        );
      case "flow":
        return (
          <div className="noor-flow">
            {(disease.flow || []).map((step, i) => (
              <div key={i} className="noor-flow__item">
                <div className="noor-flow__num">{i + 1}</div>
                <div>
                  <p className="noor-flow__label">{flowLabels[i] || ""}</p>
                  <p className="noor-body" style={{ margin: 0 }}>
                    {L(step, lang) || tx("contentPending")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        );
      case "symptoms":
        return (
          <>
            <div className="noor-symptom-grid">
              {(disease.symptoms || []).map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={`noor-symptom ${openSymptom === s.id ? "is-open" : ""}`}
                  onClick={() => setOpenSymptom(openSymptom === s.id ? null : s.id)}
                >
                  <strong>{L(s.title, lang)}</strong>
                  {openSymptom === s.id && (
                    <p>{L(s.detail, lang) || tx("contentPending")}</p>
                  )}
                </button>
              ))}
            </div>
            <p className="noor-safety" style={{ marginTop: 14 }}>
              {tx("symptomDisclaimer")}
            </p>
          </>
        );
      case "causes":
        return (
          <div className="noor-split">
            <div className="noor-card">
              <h3 className="noor-h2" style={{ fontSize: "1.05rem" }}>
                {tx("causes")}
              </h3>
              <ListBlock items={disease.causes} lang={lang} tx={tx} />
            </div>
            <div className="noor-card">
              <h3 className="noor-h2" style={{ fontSize: "1.05rem" }}>
                {tx("riskFactors")}
              </h3>
              <ListBlock items={disease.riskFactors} lang={lang} tx={tx} />
              <p className="noor-safety" style={{ marginTop: 12 }}>
                {tx("riskDisclaimer")}
              </p>
            </div>
          </div>
        );
      case "diagnosis":
        return <ListBlock items={disease.diagnosis} lang={lang} tx={tx} />;
      case "treatment":
        return (
          <>
            <ListBlock items={disease.treatment} lang={lang} tx={tx} />
            <p className="noor-safety" style={{ marginTop: 14 }}>
              {tx("treatmentNote")}
            </p>
          </>
        );
      case "prevention":
        return <ListBlock items={disease.prevention} lang={lang} tx={tx} />;
      case "myths":
        return (
          <div className="noor-facts">
            {(disease.myths || []).map((m, i) => {
              const open = openMyth === i;
              return (
                <button
                  key={i}
                  type="button"
                  className="noor-myth"
                  onClick={() => setOpenMyth(open ? null : i)}
                >
                  <div className="noor-myth__panel">
                    <span className="noor-myth__tag noor-myth__tag--myth">{tx("myth")}</span>
                    <p className="noor-body" style={{ margin: 0 }}>
                      {L(m.myth, lang) || tx("contentPending")}
                    </p>
                    {!open && (
                      <p className="noor-body" style={{ marginTop: 8, fontSize: "0.82rem" }}>
                        {tx("tapReveal")}
                      </p>
                    )}
                  </div>
                  {open && (
                    <div className="noor-myth__panel noor-myth__fact">
                      <span className="noor-myth__tag noor-myth__tag--fact">{tx("fact")}</span>
                      <p className="noor-body" style={{ margin: 0 }}>
                        {L(m.fact, lang) || tx("contentPending")}
                      </p>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        );
      case "facts":
        return (
          <div className="noor-facts">
            {(disease.funFacts || []).map((f, i) => (
              <div key={i} className="noor-fact">
                {L(f, lang) || tx("contentPending")}
              </div>
            ))}
          </div>
        );
      case "help":
        return (
          <>
            <ListBlock items={disease.seekHelp} lang={lang} tx={tx} />
            <p className="noor-safety" style={{ marginTop: 14 }}>
              {tx("educationalNote")}
            </p>
          </>
        );
      case "sources":
        return <ListBlock items={disease.sources} lang={lang} tx={tx} />;
      default:
        return null;
    }
  }

  const done = section >= total - 1 && (progress.completed || section === total - 1);

  return (
    <div>
      <div className="noor-lesson__head">
        <div>
          <p className="noor-lesson__step">{tx("sectionOf", { n: section + 1, t: total })}</p>
          <h1 className="noor-lesson__title">{L(disease.title, lang)}</h1>
        </div>
        <button type="button" className="noor-btn noor-btn--ghost" onClick={onBack}>
          {tx("back")}
        </button>
      </div>

      <div className="noor-progress" aria-hidden="true" style={{ marginBottom: 18 }}>
        <div
          className="noor-progress__bar"
          style={{ width: `${Math.round(((section + 1) / total) * 100)}%` }}
        />
      </div>

      <section className="noor-card" style={{ marginBottom: 16 }}>
        <h2 className="noor-h2">{current.title}</h2>
        {renderBody()}
      </section>

      <div className="noor-cta-row">
        <button type="button" className="noor-btn noor-btn--secondary" onClick={goPrev}>
          {section === 0 ? tx("back") : tx("prev")}
        </button>
        {section < total - 1 ? (
          <button type="button" className="noor-btn noor-btn--primary" onClick={goNext}>
            {tx("next")}
          </button>
        ) : (
          <button
            type="button"
            className="noor-btn noor-btn--teal"
            onClick={() => {
              persist(total - 1, true);
              onQuiz?.();
            }}
          >
            {tx("takeQuiz")}
          </button>
        )}
      </div>

      {done && (
        <p className="noor-safety" style={{ marginTop: 14 }}>
          {tx("lessonComplete")}
        </p>
      )}
    </div>
  );
}
