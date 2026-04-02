import { useLang } from '../context/LangContext'

export default function Services() {
  const { t } = useLang()
  return (
    <section id="services" style={{ background: 'var(--bg2)' }}>
      <div className="section-label reveal">{t.serv_label}</div>
      <h2 className="section-title reveal">{t.serv_title}</h2>
      <p className="section-sub reveal">{t.serv_sub}</p>
      <div className="services-grid">
        <div className="service-card reveal reveal-delay-1">
          <div className="service-icon">⚡</div>
          <h3>{t.s1_title}</h3>
          <p>{t.s1_desc}</p>
          <div className="service-price">from $600 <span>{t.price_onetime}</span></div>
        </div>
        <div className="service-card reveal reveal-delay-2">
          <div className="service-icon">🌐</div>
          <h3>{t.s2_title}</h3>
          <p>{t.s2_desc}</p>
          <div className="service-price">from $1,200 <span>{t.price_onetime}</span></div>
        </div>
        <div className="service-card reveal reveal-delay-3">
          <div className="service-icon">🚀</div>
          <h3>{t.s3_title}</h3>
          <p>{t.s3_desc}</p>
          <div className="service-price">from $3,000 <span>{t.price_project}</span></div>
        </div>
      </div>
    </section>
  )
}
