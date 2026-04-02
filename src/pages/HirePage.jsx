import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../context/LangContext";
import Nav from "../components/Nav";

function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let rafId;
    let current = 0;
    const fn = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const total = scrollHeight - clientHeight;
      const target = total > 0 ? (scrollTop / total) * 100 : 0;
      // lerp — smooth follow
      current += (target - current) * 0.12;
      setP(current);
      rafId = requestAnimationFrame(fn);
    };
    rafId = requestAnimationFrame(fn);
    return () => cancelAnimationFrame(rafId);
  }, []);
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        height: "2px",
        width: `${p}%`,
        background: "var(--accent)",
        pointerEvents: "none",
        boxShadow:
          "0 0 10px rgba(200,240,96,0.6), 0 0 4px rgba(200,240,96,0.4)",
        willChange: "width",
      }}
    />
  );
}

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.08 },
    );
    const observe = () =>
      document
        .querySelectorAll(".reveal")
        .forEach((el) => observer.observe(el));
    observe();
    const t = setTimeout(observe, 200);
    return () => {
      observer.disconnect();
      clearTimeout(t);
    };
  }, []);
}

//TODO: Add this
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const BUDGETS = ["< $1k", "$1k – $3k", "$3k – $8k", "$8k+", "Not sure yet"];

const inputStyle = {
  width: "100%",
  padding: "0.8rem 1rem",
  borderRadius: "10px",
  border: "1px solid var(--border)",
  background: "var(--card-bg, var(--bg2))",
  color: "var(--text)",
  fontSize: "0.9rem",
  fontFamily: "inherit",
  transition: "border-color 0.2s",
  boxSizing: "border-box",
};

function ContactForm({ t }) {
  const formRef = useRef(null);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");
    const data = Object.fromEntries(new FormData(formRef.current));
    try {
      if (EMAILJS_SERVICE_ID !== "YOUR_SERVICE_ID") {
        const { default: emailjs } = await import("@emailjs/browser");
        await emailjs.sendForm(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          formRef.current,
          EMAILJS_PUBLIC_KEY,
        );
      } else {
        const subject = encodeURIComponent(`Project inquiry from ${data.name}`);
        const body = encodeURIComponent(
          `Name: ${data.name}\nEmail: ${data.from_email}\nBudget: ${data.budget}\n\n${data.message}`,
        );
        window.location.href = `mailto:adis.klobodanovic@gmail.com?subject=${subject}&body=${body}`;
      }
      formRef.current.reset();
      setDone(true);
    } catch {
      setError(
        "Something went wrong. Email me directly at adis.klobodanovic@gmail.com",
      );
    } finally {
      setSending(false);
    }
  };

  if (done)
    return (
      <div
        style={{
          textAlign: "center",
          padding: "3rem",
          background: "rgba(200,240,96,0.05)",
          border: "1px solid rgba(200,240,96,0.2)",
          borderRadius: "18px",
        }}
      >
        <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>✓</div>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.4rem",
            marginBottom: "0.5rem",
          }}
        >
          {t.hire_msg_received_title}
        </h3>
        <p style={{ color: "var(--muted)", fontWeight: 300 }}>
          {t.hire_msg_received_sub}
        </p>
      </div>
    );

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
      >
        <input
          name="name"
          type="text"
          placeholder={t.hire_name}
          required
          style={inputStyle}
        />
        <input
          name="from_email"
          type="email"
          placeholder={t.hire_email}
          required
          style={inputStyle}
        />
      </div>
      <select name="budget" required defaultValue="" style={inputStyle}>
        <option value="" disabled>
          {t.hire_budget}
        </option>
        {BUDGETS.map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>
      <textarea
        name="message"
        placeholder={t.hire_message}
        required
        style={{ ...inputStyle, minHeight: "130px", resize: "vertical" }}
      />
      {error && (
        <p style={{ color: "#e74c3c", fontSize: "0.85rem" }}>{error}</p>
      )}
      <button
        type="submit"
        disabled={sending}
        className="btn-primary"
        style={{
          cursor: sending ? "not-allowed" : "pointer",
          opacity: sending ? 0.6 : 1,
        }}
      >
        {sending ? t.hire_sending : t.hire_send}
      </button>
    </form>
  );
}

