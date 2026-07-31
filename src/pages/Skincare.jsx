import { useState } from "react";
import { useTranslation } from "react-i18next";
import Card from "../components/Card";

const TYPES = ["oily", "dry", "combo", "sensitive"];
const SKIN_LABEL = {
  oily: "optSkinOily",
  dry: "optSkinDry",
  combo: "optSkinCombo",
  sensitive: "optSkinSensitive",
};

export default function Skincare() {
  const { t } = useTranslation();
  const [type, setType] = useState("oily");

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">{t("skincare")}</h1>
      <p className="mt-3 text-slate-600">{t("skinPick")}</p>

      <div className="mt-8 flex flex-wrap gap-2">
        {TYPES.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setType(id)}
            className={`rounded-2xl px-4 py-2.5 text-sm font-semibold transition ${
              type === id
                ? "bg-slate-900 text-white shadow-soft"
                : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
            }`}
          >
            {t(SKIN_LABEL[id])}
          </button>
        ))}
      </div>

      <Card className="mt-8 bg-gradient-to-br from-pastel-pink/30 to-white">
        <h2 className="text-lg font-semibold text-slate-900">
          {t("routineTitle")}
        </h2>
        <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-slate-700">
          {t(`skinRoutine_${type}`)}
        </p>
      </Card>

      <Card className="mt-6 border-pastel-green/40 bg-gradient-to-br from-pastel-green/25 to-white">
        <h2 className="text-lg font-semibold text-slate-900">
          {t("tipsSkinTitle")}
        </h2>
        <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-slate-700">
          {t(`skinTips_${type}`)}
        </p>
      </Card>
    </div>
  );
}
