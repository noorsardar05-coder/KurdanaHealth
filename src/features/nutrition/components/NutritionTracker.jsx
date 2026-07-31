export default function NutritionTracker({ t, tracker, targets, onUpdateTracker }) {
  const setEnergy = (energy) => onUpdateTracker({ ...tracker, energy });

  return (
    <section id="nutrition-tracker" className="nu-section">
      <p className="nu-section-label">{t("navTracker")}</p>
      <h2 className="nu-section-title">{t("trackerTitle")}</h2>
      <p className="nu-section-sub">{t("trackerSub")}</p>

      <div className="nu-stat-grid">
        <div className="nu-stat">
          <p className="nu-stat__label">{t("waterProgress")}</p>
          <p className="nu-stat__value">
            {tracker.waterMl || 0} / {targets?.waterMl || "—"} {t("ml")}
          </p>
          <div className="nu-actions" style={{ marginTop: "0.65rem" }}>
            <button
              type="button"
              className="nu-btn nu-btn--soft"
              onClick={() => onUpdateTracker({ ...tracker, waterMl: (tracker.waterMl || 0) + 250 })}
            >
              +250 {t("ml")}
            </button>
          </div>
        </div>
        <div className="nu-stat">
          <p className="nu-stat__label">{t("proteinProgress")}</p>
          <p className="nu-stat__value">
            {tracker.proteinG || 0} / {targets?.proteinG || "—"} {t("grams")}
          </p>
          <div className="nu-actions" style={{ marginTop: "0.65rem" }}>
            <button
              type="button"
              className="nu-btn nu-btn--soft"
              onClick={() => onUpdateTracker({ ...tracker, proteinG: (tracker.proteinG || 0) + 10 })}
            >
              {t("logProtein")} +10
            </button>
          </div>
        </div>
        <div className="nu-stat">
          <p className="nu-stat__label">{t("fiberProgress")}</p>
          <p className="nu-stat__value">
            {tracker.fiberG || 0} / {targets?.fiberG || "—"} {t("grams")}
          </p>
          <div className="nu-actions" style={{ marginTop: "0.65rem" }}>
            <button
              type="button"
              className="nu-btn nu-btn--soft"
              onClick={() => onUpdateTracker({ ...tracker, fiberG: (tracker.fiberG || 0) + 5 })}
            >
              {t("logFiber")} +5
            </button>
          </div>
        </div>
      </div>

      <h3 className="nu-subsection-title" style={{ marginTop: "1.25rem" }}>
        {t("energyHow")}
      </h3>
      <div className="nu-chip-row">
        {["low", "mixed", "steady"].map((e) => (
          <button
            key={e}
            type="button"
            className={`nu-chip ${tracker.energy === e ? "is-active" : ""}`}
            onClick={() => setEnergy(e)}
          >
            {t(e === "low" ? "energyLow" : e === "mixed" ? "energyMixed" : "energySteady")}
          </button>
        ))}
      </div>
      <p className="nu-hint">{t("educationalOnly")}</p>
    </section>
  );
}