const PACKAGES = [
  {
    name: "Landing Page",
    price: "from $600",
    timeline: "1 – 2 weeks",
    popular: false,
    desc: "Fast, focused, conversion-ready. One page that does one job well.",
    includes: [
      "Custom design",
      "Mobile-first",
      "Contact form",
      "Basic SEO",
      "1 revision round",
    ],
    tag: null,
  },
  {
    name: "Web Application",
    price: "from $3,000",
    timeline: "4 – 8 weeks",
    popular: true,
    desc: "SaaS, booking systems, dashboards, internal tools. Full stack end-to-end.",
    includes: [
      "Auth + database",
      "Admin panel",
      "API integration",
      "Testing",
      "2 revision rounds",
      "Full handover docs",
    ],
    tag: "Most booked",
  },
  {
    name: "Business Website",
    price: "from $1,200",
    timeline: "2 – 3 weeks",
    popular: false,
    desc: "Multi-page with structure, SEO, and something that makes your business look serious online.",
    includes: [
      "Up to 6 pages",
      "Blog (optional)",
      "SEO basics",
      "Google Analytics",
      "2 revision rounds",
    ],
    tag: null,
  },
];

const STEPS = [
  {
    n: "01",
    title: "You reach out",
    body: "Fill the form below or email me directly. Tell me roughly what you need — doesn't have to be a full brief. A paragraph is enough to start.",
  },
  {
    n: "02",
    title: "Discovery call",
    body: "15 – 30 minutes. Free. I ask questions, you talk through the project. No pitch, no deck. We figure out together if it's a fit.",
  },
  {
    n: "03",
    title: "Written proposal",
    body: "Scope, timeline, price — all in writing, before anything starts. You can say no. If the scope changes later, we discuss it before the price does.",
  },
  {
    n: "04",
    title: "Kickoff",
    body: "50% upfront, then work starts. You get a private preview link early — usually within the first few days. Real progress you can see, not status updates.",
  },
  {
    n: "05",
    title: "Build phase",
    body: "Weekly updates without you having to ask. Feedback rounds are structured, not open-ended. Each round has a clear scope to avoid endless iteration.",
  },
  {
    n: "06",
    title: "Launch",
    body: "I handle deployment. We test together. Once you're happy, remaining payment is due.",
  },
  {
    n: "07",
    title: "Handover",
    body: "You get everything: code, credentials, documentation. I don't retain access to anything. If you need ongoing help, we agree a rate upfront.",
  },
];

const NEED_FROM_YOU = [
  {
    icon: "📄",
    title: "A clear brief",
    body: "What it does, who it's for, what success looks like. Doesn't need to be perfect — but the vaguer the brief, the wider the scope estimate.",
  },
  {
    icon: "⚡",
    title: "Fast feedback",
    body: "48h to respond to preview links and questions during the build. Projects stall when feedback takes a week. Your deadline is mine.",
  },
  {
    icon: "🖊️",
    title: "Content ready",
    body: "Text, logos, photos. If you don't have them, say so upfront — we can plan around it or add copywriting to scope.",
  },
  {
    icon: "👤",
    title: "One decision-maker",
    body: "One person who can approve things. Not a committee. Design-by-committee is where projects go to die and budgets go to grow.",
  },
];

const WONT_DO = [
  "Hourly billing with no cap or scope",
  "Starting work without a signed brief",
  "Rush jobs that skip QA and testing",
  "Taking on more than I can deliver well",
];

