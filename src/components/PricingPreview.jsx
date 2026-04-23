import { useNavigate } from "react-router-dom";
import { useLang } from "../context/LangContext";
import { ZapIcon, GlobeIcon, RocketIcon, ArrowUpRightIcon } from "./Icons";
import { PACKAGES as PKG_CONFIG } from "../config/packages";

const PKG_ICON_MAP = { zap: ZapIcon, globe: GlobeIcon, rocket: RocketIcon };

const PREVIEW_PKGS = PKG_CONFIG.map((p) => ({
  ...p,
  icon: PKG_ICON_MAP[p.icon],
  descKey: p.shortKey,
}));

export default function PricingPreview() {
  const { t } = useLang();
  const navigate = useNavigate();

  return (
    <section id="pricing-preview" style={{ background: "var(--bg)" }}>
      <style>{`
        .pricing-preview-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          margin-top: 3rem;
        }
        .pv-card {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 22px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
          position: relative;
        }
        .pv-card:hover {
          border-color: var(--border2);
          transform: translateY(-5px);
          box-shadow: 0 24px 60px -12px rgba(0,0,0,0.4);
        }
        .pv-card.featured {
          border-color: rgba(200,240,96,0.28);
          background: rgba(200,240,96,0.025);
        }
        .pv-card.featured:hover {
          border-color: rgba(200,240,96,0.5);
          box-shadow: 0 24px 60px -12px rgba(200,240,96,0.1);
        }
        .pv-badge {
          position: absolute; top: -12px; left: 50%;
          transform: translateX(-50%);
          background: var(--accent); color: #0a0a0a;
          font-family: var(--font-display); font-weight: 700;
          font-size: 0.68rem; padding: 0.22rem 0.9rem;
          border-radius: 100px; white-space: nowrap;
          letter-spacing: 0.06em; text-transform: uppercase;
        }
        .pv-icon { font-size: 1.75rem; margin-bottom: 1rem; }
        .pv-name {
          font-family: var(--font-display);
          font-size: 1.1rem; font-weight: 700;
          letter-spacing: -0.02em; margin-bottom: 0.4rem;
        }
        .pv-desc {
          color: var(--muted); font-size: 0.85rem;
          font-weight: 300; line-height: 1.65; flex: 1;
          margin-bottom: 1.5rem;
        }
        .pv-footer {
          display: flex; align-items: center;
          justify-content: space-between;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border);
          margin-top: auto;
        }
        .pv-price {
          font-family: var(--font-display);
          font-size: 1.5rem; font-weight: 800;
          color: var(--accent); letter-spacing: -0.03em;
        }
        .pv-arrow {
          width: 34px; height: 34px; border-radius: 50%;
          border: 1px solid var(--border2);
          display: flex; align-items: center;
          justify-content: center; color: var(--muted);
          font-size: 0.9rem; transition: all 0.2s;
        }
        .pv-card:hover .pv-arrow {
          border-color: var(--accent); color: var(--accent);
          transform: translate(2px, -2px);
        }
        .pv-more-link {
          text-align: center; margin-top: 2rem;
        }
        .pv-more-link a {
          font-size: 0.85rem; color: var(--muted);
          text-decoration: none; font-weight: 400;
          display: inline-flex; align-items: center; gap: 0.4rem;
          transition: color 0.2s;
        }
        .pv-more-link a:hover { color: var(--accent); }

        [data-theme="light"] .pv-card { background: #fff; border-color: rgba(0,0,0,0.08); }
        [data-theme="light"] .pv-card.featured { border-color: rgba(77,105,0,0.18); }

        @media (max-width: 860px) {
          .pricing-preview-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="section-label reveal">{t.pv_label || "Cijene"}</div>
      <h2 className="section-title reveal">
        {t.pv_title || "Paketi i cijene"}
      </h2>
      <p className="section-sub reveal">
        {t.pv_sub ||
          "Klikni na paket da popuniš formu s tom ponudom — ili posjeti cjenovnik za sve detalje."}
      </p>

      <div className="pricing-preview-grid">
        {PREVIEW_PKGS.map((pkg, i) => (
          <div
            key={pkg.id}
            className={`pv-card${pkg.highlight ? " featured" : ""} reveal reveal-delay-${i + 1}`}
            onClick={() => navigate(`/hire?paket=${pkg.id}`)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
              e.key === "Enter" && navigate(`/hire?paket=${pkg.id}`)
            }
          >
            {pkg.badge && <div className="pv-badge">{t[pkg.badge] || pkg.badge}</div>}
            <div className="pv-icon"><pkg.icon size={24} /></div>
            <div className="pv-name">{t[pkg.nameKey] || pkg.nameKey}</div>
            <p className="pv-desc">{t[pkg.descKey] || pkg.descKey}</p>
            <div className="pv-footer">
              <div className="pv-price">{t[pkg.priceKey] || pkg.priceKey}</div>
              <div className="pv-arrow">
                <ArrowUpRightIcon size={14} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pv-more-link">
        <a href="/pricing">{t.pv_see_all || "Vidi sve detalje i dodatke"} →</a>
      </div>
    </section>
  );
}
