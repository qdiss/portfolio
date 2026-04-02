import { useLang } from '../context/LangContext'

export default function Process() {
  const { t } = useLang()
  const steps = [
    { num: '01', title: t.proc1_title, desc: t.proc1_desc },
    { num: '02', title: t.proc2_title, desc: t.proc2_desc },
    { num: '03', title: t.proc3_title, desc: t.proc3_desc },
    { num: '04', title: t.proc4_title, desc: t.proc4_desc },
  ]
  return (
    <section>
      <div className="section-label reveal">{t.proc_label}</div>
      <h2 className="section-title reveal">{t.proc_title}</h2>
      <p className="section-sub reveal">{t.proc_sub}</p>
      <div className="process-steps">
        {steps.map((s, i) => (
          <div key={s.num} className={`process-step reveal reveal-delay-${i + 1}`}>
            <div className="step-num">{s.num}</div>
            <h4>{s.title}</h4>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
