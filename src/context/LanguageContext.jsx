import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getLanguage, setLanguage as persistLanguage, syncEmbeddedAppLanguages } from "../utils/storage";
import { t as translateKey } from "../utils/translations";

const LanguageContext = createContext(null);

function applyDocumentLanguage(lang) {
  const isKu = lang === "ku";
  if (typeof document !== "undefined") {
    document.documentElement.lang = isKu ? "ckb" : "en";
    document.documentElement.dir = isKu ? "rtl" : "ltr";
    document.body.dir = isKu ? "rtl" : "ltr";
    document.body.classList.toggle("lang-ku", isKu);
    document.body.classList.toggle("lang-en", !isKu);
  }
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => getLanguage());

  const setLanguage = useCallback((next) => {
    persistLanguage(next);
    setLanguageState(next === "ku" ? "ku" : "en");
  }, []);

  useEffect(() => {
    applyDocumentLanguage(language);
    syncEmbeddedAppLanguages(language);
  }, [language]);

  const t = useCallback((key) => translateKey(language, key), [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
      isRtl: language === "ku",
    }),
    [language, setLanguage, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
