import { useLang } from "../context/LangContext";
import { formatAddonPrice } from "../config/packages";
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
  FileIcon,
  ClockIcon,
  UserIcon,
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

function buildPaketOptions(t) {
  return [
    {
      id: "starter",
      label: t.form_pkg_starter || "Starter",
      price: 200,
      Icon: ZapIcon,
    },
    {
      id: "business",
      label: t.form_pkg_business || "Business",
      price: 400,
      Icon: GlobeIcon,
    },
    {
      id: "premium",
      label: t.form_pkg_premium || "Premium",
      price: 650,
      Icon: RocketIcon,
    },
    {
      id: "custom",
      label: t.form_pkg_custom || "Custom",
      price: 0,
      Icon: LayersIcon,
    },
  ];
}

const ADDON_OPTIONS = [
  {
    id: "googlebiz",
    Icon: MapPinIcon,
    labelKey: "addon_googlebiz_name",
    price: 60,
    perKey: "addon_per_onetime",
  },
  {
    id: "emailsig",
    Icon: MailIcon,
    labelKey: "addon_emailsig_name",
    price: 40,
    perKey: "addon_per_onetime",
  },
  {
    id: "logo",
    Icon: PaletteIcon,
    labelKey: "addon_logo_name",
    price: 80,
    perKey: "addon_per_onetime",
  },
  {
    id: "social",
    Icon: SmartphoneIcon,
    labelKey: "addon_social_name",
    price: 50,
    perKey: "addon_per_onetime",
  },
  {
    id: "booking",
    Icon: CalendarIcon,
    labelKey: "addon_booking_name",
    price: 70,
    perKey: "addon_per_onetime",
  },
  {
    id: "translation",
    Icon: GlobeIcon,
    labelKey: "addon_translation_name",
    price: 60,
    perKey: "addon_per_onetime",
  },
  {
    id: "copy",
    Icon: PenIcon,
    labelKey: "addon_copy_name",
    price: 70,
    perKey: "addon_per_page",
  },
  {
    id: "gallery",
    Icon: ImageIcon,
    labelKey: "addon_gallery_name",
    price: 40,
    perKey: "addon_per_onetime",
  },
  {
    id: "reviews",
    Icon: StarIcon,
    labelKey: "addon_reviews_name",
    price: 35,
    perKey: "addon_per_onetime",
  },
  {
    id: "qr",
    Icon: QrCodeIcon,
    labelKey: "addon_qr_name",
    price: 15,
    perKey: "addon_per_onetime",
  },
  {
    id: "analytics",
    Icon: BarChartIcon,
    labelKey: "addon_analytics_name",
    price: 30,
    perKey: "addon_per_onetime",
  },
  {
    id: "menu",
    Icon: MenuSquareIcon,
    labelKey: "addon_menu_name",
    price: 55,
    perKey: "addon_per_onetime",
  },
  {
    id: "ssl",
    Icon: ShieldIcon,
    labelKey: "addon_ssl_name",
    price: 20,
    perKey: "addon_per_yearly",
  },
  {
    id: "domain",
    Icon: LinkIcon,
    labelKey: "addon_domain_name",
    price: 30,
    perKey: "addon_per_yearly",
  },
  {
    id: "hosting",
    Icon: ServerIcon,
    labelKey: "addon_hosting_name",
    price: 50,
    perKey: "addon_per_yearly",
  },
  {
    id: "proemail",
    Icon: AtSignIcon,
    labelKey: "addon_proemail_name",
    price: 25,
    perKey: "addon_per_yearly",
  },
  {
    id: "chatwidget",
    Icon: MailIcon,
    labelKey: "addon_chatwidget_name",
    price: 25,
    perKey: "addon_per_onetime",
  },
  {
    id: "faqsection",
    Icon: FileIcon,
    labelKey: "addon_faqsection_name",
    price: 40,
    perKey: "addon_per_onetime",
  },
  {
    id: "countdown",
    Icon: ClockIcon,
    labelKey: "addon_countdown_name",
    price: 30,
    perKey: "addon_per_onetime",
  },
  {
    id: "cookiebanner",
    Icon: ShieldIcon,
    labelKey: "addon_cookiebanner_name",
    price: 35,
    perKey: "addon_per_onetime",
  },
  {
    id: "speedopt",
    Icon: ZapIcon,
    labelKey: "addon_speedopt_name",
    price: 60,
    perKey: "addon_per_onetime",
  },
  {
    id: "darkmode",
    Icon: UserIcon,
    labelKey: "addon_darkmode_name",
    price: 40,
    perKey: "addon_per_onetime",
  },
  {
    id: "video",
    Icon: ImageIcon,
    labelKey: "addon_video_name",
    price: 35,
    perKey: "addon_per_onetime",
  },
  {
    id: "slider",
    Icon: LayersIcon,
    labelKey: "addon_slider_name",
    price: 35,
    perKey: "addon_per_onetime",
  },
  {
    id: "newsletter",
    Icon: MailIcon,
    labelKey: "addon_newsletter_name",
    price: 45,
    perKey: "addon_per_onetime",
  },
  {
    id: "pdf",
    Icon: FileIcon,
    labelKey: "addon_pdf_name",
    price: 40,
    perKey: "addon_per_onetime",
  },
  {
    id: "pricingtable",
    Icon: BarChartIcon,
    labelKey: "addon_pricingtable_name",
    price: 45,
    perKey: "addon_per_onetime",
  },
  {
    id: "blog",
    Icon: PenIcon,
    labelKey: "addon_blog_name",
    price: 80,
    perKey: "addon_per_onetime",
  },
  {
    id: "careers",
    Icon: RocketIcon,
    labelKey: "addon_careers_name",
    price: 50,
    perKey: "addon_per_onetime",
  },
  {
    id: "formsadv",
    Icon: SendIcon,
    labelKey: "addon_formsadv_name",
    price: 55,
    perKey: "addon_per_onetime",
  },
  {
    id: "mapsadv",
    Icon: MapPinIcon,
    labelKey: "addon_mapsadv_name",
    price: 50,
    perKey: "addon_per_onetime",
  },
  {
    id: "promobar",
    Icon: GlobeIcon,
    labelKey: "addon_promobar_name",
    price: 25,
    perKey: "addon_per_onetime",
  },
  {
    id: "sitemap",
    Icon: LinkIcon,
    labelKey: "addon_sitemap_name",
    price: 30,
    perKey: "addon_per_onetime",
  },
  {
    id: "maintenance",
    Icon: ZapIcon,
    labelKey: "addon_maintenance_name",
    price: 40,
    perKey: "addon_per_yearly",
  },
  {
    id: "backup",
    Icon: ServerIcon,
    labelKey: "addon_backup_name",
    price: 30,
    perKey: "addon_per_yearly",
  },
  {
    id: "multisite",
    Icon: LanguagesIcon,
    labelKey: "addon_multisite_name",
    price: 80,
    perKey: "addon_per_onetime",
  },
];

