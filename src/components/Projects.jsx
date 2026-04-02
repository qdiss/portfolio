import { useLang } from "../context/LangContext";
import { useNavigate } from "react-router-dom";

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
];

function ProjectCard({ proj, t }) {
  const navigate = useNavigate();
  return (
    <div
      className={`project-card reveal ${proj.imgClass === "p1" || proj.imgClass === "p3" ? "reveal-delay-1" : "reveal-delay-2"}`}
      onClick={() => navigate(`/contents/projects/${proj.slug}`)}
      style={{ cursor: "pointer" }}
    >
      <div className={`project-img ${proj.imgClass}`}>
        <span>{proj.emoji}</span>
      </div>
      <div className="project-body">
        <div className="project-tags">
          {proj.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
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
