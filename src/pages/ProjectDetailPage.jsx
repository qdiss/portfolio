import { useParams, Link } from "react-router-dom";
import Nav from "../components/Nav";
import { useEffect } from "react";
import { useLang } from "../context/LangContext";
import { useSEO } from "../hooks/useSEO";

const SS = (slug) => `/projects/${slug}.png`;

const PROJECT_DATA = {
  medibook: {
    title: "MediBook",
    emoji: "🏥",
    tags: ["Next.js", "TypeScript", "Full-stack"],
    liveUrl: "https://medibook-pi.vercel.app/",
    year: "2024",
    gradient: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
    problem:
      "Patients struggled to book medical appointments online — existing systems were clunky and didn't work well on mobile.",
    solution:
      "Built a full-stack booking platform with real-time availability, appointment management, and email confirmations.",
    stack: [
      "Next.js 14",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Tailwind CSS",
      "Vercel",
    ],
    how: "Used App Router for server-side rendering, Prisma ORM for database access, and integrated a calendar system for availability management.",
    results: [
      "Real-time slot availability",
      "Email confirmation flow",
      "Mobile-first design",
      "Sub-2s page loads",
    ],
  },
  "dalmatinske-vizure": {
    title: "Dalmatinske Vizure",
    emoji: "🏠",
    tags: ["Next.js", "TailwindCSS", "Client project"],
    liveUrl: "https://dalmatinske-vizure.com",
    year: "2024",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    problem:
      "A Croatian real estate agency needed a modern website to showcase luxury properties and generate leads.",
    solution:
      "Delivered a performant, SEO-optimised marketing site with property listings, image galleries, and contact forms.",
    stack: ["Next.js", "TailwindCSS", "Vercel", "Google Analytics"],
    how: "Built with static generation for fast page loads, optimised images via next/image, and a CMS-friendly content structure.",
    results: [
      "Top 3 Google ranking for local keywords",
      "40% more enquiries vs old site",
      "95+ Lighthouse score",
      "Deployed in 3 weeks",
    ],
  },
  korijen: {
    title: "KORIJEN Leather",
    emoji: "⌚",
    tags: ["HTML/CSS", "JavaScript", "Landing Page"],
    liveUrl: "https://korijen-landing-page.vercel.app/",
    year: "2025",
    gradient: "linear-gradient(135deg, #1a0f08 0%, #3a1e0e 50%, #8b5c35 100%)",
    problem:
      "A Sarajevo leather atelier needed a premium landing page that matched the quality of their handmade watch straps — most templates felt too generic.",
    solution:
      "Designed and built a fully custom single-page site: hero, product collection, materials, process timeline, reviews, and contact — all from scratch.",
    stack: ["HTML5", "CSS3", "Vanilla JS", "Google Fonts", "SVG", "Vercel"],
    how: "No frameworks — pure HTML/CSS/JS. Scroll animations via IntersectionObserver, animated SVG strap illustrations, interactive colour swatches that update the product preview in real time, and a fixed parallax ticker.",
    results: [
      "Premium brand aesthetic",
      "Interactive colour swatches",
      "Scroll-reveal animations",
      "Mobile responsive",
    ],
  },
  "travel-app": {
    title: "Travel App",
    emoji: "✈️",
    tags: ["React", "Node.js", "API integration"],
    liveUrl: "https://travel-app-liard-nine.vercel.app/",
    year: "2023",
    gradient: "linear-gradient(135deg, #134e5e 0%, #71b280 100%)",
    problem:
      "Travellers had no simple way to discover and plan trips in one place.",
    solution:
      "A React-based travel discovery app with live flight and hotel data powered by external APIs.",
    stack: ["React", "Node.js", "Express", "REST APIs", "CSS Modules"],
    how: "Node.js backend proxies API calls to keep keys secure; React frontend handles state management and renders results dynamically.",
    results: [
      "Live flight data",
      "Hotel search & filter",
      "Secure API proxy",
      "Fast React UI",
    ],
  },
  "duolingo-clone": {
    title: "Duolingo Clone",
    emoji: "📚",
    tags: ["Next.js", "TypeScript", "Gamification"],
    liveUrl: "https://duolingo-clone-orcin.vercel.app/",
    year: "2024",
    gradient: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    problem:
      "Wanted to deeply understand gamification mechanics and how platforms like Duolingo keep users engaged.",
    solution:
      "Fully functional language learning app with streaks, hearts, XP system, and lesson progression.",
    stack: [
      "Next.js 14",
      "TypeScript",
      "Drizzle ORM",
      "Clerk Auth",
      "Stripe",
      "Tailwind CSS",
    ],
    how: "Clerk handles authentication, Drizzle manages database schema, and Stripe is integrated for subscription tiers.",
    results: [
      "Full auth with Clerk",
      "Stripe subscription",
      "XP + streak system",
      "Lesson progression",
    ],
  },
  "instagram-clone": {
    title: "Instagram Clone",
    emoji: "📸",
    tags: ["React", "CSS", "Social app"],
    liveUrl: "https://instagram-frontend-lime.vercel.app/",
    year: "2024",
    gradient: "linear-gradient(135deg, #833ab4 0%, #c13584 50%, #fcb045 100%)",
    problem:
      "Wanted to reverse-engineer how a social feed, stories, and engagement mechanics work at the component level.",
    solution:
      "A pixel-faithful Instagram frontend clone with story bubbles, feed posts, likes, comments, and profile navigation.",
    stack: ["React", "CSS Modules", "Vercel"],
    how: "Component-driven architecture with separate Feed, Stories, Post, and Profile components. Shared state for likes, follows, and active user context.",
    results: [
      "Story bubble UI",
      "Like & comment flow",
      "Profile navigation",
      "Responsive layout",
    ],
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
          aspect-ratio: 16 / 9;
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
                  <span className="pd-stat-text">{r}</span>
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
                  <p>{project.problem}</p>
                </div>
                <div className="pd-block reveal">
                  <div className="pd-block-label">
                    {t.proj_solution_label || "The Solution"}
                  </div>
                  <h2>{t.proj_solution_h2 || "What I built"}</h2>
                  <p>{project.solution}</p>
                </div>
                <div className="pd-block reveal">
                  <div className="pd-block-label">
                    {t.proj_how_label || "How It Was Built"}
                  </div>
                  <h2>{t.proj_how_h2 || "Technical approach"}</h2>
                  <p>{project.how}</p>
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