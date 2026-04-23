/**
 * packages.js — Centralized package & addon config.
 *
 * Prices are stored as i18n keys (pkg_starter_price, etc.) so each language
 * can display the correct currency string (KM / $ / €).
 *
 * Addon prices are stored as a numeric KM amount; use the helper
 * `formatAddonPrice(priceKM, lang)` to display the correct currency.
 *
 * Conversion: 1 KM = 0.51 EUR ≈ 0.5 EUR (rounded to clean numbers)
 */

// ─── CURRENCY HELPER ─────────────────────────────────────────────────────────
const EUR_LANGS = ["de", "fr", "nl"];
const SEK_LANGS = ["sv"];
const USD_LANGS = ["en"];

/**
 * Returns a formatted addon price string based on the current language.
 *   bs     → "X KM"
 *   en     → "$X"    (1 KM ≈ 0.5 USD)
 *   de/fr/nl → "X €" (1 KM ≈ 0.5 €)
 *   sv     → "X kr"  (1 KM ≈ 5.5 SEK — rounded to clean numbers)
 *
 * @param {number} priceKM  — base price in BAM (KM)
 * @param {string} lang     — current lang code from useLang()
 * @returns {string}
 */
export function formatAddonPrice(priceKM, lang) {
  if (USD_LANGS.includes(lang)) {
    const usd = Math.round(priceKM * 0.5);
    return `$${usd}`;
  }
  if (EUR_LANGS.includes(lang)) {
    const eur = Math.round(priceKM * 0.5);
    return `${eur} €`;
  }
  if (SEK_LANGS.includes(lang)) {
    const sek = Math.round(priceKM * 5.5);
    return `${sek} kr`;
  }
  return `${priceKM} KM`;
}

// ─── PACKAGES ─────────────────────────────────────────────────────────────────
/**
 * Each package has a `priceKey` resolved via t[priceKey] so the price string
 * comes from the i18n file for the active language.
 */
export const PACKAGES = [
  {
    id: "starter",
    icon: "zap",
    nameKey: "pkg_starter_name",
    descKey: "pkg_starter_desc",
    shortKey: "pkg_starter_short",
    priceKey: "pkg_starter_price",    // resolved per language
    priceNoteKey: "price_onetime",
    timelineKey: "pkg_starter_timeline",
    highlight: false,
    features: [
      { key: "pkg_starter_f1", free: false },
      { key: "pkg_starter_f2", free: true },
      { key: "pkg_starter_f3", free: true },
      { key: "pkg_starter_f4", free: false },
      { key: "pkg_starter_f5", free: false },
      { key: "pkg_starter_f6", free: false },
    ],
    ctaKey: "pkg_cta_start",
  },
  {
    id: "business",
    icon: "globe",
    nameKey: "pkg_business_name",
    descKey: "pkg_business_desc",
    shortKey: "pkg_business_short",
    priceKey: "pkg_business_price",
    priceNoteKey: "price_onetime",
    timelineKey: "pkg_business_timeline",
    highlight: true,
    badge: "pkg_badge_popular",
    features: [
      { key: "pkg_business_f1", free: false },
      { key: "pkg_business_f2", free: true },
      { key: "pkg_business_f3", free: true },
      { key: "pkg_business_f4", free: false },
      { key: "pkg_business_f5", free: false },
      { key: "pkg_business_f6", free: false },
      { key: "pkg_business_f7", free: false },
      { key: "pkg_business_f8", free: false },
      { key: "pkg_business_f9", free: false },
      { key: "pkg_business_f10", free: false },
    ],
    ctaKey: "pkg_cta_start",
  },
  {
    id: "premium",
    icon: "rocket",
    nameKey: "pkg_premium_name",
    descKey: "pkg_premium_desc",
    shortKey: "pkg_premium_short",
    priceKey: "pkg_premium_price",
    priceNoteKey: "price_onetime",
    timelineKey: "pkg_premium_timeline",
    highlight: false,
    features: [
      { key: "pkg_premium_f1", free: false },
      { key: "pkg_premium_f2", free: false },
      { key: "pkg_premium_f3", free: false },
      { key: "pkg_premium_f4", free: false },
      { key: "pkg_premium_f5", free: false },
      { key: "pkg_premium_f6", free: false },
      { key: "pkg_premium_f7", free: false },
      { key: "pkg_premium_f8", free: false },
      { key: "pkg_premium_f9", free: false },
      { key: "pkg_premium_f10", free: false },
      { key: "pkg_premium_f11", free: false },
    ],
    ctaKey: "pkg_cta_start",
  },
];

