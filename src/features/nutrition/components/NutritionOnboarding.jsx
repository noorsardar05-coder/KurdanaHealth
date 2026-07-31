import { ONBOARDING_STEPS } from "../i18n/nutritionStrings.js";

export default function NutritionOnboarding({
  t,
  step,
  answers,
  onSelect,
  onMultiToggle,
  onBodyChange,
  onNext,
  onBack,
  onSkip,
  onSaveLater,
  onFinish,
  completed,
}) {
  if (completed) {
    return (
      <div className="nu-onboard">
        <div className="nu-onboard__card">
          <p style={{ fontSize: "2rem", margin: "0 0 0.5rem" }}>🌿</p>
          <h1 className="nu-onboard__title">{t("onboardDone")}</h1>
          <p className="nu-soft" style={{ marginBottom: "1.25rem" }}>
            {t("onboardDoneSub")}
          </p>
          <button type="button" className="nu-btn nu-btn--primary" onClick={onFinish}>
            {t("enterStudio")}
          </button>
        </div>
      </div>
    );
  }

  if (step < 0) {
    return (
      <div className="nu-onboard">
        <div className="nu-onboard__card">
          <p className="nu-section-label">{t("brandBadge")}</p>
          <h1 className="nu-onboard__title">{t("onboardTitle")}</h1>
          <p className="nu-soft" style={{ marginBottom: "1.25rem" }}>
            {t("onboardSub")}
          </p>
          <div className="nu-actions" style={{ justifyContent: "center" }}>
            <button type="button" className="nu-btn nu-btn--primary" onClick={onNext}>
              {t("startOnboard")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const current = ONBOARDING_STEPS[step];
  if (!current) return null;
  const selected = answers[current.id];

  return (
    <div className="nu-onboard">
      <div className="nu-onboard__card" style={{ textAlign: "start" }}>
        <p className="nu-section-label">
          {step + 1} / {ONBOARDING_STEPS.length}
        </p>
        <h2 className="nu-onboard__title" style={{ fontSize: "1.35rem" }}>
          {t(current.questionKey)}
        </h2>

        {current.type === "optional-pair" && (
          <div style={{ marginTop: "1rem" }}>
            <label className="nu-field">
              <span>{t("qHeight")}</span>
              <input
                type="number"
                min="100"
                max="250"
                value={answers.heightCm || ""}
                onChange={(e) => onBodyChange("heightCm", e.target.value)}
              />
            </label>
            <label className="nu-field">
              <span>{t("qWeight")}</span>
              <input
                type="number"
                min="30"
                max="250"
                value={answers.weightKg || ""}
                onChange={(e) => onBodyChange("weightKg", e.target.value)}
              />
            </label>
          </div>
        )}

        {(current.type === "single" || current.type === "multi") && (
          <div style={{ margin: "1rem 0" }}>
            {current.options.map((opt) => {
              const active =
                current.type === "multi"
                  ? Array.isArray(selected) && selected.includes(opt.value)
                  : selected === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  className={`nu-quiz-option ${active ? "is-selected" : ""}`}
                  onClick={() =>
                    current.type === "multi"
                      ? onMultiToggle(current.id, opt.value)
                      : onSelect(current.id, opt.value)
                  }
                >
                  {t(opt.labelKey)}
                </button>
              );
            })}
          </div>
        )}

        <div className="nu-actions">
          {step > 0 && (
            <button type="button" className="nu-btn nu-btn--ghost" onClick={onBack}>
              {t("back")}
            </button>
          )}
          {(current.skippable || current.optional) && (
            <button type="button" className="nu-btn nu-btn--ghost" onClick={onSkip}>
              {t("skip")}
            </button>
          )}
          <button type="button" className="nu-btn nu-btn--soft" onClick={onSaveLater}>
            {t("saveContinue")}
          </button>
          <button
            type="button"
            className="nu-btn nu-btn--primary"
            onClick={onNext}
            disabled={
              current.type === "single" && !selected && !current.skippable && !current.optional
            }
          >
            {step >= ONBOARDING_STEPS.length - 1 ? t("finishOnboard") : t("next")}
          </button>
        </div>
      </div>
    </div>
  );
}
