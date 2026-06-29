import{u as l,j as e,C as n}from"./index-CkP4px7a.js";import{r as a}from"./vendor-react-DArxELLs.js";function o(){const[r,i]=a.useState("");return a.useEffect(()=>{const s=()=>{const c=new Date().toLocaleTimeString("en-GB",{timeZone:"Europe/Sarajevo",hour:"2-digit",minute:"2-digit",hour12:!1});i(c)};s();const t=setInterval(s,1e3);return()=>clearInterval(t)},[]),e.jsxs("span",{style:{fontVariantNumeric:"tabular-nums"},children:[r," ",e.jsx("span",{style:{fontSize:"0.72rem",color:"var(--muted)",fontWeight:400},children:"CET"})]})}function m(){const{t:r}=l();return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        .currently-strip {
          width: 100%;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          background: var(--bg2);
        }
        .currently-row {
          display: flex;
          width: 100%;
          max-width: 100%;
        }
        .ci {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0.25rem;
          padding: 1.1rem 2rem;
          border-right: 1px solid var(--border);
        }
        .ci:last-child {
          border-right: none;
        }
        .ci-label {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--muted);
          font-weight: 500;
          white-space: nowrap;
        }
        .ci-value {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text);
          display: flex;
          align-items: center;
          gap: 0.4rem;
          line-height: 1.3;
          white-space: nowrap;
        }
        .ci-sub {
          font-size: 0.67rem;
          color: var(--muted2);
          font-weight: 400;
          white-space: nowrap;
        }
        .ci-badge {
          display: inline-flex;
          align-items: center;
          background: rgba(200,240,96,0.1);
          color: var(--accent);
          border: 1px solid rgba(200,240,96,0.22);
          padding: 0.2rem 0.65rem;
          border-radius: 20px;
          font-size: 0.77rem;
          font-weight: 600;
          width: fit-content;
        }
        [data-theme="light"] .ci-badge {
          background: rgba(77,105,0,0.08);
          border-color: rgba(77,105,0,0.18);
        }
        .ci-pulse {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent);
          flex-shrink: 0;
          position: relative;
        }
        .ci-pulse::after {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          background: var(--accent);
          opacity: 0.3;
          animation: ciPulse 1.8s ease-out infinite;
        }
        @keyframes ciPulse {
          0%   { transform: scale(1);   opacity: 0.3; }
          70%  { transform: scale(2.2); opacity: 0; }
          100% { transform: scale(2.2); opacity: 0; }
        }

        @media (max-width: 900px) {
          .currently-row {
            flex-direction: column;
          }
          .ci {
            border-right: none;
            border-bottom: 1px solid var(--border);
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 0.85rem 1.5rem;
          }
          .ci:last-child {
            border-bottom: none;
          }
          .ci-sub {
            display: none;
          }
        }
      `}),e.jsx("div",{className:"currently-strip reveal",children:e.jsxs("div",{className:"currently-row",children:[e.jsxs("div",{className:"ci",children:[e.jsx("span",{className:"ci-label",children:r.curr_status_label}),e.jsxs("span",{className:"ci-value",children:[e.jsx("span",{className:"ci-pulse"}),r.curr_status]})]}),e.jsxs("div",{className:"ci",children:[e.jsx("span",{className:"ci-label",children:r.curr_building_label}),e.jsx("span",{className:"ci-value",children:r.curr_building})]}),e.jsxs("div",{className:"ci",children:[e.jsx("span",{className:"ci-label",children:r.curr_tz_label}),e.jsx("span",{className:"ci-value",children:e.jsx(o,{})}),e.jsx("span",{className:"ci-sub",children:r.curr_tz_sub})]}),e.jsxs("div",{className:"ci",children:[e.jsx("span",{className:"ci-label",children:r.curr_reply_label}),e.jsx("span",{className:"ci-value",children:r.curr_reply})]}),e.jsxs("div",{className:"ci",children:[e.jsx("span",{className:"ci-label",children:r.curr_next_slot_label||"Next slot"}),e.jsxs("span",{className:"ci-badge",children:[e.jsx(n,{size:12}),r.curr_next_slot_value]})]})]})})]})}export{m as default};
