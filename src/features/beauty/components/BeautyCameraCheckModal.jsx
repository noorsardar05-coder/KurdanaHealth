import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, Camera, Upload, Shield } from "lucide-react";
import { detectFacesInImage, preloadFaceLandmarker } from "../utils/faceLandmarker.js";
import { analyzeBeautyCapture } from "../utils/beautyObservations.js";
import { helpsForObservation, matchProductsForObservations } from "../utils/cameraProductMatch.js";

const STEPS = {
  welcome: "welcome",
  permission: "permission",
  guide: "guide",
  live: "live",
  analyzing: "analyzing",
  qualityFail: "qualityFail",
  results: "results",
};

function stopStream(stream) {
  if (!stream) return;
  stream.getTracks().forEach((t) => {
    try {
      t.stop();
    } catch {
      /* ignore */
    }
  });
}

function cameraErrorKey(err) {
  const name = err?.name || "";
  const msg = String(err?.message || "").toLowerCase();
  if (!window.isSecureContext && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
    return "camErrInsecure";
  }
  if (!navigator.mediaDevices?.getUserMedia) return "camErrUnsupported";
  if (name === "NotAllowedError" || name === "PermissionDeniedError") return "camErrDenied";
  if (name === "NotFoundError" || name === "DevicesNotFoundError") return "camErrNone";
  if (name === "NotReadableError" || name === "TrackStartError" || msg.includes("in use")) {
    return "camErrInUse";
  }
  return "camErrGeneric";
}

function qualityLabel(status, t) {
  if (status === "good") return t("camQualityGood");
  if (status === "tryAgain") return t("camQualityTryAgain");
  return t("camQualityNeeds");
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
  const { kind, level, meta } = obs;
  if (kind === "shine") {
    if (level === "low") return t("camShineLow");
    if (level === "moderate") return t("camShineMod");
    if (level === "high") return t("camShineHigh");
  }
  if (kind === "dryness") {
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
    if (meta?.side === "left") return t("camLightLeft");
    if (meta?.side === "right") return t("camLightRight");
    return t("camLightUneven");
  }
  return t("camUnableAssess");
}

function levelLabel(level, t) {
  const map = {
    low: t("camLevelLow"),
    moderate: t("camLevelMod"),
    high: t("camLevelHigh"),
    notVisible: t("camLevelNotVisible"),
    slight: t("camLevelSlight"),
    clear: t("camLevelClear"),
    smooth: t("camLevelSmooth"),
    some: t("camLevelSomeTex"),
    more: t("camLevelMoreTex"),
    balanced: t("camLevelBalanced"),
    uneven: t("camLevelUneven"),
    unable: t("camUnableAssess"),
  };
  return map[level] || level;
}

function confidenceLabel(c, t) {
  if (c === "high") return t("camConfHigh");
  if (c === "moderate") return t("camConfMod");
  return t("camConfLow");
}

function blockerMessage(key, t) {
  const map = {
    noFace: t("camBlockNoFace"),
    multiFace: t("camBlockMulti"),
    tooFar: t("camBlockFar"),
    tooClose: t("camBlockClose"),
    notCentered: t("camBlockCenter"),
    rotated: t("camBlockAngle"),
    tooDark: t("camBlockDark"),
    overexposed: t("camBlockBright"),
    blurry: t("camBlockBlur"),
    unevenLight: t("camBlockUneven"),
    landmarkerFailed: t("camErrAnalyze"),
  };
  return map[key] || t("camBlockGeneric");
}

