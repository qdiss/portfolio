import { useLang } from "../context/LangContext";

// ── Update these with real LinkedIn URLs when available ───────────────────────
const TESTIMONIALS = [
  {
    key: "t1",
    initials: "MK",
    name: "Marko K.",
    role: "Owner",
    company: "Dalmatinske Vizure",
    linkedIn: null, // 'https://linkedin.com/in/...' when you have it
  },
  {
    key: "t2",
    initials: "TN",
    name: "Tarik N.",
    role: "Startup founder",
    company: null,
    linkedIn: null,
  },
  {
    key: "t3",
    initials: "JS",
    name: "Jana S.",
    role: "Product Manager",
    company: null,
    linkedIn: null,
  },
];

// Avatar colours — rotate through these
const AVATAR_COLORS = [
  { bg: "rgba(200,240,96,0.12)", color: "var(--accent)" },
  { bg: "rgba(96,180,240,0.1)", color: "#60b4f0" },
  { bg: "rgba(240,160,96,0.1)", color: "#f0a060" },
];

export default function Testimonials() {
  const { t } = useLang();

  return (
    <section style={{ background: "var(--bg2)" }}>
      <style>{`
        .t-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 3.5rem;
        }
        .t-header-left {}
        .t-social-proof {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.78rem;
          color: var(--muted);
          font-weight: 300;
        }
        .t-avatars-stack {
          display: flex;
        }
        .t-avatar-mini {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--bg3);
          border: 2px solid var(--bg2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.62rem;
          font-weight: 700;
          font-family: var(--font-display);
          margin-left: -8px;
        }
        .t-avatars-stack .t-avatar-mini:first-child { margin-left: 0; }
        .testimonial-card {
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 2rem;
          background: var(--bg);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          transition: border-color 0.25s, transform 0.25s;
        }
        .testimonial-card:hover {
          border-color: var(--border2);
          transform: translateY(-2px);
        }
        .t-quote {
          font-family: var(--font-display);
          font-size: 3rem;
          line-height: 0.7;
          color: var(--accent);
          opacity: 0.5;
          font-weight: 800;
        }
        .t-text {
          color: var(--text);
          font-weight: 300;
          line-height: 1.8;
          font-size: 0.95rem;
          flex: 1;
        }
        .t-author {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border);
        }
        .t-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.78rem;
          font-weight: 700;
          font-family: var(--font-display);
          flex-shrink: 0;
        }
        .t-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text);
          font-family: var(--font-display);
        }
        .t-role {
          font-size: 0.78rem;
          color: var(--muted);
          font-weight: 300;
          margin-top: 0.1rem;
        }
        .t-linkedin {
          margin-left: auto;
          color: var(--muted2);
          text-decoration: none;
          font-size: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          transition: color 0.2s;
          flex-shrink: 0;
        }
        .t-linkedin:hover { color: #0077b5; }
        .t-linkedin svg { width: 13px; height: 13px; fill: currentColor; }
        [data-theme="light"] .testimonial-card { background: #fff; }
      `}</style>

      <div className="t-header reveal">
        <div className="t-header-left">
          <div className="section-label">{t.test_label}</div>
          <h2 className="section-title">{t.test_title}</h2>
        </div>
        <div className="t-social-proof reveal">
          <div className="t-avatars-stack">
            {TESTIMONIALS.map((tm, i) => (
              <div
                key={tm.key}
                className="t-avatar-mini"
                style={{
                  background: AVATAR_COLORS[i % AVATAR_COLORS.length].bg,
                  color: AVATAR_COLORS[i % AVATAR_COLORS.length].color,
                }}
              >
                {tm.initials}
              </div>
            ))}
          </div>
          <span>Real clients, real feedback</span>
        </div>
      </div>

      <div className="testimonials-grid">
        {TESTIMONIALS.map((tm, i) => (
          <div
            key={tm.key}
            className={`testimonial-card reveal reveal-delay-${i + 1}`}
          >
            <div className="t-quote">"</div>
            <p className="t-text">{t[`${tm.key}_text`]}</p>
            <div className="t-author">
              <div
                className="t-avatar"
                style={{
                  background: AVATAR_COLORS[i % AVATAR_COLORS.length].bg,
                  color: AVATAR_COLORS[i % AVATAR_COLORS.length].color,
                }}
              >
                {tm.initials}
              </div>
              <div>
                <div className="t-name">{tm.name}</div>
                <div className="t-role">
                  {tm.role}
                  {tm.company ? `, ${tm.company}` : ""}
                </div>
              </div>
              {tm.linkedIn && (
                <a
                  href={tm.linkedIn}
                  target="_blank"
                  rel="noreferrer"
                  className="t-linkedin"
                  title={`${tm.name} on LinkedIn`}
                >
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
