import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      return saved ? saved === "dark" : true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light",
    );
    updateFavicon(isDark); // ← već imaš ovo
  }, [isDark]);

  const toggleTheme = () => {
    document.body.classList.add("theme-transition");
    setIsDark((prev) => !prev);
    setTimeout(() => document.body.classList.remove("theme-transition"), 350);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

function updateFavicon(isDark) {
  const dark = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect width="64" height="64" rx="12" fill="#0a0a0a"/>
      <text x="32" y="50" font-family="Georgia,serif" font-size="52" font-weight="700" fill="#f0ede8" text-anchor="middle">a</text>
      <circle cx="54" cy="14" r="7" fill="#c8f060"/>
    </svg>`;

  const light = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect width="64" height="64" rx="12" fill="#ffffff"/>
      <text x="32" y="50" font-family="Georgia,serif" font-size="52" font-weight="700" fill="#1a1816" text-anchor="middle">a</text>
      <circle cx="54" cy="14" r="7" fill="#4d6900"/>
    </svg>`;

  const svg = isDark ? dark : light;
  const blob = new Blob([svg], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);

  let link = document.querySelector("link[rel='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/svg+xml";
    document.head.appendChild(link);
  }

  const old = link.href;
  link.href = url;
  if (old.startsWith("blob:")) URL.revokeObjectURL(old);
}
