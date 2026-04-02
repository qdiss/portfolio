import { useState } from 'react'
import { useLang } from '../context/LangContext'

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`faq-item${open ? ' open' : ''}`}>
      <button className="faq-q" onClick={() => setOpen(o => !o)}>
        <span>{question}</span>
        <em className="faq-icon">+</em>
      </button>
      <div className="faq-a">
        <p>{answer}</p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const { t } = useLang()
  const items = [
    { q: t.faq1_q, a: t.faq1_a },
    { q: t.faq2_q, a: t.faq2_a },
    { q: t.faq3_q, a: t.faq3_a },
    { q: t.faq4_q, a: t.faq4_a },
    { q: t.faq5_q, a: t.faq5_a },
  ]
  return (
    <section style={{ background: 'var(--bg2)' }}>
      <div className="section-label reveal">{t.faq_label}</div>
      <h2 className="section-title reveal">{t.faq_title}</h2>
      <div className="faq-list reveal">
        {items.map((item, i) => (
          <FaqItem key={i} question={item.q} answer={item.a} />
        ))}
      </div>
    </section>
  )
}
