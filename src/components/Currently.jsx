import { useLang } from '../context/LangContext'

// ── Change this date when you book up ────────────────────────────────────────
const NEXT_AVAILABLE = 'June 2025'

export default function Currently() {
  const { t } = useLang()
  return (
    <div className="currently reveal">
      <div className="currently-inner">
        <div className="currently-item">
          <span className="currently-label">{t.curr_status_label}</span>
          <span className="currently-value">
            <span className="pulse-dot" style={{ display: 'inline-block', marginRight: '0.4rem' }} />
            {t.curr_status}
          </span>
        </div>
        <div className="currently-item">
          <span className="currently-label">{t.curr_building_label}</span>
          <span className="currently-value">{t.curr_building}</span>
        </div>
        <div className="currently-item">
          <span className="currently-label">{t.curr_tz_label}</span>
          <span className="currently-value">CET — EU & US East friendly</span>
        </div>
        <div className="currently-item">
          <span className="currently-label">{t.curr_reply_label}</span>
          <span className="currently-value">{t.curr_reply}</span>
        </div>
        <div className="currently-item">
          <span className="currently-label">Next slot</span>
          <span className="currently-value" style={{
            background: 'rgba(var(--accent-rgb, 139,92,246), 0.12)',
            color: 'var(--accent)',
            padding: '0.15rem 0.55rem',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: 500,
          }}>
            📅 {NEXT_AVAILABLE}
          </span>
        </div>
      </div>
    </div>
  )
}
