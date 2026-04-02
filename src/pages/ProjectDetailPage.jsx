import { useParams, Link } from "react-router-dom";
import Nav from "../components/Nav";
import { useEffect } from "react";

const PROJECT_DATA = {
  medibook: {
    title: "MediBook",
    emoji: "🏥",
    tags: ["Next.js", "TypeScript", "Full-stack"],
    liveUrl: "https://medibook-pi.vercel.app/",
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
  },
  "dalmatinske-vizure": {
    title: "Dalmatinske Vizure",
    emoji: "🏠",
    tags: ["Next.js", "TailwindCSS", "Client project"],
    liveUrl: "https://dalmatinske-vizure.com",
    problem:
      "A Croatian real estate agency needed a modern website to showcase luxury properties and generate leads.",
    solution:
      "Delivered a performant, SEO-optimised marketing site with property listings, image galleries, and contact forms.",
    stack: ["Next.js", "TailwindCSS", "Vercel", "Google Analytics"],
    how: "Built with static generation for fast page loads, optimised images via next/image, and a CMS-friendly content structure.",
  },
  "travel-app": {
    title: "Travel App",
    emoji: "✈️",
    tags: ["React", "Node.js", "API integration"],
    liveUrl: "https://travel-app-liard-nine.vercel.app/",
    problem:
      "Travellers had no simple way to discover and plan trips in one place.",
    solution:
      "A React-based travel discovery app with live flight and hotel data powered by external APIs.",
    stack: ["React", "Node.js", "Express", "REST APIs", "CSS Modules"],
    how: "Node.js backend proxies API calls to keep keys secure; React frontend handles state management and renders results dynamically.",
  },
  "duolingo-clone": {
    title: "Duolingo Clone",
    emoji: "📚",
    tags: ["Next.js", "TypeScript", "Gamification"],
    liveUrl: "https://duolingo-clone-orcin.vercel.app/",
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
  },
};

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = PROJECT_DATA[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
    if (project) document.title = `${project.title} — Adis Klobodanovic`;
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
          <Link to="/#work" style={{ color: "var(--accent)" }}>
            ← Back to projects
          </Link>
        </div>
      </>
    );

  return (
    <>
      <style>{`
        .proj-detail { max-width: 780px; margin: 0 auto; padding: 8rem 2rem 5rem; }
        .proj-detail h1 { font-family: var(--font-display); font-size: clamp(2rem, 5vw, 3rem); font-weight: 800; letter-spacing: -0.04em; margin-bottom: 1rem; }
        .proj-section { margin-top: 2.5rem; padding-top: 2.5rem; border-top: 1px solid var(--border); }
        .proj-section h2 { font-family: var(--font-display); font-size: 1rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--muted); margin-bottom: 0.85rem; }
        .proj-section p { color: var(--text); font-weight: 300; line-height: 1.8; font-size: 1rem; }
        .proj-stack { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .proj-stack span { background: var(--bg2); border: 1px solid var(--border); padding: 0.35rem 0.85rem; border-radius: 8px; font-size: 0.82rem; font-family: monospace; color: var(--accent); }
        .proj-live-btn { display: inline-flex; align-items: center; gap: 0.5rem; margin-top: 2rem; background: var(--accent); color: #0a0a0a; padding: 0.75rem 1.5rem; border-radius: 10px; text-decoration: none; font-weight: 700; font-family: var(--font-display); font-size: 0.9rem; transition: opacity 0.2s; }
        .proj-live-btn:hover { opacity: 0.85; }
      `}</style>
      <Nav />
      <div className="proj-detail">
        <Link
          to="/#work"
          style={{
            color: "var(--muted)",
            fontSize: "0.85rem",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.3rem",
            marginBottom: "2rem",
          }}
        >
          ← Back to projects
        </Link>
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            flexWrap: "wrap",
            marginBottom: "1rem",
          }}
        >
          {project.tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
        <h1>
          {project.emoji} {project.title}
        </h1>

        <div className="proj-section">
          <h2>The Problem</h2>
          <p>{project.problem}</p>
        </div>
        <div className="proj-section">
          <h2>The Solution</h2>
          <p>{project.solution}</p>
        </div>
        <div className="proj-section">
          <h2>Tech Stack</h2>
          <div className="proj-stack">
            {project.stack.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </div>
        <div className="proj-section">
          <h2>How It Was Built</h2>
          <p>{project.how}</p>
        </div>
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          className="proj-live-btn"
        >
          View live project ↗
        </a>
      </div>
    </>
  );
}
