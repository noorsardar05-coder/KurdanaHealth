import { useCallback } from "react";
import { useLanguage } from "../../../context/LanguageContext.jsx";
import { AFS_I18N } from "../i18n/strings.js";
import { CINEMATIC } from "../i18n/cinematic.js";

export function useAfsTranslate() {
  const { language, setLanguage, isRtl } = useLanguage();
  const lang = language === "ku" ? "ku" : "en";

  const t = useCallback(
    (key) => {
      const afs = AFS_I18N[lang]?.[key] ?? AFS_I18N.en[key];
      if (afs !== undefined) return afs;
      const cin = CINEMATIC[lang]?.[key] ?? CINEMATIC.en[key];
      return cin ?? key;
    },
    [lang]
  );

  const tc = useCallback(
    (key) => CINEMATIC[lang]?.[key] ?? CINEMATIC.en[key] ?? key,
    [lang]
  );

  const toggleLang = useCallback(() => {
    setLanguage(lang === "en" ? "ku" : "en");
  }, [lang, setLanguage]);

  return { lang, isRtl, t, tc, toggleLang };
}
