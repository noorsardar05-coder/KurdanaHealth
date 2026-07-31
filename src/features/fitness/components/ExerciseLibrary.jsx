import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { filterExercises } from "../utils/exerciseHelpers.js";
import { loadFavorites, saveFavorites } from "../utils/storage.js";
import ExerciseCard from "./ExerciseCard.jsx";
import ExerciseDetailModal from "./ExerciseDetailModal.jsx";

const PAGE = 24;

function LibrarySkeleton() {
  return (
    <div className="el-grid">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="el-card el-card--skeleton" aria-hidden="true">
          <div className="el-skeleton el-skeleton--media" />
          <div className="el-skeleton el-skeleton--line" />
          <div className="el-skeleton el-skeleton--line el-skeleton--short" />
        </div>
      ))}
    </div>
  );
}

export default function ExerciseLibrary({ t, lang, exercises, loading, onStartExercise }) {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    level: "",
    equipment: "",
    duration: "",
    muscle: "",
  });
  const [visible, setVisible] = useState(PAGE);
  const [detailExercise, setDetailExercise] = useState(null);
  const supportedIds = useMemo(() => exercises.map((exercise) => exercise.id), [exercises]);
  const [favorites, setFavorites] = useState(() => loadFavorites(supportedIds));
  const [failedMediaIds, setFailedMediaIds] = useState(() => new Set());

  const availableExercises = useMemo(
    () => exercises.filter((exercise) => !failedMediaIds.has(exercise.id)),
    [exercises, failedMediaIds]
  );
  const filtered = useMemo(
    () => filterExercises(availableExercises, filters, lang),
    [availableExercises, filters, lang]
  );
  const shown = filtered.slice(0, visible);
  const categories = useMemo(
    () => [...new Set(availableExercises.map((exercise) => exercise.category))],
    [availableExercises]
  );
  const equipmentOptions = useMemo(() => {
    const byEnglishName = new Map();
    availableExercises.forEach((exercise) => {
      byEnglishName.set(exercise.equipmentEn, {
        value: exercise.equipmentEn,
        label: lang === "ku" ? exercise.equipmentKu : exercise.equipmentEn,
      });
    });
    return [...byEnglishName.values()];
  }, [availableExercises, lang]);

  const set = (key, val) => {
    setFilters((f) => ({ ...f, [key]: val }));
    setVisible(PAGE);
  };

  const catLabel = (c) => {
    const map = {
      cardio: "catCardio",
      chest: "catChest",
      back: "catBack",
      legs: "catLegs",
      glutes: "catGlutes",
      core: "catCore",
      shoulders: "catShoulders",
      arms: "catArms",
      mobility: "catMobility",
      stretching: "catStretching",
    };
    return t(map[c] || "catStrength");
  };

  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      saveFavorites(next);
      return next;
    });
  }, []);

  const handleStart = useCallback(
    (ex) => {
      setDetailExercise(null);
      onStartExercise?.(ex);
    },
    [onStartExercise]
  );

  useEffect(() => {
    setFavorites(loadFavorites(supportedIds));
  }, [supportedIds]);

  const handleMediaUnavailable = useCallback((id) => {
    if (!id) return;
    setFailedMediaIds((previous) => {
      const next = new Set(previous);
      next.add(id);
      return next;
    });
    setDetailExercise((current) => (current?.id === id ? null : current));
  }, []);

  return (
    <motion.section
      className="ft-panel glass el-library"
      id="fitness-library"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <h2 className="ft-panel__title">{t("libraryTitle")}</h2>
      <p className="ft-panel__desc">{t("libraryDesc")}</p>

      <div className="el-filters">
        <input
          type="search"
          className="el-filters__search"
          placeholder={t("searchPh")}
          value={filters.search}
          onChange={(e) => set("search", e.target.value)}
          aria-label={t("searchPh")}
        />
        <div className="el-filters__row">
          <select className="el-filters__select" value={filters.category} onChange={(e) => set("category", e.target.value)} aria-label={t("filterCategory")}>
            <option value="">{t("filterCategory")}</option>
            {categories.map((c) => (
              <option key={c} value={c}>{catLabel(c)}</option>
            ))}
          </select>
          <select className="el-filters__select" value={filters.level} onChange={(e) => set("level", e.target.value)} aria-label={t("filterLevel")}>
            <option value="">{t("filterLevel")}</option>
            <option value="beginner">{t("diffBeginner")}</option>
            <option value="intermediate">{t("diffInter")}</option>
            <option value="advanced">{t("diffAdv")}</option>
          </select>
          <select className="el-filters__select" value={filters.equipment} onChange={(e) => set("equipment", e.target.value)} aria-label={t("filterEquipment")}>
            <option value="">{t("filterEquipment")}</option>
            {equipmentOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <select className="el-filters__select" value={filters.duration} onChange={(e) => set("duration", e.target.value)} aria-label={t("filterDuration")}>
            <option value="">{t("filterDuration")}</option>
            <option value="1">≤ 1 min</option>
            <option value="2">≤ 2 min</option>
            <option value="5">≤ 5 min</option>
          </select>
          <input
            className="el-filters__muscle"
            placeholder={t("filterMuscle")}
            value={filters.muscle}
            onChange={(e) => set("muscle", e.target.value)}
            aria-label={t("filterMuscle")}
          />
        </div>
      </div>

      <p className="el-count">
        <strong>{filtered.length}</strong> {t("exercises")}
      </p>

      {loading ? (
        <LibrarySkeleton />
      ) : filtered.length === 0 ? (
        <p className="el-empty">{t("noExercises")}</p>
      ) : (
        <div className="el-grid">
          <AnimatePresence mode="popLayout">
            {shown.map((ex) => (
              <ExerciseCard
                key={ex.id}
                exercise={ex}
                lang={lang}
                t={t}
                isFavorite={favorites.includes(ex.id)}
                onToggleFavorite={toggleFavorite}
                onStart={handleStart}
                onDetail={setDetailExercise}
                onMediaUnavailable={handleMediaUnavailable}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {!loading && visible < filtered.length && (
        <motion.button
          type="button"
          className="el-load-more"
          onClick={() => setVisible((v) => v + PAGE)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {t("loadMore")}
        </motion.button>
      )}

      {detailExercise && (
        <ExerciseDetailModal
          exercise={detailExercise}
          lang={lang}
          t={t}
          onClose={() => setDetailExercise(null)}
          onStart={handleStart}
          onMediaUnavailable={handleMediaUnavailable}
        />
      )}
    </motion.section>
  );
}
