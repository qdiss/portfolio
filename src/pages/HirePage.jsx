import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useLang } from "../context/LangContext";
import Nav from "../components/Nav";
import {
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  EMAILJS_READY,
} from "../config/emailjs";
import { useSEO } from "../hooks/useSEO";
import { usePageReveal } from "../hooks/useReveal";
import {
  CheckIcon,
  XIcon,
  ClockIcon,
  FileIcon,
  ZapIcon,
  PenIcon,
  UserIcon,
  GlobeIcon,
  RocketIcon,
  LayersIcon,
  SendIcon,
  SpinnerIcon,
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
} from "../components/Icons";

function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let rafId;
    let current = 0;
    const fn = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const total = scrollHeight - clientHeight;
      const target = total > 0 ? (scrollTop / total) * 100 : 0;
      // lerp — smooth follow
      current += (target - current) * 0.12;
      setP(current);
      rafId = requestAnimationFrame(fn);
    };
    rafId = requestAnimationFrame(fn);
    return () => cancelAnimationFrame(rafId);
  }, []);
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        height: "2px",
        width: `${p}%`,
        background: "var(--accent)",
        pointerEvents: "none",
        boxShadow:
          "0 0 10px rgba(200,240,96,0.6), 0 0 4px rgba(200,240,96,0.4)",
        willChange: "width",
      }}
    />
  );
}

