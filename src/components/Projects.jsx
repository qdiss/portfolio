import { useLang } from "../context/LangContext";
import { useNavigate } from "react-router-dom";

const SS = (url) => `https://image.thum.io/get/width/1200/crop/800/${url}`;

const PROJECTS = [
  {
    slug: "medibook",
    href: "https://medibook-pi.vercel.app/",
    imgClass: "p1",
    emoji: "🏥",
    tags: ["Next.js", "TypeScript", "Full-stack"],
    titleKey: "p1_title",
    descKey: "p1_desc",
    linkKey: "proj_view",
  },
  {
    slug: "dalmatinske-vizure",
    href: "https://dalmatinske-vizure.com",
    imgClass: "p2",
    emoji: "🏠",
    tags: ["Next.js", "TailwindCSS", "Client project"],
    titleKey: "p2_title",
    descKey: "p2_desc",
    linkKey: "proj_live",
  },
  {
    slug: "korijen",
    href: "https://korijen-landing-page.vercel.app/",
    imgClass: "p5",
    emoji: "⌚",
    tags: ["HTML/CSS", "JavaScript", "Landing Page"],
    titleKey: "p5_title",
    descKey: "p5_desc",
    linkKey: "proj_view",
  },
  {
    slug: "travel-app",
    href: "https://travel-app-liard-nine.vercel.app/",
    imgClass: "p3",
    emoji: "✈️",
    tags: ["React", "Node.js", "API integration"],
    titleKey: "p3_title",
    descKey: "p3_desc",
    linkKey: "proj_view",
  },
  {
    slug: "duolingo-clone",
    href: "https://duolingo-clone-orcin.vercel.app/",
    imgClass: "p4",
    emoji: "📚",
    tags: ["Next.js", "TypeScript", "Gamification"],
    titleKey: "p4_title",
    descKey: "p4_desc",
    linkKey: "proj_view",
  },
  {
    slug: "instagram-clone",
    href: "https://instagram-frontend-lime.vercel.app/",
    imgClass: "p6",
    emoji: "📸",
    tags: ["React", "CSS", "Social app"],
    titleKey: "p6_title",
    descKey: "p6_desc",
    linkKey: "proj_view",
  },
];

function ProjectCard({ proj, t }) {
  const navigate = useNavigate();
  return (
    <div
      className={`project-card reveal ${
        proj.imgClass === "p1" ||
        proj.imgClass === "p3" ||
        proj.imgClass === "p5"
          ? "reveal-delay-1"
          : "reveal-delay-2"
      }`}
      onClick={() => navigate(`/contents/projects/${proj.slug}`)}
      style={{ cursor: "pointer" }}
    >
      <div className="project-img-wrap">
        <img
          className="project-screenshot"
          src={SS(proj.href)}
          alt={`${t[proj.titleKey] || proj.emoji} screenshot`}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = "none";
            e.currentTarget.nextSibling.style.display = "flex";
          }}
        />
        {/* Fallback emoji if screenshot fails */}
        <div
          className="project-screenshot-fallback"
          style={{ display: "none" }}
        >
          <span>{proj.emoji}</span>
        </div>
        <div className="project-img-overlay" />
        <div className="project-img-tags">
          {proj.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="project-img-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="project-body">
        <h3>{t[proj.titleKey]}</h3>
        <p>{t[proj.descKey]}</p>
        <div className="project-link">{t[proj.linkKey]} →</div>
      </div>
    </div>
  );
}

export default function Projects() {
  const { t } = useLang();
  return (
    <section id="work">
      <style>{`
        .project-img-wrap {
          position: relative;
          aspect-ratio: 16 / 10;
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
      `}</style>

      <div className="section-label reveal">{t.work_label}</div>
      <h2 className="section-title reveal">{t.work_title}</h2>
      <p className="section-sub reveal">{t.work_sub}</p>
      <div className="projects-grid">
        {PROJECTS.map((proj) => (
          <ProjectCard key={proj.slug} proj={proj} t={t} />
        ))}
      </div>
    </section>
  );
}
