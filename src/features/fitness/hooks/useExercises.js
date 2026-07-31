import { useCallback, useEffect, useState } from "react";
import { CURATED_EXERCISES } from "../data/curatedExercises.js";
import { getExerciseGuide } from "../utils/exerciseGuide.js";
import { attachExerciseMedia, hasVerifiedExerciseMedia } from "../../../data/exerciseMedia.js";

const REQUIRED_TEXT_FIELDS = [
  "id",
  "nameEn",
  "nameKu",
  "category",
  "difficulty",
  "equipmentEn",
  "equipmentKu",
  "musclesEn",
  "musclesKu",
  "instructionEn",
  "instructionKu",
  "setupEn",
  "setupKu",
  "movementEn",
  "movementKu",
  "breathingEn",
  "breathingKu",
  "mistakesEn",
  "mistakesKu",
  "safetyTipEn",
  "safetyTipKu",
];

function hasCompleteExerciseData(exercise) {
  return (
    REQUIRED_TEXT_FIELDS.every((field) => typeof exercise?.[field] === "string" && exercise[field].trim()) &&
    (Number.isFinite(exercise.durationSec) || Number.isFinite(exercise.reps)) &&
    hasVerifiedExerciseMedia(exercise)
  );
}

function enrichOne(ex) {
  const withGuide = ex.guide?.setup
    ? ex
    : {
        ...ex,
        guide: getExerciseGuide(ex, "en"),
        guideKu: getExerciseGuide(ex, "ku"),
      };
  return attachExerciseMedia(withGuide);
}

export function useExercises() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    function loadProductionExercises(list) {
      if (cancelled || !Array.isArray(list)) return;

      const supported = list
        .filter(hasCompleteExerciseData)
        .map(enrichOne)
        .filter(Boolean);

      setExercises(supported);
      setLoading(false);
    }

    loadProductionExercises(CURATED_EXERCISES);

    return () => {
      cancelled = true;
    };
  }, []);

  return { exercises, loading, count: exercises.length };
}

export function useFitnessLang(initialLang) {
  const [lang, setLang] = useState(initialLang || "en");
  const toggle = useCallback(() => setLang((l) => (l === "en" ? "ku" : "en")), []);
  return { lang, isRtl: lang === "ku", toggle, setLang };
}
