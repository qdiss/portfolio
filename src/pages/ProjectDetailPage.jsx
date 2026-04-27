//src/pages/ProjectDetailPage.jsx
import { useParams, Link } from "react-router-dom";
import Nav from "../components/Nav";
import { useEffect } from "react";
import { useLang } from "../context/LangContext";
import { useSEO } from "../hooks/useSEO";

const SS = (slug) => `/projects/${slug}.webp`;

const PROJECT_DATA = {
  medibook: {
    title: "MediBook",
    emoji: "🏥",
    tags: ["Next.js", "TypeScript", "Full-stack"],
    liveUrl: "https://medibook-pi.vercel.app/",
    year: "2024",
    gradient: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
    problemKey: "p1_problem",
    solutionKey: "p1_solution",
    howKey: "p1_how",
    stack: [
      "Next.js 14",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Tailwind CSS",
      "Vercel",
    ],
    results: ["p1_r1", "p1_r2", "p1_r3", "p1_r4"],
  },
  "dalmatinske-vizure": {
    title: "Dalmatinske Vizure",
    emoji: "🏠",
    tags: ["Next.js", "TailwindCSS", "Client project"],
    liveUrl: "https://dalmatinske-vizure.com",
    year: "2024",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    problemKey: "p2_problem",
    solutionKey: "p2_solution",
    howKey: "p2_how",
    stack: ["Next.js", "TailwindCSS", "Vercel", "Google Analytics"],
    results: ["p2_r1", "p2_r2", "p2_r3", "p2_r4"],
  },
  korijen: {
    title: "Korijen Leather",
    emoji: "⌚",
    tags: ["HTML/CSS", "JavaScript", "Landing Page"],
    liveUrl: "https://korijen-landing-page.vercel.app/",
    year: "2025",
    gradient: "linear-gradient(135deg, #1a0f08 0%, #3a1e0e 50%, #8b5c35 100%)",
    problemKey: "p5_problem",
    solutionKey: "p5_solution",
    howKey: "p5_how",
    stack: ["HTML5", "CSS3", "Vanilla JS", "Google Fonts", "SVG", "Vercel"],
    results: ["p5_r1", "p5_r2", "p5_r3", "p5_r4"],
  },
  "travel-app": {
    title: "Travel App",
    emoji: "✈️",
    tags: ["React", "Node.js", "API integration"],
    liveUrl: "https://travel-app-liard-nine.vercel.app/",
    year: "2023",
    gradient: "linear-gradient(135deg, #134e5e 0%, #71b280 100%)",
    problemKey: "p3_problem",
    solutionKey: "p3_solution",
    howKey: "p3_how",
    stack: ["React", "Node.js", "Express", "REST APIs", "CSS Modules"],
    results: ["p3_r1", "p3_r2", "p3_r3", "p3_r4"],
  },
  "duolingo-clone": {
    title: "Duolingo Clone",
    emoji: "📚",
    tags: ["Next.js", "TypeScript", "Gamification"],
    liveUrl: "https://duolingo-clone-orcin.vercel.app/",
    year: "2024",
    gradient: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    problemKey: "p4_problem",
    solutionKey: "p4_solution",
    howKey: "p4_how",
    stack: [
      "Next.js 14",
      "TypeScript",
      "Drizzle ORM",
      "Clerk Auth",
      "Stripe",
      "Tailwind CSS",
    ],
    results: ["p4_r1", "p4_r2", "p4_r3", "p4_r4"],
  },
  "instagram-clone": {
    title: "Instagram Clone",
    emoji: "📸",
    tags: ["React", "CSS", "Social app"],
    liveUrl: "https://instagram-frontend-lime.vercel.app/",
    year: "2024",
    gradient: "linear-gradient(135deg, #833ab4 0%, #c13584 50%, #fcb045 100%)",
    problemKey: "p6_problem",
    solutionKey: "p6_solution",
    howKey: "p6_how",
    stack: ["React", "CSS Modules", "Vercel"],
    results: ["p6_r1", "p6_r2", "p6_r3", "p6_r4"],
  },
};

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const { t } = useLang();
  const project = PROJECT_DATA[slug];

  useSEO({
    title: project
      ? `${project.title} — Adis Klobodanovic`
      : "Project not found — Adis Klobodanovic",
    description: project?.problem || "",
    canonical: project
      ? `https://adiss.dev/contents/projects/${slug}`
      : undefined,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (project) document.title = `${project.title} — Adis Klobodanovic`;
    else document.title = "Project not found — Adis Klobodanovic";

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.08 },
    );
    const timer = setTimeout(() => {
      document
        .querySelectorAll(".reveal")
        .forEach((el) => observer.observe(el));
    }, 50);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [project]);

  if (!project)
    return (
      <>
        <Nav />
        <div
          style={{
            maxWidth: 700,
            margin: "0 auto",
            padding: "8rem 2rem",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2rem",
              marginBottom: "1rem",
            }}
          >
            Project not found
          </h1>
          <Link to="/contents/projects" style={{ color: "var(--accent)" }}>
            ← Back to projects
          </Link>
        </div>
      </>
    );

  return (
    <>
      <style>{`
        .pd-page {
          min-height: 100vh;
        }

        /* ── HERO ── */
        .pd-hero {
          min-height: 52vh;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 9rem 4rem 3.5rem;
          position: relative;
          overflow: hidden;
        }
        .pd-hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .pd-hero-screenshot {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
          opacity: 0.18;
          filter: saturate(0.7) blur(1px);
          z-index: 1;
        }
        .pd-hero-gradient {
          position: absolute;
          inset: 0;
          z-index: 2;
          opacity: 0.7;
        }
        .pd-hero-noise {
          position: absolute;
          inset: 0;
          z-index: 3;
          background: linear-gradient(to bottom, transparent 30%, var(--bg) 100%);
        }
        .pd-hero-content {
          position: relative;
          z-index: 4;
          max-width: 1100px;
          width: 100%;
          margin: 0 auto;
        }
        .pd-back {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.82rem;
          color: var(--muted);
          text-decoration: none;
          margin-bottom: 2rem;
          transition: color 0.2s;
        }
        .pd-back:hover { color: var(--accent); }
        .pd-tags-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 1rem;
        }
        .pd-year {
          font-size: 0.72rem;
          color: var(--muted2);
          font-weight: 300;
          letter-spacing: 0.04em;
        }
        .pd-hero h1 {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1;
          margin-bottom: 0;
          color: var(--text);
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .pd-emoji {
          font-size: clamp(2rem, 5vw, 3.5rem);
          line-height: 1;
        }

        /* ── BODY ── */
        .pd-body {
          padding: 0 4rem 6rem;
        }
        .pd-inner {
          max-width: 1100px;
          margin: 0 auto;
        }

        /* ── SCREENSHOT PREVIEW ── */
        .pd-preview {
          margin: 3rem 0 0;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid var(--border);
          box-shadow: 0 20px 60px rgba(0,0,0,0.25);
          position: relative;
        }
        .pd-preview-bar {
          background: var(--bg2);
          border-bottom: 1px solid var(--border);
          padding: 0.65rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .pd-preview-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .pd-preview-url {
          flex: 1;
          text-align: center;
          font-size: 0.72rem;
          color: var(--muted2);
          font-family: monospace;
        }
        .pd-preview img {
          width: 100%;
          display: block;
          // aspect-ratio: 16 / 9;
          object-fit: cover;
          object-position: top;
        }

        /* ── QUICK STATS ROW ── */
        .pd-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: var(--border);
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          margin: 3rem 0;
        }
        .pd-stat {
          background: var(--bg2);
          padding: 1.25rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .pd-stat-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          flex-shrink: 0;
        }
        .pd-stat-text {
          font-size: 0.82rem;
          color: var(--muted);
          font-weight: 300;
          line-height: 1.4;
        }

        /* ── CONTENT GRID ── */
        .pd-content-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 4rem;
          align-items: start;
        }

        /* ── SECTION BLOCKS ── */
        .pd-block {
          padding: 2.5rem 0;
          border-bottom: 1px solid var(--border);
        }
        .pd-block:last-child { border-bottom: none; }
        .pd-block-label {
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--accent);
          font-weight: 600;
          margin-bottom: 0.75rem;
        }
        .pd-block h2 {
          font-family: var(--font-display);
          font-size: 1.35rem;
          font-weight: 700;
          letter-spacing: -0.025em;
          margin-bottom: 0.85rem;
        }
        .pd-block p {
          color: var(--muted);
          font-weight: 300;
          line-height: 1.85;
          font-size: 1rem;
        }

        /* ── ASIDE CARDS ── */
        .pd-aside-card {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 1.5rem;
          margin-bottom: 1.25rem;
        }
        .pd-aside-card-title {
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--muted);
          font-weight: 600;
          margin-bottom: 1rem;
        }
        .pd-stack-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
        }
        .pd-chip {
          background: var(--bg);
          border: 1px solid var(--border2);
          padding: 0.3rem 0.75rem;
          border-radius: 8px;
          font-size: 0.78rem;
          font-family: monospace;
          color: var(--accent);
          letter-spacing: 0.02em;
        }
        .pd-live-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--accent);
          color: #0a0a0a;
          padding: 0.9rem 1.25rem;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 700;
          font-family: var(--font-display);
          font-size: 0.9rem;
          transition: opacity 0.2s, transform 0.2s;
          margin-bottom: 1rem;
        }
        .pd-live-btn:hover { opacity: 0.88; transform: translateY(-1px); }
        .pd-back-link {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          padding: 0.75rem;
          border: 1px solid var(--border2);
          border-radius: 12px;
          color: var(--muted);
          text-decoration: none;
          font-size: 0.85rem;
          transition: color 0.2s, border-color 0.2s;
        }
        .pd-back-link:hover { color: var(--text); border-color: var(--border2); }

        [data-theme="light"] .pd-aside-card { background: #fff; border-color: rgba(0,0,0,0.08); }
        [data-theme="light"] .pd-stat { background: #fff; }
        [data-theme="light"] .pd-chip { background: rgba(0,0,0,0.04); border-color: rgba(0,0,0,0.1); }
        [data-theme="light"] .pd-live-btn { color: #fff; }
        [data-theme="light"] .pd-preview { box-shadow: 0 8px 30px rgba(0,0,0,0.1); }

        @media (max-width: 900px) {
          .pd-hero { padding: 7rem 1.5rem 2.5rem; }
          .pd-body { padding: 0 1.5rem 4rem; }
          .pd-content-grid { grid-template-columns: 1fr; gap: 2rem; }
          .pd-aside { order: -1; }
          .pd-stats { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 500px) {
          .pd-stats { grid-template-columns: 1fr; }
        }
      `}</style>

      <Nav />

      <div className="pd-page">
        {/* ── Hero ── */}
        <div className="pd-hero">
          <div
            className="pd-hero-bg"
            style={{ background: project.gradient }}
          />
          <img
            className="pd-hero-screenshot"
            src={SS(slug)}
            alt=""
            aria-hidden="true"
          />
          <div
            className="pd-hero-gradient"
            style={{ background: project.gradient }}
          />
          <div className="pd-hero-noise" />
          <div className="pd-hero-content">
            <Link to="/contents/projects" className="pd-back reveal">
              {t.proj_back_all || "← All projects"}
            </Link>
            <div className="pd-tags-row reveal">
              <span className="pd-year">{project.year}</span>
              {project.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="reveal">
              <span className="pd-emoji">{project.emoji}</span>
              {project.title}
            </h1>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="pd-body">
          <div className="pd-inner">
            {/* Browser-frame screenshot preview */}
            <div className="pd-preview reveal">
              <div className="pd-preview-bar">
                <div
                  className="pd-preview-dot"
                  style={{ background: "#ff5f57" }}
                />
                <div
                  className="pd-preview-dot"
                  style={{ background: "#ffbd2e" }}
                />
                <div
                  className="pd-preview-dot"
                  style={{ background: "#28c840" }}
                />
                <span className="pd-preview-url">{project.liveUrl}</span>
              </div>
              <img
                src={SS(slug)}
                alt={`${project.title} live preview`}
                loading="lazy"
              />
            </div>

            {/* Quick results row */}
            <div className="pd-stats reveal">
              {project.results.map((r) => (
                <div key={r} className="pd-stat">
                  <div className="pd-stat-dot" />
                  <span className="pd-stat-text">{t[r]}</span>
                </div>
              ))}
            </div>

            {/* Main grid */}
            <div className="pd-content-grid">
              {/* Main content */}
              <div className="pd-main">
                <div className="pd-block reveal">
                  <div className="pd-block-label">
                    {t.proj_problem_label || "The Problem"}
                  </div>
                  <h2>{t.proj_problem_h2 || "What needed solving"}</h2>
                  <p>{t[project.problemKey]}</p>
                </div>
                <div className="pd-block reveal">
                  <div className="pd-block-label">
                    {t.proj_solution_label || "The Solution"}
                  </div>
                  <h2>{t.proj_solution_h2 || "What I built"}</h2>
                  <p>{t[project.solutionKey]}</p>
                </div>
                <div className="pd-block reveal">
                  <div className="pd-block-label">
                    {t.proj_how_label || "How It Was Built"}
                  </div>
                  <h2>{t.proj_how_h2 || "Technical approach"}</h2>
                  <p>{t[project.howKey]}</p>
                </div>
              </div>

              {/* Aside */}
              <div className="pd-aside reveal reveal-delay-2">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pd-live-btn"
                >
                  {t.proj_view_live || "View live project"}
                  <span>↗</span>
                </a>
                <Link to="/contents/projects" className="pd-back-link">
                  {t.proj_back_all || "← Back to all projects"}
                </Link>

                <div className="pd-aside-card" style={{ marginTop: "1.25rem" }}>
                  <div className="pd-aside-card-title">
                    {t.proj_tech_stack || "Tech Stack"}
                  </div>
                  <div className="pd-stack-chips">
                    {project.stack.map((s) => (
                      <span key={s} className="pd-chip">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pd-aside-card">
                  <div className="pd-aside-card-title">
                    {t.proj_tags || "Tags"}
                  </div>
                  <div className="pd-stack-chips">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  className="pd-aside-card"
                  style={{
                    background: "rgba(200,240,96,0.04)",
                    borderColor: "rgba(200,240,96,0.15)",
                  }}
                >
                  <div
                    className="pd-aside-card-title"
                    style={{ color: "var(--accent)" }}
                  >
                    {t.proj_want_cta_title || "Want something like this?"}
                  </div>
                  <p
                    style={{
                      fontSize: "0.82rem",
                      color: "var(--muted)",
                      fontWeight: 300,
                      lineHeight: 1.65,
                      marginBottom: "1rem",
                    }}
                  >
                    {t.proj_want_cta_body ||
                      "I build projects like this for clients. Let's talk about what you need."}
                  </p>
                  <Link
                    to="/hire"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      fontSize: "0.82rem",
                      color: "var(--accent)",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    {t.proj_want_cta_link || "Start a project ↗"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
