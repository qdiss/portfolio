import { useLang } from "../context/LangContext";

const SERVICES = [
  {
    icon: "⚡",
    titleKey: "s1_title",
    descKey: "s1_desc",
    price: "from $600",
    priceKey: "price_onetime",
    tags: ["React", "Next.js", "TailwindCSS"],
    highlight: false,
  },
  {
    icon: "🌐",
    titleKey: "s2_title",
    descKey: "s2_desc",
    price: "from $1,200",
    priceKey: "price_onetime",
    tags: ["SEO", "CMS", "Analytics"],
    highlight: true, // middle card — featured
  },
  {
    icon: "🚀",
    titleKey: "s3_title",
    descKey: "s3_desc",
    price: "from $3,000",
    priceKey: "price_project",
    tags: ["Full-stack", "Auth", "API"],
    highlight: false,
  },
];

export default function Services() {
  const { t } = useLang();
  return (
    <section id="services" style={{ background: "var(--bg2)" }}>
      <style>{`
        .services-grid-new {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          margin-top: 3rem;
          align-items: stretch;
        }
        .svc-card {
          position: relative;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 22px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 0;
          transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
          overflow: hidden;
        }
        .svc-card:hover {
          border-color: var(--border2);
          transform: translateY(-4px);
          box-shadow: 0 20px 60px -12px rgba(0,0,0,0.35);
        }
        .svc-card--featured {
          background: var(--bg);
          border-color: rgba(200,240,96,0.25);
        }
        .svc-card--featured:hover {
          border-color: rgba(200,240,96,0.45);
          box-shadow: 0 20px 60px -12px rgba(200,240,96,0.12);
        }
        .svc-card-glow {
          position: absolute;
          top: -60px;
          right: -60px;
          width: 180px;
          height: 180px;
          background: radial-gradient(circle, rgba(200,240,96,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .svc-featured-badge {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          background: rgba(200,240,96,0.12);
          border: 1px solid rgba(200,240,96,0.25);
          color: var(--accent);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.25rem 0.65rem;
          border-radius: 100px;
        }
        .svc-icon {
          width: 48px;
          height: 48px;
          background: rgba(200,240,96,0.07);
          border: 1px solid rgba(200,240,96,0.14);
          border-radius: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          margin-bottom: 1.35rem;
          flex-shrink: 0;
        }
        .svc-card--featured .svc-icon {
          background: rgba(200,240,96,0.12);
          border-color: rgba(200,240,96,0.22);
        }
        .svc-title {
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-weight: 700;
          letter-spacing: -0.025em;
          margin-bottom: 0.65rem;
        }
        .svc-desc {
          color: var(--muted);
          font-size: 0.875rem;
          line-height: 1.75;
          font-weight: 300;
          flex: 1;
          margin-bottom: 1.5rem;
        }
        .svc-tags {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
          margin-bottom: 1.75rem;
        }
        .svc-tag {
          font-size: 0.68rem;
          padding: 0.18rem 0.6rem;
          background: var(--bg2);
          border: 1px solid var(--border2);
          border-radius: 100px;
          color: var(--muted);
          font-weight: 500;
          letter-spacing: 0.02em;
        }
        .svc-card--featured .svc-tag {
          background: rgba(200,240,96,0.06);
          border-color: rgba(200,240,96,0.18);
          color: var(--accent);
        }
        .svc-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border);
          margin-top: auto;
        }
        .svc-price {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--accent);
        }
        .svc-price-note {
          font-size: 0.72rem;
          color: var(--muted);
          font-weight: 400;
          font-family: var(--font-body);
          margin-top: 0.1rem;
        }
        .svc-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.8rem;
          font-weight: 600;
          font-family: var(--font-display);
          color: var(--muted);
          text-decoration: none;
          transition: color 0.2s;
        }
        .svc-cta:hover { color: var(--accent); }
        .svc-card--featured .svc-cta {
          color: var(--accent);
        }
        [data-theme="light"] .svc-card { background: #fff; border-color: rgba(0,0,0,0.08); }
        [data-theme="light"] .svc-card--featured { border-color: rgba(77,105,0,0.2); }
        [data-theme="light"] .svc-tag { background: rgba(0,0,0,0.05); border-color: rgba(0,0,0,0.1); }
        [data-theme="light"] .svc-card--featured .svc-tag { background: rgba(77,105,0,0.07); border-color: rgba(77,105,0,0.15); color: var(--accent); }
        @media (max-width: 900px) {
          .services-grid-new { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="section-label reveal">{t.serv_label}</div>
      <h2 className="section-title reveal">{t.serv_title}</h2>
      <p className="section-sub reveal">{t.serv_sub}</p>

      <div className="services-grid-new">
        {SERVICES.map((s, i) => (
          <div
            key={s.titleKey}
            className={`svc-card${s.highlight ? " svc-card--featured" : ""} reveal reveal-delay-${i + 1}`}
          >
            {s.highlight && (
              <>
                <div className="svc-card-glow" />
                <span className="svc-featured-badge">Most popular</span>
              </>
            )}
            <div className="svc-icon">{s.icon}</div>
            <div className="svc-title">{t[s.titleKey]}</div>
            <p className="svc-desc">{t[s.descKey]}</p>
            <div className="svc-tags">
              {s.tags.map((tag) => (
                <span key={tag} className="svc-tag">
                  {tag}
                </span>
              ))}
            </div>
            <div className="svc-footer">
              <div>
                <div className="svc-price">{s.price}</div>
                <div className="svc-price-note">{t[s.priceKey]}</div>
              </div>
              <a href="/hire" className="svc-cta">
                Get started ↗
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
