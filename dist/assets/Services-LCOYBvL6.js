import{u as c,j as e,A as o,R as n,G as d,Z as l}from"./index-CkP4px7a.js";import{P as g}from"./packages-BbLQ7cAN.js";import{u as p}from"./vendor-react-DArxELLs.js";const v={zap:l,globe:d,rocket:n},m=g.map(r=>({...r,icon:v[r.icon],descKey:r.shortKey}));function f(){const{t:r}=c(),i=p();return e.jsxs("section",{id:"services",className:"services-section",style:{background:"var(--bg2)"},children:[e.jsx("style",{children:`
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
      `}),e.jsx("div",{className:"section-label reveal",children:r.pv_label||"Pricing"}),e.jsx("h2",{className:"section-title reveal",children:r.pv_title||"Packages & pricing"}),e.jsx("p",{className:"section-sub reveal",children:r.pv_sub||"Klikni na paket da popuniš formu s tom ponudom - ili posjeti cjenovnik za sve detalje."}),e.jsx("div",{className:"svc-pricing-grid",children:m.map((a,s)=>e.jsxs("div",{className:`svc-card svc-package-card${a.highlight?" svc-card--featured":""} reveal reveal-delay-${s+1}`,onClick:()=>i(`/hire?paket=${a.id}`),role:"button",tabIndex:0,onKeyDown:t=>t.key==="Enter"&&i(`/hire?paket=${a.id}`),children:[a.highlight&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"svc-card-glow"}),e.jsx("span",{className:"svc-featured-badge",children:r.pkg_badge_popular})]}),e.jsx("div",{className:"svc-card-top",children:e.jsx("div",{className:"svc-icon",children:e.jsx(a.icon,{size:22})})}),e.jsxs("div",{className:"svc-card-copy",children:[e.jsx("div",{className:"svc-title",children:r[a.nameKey]||a.nameKey}),e.jsx("p",{className:"svc-desc",children:r[a.descKey]||a.descKey})]}),e.jsxs("div",{className:"svc-footer",children:[e.jsxs("div",{className:"svc-price-stack",children:[e.jsx("div",{className:"svc-package-price",children:r[a.priceKey]||a.priceKey}),e.jsx("div",{className:"svc-price-note",children:r.serv_get_started})]}),e.jsxs("div",{className:"svc-arrow-wrap",children:[e.jsx("div",{className:"svc-click-hint",children:r.serv_get_started}),e.jsx("div",{className:"svc-arrow",children:e.jsx(o,{size:14})})]})]})]},a.id))}),e.jsx("div",{className:"svc-pricing-link reveal",children:e.jsxs("a",{href:"/pricing",children:[r.pv_see_all||"Vidi sve detalje i dodatke"," →"]})})]})}export{f as default};
