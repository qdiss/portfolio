import{u as n,j as e,A as s,R as c,G as d,Z as l}from"./index-CkP4px7a.js";import{P as p}from"./packages-BbLQ7cAN.js";import{u as m}from"./vendor-react-DArxELLs.js";const v={zap:l,globe:d,rocket:c},g=p.map(a=>({...a,icon:v[a.icon],descKey:a.shortKey}));function h(){const{t:a}=n(),o=m();return e.jsxs("section",{id:"pricing-preview",style:{background:"var(--bg)"},children:[e.jsx("style",{children:`
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
      `}),e.jsx("div",{className:"section-label reveal",children:a.pv_label||"Cijene"}),e.jsx("h2",{className:"section-title reveal",children:a.pv_title||"Paketi i cijene"}),e.jsx("p",{className:"section-sub reveal",children:a.pv_sub||"Klikni na paket da popuniš formu s tom ponudom - ili posjeti cjenovnik za sve detalje."}),e.jsx("div",{className:"pricing-preview-grid",children:g.map((r,t)=>e.jsxs("div",{className:`pv-card${r.highlight?" featured":""} reveal reveal-delay-${t+1}`,onClick:()=>{var i;(i=window.gtag)==null||i.call(window,"event","package_click",{event_category:"engagement",event_label:r.id}),o(`/hire?paket=${r.id}`)},role:"button",tabIndex:0,onKeyDown:i=>i.key==="Enter"&&o(`/hire?paket=${r.id}`),children:[r.badge&&e.jsx("div",{className:"pv-badge",children:a[r.badge]||r.badge}),e.jsx("div",{className:"pv-icon",children:e.jsx(r.icon,{size:24})}),e.jsx("div",{className:"pv-name",children:a[r.nameKey]||r.nameKey}),e.jsx("p",{className:"pv-desc",children:a[r.descKey]||r.descKey}),e.jsxs("div",{className:"pv-footer",children:[e.jsx("div",{className:"pv-price",children:a[r.priceKey]||r.priceKey}),e.jsx("div",{className:"pv-arrow",children:e.jsx(s,{size:14})})]})]},r.id))}),e.jsx("div",{className:"pv-more-link",children:e.jsxs("a",{href:"/pricing",children:[a.pv_see_all||"Vidi sve detalje i dodatke"," →"]})})]})}export{h as default};
