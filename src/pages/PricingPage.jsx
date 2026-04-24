import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLang } from "../context/LangContext";
import Nav from "../components/Nav";
import { useSEO } from "../hooks/useSEO";
import { PACKAGES, ADDONS, formatAddonPrice } from "../config/packages";
import { usePageReveal } from "../hooks/useReveal";

// ─── SVG ICONS ───────────────────────────────────────────────────────────────
const SvgIcon = ({ path, size = 20, strokeWidth = 1.75 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {path}
  </svg>
);

const ICONS = {
  zap: (
    <SvgIcon
      path={
        <>
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </>
      }
    />
  ),
  globe: (
    <SvgIcon
      path={
        <>
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </>
      }
    />
  ),
  rocket: (
    <SvgIcon
      path={
        <>
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </>
      }
    />
  ),
  mapPin: (
    <SvgIcon
      path={
        <>
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </>
      }
    />
  ),
  mail: (
    <SvgIcon
      path={
        <>
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </>
      }
    />
  ),
  palette: (
    <SvgIcon
      path={
        <>
          <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
          <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
          <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
          <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
        </>
      }
    />
  ),
  smartphone: (
    <SvgIcon
      path={
        <>
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </>
      }
    />
  ),
  calendar: (
    <SvgIcon
      path={
        <>
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </>
      }
    />
  ),
  translate: (
    <SvgIcon
      path={
        <>
          <path d="m5 8 6 6" />
          <path d="m4 14 6-6 2-3" />
          <path d="M2 5h12" />
          <path d="M7 2h1" />
          <path d="m22 22-5-10-5 10" />
          <path d="M14 18h6" />
        </>
      }
    />
  ),
  pencil: (
    <SvgIcon
      path={
        <>
          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
          <path d="m15 5 4 4" />
        </>
      }
    />
  ),
  image: (
    <SvgIcon
      path={
        <>
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </>
      }
    />
  ),
  star: (
    <SvgIcon
      path={
        <>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </>
      }
    />
  ),
  barChart: (
    <SvgIcon
      path={
        <>
          <line x1="12" y1="20" x2="12" y2="10" />
          <line x1="18" y1="20" x2="18" y2="4" />
          <line x1="6" y1="20" x2="6" y2="16" />
        </>
      }
    />
  ),
  utensils: (
    <SvgIcon
      path={
        <>
          <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
          <path d="M7 2v20" />
          <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
        </>
      }
    />
  ),
  lock: (
    <SvgIcon
      path={
        <>
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </>
      }
    />
  ),
  monitor: (
    <SvgIcon
      path={
        <>
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </>
      }
    />
  ),
  atSign: (
    <SvgIcon
      path={
        <>
          <circle cx="12" cy="12" r="4" />
          <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
        </>
      }
    />
  ),
  qr: (
    <SvgIcon
      path={
        <>
          <rect x="3" y="3" width="5" height="5" />
          <rect x="4" y="4" width="3" height="3" />
          <rect x="16" y="3" width="5" height="5" />
          <rect x="17" y="4" width="3" height="3" />
          <rect x="3" y="16" width="5" height="5" />
          <rect x="4" y="17" width="3" height="3" />
          <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
          <path d="M21 21v.01" />
          <path d="M12 7v3a2 2 0 0 1-2 2H7" />
          <path d="M3 12h.01" />
          <path d="M12 3h.01" />
          <path d="M12 16v.01" />
          <path d="M16 12h1" />
          <path d="M21 12v.01" />
          <path d="M12 21v-1" />
        </>
      }
    />
  ),
  messageCircle: (
    <SvgIcon
      path={
        <>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </>
      }
    />
  ),
  helpCircle: (
    <SvgIcon
      path={
        <>
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </>
      }
    />
  ),
  timer: (
    <SvgIcon
      path={
        <>
          <line x1="10" y1="2" x2="14" y2="2" />
          <line x1="12" y1="14" x2="12" y2="8" />
          <path d="M4.93 4.93l1.41 1.41" />
          <path d="M17.66 6.34l1.41-1.41" />
          <circle cx="12" cy="14" r="8" />
        </>
      }
    />
  ),
  cookie: (
    <SvgIcon
      path={
        <>
          <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
          <path d="M8.5 8.5v.01" />
          <path d="M16 15.5v.01" />
          <path d="M12 12v.01" />
          <path d="M11 17v.01" />
          <path d="M7 14v.01" />
        </>
      }
    />
  ),
  moon: (
    <SvgIcon
      path={
        <>
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </>
      }
    />
  ),
  video: (
    <SvgIcon
      path={
        <>
          <polygon points="23 7 16 12 23 17 23 7" />
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </>
      }
    />
  ),
  sliders: (
    <SvgIcon
      path={
        <>
          <line x1="4" y1="21" x2="4" y2="14" />
          <line x1="4" y1="10" x2="4" y2="3" />
          <line x1="12" y1="21" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12" y2="3" />
          <line x1="20" y1="21" x2="20" y2="16" />
          <line x1="20" y1="12" x2="20" y2="3" />
          <line x1="1" y1="14" x2="7" y2="14" />
          <line x1="9" y1="8" x2="15" y2="8" />
          <line x1="17" y1="16" x2="23" y2="16" />
        </>
      }
    />
  ),
  fileText: (
    <SvgIcon
      path={
        <>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </>
      }
    />
  ),
  layoutGrid: (
    <SvgIcon
      path={
        <>
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </>
      }
    />
  ),
  bookOpen: (
    <SvgIcon
      path={
        <>
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </>
      }
    />
  ),
  briefcase: (
    <SvgIcon
      path={
        <>
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </>
      }
    />
  ),
  formInput: (
    <SvgIcon
      path={
        <>
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <path d="M12 12h.01" />
          <path d="M17 12h.01" />
          <path d="M7 12h.01" />
        </>
      }
    />
  ),
  megaphone: (
    <SvgIcon
      path={
        <>
          <path d="m3 11 19-9-9 19-2-8-8-2z" />
        </>
      }
    />
  ),
  sitemap: (
    <SvgIcon
      path={
        <>
          <rect x="8" y="2" width="8" height="4" rx="1" />
          <rect x="2" y="16" width="5" height="4" rx="1" />
          <rect x="9.5" y="16" width="5" height="4" rx="1" />
          <rect x="17" y="16" width="5" height="4" rx="1" />
          <line x1="12" y1="6" x2="12" y2="10" />
          <line x1="4.5" y1="16" x2="4.5" y2="13" />
          <line x1="12" y1="16" x2="12" y2="13" />
          <line x1="19.5" y1="16" x2="19.5" y2="13" />
          <line x1="4.5" y1="13" x2="19.5" y2="13" />
          <line x1="12" y1="10" x2="12" y2="13" />
        </>
      }
    />
  ),
  wrench: (
    <SvgIcon
      path={
        <>
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </>
      }
    />
  ),
  hardDrive: (
    <SvgIcon
      path={
        <>
          <line x1="22" y1="12" x2="2" y2="12" />
          <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
          <line x1="6" y1="16" x2="6.01" y2="16" />
          <line x1="10" y1="16" x2="10.01" y2="16" />
        </>
      }
    />
  ),
  languages: (
    <SvgIcon
      path={
        <>
          <path d="m5 8 6 6" />
          <path d="m4 14 6-6 2-3" />
          <path d="M2 5h12" />
          <path d="M7 2h1" />
          <path d="m22 22-5-10-5 10" />
          <path d="M14 18h6" />
        </>
      }
    />
  ),
};

// ─── MODAL ────────────────────────────────────────────────────────────────────
function PackageModal({ pkg, onClose, t }) {
  if (!pkg) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.8)",
        backdropFilter: "blur(8px)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        animation: "fadeIn 0.2s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--bg)",
          border: `1px solid ${pkg.highlight ? "rgba(200,240,96,0.35)" : "var(--border2)"}`,
          borderRadius: "28px",
          maxWidth: "540px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
          animation: "slideUp 0.28s cubic-bezier(0.16,1,0.3,1)",
          boxShadow: pkg.highlight
            ? "0 32px 80px -16px rgba(200,240,96,0.15)"
            : "0 32px 80px -16px rgba(0,0,0,0.5)",
        }}
      >
        {/* Modal header strip */}
        <div
          style={{
            padding: "2rem 2rem 0",
            background: pkg.highlight ? "rgba(200,240,96,0.04)" : "transparent",
            borderRadius: "28px 28px 0 0",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: "1.5rem",
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: pkg.highlight
                  ? "rgba(200,240,96,0.12)"
                  : "var(--bg2)",
                border: `1px solid ${pkg.highlight ? "rgba(200,240,96,0.25)" : "var(--border)"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: pkg.highlight ? "var(--accent)" : "var(--muted)",
              }}
            >
              {ICONS[pkg.icon]}
            </div>
            <button
              onClick={onClose}
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: "1px solid var(--border2)",
                background: "var(--bg2)",
                color: "var(--muted)",
                cursor: "pointer",
                fontSize: "0.85rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "border-color 0.2s, color 0.2s",
              }}
            >
              ✕
            </button>
          </div>

          {pkg.badge && (
            <div
              style={{
                display: "inline-block",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                background: "var(--accent)",
                color: "#0a0a0a",
                borderRadius: 100,
                padding: "0.2rem 0.75rem",
                marginBottom: "0.75rem",
              }}
            >
              {t[pkg.badge] || pkg.badge}
            </div>
          )}

          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.6rem",
              fontWeight: 800,
              letterSpacing: "-0.035em",
              lineHeight: 1.1,
              marginBottom: "0.5rem",
            }}
          >
            {t[pkg.nameKey] || pkg.nameKey}
          </div>
          <p
            style={{
              color: "var(--muted)",
              fontSize: "0.875rem",
              lineHeight: 1.7,
              fontWeight: 300,
              marginBottom: "1.5rem",
            }}
          >
            {t[pkg.descKey] || pkg.descKey}
          </p>

          {/* Price block */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "1.1rem 1.25rem",
              background: "var(--bg2)",
              border: `1px solid ${pkg.highlight ? "rgba(200,240,96,0.2)" : "var(--border)"}`,
              borderRadius: 16,
              marginBottom: "1.75rem",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2.6rem",
                  fontWeight: 800,
                  color: "var(--accent)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  marginBottom: "0.2rem",
                }}
              >
                {t[pkg.priceKey] || pkg.priceKey}
              </div>
              <div style={{ color: "var(--muted)", fontSize: "0.78rem" }}>
                {t[pkg.priceNoteKey] || pkg.priceNoteKey}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: "0.4rem",
              }}
            >
              <span
                style={{
                  fontSize: "0.78rem",
                  color: "var(--muted)",
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  borderRadius: 100,
                  padding: "0.25rem 0.75rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {t[pkg.timelineKey] || pkg.timelineKey}
              </span>
            </div>
          </div>
        </div>

        {/* Features list */}
        <div style={{ padding: "0 2rem" }}>
          <div
            style={{
              fontSize: "0.68rem",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--muted)",
              fontWeight: 600,
              marginBottom: "0.85rem",
            }}
          >
            {t.pkg_includes || "Included"}
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {pkg.features.map((f, idx) => (
              <li
                key={f.key}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                  padding: "0.6rem 0",
                  borderBottom:
                    idx < pkg.features.length - 1
                      ? "1px solid var(--border)"
                      : "none",
                  fontSize: "0.875rem",
                  lineHeight: 1.55,
                  fontWeight: 300,
                  color: "var(--text)",
                }}
              >
                <span
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 6,
                    background: "rgba(200,240,96,0.1)",
                    border: "1px solid rgba(200,240,96,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span>
                  {t[f.key] || f.key}
                  {f.free && (
                    <span
                      style={{
                        marginLeft: "0.4rem",
                        fontSize: "0.6rem",
                        background: "rgba(200,240,96,0.12)",
                        border: "1px solid rgba(200,240,96,0.25)",
                        color: "var(--accent)",
                        borderRadius: 100,
                        padding: "0.1rem 0.45rem",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        verticalAlign: "middle",
                      }}
                    >
                      {t.free_badge || "FREE"}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div style={{ padding: "1.5rem 2rem 2rem" }}>
          <Link
            to={`/hire?paket=${pkg.id}`}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              padding: "0.9rem",
              background: "var(--accent)",
              color: "#0a0a0a",
              borderRadius: 100,
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "0.9rem",
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
          >
            {t.pkg_cta_start || "Počni projekat"}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </Link>
          <p
            style={{
              textAlign: "center",
              fontSize: "0.75rem",
              color: "var(--muted)",
              marginTop: "0.75rem",
              fontWeight: 300,
            }}
          >
            {t.pkg_note_short || "Fixed price · Written quote"}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function PricingPage() {
  const { t, lang } = useLang();
  const navigate = useNavigate();
  const [selectedPkg, setSelectedPkg] = useState(null);
  usePageReveal("pricing-page");

  useSEO({
    title: `${t.pricing_page_title || "Cjenovnik"} — Adis Klobodanović`,
    description:
      t.pricing_page_desc ||
      "Paketi i cijene za web stranice. Starter od 150 KM, Business od 350 KM, Premium od 600 KM.",
    canonical: "https://adiss.dev/pricing",
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://adiss.dev",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Pricing",
          item: "https://adiss.dev/pricing",
        },
      ],
    },
  });

  return (
    <>
      <style>{`
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes slideUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }

        .pricing-hero {
          padding: 5rem 0 3rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .pricing-hero::before {
          content:'';
          position:absolute;top:-80px;left:50%;transform:translateX(-50%);
          width:560px;height:360px;
          background:radial-gradient(ellipse, rgba(200,240,96,0.07) 0%, transparent 65%);
          pointer-events:none;
        }

        .packages-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          margin-top: 3rem;
        }
        .pkg-card {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 22px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          position: relative;
          cursor: pointer;
          transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
        }
        .pkg-card:hover {
          border-color: var(--border2);
          transform: translateY(-4px);
          box-shadow: 0 24px 60px -12px rgba(0,0,0,0.4);
        }
        .pkg-card.featured {
          border-color: rgba(200,240,96,0.3);
          background: rgba(200,240,96,0.025);
        }
        .pkg-card.featured:hover {
          border-color: rgba(200,240,96,0.5);
          box-shadow: 0 24px 60px -12px rgba(200,240,96,0.12);
        }
        .pkg-badge {
          position: absolute;
          top: -12px; left: 50%; transform: translateX(-50%);
          background: var(--accent); color: #0a0a0a;
          font-family: var(--font-display); font-weight: 700;
          font-size: 0.7rem; padding: 0.25rem 0.9rem;
          border-radius: 100px; white-space: nowrap;
          letter-spacing: 0.06em; text-transform: uppercase;
        }
        .pkg-icon {
          width: 42px; height: 42px; border-radius: 11px;
          background: rgba(200,240,96,0.08);
          border: 1px solid rgba(200,240,96,0.18);
          display: flex; align-items: center; justify-content: center;
          color: var(--accent); margin-bottom: 0.85rem;
        }
        .pkg-name {
          font-family: var(--font-display); font-size: 1.2rem;
          font-weight: 700; letter-spacing: -0.02em; margin-bottom: 0.4rem;
        }
        .pkg-desc {
          color: var(--muted); font-size: 0.85rem;
          font-weight: 300; line-height: 1.65; margin-bottom: 1.1rem;
        }
        .pkg-price {
          font-family: var(--font-display);
          font-size: 2.4rem; font-weight: 800;
          color: var(--accent); letter-spacing: -0.04em;
          line-height: 1; margin-bottom: 0.3rem;
        }
        .pkg-price-note { font-size: 0.78rem; color: var(--muted); margin-bottom: 1.1rem; }
        .pkg-features { list-style: none; flex: 1; margin-bottom: 1.25rem; }
        .pkg-features li {
          display: flex; align-items: flex-start; gap: 0.6rem;
          font-size: 0.85rem; color: var(--muted);
          padding: 0.4rem 0; border-bottom: 1px solid var(--border);
          line-height: 1.5; font-weight: 300;
        }
        .pkg-features li:last-child { border-bottom: none; }
        .pkg-check { color: var(--accent); font-size: 0.85rem; flex-shrink: 0; margin-top: 0.1rem; }
        .pkg-footer {
          padding-top: 1.25rem;
          border-top: 1px solid var(--border);
          margin-top: auto;
        }
        .pkg-cta-btn {
          display: block; text-align: center;
          padding: 0.75rem;
          font-family: var(--font-display); font-weight: 700;
          font-size: 0.875rem; border-radius: 100px;
          cursor: pointer; transition: opacity 0.2s, background 0.2s;
          text-decoration: none;
        }
        .pkg-cta-btn.solid { background: var(--accent); color: #0a0a0a; }
        .pkg-cta-btn.solid:hover { opacity: 0.85; }
        .pkg-cta-btn.outline { background: none; border: 1px solid var(--border2); color: var(--text); }
        .pkg-cta-btn.outline:hover { border-color: var(--accent); color: var(--accent); }
        .pkg-details-hint {
          text-align: center; font-size: 0.72rem;
          color: var(--muted); margin-top: 0.65rem;
          opacity: 0.6;
        }
        .pkg-timeline {
          display: inline-flex; align-items: center; gap: 0.35rem;
          font-size: 0.72rem; color: var(--muted);
          border: 1px solid var(--border); border-radius: 100px;
          padding: 0.2rem 0.6rem; margin-bottom: 1.5rem;
        }

        /* ADDONS */
        .addons-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.85rem;
          margin-top: 2.5rem;
        }
        .addon-card {
          background: var(--bg2); border: 1px solid var(--border);
          border-radius: 14px; padding: 1rem 1.15rem;
          display: flex; align-items: center;
          justify-content: space-between; gap: 1rem;
          transition: border-color 0.2s;
        }
        .addon-card:hover { border-color: var(--border2); }
        .addon-icon {
          width: 36px; height: 36px; border-radius: 9px;
          background: rgba(200,240,96,0.07);
          border: 1px solid rgba(200,240,96,0.12);
          display: flex; align-items: center;
          justify-content: center; color: var(--accent); flex-shrink: 0;
        }
        .addon-name { font-size: 0.88rem; font-weight: 500; margin-bottom: 0.15rem; }
        .addon-desc { font-size: 0.76rem; color: var(--muted); font-weight: 300; line-height: 1.4; }
        .addon-price {
          font-family: var(--font-display); font-weight: 700;
          color: var(--accent); font-size: 0.95rem;
          white-space: nowrap; text-align: right;
          flex-shrink: 0;
        }
        .addon-per { display: block; font-size: 0.65rem; color: var(--muted); font-family: var(--font-body); font-weight: 300; }
        .addon-badge {
          margin-top: 0.25rem;
          display: inline-block;
          font-size: 0.62rem;
          padding: 0.1rem 0.45rem;
          border-radius: 999px;
          border: 1px solid rgba(200,240,96,0.25);
          background: rgba(200,240,96,0.1);
          color: var(--accent);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-weight: 700;
        }

        /* REFERRAL */
        .referral-box {
          background: rgba(200,240,96,0.03);
          border: 1px solid rgba(200,240,96,0.16);
          border-radius: 22px; padding: 2.5rem;
        }
        .ref-steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem; margin: 1.75rem 0 1.25rem;
        }
        .ref-step {
          background: var(--bg2); border: 1px solid var(--border);
          border-radius: 14px; padding: 1.25rem;
        }
        .ref-step-num {
          font-family: var(--font-display);
          font-size: 2rem; font-weight: 800;
          color: var(--border2); line-height: 1;
          margin-bottom: 0.5rem; letter-spacing: -0.04em;
        }

        [data-theme="light"] .pkg-card { background: #fff; border-color: rgba(0,0,0,0.08); }
        [data-theme="light"] .pkg-card.featured { border-color: rgba(77,105,0,0.2); }
        [data-theme="light"] .addon-card { background: #fff; border-color: rgba(0,0,0,0.08); }
        [data-theme="light"] .referral-box { background: rgba(77,105,0,0.03); border-color: rgba(77,105,0,0.14); }
        [data-theme="light"] .ref-step { background: rgba(0,0,0,0.03); }

        @media (max-width: 860px) {
          .packages-grid { grid-template-columns: 1fr; }
          .addons-grid { grid-template-columns: 1fr; }
          .ref-steps { grid-template-columns: 1fr; }
        }

        /* Reveal */
        .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.55s ease, transform 0.55s ease; }
        .reveal.visible { opacity: 1; transform: none; }
        .reveal-delay-1 { transition-delay: 0.05s; }
        .reveal-delay-2 { transition-delay: 0.12s; }
        .reveal-delay-3 { transition-delay: 0.19s; }
      `}</style>

      {selectedPkg && (
        <PackageModal
          pkg={selectedPkg}
          onClose={() => setSelectedPkg(null)}
          t={t}
        />
      )}

      <Nav />

      <main
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem 6rem" }}
      >
        {/* HERO */}
        <div className="pricing-hero reveal">
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.72rem",
              color: "var(--accent)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 500,
              marginBottom: "1.25rem",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "var(--accent)",
                animation: "pulse 2.2s infinite",
              }}
            />
            {t.pricing_tag || "Transparentne cijene"}
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              marginBottom: "1rem",
            }}
          >
            {t.pricing_h1_1 || "Paketi"}{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "var(--muted)",
                fontWeight: 400,
              }}
            >
              {t.pricing_h1_2 || "i cijene."}
            </em>
          </h1>
          <p
            style={{
              color: "var(--muted)",
              fontSize: "1rem",
              fontWeight: 300,
              maxWidth: "460px",
              margin: "0 auto 1rem",
              lineHeight: 1.8,
            }}
          >
            {t.pricing_sub ||
              "Fiksna cijena, ne po satu. Znaš broj prije nego što išta počne."}
          </p>
          <div
            style={{
              display: "inline-block",
              marginTop: "0.75rem",
              fontSize: "0.82rem",
              color: "var(--muted)",
              border: "1px solid var(--border2)",
              borderRadius: "100px",
              padding: "0.35rem 1rem",
            }}
          >
            <strong style={{ color: "var(--accent)" }}>
              {t.pricing_click_package || "Klikni na paket"}
            </strong>{" "}
            {t.pricing_hint || "da vidiš detaljan breakdown"}
          </div>
        </div>

        {/* PACKAGES */}
        <section style={{ marginBottom: "0.75rem" }}>
          <div className="section-label reveal">
            {t.pricing_pkgs_label || "Paketi"}
          </div>
          <h2 className="section-title reveal">
            {t.pricing_pkgs_title || "Šta sve uključuje svaki paket"}
          </h2>
          <p className="section-sub reveal">
            {t.pricing_pkgs_sub ||
              "Klikni na paket da vidiš tačan breakdown stavku po stavku."}
          </p>

          <div className="packages-grid">
            {PACKAGES.map((pkg, i) => (
              <div
                key={pkg.id}
                className={`pkg-card${pkg.highlight ? " featured" : ""} reveal reveal-delay-${i + 1}`}
                onClick={() => setSelectedPkg(pkg)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setSelectedPkg(pkg)}
              >
                {pkg.badge && (
                  <div className="pkg-badge">{t[pkg.badge] || pkg.badge}</div>
                )}
                <div className="pkg-icon">{ICONS[pkg.icon]}</div>
                <div className="pkg-name">{t[pkg.nameKey] || pkg.nameKey}</div>
                <p className="pkg-desc">{t[pkg.descKey] || pkg.descKey}</p>
                <div className="pkg-timeline">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ flexShrink: 0 }}
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {t[pkg.timelineKey] || pkg.timelineKey}
                </div>
                <div className="pkg-price">
                  {t[pkg.priceKey] || pkg.priceKey}
                </div>
                <div className="pkg-price-note">
                  {t[pkg.priceNoteKey] || pkg.priceNoteKey}
                </div>
                <ul className="pkg-features">
                  {pkg.features.slice(0, 5).map((f, j) => (
                    <li key={j}>
                      <span className="pkg-check">✓</span>
                      <span>
                        {t[f.key] || f.key}
                        {f.free && (
                          <span
                            style={{
                              marginLeft: "0.4rem",
                              fontSize: "0.6rem",
                              background: "rgba(200,240,96,0.12)",
                              border: "1px solid rgba(200,240,96,0.25)",
                              color: "var(--accent)",
                              borderRadius: "100px",
                              padding: "0.1rem 0.4rem",
                              fontWeight: 700,
                              letterSpacing: "0.06em",
                              verticalAlign: "middle",
                            }}
                          >
                            {t.free_badge || "FREE"}
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                  {pkg.features.length > 5 && (
                    <li
                      style={{
                        color: "var(--accent)",
                        fontSize: "0.78rem",
                        borderBottom: "none",
                      }}
                    >
                      + {pkg.features.length - 5} {t.pkg_more || "više stavki"}
                      ...
                    </li>
                  )}
                </ul>
                <div className="pkg-footer">
                  <div
                    className={`pkg-cta-btn ${pkg.highlight ? "solid" : "outline"}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/hire?paket=${pkg.id}`);
                    }}
                  >
                    {t.pkg_cta_start || "Počni projekat"} ↗
                  </div>
                  <div className="pkg-details-hint">
                    {t.pkg_click_details || "Klikni na karticu za detalje"}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p
            style={{
              marginTop: "1.5rem",
              textAlign: "center",
              fontSize: "0.82rem",
              color: "var(--muted)",
              border: "1px solid var(--border)",
              borderRadius: "100px",
              display: "inline-block",
              padding: "0.4rem 1.25rem",
            }}
          >
            {t.pkg_note ||
              "Svaki projekat dobija pisanu ponudu. Ovo su polazišne tačke, ne stropovi."}
          </p>
        </section>

        <div
          style={{
            height: "1px",
            background: "var(--border)",
            margin: "0 0 4rem",
          }}
        />

        {/* ADDONS */}
        <section style={{ marginBottom: "0.75rem" }}>
          <div className="section-label reveal">
            {t.addons_label || "Dodaci"}
          </div>
          <h2 className="section-title reveal">
            {t.addons_title || "Dodatne usluge"}
          </h2>
          <p className="section-sub reveal">
            {t.addons_sub || "Može se dodati na bilo koji paket."}
          </p>

          <div className="addons-grid">
            {ADDONS.map((addon) => (
              <div key={addon.nameKey} className="addon-card reveal">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.85rem",
                  }}
                >
                  <div className="addon-icon">{ICONS[addon.icon]}</div>
                  <div>
                    <div className="addon-name">
                      {t[addon.nameKey] || addon.nameKey}
                    </div>
                    <div className="addon-desc">
                      {t[addon.descKey] || addon.descKey}
                    </div>
                  </div>
                </div>
                <div className="addon-price">
                  {formatAddonPrice(addon.priceKM, lang)}
                  <span className="addon-per">
                    {t[addon.perKey] || addon.perKey}
                  </span>
                  {addon.clientPays && (
                    <span className="addon-badge">
                      {t.addon_client_pays || "Klijent plaća godišnje"}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div
          style={{
            height: "1px",
            background: "var(--border)",
            margin: "0 0 4rem",
          }}
        />

        {/* REFERRAL */}
        <section style={{ marginBottom: "1rem" }}>
          <div className="referral-box reveal">
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.4rem",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                marginBottom: "0.5rem",
              }}
            >
              {t.referral_title_1 || "Preporuči nekoga."}{" "}
              <span style={{ color: "var(--accent)" }}>
                {t.referral_title_2 || "Oboje dobijete popust."}
              </span>
            </div>
            <p
              style={{
                color: "var(--muted)",
                fontSize: "0.9rem",
                fontWeight: 300,
                lineHeight: 1.75,
                maxWidth: "480px",
              }}
            >
              {t.referral_sub ||
                "Ako preporučiš nekoga ko naruči projekat, ti dobijaš 10% popusta na sljedeći projekat — a tvoj prijatelj dobija 10% off od starta."}
            </p>
            <div className="ref-steps">
              <div className="ref-step">
                <div className="ref-step-num">01</div>
                <h4
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    marginBottom: "0.4rem",
                  }}
                >
                  {t.ref_step1_title || "Ti preporučiš"}
                </h4>
                <p
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--muted)",
                    fontWeight: 300,
                    lineHeight: 1.65,
                  }}
                >
                  {t.ref_step1_body ||
                    "Pošalji email ili poruku — nije potrebna formalna prijava."}
                </p>
              </div>
              <div className="ref-step">
                <div className="ref-step-num">02</div>
                <h4
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    marginBottom: "0.4rem",
                  }}
                >
                  {t.ref_step2_title || "Oni naruče"}
                </h4>
                <p
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--muted)",
                    fontWeight: 300,
                    lineHeight: 1.65,
                  }}
                >
                  {t.ref_step2_body ||
                    "Tvoj prijatelj pomene tvoje ime — odmah dobija popust od 10%."}
                </p>
              </div>
              <div className="ref-step">
                <div className="ref-step-num">03</div>
                <h4
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    marginBottom: "0.4rem",
                  }}
                >
                  {t.ref_step3_title || "Ti dobijaš popust"}
                </h4>
                <p
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--muted)",
                    fontWeight: 300,
                    lineHeight: 1.65,
                  }}
                >
                  {t.ref_step3_body ||
                    "Na tvoj sljedeći projekat — automatski, bez papirologije."}
                </p>
              </div>
            </div>
            <div
              style={{
                background: "var(--bg2)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                padding: "1rem 1.25rem",
                fontSize: "0.85rem",
                color: "var(--muted)",
                lineHeight: 1.8,
                fontWeight: 300,
              }}
            >
              <strong style={{ color: "var(--text)" }}>
                {t.example_label || "Primjer"}:
              </strong>{" "}
              {t.referral_example ||
                "Preporučiš Business paket (350 KM). Prijatelj plaća 315 KM. Tvoj sljedeći projekat je 10% jeftiniji — automatski."}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          style={{ textAlign: "center", padding: "3rem 0 2rem" }}
          className="reveal"
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              marginBottom: "0.75rem",
            }}
          >
            {t.pricing_cta_title || "Spreman za početi?"}{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "var(--muted)",
                fontWeight: 400,
              }}
            >
              {t.pricing_cta_title2 || "Razgovarajmo."}
            </em>
          </h2>
          <p
            style={{
              color: "var(--muted)",
              fontSize: "0.9rem",
              fontWeight: 300,
              marginBottom: "1.75rem",
            }}
          >
            {t.pricing_cta_sub || "Popuni kratku formu. Odgovorim za 24 sata."}
          </p>
          <div
            style={{
              display: "flex",
              gap: "0.85rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              to="/hire"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.8rem 1.75rem",
                background: "var(--accent)",
                color: "#0a0a0a",
                borderRadius: "100px",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "0.9rem",
                textDecoration: "none",
              }}
            >
              {t.pricing_cta_btn || "Počni projekat"} ↗
            </Link>
            <Link
              to="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.8rem 1.5rem",
                border: "1px solid var(--border2)",
                color: "var(--text)",
                borderRadius: "100px",
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: "0.9rem",
                textDecoration: "none",
              }}
            >
              ← {t.pricing_back || "Nazad na portfolio"}
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
