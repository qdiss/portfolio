import { useLang } from '../context/LangContext'

export default function Testimonials() {
  const { t } = useLang()
  return (
    <section style={{ background: 'var(--bg2)' }}>
      <div className="section-label reveal">{t.test_label}</div>
      <h2 className="section-title reveal">{t.test_title}</h2>
      <div className="testimonials-grid">
        <div className="testimonial-card reveal reveal-delay-1">
          <div className="t-quote">"</div>
          <p className="t-text">{t.t1_text}</p>
          <div className="t-author">
            <div className="t-avatar">MK</div>
            <div>
              <div className="t-name">Marko K.</div>
              <div className="t-role">Owner, Dalmatinske Vizure</div>
            </div>
          </div>
        </div>
        <div className="testimonial-card reveal reveal-delay-2">
          <div className="t-quote">"</div>
          <p className="t-text">{t.t2_text}</p>
          <div className="t-author">
            <div className="t-avatar">TN</div>
            <div>
              <div className="t-name">Tarik N.</div>
              <div className="t-role">Startup founder</div>
            </div>
          </div>
        </div>
        <div className="testimonial-card reveal reveal-delay-3">
          <div className="t-quote">"</div>
          <p className="t-text">{t.t3_text}</p>
          <div className="t-author">
            <div className="t-avatar">JS</div>
            <div>
              <div className="t-name">Jana S.</div>
              <div className="t-role">Product Manager</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
