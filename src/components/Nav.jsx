import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useLang } from "../context/LangContext";

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
  const [scrolled, setScrolled] = useState(false);
  const langRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

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
        nav {
          transition: box-shadow 0.3s, background 0.3s;
        }
        nav.nav--scrolled {
          box-shadow: 0 1px 0 var(--border);
        }

        .nav-links a.nav-active { color: var(--accent); }
        .nav-links a.nav-active::after { width: 100% !important; background: var(--accent); }

        /* ── LANG DROPDOWN ── */
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
          background: none; border: none; width: 100%; text-align: left;
          padding: 9px 12px; color: var(--text); font-size: 0.82rem;
          border-radius: 9px; cursor: pointer; transition: background 0.15s;
          display: flex; align-items: center; gap: 10px;
          font-family: inherit; font-weight: 400;
        }
        .lang-option:hover { background: rgba(200,240,96,0.1); }
        .lang-option.active { background: rgba(200,240,96,0.18); color: var(--accent); font-weight: 600; }
        .lang-option-label { flex: 1; }
        .lang-option-check { color: var(--accent); font-size: 0.7rem; }
        [data-theme="light"] .lang-current { background: #fff; border-color: rgba(0,0,0,0.12); color: #111; }
        [data-theme="light"] .lang-menu { background: #fff; border-color: rgba(0,0,0,0.1); box-shadow: 0 16px 40px -4px rgba(0,0,0,0.15); }
        [data-theme="light"] .lang-option { color: #111; }
        [data-theme="light"] .lang-option:hover { background: rgba(0,0,0,0.05); }
        [data-theme="light"] .lang-option.active { background: rgba(200,240,96,0.25); color: #5a7000; }

        /* ── FULLSCREEN MOBILE MENU ── */
        .mob-overlay {
          position: fixed;
          inset: 0;
          z-index: 98;
          background: var(--bg);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          opacity: 0;
          clip-path: inset(0 0 100% 0);
          transition:
            opacity 0.45s cubic-bezier(0.16,1,0.3,1),
            clip-path 0.45s cubic-bezier(0.16,1,0.3,1);
          pointer-events: none;
        }
        .mob-overlay.open {
          opacity: 1;
          clip-path: inset(0 0 0% 0);
          pointer-events: all;
        }
        .mob-glow {
          position: absolute;
          top: 15%;
          left: 50%;
          transform: translateX(-50%);
          width: 520px;
          height: 520px;
          background: radial-gradient(ellipse, rgba(200,240,96,0.07) 0%, transparent 70%);
          pointer-events: none;
        }

        /* top bar inside overlay */
        .mob-bar {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.1rem 1.5rem;
          flex-shrink: 0;
        }
        .mob-logo {
          font-family: var(--font-display);
          font-size: 1.05rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--text);
          text-decoration: none;
        }
        .mob-logo span { color: var(--accent); }
        .mob-close {
          width: 38px; height: 38px; border-radius: 50%;
          border: 1px solid var(--border2); background: none;
          cursor: pointer; display: flex; align-items: center;
          justify-content: center; color: var(--text); font-size: 1rem;
          transition: background 0.2s, border-color 0.2s;
        }
        .mob-close:hover { background: var(--bg2); border-color: var(--accent); color: var(--accent); }

        /* ── NAV LINKS CONTAINER ── */
        .mob-links {
          position: relative;
          z-index: 2;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;  /* ← centrira vertikalno */
          align-items: stretch;
          padding: 0 4.5rem;
          gap: 0;
        }

        /* ── INDIVIDUAL LINK ROW ── */
        .mob-link {
          display: flex;
          align-items: center;
          gap: 0;
          padding: 0.6rem 0;
          border-bottom: 1px solid var(--border);
          text-decoration: none;
          color: var(--text);
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 6vw, 2.1rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          opacity: 0;
          transform: translateY(18px);
          transition: color 0.2s, opacity 0.4s ease, transform 0.4s ease;
        }
        .mob-link:first-child { border-top: 1px solid var(--border); }
        .mob-overlay.open .mob-link:nth-child(1) { opacity:1; transform:none; transition-delay: 0.10s; }
        .mob-overlay.open .mob-link:nth-child(2) { opacity:1; transform:none; transition-delay: 0.16s; }
        .mob-overlay.open .mob-link:nth-child(3) { opacity:1; transform:none; transition-delay: 0.22s; }
        .mob-overlay.open .mob-link:nth-child(4) { opacity:1; transform:none; transition-delay: 0.28s; }
        .mob-overlay.open .mob-link:nth-child(5) { opacity:1; transform:none; transition-delay: 0.34s; }
        .mob-link:hover { color: var(--accent); }
        .mob-link.mob-active { color: var(--accent); }

        .mob-link-num {
          width: 3.5rem;
          min-width: 3.5rem;
          flex-shrink: 0;
          font-size: 0.68rem;
          color: var(--muted2);
          font-family: var(--font-body);
          font-weight: 400;
          letter-spacing: 0.06em;
          font-variant-numeric: tabular-nums;
          line-height: 1;
          /* dodaj ovo: */
          text-align: left;
        }
        .mob-link-text {
          flex: 1;
        }
        .mob-link-arrow {
          flex-shrink: 0;
          width: 2rem;
          text-align: right;
          font-size: 1.1rem;
          color: var(--muted2);
          transition: color 0.2s, transform 0.2s;
        }
        .mob-link:hover .mob-link-arrow {
          color: var(--accent);
          transform: translate(3px, -3px);
        }

        /* bottom bar */
        .mob-bottom {
          position: relative;
          z-index: 2;
          padding: 1.25rem 2rem 2rem;
          border-top: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.4s ease 0.4s, transform 0.4s ease 0.4s;
        }
        .mob-overlay.open .mob-bottom { opacity: 1; transform: none; }
        .mob-bottom-langs {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .mob-lang-btn {
          background: var(--bg2);
          border: 1px solid var(--border);
          color: var(--muted);
          padding: 5px 10px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.72rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          display: flex;
          align-items: center;
          gap: 5px;
          transition: all 0.15s;
        }
        .mob-lang-btn.active {
          background: rgba(200,240,96,0.12);
          border-color: rgba(200,240,96,0.3);
          color: var(--accent);
        }
        .mob-theme-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: 1px solid var(--border2);
          border-radius: 10px;
          padding: 0.5rem 0.9rem;
          color: var(--muted);
          font-size: 0.8rem;
          cursor: pointer;
          font-family: inherit;
          transition: color 0.2s, border-color 0.2s;
        }
        .mob-theme-btn:hover { color: var(--text); border-color: var(--border2); }
        .mob-hire-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: var(--accent);
          color: #0a0a0a;
          border-radius: 100px;
          padding: 0.6rem 1.25rem;
          font-size: 0.85rem;
          font-weight: 700;
          font-family: var(--font-display);
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .mob-hire-btn:hover { opacity: 0.85; }
        [data-theme="light"] .mob-overlay { background: var(--bg); }
        [data-theme="light"] .mob-hire-btn { color: #fff; }
      `}</style>

      {/* ── Desktop nav ── */}
      <nav className={scrolled ? "nav--scrolled" : ""}>
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

          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDark ? "☀️" : "🌙"}
          </button>

          <Link to="/hire" className="nav-cta">
            {t.nav_cta || "Start a project"}
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

      {/* ── Fullscreen mobile overlay ── */}
      <div
        className={`mob-overlay${menuOpen ? " open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className="mob-glow" />

        <div className="mob-bar">
          <Link to="/" className="mob-logo" onClick={closeMenu}>
            adiss<span>.</span>dev
          </Link>
          <button
            className="mob-close"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <div className="mob-links">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.section}
              href={link.isRoute ? link.to : `/#${link.section}`}
              className={`mob-link${activeSection === link.section ? " mob-active" : ""}`}
              onClick={(e) => handleNavClick(e, link)}
            >
              <span className="mob-link-num">0{i + 1}</span>
              <span className="mob-link-text">{t[link.labelKey]}</span>
              <span className="mob-link-arrow">↗</span>
            </a>
          ))}
        </div>

        <div className="mob-bottom">
          <div className="mob-bottom-langs">
            {LANGS.map((l) => (
              <button
                key={l.code}
                className={`mob-lang-btn${lang === l.code ? " active" : ""}`}
                onClick={() => {
                  setLang(l.code);
                  closeMenu();
                }}
              >
                <img
                  src={FLAG_IMGS[l.code]}
                  alt={l.label}
                  style={{
                    width: 14,
                    height: 10,
                    objectFit: "cover",
                    borderRadius: 1,
                  }}
                />
                {l.code}
              </button>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              gap: "0.65rem",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <button className="mob-theme-btn" onClick={toggleTheme}>
              {isDark ? "☀️" : "🌙"} {isDark ? "Light" : "Dark"}
            </button>
            <Link to="/hire" className="mob-hire-btn" onClick={closeMenu}>
              Start a project ↗
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
