import { createContext, useContext, useState, useEffect } from "react";

const LangContext = createContext();

const loadLang = (lang) => import(`../i18n/${lang}.js`).then((m) => m.default);

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem("lang");
      return saved && ["en", "bs", "de", "fr", "nl", "sv"].includes(saved)
        ? saved
        : "en";
    } catch {
      return "en";
    }
  });
  const [t, setT] = useState(null);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    loadLang(lang).then(setT);
  }, [lang]);

  const setLang = (l) => {
    if (l === lang) return;
    setFading(true);
    loadLang(l).then((translations) => {
      setLangState(l);
      setT(translations);
      try {
        localStorage.setItem("lang", l);
      } catch {}
      setTimeout(() => setFading(false), 50);
    });
    setTimeout(() => setFading(true), 180);
  };

  if (!t) return null; // ili loading spinner

  return (
    <LangContext.Provider value={{ lang, setLang, t, fading }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
