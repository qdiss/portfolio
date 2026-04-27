//src/pages/ProjectsListingPage.jsx
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import { useLang } from "../context/LangContext";
import { useSEO } from "../hooks/useSEO";

// Lokalni screenshot path
const SS = (slug) => `/projects/${slug}.webp`;

// Keep this in sync with ProjectDetailPage.jsx PROJECT_DATA
const PROJECTS = [
  {
    slug: "medibook",
    title: "MediBook",
    emoji: "🏥",
    tags: ["Next.js", "TypeScript", "Full-stack"],
    excerptKey: "p1_desc",
    liveUrl: "https://medibook-pi.vercel.app/",
    year: "2024",
  },
  {
    slug: "dalmatinske-vizure",
    title: "Dalmatinske Vizure",
    emoji: "🏠",
    tags: ["Next.js", "TailwindCSS", "Client project"],
    excerptKey: "p2_desc",
    liveUrl: "https://dalmatinske-vizure.com",
    year: "2024",
  },
  {
    slug: "korijen",
    title: "Korijen Leather",
    emoji: "⌚",
    tags: ["HTML/CSS", "JavaScript", "Landing Page"],
    excerptKey: "p5_desc",
    liveUrl: "https://korijen-landing-page.vercel.app/",
    year: "2025",
  },
  {
    slug: "travel-app",
    title: "Travel App",
    emoji: "✈️",
    tags: ["React", "Node.js", "API integration"],
    excerptKey: "p3_desc",
    liveUrl: "https://travel-app-liard-nine.vercel.app/",
    year: "2023",
  },
  {
    slug: "duolingo-clone",
    title: "Duolingo Clone",
    emoji: "📚",
    tags: ["Next.js", "TypeScript", "Gamification"],
    excerptKey: "p4_desc",
    liveUrl: "https://duolingo-clone-orcin.vercel.app/",
    year: "2024",
  },
  {
    slug: "instagram-clone",
    title: "Instagram Clone",
    emoji: "📸",
    tags: ["React", "CSS", "Social app"],
    excerptKey: "p6_desc",
    liveUrl: "https://instagram-frontend-lime.vercel.app/",
    year: "2024",
  },
];

export default function ProjectsListingPage() {
  const { t } = useLang();

  useSEO({
    title:
      t.projects_seo_title ||
      "Projects — Adis Klobodanović | Full-Stack Developer",
    description:
      t.projects_seo_desc ||
      "Full-stack web projects — booking platforms, real estate sites, SaaS apps, and more.",
    canonical: "https://adiss.dev/contents/projects",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.08 },
    );
    const timer = setTimeout(() => {
      document
        .querySelectorAll(".reveal")
        .forEach((el) => observer.observe(el));
    }, 50);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <Nav />
      <div className="projects-listing">
        <div className="projects-listing-hero reveal">
          <div className="section-label">{t.proj_all_label || "Work"}</div>
          <h1 className="section-title">
            {t.proj_all_title || "All projects"}
            <br />
            <em>{t.proj_all_sub || "Everything I've shipped."}</em>
          </h1>
        </div>

        {PROJECTS.map((project, i) => (
          <Link
            key={project.slug}
            to={`/contents/projects/${project.slug}`}
            className={`project-row reveal reveal-delay-${(i % 3) + 1}`}
          >
            <div className="project-row-thumb-wrap">
              <img
                className="project-row-thumb"
                src={SS(project.slug)}
                alt={`${project.title} screenshot`}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextSibling.style.display = "flex";
                }}
              />
              <div
                className="project-row-thumb-fallback"
                style={{ display: "none" }}
              >
                {project.emoji}
              </div>
            </div>

            <div className="project-row-left">
              <div className="project-row-meta">
                <span className="project-row-year">{project.year}</span>
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="project-row-title">{project.title}</div>
              <p className="project-row-excerpt">{t[project.excerptKey]}</p>
            </div>

            <div className="project-row-right">
              <span className="project-row-arrow">↗</span>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-row-live"
                onClick={(e) => e.stopPropagation()}
              >
                Live ↗
              </a>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
