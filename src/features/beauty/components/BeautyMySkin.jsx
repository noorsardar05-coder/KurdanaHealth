import { useMemo, useState } from "react";
import {
  saveBeautyAnalysis,
  saveBeautyCameraAnalysis,
} from "../utils/storage.js";
import BeautyCameraCheckModal from "./BeautyCameraCheckModal.jsx";
import { matchProductsForObservations } from "../utils/cameraProductMatch.js";

function deriveInsights(profile) {
  const skin = profile?.skinType || "normal";
  const concern = profile?.concern || "hydration";
  const map = {
    dry: { hydration: 72, oiliness: 28, glow: 65, redness: 35, evenness: 70 },
    oily: { hydration: 55, oiliness: 78, glow: 58, redness: 42, evenness: 62 },
    combination: { hydration: 62, oiliness: 55, glow: 68, redness: 38, evenness: 66 },
    sensitive: { hydration: 58, oiliness: 40, glow: 60, redness: 62, evenness: 58 },
    normal: { hydration: 75, oiliness: 45, glow: 78, redness: 30, evenness: 80 },
  };
  const base = { ...(map[skin] || map.normal) };
  if (concern === "acne") base.oiliness = Math.min(90, base.oiliness + 10);
  if (concern === "redness") base.redness = Math.min(85, base.redness + 15);
  return {
    source: "quiz",
    ...base,
    concern,
    skin,
    generatedAt: new Date().toISOString(),
  };
}

function buildFriendlyResults(t, analysis, profile) {
  const skin = analysis?.skin || profile?.skinType || "normal";
  const concern = analysis?.concern || profile?.concern || "hydration";

  const detectedMap = {
    dry: t("detectDry"),
    oily: t("detectOily"),
    combination: t("detectCombo"),
    sensitive: t("detectSensitive"),
    normal: t("detectNormal"),
  };
  const helpMap = {
    hydration: t("helpHydration"),
    acne: t("helpClarity"),
    dullness: t("helpRadiance"),
    redness: t("helpCalm"),
    aging: t("helpFirm"),
  };
  const avoidMap = {
    dry: t("avoidDry"),
    oily: t("avoidOily"),
    combination: t("avoidCombo"),
    sensitive: t("avoidSensitive"),
    normal: t("avoidNormal"),
  };

  return {
    detected: detectedMap[skin] || detectedMap.normal,
    mayHelp: helpMap[concern] || helpMap.hydration,
    avoid: avoidMap[skin] || avoidMap.normal,
  };
}

function observationTitle(kind, t) {
  const map = {
    shine: t("camObsShine"),
    dryness: t("camObsDryness"),
    redness: t("camObsRedness"),
    underEye: t("camObsUnderEye"),
    texture: t("camObsTexture"),
    tone: t("camObsTone"),
    lightBalance: t("camObsLight"),
  };
  return map[kind] || kind;
}

function observationCopy(obs, t) {
  const { kind, level } = obs;
  if (kind === "shine") {
    if (level === "low") return t("camShineLow");
    if (level === "moderate") return t("camShineMod");
    if (level === "high") return t("camShineHigh");
  }
  if (kind === "dryness") {
    if (level === "unable") return t("camUnableAssess");
    if (level === "notVisible") return t("camDryNone");
    if (level === "slight") return t("camDrySlight");
    if (level === "moderate") return t("camDryMod");
  }
  if (kind === "redness") {
    if (level === "notVisible") return t("camRedNone");
    if (level === "slight") return t("camRedSlight");
    if (level === "moderate" || level === "clear") return t("camRedMod");
  }
  if (kind === "underEye") {
    if (level === "notVisible") return t("camEyeNone");
    if (level === "slight") return t("camEyeSlight");
    if (level === "moderate") return t("camEyeMod");
  }
  if (kind === "texture") {
    if (level === "smooth") return t("camTexSmooth");
    if (level === "some") return t("camTexSome");
    if (level === "more") return t("camTexMore");
  }
  if (kind === "tone") {
    if (level === "notVisible") return t("camToneNone");
    if (level === "slight") return t("camToneSlight");
    if (level === "moderate") return t("camToneMod");
  }
  if (kind === "lightBalance") {
    if (level === "balanced") return t("camLightBalanced");
    return t("camLightUneven");
  }
  return t("camUnableAssess");
}

function confidenceLabel(c, t) {
  if (c === "high") return t("camConfHigh");
  if (c === "moderate") return t("camConfMod");
  return t("camConfLow");
}

