import { useLang } from '../context/LangContext'
import { useState, useRef } from 'react'

// ─── Toast ───────────────────────────────────────────────────────────────────
function Toast({ msg, type, onClose }) {
  if (!msg) return null
  return (
    <div
      style={{
        position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999,
        background: type === 'success' ? 'var(--accent)' : '#e74c3c',
        color: '#fff', borderRadius: '10px', padding: '0.85rem 1.4rem',
        fontSize: '0.9rem', fontWeight: 500, boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
        display: 'flex', alignItems: 'center', gap: '0.7rem',
        animation: 'slideInToast 0.3s ease',
      }}
    >
      <span>{type === 'success' ? '✓' : '✕'}</span>
      {msg}
      <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', marginLeft: '0.5rem', fontSize: '1rem' }}>×</button>
    </div>
  )
}

// ─── Contact Form ─────────────────────────────────────────────────────────────
// To activate EmailJS: replace YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, YOUR_PUBLIC_KEY
// with values from https://dashboard.emailjs.com/
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'

const BUDGETS = ['< $1k', '$1k – $3k', '$3k – $8k', '$8k+', 'Not sure yet']

export default function CTA() {
  const { t } = useLang()
  const formRef = useRef(null)
  const [sending, setSending] = useState(false)
  const [toast, setToast] = useState({ msg: '', type: 'success' })

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast({ msg: '', type: 'success' }), 5000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)

    const data = Object.fromEntries(new FormData(formRef.current))

    try {
      // If EmailJS keys are configured, use the API
      if (EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID') {
        const { default: emailjs } = await import('@emailjs/browser')
        await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY)
        showToast('Message sent ✓ I\'ll reply within 24h.')
      } else {
        // Fallback: open mailto pre-filled
        const subject = encodeURIComponent(`Project inquiry from ${data.name}`)
        const body = encodeURIComponent(
          `Name: ${data.name}\nEmail: ${data.from_email}\nBudget: ${data.budget}\n\n${data.message}`
        )
        window.location.href = `mailto:adis.klobodanovic@gmail.com?subject=${subject}&body=${body}`
        showToast('Opening your mail client...')
      }
      formRef.current.reset()
    } catch (err) {
      showToast('Something went wrong. Try emailing directly.', 'error')
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <style>{`
        @keyframes slideInToast {
          from { transform: translateY(20px); opacity: 0; }
          to   { transform: translateY(0);   opacity: 1; }
        }
        .contact-form { display: flex; flex-direction: column; gap: 1rem; margin-top: 2.5rem; max-width: 560px; margin-left: auto; margin-right: auto; text-align: left; }
        .contact-row  { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .contact-form input,
        .contact-form select,
        .contact-form textarea {
          width: 100%; padding: 0.8rem 1rem; border-radius: 8px;
          border: 1px solid var(--border); background: var(--card-bg);
          color: var(--fg); font-size: 0.9rem; font-family: inherit;
          transition: border-color 0.2s;
          box-sizing: border-box;
        }
        .contact-form input:focus,
        .contact-form select:focus,
        .contact-form textarea:focus { outline: none; border-color: var(--accent); }
        .contact-form textarea { resize: vertical; min-height: 110px; }
        .contact-form select option { background: var(--card-bg); }
        .contact-form .btn-primary { width: 100%; justify-content: center; opacity: ${sending ? 0.6 : 1}; cursor: ${sending ? 'not-allowed' : 'pointer'}; }
        .form-divider { display: flex; align-items: center; gap: 1rem; margin: 0.5rem 0; color: var(--muted); font-size: 0.8rem; }
        .form-divider::before, .form-divider::after { content: ''; flex: 1; height: 1px; background: var(--border); }
        @media(max-width:500px) { .contact-row { grid-template-columns: 1fr; } }
      `}</style>

      <section id="contact" className="cta-section">
        <div className="cta-glow" />
        <h2 className="reveal" dangerouslySetInnerHTML={{ __html: t.cta_title }} />
        <p className="cta-human reveal">{t.cta_sub}</p>

        <form ref={formRef} onSubmit={handleSubmit} className="contact-form reveal">
          <div className="contact-row">
            <input name="name"       type="text"  placeholder="Your name"    required />
            <input name="from_email" type="email" placeholder="your@email.com" required />
          </div>
          <select name="budget" required defaultValue="">
            <option value="" disabled>Budget range</option>
            {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
          <textarea name="message" placeholder="Tell me about your project..." required />
          <button type="submit" className="btn-primary" disabled={sending}>
            {sending ? 'Sending...' : 'Send message →'}
          </button>
          <div className="form-divider">or</div>
          <a href="https://linkedin.com/in/adis-klobodanovic" target="_blank" rel="noreferrer" className="btn-secondary" style={{ textAlign: 'center' }}>LinkedIn →</a>
        </form>

        <p className="cta-note reveal" style={{ marginTop: '1.5rem' }}>{t.cta_note}</p>
      </section>

      <Toast msg={toast.msg} type={toast.type} onClose={() => setToast({ msg: '' })} />
    </>
  )
}