// ─── ADDONS ───────────────────────────────────────────────────────────────────
/**
 * `priceKM` is the base price in BAM. Use formatAddonPrice(priceKM, lang)
 * to display the correct currency string.
 */
export const ADDONS = [
  {
    icon: "mapPin",
    nameKey: "addon_googlebiz_name",
    descKey: "addon_googlebiz_desc",
    priceKM: 60,
    perKey: "price_onetime",
  },
  {
    icon: "mail",
    nameKey: "addon_emailsig_name",
    descKey: "addon_emailsig_desc",
    priceKM: 40,
    perKey: "price_onetime",
  },
  {
    icon: "palette",
    nameKey: "addon_logo_name",
    descKey: "addon_logo_desc",
    priceKM: 80,
    perKey: "price_onetime",
  },
  {
    icon: "smartphone",
    nameKey: "addon_social_name",
    descKey: "addon_social_desc",
    priceKM: 50,
    perKey: "price_onetime",
  },
  {
    icon: "calendar",
    nameKey: "addon_booking_name",
    descKey: "addon_booking_desc",
    priceKM: 70,
    perKey: "price_onetime",
  },
  {
    icon: "translate",
    nameKey: "addon_translation_name",
    descKey: "addon_translation_desc",
    priceKM: 60,
    perKey: "price_onetime",
  },
  {
    icon: "pencil",
    nameKey: "addon_copy_name",
    descKey: "addon_copy_desc",
    priceKM: 70,
    perKey: "price_per_page",
  },
  {
    icon: "image",
    nameKey: "addon_gallery_name",
    descKey: "addon_gallery_desc",
    priceKM: 40,
    perKey: "price_onetime",
  },
  {
    icon: "star",
    nameKey: "addon_reviews_name",
    descKey: "addon_reviews_desc",
    priceKM: 35,
    perKey: "price_onetime",
  },
  {
    icon: "qr",
    nameKey: "addon_qr_name",
    descKey: "addon_qr_desc",
    priceKM: 15,
    perKey: "price_onetime",
  },
  {
    icon: "barChart",
    nameKey: "addon_analytics_name",
    descKey: "addon_analytics_desc",
    priceKM: 30,
    perKey: "price_onetime",
  },
  {
    icon: "utensils",
    nameKey: "addon_menu_name",
    descKey: "addon_menu_desc",
    priceKM: 55,
    perKey: "price_onetime",
  },
  {
    icon: "lock",
    nameKey: "addon_ssl_name",
    descKey: "addon_ssl_desc",
    priceKM: 20,
    perKey: "price_yearly",
    clientPays: true,
  },
  {
    icon: "globe",
    nameKey: "addon_domain_name",
    descKey: "addon_domain_desc",
    priceKM: 30,
    perKey: "price_yearly",
    clientPays: true,
  },
  {
    icon: "monitor",
    nameKey: "addon_hosting_name",
    descKey: "addon_hosting_desc",
    priceKM: 50,
    perKey: "price_yearly",
    clientPays: true,
  },
  {
    icon: "atSign",
    nameKey: "addon_proemail_name",
    descKey: "addon_proemail_desc",
    priceKM: 25,
    perKey: "price_yearly",
    clientPays: true,
  },
  // ─── NEW ADDONS ──────────────────────────────────────────────────────────
  {
    icon: "messageCircle",
    nameKey: "addon_chatwidget_name",
    descKey: "addon_chatwidget_desc",
    priceKM: 25,
    perKey: "price_onetime",
  },
  {
    icon: "helpCircle",
    nameKey: "addon_faqsection_name",
    descKey: "addon_faqsection_desc",
    priceKM: 40,
    perKey: "price_onetime",
  },
  {
    icon: "timer",
    nameKey: "addon_countdown_name",
    descKey: "addon_countdown_desc",
    priceKM: 30,
    perKey: "price_onetime",
  },
  {
    icon: "cookie",
    nameKey: "addon_cookiebanner_name",
    descKey: "addon_cookiebanner_desc",
    priceKM: 35,
    perKey: "price_onetime",
  },
  {
    icon: "zap",
    nameKey: "addon_speedopt_name",
    descKey: "addon_speedopt_desc",
    priceKM: 60,
    perKey: "price_onetime",
  },
  {
    icon: "moon",
    nameKey: "addon_darkmode_name",
    descKey: "addon_darkmode_desc",
    priceKM: 40,
    perKey: "price_onetime",
  },
  {
    icon: "video",
    nameKey: "addon_video_name",
    descKey: "addon_video_desc",
    priceKM: 35,
    perKey: "price_onetime",
  },
  {
    icon: "sliders",
    nameKey: "addon_slider_name",
    descKey: "addon_slider_desc",
    priceKM: 35,
    perKey: "price_onetime",
  },
  {
    icon: "mail",
    nameKey: "addon_newsletter_name",
    descKey: "addon_newsletter_desc",
    priceKM: 45,
    perKey: "price_onetime",
  },
  {
    icon: "fileText",
    nameKey: "addon_pdf_name",
    descKey: "addon_pdf_desc",
    priceKM: 40,
    perKey: "price_onetime",
  },
  {
    icon: "layoutGrid",
    nameKey: "addon_pricingtable_name",
    descKey: "addon_pricingtable_desc",
    priceKM: 45,
    perKey: "price_onetime",
  },
  {
    icon: "bookOpen",
    nameKey: "addon_blog_name",
    descKey: "addon_blog_desc",
    priceKM: 80,
    perKey: "price_onetime",
  },
  {
    icon: "briefcase",
    nameKey: "addon_careers_name",
    descKey: "addon_careers_desc",
    priceKM: 50,
    perKey: "price_onetime",
  },
  {
    icon: "formInput",
    nameKey: "addon_formsadv_name",
    descKey: "addon_formsadv_desc",
    priceKM: 55,
    perKey: "price_onetime",
  },
  {
    icon: "mapPin",
    nameKey: "addon_mapsadv_name",
    descKey: "addon_mapsadv_desc",
    priceKM: 50,
    perKey: "price_onetime",
  },
  {
    icon: "megaphone",
    nameKey: "addon_promobar_name",
    descKey: "addon_promobar_desc",
    priceKM: 25,
    perKey: "price_onetime",
  },
  {
    icon: "sitemap",
    nameKey: "addon_sitemap_name",
    descKey: "addon_sitemap_desc",
    priceKM: 30,
    perKey: "price_onetime",
  },
  {
    icon: "wrench",
    nameKey: "addon_maintenance_name",
    descKey: "addon_maintenance_desc",
    priceKM: 40,
    perKey: "price_yearly",
  },
  {
    icon: "hardDrive",
    nameKey: "addon_backup_name",
    descKey: "addon_backup_desc",
    priceKM: 30,
    perKey: "price_yearly",
  },
  {
    icon: "languages",
    nameKey: "addon_multisite_name",
    descKey: "addon_multisite_desc",
    priceKM: 80,
    perKey: "price_onetime",
  },
];
