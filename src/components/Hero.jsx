import { useLang } from '../context/LangContext'
import { Link } from 'react-router-dom'

export default function Hero() {
  const { t } = useLang()

  return (
    <section className="hero">
      <div className="hero-glow" />
      <div className="hero-glow2" />
      <div className="hero-tag">
        <div className="pulse-dot" />
        <span>{t.hero_tag}</span>
      </div>
      <h1 dangerouslySetInnerHTML={{ __html: t.hero_h1 }} />
      <p className="hero-sub">{t.hero_sub}</p>
      <p className="hero-human">{t.hero_human}</p>
      <div className="hero-actions">
        <a href="#work" className="btn-primary">{t.hero_cta1}</a>
        <a href="#contact" className="btn-secondary">{t.hero_cta2}</a>
        <Link to="/hire" style={{ fontSize:'0.85rem', color:'var(--accent)', textDecoration:'none', borderBottom:'1px solid rgba(200,240,96,0.3)', paddingBottom:'1px', transition:'border-color 0.2s' }}>
          Start a project →
        </Link>
      </div>
      <div className="hero-scroll">
        <div className="scroll-line" />
        <span>{t.hero_scroll}</span>
      </div>
    </section>
  )
}