export default function HirePage() {
  const { t } = useLang();
  useReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Start a project — Adis Klobodanovic";
  }, []);

  return (
    <>
      <style>{`
        .hire-section { padding: 5rem 2.5rem; max-width: 900px; margin: 0 auto; }
        .hire-section-wide { padding: 5rem 2.5rem; max-width: 1100px; margin: 0 auto; }
        .hire-divider { height: 1px; background: var(--border); margin: 0 2.5rem; }
        .pkg-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.25rem; margin-top: 2.5rem; }
        .pkg-card { background: var(--bg2); border: 1px solid var(--border); border-radius: 20px; padding: 2rem; position: relative; transition: border-color 0.2s, transform 0.2s; }
        .pkg-card:hover { border-color: var(--border2); transform: translateY(-3px); }
        .pkg-card.popular { border-color: rgba(200,240,96,0.35); background: rgba(200,240,96,0.03); }
        .pkg-badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: var(--accent); color: #0a0a0a; font-size: 0.68rem; font-weight: 700; padding: 0.2rem 0.75rem; border-radius: 100px; letter-spacing: 0.06em; text-transform: uppercase; white-space: nowrap; }
        .pkg-name { font-family: var(--font-display); font-size: 1.1rem; font-weight: 700; letter-spacing: -0.02em; margin-bottom: 0.35rem; }
        .pkg-price { font-family: var(--font-display); font-size: 1.85rem; font-weight: 800; color: var(--accent); letter-spacing: -0.04em; line-height: 1; margin-bottom: 0.3rem; }
        .pkg-timeline { font-size: 0.78rem; color: var(--muted); margin-bottom: 1rem; }
        .pkg-desc { font-size: 0.875rem; color: var(--muted); font-weight: 300; line-height: 1.65; margin-bottom: 1.25rem; }
        .pkg-includes { list-style: none; display: flex; flex-direction: column; gap: 0.45rem; }
        .pkg-includes li { font-size: 0.82rem; color: var(--muted); display: flex; align-items: center; gap: 0.5rem; }
        .pkg-includes li::before { content: '✓'; color: var(--accent); font-weight: 700; flex-shrink: 0; }
        .steps-list { display: flex; flex-direction: column; gap: 0; margin-top: 2.5rem; }
        .step-row { display: grid; grid-template-columns: 56px 1fr; gap: 1.5rem; padding: 1.75rem 0; border-bottom: 1px solid var(--border); align-items: start; }
        .step-row:last-child { border-bottom: none; }
        .step-num { font-family: var(--font-display); font-size: 1rem; color: var(--accent); font-weight: 700; letter-spacing: 0.08em; padding-top: 0.3rem; }
        .step-title { font-family: var(--font-display); font-size: 1.05rem; font-weight: 600; letter-spacing: -0.02em; margin-bottom: 0.4rem; }
        .step-body { color: var(--muted); font-size: 0.9rem; font-weight: 300; line-height: 1.75; }
        .needs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-top: 2.5rem; }
        .need-card { background: var(--bg2); border: 1px solid var(--border); border-radius: 16px; padding: 1.5rem; }
        .need-icon { font-size: 1.4rem; margin-bottom: 0.65rem; display: block; }
        .need-title { font-family: var(--font-display); font-size: 0.95rem; font-weight: 600; letter-spacing: -0.02em; margin-bottom: 0.4rem; }
        .need-body { color: var(--muted); font-size: 0.875rem; font-weight: 300; line-height: 1.65; }
        .wont-list { list-style: none; display: flex; flex-direction: column; gap: 0.6rem; margin-top: 1.5rem; }
        .wont-list li { color: var(--muted); font-size: 0.9rem; display: flex; align-items: center; gap: 0.65rem; font-weight: 300; }
        .wont-list li::before { content: '—'; color: var(--muted2); flex-shrink: 0; }
        .hire-form-wrap { background: var(--bg2); border: 1px solid var(--border); border-radius: 24px; padding: 2.5rem; }
        .hire-hero-glow { position: absolute; top: -100px; right: -80px; width: 500px; height: 500px; background: radial-gradient(circle, rgba(200,240,96,0.07) 0%, transparent 65%); pointer-events: none; }
        /* Light mode input fixes */
        [data-theme="light"] input, [data-theme="light"] select, [data-theme="light"] textarea {
          background: #fff !important;
          color: #111 !important;
          border-color: rgba(0,0,0,0.15) !important;
        }
        [data-theme="light"] input::placeholder, [data-theme="light"] textarea::placeholder { color: #888 !important; }
        [data-theme="light"] .need-card, [data-theme="light"] .hire-form-wrap, [data-theme="light"] .pkg-card { background: #fff; border-color: rgba(0,0,0,0.1); }
        @media(max-width: 768px) {
          .pkg-grid { grid-template-columns: 1fr; }
          .needs-grid { grid-template-columns: 1fr; }
          .hire-section, .hire-section-wide { padding: 3.5rem 1.5rem; }
          .hire-divider { margin: 0 1.5rem; }
          .step-row { grid-template-columns: 42px 1fr; }
        }
          [data-theme="light"] .pkg-badge,
          [data-theme="light"] button[type="submit"].btn-primary,
          [data-theme="light"] a.btn-primary {
            color: #ffffff !important;
          }
      `}</style>

      <ScrollProgress />
      <Nav />

      {/* Hero */}
      <section
        style={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "8rem 2.5rem 4rem",
          position: "relative",
          // overflow: "hidden",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <div className="hire-hero-glow" />
        <div className="hero-tag reveal">
          <div className="pulse-dot" />
          <span>{t.hire_tag}</span>
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.6rem,6vw,5rem)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            marginBottom: "1.5rem",
          }}
          className="reveal"
        >
          {t.hire_h1_1}
          <br />
          <em
            style={{
              fontStyle: "italic",
              color: "var(--muted)",
              fontWeight: 400,
            }}
          >
            {t.hire_h1_2}
          </em>
        </h1>
        <p
          style={{
            fontSize: "1.05rem",
            color: "var(--muted)",
            fontWeight: 300,
            lineHeight: 1.85,
            maxWidth: "520px",
            marginBottom: "2.5rem",
          }}
          className="reveal"
        >
          {t.hire_intro}
        </p>
        <div className="reveal">
          <a href="#form" className="btn-primary">
            {t.hire_skip}
          </a>
        </div>
      </section>

      <div className="hire-divider" />

      {/* What's included */}
      <div className="hire-section">
        <div className="section-label reveal">{t.hire_std_label}</div>
        <h2 className="section-title reveal">
          {t.hire_std_title_1}
          <br />
          <em>{t.hire_std_title_2}</em>
        </h2>
        <p
          style={{
            color: "var(--muted)",
            fontWeight: 300,
            lineHeight: 1.85,
            marginBottom: "2.5rem",
            maxWidth: "520px",
          }}
          className="reveal"
        >
          {t.hire_std_sub}
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
          className="reveal"
        >
          {[
            [
              "Direct access",
              "You talk to me. Not an account manager, not a junior. I answer messages myself.",
            ],
            [
              "Written scope",
              "Scope, price, and timeline agreed in writing before anything starts. No surprises.",
            ],
            [
              "Live preview link",
              "You see the project early. Real progress you can click through, not status updates.",
            ],
            [
              "Feedback rounds",
              "Structured review rounds so feedback stays focused and iteration doesn't go in circles.",
            ],
            [
              "Full ownership",
              "Code, domain, accounts — all yours after handover. I retain nothing.",
            ],
            [
              "Post-launch window",
              "2 weeks of included fixes after delivery. Real bugs, not scope creep.",
            ],
          ].map(([title, body]) => (
            <div
              key={title}
              style={{
                background: "var(--bg2)",
                border: "1px solid var(--border)",
                borderRadius: "14px",
                padding: "1.35rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.45rem",
                }}
              >
                <span style={{ color: "var(--accent)", fontWeight: 700 }}>
                  ✓
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {title}
                </span>
              </div>
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: "0.855rem",
                  fontWeight: 300,
                  lineHeight: 1.65,
                }}
              >
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="hire-divider" />

      {/* Packages */}
      <div className="hire-section-wide">
        <div className="section-label reveal">{t.hire_pricing_label}</div>
        <h2 className="section-title reveal">
          {t.hire_pricing_title_1}
          <br />
          <em>{t.hire_pricing_title_2}</em>
        </h2>
        <p
          style={{
            color: "var(--muted)",
            fontWeight: 300,
            lineHeight: 1.85,
            maxWidth: "520px",
          }}
          className="reveal"
        >
          {t.hire_pricing_sub}
        </p>
        <div className="pkg-grid reveal">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.name}
              className={`pkg-card${pkg.popular ? " popular" : ""}`}
            >
              {pkg.tag && <div className="pkg-badge">{pkg.tag}</div>}
              <div className="pkg-name">{pkg.name}</div>
              <div className="pkg-price">{pkg.price}</div>
              <div className="pkg-timeline">⏱ {pkg.timeline}</div>
              <p className="pkg-desc">{pkg.desc}</p>
              <ul className="pkg-includes">
                {pkg.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p
          style={{
            marginTop: "1.5rem",
            color: "var(--muted)",
            fontSize: "0.82rem",
            fontWeight: 300,
          }}
        >
          Every project gets a written quote. These are starting points, not
          ceilings or floors.
        </p>
      </div>

      <div className="hire-divider" />

      {/* Selected work */}
      <div className="hire-section-wide">
        <div className="section-label reveal">{t.hire_work_label}</div>
        <h2 className="section-title reveal">
          {t.hire_work_title_1}
          <br />
          <em>{t.hire_work_title_2}</em>
        </h2>
        <p
          style={{
            color: "var(--muted)",
            fontWeight: 300,
            lineHeight: 1.85,
            maxWidth: "520px",
          }}
          className="reveal"
        >
          {t.hire_work_sub}
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: "1.25rem",
            marginTop: "2.5rem",
          }}
          className="reveal"
        >
          {[
            {
              emoji: "🏥",
              tags: ["Next.js", "TypeScript", "Full-stack"],
              title: t.p1_title,
              desc: t.p1_desc,
              href: "https://medibook-pi.vercel.app/",
              link: t.proj_view,
            },
            {
              emoji: "🏠",
              tags: ["Next.js", "TailwindCSS", "Client project"],
              title: t.p2_title,
              desc: t.p2_desc,
              href: "https://dalmatinske-vizure.com",
              link: t.proj_live,
            },
          ].map((p) => (
            <a
              key={p.href}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="project-card"
            >
              <div className="project-img" style={{ background: "var(--bg3)" }}>
                <span style={{ fontSize: "2.5rem" }}>{p.emoji}</span>
              </div>
              <div className="project-body">
                <div className="project-tags">
                  {p.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="project-link">{p.link}</div>
              </div>
            </a>
          ))}
        </div>
        <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
          <Link
            to="/"
            style={{
              fontSize: "0.85rem",
              color: "var(--muted)",
              textDecoration: "none",
              borderBottom: "1px solid var(--border)",
            }}
          >
            {t.hire_see_all}
          </Link>
        </div>
      </div>

      <div className="hire-divider" />

      {/* Process */}
      <div className="hire-section">
        <div className="section-label reveal">{t.hire_proc_label}</div>
        <h2 className="section-title reveal">
          {t.hire_proc_title_1}
          <br />
          <em>{t.hire_proc_title_2}</em>
        </h2>
        <p
          style={{
            color: "var(--muted)",
            fontWeight: 300,
            lineHeight: 1.85,
            maxWidth: "520px",
          }}
          className="reveal"
        >
          {t.hire_proc_sub}
        </p>
        <div className="steps-list">
          {STEPS.map((step, i) => (
            <div
              key={step.n}
              className={`step-row reveal reveal-delay-${(i % 4) + 1}`}
            >
              <div className="step-num">{step.n}</div>
              <div>
                <div className="step-title">{step.title}</div>
                <div className="step-body">{step.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hire-divider" />

      {/* What I need from you */}
      <div className="hire-section">
        <div className="section-label reveal">{t.hire_exp_label}</div>
        <h2 className="section-title reveal">
          {t.hire_exp_title_1}
          <br />
          <em>{t.hire_exp_title_2}</em>
        </h2>
        <p
          style={{
            color: "var(--muted)",
            fontWeight: 300,
            lineHeight: 1.85,
            maxWidth: "520px",
          }}
          className="reveal"
        >
          {t.hire_exp_sub}
        </p>
        <div className="needs-grid">
          {NEED_FROM_YOU.map((item, i) => (
            <div
              key={item.title}
              className={`need-card reveal reveal-delay-${(i % 3) + 1}`}
            >
              <span className="need-icon">{item.icon}</span>
              <div className="need-title">{item.title}</div>
              <p className="need-body">{item.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="hire-divider" />

      {/* What I won't do */}
      <div className="hire-section">
        <div className="section-label reveal">{t.hire_limits_label}</div>
        <h2 className="section-title reveal">
          {t.hire_limits_title_1}
          <br />
          <em>{t.hire_limits_title_2}</em>
        </h2>
        <p
          style={{
            color: "var(--muted)",
            fontWeight: 300,
            lineHeight: 1.85,
            maxWidth: "520px",
            marginBottom: "0.5rem",
          }}
          className="reveal"
        >
          {t.hire_limits_sub}
        </p>
        <ul className="wont-list reveal">
          {WONT_DO.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="hire-divider" />

      {/* Contact form */}
      <div id="form" className="hire-section">
        <div className="section-label reveal">{t.hire_start_label}</div>
        <h2 className="section-title reveal">
          {t.hire_start_title_1}
          <br />
          <em>{t.hire_start_title_2}</em>
        </h2>
        <p
          style={{
            color: "var(--muted)",
            fontWeight: 300,
            lineHeight: 1.85,
            maxWidth: "520px",
            marginBottom: "2.5rem",
          }}
          className="reveal"
        >
          {t.hire_start_sub}
        </p>
        <div className="hire-form-wrap reveal">
          <ContactForm t={t} />
        </div>
        <p
          style={{
            marginTop: "1rem",
            color: "var(--muted)",
            fontSize: "0.82rem",
            fontWeight: 300,
            textAlign: "center",
          }}
        >
          {t.hire_prefer_email}{" "}
          <a
            href="mailto:adis.klobodanovic@gmail.com"
            style={{ color: "var(--accent)" }}
          >
            adis.klobodanovic@gmail.com
          </a>
        </p>
      </div>

      <div
        style={{
          borderTop: "1px solid var(--border)",
          padding: "2rem 2.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          color: "var(--muted)",
          fontSize: "0.8rem",
        }}
      >
        <Link
          to="/"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            color: "var(--text)",
            textDecoration: "none",
            letterSpacing: "-0.02em",
          }}
        >
          adiss<span style={{ color: "var(--accent)" }}>.</span>dev
        </Link>
        <span>© {new Date().getFullYear()} Adis Klobodanovic</span>
        <Link to="/" style={{ color: "var(--muted)", textDecoration: "none" }}>
          {t.hire_back}
        </Link>
      </div>
    </>
  );
}
