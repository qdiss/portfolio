import{u as d,r as m,j as e,N as f}from"./index-CkP4px7a.js";import{u as p,r as o,L as t}from"./vendor-react-DArxELLs.js";function u(){const{t:n}=d(),a=p(),[i,l]=o.useState(10),c=m({title:`404 - ${n.nf_title||"Page not found"} · adiss.dev`,description:n.nf_sub_1||"The page you are looking for doesn't exist or has moved.",canonical:"https://adiss.dev/404",noIndex:!0});return o.useEffect(()=>{window.scrollTo(0,0);const s=setInterval(()=>{l(r=>r<=1?(clearInterval(s),a("/"),0):r-1)},1e3);return()=>clearInterval(s)},[a,n.nf_title]),e.jsxs(e.Fragment,{children:[c,e.jsx("style",{children:`
        .nf-wrap {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 8rem 2rem 5rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .nf-glow {
          position: absolute;
          top: 20%;
          left: 50%;
          transform: translateX(-50%);
          width: 500px;
          height: 500px;
          background: radial-gradient(ellipse, rgba(200,240,96,0.06) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }
        .nf-inner {
          position: relative;
          z-index: 1;
          max-width: 540px;
        }
        .nf-label {
          font-size: 0.72rem;
          color: var(--accent);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 500;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .nf-code {
          font-family: var(--font-display);
          font-size: clamp(5rem, 18vw, 10rem);
          font-weight: 800;
          letter-spacing: -0.06em;
          line-height: 0.9;
          margin-bottom: 1.5rem;
          color: var(--text);
          position: relative;
        }
        .nf-code span {
          color: var(--accent);
        }
        .nf-title {
          font-family: var(--font-display);
          font-size: clamp(1.3rem, 3vw, 1.75rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          margin-bottom: 1rem;
          color: var(--text);
        }
        .nf-sub {
          color: var(--muted);
          font-size: 0.95rem;
          font-weight: 300;
          line-height: 1.8;
          margin-bottom: 2.5rem;
        }
        .nf-actions {
          display: flex;
          gap: 1rem;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 3rem;
        }
        .nf-countdown {
          font-size: 0.78rem;
          color: var(--muted2);
          font-weight: 300;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .nf-countdown-num {
          font-family: var(--font-display);
          font-weight: 700;
          color: var(--muted);
          font-variant-numeric: tabular-nums;
          min-width: 1.2ch;
          display: inline-block;
        }
        .nf-links {
          margin-top: 3.5rem;
          padding-top: 2rem;
          border-top: 1px solid var(--border);
          display: flex;
          gap: 2rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .nf-link {
          font-size: 0.85rem;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.2s;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        .nf-link:hover { color: var(--accent); }
        @media (max-width: 600px) {
          .nf-wrap { padding: 7rem 1.5rem 4rem; }
        }
      `}),e.jsx(f,{}),e.jsxs("div",{className:"nf-wrap",children:[e.jsx("div",{className:"nf-glow"}),e.jsxs("div",{className:"nf-inner",children:[e.jsxs("div",{className:"nf-label",children:[e.jsx("span",{className:"pulse-dot",style:{width:6,height:6}}),n.nf_error_label||"Error"]}),e.jsxs("div",{className:"nf-code",children:["4",e.jsx("span",{children:"0"}),"4"]}),e.jsx("h1",{className:"nf-title",children:n.nf_title||"Page not found"}),e.jsxs("p",{className:"nf-sub",children:[n.nf_sub_1||"Looks like this page doesn't exist - or it moved.",e.jsx("br",{}),n.nf_sub_2||"Let's get you back somewhere useful."]}),e.jsxs("div",{className:"nf-actions",children:[e.jsxs(t,{to:"/",className:"btn-primary",children:["← ",n.nf_back_home||"Back to home"]}),e.jsx(t,{to:"/hire",className:"btn-secondary",children:n.nf_start_project||"Start a project"})]}),e.jsxs("div",{className:"nf-countdown",children:[e.jsx("span",{children:n.nf_redirect_prefix||"Redirecting to home in"}),e.jsx("span",{className:"nf-countdown-num",children:i}),e.jsx("span",{children:n.nf_redirect_suffix||"seconds..."})]}),e.jsxs("div",{className:"nf-links",children:[e.jsxs(t,{to:"/#work",className:"nf-link",children:["↗ ",n.nav_work||"Projects"]}),e.jsxs(t,{to:"/blog",className:"nf-link",children:["↗ ",n.nav_blog||"Blog"]}),e.jsxs(t,{to:"/#about",className:"nf-link",children:["↗ ",n.nav_about||"About"]}),e.jsxs(t,{to:"/#contact",className:"nf-link",children:["↗ ",n.nav_contact||"Contact"]})]})]})]})]})}export{u as default};
