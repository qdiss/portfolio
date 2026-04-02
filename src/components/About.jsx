import { useLang } from '../context/LangContext'
import { useEffect, useRef, useState } from 'react'

function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        let startTime = null
        const duration = 1400
        const step = (timestamp) => {
          if (!startTime) startTime = timestamp
          const progress = Math.min((timestamp - startTime) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setCount(Math.floor(eased * target))
          if (progress < 1) requestAnimationFrame(step)
          else setCount(target)
        }
        requestAnimationFrame(step)
      }
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function About() {
  const { t } = useLang()
  return (
    <section id="about">
      <div className="about-grid">
        <div className="about-text reveal">
          <div className="section-label">{t.about_label}</div>
          <h2 className="section-title" dangerouslySetInnerHTML={{ __html: t.about_title }} />
          <p dangerouslySetInnerHTML={{ __html: t.about_p1 }} />
          <p dangerouslySetInnerHTML={{ __html: t.about_p2 }} />
          <p dangerouslySetInnerHTML={{ __html: t.about_p3 }} />
          <div style={{ marginTop: '2rem' }}>
            <a href="contact" className="btn-primary">{t.about_cta}</a>
          </div>
        </div>
        <div className="about-aside reveal reveal-delay-2">
          <div className="stats-row">
            <div className="stat-card">
              <div className="stat-num"><Counter target={4} suffix="+" /></div>
              <div className="stat-label">{t.stat_years}</div>
            </div>
            <div className="stat-card">
              <div className="stat-num"><Counter target={10} suffix="+" /></div>
              <div className="stat-label">{t.stat_projects}</div>
            </div>
          </div>
          <div className="accent-card">
            <div className="accent-card-label">{t.about_enjoy_label}</div>
            <p>{t.about_enjoy}</p>
          </div>
          <div className="stat-card">
            <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginBottom: '0.45rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              {t.about_outside_label}
            </div>
            <p style={{ color: 'var(--muted)', fontSize: '0.875rem', fontWeight: 300, lineHeight: 1.75 }}>
              {t.about_outside}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
