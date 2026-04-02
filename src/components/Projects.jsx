import { useLang } from '../context/LangContext'
import { useState } from 'react'

const PROJECTS = [
  {
    href: 'https://medibook-pi.vercel.app/',
    imgClass: 'p1', emoji: '🏥',
    tags: ['Next.js', 'TypeScript', 'Full-stack'],
    titleKey: 'p1_title', descKey: 'p1_desc', linkKey: 'proj_view',
    screenshot: 'https://image.thum.io/get/width/600/crop/380/https://medibook-pi.vercel.app/',
  },
  {
    href: 'https://dalmatinske-vizure.com',
    imgClass: 'p2', emoji: '🏠',
    tags: ['Next.js', 'TailwindCSS', 'Client project'],
    titleKey: 'p2_title', descKey: 'p2_desc', linkKey: 'proj_live',
    screenshot: 'https://image.thum.io/get/width/600/crop/380/https://dalmatinske-vizure.com',
  },
  {
    href: 'https://travel-app-liard-nine.vercel.app/',
    imgClass: 'p3', emoji: '✈️',
    tags: ['React', 'Node.js', 'API integration'],
    titleKey: 'p3_title', descKey: 'p3_desc', linkKey: 'proj_view',
    screenshot: 'https://image.thum.io/get/width/600/crop/380/https://travel-app-liard-nine.vercel.app/',
  },
  {
    href: 'https://duolingo-clone-orcin.vercel.app/',
    imgClass: 'p4', emoji: '📚',
    tags: ['Next.js', 'TypeScript', 'Gamification'],
    titleKey: 'p4_title', descKey: 'p4_desc', linkKey: 'proj_view',
    screenshot: 'https://image.thum.io/get/width/600/crop/380/https://duolingo-clone-orcin.vercel.app/',
  },
]

function ProjectCard({ proj, t }) {
  const [hovered, setHovered] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <a
      href={proj.href}
      target="_blank"
      rel="noreferrer"
      className={`project-card reveal ${proj.imgClass === 'p1' || proj.imgClass === 'p3' ? 'reveal-delay-1' : 'reveal-delay-2'}`}
      style={{ position: 'relative' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Screenshot preview tooltip */}
      {hovered && (
        <div style={{
          position: 'absolute', top: 0, left: '50%',
          transform: 'translateX(-50%) translateY(calc(-100% - 12px))',
          width: '300px', borderRadius: '10px', overflow: 'hidden',
          boxShadow: '0 16px 48px rgba(0,0,0,0.4)',
          border: '1px solid var(--border)',
          background: 'var(--card-bg)',
          zIndex: 100,
          animation: 'fadeInPreview 0.18s ease',
          pointerEvents: 'none',
        }}>
          {!imgLoaded && (
            <div style={{ height: '190px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', fontSize: '0.8rem' }}>
              Loading preview...
            </div>
          )}
          <img
            src={proj.screenshot}
            alt={`${t[proj.titleKey]} preview`}
            onLoad={() => setImgLoaded(true)}
            style={{ width: '100%', display: imgLoaded ? 'block' : 'none', borderRadius: '10px' }}
          />
        </div>
      )}

      <div className={`project-img ${proj.imgClass}`}><span>{proj.emoji}</span></div>
      <div className="project-body">
        <div className="project-tags">
          {proj.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
        </div>
        <h3>{t[proj.titleKey]}</h3>
        <p>{t[proj.descKey]}</p>
        <div className="project-link">{t[proj.linkKey]}</div>
      </div>
    </a>
  )
}

export default function Projects() {
  const { t } = useLang()
  return (
    <>
      <style>{`
        @keyframes fadeInPreview {
          from { opacity: 0; transform: translateX(-50%) translateY(calc(-100% - 6px)); }
          to   { opacity: 1; transform: translateX(-50%) translateY(calc(-100% - 12px)); }
        }
        .project-card { overflow: visible !important; }
      `}</style>
      <section id="work">
        <div className="section-label reveal">{t.work_label}</div>
        <h2 className="section-title reveal">{t.work_title}</h2>
        <p className="section-sub reveal">{t.work_sub}</p>
        <div className="projects-grid">
          {PROJECTS.map(proj => (
            <ProjectCard key={proj.href} proj={proj} t={t} />
          ))}
        </div>
      </section>
    </>
  )
}
