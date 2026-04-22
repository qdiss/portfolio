import { useNavigate } from "react-router-dom";
import { useLang } from "../context/LangContext";
import { ZapIcon, GlobeIcon, RocketIcon, ArrowUpRightIcon } from "./Icons";

const PACKAGES = [
  {
    id: "starter",
    icon: ZapIcon,
    nameKey: "pkg_starter_name",
    descKey: "pkg_starter_short",
    price: "150 KM",
    highlight: false,
  },
  {
    id: "business",
    icon: GlobeIcon,
    nameKey: "pkg_business_name",
    descKey: "pkg_business_short",
    price: "350 KM",
    highlight: true,
  },
  {
    id: "premium",
    icon: RocketIcon,
    nameKey: "pkg_premium_name",
    descKey: "pkg_premium_short",
    price: "600 KM",
    highlight: false,
  },
];

export default function Services() {
  const { t } = useLang();
  const navigate = useNavigate();
  return (
    <section
      id="services"
      className="services-section"
      style={{ background: "var(--bg2)" }}
    >
      <style>{`
        .services-section {
          position: relative;
          overflow: hidden;
        }
        .services-section::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 12% 18%, rgba(200,240,96,0.08), transparent 28%),
            radial-gradient(circle at 88% 78%, rgba(200,240,96,0.05), transparent 24%);
          pointer-events: none;
        }
        .svc-card {
          position: relative;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0)),
            var(--bg);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 26px;
          padding: 2rem 2rem 1.8rem;
          display: flex;
          flex-direction: column;
          gap: 0;
          min-height: 320px;
          transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s, background 0.25s;
          overflow: hidden;
          backdrop-filter: blur(10px);
          z-index: 1;
        }
        .svc-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(200,240,96,0.06), transparent 35%, transparent 70%, rgba(255,255,255,0.02));
          opacity: 0.7;
          pointer-events: none;
        }
        .svc-card:hover {
          border-color: rgba(200,240,96,0.16);
          transform: translateY(-6px);
          box-shadow: 0 26px 80px -22px rgba(0,0,0,0.52);
        }
        .svc-card--featured {
          border-color: rgba(200,240,96,0.3);
          background:
            linear-gradient(180deg, rgba(200,240,96,0.07), rgba(200,240,96,0.015) 35%, rgba(255,255,255,0) 100%),
            var(--bg);
        }
        .svc-card--featured:hover {
          border-color: rgba(200,240,96,0.5);
          box-shadow: 0 30px 90px -24px rgba(200,240,96,0.16);
        }
        .svc-card-glow {
          position: absolute;
          top: -80px;
          right: -80px;
          width: 220px;
          height: 220px;
          background: radial-gradient(circle, rgba(200,240,96,0.16) 0%, transparent 68%);
          pointer-events: none;
        }
        .svc-featured-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(200,240,96,0.14);
          border: 1px solid rgba(200,240,96,0.26);
          color: var(--accent);
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.33rem 0.72rem;
          border-radius: 100px;
          box-shadow: 0 10px 30px rgba(200,240,96,0.08);
        }
        .svc-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          margin-bottom: 1.2rem;
          position: relative;
          z-index: 1;
        }
        .svc-icon {
          width: 56px;
          height: 56px;
          background: linear-gradient(180deg, rgba(200,240,96,0.14), rgba(200,240,96,0.06));
          border: 1px solid rgba(200,240,96,0.18);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.45rem;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.06);
          flex-shrink: 0;
        }
        .svc-card--featured .svc-icon {
          background: linear-gradient(180deg, rgba(200,240,96,0.22), rgba(200,240,96,0.08));
          border-color: rgba(200,240,96,0.28);
        }
        .svc-card-copy {
          position: relative;
          z-index: 1;
        }
        .svc-title {
          font-family: var(--font-display);
          font-size: 1.18rem;
          font-weight: 700;
          letter-spacing: -0.03em;
          margin-bottom: 0.6rem;
        }
        .svc-desc {
          color: var(--muted);
          font-size: 0.9rem;
          line-height: 1.8;
          font-weight: 300;
          flex: 1;
          margin-bottom: 1.8rem;
          max-width: 34ch;
        }
        .svc-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.15rem;
          border-top: 1px solid rgba(255,255,255,0.08);
          margin-top: auto;
          gap: 1rem;
          position: relative;
          z-index: 1;
        }
        [data-theme="light"] .svc-card { background: #fff; border-color: rgba(0,0,0,0.08); }
        [data-theme="light"] .svc-card--featured { border-color: rgba(77,105,0,0.2); }
        .svc-pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.35rem;
          margin-top: 3rem;
        }
        .svc-package-card {
          cursor: pointer;
        }
        .svc-package-card:focus-visible {
          outline: 2px solid rgba(200,240,96,0.65);
          outline-offset: 3px;
        }
        .svc-price-stack {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }
        .svc-package-price {
          font-family: var(--font-display);
          font-size: 1.7rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--accent);
          line-height: 1;
        }
        .svc-price-note {
          font-size: 0.72rem;
          color: var(--muted);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .svc-arrow-wrap {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }
        .svc-click-hint {
          font-size: 0.75rem;
          color: var(--muted);
          white-space: nowrap;
        }
        .svc-arrow {
          width: 40px;
          height: 40px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--muted);
          font-size: 0.9rem;
          background: rgba(255,255,255,0.02);
          transition: all 0.2s;
        }
        .svc-package-card:hover .svc-arrow {
          border-color: var(--accent);
          color: #0a0a0a;
          background: var(--accent);
          transform: translate(2px, -2px);
        }
        .svc-pricing-link {
          margin-top: 1.5rem;
          text-align: center;
          position: relative;
          z-index: 1;
        }
        .svc-pricing-link a {
          font-size: 0.85rem;
          color: var(--muted);
          text-decoration: none;
          font-weight: 400;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          transition: color 0.2s;
        }
        .svc-pricing-link a:hover {
          color: var(--accent);
        }
        [data-theme="light"] .services-section::before {
          background:
            radial-gradient(circle at 12% 18%, rgba(141,168,42,0.08), transparent 28%),
            radial-gradient(circle at 88% 78%, rgba(141,168,42,0.05), transparent 24%);
        }
        [data-theme="light"] .svc-card {
          background:
            linear-gradient(180deg, rgba(141,168,42,0.035), rgba(255,255,255,0)),
            #fff;
          border-color: rgba(0,0,0,0.08);
        }
        [data-theme="light"] .svc-footer {
          border-top-color: rgba(0,0,0,0.08);
        }
        [data-theme="light"] .svc-arrow {
          border-color: rgba(0,0,0,0.09);
          background: rgba(0,0,0,0.015);
        }
        @media (max-width: 900px) {
          .svc-pricing-grid { grid-template-columns: 1fr; }
          .svc-card {
            min-height: auto;
          }
          .svc-click-hint {
            display: none;
          }
        }
      `}</style>

      <div className="section-label reveal">{t.pv_label || "Pricing"}</div>
      <h2 className="section-title reveal">
        {t.pv_title || "Packages & pricing"}
      </h2>
      <p className="section-sub reveal">
        {t.pv_sub ||
          "Klikni na paket da popuniš formu s tom ponudom — ili posjeti cjenovnik za sve detalje."}
      </p>

      <div className="svc-pricing-grid">
        {PACKAGES.map((pkg, i) => (
          <div
            key={pkg.id}
            className={`svc-card svc-package-card${pkg.highlight ? " svc-card--featured" : ""} reveal reveal-delay-${i + 1}`}
            onClick={() => navigate(`/hire?paket=${pkg.id}`)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
              e.key === "Enter" && navigate(`/hire?paket=${pkg.id}`)
            }
          >
            {pkg.highlight && (
              <>
                <div className="svc-card-glow" />
                <span className="svc-featured-badge">
                  {t.pkg_badge_popular}
                </span>
              </>
            )}
            <div className="svc-card-top">
              <div className="svc-icon"><pkg.icon size={22} /></div>
            </div>
            <div className="svc-card-copy">
              <div className="svc-title">{t[pkg.nameKey] || pkg.nameKey}</div>
              <p className="svc-desc">{t[pkg.descKey] || pkg.descKey}</p>
            </div>
            <div className="svc-footer">
              <div className="svc-price-stack">
                <div className="svc-package-price">{pkg.price}</div>
                <div className="svc-price-note">
                  {t.serv_get_started}
                </div>
              </div>
              <div className="svc-arrow-wrap">
                <div className="svc-click-hint">
                  {t.serv_get_started}
                </div>
                <div className="svc-arrow">
                  <ArrowUpRightIcon size={14} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="svc-pricing-link reveal">
        <a href="/pricing">{t.pv_see_all || "Vidi sve detalje i dodatke"} →</a>
      </div>
    </section>
  );
}
