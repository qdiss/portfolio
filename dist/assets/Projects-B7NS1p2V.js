import{u as a,j as s}from"./index-CkP4px7a.js";import{u as l}from"./vendor-react-DArxELLs.js";const o=e=>`/projects/${e}.webp`,c=[{slug:"medibook",href:"https://medibook-pi.vercel.app/",imgClass:"p1",emoji:"🏥",tags:["Next.js","TypeScript","Full-stack"],titleKey:"p1_title",descKey:"p1_desc",linkKey:"proj_view"},{slug:"dalmatinske-vizure",href:"https://dalmatinske-vizure.com",imgClass:"p2",emoji:"🏠",tags:["Next.js","TailwindCSS","Client project"],titleKey:"p2_title",descKey:"p2_desc",linkKey:"proj_live"},{slug:"korijen",href:"https://korijen-landing-page.vercel.app/",imgClass:"p5",emoji:"⌚",tags:["HTML/CSS","JavaScript","Landing Page"],titleKey:"p5_title",descKey:"p5_desc",linkKey:"proj_view"},{slug:"travel-app",href:"https://travel-app-liard-nine.vercel.app/",imgClass:"p3",emoji:"✈️",tags:["React","Node.js","API integration"],titleKey:"p3_title",descKey:"p3_desc",linkKey:"proj_view"},{slug:"duolingo-clone",href:"https://duolingo-clone-orcin.vercel.app/",imgClass:"p4",emoji:"📚",tags:["Next.js","TypeScript","Gamification"],titleKey:"p4_title",descKey:"p4_desc",linkKey:"proj_view"},{slug:"instagram-clone",href:"https://instagram-frontend-lime.vercel.app/",imgClass:"p6",emoji:"📸",tags:["React","CSS","Social app"],titleKey:"p6_title",descKey:"p6_desc",linkKey:"proj_view"}];function n({proj:e,t}){const r=l();return s.jsxs("div",{className:`project-card reveal ${e.imgClass==="p1"||e.imgClass==="p3"||e.imgClass==="p5"?"reveal-delay-1":"reveal-delay-2"}`,onClick:()=>r(`/contents/projects/${e.slug}`),style:{cursor:"pointer"},children:[s.jsxs("div",{className:"project-img-wrap",children:[s.jsx("img",{className:"project-screenshot",src:o(e.slug),alt:`${t[e.titleKey]||e.emoji} screenshot`,loading:"lazy",onError:i=>{i.currentTarget.style.display="none",i.currentTarget.nextSibling.style.display="flex"}}),s.jsx("div",{className:"project-screenshot-fallback",style:{display:"none"},children:s.jsx("span",{children:e.emoji})}),s.jsx("div",{className:"project-img-overlay"}),s.jsx("div",{className:"project-img-tags",children:e.tags.slice(0,2).map(i=>s.jsx("span",{className:"project-img-tag",children:i},i))})]}),s.jsxs("div",{className:"project-body",children:[s.jsx("h3",{children:t[e.titleKey]}),s.jsx("p",{children:t[e.descKey]}),s.jsxs("div",{className:"project-link",children:[t[e.linkKey]," →"]})]})]})}function g(){const{t:e}=a();return s.jsxs("section",{id:"work",children:[s.jsx("style",{children:`
        .project-img-wrap {
          position: relative;
          overflow: hidden;
          background: var(--bg2, #111);
          border-bottom: 1px solid var(--border, rgba(255,255,255,0.08));
        }
        .project-screenshot {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
          display: block;
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1),
                      filter 0.4s ease;
          filter: brightness(0.92) saturate(0.9);
        }
        .project-card:hover .project-screenshot {
          transform: scale(1.04) translateY(-1%);
          filter: brightness(1) saturate(1);
        }
        .project-screenshot-fallback {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
          background: var(--bg2, #111);
        }
        .project-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 55%,
            rgba(0, 0, 0, 0.38) 100%
          );
          pointer-events: none;
        }
        .project-img-tags {
          position: absolute;
          bottom: 0.75rem;
          left: 0.9rem;
          display: flex;
          gap: 0.35rem;
          z-index: 2;
        }
        .project-img-tag {
          font-size: 0.64rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          padding: 0.2rem 0.55rem;
          border-radius: 4px;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(8px);
          color: rgba(255, 255, 255, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}),s.jsx("div",{className:"section-label reveal",children:e.work_label}),s.jsx("h2",{className:"section-title reveal",children:e.work_title}),s.jsx("p",{className:"section-sub reveal",children:e.work_sub}),s.jsx("div",{className:"projects-grid",children:c.map(t=>s.jsx(n,{proj:t,t:e},t.slug))})]})}export{g as default};