function AddonAccordion({ selectedAddons, setSelectedAddons, t, lang }) {
  const [open, setOpen] = useState(false);
  const GROUPS = [
    {
      label: t.addon_group_onetime || "One-time",
      items: ADDON_OPTIONS.filter((a) => a.perKey === "addon_per_onetime"),
    },
    {
      label: t.addon_group_yearly || "Yearly",
      items: ADDON_OPTIONS.filter((a) => a.perKey === "addon_per_yearly"),
    },
    {
      label: t.addon_group_perpage || "Per page",
      items: ADDON_OPTIONS.filter((a) => a.perKey === "addon_per_page"),
    },
  ].filter((g) => g.items.length > 0);
  const count = selectedAddons.length;
  return (
    <div className="addon-accordion">
      <button
        type="button"
        className={`addon-accordion-trigger${open ? " open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="addon-accordion-label">
          {t.hire_addons_label || "Add-ons"}
          {count > 0 && <span className="addon-accordion-badge">{count}</span>}
        </span>
        <span className="addon-accordion-hint">
          {count > 0
            ? selectedAddons
                .map((id) => {
                  const a = ADDON_OPTIONS.find((x) => x.id === id);
                  return a ? t[a.labelKey] || a.labelKey : "";
                })
                .filter(Boolean)
                .join(", ")
            : t.hire_addons_hint || "optional — click to expand"}
        </span>
        <span className={`addon-accordion-chevron${open ? " rotated" : ""}`}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>
      {open && (
        <div className="addon-accordion-body">
          {GROUPS.map((group) => (
            <div key={group.label} className="addon-group">
              <div className="addon-group-label">{group.label}</div>
              <div className="addon-chips-grid">
                {group.items.map(({ id, Icon, labelKey, price }) => {
                  const checked = selectedAddons.includes(id);
                  return (
                    <button
                      key={id}
                      type="button"
                      className={`hire-addon-chip${checked ? " checked" : ""}`}
                      onClick={() =>
                        setSelectedAddons((prev) =>
                          checked
                            ? prev.filter((x) => x !== id)
                            : [...prev, id],
                        )
                      }
                      aria-pressed={checked}
                    >
                      <span className="hire-addon-chip-icon">
                        <Icon size={13} />
                      </span>
                      <span style={{ flex: 1 }}>
                        <span
                          style={{
                            display: "block",
                            fontSize: "0.77rem",
                            fontWeight: 500,
                            color: "var(--text)",
                          }}
                        >
                          {t[labelKey] || labelKey}
                        </span>
                        <span
                          style={{ fontSize: "0.69rem", color: "var(--muted)" }}
                        >
                          +{formatAddonPrice(price, lang)}
                        </span>
                      </span>
                      {checked && (
                        <span className="hire-addon-chip-check">
                          <CheckIcon size={11} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

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

export default function CTA() {
  const { t, lang } = useLang();
  const formRef = useRef(null);
  const PAKET_OPTIONS = buildPaketOptions(t);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [selectedPaket, setSelectedPaket] = useState("");
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [toast, setToast] = useState({ title: "", sub: "", type: "success" });

  const showToast = (title, sub = "", type = "success") => {
    setToast({ title, sub, type });
    setTimeout(() => setToast({ title: "", sub: "", type: "success" }), 5000);
  };

  const selectedPackagePrice =
    PAKET_OPTIONS.find((p) => p.id === selectedPaket)?.price || 0;
  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const addon = ADDON_OPTIONS.find((a) => a.id === id);
    return sum + (addon?.price || 0);
  }, 0);
  const totalPrice = selectedPackagePrice + addonsTotal;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPaket) {
      const grid = document.querySelector(".cta-pkg-grid");
      grid?.classList.add("shake");
      setTimeout(() => grid?.classList.remove("shake"), 500);
      return;
    }
    setSending(true);
    const data = Object.fromEntries(new FormData(formRef.current));
    const paketObj = PAKET_OPTIONS.find((p) => p.id === selectedPaket);
    const paketLabel = paketObj
      ? paketObj.price
        ? `${paketObj.label} (${formatAddonPrice(paketObj.price, lang)})`
        : paketObj.label
      : selectedPaket;

    if (formRef.current) {
      let h = formRef.current.querySelector('input[name="paket_display"]');
      if (!h) {
        h = document.createElement("input");
        h.type = "hidden";
        h.name = "paket_display";
        formRef.current.appendChild(h);
      }
      h.value = paketLabel;
      let addonsHidden = formRef.current.querySelector(
        'input[name="addons_display"]',
      );
      if (!addonsHidden) {
        addonsHidden = document.createElement("input");
        addonsHidden.type = "hidden";
        addonsHidden.name = "addons_display";
        formRef.current.appendChild(addonsHidden);
      }
      addonsHidden.value = selectedAddons
        .map((id) => {
          const addon = ADDON_OPTIONS.find((a) => a.id === id);
          return addon
            ? `${t[addon.labelKey] || addon.labelKey} (${formatAddonPrice(addon.price, lang)})`
            : "";
        })
        .filter(Boolean)
        .join(", ");
      let totalHidden = formRef.current.querySelector(
        'input[name="total_display"]',
      );
      if (!totalHidden) {
        totalHidden = document.createElement("input");
        totalHidden.type = "hidden";
        totalHidden.name = "total_display";
        formRef.current.appendChild(totalHidden);
      }
      totalHidden.value = formatAddonPrice(totalPrice, lang);
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
          `Name: ${data.name}\nEmail: ${data.from_email}\nPackage: ${paketLabel}\n\n${data.message}`,
        );
        window.location.href = `mailto:info@adiss.dev?subject=${subject}&body=${body}`;
        showToast(t.toast_opening || "Opening mail client...");
        setSending(false);
        return;
      }
      formRef.current.reset();
      setSelectedPaket("");
      setSelectedAddons([]);
      setDone(true);
      // GA4 conversion event
      window.gtag?.("event", "form_submit", {
        event_category: "contact",
        event_label: selectedPaket,
        value: totalPrice,
      });
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
        .cta-form-wrap { max-width:580px; margin:2.5rem auto 0; text-align:left; }
        .cta-form-inner { display:flex; flex-direction:column; gap:1rem; }
        .cta-row { display:grid; grid-template-columns:1fr 1fr; gap:1rem; }
        .hire-input {
          width:100%; padding:0.8rem 1rem; border-radius:10px;
          border:1px solid var(--border); background:var(--bg2);
          color:var(--text); font-size:0.9rem; font-family:inherit;
          transition:border-color 0.2s,box-shadow 0.2s; box-sizing:border-box;
        }
        .hire-input:focus { outline:none; border-color:var(--accent); box-shadow:0 0 0 3px rgba(200,240,96,0.1); }
        .hire-field-label { font-size:0.72rem; color:var(--muted); text-transform:uppercase; letter-spacing:0.1em; font-weight:500; margin-bottom:0.55rem; display:block; }
        .hire-pkg-grid { display:grid; grid-template-columns:1fr 1fr; gap:0.6rem; }
        .hire-pkg-grid.shake { animation:shake 0.4s ease; }
        .cta-pkg-grid { display:grid; grid-template-columns:1fr 1fr; gap:0.6rem; }
        .cta-pkg-grid.shake { animation:shake 0.4s ease; }
        .hire-pkg-pill {
          position:relative; display:flex; align-items:center; gap:0.45rem;
          padding:0.65rem 0.9rem; border-radius:10px; border:1px solid var(--border);
          background:var(--bg2); color:var(--muted); font-size:0.82rem; font-family:inherit;
          cursor:pointer; transition:border-color 0.18s,background 0.18s,color 0.18s; text-align:left; width:100%;
        }
        .hire-pkg-pill:hover { border-color:rgba(200,240,96,0.4); color:var(--text); }
        .hire-pkg-pill.selected { border-color:var(--accent); background:rgba(200,240,96,0.07); color:var(--text); }
        .hire-pkg-pill-icon { color:var(--muted); display:flex; align-items:center; flex-shrink:0; transition:color 0.18s; }
        .hire-pkg-pill.selected .hire-pkg-pill-icon { color:var(--accent); }
        .hire-pkg-pill-label { font-weight:500; flex:1; }
        .hire-pkg-pill-price { font-size:0.75rem; color:var(--accent); font-weight:600; }
        .hire-pkg-pill-check { color:var(--accent); display:flex; align-items:center; }
        .hire-total-bar {
          display:flex; align-items:center; justify-content:space-between;
          border:1px solid var(--border); border-radius:10px;
          padding:0.7rem 0.9rem; font-size:0.84rem;
        }
        .hire-addon-chip {
          display:flex; align-items:center; gap:0.5rem; padding:0.55rem 0.65rem;
          border-radius:10px; border:1px solid var(--border); background:var(--bg2);
          cursor:pointer; transition:border-color 0.15s,background 0.15s; text-align:left; width:100%;
        }
        .hire-addon-chip:hover { border-color:rgba(200,240,96,0.3); }
        .hire-addon-chip.checked { border-color:rgba(200,240,96,0.5); background:rgba(200,240,96,0.07); }
        .hire-addon-chip-icon { color:var(--muted); display:flex; align-items:center; flex-shrink:0; }
        .hire-addon-chip.checked .hire-addon-chip-icon { color:var(--accent); }
        .hire-addon-chip-check { color:var(--accent); display:flex; align-items:center; margin-left:auto; }
        .addon-accordion { border:1px solid var(--border); border-radius:10px; overflow:hidden; }
        .addon-accordion-trigger {
          width:100%; display:flex; align-items:center; gap:0.5rem;
          padding:0.75rem 0.9rem; background:var(--bg2); border:none;
          cursor:pointer; text-align:left; transition:background 0.15s;
        }
        .addon-accordion-trigger:hover { background:var(--bg3,var(--bg2)); }
        .addon-accordion-trigger.open { border-bottom:1px solid var(--border); }
        .addon-accordion-label { font-size:0.78rem; font-weight:600; color:var(--text); text-transform:uppercase; letter-spacing:0.08em; white-space:nowrap; display:flex; align-items:center; gap:0.4rem; }
        .addon-accordion-badge { display:inline-flex; align-items:center; justify-content:center; background:var(--accent); color:#0a0a0a; border-radius:99px; width:17px; height:17px; font-size:0.65rem; font-weight:700; }
        .addon-accordion-hint { flex:1; font-size:0.75rem; color:var(--muted); overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
        .addon-accordion-chevron { color:var(--muted); display:flex; transition:transform 0.2s; flex-shrink:0; }
        .addon-accordion-chevron.rotated { transform:rotate(180deg); }
        .addon-accordion-body { padding:0.75rem 0.9rem; display:flex; flex-direction:column; gap:0.85rem; background:var(--bg2); }
        .addon-group-label { font-size:0.69rem; color:var(--muted); text-transform:uppercase; letter-spacing:0.1em; font-weight:500; margin-bottom:0.4rem; }
        .addon-chips-grid { display:grid; grid-template-columns:1fr 1fr; gap:0.45rem; }
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
        .cta-success { text-align:center; padding:2.5rem 2rem; background:rgba(200,240,96,0.05); border:1px solid rgba(200,240,96,0.2); border-radius:18px; max-width:580px; margin:2.5rem auto 0; }
        .cta-success-icon { width:48px; height:48px; border-radius:50%; background:rgba(200,240,96,0.15); display:flex; align-items:center; justify-content:center; color:var(--accent); margin:0 auto 1rem; }
        [data-theme="light"] .hire-input { background:#fff; color:#111; border-color:rgba(0,0,0,0.15); }
        [data-theme="light"] .hire-input::placeholder { color:#888 !important; }
        [data-theme="light"] .hire-pkg-pill, [data-theme="light"] .hire-addon-chip { background:#fff; border-color:rgba(0,0,0,0.12); }
        [data-theme="light"] .hire-pkg-pill.selected { background:rgba(200,240,96,0.12); }
        [data-theme="light"] .hire-addon-chip.checked { background:rgba(200,240,96,0.12); }
        [data-theme="light"] .addon-accordion-trigger, [data-theme="light"] .addon-accordion-body { background:#fff; }
        [data-theme="light"] .cta-linkedin-btn { background:#fff; border-color:rgba(0,0,0,0.12); }
        @media(max-width:500px) { .cta-row,.hire-pkg-grid,.addon-chips-grid{grid-template-columns:1fr} }
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
                  className="hire-input"
                />
                <input
                  name="from_email"
                  type="email"
                  placeholder={t.hire_email || "your@email.com"}
                  aria-label={t.hire_email || "your@email.com"}
                  required
                  autoComplete="email"
                  className="hire-input"
                />
              </div>

              <div>
                <span className="hire-field-label">
                  {t.form_pkg_placeholder || "Select a package"}
                </span>
                <div className="hire-pkg-grid">
                  {PAKET_OPTIONS.map(({ id, label, price, Icon }) => {
                    const isSel = selectedPaket === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        className={`hire-pkg-pill${isSel ? " selected" : ""}`}
                        onClick={() => setSelectedPaket(isSel ? "" : id)}
                        aria-pressed={isSel}
                      >
                        <span className="hire-pkg-pill-icon">
                          <Icon size={15} />
                        </span>
                        <span className="hire-pkg-pill-label">{label}</span>
                        {price > 0 && (
                          <span className="hire-pkg-pill-price">
                            {formatAddonPrice(price, lang)}
                          </span>
                        )}
                        {isSel && (
                          <span className="hire-pkg-pill-check">
                            <CheckIcon size={12} />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                <input
                  type="hidden"
                  name="paket"
                  value={selectedPaket}
                  readOnly
                />
              </div>

              <AddonAccordion
                selectedAddons={selectedAddons}
                setSelectedAddons={setSelectedAddons}
                t={t}
                lang={lang}
              />

              <div className="hire-total-bar">
                <span style={{ color: "var(--muted)" }}>
                  {t.hire_total_label || "Total estimate"}
                </span>
                <strong style={{ color: "var(--text)", fontSize: "0.95rem" }}>
                  {totalPrice > 0 ? formatAddonPrice(totalPrice, lang) : "—"}
                </strong>
              </div>

              <textarea
                name="message"
                placeholder={t.hire_message || "Tell me about your project..."}
                aria-label={t.hire_message || "Tell me about your project..."}
                required
                className="hire-input"
                style={{ minHeight: "110px", resize: "vertical" }}
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
                onClick={() =>
                  window.gtag?.("event", "linkedin_click", {
                    event_category: "outbound",
                    event_label: "cta_section",
                  })
                }
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