export default function BeautyMySkin({
  t,
  lang = "en",
  profile,
  analysis,
  cameraAnalysis,
  onAnalysisUpdate,
  onCameraAnalysisUpdate,
  recommendations,
  onProductClick,
  onOpenLibrary,
}) {
  const [cameraOpen, setCameraOpen] = useState(false);
  const [running, setRunning] = useState(false);

  const hasCamera =
    cameraAnalysis?.source === "camera" && Array.isArray(cameraAnalysis?.observations);
  const hasQuiz = analysis?.source === "quiz" || (analysis && analysis.hydration != null && analysis.source !== "camera");

  const friendly = useMemo(
    () => (hasQuiz ? buildFriendlyResults(t, analysis, profile) : null),
    [analysis, profile, t, hasQuiz],
  );

  const cameraProducts = useMemo(() => {
    if (!hasCamera) return [];
    if (Array.isArray(cameraAnalysis.matchedProducts) && cameraAnalysis.matchedProducts.length) {
      return cameraAnalysis.matchedProducts;
    }
    return matchProductsForObservations(
      cameraAnalysis.observations,
      cameraAnalysis.routineFocus || [],
      lang,
      4,
      t,
    );
  }, [cameraAnalysis, hasCamera, lang, t]);

  const combinedProducts = useMemo(() => {
    const seen = new Set();
    const list = [];
    for (const p of cameraProducts) {
      if (!p?.id || seen.has(p.id)) continue;
      seen.add(p.id);
      list.push({ ...p, insightSource: "camera" });
    }
    for (const p of recommendations || []) {
      if (!p?.id || seen.has(p.id)) continue;
      seen.add(p.id);
      list.push({
        ...p,
        insightSource: "quiz",
        whySuit: p.whySuit || t("camWhyQuiz"),
      });
    }
    return list.slice(0, 6);
  }, [cameraProducts, recommendations, t]);

  const runQuizInsights = async () => {
    setRunning(true);
    await new Promise((r) => setTimeout(r, 600));
    const insights = deriveInsights(profile);
    saveBeautyAnalysis(insights);
    onAnalysisUpdate(insights);
    setRunning(false);
  };

  const handleCameraComplete = (payload) => {
    if (payload?.skippedCamera || payload?.continueQuiz) {
      runQuizInsights();
      return;
    }
    if (payload?.deleteAnalysis) {
      saveBeautyCameraAnalysis(null);
      onCameraAnalysisUpdate?.(null);
      return;
    }
    if (payload?.useResults && payload?.source === "camera") {
      const safe = {
        source: "camera",
        confidence: payload.confidence,
        quality: payload.quality,
        observations: payload.observations,
        routineFocus: payload.routineFocus,
        productIds: payload.productIds,
        matchedProducts: (payload.matchedProducts || []).map((p) => ({
          id: p.id,
          brand: p.brand,
          name: p.name,
          image: p.image,
          whySuit: p.whySuit,
        })),
        generatedAt: payload.generatedAt || new Date().toISOString(),
      };
      saveBeautyCameraAnalysis(safe);
      onCameraAnalysisUpdate?.(safe);
    }
  };

  const deleteCameraResults = () => {
    saveBeautyCameraAnalysis(null);
    onCameraAnalysisUpdate?.(null);
  };

  const quizCards = hasQuiz
    ? [
        { label: t("hydration"), score: analysis.hydration },
        { label: t("oiliness"), score: analysis.oiliness },
        { label: t("glow"), score: analysis.glow },
        { label: t("sensitivity"), score: analysis.redness },
        { label: t("evenTone"), score: analysis.evenness },
      ]
    : [];

  return (
    <section id="beauty-skin" className="bt-section">
      <h2 className="bt-section-title">{t("aiTitle")}</h2>
      <p className="bt-section-sub">{t("aiSub")}</p>

      <div className="bt-card bt-card--lux">
        <p className="bt-soft-copy">{t("aiPrivacy")}</p>
        <div className="bt-btn-row">
          <button
            type="button"
            className="bt-hero-cta"
            disabled={running}
            onClick={() => setCameraOpen(true)}
          >
            {t("aiAllowCamera")}
          </button>
          <button type="button" className="bt-ghost-btn" disabled={running} onClick={runQuizInsights}>
            {running ? t("loading") : t("aiSkipCamera")}
          </button>
        </div>
        <p className="bt-hint">{t("cameraHint")}</p>
      </div>

      {hasCamera && (
        <div className="bt-cam-saved-results">
          <p className="bt-section-label">{t("camSourceCamera")}</p>
          <h3 className="bt-subsection-title">{t("camResultTitle")}</h3>
          <p className="bt-soft-copy">{t("camResultSub")}</p>
          <p className="bt-cam-privacy-badges">
            <span>{t("camPhotoLocal")}</span>
            <span>{t("camPhotoNotSaved")}</span>
          </p>
          <p className="bt-cam-conf">
            {t("camOverallConfidence")}: {confidenceLabel(cameraAnalysis.confidence, t)}
          </p>
          <div className="bt-cam-obs-grid">
            {(cameraAnalysis.observations || []).map((obs) => (
              <article key={obs.id} className="bt-cam-obs-card">
                <p className="bt-section-label">{observationTitle(obs.kind, t)}</p>
                <p className="bt-soft-copy">{observationCopy(obs, t)}</p>
                <p className="bt-cam-obs-conf">
                  {t("camConfidence")}: {confidenceLabel(obs.confidence, t)}
                </p>
              </article>
            ))}
          </div>
          <p className="bt-disclaimer-inline">{t("eduOnly")}</p>
          <div className="bt-btn-row">
            <button type="button" className="bt-hero-cta" onClick={() => setCameraOpen(true)}>
              {t("camRetake")}
            </button>
            <button type="button" className="bt-ghost-btn" onClick={deleteCameraResults}>
              {t("camDelete")}
            </button>
          </div>
        </div>
      )}

      {friendly && (
        <>
          <p className="bt-section-label">{t("camSourceQuiz")}</p>
          <div className="bt-insight-grid">
            <article className="bt-card bt-card--lux bt-insight">
              <p className="bt-section-label">{t("whatDetected")}</p>
              <p className="bt-insight__text">{friendly.detected}</p>
            </article>
            <article className="bt-card bt-card--lux bt-insight">
              <p className="bt-section-label">{t("whatMayHelp")}</p>
              <p className="bt-insight__text">{friendly.mayHelp}</p>
            </article>
            <article className="bt-card bt-card--lux bt-insight">
              <p className="bt-section-label">{t("thingsToAvoid")}</p>
              <p className="bt-insight__text">{friendly.avoid}</p>
            </article>
          </div>
        </>
      )}

      {quizCards.length > 0 && (
        <div className="bt-card bt-card--lux">
          <p className="bt-section-label">{t("skinSnapshot")}</p>
          <p className="bt-hint">{t("camQuizSnapshotNote")}</p>
          <div className="bt-ai-cards">
            {quizCards.map((c) => (
              <div key={c.label} className="bt-ai-card">
                <span className="bt-ai-card__label">{c.label}</span>
                <span className="bt-ai-card__score">{c.score}%</span>
                <div className="bt-ai-meter">
                  <span style={{ width: `${c.score}%` }} />
                </div>
              </div>
            ))}
          </div>
          <p className="bt-disclaimer-inline">{t("eduOnly")}</p>
        </div>
      )}

      {(hasCamera || hasQuiz) && combinedProducts.length > 0 && (
        <div className="bt-card bt-card--lux">
          <p className="bt-section-label">{t("camCombinedTitle")}</p>
          <p className="bt-soft-copy">{t("camCombinedSub")}</p>
          <div className="bt-product-scroll">
            {combinedProducts.map((p) => (
              <button
                key={`${p.insightSource}-${p.id}`}
                type="button"
                className="bt-product-card"
                onClick={() => onProductClick(p)}
                style={{ width: 168 }}
              >
                <img src={p.image} alt="" className="bt-product-card__img" />
                <div className="bt-product-card__body">
                  <p className="bt-cam-source-chip">
                    {p.insightSource === "camera" ? t("camSourceCamera") : t("camSourceQuiz")}
                  </p>
                  <p className="bt-product-card__brand">{p.brand}</p>
                  <p className="bt-product-card__name">{p.name}</p>
                  {p.whySuit && <p className="bt-cam-why">{p.whySuit}</p>}
                </div>
              </button>
            ))}
          </div>
          <button
            type="button"
            className="bt-ghost-btn"
            onClick={() => {
              onProductClick?.(combinedProducts[0]);
              onOpenLibrary?.();
            }}
          >
            {t("camExploreProducts")}
          </button>
          <p className="bt-disclaimer-inline">{t("camProductDisclaimer")}</p>
        </div>
      )}

      {!hasCamera && !hasQuiz && recommendations?.length > 0 && (
        <div className="bt-card bt-card--lux">
          <p className="bt-section-label">{t("suggestedProducts")}</p>
          <div className="bt-product-scroll">
            {recommendations.slice(0, 4).map((p) => (
              <button
                key={p.id}
                type="button"
                className="bt-product-card"
                onClick={() => onProductClick(p)}
                style={{ width: 150 }}
              >
                <img src={p.image} alt="" className="bt-product-card__img" />
                <div className="bt-product-card__body">
                  <p className="bt-product-card__brand">{p.brand}</p>
                  <p className="bt-product-card__name">{p.name}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <BeautyCameraCheckModal
        open={cameraOpen}
        t={t}
        lang={lang}
        onClose={() => setCameraOpen(false)}
        onComplete={(payload) => {
          handleCameraComplete(payload);
          // Keep modal open after successful analysis so the user can read results.
          if (payload?.skippedCamera || payload?.continueQuiz || payload?.deleteAnalysis) {
            setCameraOpen(false);
          }
        }}
        onExploreProducts={(p) => {
          setCameraOpen(false);
          onProductClick?.(p);
          onOpenLibrary?.();
        }}
      />
    </section>
  );
}
