import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useLang } from "../context/LangContext";

const LANGS = ["en", "bs", "de", "fr", "nl", "sv"];
const NAV_LINKS = [
  { to: "/#about", labelKey: "nav_about" },
  { to: "/#services", labelKey: "nav_services" },
  { to: "/#work", labelKey: "nav_work" },
  { to: "/#blog", labelKey: "nav_blog" },
  { to: "/#contact", labelKey: "nav_contact" },
];

export default function Nav() {
  const { isDark, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const langRef = useRef(null);

  const closeMenu = () => setMenuOpen(false);

  // Click outside za language dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Active section tracking (radi i na glavnom sajtu)
  useEffect(() => {
    const observers = [];
    const visible = new Map();

    const update = () => {
      let top = null;
      visible.forEach((ratio, id) => {
        if (ratio > 0 && (!top || ratio > visible.get(top))) top = id;
      });
      setActiveSection(top || "");
    };

    NAV_LINKS.forEach(({ to }) => {
      const id = to.replace("/#", "");
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          visible.set(id, entry.intersectionRatio);
          update();
        },
        { threshold: [0, 0.1, 0.25, 0.5], rootMargin: "-60px 0px -30% 0px" },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      <style>{`
        .nav-links a.nav-active { color: var(--accent); }
        .nav-links a.nav-active::after { width: 100% !important; background: var(--accent); }

        /* Language dropdown */
        .lang-dropdown { position: relative; display: inline-block; }
        .lang-current {
          background: none;
          border: 1px solid var(--border);
          color: var(--muted);
          font-size: 0.75rem;
          padding: 0.4rem 0.75rem;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
          transition: all 0.2s;
          font-family: inherit;
        }
        .lang-current:hover {
          border-color: var(--accent);
          color: var(--text);
        }
        .lang-menu {
          position: absolute;
          top: calc(100% + 6px);
          right: 0;
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 6px;
          box-shadow: 0 12px 32px -4px rgba(0,0,0,0.3);
          z-index: 1100;
          min-width: 100px;
          display: flex;
          flex-direction: column;
        }
        .lang-option {
          background: none;
          border: none;
          width: 100%;
          text-align: left;
          padding: 8px 16px;
          color: var(--text);
          font-size: 0.78rem;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .lang-option:hover { background: rgba(200,240,96,0.12); }
        .lang-option.active {
          background: rgba(200,240,96,0.2);
          color: var(--accent);
          font-weight: 600;
        }

        /* Hamburger & mobile menu – poboljšano */
        .hamburger span { background: var(--text); height: 2px; }
        .mobile-menu {
          box-shadow: 0 10px 30px rgba(0,0,0,0.4);
          border-top: 1px solid var(--border);
        }
        .mobile-menu a {
          font-size: 1.05rem;
          padding: 1rem 0;
        }
      `}</style>

      <nav>
        <Link to="/" className="nav-logo">
          adis<span>.</span>dev
        </Link>

        <ul className="nav-links">
          {NAV_LINKS.map(({ to, labelKey }) => (
            <li key={to}>
              <Link
                to={to}
                className={
                  activeSection === to.replace("/#", "") ? "nav-active" : ""
                }
                onClick={closeMenu}
              >
                {t[labelKey]}
              </Link>
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
              {lang.toUpperCase()}
              <span style={{ fontSize: "0.7em", opacity: 0.6 }}>▼</span>
            </button>

            {langOpen && (
              <div className="lang-menu">
                {LANGS.map((l) => (
                  <button
                    key={l}
                    className={`lang-option ${lang === l ? "active" : ""}`}
                    onClick={() => {
                      setLang(l);
                      setLangOpen(false);
                    }}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme toggle – popravljene ikone */}
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDark ? "☀️" : "🌙"}
          </button>

          <Link to="/hire" className="nav-cta">
            Start a project →
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
        {NAV_LINKS.map(({ to, labelKey }) => (
          <Link key={to} to={to} onClick={closeMenu}>
            {t[labelKey]}
          </Link>
        ))}
      </div>
    </>
  );
}
