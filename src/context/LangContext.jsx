import { createContext, useContext, useState, useEffect } from "react";

const LangContext = createContext();

const loadLang = (lang) => import(`../i18n/${lang}.js`).then((m) => m.default);

// RevealManager - globalni, koristi context value direktno
export function RevealManager() {
  useEffect(() => {
    let observer;
    const timer = setTimeout(() => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.05, rootMargin: "0px 0px -40px 0px" },
      );

      // Resetuj sve reveal elemente na promjenu jezika/refresh
      document
        .querySelectorAll(".reveal.visible")
        .forEach((el) => el.classList.remove("visible"));

      document.querySelectorAll(".reveal").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add("visible");
        } else {
          observer.observe(el);
        }
      });
    }, 100); // veći delay za safe

    return () => {
      clearTimeout(timer);
      observer?.disconnect();
    };
  }, []); // bez deps - radi uvijek

  return null;
}

export function LangProvider({ children }) {
  const [lang, setLangState] = useState("en");
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
  };

  const value = { lang, setLang, t: t ?? {}, fading };

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
