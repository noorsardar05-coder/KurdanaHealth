import BeautyHero from "./BeautyHero.jsx";
import BeautyRecommendations from "./BeautyRecommendations.jsx";
import BeautyProductCard from "./BeautyProductCard.jsx";

export default function BeautyHome({
  t,
  userName,
  profile,
  inspo,
  analysis,
  routineProgress,
  recommendations,
  featuredLibrary,
  journalEntries,
  onContinueRoutine,
  onOpenLibrary,
  onProductClick,
}) {
  const weekBars = (journalEntries ?? []).slice(0, 7).map((e) => e.hydration ?? 0);
  const maxBar = Math.max(...weekBars, 1);
  const pct = routineProgress?.pct ?? 0;
  const streak = routineProgress?.streak ?? 0;

  const snapshot = analysis
    ? [
        { label: t("hydration"), val: `${analysis.hydration ?? "—"}%` },
        { label: t("oiliness"), val: `${analysis.oiliness ?? "—"}%` },
        { label: t("glow"), val: `${analysis.glow ?? "—"}%` },
      ]
    : [
        { label: t("yourSkin"), val: profile?.skinType || "—" },
        { label: t("focus"), val: profile?.concern || "—" },
        { label: t("feeling"), val: profile?.goal || "—" },
      ];

  return (
    <section className="bt-dash bt-section" id="beauty-home">
      <BeautyHero
        t={t}
        userName={userName}
        inspo={inspo}
        onContinueRoutine={onContinueRoutine}
        routineProgress={routineProgress}
      />

      <div className="bt-home-grid">
        <article className="bt-card bt-card--lux">
          <p className="bt-section-label">{t("todaysRoutine")}</p>
          <div className="bt-progress-ring-wrap">
            <div className="bt-progress-track">
              <div className="bt-progress-fill" style={{ width: `${pct}%` }} />
            </div>
            <p className="bt-progress-meta">
              <strong>{pct}%</strong> {t("morningDone")}
            </p>
            <p className="bt-progress-streak">
              ✦ {streak} {t("streakDays")}
            </p>
          </div>
          <button type="button" className="bt-hero-cta bt-hero-cta--block" onClick={onContinueRoutine}>
            {t("continueRoutine")}
          </button>
        </article>

        <article className="bt-card bt-card--lux">
          <p className="bt-section-label">{t("skinSummary")}</p>
          <div className="bt-snapshot">
            {snapshot.map((s) => (
              <div key={s.label} className="bt-snapshot__item">
                <span className="bt-snapshot__val">{s.val}</span>
                <span className="bt-snapshot__label">{s.label}</span>
              </div>
            ))}
          </div>
        </article>
      </div>

      {featuredLibrary?.length > 0 && (
        <article className="bt-card bt-card--lux bt-library-spotlight">
          <div className="bt-library-spotlight__head">
            <div>
              <p className="bt-section-label">{t("libraryEyebrow")}</p>
              <p className="bt-sponsor-note">{t("libraryHomeNote")}</p>
            </div>
            <button type="button" className="bt-ghost-btn" onClick={onOpenLibrary}>
              {t("browseLibrary")}
            </button>
          </div>
          <div className="bt-product-scroll">
            {featuredLibrary.map((p) => (
              <BeautyProductCard
                key={p.id}
                product={p}
                t={t}
                onClick={() => onProductClick(p)}
                compact
              />
            ))}
          </div>
        </article>
      )}

      <BeautyRecommendations
        t={t}
        title={t("recommended")}
        products={recommendations}
        onProductClick={onProductClick}
      />

      <article className="bt-card bt-card--lux">
        <p className="bt-section-label">{t("weeklyProgress")}</p>
        <div className="bt-chart-bars" role="img" aria-label={t("weeklyProgress")}>
          {weekBars.length ? (
            weekBars.map((v, i) => (
              <div
                key={i}
                className="bt-chart-bar"
                style={{ height: `${Math.max(10, (v / maxBar) * 100)}%` }}
                title={`${v}`}
              />
            ))
          ) : (
            <p className="bt-empty">{t("emptyJournal")}</p>
          )}
        </div>
      </article>

      {inspo && (
        <article className="bt-card bt-card--lux bt-inspo-card">
          <p className="bt-section-label">{t("dailyInspo")}</p>
          <p className="bt-inspo">{inspo}</p>
        </article>
      )}
    </section>
  );
}
