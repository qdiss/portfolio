import { useLang } from "../context/LangContext";
import { useState, useEffect } from "react";
import { CalendarIcon } from "./Icons";

function LiveClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      const str = new Date().toLocaleTimeString("en-GB", {
        timeZone: "Europe/Sarajevo",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      setTime(str);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span style={{ fontVariantNumeric: "tabular-nums" }}>
      {time}{" "}
      <span
        style={{ fontSize: "0.72rem", color: "var(--muted)", fontWeight: 400 }}
      >
        CET
      </span>
    </span>
  );
}

export default function Currently() {
  const { t } = useLang();
  return (
    <>
      <style>{`
        .currently-strip {
          width: 100%;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          background: var(--bg2);
        }
        .currently-row {
          display: flex;
          width: 100%;
          max-width: 100%;
        }
        .ci {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0.25rem;
          padding: 1.1rem 2rem;
          border-right: 1px solid var(--border);
        }
        .ci:last-child {
          border-right: none;
        }
        .ci-label {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--muted);
          font-weight: 500;
          white-space: nowrap;
        }
        .ci-value {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text);
          display: flex;
          align-items: center;
          gap: 0.4rem;
          line-height: 1.3;
          white-space: nowrap;
        }
        .ci-sub {
          font-size: 0.67rem;
          color: var(--muted2);
          font-weight: 400;
          white-space: nowrap;
        }
        .ci-badge {
          display: inline-flex;
          align-items: center;
          background: rgba(200,240,96,0.1);
          color: var(--accent);
          border: 1px solid rgba(200,240,96,0.22);
          padding: 0.2rem 0.65rem;
          border-radius: 20px;
          font-size: 0.77rem;
          font-weight: 600;
          width: fit-content;
        }
        [data-theme="light"] .ci-badge {
          background: rgba(77,105,0,0.08);
          border-color: rgba(77,105,0,0.18);
        }
        .ci-pulse {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent);
          flex-shrink: 0;
          position: relative;
        }
        .ci-pulse::after {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          background: var(--accent);
          opacity: 0.3;
          animation: ciPulse 1.8s ease-out infinite;
        }
        @keyframes ciPulse {
          0%   { transform: scale(1);   opacity: 0.3; }
          70%  { transform: scale(2.2); opacity: 0; }
          100% { transform: scale(2.2); opacity: 0; }
        }

        @media (max-width: 900px) {
          .currently-row {
            flex-direction: column;
          }
          .ci {
            border-right: none;
            border-bottom: 1px solid var(--border);
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 0.85rem 1.5rem;
          }
          .ci:last-child {
            border-bottom: none;
          }
          .ci-sub {
            display: none;
          }
        }
      `}</style>

      <div className="currently-strip reveal">
        <div className="currently-row">
          <div className="ci">
            <span className="ci-label">{t.curr_status_label}</span>
            <span className="ci-value">
              <span className="ci-pulse" />
              {t.curr_status}
            </span>
          </div>
          <div className="ci">
            <span className="ci-label">{t.curr_building_label}</span>
            <span className="ci-value">{t.curr_building}</span>
          </div>
          <div className="ci">
            <span className="ci-label">{t.curr_tz_label}</span>
            <span className="ci-value">
              <LiveClock />
            </span>
            <span className="ci-sub">
              {t.curr_tz_sub}
            </span>
          </div>
          <div className="ci">
            <span className="ci-label">{t.curr_reply_label}</span>
            <span className="ci-value">{t.curr_reply}</span>
          </div>
          <div className="ci">
            <span className="ci-label">
              {t.curr_next_slot_label || "Next slot"}
            </span>
            <span className="ci-badge">
              <CalendarIcon size={12} />
              {t.curr_next_slot_value}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