//
function buildPaketOptions(t) {
  return [
    {
      id: "starter",
      label: t.form_pkg_starter || "Starter",
      price: 150,
      Icon: ZapIcon,
    },
    {
      id: "business",
      label: t.form_pkg_business || "Business",
      price: 350,
      Icon: GlobeIcon,
    },
    {
      id: "premium",
      label: t.form_pkg_premium || "Premium",
      price: 600,
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
];

function AddonAccordion({ selectedAddons, setSelectedAddons, t }) {
  const [open, setOpen] = useState(false);

  const GROUPS = [
    {
      label: t.addon_group_onetime || "One-time",
      items: ADDON_OPTIONS.filter((a) => a.perKey === "addon_per_onetime"),
    },
    {
      label: t.addon_group_yearly || "Yearly (hosting & maintenance)",
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
                          +{price} KM
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

function ContactForm({ t, preselectedPaket }) {
  const PAKET_OPTIONS = buildPaketOptions(t);
  const formRef = useRef(null);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [selectedPaket, setSelectedPaket] = useState(preselectedPaket || "");
  const [selectedAddons, setSelectedAddons] = useState([]);

  const selectedPackagePrice =
    PAKET_OPTIONS.find((p) => p.id === selectedPaket)?.price || 0;
  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const addon = ADDON_OPTIONS.find((a) => a.id === id);
    return sum + (addon?.price || 0);
  }, 0);
  const totalPrice = selectedPackagePrice + addonsTotal;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");
    const data = Object.fromEntries(new FormData(formRef.current));
    // Build paket label with price for email
    const paketObj = PAKET_OPTIONS.find((p) => p.id === data.paket);
    const paketLabel = paketObj
      ? paketObj.price
        ? `${paketObj.label} (${paketObj.price} KM)`
        : paketObj.label
      : data.paket;
    // Inject readable paket into hidden field for emailjs
    if (formRef.current) {
      let hidden = formRef.current.querySelector('input[name="paket_display"]');
      if (!hidden) {
        hidden = document.createElement("input");
        hidden.type = "hidden";
        hidden.name = "paket_display";
        formRef.current.appendChild(hidden);
      }
      hidden.value = paketLabel;
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
            ? `${t[addon.labelKey] || addon.labelKey} (${addon.price} KM)`
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
      totalHidden.value = `${totalPrice} KM`;
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
        const subject = encodeURIComponent(`Upit za projekat od ${data.name}`);
        const body = encodeURIComponent(
          `Ime: ${data.name}\nEmail: ${data.from_email}\nPaket: ${paketLabel}\n\n${data.message}`,
        );
        window.location.href = `mailto:adis.klobodanovic@gmail.com?subject=${subject}&body=${body}`;
      }
      formRef.current.reset();
      setSelectedPaket("");
      setSelectedAddons([]);
      setDone(true);
    } catch {
      setError(
        t.hire_form_error || "Greška pri slanju. Pokušaj ponovo za minutu.",
      );
    } finally {
      setSending(false);
    }
  };

  if (done)
    return (
      <div
        style={{
          textAlign: "center",
          padding: "3rem",
          background: "rgba(200,240,96,0.05)",
          border: "1px solid rgba(200,240,96,0.2)",
          borderRadius: "18px",
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: "rgba(200,240,96,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--accent)",
            margin: "0 auto 1.25rem",
          }}
        >
          <CheckIcon size={24} />
        </div>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.4rem",
            marginBottom: "0.5rem",
            letterSpacing: "-0.02em",
          }}
        >
          {t.hire_msg_received_title}
        </h3>
        <p style={{ color: "var(--muted)", fontWeight: 300 }}>
          {t.hire_msg_received_sub}
        </p>
      </div>
    );

  return (
    <>
      <style>{`
        .hire-form-inner { display:flex; flex-direction:column; gap:1rem; }
        .hire-form-row { display:grid; grid-template-columns:1fr 1fr; gap:1rem; }
        .hire-input {
          width:100%; padding:0.8rem 1rem; border-radius:10px;
          border:1px solid var(--border); background:var(--bg2);
          color:var(--text); font-size:0.9rem; font-family:inherit;
          transition:border-color 0.2s,box-shadow 0.2s; box-sizing:border-box;
        }
        .hire-input:focus { outline:none; border-color:var(--accent); box-shadow:0 0 0 3px rgba(200,240,96,0.1); }
        .hire-field-label { font-size:0.72rem; color:var(--muted); text-transform:uppercase; letter-spacing:0.1em; font-weight:500; margin-bottom:0.55rem; display:block; }
        .hire-pkg-grid { display:grid; grid-template-columns:1fr 1fr; gap:0.6rem; }
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
        .hire-addons-grid { display:grid; grid-template-columns:1fr 1fr; gap:0.5rem; }
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
        .hire-total-bar {
          display:flex; align-items:center; justify-content:space-between;
          border:1px solid var(--border); border-radius:10px;
          padding:0.7rem 0.9rem; font-size:0.84rem;
        }
        [data-theme="light"] .hire-input { background:#fff; color:#111; border-color:rgba(0,0,0,0.15); }
        [data-theme="light"] .hire-pkg-pill,[data-theme="light"] .hire-addon-chip { background:#fff; border-color:rgba(0,0,0,0.12); }
        [data-theme="light"] .hire-pkg-pill.selected { background:rgba(200,240,96,0.12); }
        [data-theme="light"] .hire-addon-chip.checked { background:rgba(200,240,96,0.12); }
        @media(max-width:500px) { .hire-form-row,.hire-pkg-grid,.hire-addons-grid{grid-template-columns:1fr} }
        /* Accordion */
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
        [data-theme="light"] .addon-accordion-trigger,[data-theme="light"] .addon-accordion-body { background:#fff; }
        @media(max-width:500px) { .addon-chips-grid{grid-template-columns:1fr} }
      `}</style>
      <form ref={formRef} onSubmit={handleSubmit} className="hire-form-inner">
        <div className="hire-form-row">
          <input
            name="name"
            type="text"
            placeholder={t.hire_name}
            aria-label={t.hire_name}
            required
            autoComplete="name"
            className="hire-input"
          />
          <input
            name="from_email"
            type="email"
            placeholder={t.hire_email}
            aria-label={t.hire_email}
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
                    <span className="hire-pkg-pill-price">{price} KM</span>
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
          <input type="hidden" name="paket" value={selectedPaket} readOnly />
        </div>
        <AddonAccordion
          selectedAddons={selectedAddons}
          setSelectedAddons={setSelectedAddons}
          t={t}
        />
        <div className="hire-total-bar">
          <span style={{ color: "var(--muted)" }}>
            {t.hire_total_label || "Total estimate"}
          </span>
          <strong style={{ color: "var(--text)", fontSize: "0.95rem" }}>
            {totalPrice > 0 ? `${totalPrice} KM` : "—"}
          </strong>
        </div>
        <textarea
          name="message"
          placeholder={t.hire_message}
          aria-label={t.hire_message}
          required
          className="hire-input"
          style={{ minHeight: "130px", resize: "vertical" }}
        />
        {error && (
          <p style={{ color: "#e74c3c", fontSize: "0.85rem" }}>{error}</p>
        )}
        <button
          type="submit"
          disabled={sending}
          className="btn-primary"
          style={{
            cursor: sending ? "not-allowed" : "pointer",
            opacity: sending ? 0.6 : 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          {sending ? (
            <>
              <SpinnerIcon size={16} />
              {t.hire_sending}
            </>
          ) : (
            <>
              <SendIcon size={16} />
              {t.hire_send}
            </>
          )}
        </button>
      </form>
    </>
  );
}

// Data arrays are now built dynamically inside HirePage from translations (see below)

export default function HirePage() {
  const { t } = useLang();
  const [searchParams] = useSearchParams();
  const preselectedPaket = searchParams.get("paket") || "";
  usePageReveal("hire-page");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSEO({
    title: t.hire_seo_title || "Start a Project — Adis Klobodanović | Full-Stack Developer",
    description:
      t.hire_seo_desc || "Ready to build something? Fixed-price web development — landing pages from $600, web apps from $3,000. Fast turnaround, full ownership.",
    canonical: "https://adiss.dev/hire",
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
          name: "Hire",
          item: "https://adiss.dev/hire",
        },
      ],
    },
  });

  const PACKAGES = [
    {
      name: t.pkg_starter_name || "Starter",
      price: "150 KM",
      timeline: t.pkg_starter_timeline || "5 dana",
      popular: false,
      desc: t.pkg_starter_short || t.hire_pkg1_desc,
      includes: [
        t.pkg_starter_f1 || "Single-page website",
        t.pkg_starter_f2 || "Contact form",
        t.pkg_starter_f3 || "Google Maps embed",
        t.pkg_starter_f4 || "Mobile-responsive",
        t.pkg_starter_f5 || "3 social posts",
        t.pkg_starter_f6 || "Delivered in 5 days",
      ],
      tag: null,
    },
    {
      name: t.pkg_business_name || "Business",
      price: "350 KM",
      timeline: t.pkg_business_timeline || "7 dana",
      popular: true,
      desc: t.pkg_business_short || t.hire_pkg2_desc,
      includes: [
        t.pkg_business_f1 || "Multi-page website",
        t.pkg_business_f2 || "Contact form",
        t.pkg_business_f3 || "Google Maps",
        t.pkg_business_f4 || "Social Media Kit",
        t.pkg_business_f5 || "Email signature",
        t.pkg_business_f6 || "Basic SEO",
        t.pkg_business_f7 || "Google Analytics",
        t.pkg_business_f8 || "WhatsApp button",
        t.pkg_business_f9 || "Mobile-responsive",
        t.pkg_business_f10 || "Delivered in 7 days",
      ],
      tag: t.hire_pkg2_tag,
    },
    {
      name: t.pkg_premium_name || "Premium",
      price: "600 KM",
      timeline: t.pkg_premium_timeline || "10 dana",
      popular: false,
      desc: t.pkg_premium_short || t.hire_pkg3_desc,
      includes: [
        t.pkg_premium_f1 || "Up to 10 pages",
        t.pkg_premium_f2 || "Google Business setup",
        t.pkg_premium_f3 || "Basic logo",
        t.pkg_premium_f4 || "Brand palette & fonts",
        t.pkg_premium_f5 || "20 Canva posts",
        t.pkg_premium_f6 || "Professional email",
        t.pkg_premium_f7 || "Cookie banner & privacy",
        t.pkg_premium_f8 || "Online booking",
        t.pkg_premium_f9 || "Advanced SEO",
        t.pkg_premium_f10 || "1 month support",
        t.pkg_premium_f11 || "Delivered in 10 days",
      ],
      tag: null,
    },
  ];

  const STEPS = [
    { n: "01", title: t.hire_step1_title, body: t.hire_step1_body },
    { n: "02", title: t.hire_step2_title, body: t.hire_step2_body },
    { n: "03", title: t.hire_step3_title, body: t.hire_step3_body },
    { n: "04", title: t.hire_step4_title, body: t.hire_step4_body },
    { n: "05", title: t.hire_step5_title, body: t.hire_step5_body },
    { n: "06", title: t.hire_step6_title, body: t.hire_step6_body },
    { n: "07", title: t.hire_step7_title, body: t.hire_step7_body },
  ];

  const NEED_FROM_YOU = [
    {
      Icon: FileIcon,
      title: t.hire_need1_title,
      body:
        t.hire_need1_body ||
        "What it does, who it's for, and what success looks like.",
    },
    {
      Icon: ZapIcon,
      title: t.hire_need2_title,
      body:
        t.hire_need2_body ||
        "Reply to questions and preview links quickly so momentum stays high.",
    },
    {
      Icon: ImageIcon,
      title: t.hire_need3_title,
      body:
        t.hire_need3_body ||
        "Prepare text, logos and images early so build and launch stay on schedule.",
    },
    {
      Icon: UserIcon,
      title: t.hire_need4_title,
      body:
        t.hire_need4_body ||
        "One clear decision-maker avoids conflicting feedback and delays.",
    },
  ];

  const WONT_DO = [t.hire_wont1, t.hire_wont2, t.hire_wont3, t.hire_wont4];

  const STD_INCLUDES = [
    [
      t.hire_std1_title || "Direct access",
      t.hire_std1_body ||
        "You talk to me. Not an account manager, not a junior. I answer messages myself.",
    ],
    [
      t.hire_std2_title || "Written scope",
      t.hire_std2_body ||
        "Scope, price, and timeline agreed in writing before anything starts. No surprises.",
    ],
    [
      t.hire_std3_title || "Live preview link",
      t.hire_std3_body ||
        "You see the project early. Real progress you can click through, not status updates.",
    ],
    [
      t.hire_std4_title || "Feedback rounds",
      t.hire_std4_body ||
        "Structured review rounds so feedback stays focused and iteration doesn't go in circles.",
    ],
    [
      t.hire_std5_title || "Full ownership",
      t.hire_std5_body ||
        "Code, domain, accounts — all yours after handover. I retain nothing.",
    ],
    [
      t.hire_std6_title || "Post-launch window",
      t.hire_std6_body ||
        "2 weeks of included fixes after delivery. Real bugs, not scope creep.",
    ],
  ];

  return (
    <>
      <style>{`
        .hire-section { padding: 5rem 2.5rem; max-width: 900px; margin: 0 auto; }
        .hire-section-wide { padding: 5rem 2.5rem; max-width: 1100px; margin: 0 auto; }
        .hire-divider { height: 1px; background: var(--border); margin: 0 2.5rem; }
        .pkg-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.25rem; margin-top: 2.5rem; }
        .pkg-card { background: var(--bg2); border: 1px solid var(--border); border-radius: 20px; padding: 2rem; position: relative; transition: border-color 0.2s, transform 0.2s; }
        .pkg-card:hover { border-color: var(--border2); transform: translateY(-3px); }
        .pkg-card.popular { border-color: rgba(200,240,96,0.35); background: rgba(200,240,96,0.03); }
        .pkg-badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: var(--accent); color: #0a0a0a; font-size: 0.68rem; font-weight: 700; padding: 0.2rem 0.75rem; border-radius: 100px; letter-spacing: 0.06em; text-transform: uppercase; white-space: nowrap; }
        .pkg-name { font-family: var(--font-display); font-size: 1.1rem; font-weight: 700; letter-spacing: -0.02em; margin-bottom: 0.35rem; }
        .pkg-price { font-family: var(--font-display); font-size: 1.85rem; font-weight: 800; color: var(--accent); letter-spacing: -0.04em; line-height: 1; margin-bottom: 0.3rem; }
        .pkg-timeline { font-size: 0.78rem; color: var(--muted); margin-bottom: 1rem; }
        .pkg-desc { font-size: 0.875rem; color: var(--muted); font-weight: 300; line-height: 1.65; margin-bottom: 1.25rem; }
        .pkg-includes { list-style: none; display: flex; flex-direction: column; gap: 0.45rem; }
        .pkg-includes li { font-size: 0.82rem; color: var(--muted); display: flex; align-items: center; gap: 0.5rem; }
        .pkg-includes li::before { content: '✓'; color: var(--accent); font-weight: 700; flex-shrink: 0; }
        .steps-list { display: flex; flex-direction: column; gap: 0; margin-top: 2.5rem; }
        .step-row { display: grid; grid-template-columns: 56px 1fr; gap: 1.5rem; padding: 1.75rem 0; border-bottom: 1px solid var(--border); align-items: start; }
        .step-row:last-child { border-bottom: none; }
        .step-num { font-family: var(--font-display); font-size: 1rem; color: var(--accent); font-weight: 700; letter-spacing: 0.08em; padding-top: 0.3rem; }
        .step-title { font-family: var(--font-display); font-size: 1.05rem; font-weight: 600; letter-spacing: -0.02em; margin-bottom: 0.4rem; }
        .step-body { color: var(--muted); font-size: 0.9rem; font-weight: 300; line-height: 1.75; }
        .needs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-top: 2.5rem; }
        .need-card { background: var(--bg2); border: 1px solid var(--border); border-radius: 16px; padding: 1.5rem; }
        .need-icon { font-size: 1.4rem; margin-bottom: 0.65rem; display: block; }
        .need-icon-svg { width:36px; height:36px; border-radius:8px; background:rgba(200,240,96,0.1); display:flex; align-items:center; justify-content:center; color:var(--accent); margin-bottom:0.65rem; }
        .need-title { font-family: var(--font-display); font-size: 0.95rem; font-weight: 600; letter-spacing: -0.02em; margin-bottom: 0.4rem; }
        .need-body { color: var(--muted); font-size: 0.875rem; font-weight: 300; line-height: 1.65; }
        .wont-list { list-style: none; display: flex; flex-direction: column; gap: 0.6rem; margin-top: 1.5rem; }
        .wont-list li { color: var(--muted); font-size: 0.9rem; display: flex; align-items: center; gap: 0.65rem; font-weight: 300; }
        .wont-list li::before { content: '—'; color: var(--muted2); flex-shrink: 0; }
        .hire-form-wrap { background: var(--bg2); border: 1px solid var(--border); border-radius: 24px; padding: 2.5rem; }
        .hire-hero-glow { position: absolute; top: -100px; right: -80px; width: 500px; height: 500px; background: radial-gradient(circle, rgba(200,240,96,0.07) 0%, transparent 65%); pointer-events: none; }
        /* Light mode input fixes */
        [data-theme="light"] input, [data-theme="light"] select, [data-theme="light"] textarea {
          background: #fff !important;
          color: #111 !important;
          border-color: rgba(0,0,0,0.15) !important;
        }
        [data-theme="light"] input::placeholder, [data-theme="light"] textarea::placeholder { color: #888 !important; }
        [data-theme="light"] .need-card, [data-theme="light"] .hire-form-wrap, [data-theme="light"] .pkg-card { background: #fff; border-color: rgba(0,0,0,0.1); }
        @media(max-width: 768px) {
          .pkg-grid { grid-template-columns: 1fr; }
          .needs-grid { grid-template-columns: 1fr; }
          .hire-section, .hire-section-wide { padding: 3.5rem 1.5rem; }
          .hire-divider { margin: 0 1.5rem; }
          .step-row { grid-template-columns: 42px 1fr; }
        }
          [data-theme="light"] .pkg-badge,
          [data-theme="light"] button[type="submit"].btn-primary,
          [data-theme="light"] a.btn-primary {
            color: #ffffff !important;
          }
      `}</style>

      <ScrollProgress />
      <Nav />

      {/* Hero */}
      <section
        style={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "8rem 2.5rem 4rem",
          position: "relative",
          // overflow: "hidden",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <div className="hire-hero-glow" />
        <div className="hero-tag reveal">
          <div className="pulse-dot" />
          <span>{t.hire_tag}</span>
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.6rem,6vw,5rem)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            marginBottom: "1.5rem",
          }}
          className="reveal"
        >
          {t.hire_h1_1}
          <br />
          <em
            style={{
              fontStyle: "italic",
              color: "var(--muted)",
              fontWeight: 400,
            }}
          >
            {t.hire_h1_2}
          </em>
        </h1>
        <p
          style={{
            fontSize: "1.05rem",
            color: "var(--muted)",
            fontWeight: 300,
            lineHeight: 1.85,
            maxWidth: "520px",
            marginBottom: "2.5rem",
          }}
          className="reveal"
        >
          {t.hire_intro}
        </p>
        {preselectedPaket && (
          <p
            className="reveal"
            style={{
              fontSize: "0.9rem",
              color: "var(--accent)",
              border: "1px solid rgba(200,240,96,0.25)",
              background: "rgba(200,240,96,0.06)",
              borderRadius: "999px",
              padding: "0.45rem 0.95rem",
              display: "inline-block",
              marginBottom: "1.25rem",
            }}
          >
            {t.hire_preselected_hint ||
              "Paket je već odabran. Samo popuni formu ispod."}
          </p>
        )}
        <div className="reveal">
          <a href="#form" className="btn-primary">
            {t.hire_skip}
          </a>
        </div>
      </section>

      <div className="hire-divider" />

      {/* What's included */}
      <div className="hire-section">
        <div className="section-label reveal">{t.hire_std_label}</div>
        <h2 className="section-title reveal">
          {t.hire_std_title_1}
          <br />
          <em>{t.hire_std_title_2}</em>
        </h2>
        <p
          style={{
            color: "var(--muted)",
            fontWeight: 300,
            lineHeight: 1.85,
            marginBottom: "2.5rem",
            maxWidth: "520px",
          }}
          className="reveal"
        >
          {t.hire_std_sub}
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
          className="reveal"
        >
          {STD_INCLUDES.map(([title, body]) => (
            <div
              key={title}
              style={{
                background: "var(--bg2)",
                border: "1px solid var(--border)",
                borderRadius: "14px",
                padding: "1.35rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.45rem",
                }}
              >
                <span
                  style={{
                    color: "var(--accent)",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <CheckIcon size={14} />
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {title}
                </span>
              </div>
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: "0.855rem",
                  fontWeight: 300,
                  lineHeight: 1.65,
                }}
              >
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="hire-divider" />

      {/* Packages */}
      <div className="hire-section-wide">
        <div className="section-label reveal">{t.hire_pricing_label}</div>
        <h2 className="section-title reveal">
          {t.hire_pricing_title_1}
          <br />
          <em>{t.hire_pricing_title_2}</em>
        </h2>
        <p
          style={{
            color: "var(--muted)",
            fontWeight: 300,
            lineHeight: 1.85,
            maxWidth: "520px",
          }}
          className="reveal"
        >
          {t.hire_pricing_sub}
        </p>
        <div className="pkg-grid reveal">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.name}
              className={`pkg-card${pkg.popular ? " popular" : ""}`}
            >
              {pkg.tag && <div className="pkg-badge">{pkg.tag}</div>}
              <div className="pkg-name">{pkg.name}</div>
              <div className="pkg-price">{pkg.price}</div>
              <div className="pkg-timeline">
                <ClockIcon
                  size={12}
                  style={{ marginRight: "0.3rem", verticalAlign: "middle" }}
                />
                {pkg.timeline}
              </div>
              <p className="pkg-desc">{pkg.desc}</p>
              <ul className="pkg-includes">
                {pkg.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p
          style={{
            marginTop: "1.5rem",
            color: "var(--muted)",
            fontSize: "0.82rem",
            fontWeight: 300,
          }}
        >
          {t.hire_pkg_note}
        </p>
      </div>

      <div className="hire-divider" />

      {/* Selected work */}
      <div className="hire-section-wide">
        <div className="section-label reveal">{t.hire_work_label}</div>
        <h2 className="section-title reveal">
          {t.hire_work_title_1}
          <br />
          <em>{t.hire_work_title_2}</em>
        </h2>
        <p
          style={{
            color: "var(--muted)",
            fontWeight: 300,
            lineHeight: 1.85,
            maxWidth: "520px",
          }}
          className="reveal"
        >
          {t.hire_work_sub}
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: "1.25rem",
            marginTop: "2.5rem",
          }}
          className="reveal"
        >
          {[
            {
              emoji: "🏥",
              tags: ["Next.js", "TypeScript", "Full-stack"],
              title: t.p1_title,
              desc: t.p1_desc,
              href: "https://medibook-pi.vercel.app/",
              link: t.proj_view,
            },
            {
              emoji: "🏠",
              tags: ["Next.js", "TailwindCSS", "Client project"],
              title: t.p2_title,
              desc: t.p2_desc,
              href: "https://dalmatinske-vizure.com",
              link: t.proj_live,
            },
          ].map((p) => (
            <a
              key={p.href}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card"
            >
              <div className="project-img" style={{ background: "var(--bg3)" }}>
                <span style={{ fontSize: "2.5rem" }}>{p.emoji}</span>
              </div>
              <div className="project-body">
                <div className="project-tags">
                  {p.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="project-link">{p.link}</div>
              </div>
            </a>
          ))}
        </div>
        <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
          <Link
            to="/"
            style={{
              fontSize: "0.85rem",
              color: "var(--muted)",
              textDecoration: "none",
              borderBottom: "1px solid var(--border)",
            }}
          >
            {t.hire_see_all}
          </Link>
        </div>
      </div>

      <div className="hire-divider" />

      {/* Process */}
      <div className="hire-section">
        <div className="section-label reveal">{t.hire_proc_label}</div>
        <h2 className="section-title reveal">
          {t.hire_proc_title_1}
          <br />
          <em>{t.hire_proc_title_2}</em>
        </h2>
        <p
          style={{
            color: "var(--muted)",
            fontWeight: 300,
            lineHeight: 1.85,
            maxWidth: "520px",
          }}
          className="reveal"
        >
          {t.hire_proc_sub}
        </p>
        <div className="steps-list">
          {STEPS.map((step, i) => (
            <div
              key={step.n}
              className={`step-row reveal reveal-delay-${(i % 4) + 1}`}
            >
              <div className="step-num">{step.n}</div>
              <div>
                <div className="step-title">{step.title}</div>
                <div className="step-body">{step.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hire-divider" />

      {/* What I need from you */}
      <div className="hire-section">
        <div className="section-label reveal">{t.hire_exp_label}</div>
        <h2 className="section-title reveal">
          {t.hire_exp_title_1}
          <br />
          <em>{t.hire_exp_title_2}</em>
        </h2>
        <p
          style={{
            color: "var(--muted)",
            fontWeight: 300,
            lineHeight: 1.85,
            maxWidth: "520px",
          }}
          className="reveal"
        >
          {t.hire_exp_sub}
        </p>
        <div className="needs-grid">
          {NEED_FROM_YOU.map(({ Icon, title, body }, i) => (
            <div
              key={title}
              className={`need-card reveal reveal-delay-${(i % 3) + 1}`}
            >
              <div className="need-icon-svg">
                <Icon size={20} />
              </div>
              <div className="need-title">{title}</div>
              <p className="need-body">{body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="hire-divider" />

      {/* What I won't do */}
      <div className="hire-section">
        <div className="section-label reveal">{t.hire_limits_label}</div>
        <h2 className="section-title reveal">
          {t.hire_limits_title_1}
          <br />
          <em>{t.hire_limits_title_2}</em>
        </h2>
        <p
          style={{
            color: "var(--muted)",
            fontWeight: 300,
            lineHeight: 1.85,
            maxWidth: "520px",
            marginBottom: "0.5rem",
          }}
          className="reveal"
        >
          {t.hire_limits_sub}
        </p>
        <ul className="wont-list reveal">
          {WONT_DO.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="hire-divider" />

      {/* Contact form */}
      <div id="form" className="hire-section">
        <div className="section-label reveal">{t.hire_start_label}</div>
        <h2 className="section-title reveal">
          {t.hire_start_title_1}
          <br />
          <em>{t.hire_start_title_2}</em>
        </h2>
        <p
          style={{
            color: "var(--muted)",
            fontWeight: 300,
            lineHeight: 1.85,
            maxWidth: "520px",
            marginBottom: "2.5rem",
          }}
          className="reveal"
        >
          {t.hire_start_sub}
        </p>
        <div className="hire-form-wrap reveal">
          <ContactForm t={t} preselectedPaket={preselectedPaket} />
        </div>
        <p
          style={{
            marginTop: "1rem",
            color: "var(--muted)",
            fontSize: "0.82rem",
            fontWeight: 300,
            textAlign: "center",
          }}
        >
          {t.hire_prefer_email}{" "}
          <a
            href="mailto:adis.klobodanovic@gmail.com"
            style={{ color: "var(--accent)" }}
          >
            adis.klobodanovic@gmail.com
          </a>
        </p>
      </div>

      <div
        style={{
          borderTop: "1px solid var(--border)",
          padding: "2rem 2.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          color: "var(--muted)",
          fontSize: "0.8rem",
        }}
      >
        <Link
          to="/"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            color: "var(--text)",
            textDecoration: "none",
            letterSpacing: "-0.02em",
          }}
        >
          adiss<span style={{ color: "var(--accent)" }}>.</span>dev
        </Link>
        <span>© {new Date().getFullYear()} Adis Klobodanovic</span>
        <Link to="/" style={{ color: "var(--muted)", textDecoration: "none" }}>
          {t.hire_back}
        </Link>
      </div>
    </>
  );
}
