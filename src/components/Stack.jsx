import { useLang } from '../context/LangContext'

const STACK = [
  { label: 'React', highlight: true },
  { label: 'Next.js', highlight: true },
  { label: 'TypeScript', highlight: true },
  { label: 'Node.js', highlight: true },
  { label: 'Hono', highlight: true },
  { label: 'JavaScript' },
  { label: 'TailwindCSS' },
  { label: 'Shadcn/ui' },
  { label: 'PostgreSQL' },
  { label: 'MongoDB' },
  { label: 'Prisma' },
  { label: 'REST APIs' },
  { label: 'Git' },
  { label: 'Vercel' },
  { label: 'Docker' },
]

export default function Stack() {
  const { t } = useLang()
  return (
    <section>
      <div className="section-label reveal">{t.stack_label}</div>
      <h2 className="section-title reveal">{t.stack_title}</h2>
      <p className="section-sub reveal">{t.stack_sub}</p>
      <div className="stack-grid reveal">
        {STACK.map(({ label, highlight }) => (
          <span key={label} className={`stack-item${highlight ? ' highlight' : ''}`}>
            {label}
          </span>
        ))}
      </div>
    </section>
  )
}
