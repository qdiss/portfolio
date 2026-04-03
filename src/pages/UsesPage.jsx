import { useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import { useLang } from "../context/LangContext";
import { useSEO } from "../hooks/useSEO";

const USES_DATA = [
  {
    category: "Editor & Terminal",
    icon: "💻",
    items: [
      {
        name: "VS Code",
        desc: "Daily driver. Clean, fast, and has everything I need.",
      },
      {
        name: "Cursor",
        desc: "AI-powered editor I reach for on complex refactors.",
      },
      {
        name: "Warp",
        desc: "Modern terminal with AI autocomplete — way faster than iTerm.",
      },
    ],
  },
  {
    category: "Stack",
    icon: "⚙️",
    items: [
      {
        name: "Next.js",
        desc: "Default choice for anything client-facing. App Router is great.",
      },
      {
        name: "React",
        desc: "Component model still makes the most sense for complex UIs.",
      },
      {
        name: "TypeScript",
        desc: "Non-negotiable on anything beyond a weekend project.",
      },
      { name: "Tailwind CSS", desc: "Fastest way to go from design to code." },
      {
        name: "Prisma + PostgreSQL",
        desc: "Type-safe DB access without the overhead of a full ORM.",
      },
      {
        name: "Hono",
        desc: "Lightweight Node server when I need an API. Replaces Express.",
      },
    ],
  },
  {
    category: "Design",
    icon: "🎨",
    items: [
      {
        name: "Figma",
        desc: "Wireframes, design tokens, component specs. All in one place.",
      },
      { name: "Framer", desc: "For landing pages and quick client mockups." },
      {
        name: "Coolors",
        desc: "Colour palette exploration before I start any new project.",
      },
    ],
  },
  {
    category: "Productivity",
    icon: "🗂️",
    items: [
      {
        name: "Notion",
        desc: "Project management, client notes, content planning.",
      },
      { name: "Linear", desc: "Issue tracking on larger projects." },
      {
        name: "Arc Browser",
        desc: "Spaces for work vs. personal — changed how I browse.",
      },
      {
        name: "Raycast",
        desc: "App launcher + clipboard history. Can't go back to Spotlight.",
      },
    ],
  },
  {
    category: "Deployment & Infra",
    icon: "🚀",
    items: [
      {
        name: "Vercel",
        desc: "Zero-config deploys for anything in the Next.js ecosystem.",
      },
      {
        name: "Railway",
        desc: "Databases and background services. Simpler than AWS for most things.",
      },
      {
        name: "Cloudflare",
        desc: "DNS, CDN, and edge workers. Fast and cheap.",
      },
    ],
  },
  {
    category: "Hardware",
    icon: "🖥️",
    items: [
      {
        name: "MacBook Pro M3",
        desc: "Fast, silent, battery lasts all day. Best dev machine I've owned.",
      },
      { name: 'LG 27" 4K', desc: "External monitor for when I'm at the desk." },
      {
        name: "Logitech MX Keys",
        desc: "Low-profile mechanical feel. Pairs to 3 devices.",
      },
    ],
  },
];

export default function UsesPage() {
  const { t } = useLang();

  useSEO({
    title: "Uses — Tools & Stack | Adis Klobodanovic",
    description:
      "The tools, hardware, and software I use every day as a full-stack developer — editor, stack, design, productivity, and deployment.",
    canonical: "https://adiss.dev/uses",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Uses — Adis Klobodanovic";

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
        .uses-page {
          max-width: 860px;
          margin: 0 auto;
          padding: 8rem 2.5rem 6rem;
        }
        .uses-hero {
          margin-bottom: 5rem;
        }
        .uses-intro {
          color: var(--muted);
          font-size: 1rem;
          font-weight: 300;
          line-height: 1.85;
          max-width: 520px;
          margin-top: 1rem;
        }
        .uses-section {
          margin-bottom: 3.5rem;
        }
        .uses-section-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border);
        }
        .uses-section-icon {
          font-size: 1.2rem;
          line-height: 1;
        }
        .uses-section-title {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: var(--text);
        }
        .uses-items {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .uses-item {
          display: flex;
          align-items: baseline;
          gap: 1.25rem;
          padding: 0.9rem 0;
          border-bottom: 1px solid var(--border);
          transition: opacity 0.2s;
        }
        .uses-item:last-child { border-bottom: none; }
        .uses-item:hover { opacity: 0.8; }
        .uses-item-name {
          font-family: var(--font-display);
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--accent);
          min-width: 160px;
          flex-shrink: 0;
        }
        .uses-item-desc {
          font-size: 0.875rem;
          color: var(--muted);
          font-weight: 300;
          line-height: 1.65;
        }
        .uses-footer {
          margin-top: 4rem;
          padding-top: 2.5rem;
          border-top: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .uses-footer-text {
          font-size: 0.82rem;
          color: var(--muted2);
          font-weight: 300;
        }
        @media (max-width: 600px) {
          .uses-page { padding: 7rem 1.5rem 4rem; }
          .uses-item { flex-direction: column; gap: 0.3rem; }
          .uses-item-name { min-width: unset; }
        }
      `}</style>

      <Nav />

      <div className="uses-page">
        <div className="uses-hero reveal">
          <div className="section-label">{t.uses_label || "Setup"}</div>
          <h1 className="section-title">
            {t.uses_title || "What I use"}
            <br />
            <em>{t.uses_sub || "day to day."}</em>
          </h1>
          <p className="uses-intro">
            {t.uses_intro ||
              "Tools, hardware, and software I actually use. Updated when something changes."}{" "}
            <a
              href="https://uses.tech"
              target="_blank"
              rel="noreferrer"
              style={{ color: "var(--accent)" }}
            >
              uses.tech
            </a>
            .
          </p>
        </div>

        {USES_DATA.map((section, si) => (
          <div
            key={section.category}
            className={`uses-section reveal reveal-delay-${(si % 3) + 1}`}
          >
            <div className="uses-section-header">
              <span className="uses-section-icon">{section.icon}</span>
              <span className="uses-section-title">{section.category}</span>
            </div>
            <div className="uses-items">
              {section.items.map((item) => (
                <div key={item.name} className="uses-item">
                  <span className="uses-item-name">{item.name}</span>
                  <span className="uses-item-desc">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="uses-footer reveal">
          <span className="uses-footer-text">
            {t.uses_footer_text || "Last updated April 2026"}
          </span>
          <Link
            to="/"
            style={{
              fontSize: "0.85rem",
              color: "var(--muted)",
              textDecoration: "none",
            }}
          >
            {t.uses_back || "← Back to home"}
          </Link>
        </div>
      </div>
    </>
  );
}
