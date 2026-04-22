import { createContext, useContext, useState, useEffect } from "react";
import enDefault from "../i18n/en.js";

const LangContext = createContext();

const loadLang = (lang) => import(`../i18n/${lang}.js`).then((m) => m.default);

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      return localStorage.getItem("lang") || "en";
    } catch {
      return "en";
    }
  });
  const [t, setT] = useState(enDefault);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    Promise.all([loadLang("en"), loadLang(lang)]).then(([base, current]) =>
      setT({ ...base, ...current }),
    );
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l) => {
    if (l === lang) return;
    setFading(true);
    Promise.all([loadLang("en"), loadLang(l)]).then(([base, translations]) => {
      setLangState(l);
      setT({ ...base, ...translations });
      try {
        localStorage.setItem("lang", l);
      } catch {}
      setTimeout(() => setFading(false), 50);
    });
  };

  const value = { lang, setLang, t, fading };

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
