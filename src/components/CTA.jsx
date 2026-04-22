import { useLang } from "../context/LangContext";
import { useState, useRef } from "react";
import {
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  EMAILJS_READY,
} from "../config/emailjs";
import {
  CheckIcon,
  XIcon,
  SendIcon,
  SpinnerIcon,
  LayersIcon,
  GlobeIcon,
  RocketIcon,
  ZapIcon,
  LinkedInIcon,
  MapPinIcon,
  MailIcon,
  PaletteIcon,
  SmartphoneIcon,
  CalendarIcon,
  LanguagesIcon,
  StarIcon,
  QrCodeIcon,
  BarChartIcon,
  MenuSquareIcon,
  ShieldIcon,
  LinkIcon,
  ServerIcon,
  AtSignIcon,
  ImageIcon,
  PenIcon,
} from "./Icons";

function buildPackages(t) {
  return [
    {
      id: "starter",
      labelKey: "form_pkg_starter",
      priceKey: "form_pkg_starter_price",
      Icon: ZapIcon,
    },
    {
      id: "business",
      labelKey: "form_pkg_business",
      priceKey: "form_pkg_business_price",
      Icon: GlobeIcon,
    },
    {
      id: "premium",
      labelKey: "form_pkg_premium",
      priceKey: "form_pkg_premium_price",
      Icon: RocketIcon,
    },
    {
      id: "custom",
      labelKey: "form_pkg_custom",
      priceKey: null,
      Icon: LayersIcon,
    },
  ];
}

const CTA_TOP_ADDONS = [
  { id: "logo", Icon: PaletteIcon, labelKey: "addon_logo_name", price: 80 },
  {
    id: "social",
    Icon: SmartphoneIcon,
    labelKey: "addon_social_name",
    price: 50,
  },
  {
    id: "booking",
    Icon: CalendarIcon,
    labelKey: "addon_booking_name",
    price: 70,
  },
  {
    id: "hosting",
    Icon: ServerIcon,
    labelKey: "addon_hosting_name",
    price: 50,
  },
  { id: "copy", Icon: PenIcon, labelKey: "addon_copy_name", price: 70 },
];

function Toast({ title, sub, type, onClose }) {
  if (!title) return null;
  const isSuccess = type === "success";
  return (
    <div
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        zIndex: 9999,
        background: isSuccess ? "var(--accent)" : "#e74c3c",
        color: isSuccess ? "#0a0a0a" : "#fff",
        borderRadius: "14px",
        padding: "1rem 1.25rem",
        boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
        display: "flex",
        alignItems: "flex-start",
        gap: "0.65rem",
        animation: "slideInToast 0.3s ease",
        maxWidth: "320px",
      }}
    >
      <span style={{ marginTop: "2px", flexShrink: 0 }}>
        {isSuccess ? <CheckIcon size={16} /> : <XIcon size={16} />}
      </span>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2px",
          flex: 1,
        }}
      >
        <span style={{ fontSize: "0.88rem", fontWeight: 600 }}>{title}</span>
        {sub && (
          <span style={{ fontSize: "0.78rem", opacity: 0.75, fontWeight: 400 }}>
            {sub}
          </span>
        )}
      </div>
      <button
        onClick={onClose}
        style={{
          background: "none",
          border: "none",
          color: "inherit",
          cursor: "pointer",
          padding: 0,
          opacity: 0.6,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
        }}
        aria-label="Close"
      >
        <XIcon size={14} />
      </button>
    </div>
  );
}

