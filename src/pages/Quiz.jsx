import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import Card from "../components/Card";

const STEPS = [
  {
    id: "fitness",
    questionKey: "qFitness",
    options: [
      { value: "beginner", labelKey: "optBeginner" },
      { value: "intermediate", labelKey: "optIntermediate" },
      { value: "advanced", labelKey: "optAdvanced" },
    ],
  },
  {
    id: "lifestyle",
    questionKey: "qLifestyle",
    options: [
      { value: "sedentary", labelKey: "optSedentary" },
      { value: "moderate", labelKey: "optModerate" },
      { value: "active", labelKey: "optActive" },
    ],
  },
  {
    id: "sleep",
    questionKey: "qSleep",
    options: [
      { value: "poor", labelKey: "optSleepPoor" },
      { value: "ok", labelKey: "optSleepOk" },
      { value: "good", labelKey: "optSleepGood" },
    ],
  },
  {
    id: "goal",
    questionKey: "qGoals",
    options: [
      { value: "fat", labelKey: "optGoalFat" },
      { value: "muscle", labelKey: "optGoalMuscle" },
      { value: "fitness", labelKey: "optGoalFitness" },
      { value: "skin", labelKey: "optGoalSkin" },
    ],
  },
  {
    id: "skin",
    questionKey: "qSkin",
    options: [
      { value: "oily", labelKey: "optSkinOily" },
      { value: "dry", labelKey: "optSkinDry" },
      { value: "combo", labelKey: "optSkinCombo" },
      { value: "sensitive", labelKey: "optSkinSensitive" },
    ],
  },
];

function buildProfile(answers) {
  const f = answers.fitness;
  const l = answers.lifestyle;
  const fitnessLabel =
    f === "beginner"
      ? "Beginner"
      : f === "intermediate"
        ? "Intermediate"
        : "Advanced";
  const activeTag =
    l === "active"
      ? "Active"
      : l === "sedentary"
        ? "Low-activity"
        : "Balanced";
  const skinMap = {
    oily: "Oily",
    dry: "Dry",
    combo: "Combination",
    sensitive: "Sensitive",
  };
  const goalMap = {
    fat: "Lose fat",
    muscle: "Build muscle",
    fitness: "General fitness",
    skin: "Skin health",
  };
  const sleepMap = {
    poor: "Sleep: needs care",
    ok: "Sleep: okay",
    good: "Sleep: solid",
  };
  return `${activeTag} ${fitnessLabel} · ${sleepMap[answers.sleep]} · Goal: ${goalMap[answers.goal]} · Skin: ${skinMap[answers.skin]}`;
}

export default function Quiz() {
  const { t } = useTranslation();
  const { user, refreshUserDoc } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [saving, setSaving] = useState(false);

  const current = STEPS[step];
  const total = STEPS.length;

  const progress = useMemo(
    () => Math.round(((step + 1) / total) * 100),
    [step, total]
  );

  function select(value) {
    setAnswers((prev) => ({ ...prev, [current.id]: value }));
  }

  async function finish() {
    if (!user) return;
    setSaving(true);
    const profile = buildProfile(answers);
    try {
      await updateDoc(doc(db, "users", user.uid), { profile });
      await refreshUserDoc();
      navigate("/dashboard");
    } finally {
      setSaving(false);
    }
  }

  const canNext = Boolean(answers[current.id]);
  const isLast = step === total - 1;

  return (
    <div className="mx-auto max-w-xl px-4 py-12 sm:px-6">
      <Card>
        <div className="mb-6 flex items-center justify-between gap-4">
          <p className="text-sm font-medium text-slate-500">
            {t("quizStep", { current: step + 1, total })}
          </p>
          <span className="text-sm font-semibold text-slate-800">
            {progress}%
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-pastel-green to-pastel-blue transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <h1 className="mt-8 text-xl font-bold text-slate-900 sm:text-2xl">
          {t(current.questionKey)}
        </h1>

        <div className="mt-6 flex flex-col gap-3">
          {current.options.map((opt) => {
            const selected = answers[current.id] === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => select(opt.value)}
                className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
                  selected
                    ? "border-slate-900 bg-pastel-green/50 text-slate-900 shadow-card"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                }`}
              >
                {t(opt.labelKey)}
              </button>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {step > 0 && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => setStep((s) => s - 1)}
            >
              {t("back")}
            </Button>
          )}
          {!isLast && (
            <Button
              type="button"
              variant="primary"
              disabled={!canNext}
              onClick={() => setStep((s) => s + 1)}
            >
              {t("next")}
            </Button>
          )}
          {isLast && (
            <Button
              type="button"
              variant="pastel"
              disabled={!canNext || saving}
              onClick={finish}
            >
              {t("finish")}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
