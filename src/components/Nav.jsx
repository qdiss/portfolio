import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useLang } from "../context/LangContext";

// Flag images via flagcdn — reliable, no emoji rendering issues
const FLAG_IMGS = {
  en: "https://flagcdn.com/gb.svg",
  bs: "https://flagcdn.com/ba.svg",
  de: "https://flagcdn.com/de.svg",
  fr: "https://flagcdn.com/fr.svg",
  nl: "https://flagcdn.com/nl.svg",
  sv: "https://flagcdn.com/se.svg",
};

const LANGS = [
  { code: "en", label: "English" },
  { code: "bs", label: "Bosanski" },
  { code: "de", label: "Deutsch" },
  { code: "fr", label: "Français" },
  { code: "nl", label: "Nederlands" },
  { code: "sv", label: "Svenska" },
];

const NAV_LINKS = [
  { section: "about", labelKey: "nav_about" },
  { section: "services", labelKey: "nav_services" },
  { section: "work", labelKey: "nav_work" },
  { section: "blog", labelKey: "nav_blog", isRoute: true, to: "/blog" },
  { section: "contact", labelKey: "nav_contact" },
];

export default function Nav() {
  const { isDark, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const langRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const fn = (e) => {
      if (langRef.current && !langRef.current.contains(e.target))
        setLangOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") return;
    const observers = [];
    const visible = new Map();
    const update = () => {
      let top = null;
      visible.forEach((ratio, id) => {
        if (ratio > 0 && (!top || ratio > visible.get(top))) top = id;
      });
      setActiveSection(top || "");
    };
    NAV_LINKS.forEach(({ section }) => {
      const el = document.getElementById(section);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          visible.set(section, entry.intersectionRatio);
          update();
        },
        { threshold: [0, 0.1, 0.25, 0.5], rootMargin: "-60px 0px -30% 0px" },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [location.pathname]);

  const handleNavClick = (e, link) => {
    e.preventDefault();
    if (link.isRoute) {
      navigate(link.to);
    } else if (location.pathname === "/") {
      const el = document.getElementById(link.section);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate(`/#${link.section}`);
    }
    closeMenu();
  };

  const currentLang = LANGS.find((l) => l.code === lang) || LANGS[0];

  return (
    <>
      <style>{`
        .nav-links a.nav-active { color: var(--accent); }
        .nav-links a.nav-active::after { width: 100% !important; background: var(--accent); }

        .lang-dropdown { position: relative; display: inline-block; }
        .lang-current {
          background: var(--bg2);
          border: 1px solid var(--border);
          color: var(--text);
          font-size: 0.78rem;
          padding: 0.4rem 0.8rem;
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s;
          font-family: inherit;
          font-weight: 500;
        }
        .lang-current:hover { border-color: var(--accent); background: var(--bg3, var(--bg2)); }
        .lang-flag-img { width: 16px; height: 11px; object-fit: cover; border-radius: 1px; display: block; }
        .lang-code { font-size: 0.72rem; letter-spacing: 0.04em; font-weight: 600; text-transform: uppercase; }
        .lang-arrow { font-size: 0.55rem; opacity: 0.5; transition: transform 0.2s; }
        .lang-arrow.open { transform: rotate(180deg); }

        .lang-menu {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 6px;
          box-shadow: 0 16px 40px -4px rgba(0,0,0,0.35);
          z-index: 1100;
          min-width: 165px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          animation: dropIn 0.18s ease;
        }
        @keyframes dropIn {
          from { opacity:0; transform: translateY(-6px); }
          to   { opacity:1; transform: none; }
        }
        .lang-option {
          background: none;
          border: none;
          width: 100%;
          text-align: left;
          padding: 9px 12px;
          color: var(--text);
          font-size: 0.82rem;
          border-radius: 9px;
          cursor: pointer;
          transition: background 0.15s;
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: inherit;
          font-weight: 400;
        }
        .lang-option:hover { background: rgba(200,240,96,0.1); }
        .lang-option.active {
          background: rgba(200,240,96,0.18);
          color: var(--accent);
          font-weight: 600;
        }
        .lang-option-label { flex: 1; }
        .lang-option-check { color: var(--accent); font-size: 0.7rem; }

        .hamburger span { background: var(--text); height: 2px; }
        .mobile-menu { box-shadow: 0 10px 30px rgba(0,0,0,0.4); border-top: 1px solid var(--border); }
        .mobile-menu a { font-size: 1.05rem; padding: 1rem 0; }

        [data-theme="light"] .lang-current { background: #fff; border-color: rgba(0,0,0,0.12); color: #111; }
        [data-theme="light"] .lang-menu { background: #fff; border-color: rgba(0,0,0,0.1); box-shadow: 0 16px 40px -4px rgba(0,0,0,0.15); }
        [data-theme="light"] .lang-option { color: #111; }
        [data-theme="light"] .lang-option:hover { background: rgba(0,0,0,0.05); }
        [data-theme="light"] .lang-option.active { background: rgba(200,240,96,0.25); color: #5a7000; }
      `}</style>

      <nav>
        <Link to="/" className="nav-logo">
          adiss<span>.</span>dev
        </Link>

        <ul className="nav-links">
          {NAV_LINKS.map((link) => (
            <li key={link.section}>
              <a
                href={link.isRoute ? link.to : `/#${link.section}`}
                className={activeSection === link.section ? "nav-active" : ""}
                onClick={(e) => handleNavClick(e, link)}
              >
                {t[link.labelKey]}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          {/* Language dropdown */}
          <div className="lang-dropdown" ref={langRef}>
            <button
              className="lang-current"
              onClick={() => setLangOpen(!langOpen)}
            >
              <img
                className="lang-flag-img"
                src={FLAG_IMGS[lang]}
                alt={currentLang.label}
              />
              <span className="lang-code">{lang}</span>
              <span className={`lang-arrow${langOpen ? " open" : ""}`}>▼</span>
            </button>

            {langOpen && (
              <div className="lang-menu">
                {LANGS.map((l) => (
                  <button
                    key={l.code}
                    className={`lang-option${lang === l.code ? " active" : ""}`}
                    onClick={() => {
                      setLang(l.code);
                      setLangOpen(false);
                    }}
                  >
                    <img
                      className="lang-flag-img"
                      src={FLAG_IMGS[l.code]}
                      alt={l.label}
                    />
                    <span className="lang-option-label">{l.label}</span>
                    {lang === l.code && (
                      <span className="lang-option-check">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme toggle */}
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDark ? "☀️" : "🌙"}
          </button>

          <Link to="/hire" className="nav-cta">
            {t.nav_cta || "Start a project  "}
          </Link>

          <button
            className={`hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {NAV_LINKS.map((link) => (
          <a
            key={link.section}
            href={link.isRoute ? link.to : `/#${link.section}`}
            onClick={(e) => handleNavClick(e, link)}
          >
            {t[link.labelKey]}
          </a>
        ))}
        {/* Mobile lang selector */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            padding: "0.75rem 0",
            borderTop: "1px solid var(--border)",
            marginTop: "0.5rem",
          }}
        >
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code);
                closeMenu();
              }}
              style={{
                background:
                  lang === l.code ? "rgba(200,240,96,0.15)" : "var(--bg2)",
                border: `1px solid ${lang === l.code ? "var(--accent)" : "var(--border)"}`,
                color: lang === l.code ? "var(--accent)" : "var(--muted)",
                padding: "6px 10px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "0.75rem",
                fontWeight: lang === l.code ? 600 : 400,
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <img
                src={FLAG_IMGS[l.code]}
                alt={l.label}
                style={{
                  width: "18px",
                  height: "13px",
                  objectFit: "cover",
                  borderRadius: "2px",
                }}
              />
              <span
                style={{ textTransform: "uppercase", letterSpacing: "0.04em" }}
              >
                {l.code}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