function PackagePills({ packages, selected, onSelect, t }) {
  return (
    <div className="cta-pkg-grid">
      {packages.map(({ id, labelKey, priceKey, Icon }) => {
        const isSel = selected === id;
        return (
          <button
            key={id}
            type="button"
            className={`cta-pkg-pill${isSel ? " selected" : ""}`}
            onClick={() => onSelect(isSel ? "" : id)}
            aria-pressed={isSel}
          >
            <span className="cta-pkg-pill-icon">
              <Icon size={15} />
            </span>
            <span className="cta-pkg-pill-label">{t[labelKey]}</span>
            {priceKey && (
              <span className="cta-pkg-pill-price">{t[priceKey]}</span>
            )}
            {isSel && (
              <span className="cta-pkg-pill-check">
                <CheckIcon size={12} />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default function CTA() {
  const { t } = useLang();
  const formRef = useRef(null);
  const PACKAGES = buildPackages(t);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState("");
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [toast, setToast] = useState({ title: "", sub: "", type: "success" });

  const showToast = (title, sub = "", type = "success") => {
    setToast({ title, sub, type });
    setTimeout(() => setToast({ title: "", sub: "", type: "success" }), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPkg) {
      const grid = document.querySelector(".cta-pkg-grid");
      grid?.classList.add("shake");
      setTimeout(() => grid?.classList.remove("shake"), 500);
      return;
    }
    setSending(true);
    const data = Object.fromEntries(new FormData(formRef.current));
    const pkgObj = PACKAGES.find((p) => p.id === selectedPkg);
    const pkgLabel = pkgObj
      ? pkgObj.priceKey
        ? `${t[pkgObj.labelKey]} (${t[pkgObj.priceKey]})`
        : t[pkgObj.labelKey]
      : selectedPkg;

    if (formRef.current) {
      let h = formRef.current.querySelector('input[name="paket_display"]');
      if (!h) {
        h = document.createElement("input");
        h.type = "hidden";
        h.name = "paket_display";
        formRef.current.appendChild(h);
      }
      h.value = pkgLabel;
    }
    try {
      if (EMAILJS_READY) {
        const { default: emailjs } = await import("@emailjs/browser");
        await emailjs.sendForm(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          formRef.current,
          EMAILJS_PUBLIC_KEY,
        );
      } else {
        const subject = encodeURIComponent(`Project inquiry from ${data.name}`);
        const body = encodeURIComponent(
          `Name: ${data.name}\nEmail: ${data.from_email}\nPackage: ${pkgLabel}\n\n${data.message}`,
        );
        window.location.href = `mailto:adis.klobodanovic@gmail.com?subject=${subject}&body=${body}`;
        showToast(t.toast_opening || "Opening mail client...");
        setSending(false);
        return;
      }
      formRef.current.reset();
      setSelectedPkg("");
      setSelectedAddons([]);
      setDone(true);
      showToast(
        t.toast_sent_title || "Message sent",
        t.toast_sent_sub || "I'll reply within 24h.",
      );
    } catch {
      showToast(
        t.toast_error_title || "Something went wrong.",
        t.toast_error_sub || "Try emailing directly.",
        "error",
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes slideInToast { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }
        @keyframes shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-5px)} 40%,80%{transform:translateX(5px)} }
        .cta-form-wrap { max-width:560px; margin:2.5rem auto 0; text-align:left; }
        .cta-form-inner { display:flex; flex-direction:column; gap:1rem; }
        .cta-row { display:grid; grid-template-columns:1fr 1fr; gap:1rem; }
        .cta-form-inner input,.cta-form-inner textarea {
          width:100%; padding:0.8rem 1rem; border-radius:10px;
          border:1px solid var(--border); background:var(--bg2);
          color:var(--text); font-size:0.9rem; font-family:inherit;
          transition:border-color 0.2s,box-shadow 0.2s; box-sizing:border-box;
        }
        .cta-form-inner input:focus,.cta-form-inner textarea:focus {
          outline:none; border-color:var(--accent); box-shadow:0 0 0 3px rgba(200,240,96,0.1);
        }
        .cta-form-inner textarea { resize:vertical; min-height:110px; }
        .cta-pkg-label { font-size:0.72rem; color:var(--muted); text-transform:uppercase; letter-spacing:0.1em; font-weight:500; margin-bottom:0.55rem; display:block; }
        .cta-pkg-grid { display:grid; grid-template-columns:1fr 1fr; gap:0.6rem; }
        .cta-pkg-grid.shake { animation:shake 0.4s ease; }
        .cta-pkg-pill {
          position:relative; display:flex; align-items:center; gap:0.45rem;
          padding:0.65rem 0.9rem; border-radius:10px; border:1px solid var(--border);
          background:var(--bg2); color:var(--muted); font-size:0.82rem; font-family:inherit;
          cursor:pointer; transition:border-color 0.18s,background 0.18s,color 0.18s; text-align:left; width:100%;
        }
        .cta-pkg-pill:hover { border-color:rgba(200,240,96,0.4); color:var(--text); }
        .cta-pkg-pill.selected { border-color:var(--accent); background:rgba(200,240,96,0.07); color:var(--text); }
        .cta-pkg-pill-icon { color:var(--muted); display:flex; align-items:center; flex-shrink:0; transition:color 0.18s; }
        .cta-pkg-pill.selected .cta-pkg-pill-icon { color:var(--accent); }
        .cta-pkg-pill-label { font-weight:500; flex:1; }
        .cta-pkg-pill-price { font-size:0.75rem; color:var(--accent); font-weight:600; white-space:nowrap; }
        .cta-pkg-pill-check { color:var(--accent); display:flex; align-items:center; margin-left:auto; }
        .cta-divider { display:flex; align-items:center; gap:1rem; color:var(--muted); font-size:0.78rem; }
        .cta-divider::before,.cta-divider::after { content:''; flex:1; height:1px; background:var(--border); }
        .cta-submit { width:100%; display:flex; align-items:center; justify-content:center; gap:0.5rem; }
        .cta-linkedin-btn {
          display:flex; align-items:center; justify-content:center; gap:0.55rem; width:100%;
          padding:0.8rem 1.25rem; border-radius:10px; border:1px solid var(--border);
          background:transparent; color:var(--muted); font-size:0.88rem; font-family:inherit;
          font-weight:500; text-decoration:none; cursor:pointer; transition:border-color 0.2s,color 0.2s;
        }
        .cta-linkedin-btn:hover { border-color:var(--border2); color:var(--text); }
        .cta-success { text-align:center; padding:2.5rem 2rem; background:rgba(200,240,96,0.05); border:1px solid rgba(200,240,96,0.2); border-radius:18px; max-width:560px; margin:2.5rem auto 0; }
        .cta-success-icon { width:48px; height:48px; border-radius:50%; background:rgba(200,240,96,0.15); display:flex; align-items:center; justify-content:center; color:var(--accent); margin:0 auto 1rem; }
        [data-theme="light"] .cta-form-inner input,[data-theme="light"] .cta-form-inner textarea { background:#fff; color:#111; border-color:rgba(0,0,0,0.15); }
        [data-theme="light"] .cta-form-inner input::placeholder,[data-theme="light"] .cta-form-inner textarea::placeholder { color:#999; }
        [data-theme="light"] .cta-pkg-pill { background:#fff; border-color:rgba(0,0,0,0.12); }
        [data-theme="light"] .cta-pkg-pill.selected { background:rgba(200,240,96,0.12); }
        [data-theme="light"] .cta-linkedin-btn { background:#fff; border-color:rgba(0,0,0,0.12); }
        @media(max-width:500px) { .cta-row{grid-template-columns:1fr} }
      `}</style>

      <section id="contact" className="cta-section">
        <div className="cta-glow" />
        <h2
          className="reveal"
          dangerouslySetInnerHTML={{ __html: t.cta_title }}
        />
        <p className="cta-human reveal">{t.cta_sub}</p>

        {done ? (
          <div className="cta-success reveal">
            <div className="cta-success-icon">
              <CheckIcon size={22} />
            </div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.2rem",
                marginBottom: "0.4rem",
                letterSpacing: "-0.02em",
              }}
            >
              {t.hire_msg_received_title}
            </h3>
            <p
              style={{
                color: "var(--muted)",
                fontWeight: 300,
                fontSize: "0.9rem",
              }}
            >
              {t.hire_msg_received_sub}
            </p>
          </div>
        ) : (
          <div className="cta-form-wrap reveal">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="cta-form-inner"
            >
              <div className="cta-row">
                <input
                  name="name"
                  type="text"
                  placeholder={t.hire_name || "Your name"}
                  aria-label={t.hire_name || "Your name"}
                  required
                  autoComplete="name"
                />
                <input
                  name="from_email"
                  type="email"
                  placeholder={t.hire_email || "your@email.com"}
                  aria-label={t.hire_email || "your@email.com"}
                  required
                  autoComplete="email"
                />
              </div>
              <div>
                <span className="cta-pkg-label">
                  {t.form_pkg_placeholder || "Select a package"}
                </span>
                <PackagePills
                  packages={PACKAGES}
                  selected={selectedPkg}
                  onSelect={setSelectedPkg}
                  t={t}
                />
                <input
                  type="hidden"
                  name="paket"
                  value={selectedPkg}
                  readOnly
                />
              </div>
              <div>
                <span className="cta-pkg-label">
                  {t.hire_addons_label || "Add-ons"}{" "}
                  <span
                    style={{
                      fontWeight: 300,
                      textTransform: "none",
                      letterSpacing: 0,
                      opacity: 0.6,
                    }}
                  >
                    {t.hire_addons_optional || "(optional)"}
                  </span>
                </span>
                <div
                  className="cta-pkg-grid"
                  style={{ gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem" }}
                >
                  {CTA_TOP_ADDONS.map(({ id, Icon, labelKey, price }) => {
                    const checked = selectedAddons.includes(id);
                    return (
                      <button
                        key={id}
                        type="button"
                        className={`cta-pkg-pill${checked ? " selected" : ""}`}
                        style={{
                          flexDirection: "column",
                          alignItems: "flex-start",
                          padding: "0.55rem 0.7rem",
                          gap: "0.2rem",
                        }}
                        onClick={() =>
                          setSelectedAddons((prev) =>
                            checked
                              ? prev.filter((x) => x !== id)
                              : [...prev, id],
                          )
                        }
                        aria-pressed={checked}
                      >
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.35rem",
                            width: "100%",
                          }}
                        >
                          <span className="cta-pkg-pill-icon">
                            <Icon size={13} />
                          </span>
                          <span
                            className="cta-pkg-pill-label"
                            style={{ fontSize: "0.74rem" }}
                          >
                            {t[labelKey] || labelKey}
                          </span>
                          {checked && (
                            <span
                              className="cta-pkg-pill-check"
                              style={{ marginLeft: "auto" }}
                            >
                              <CheckIcon size={11} />
                            </span>
                          )}
                        </span>
                        <span
                          style={{
                            fontSize: "0.7rem",
                            color: "var(--accent)",
                            fontWeight: 600,
                            paddingLeft: "1.3rem",
                          }}
                        >
                          +{price} KM
                        </span>
                      </button>
                    );
                  })}
                </div>
                <input
                  type="hidden"
                  name="addons_display"
                  value={selectedAddons
                    .map((id) => {
                      const a = CTA_TOP_ADDONS.find((x) => x.id === id);
                      return a
                        ? `${t[a.labelKey] || a.labelKey} (+${a.price} KM)`
                        : "";
                    })
                    .filter(Boolean)
                    .join(", ")}
                  readOnly
                />
              </div>
              <textarea
                name="message"
                placeholder={t.hire_message || "Tell me about your project..."}
                aria-label={t.hire_message || "Tell me about your project..."}
                required
              />
              <button
                type="submit"
                className="btn-primary cta-submit"
                disabled={sending}
                style={{
                  cursor: sending ? "not-allowed" : "pointer",
                  opacity: sending ? 0.6 : 1,
                }}
              >
                {sending ? (
                  <>
                    <SpinnerIcon size={16} />
                    {t.hire_sending || "Sending..."}
                  </>
                ) : (
                  <>
                    <SendIcon size={16} />
                    {t.hire_send || "Send message"}
                  </>
                )}
              </button>
              <div className="cta-divider">{t.form_or || "or"}</div>
              <a
                href="https://linkedin.com/in/adis-klobodanovic"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-linkedin-btn"
              >
                <LinkedInIcon size={16} />
                {t.form_linkedin || "Connect on LinkedIn"}
              </a>
            </form>
          </div>
        )}

        <p className="cta-note reveal" style={{ marginTop: "1.5rem" }}>
          {t.cta_note}
        </p>
      </section>

      <Toast
        title={toast.title}
        sub={toast.sub}
        type={toast.type}
        onClose={() => setToast({ title: "" })}
      />
    </>
  );
}
