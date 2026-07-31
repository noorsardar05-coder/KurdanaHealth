import { c as createLucideIcon, b as burstConfetti, j as jsxRuntimeExports, r as reactExports, m as mediaUrl, g as getExerciseMedia, e as exDetail, a as caloriesForExercise, d as exName, f as exMuscles, h as exEquipment, i as getExerciseGuide, k as getGuideLabels, l as motion, A as AnimatePresence, P as Play, R as REST_RECOVERY_QUOTES, s as secPerExercise, X, V as Volume2, n as VolumeX, C as ChevronLeft, o as ChevronRight } from "./index-HHghJjFr.js";
/**
 * @license lucide-react v1.23.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { x: "14", y: "3", width: "5", height: "18", rx: "1", key: "kaeet6" }],
  ["rect", { x: "5", y: "3", width: "5", height: "18", rx: "1", key: "1wsw3u" }]
];
const Pause = createLucideIcon("pause", __iconNode$1);
/**
 * @license lucide-react v1.23.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M21 4v16", key: "7j8fe9" }],
  [
    "path",
    {
      d: "M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z",
      key: "zs4d6"
    }
  ]
];
const SkipForward = createLucideIcon("skip-forward", __iconNode);
function fireConfetti(target, intensity = "medium") {
  burstConfetti(target, intensity);
}
function confettiSmall(target) {
  fireConfetti(target, "small");
}
function confettiLarge(target) {
  fireConfetti(target, "large");
}
function ProgressBar({ value, className }) {
  const pct = Math.min(100, Math.max(0, value));
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `wp-progress ${className || ""}`, role: "progressbar", "aria-valuenow": pct, "aria-valuemin": 0, "aria-valuemax": 100, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "wp-progress__track", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "wp-progress__fill", style: { width: `${pct}%` } }) }) });
}
function resolveUrl(src) {
  if (!src) return "";
  if (src.startsWith("http") || src.startsWith("blob:")) return src;
  return mediaUrl(src);
}
function isVideoCandidate(candidate) {
  return (candidate == null ? void 0 : candidate.type) === "video" || /\.(mp4|webm)$/i.test((candidate == null ? void 0 : candidate.src) || "");
}
function MediaLoader({ candidates, className, poster, compact }) {
  const [index, setIndex] = reactExports.useState(0);
  const [status, setStatus] = reactExports.useState("loading");
  const validCandidates = (candidates || []).filter((c) => (c == null ? void 0 : c.src) && isVideoCandidate(c));
  reactExports.useEffect(() => {
    setIndex(0);
    setStatus(validCandidates.length ? "loading" : "missing");
  }, [candidates, validCandidates.length]);
  const active = validCandidates[index] ?? null;
  const tryNext = () => {
    if (index + 1 >= validCandidates.length) {
      setStatus("missing");
      return;
    }
    setIndex((i) => i + 1);
    setStatus("loading");
  };
  const handleSuccess = () => setStatus("ready");
  if (status === "missing" || !active) {
    return null;
  }
  const url = resolveUrl(active.src);
  const thumb = poster ? resolveUrl(poster) : active.thumbnail ? resolveUrl(active.thumbnail) : void 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `wp-media-video-wrap ${className || ""} ${status === "ready" ? "wp-media-video-wrap--ready" : ""}`, children: [
    status === "loading" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "wp-media-loading", children: [
      thumb && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { className: "wp-media-loading__poster", src: thumb, alt: "", "aria-hidden": "true" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "wp-media-loading__ring" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "video",
      {
        className: "wp-media-video",
        src: url,
        poster: thumb,
        autoPlay: true,
        loop: true,
        muted: true,
        playsInline: true,
        preload: "metadata",
        onLoadedData: handleSuccess,
        onCanPlay: handleSuccess,
        onError: tryNext
      },
      url
    )
  ] });
}
function ExerciseMediaPlayer({ exercise, className, variant = "fullscreen" }) {
  var _a;
  if (!exercise) return null;
  const resolved = ((_a = exercise.mediaCandidates) == null ? void 0 : _a.length) ? { candidates: exercise.mediaCandidates } : getExerciseMedia(exercise);
  const candidates = resolved.candidates || [];
  const isThumb = variant === "thumbnail";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `wp-media-player wp-media-player--${variant} ${className || ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(MediaLoader, { candidates, className: "wp-media-player__inner", compact: isThumb }),
    !isThumb && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "wp-media-player__vignette", "aria-hidden": "true" })
  ] });
}
function diffLabel(ex, lang, t) {
  const d = ex.difficulty;
  if (d === "beginner") return t("diffBeginner");
  if (d === "intermediate") return t("diffInter");
  if (d === "advanced") return t("diffAdv");
  return d || "—";
}
function ExerciseInfoBar({ exercise, lang, t }) {
  if (!exercise) return null;
  const isTimed = Boolean(exercise.durationSec);
  const metric = exDetail(exercise, lang);
  const cal = caloriesForExercise(exercise);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "wp-info", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "wp-info__name", children: exName(exercise, lang) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "wp-info__grid", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "wp-info__cell", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "wp-info__label", children: t("infoMuscles") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "wp-info__value", children: exMuscles(exercise, lang) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "wp-info__cell", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "wp-info__label", children: t("difficulty") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "wp-info__value", children: diffLabel(exercise, lang, t) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "wp-info__cell", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "wp-info__label", children: isTimed ? t("exerciseTimer") : t("infoReps") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "wp-info__value", children: metric })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "wp-info__cell", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "wp-info__label", children: t("statCalories") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "wp-info__value", children: [
          "~",
          cal
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "wp-info__cell wp-info__cell--wide", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "wp-info__label", children: t("equipLabel") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "wp-info__value", children: exEquipment(exercise, lang) })
      ] })
    ] })
  ] });
}
const KEYS = ["setup", "movement", "breathing", "commonMistake", "safety", "easier", "harder"];
function CoachPanel({ exercise, lang, t, className }) {
  if (!exercise) return null;
  const guide = getExerciseGuide(exercise, lang);
  const labels = getGuideLabels(lang);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `wp-coach ${className || ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "wp-coach__heading", children: (t == null ? void 0 : t("coachGuideTitle")) || "Coach guide" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "wp-coach__list", children: KEYS.map((key) => {
      const text = guide == null ? void 0 : guide[key];
      if (!text) return null;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: `wp-coach__item wp-coach__item--${key}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "wp-coach__label", children: labels[key] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "wp-coach__text", children: text })
      ] }, key);
    }) })
  ] });
}
function formatTimer(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
function WorkoutTimer({ seconds, label, size = "lg", accent }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `wp-timer wp-timer--${size}${accent ? ` wp-timer--${accent}` : ""}`, children: [
    label && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "wp-timer__label", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "wp-timer__value", children: formatTimer(seconds) })
  ] });
}
function CountdownRing({ seconds, total, children, size = "md", paused }) {
  const r = 58;
  const c = 2 * Math.PI * r;
  const pct = total ? (total - seconds) / total : 0;
  const offset = c - pct * c;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `wp-ring wp-ring--${size}${paused ? " wp-ring--paused" : ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 128 128", className: "wp-ring__svg", "aria-hidden": "true", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "64", cy: "64", r, className: "wp-ring__bg" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "64", cy: "64", r, className: "wp-ring__track-glow", strokeDasharray: c }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "circle",
        {
          cx: "64",
          cy: "64",
          r,
          className: "wp-ring__fill",
          strokeDasharray: c,
          strokeDashoffset: offset
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "wp-ring__inner", children: children ?? seconds })
  ] });
}
const REST_TOTAL = 15;
function pickQuote(lang) {
  const quotes = REST_RECOVERY_QUOTES[lang] || REST_RECOVERY_QUOTES.en;
  return quotes[Math.floor(Math.random() * quotes.length)];
}
function RestScreen({
  t,
  lang,
  restLeft,
  restSessionId,
  nextExercise,
  paused,
  onSkip,
  onTogglePause
}) {
  const quote = reactExports.useMemo(() => pickQuote(lang), [lang, restSessionId]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "wp-rest",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "wp-rest__ambient", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "wp-rest__orb wp-rest__orb--1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "wp-rest__orb wp-rest__orb--2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "wp-rest__orb wp-rest__orb--3" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "wp-rest__content", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.h2,
            {
              className: "wp-rest__heading",
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.08, duration: 0.4 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "wp-rest__heading-icon", "aria-hidden": "true", children: "🧘" }),
                t("restRecoveryTitle")
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "wp-rest__timer-wrap",
              initial: { opacity: 0, scale: 0.92 },
              animate: { opacity: 1, scale: 1 },
              transition: { delay: 0.14, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CountdownRing, { seconds: restLeft, total: REST_TOTAL, size: "xl", paused, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "wp-ring__num", children: restLeft }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "wp-ring__unit", children: t("secUnit") })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "wp-rest__quote-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.blockquote,
            {
              className: "wp-rest__quote",
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -8 },
              transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
              children: quote
            },
            `${restSessionId}-${quote}`
          ) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "wp-rest__brand", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "wp-rest__brand-line", "aria-hidden": "true" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "wp-rest__brand-name", children: t("restBrandName") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "wp-rest__brand-credit", children: t("restCreatedBy") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "wp-rest__brand-line", "aria-hidden": "true" })
          ] }),
          nextExercise && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              className: "wp-rest__upnext",
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.28, duration: 0.45 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "wp-rest__upnext-label", children: t("upNext") }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "wp-rest__upnext-card", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "wp-rest__thumb", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ExerciseMediaPlayer,
                    {
                      exercise: nextExercise,
                      variant: "thumbnail"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "wp-rest__upnext-info", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: exName(nextExercise, lang) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: exDetail(nextExercise, lang) })
                  ] })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              className: "wp-rest__actions",
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.34, duration: 0.4 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: "wp-btn wp-btn--primary wp-rest__skip", onClick: onSkip, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SkipForward, { size: 18 }),
                  t("skipRest")
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: "wp-btn wp-btn--ghost wp-rest__pause", onClick: onTogglePause, children: [
                  paused ? /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 18 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { size: 18 }),
                  paused ? t("resume") : t("pauseWorkout")
                ] })
              ]
            }
          )
        ] })
      ]
    }
  );
}
function WorkoutComplete({ t, totalElapsed, calories, pointsEarned, streak, onSave }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "wp-complete",
      initial: { opacity: 0, y: 24 },
      animate: { opacity: 1, y: 0 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "wp-complete__fx", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "wp-complete__orb wp-complete__orb--1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "wp-complete__orb wp-complete__orb--2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "wp-complete__orb wp-complete__orb--3" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "wp-complete__title", children: t("workoutComplete") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "wp-complete__subtitle", children: t("celebration") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "wp-complete__stats", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "wp-complete__stat", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "wp-complete__stat-val", children: Math.max(1, Math.round(totalElapsed / 60)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "wp-complete__stat-lbl", children: t("statMinutes") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "wp-complete__stat", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "wp-complete__stat-val", children: calories || 0 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "wp-complete__stat-lbl", children: t("statCalories") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "wp-complete__stat", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "wp-complete__stat-val", children: [
              "+",
              pointsEarned
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "wp-complete__stat-lbl", children: t("statPoints") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "wp-complete__stat", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "wp-complete__stat-val", children: streak }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "wp-complete__stat-lbl", children: t("statStreak") })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "wp-btn wp-btn--primary wp-btn--xl", onClick: onSave, children: t("saveCompletion") })
      ]
    }
  );
}
const REST_SEC = 15;
function WorkoutPlayer({
  open,
  plan,
  lang,
  t,
  progress,
  onClose,
  onComplete,
  playSound,
  clickSound,
  soundOn,
  toggleSound
}) {
  const rootRef = reactExports.useRef(null);
  const startedRef = reactExports.useRef(false);
  const [index, setIndex] = reactExports.useState(0);
  const [phase, setPhase] = reactExports.useState("active");
  const [paused, setPaused] = reactExports.useState(false);
  const [exLeft, setExLeft] = reactExports.useState(0);
  const [restLeft, setRestLeft] = reactExports.useState(REST_SEC);
  const [totalElapsed, setTotalElapsed] = reactExports.useState(0);
  const [done, setDone] = reactExports.useState(false);
  const [restSessionId, setRestSessionId] = reactExports.useState(0);
  const list = (plan == null ? void 0 : plan.list) || [];
  const ex = list[index];
  const nextEx = list[index + 1];
  const exDuration = ex ? secPerExercise(ex) : 45;
  const reset = reactExports.useCallback(() => {
    if (!list.length) return;
    setIndex(0);
    setPhase("active");
    setPaused(false);
    setDone(false);
    setTotalElapsed(0);
    setRestLeft(REST_SEC);
    setRestSessionId(0);
    setExLeft(secPerExercise(list[0]));
    startedRef.current = false;
  }, [list]);
  reactExports.useEffect(() => {
    if (open && list.length) reset();
  }, [open, plan, reset, list.length]);
  reactExports.useEffect(() => {
    if (!open || startedRef.current) return;
    startedRef.current = true;
    playSound == null ? void 0 : playSound("startWorkout");
    confettiSmall(rootRef.current);
  }, [open, playSound]);
  reactExports.useEffect(() => {
    if (!open || paused || done) return;
    if (phase === "active" && ex) {
      const id = setInterval(() => {
        setExLeft((v) => v <= 1 ? 0 : v - 1);
        setTotalElapsed((v) => v + 1);
      }, 1e3);
      return () => clearInterval(id);
    }
    if (phase === "rest") {
      const id = setInterval(() => {
        setRestLeft((v) => v <= 1 ? 0 : v - 1);
        setTotalElapsed((v) => v + 1);
      }, 1e3);
      return () => clearInterval(id);
    }
  }, [open, paused, done, phase, ex]);
  const goRest = reactExports.useCallback(() => {
    playSound == null ? void 0 : playSound("restStart");
    setPhase("rest");
    setRestLeft(REST_SEC);
    setRestSessionId((id) => id + 1);
    confettiSmall(rootRef.current);
  }, [playSound]);
  const finishWorkout = reactExports.useCallback(() => {
    setDone(true);
    playSound == null ? void 0 : playSound("workoutComplete");
    confettiLarge(rootRef.current);
  }, [playSound]);
  const advance = reactExports.useCallback(() => {
    playSound == null ? void 0 : playSound("exerciseDone");
    if (index < list.length - 1) goRest();
    else finishWorkout();
  }, [index, list.length, goRest, finishWorkout, playSound]);
  reactExports.useEffect(() => {
    if (!open || done || phase !== "active" || !ex) return;
    if (exLeft === 0) advance();
  }, [exLeft, open, done, phase, ex, advance]);
  reactExports.useEffect(() => {
    if (!open || done || phase !== "rest") return;
    if (restLeft === 0) {
      playSound == null ? void 0 : playSound("restEnd");
      const n = index + 1;
      setIndex(n);
      setExLeft(secPerExercise(list[n]));
      setPhase("active");
    }
  }, [restLeft, open, done, phase, index, list, playSound]);
  const skipRest = () => {
    clickSound == null ? void 0 : clickSound();
    playSound == null ? void 0 : playSound("restEnd");
    const n = index + 1;
    if (n < list.length) {
      setIndex(n);
      setExLeft(secPerExercise(list[n]));
      setPhase("active");
    }
  };
  const nextEarly = () => {
    clickSound == null ? void 0 : clickSound();
    advance();
  };
  const projectedPoints = Math.round(Math.max(1, Math.round(totalElapsed / 60)) * 2 + 10);
  const projectedStreak = (() => {
    const p = progress || {};
    if (!p.lastWorkoutDate) return 1;
    const last = new Date(p.lastWorkoutDate);
    const diff = Math.floor((Date.now() - last.getTime()) / 864e5);
    return diff <= 1 ? (p.streak || 0) + 1 : 1;
  })();
  const handleSave = () => {
    clickSound == null ? void 0 : clickSound();
    onComplete({
      minutes: Math.max(1, Math.round(totalElapsed / 60)),
      calories: (plan == null ? void 0 : plan.caloriesEstimate) || 0
    });
    onClose();
  };
  if (!open) return null;
  const overallPct = list.length ? (index + (phase === "rest" ? 0.5 : 1 - exLeft / Math.max(exDuration, 1))) / list.length * 100 : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "wp-root", ref: rootRef, role: "dialog", "aria-modal": "true", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "wp-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "wp-icon-btn", onClick: () => {
        clickSound == null ? void 0 : clickSound();
        onClose();
      }, "aria-label": t("close"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 22 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "wp-header__center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "wp-header__progress-label", children: [
          t("exerciseOf"),
          " ",
          phase === "rest" ? index + 2 : index + 1,
          " / ",
          list.length
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressBar, { value: overallPct, className: "wp-header__bar" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "wp-icon-btn",
          onClick: () => {
            clickSound == null ? void 0 : clickSound();
            toggleSound == null ? void 0 : toggleSound();
          },
          "aria-label": soundOn ? t("soundOff") : t("soundOn"),
          children: soundOn ? /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { size: 20 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(VolumeX, { size: 20 })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "wp-main", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: done ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      WorkoutComplete,
      {
        t,
        totalElapsed,
        calories: (plan == null ? void 0 : plan.caloriesEstimate) || 0,
        pointsEarned: projectedPoints,
        streak: projectedStreak,
        onSave: handleSave
      },
      "complete"
    ) : phase === "rest" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      RestScreen,
      {
        t,
        lang,
        restLeft,
        restSessionId,
        nextExercise: nextEx,
        paused,
        onSkip: skipRest,
        onTogglePause: () => {
          clickSound == null ? void 0 : clickSound();
          setPaused((p) => !p);
        }
      },
      `rest-${restSessionId}`
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "wp-session", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "wp-media-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ExerciseMediaPlayer, { exercise: ex }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "wp-media-overlay", children: /* @__PURE__ */ jsxRuntimeExports.jsx(WorkoutTimer, { seconds: exLeft, label: t("exerciseTimer"), size: "lg", accent: "light" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "wp-details", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ExerciseInfoBar, { exercise: ex, lang, t }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CoachPanel, { exercise: ex, lang, t }),
        nextEx && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "wp-up-next", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "wp-up-next__label", children: t("upNext") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "wp-up-next__name", children: lang === "ku" ? nextEx.nameKu || nextEx.nameEn : nextEx.nameEn })
        ] })
      ] })
    ] }, `ex-${index}`) }) }),
    !done && phase === "active" && /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "wp-controls", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: "wp-ctrl",
          disabled: index === 0,
          onClick: () => {
            clickSound == null ? void 0 : clickSound();
            const p = index - 1;
            setIndex(p);
            setExLeft(secPerExercise(list[p]));
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 24 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t("previous") })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: "wp-ctrl wp-ctrl--primary",
          onClick: () => {
            clickSound == null ? void 0 : clickSound();
            setPaused((p) => !p);
          },
          children: [
            paused ? /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 26 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { size: 26 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: paused ? t("resume") : t("pause") })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: "wp-ctrl", onClick: nextEarly, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 24 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: index < list.length - 1 ? t("next") : t("completeEx") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "wp-finish", onClick: () => {
        clickSound == null ? void 0 : clickSound();
        finishWorkout();
      }, children: t("finishWorkout") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "wp-total-elapsed", children: [
        t("totalTimer"),
        ": ",
        formatTimer(totalElapsed)
      ] })
    ] })
  ] });
}
export {
  WorkoutPlayer as default
};
