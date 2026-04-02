import { useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";

// Keep this in sync with ProjectDetailPage.jsx PROJECT_DATA
const PROJECTS = [
  {
    slug: "medibook",
    title: "MediBook",
    emoji: "🏥",
    tags: ["Next.js", "TypeScript", "Full-stack"],
    excerpt:
      "Full-stack medical appointment booking platform with real-time availability and email confirmations.",
    liveUrl: "https://medibook-pi.vercel.app/",
    year: "2024",
  },
  {
    slug: "dalmatinske-vizure",
    title: "Dalmatinske Vizure",
    emoji: "🏠",
    tags: ["Next.js", "TailwindCSS", "Client project"],
    excerpt:
      "Performant, SEO-optimised marketing site for a Croatian real estate agency — property listings, image galleries, lead generation.",
    liveUrl: "https://dalmatinske-vizure.com",
    year: "2024",
  },
  {
    slug: "travel-app",
    title: "Travel App",
    emoji: "✈️",
    tags: ["React", "Node.js", "API integration"],
    excerpt:
      "React travel discovery app with live flight and hotel data powered by third-party APIs.",
    liveUrl: "https://travel-app-liard-nine.vercel.app/",
    year: "2023",
  },
  {
    slug: "duolingo-clone",
    title: "Duolingo Clone",
    emoji: "📚",
    tags: ["Next.js", "TypeScript", "Gamification"],
    excerpt:
      "Fully functional language learning app with streaks, hearts, XP system — built to understand gamification mechanics.",
    liveUrl: "https://duolingo-clone-orcin.vercel.app/",
    year: "2024",
  },
];

export default function ProjectsListingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Projects — Adis Klobodanovic";

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
  }, []);

  return (
    <>
      <style>{`
        .projects-listing {
          max-width: 860px;
          margin: 0 auto;
          padding: 8rem 2.5rem 6rem;
        }
        .projects-listing-hero {
          margin-bottom: 4rem;
        }
        .project-row {
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: start;
          gap: 1.5rem;
          padding: 2rem 0;
          border-bottom: 1px solid var(--border);
          text-decoration: none;
          color: inherit;
          transition: opacity 0.2s;
          cursor: pointer;
        }
        .project-row:first-of-type { border-top: 1px solid var(--border); }
        .project-row:hover .project-row-title { color: var(--accent); }
        .project-row:hover { opacity: 0.85; }
        .project-row-left {}
        .project-row-meta {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.6rem;
          flex-wrap: wrap;
        }
        .project-row-year {
          font-size: 0.72rem;
          color: var(--muted2);
          font-weight: 300;
          font-variant-numeric: tabular-nums;
        }
        .project-row-emoji {
          font-size: 1rem;
          line-height: 1;
        }
        .project-row-title {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: -0.025em;
          margin-bottom: 0.5rem;
          transition: color 0.2s;
          color: var(--text);
        }
        .project-row-excerpt {
          color: var(--muted);
          font-size: 0.875rem;
          font-weight: 300;
          line-height: 1.75;
          max-width: 560px;
          margin-bottom: 0.85rem;
        }
        .project-row-tags {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
        }
        .project-row-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.75rem;
          padding-top: 0.2rem;
        }
        .project-row-arrow {
          font-size: 1.1rem;
          color: var(--accent);
          line-height: 1;
          transition: transform 0.2s;
        }
        .project-row:hover .project-row-arrow { transform: translate(3px, -3px); }
        .project-row-live {
          font-size: 0.75rem;
          color: var(--muted2);
          text-decoration: none;
          transition: color 0.2s;
          white-space: nowrap;
        }
        .project-row-live:hover { color: var(--accent); }
        .projects-listing-footer {
          margin-top: 3.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }
        @media (max-width: 600px) {
          .projects-listing { padding: 7rem 1.5rem 4rem; }
          .project-row { grid-template-columns: 1fr; }
          .project-row-right { flex-direction: row; align-items: center; }
        }
      `}</style>

      <Nav />

      <div className="projects-listing">
        <div className="projects-listing-hero reveal">
          <div className="section-label">Work</div>
          <h1 className="section-title">
            Projects I've
            <br />
            <em>shipped.</em>
          </h1>
          <p className="section-sub">
            A selection of client work and personal projects — click any to see
            the full case study.
          </p>
        </div>

        {PROJECTS.map((project, i) => (
          <Link
            key={project.slug}
            to={`/contents/projects/${project.slug}`}
            className={`project-row reveal reveal-delay-${(i % 3) + 1}`}
          >
            <div className="project-row-left">
              <div className="project-row-meta">
                <span className="project-row-emoji">{project.emoji}</span>
                <span className="project-row-year">{project.year}</span>
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="project-row-title">{project.title}</div>
              <p className="project-row-excerpt">{project.excerpt}</p>
            </div>
            <div className="project-row-right">
              <span className="project-row-arrow">↗</span>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="project-row-live"
                onClick={(e) => e.stopPropagation()}
              >
                Live ↗
              </a>
            </div>
          </Link>
        ))}

        <div className="projects-listing-footer reveal">
          <span
            style={{
              fontSize: "0.82rem",
              color: "var(--muted2)",
              fontWeight: 300,
            }}
          >
            {PROJECTS.length} projects
          </span>
          <Link
            to="/"
            style={{
              fontSize: "0.85rem",
              color: "var(--muted)",
              textDecoration: "none",
            }}
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </>
  );
}