export default function BeautyCameraCheckModal({
  t,
  lang = "en",
  open,
  onClose,
  onComplete,
  onExploreProducts,
}) {
  const [step, setStep] = useState(STEPS.live);
  const [errorKey, setErrorKey] = useState(null);
  const [stream, setStream] = useState(null);
  const [guideHints, setGuideHints] = useState([]);
  const [result, setResult] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [matchedProducts, setMatchedProducts] = useState([]);

  const videoRef = useRef(null);
  const fileRef = useRef(null);
  const streamRef = useRef(null);
  const liveDetectRef = useRef(0);

  const cleanupCamera = useCallback(() => {
    stopStream(streamRef.current);
    streamRef.current = null;
    setStream(null);
    if (videoRef.current) videoRef.current.srcObject = null;
  }, []);

  const cleanupTemps = useCallback(() => {
    setPreviewUrl((prev) => {
      if (prev && String(prev).startsWith("blob:")) {
        try {
          URL.revokeObjectURL(prev);
        } catch {
          /* ignore */
        }
      }
      return null;
    });
    setResult(null);
    setMatchedProducts([]);
  }, []);

  useEffect(() => {
    if (!open) {
      cleanupTemps();
      cleanupCamera();
      setStep(STEPS.live);
      setErrorKey(null);
      setGuideHints([]);
    }
  }, [open, cleanupCamera, cleanupTemps]);

  useEffect(
    () => () => {
      cleanupCamera();
      cleanupTemps();
    },
    [cleanupCamera, cleanupTemps],
  );

  const startCamera = useCallback(async () => {
    setErrorKey(null);
    if (!navigator.mediaDevices?.getUserMedia) {
      setErrorKey("camErrUnsupported");
      setStep(STEPS.permission);
      return;
    }
    if (
      !window.isSecureContext &&
      window.location.hostname !== "localhost" &&
      window.location.hostname !== "127.0.0.1"
    ) {
      setErrorKey("camErrInsecure");
      setStep(STEPS.permission);
      return;
    }
    try {
      setStep(STEPS.live);
      const media = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 1280 },
        },
        audio: false,
      });
      stopStream(streamRef.current);
      streamRef.current = media;
      setStream(media);
    } catch (err) {
      setErrorKey(cameraErrorKey(err));
      setStep(STEPS.permission);
    }
  }, []);

  // Open → start camera immediately (privacy banner stays on the live / permission screens)
  useEffect(() => {
    if (!open) return undefined;
    preloadFaceLandmarker();
    startCamera();
    return undefined;
  }, [open, startCamera]);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      videoRef.current.play?.().catch(() => {});
    }
  }, [stream, step]);

  // Soft live positioning hints (VIDEO-less: sample stills via detect on video frames occasionally)
  useEffect(() => {
    if (step !== STEPS.live || !stream) return undefined;
    let cancelled = false;
    const tick = async () => {
      const video = videoRef.current;
      if (!video || video.readyState < 2 || cancelled) return;
      try {
        const { canvas, ctx } = (() => {
          const c = document.createElement("canvas");
          c.width = Math.min(480, video.videoWidth || 480);
          c.height = Math.round((c.width * (video.videoHeight || 480)) / (video.videoWidth || 480));
          const x = c.getContext("2d");
          x.drawImage(video, 0, 0, c.width, c.height);
          return { canvas: c, ctx: x };
        })();
        void ctx;
        const det = await detectFacesInImage(canvas);
        if (cancelled) return;
        const hints = [];
        if (det.faceCount === 0) hints.push(t("camHintNoFace"));
        else if (det.faceCount > 1) hints.push(t("camHintMulti"));
        else if (det.primary) {
          const xs = det.primary.map((p) => p.x);
          const ys = det.primary.map((p) => p.y);
          const minX = Math.min(...xs);
          const maxX = Math.max(...xs);
          const minY = Math.min(...ys);
          const maxY = Math.max(...ys);
          const area = (maxX - minX) * (maxY - minY);
          const cx = (minX + maxX) / 2;
          if (area < 0.05) hints.push(t("camHintCloser"));
          if (area > 0.4) hints.push(t("camHintFarther"));
          if (Math.abs(cx - 0.5) > 0.12) hints.push(t("camHintCenter"));
        }
        setGuideHints(hints.slice(0, 2));
      } catch {
        /* model still loading */
      }
    };
    const id = setInterval(() => {
      liveDetectRef.current += 1;
      if (liveDetectRef.current % 1 === 0) tick();
    }, 900);
    tick();
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [step, stream, t]);

  const runAnalysisOnSource = async (source) => {
    setStep(STEPS.analyzing);
    setErrorKey(null);
    try {
      const analysis = await analyzeBeautyCapture(source, detectFacesInImage);
      const url = analysis.previewCanvas?.toDataURL?.("image/jpeg", 0.85) || null;
      // Drop canvas reference immediately — preview is a temporary data URL only in memory
      if (analysis.previewCanvas) {
        analysis.previewCanvas.width = 0;
        analysis.previewCanvas.height = 0;
        analysis.previewCanvas = null;
      }
      setPreviewUrl(url);

      if (!analysis.ok) {
        const withBlocker =
          analysis.error === "landmarkerFailed"
            ? {
                ...analysis,
                quality: {
                  checklist: null,
                  blockers: ["landmarkerFailed"],
                  pass: false,
                },
              }
            : analysis;
        setResult(withBlocker);
        setMatchedProducts([]);
        setStep(STEPS.qualityFail);
        cleanupCamera();
        return;
      }

      const products = matchProductsForObservations(
        analysis.observations,
        analysis.routineFocus,
        lang,
        4,
        t,
      );
      setMatchedProducts(products);
      setResult(analysis);
      setStep(STEPS.results);
      cleanupCamera();

      // Auto-save metadata (no photo) so results stick on My Skin immediately
      onComplete?.({
        source: "camera",
        useResults: true,
        confidence: analysis.confidence,
        quality: analysis.quality,
        observations: analysis.observations,
        routineFocus: analysis.routineFocus,
        productIds: products.map((p) => p.id),
        matchedProducts: products,
        generatedAt: new Date().toISOString(),
      });
    } catch (err) {
      console.warn(err);
      setResult({
        ok: false,
        error: "landmarkerFailed",
        quality: { checklist: null, blockers: ["landmarkerFailed"], pass: false },
        observations: [],
      });
      setMatchedProducts([]);
      setStep(STEPS.qualityFail);
      cleanupCamera();
    }
  };

  const buildCameraPayload = () => ({
    source: "camera",
    useResults: true,
    confidence: result.confidence,
    quality: result.quality,
    observations: result.observations,
    routineFocus: result.routineFocus,
    productIds: matchedProducts.map((p) => p.id),
    matchedProducts,
    generatedAt: new Date().toISOString(),
  });

  const handleUseResults = () => {
    if (!result?.ok) return;
    const payload = buildCameraPayload();
    cleanupTemps();
    cleanupCamera();
    onComplete?.(payload);
    onClose?.();
  };

  const handleContinueQuiz = () => {
    cleanupTemps();
    cleanupCamera();
    onComplete?.({ source: "quiz-skip", continueQuiz: true });
    onClose?.();
  };

  const handleDeletePhoto = () => {
    cleanupTemps();
    cleanupCamera();
    onComplete?.({ source: "camera-delete", deleteAnalysis: true });
    onClose?.();
  };

  const captureFrame = async () => {
    const video = videoRef.current;
    if (!video || video.readyState < 2) {
      setErrorKey("camErrGeneric");
      return;
    }
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 1280;
    const ctx = canvas.getContext("2d");
    // Capture unmirrored for analysis
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    await runAnalysisOnSource(canvas);
  };

  const onUpload = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const img = new Image();
    const url = URL.createObjectURL(file);
    try {
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = url;
      });
      cleanupCamera();
      await runAnalysisOnSource(img);
    } catch {
      setErrorKey("camErrUpload");
    } finally {
      URL.revokeObjectURL(url);
    }
  };

  const handleClose = () => {
    cleanupCamera();
    cleanupTemps();
    onClose?.();
  };

  const retake = () => {
    cleanupTemps();
    setErrorKey(null);
    startCamera();
  };

  if (!open) return null;

  const modal = (
    <div className="bt-cam-backdrop" role="dialog" aria-modal="true" aria-label={t("camTitle")}>
      <div className="bt-cam-modal">
        <button type="button" className="bt-modal__close" onClick={handleClose} aria-label={t("close")}>
          <X size={18} />
        </button>

        {step === STEPS.welcome && (
          <div className="bt-cam-panel">
            <p className="bt-section-label">{t("camEyebrow")}</p>
            <h2 className="bt-cam-title">{t("camWelcomeTitle")}</h2>
            <div className="bt-cam-privacy">
              <Shield size={18} />
              <p>{t("camPrivacy")}</p>
            </div>
            <p className="bt-cam-privacy-badges">
              <span>{t("camPhotoLocal")}</span>
              <span>{t("camPhotoNotSaved")}</span>
            </p>
            <p className="bt-soft-copy">{t("camWelcomeBody")}</p>
            <div className="bt-btn-row">
              <button type="button" className="bt-hero-cta" onClick={() => setStep(STEPS.guide)}>
                {t("camContinue")}
              </button>
              <button type="button" className="bt-ghost-btn" onClick={handleClose}>
                {t("camCancel")}
              </button>
            </div>
          </div>
        )}

        {step === STEPS.permission && (
          <div className="bt-cam-panel">
            <h2 className="bt-cam-title">{t("camPermissionTitle")}</h2>
            <p className="bt-soft-copy">{t("camPermissionBody")}</p>
            {errorKey && <p className="bt-cam-error">{t(errorKey)}</p>}
            <div className="bt-btn-row bt-btn-row--wrap">
              <button type="button" className="bt-hero-cta" onClick={startCamera}>
                <Camera size={16} /> {t("camUseCamera")}
              </button>
              <button type="button" className="bt-ghost-btn" onClick={() => fileRef.current?.click()}>
                <Upload size={16} /> {t("camUpload")}
              </button>
              <button
                type="button"
                className="bt-ghost-btn"
                onClick={() => {
                  handleClose();
                  onComplete?.({ source: "quiz-skip", skippedCamera: true });
                }}
              >
                {t("camWithout")}
              </button>
              <button type="button" className="bt-text-link" onClick={handleClose}>
                {t("camCancel")}
              </button>
            </div>
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={onUpload} />
          </div>
        )}

        {step === STEPS.guide && (
          <div className="bt-cam-panel">
            <h2 className="bt-cam-title">{t("camGuideTitle")}</h2>
            <ul className="bt-cam-guide-list">
              <li>{t("camGuide1")}</li>
              <li>{t("camGuide2")}</li>
              <li>{t("camGuide3")}</li>
              <li>{t("camGuide4")}</li>
            </ul>
            <div className="bt-btn-row">
              <button type="button" className="bt-hero-cta" onClick={() => setStep(STEPS.permission)}>
                {t("camContinue")}
              </button>
              <button type="button" className="bt-ghost-btn" onClick={() => setStep(STEPS.welcome)}>
                {t("camBack")}
              </button>
            </div>
          </div>
        )}

        {step === STEPS.live && (
          <div className="bt-cam-panel bt-cam-panel--live">
            <h2 className="bt-cam-title">{t("camLiveTitle")}</h2>
            <div className="bt-cam-privacy">
              <Shield size={18} />
              <p>{t("camPrivacy")}</p>
            </div>
            <p className="bt-cam-privacy-badges">
              <span>{t("camPhotoLocal")}</span>
              <span>{t("camPhotoNotSaved")}</span>
            </p>
            <p className="bt-soft-copy">{t("camLiveHint")}</p>
            <div className="bt-cam-preview-wrap">
              <video ref={videoRef} className="bt-cam-preview" playsInline muted autoPlay />
              <div className="bt-cam-oval" aria-hidden="true" />
            </div>
            {guideHints.length > 0 && (
              <ul className="bt-cam-live-hints">
                {guideHints.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            )}
            {errorKey && <p className="bt-cam-error">{t(errorKey)}</p>}
            <div className="bt-btn-row bt-btn-row--wrap">
              <button type="button" className="bt-hero-cta" onClick={captureFrame}>
                {t("camCapture")}
              </button>
              <button type="button" className="bt-ghost-btn" onClick={() => fileRef.current?.click()}>
                <Upload size={16} /> {t("camUpload")}
              </button>
              <button type="button" className="bt-ghost-btn" onClick={handleClose}>
                {t("camCancel")}
              </button>
            </div>
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={onUpload} />
          </div>
        )}

        {step === STEPS.analyzing && (
          <div className="bt-cam-panel bt-cam-panel--center">
            <div className="bt-cam-spinner" aria-hidden="true" />
            <h2 className="bt-cam-title">{t("camAnalyzing")}</h2>
            <p className="bt-soft-copy">{t("camAnalyzingSub")}</p>
          </div>
        )}

        {step === STEPS.qualityFail && result && (
          <div className="bt-cam-panel">
            <h2 className="bt-cam-title">{t("camQualityTitle")}</h2>
            <p className="bt-soft-copy">
              {result.error === "lowConfidence" ? t("camLowConfidence") : t("camQualityFailBody")}
            </p>
            {previewUrl && <img src={previewUrl} alt="" className="bt-cam-result-thumb" />}
            {result.quality?.checklist && (
              <ul className="bt-cam-checklist">
                {Object.entries(result.quality.checklist).map(([key, val]) => (
                  <li key={key} className={`is-${val.status}`}>
                    <span>{t(`camCheck_${key}`)}</span>
                    <strong>{qualityLabel(val.status, t)}</strong>
                  </li>
                ))}
              </ul>
            )}
            {(result.quality?.blockers || []).length > 0 && (
              <ul className="bt-cam-blockers">
                {result.quality.blockers.map((b) => (
                  <li key={b}>{blockerMessage(b, t)}</li>
                ))}
              </ul>
            )}
            <div className="bt-btn-row">
              <button type="button" className="bt-hero-cta" onClick={retake}>
                {t("camRetake")}
              </button>
              <button type="button" className="bt-ghost-btn" onClick={handleClose}>
                {t("camCancel")}
              </button>
            </div>
          </div>
        )}

        {step === STEPS.results && result?.ok && (
          <div className="bt-cam-panel">
            <p className="bt-section-label">{t("camResultEyebrow")}</p>
            <h2 className="bt-cam-title">{t("camResultTitle")}</h2>
            <p className="bt-soft-copy">{t("camResultSub")}</p>
            <p className="bt-cam-privacy-badges">
              <span>{t("camPhotoLocal")}</span>
              <span>{t("camPhotoNotSaved")}</span>
            </p>
            {previewUrl && <img src={previewUrl} alt="" className="bt-cam-result-thumb" />}

            {result.quality?.checklist && (
              <div className="bt-cam-quality-summary">
                <p className="bt-section-label">{t("camQualitySummary")}</p>
                <ul className="bt-cam-checklist">
                  {Object.entries(result.quality.checklist).map(([key, val]) => (
                    <li key={key} className={`is-${val.status}`}>
                      <span>{t(`camCheck_${key}`)}</span>
                      <strong>{qualityLabel(val.status, t)}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p className="bt-cam-conf">
              {t("camOverallConfidence")}: {confidenceLabel(result.confidence, t)}
            </p>
            {result.confidence === "low" && (
              <p className="bt-cam-error">{t("camLowConfidence")}</p>
            )}

            <div className="bt-cam-obs-grid">
              {result.observations.map((obs) => (
                <article key={obs.id} className="bt-cam-obs-card">
                  <p className="bt-section-label">{observationTitle(obs.kind, t)}</p>
                  <p className="bt-cam-obs-level">{levelLabel(obs.level, t)}</p>
                  <p className="bt-soft-copy">{observationCopy(obs, t)}</p>
                  <p className="bt-cam-obs-conf">
                    {t("camConfidence")}: {confidenceLabel(obs.confidence, t)}
                  </p>
                  <p className="bt-section-label">{t("whatMayHelp")}</p>
                  <ul className="bt-soft-list">
                    {helpsForObservation(obs.kind, t).map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            {matchedProducts.length > 0 && (
              <div className="bt-cam-products">
                <p className="bt-section-label">{t("suggestedProducts")}</p>
                <div className="bt-cam-product-list">
                  {matchedProducts.map((p) => (
                    <article key={p.id} className="bt-cam-product-row">
                      <img src={p.image} alt="" className="bt-cam-product-row__img" />
                      <div className="bt-cam-product-row__body">
                        <p className="bt-product-card__brand">{p.brand}</p>
                        <p className="bt-product-card__name">{p.name}</p>
                        {p.whySuit && <p className="bt-cam-why">{p.whySuit}</p>}
                        <button
                          type="button"
                          className="bt-text-link"
                          onClick={() => onExploreProducts?.(p)}
                        >
                          {t("camOpenDetails")}
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
                <p className="bt-disclaimer-inline">{t("camProductDisclaimer")}</p>
              </div>
            )}

            <p className="bt-disclaimer-inline">{t("eduOnly")}</p>
            <div className="bt-btn-row bt-btn-row--wrap">
              <button type="button" className="bt-hero-cta" onClick={handleUseResults}>
                {t("camUseResults")}
              </button>
              <button type="button" className="bt-ghost-btn" onClick={retake}>
                {t("camRetake")}
              </button>
              <button type="button" className="bt-ghost-btn" onClick={handleContinueQuiz}>
                {t("camContinueQuiz")}
              </button>
              <button type="button" className="bt-text-link" onClick={handleDeletePhoto}>
                {t("camDelete")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
