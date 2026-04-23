import { useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import { useLang } from "../context/LangContext";
import { useSEO } from "../hooks/useSEO";
import {
  MenuSquareIcon,
  ZapIcon,
  PaletteIcon,
  FileIcon,
  RocketIcon,
  ServerIcon,
} from "../components/Icons";

const USES_DATA = [
  {
    index: "01",
    categoryKey: "uses_cat_editor",
    icon: MenuSquareIcon,
    items: [
      { name: "VS Code", descKey: "uses_vscode_desc" },
      { name: "WebStorm", descKey: "uses_webstorm_desc" },
    ],
  },
  {
    index: "02",
    categoryKey: "uses_cat_stack",
    icon: ZapIcon,
    wide: true,
    items: [
      { name: "Next.js", descKey: "uses_nextjs_desc" },
      { name: "React", descKey: "uses_react_desc" },
      { name: "TypeScript", descKey: "uses_typescript_desc" },
      { name: "JavaScript", descKey: "uses_javascript_desc" },
      { name: "Tailwind CSS", descKey: "uses_tailwind_desc" },
      { name: "Shadcn-UI", descKey: "uses_shadcn_desc" },
      { name: "Drizzle", descKey: "uses_drizzle_desc" },
      { name: "Prisma + PostgreSQL", descKey: "uses_prisma_desc" },
      { name: "Supabase", descKey: "uses_supabase_desc" },
      { name: "Hono", descKey: "uses_hono_desc" },
      { name: "Node / Express", descKey: "uses_node_desc" },
      { name: "Clerk", descKey: "uses_clerk_desc" },
    ],
  },
  {
    index: "03",
    categoryKey: "uses_cat_design",
    icon: PaletteIcon,
    items: [{ name: "Figma", descKey: "uses_figma_desc" }],
  },
  {
    index: "04",
    categoryKey: "uses_cat_productivity",
    icon: FileIcon,
    items: [
      { name: "Notion", descKey: "uses_notion_desc" },
      { name: "Arc Browser", descKey: "uses_arc_desc" },
    ],
  },
  {
    index: "05",
    categoryKey: "uses_cat_infra",
    icon: RocketIcon,
    items: [
      { name: "Vercel", descKey: "uses_vercel_desc" },
      { name: "Cloudflare", descKey: "uses_cloudflare_desc" },
    ],
  },
  {
    index: "06",
    categoryKey: "uses_cat_hardware",
    icon: ServerIcon,
    items: [
      { name: "MacBook", descKey: "uses_macbook_desc" },
      { name: "Asus Laptop", descKey: "uses_asus_desc" },
      { name: "PC", descKey: "uses_pc_desc" },
    ],
  },
];

export default function UsesPage() {
  const { t } = useLang();

  useSEO({
    title: t.uses_seo_title || "Uses — Tools & Stack | Adis Klobodanović",
    description:
      t.uses_seo_desc || "The tools, hardware, and software I use every day as a full-stack developer.",
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
      { threshold: 0.05 },
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
        /* ─── Page shell ─── */
        .uses-page {
          max-width: 860px;
          margin: 0 auto;
          padding: 8rem 2.5rem 7rem;
        }

        /* ─── Hero ─── */
        .uses-hero {
          margin-bottom: 5rem;
        }
        .uses-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 1.25rem;
        }
        .uses-eyebrow::before {
          content: '';
          display: block;
          width: 20px;
          height: 1px;
          background: var(--accent);
          opacity: 0.6;
        }
        .uses-h1 {
          font-family: var(--font-display);
          font-size: clamp(2.4rem, 5vw, 3.6rem);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: var(--text);
          margin: 0 0 1.25rem;
        }
        .uses-h1 em {
          font-style: italic;
          color: var(--accent);
        }
        .uses-lead {
          font-size: 0.93rem;
          font-weight: 300;
          color: var(--muted);
          line-height: 1.8;
          max-width: 440px;
        }
        .uses-lead a {
          color: var(--text);
          text-decoration: underline;
          text-decoration-color: rgba(200,240,96,0.3);
          text-underline-offset: 3px;
          transition: text-decoration-color 0.2s;
        }
        .uses-lead a:hover {
          text-decoration-color: var(--accent);
        }

        /* ─── Section rows ─── */
        .uses-sections {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .uses-section {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 2rem;
          padding: 2.5rem 0;
          border-top: 1px solid var(--border);
          align-items: start;
        }

        /* Left column (label) */
        .uses-section-meta {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding-top: 0.15rem;
          position: sticky;
          top: 5rem;
        }
        .uses-section-num {
          font-family: var(--font-display);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--muted2, var(--muted));
          opacity: 0.5;
        }
        .uses-section-label {
          font-family: var(--font-display);
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text);
          letter-spacing: -0.01em;
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }
        .uses-section-icon {
          font-size: 0.95rem;
        }

        /* Right column (items) */
        .uses-section-content {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        /* ─── Regular items ─── */
        .uses-item {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem 1.5rem;
          align-items: baseline;
          padding: 0.9rem 0;
          border-bottom: 1px solid var(--border);
        }
        .uses-item:first-child { padding-top: 0; }
        .uses-item:last-child { border-bottom: none; padding-bottom: 0; }

        .uses-item-name {
          font-family: var(--font-display);
          font-size: 0.88rem;
          font-weight: 650;
          color: var(--text);
          letter-spacing: -0.01em;
        }
        .uses-item-desc {
          font-size: 0.82rem;
          color: var(--muted);
          font-weight: 300;
          line-height: 1.55;
        }

        /* ─── Stack (wide) chips ─── */
        .uses-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          padding-top: 0.1rem;
        }
        .uses-chip {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          padding: 0.6rem 0.9rem;
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 10px;
          cursor: default;
          transition: border-color 0.2s, background 0.2s;
          min-width: 130px;
          flex: 1 1 130px;
          max-width: 220px;
        }
        .uses-chip:hover {
          border-color: rgba(200,240,96,0.3);
          background: rgba(200,240,96,0.04);
        }
        .uses-chip-name {
          font-family: var(--font-display);
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--accent);
          letter-spacing: -0.01em;
        }
        .uses-chip-desc {
          font-size: 0.75rem;
          color: var(--muted);
          font-weight: 300;
          line-height: 1.5;
        }

        /* ─── Footer ─── */
        .uses-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid var(--border);
        }
        .uses-footer-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.77rem;
          color: var(--muted);
          font-weight: 300;
        }
        .uses-footer-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          opacity: 0.7;
          flex-shrink: 0;
        }
        .uses-back {
          font-size: 0.82rem;
          color: var(--muted);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          transition: color 0.2s;
        }
        .uses-back:hover { color: var(--text); }

        /* ─── Light theme tweaks ─── */
        [data-theme="light"] .uses-chip { background: #fff; }

        /* ─── Reveal animation ─── */
        .reveal {
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .reveal-delay-1 { transition-delay: 0.05s; }
        .reveal-delay-2 { transition-delay: 0.1s; }
        .reveal-delay-3 { transition-delay: 0.15s; }
        .reveal-delay-4 { transition-delay: 0.2s; }
        .reveal-delay-5 { transition-delay: 0.25s; }

        /* ─── Responsive ─── */
        @media (max-width: 680px) {
          .uses-page { padding: 6.5rem 1.4rem 5rem; }
          .uses-section {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .uses-section-meta { position: static; }
          .uses-item {
            grid-template-columns: 1fr;
            gap: 0.2rem;
          }
          .uses-chip { max-width: none; }
        }
      `}</style>

      <Nav />

      <div className="uses-page">
        {/* ── Hero ── */}
        <div className="uses-hero reveal">
          <div className="uses-eyebrow">{t.uses_label || "Setup"}</div>
          <h1 className="uses-h1">
            {t.uses_title || "What I use"}
            <br />
            <em>{t.uses_sub || "day to day."}</em>
          </h1>
          <p className="uses-lead">
            {t.uses_intro ||
              "Tools, hardware, and software I actually reach for — no filler."}{" "}
            Listed on{" "}
            <a href="https://uses.tech" target="_blank" rel="noopener noreferrer">
              uses.tech
            </a>
            .
          </p>
        </div>

        {/* ── Sections ── */}
        <div className="uses-sections">
          {USES_DATA.map((section, si) => (
            <div
              key={section.categoryKey}
              className={`uses-section reveal reveal-delay-${(si % 5) + 1}`}
            >
              {/* Left: label */}
              <div className="uses-section-meta">
                <span className="uses-section-num">{section.index}</span>
                <span className="uses-section-label">
                  <span className="uses-section-icon">
                    <section.icon size={14} />
                  </span>
                  {t[section.categoryKey]}
                </span>
              </div>

              {/* Right: content */}
              <div className="uses-section-content">
                {section.wide ? (
                  /* Stack → chips */
                  <div className="uses-chips">
                    {section.items.map((item) => (
                      <div key={item.name} className="uses-chip">
                        <span className="uses-chip-name">{item.name}</span>
                        <span className="uses-chip-desc">
                          {t[item.descKey]}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Regular → rows */
                  section.items.map((item) => (
                    <div key={item.name} className="uses-item">
                      <span className="uses-item-name">{item.name}</span>
                      <span className="uses-item-desc">{t[item.descKey]}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ── Footer ── */}
        <div className="uses-footer reveal">
          <span className="uses-footer-badge">
            <span className="uses-footer-dot" />
            {t.uses_footer_text || "Last updated April 2026"}
          </span>
          <Link to="/" className="uses-back">
            {t.uses_back || "Back to home"}
          </Link>
        </div>
      </div>
    </>
  );
}
