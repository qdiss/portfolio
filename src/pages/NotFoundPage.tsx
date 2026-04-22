import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import { useLang } from "../context/LangContext";

export default function NotFoundPage() {
  const { t } = useLang();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `404 — ${t.nf_title || "Page not found"} · adiss.dev`;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate, t.nf_title]);

  return (
    <>
      <style>{`
        .nf-wrap {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 8rem 2rem 5rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .nf-glow {
          position: absolute;
          top: 20%;
          left: 50%;
          transform: translateX(-50%);
          width: 500px;
          height: 500px;
          background: radial-gradient(ellipse, rgba(200,240,96,0.06) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }
        .nf-inner {
          position: relative;
          z-index: 1;
          max-width: 540px;
        }
        .nf-label {
          font-size: 0.72rem;
          color: var(--accent);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 500;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .nf-code {
          font-family: var(--font-display);
          font-size: clamp(5rem, 18vw, 10rem);
          font-weight: 800;
          letter-spacing: -0.06em;
          line-height: 0.9;
          margin-bottom: 1.5rem;
          color: var(--text);
          position: relative;
        }
        .nf-code span {
          color: var(--accent);
        }
        .nf-title {
          font-family: var(--font-display);
          font-size: clamp(1.3rem, 3vw, 1.75rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          margin-bottom: 1rem;
          color: var(--text);
        }
        .nf-sub {
          color: var(--muted);
          font-size: 0.95rem;
          font-weight: 300;
          line-height: 1.8;
          margin-bottom: 2.5rem;
        }
        .nf-actions {
          display: flex;
          gap: 1rem;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 3rem;
        }
        .nf-countdown {
          font-size: 0.78rem;
          color: var(--muted2);
          font-weight: 300;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .nf-countdown-num {
          font-family: var(--font-display);
          font-weight: 700;
          color: var(--muted);
          font-variant-numeric: tabular-nums;
          min-width: 1.2ch;
          display: inline-block;
        }
        .nf-links {
          margin-top: 3.5rem;
          padding-top: 2rem;
          border-top: 1px solid var(--border);
          display: flex;
          gap: 2rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .nf-link {
          font-size: 0.85rem;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.2s;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        .nf-link:hover { color: var(--accent); }
        @media (max-width: 600px) {
          .nf-wrap { padding: 7rem 1.5rem 4rem; }
        }
      `}</style>

      <Nav />

      <div className="nf-wrap">
        <div className="nf-glow" />
        <div className="nf-inner">
          <div className="nf-label">
            <span className="pulse-dot" style={{ width: 6, height: 6 }} />
            {t.nf_error_label || "Error"}
          </div>

          <div className="nf-code">
            4<span>0</span>4
          </div>

          <h1 className="nf-title">{t.nf_title || "Page not found"}</h1>

          <p className="nf-sub">
            {t.nf_sub_1 || "Looks like this page doesn't exist — or it moved."}
            <br />
            {t.nf_sub_2 || "Let's get you back somewhere useful."}
          </p>

          <div className="nf-actions">
            <Link to="/" className="btn-primary">
              ← {t.nf_back_home || "Back to home"}
            </Link>
            <Link to="/hire" className="btn-secondary">
              {t.nf_start_project || "Start a project"}
            </Link>
          </div>

          <div className="nf-countdown">
            <span>{t.nf_redirect_prefix || "Redirecting to home in"}</span>
            <span className="nf-countdown-num">{countdown}</span>
            <span>{t.nf_redirect_suffix || "seconds..."}</span>
          </div>

          <div className="nf-links">
            <Link to="/#work" className="nf-link">
              ↗ {t.nav_work || "Projects"}
            </Link>
            <Link to="/blog" className="nf-link">
              ↗ {t.nav_blog || "Blog"}
            </Link>
            <Link to="/#about" className="nf-link">
              ↗ {t.nav_about || "About"}
            </Link>
            <Link to="/#contact" className="nf-link">
              ↗ {t.nav_contact || "Contact"}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
