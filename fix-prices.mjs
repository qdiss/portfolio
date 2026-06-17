import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const I18N_DIR = "./src/i18n";

const PRICES = {
  bs: { starter: "50 KM",  business: "150 KM",  premium: "250 KM",  curr: "KM" },
  de: { starter: "25 €",   business: "75 €",    premium: "125 €",   curr: "€"  },
  fr: { starter: "25 €",   business: "75 €",    premium: "125 €",   curr: "€"  },
  nl: { starter: "25 €",   business: "75 €",    premium: "125 €",   curr: "€"  },
  en: { starter: "$30",    business: "$85",     premium: "$140",    curr: "$"  },
  sv: { starter: "280 kr", business: "850 kr",  premium: "1 400 kr", curr: "kr" },
};

const HIRE_PKG_PRICES = {
  bs: { p1: "od 50 KM",      p2: "od 250 KM",      p3: "od 150 KM"      },
  de: { p1: "ab 25 €",       p2: "ab 125 €",        p3: "ab 75 €"        },
  fr: { p1: "à partir de 25 €", p2: "à partir de 125 €", p3: "à partir de 75 €" },
  nl: { p1: "vanaf 25 €",    p2: "vanaf 125 €",     p3: "vanaf 75 €"     },
  en: { p1: "from $30",      p2: "from $140",       p3: "from $85"       },
  sv: { p1: "från 280 kr",   p2: "från 1 400 kr",   p3: "från 850 kr"    },
};

const FAQ3_A = {
  bs: "Landing stranice od 50 KM, sajtovi od 150 KM, web aplikacije od 250 KM. Svaki projekat dobija pisanu ponudu.",
  de: "Landingpages ab 25 €, Websites ab 75 €, Web-Apps ab 125 €. Jedes Projekt erhält ein schriftliches Angebot.",
  fr: "Pages d'atterrissage à partir de 25 €, sites à partir de 75 €, apps web à partir de 125 €.",
  nl: "Landing pages vanaf 25 €, websites vanaf 75 €, web-apps vanaf 125 €.",
  en: "Landing pages from $30, websites from $85, web apps from $140. Every project gets a written quote.",
  sv: "Landningssidor från 280 kr, webbplatser från 850 kr, webbappar från 1 400 kr.",
};

const REFERRAL_EXAMPLE = {
  bs: "Preporučiš Business paket (150 KM). Prijatelj plaća 135 KM. Tvoj sljedeći projekat je 10% jeftiniji - automatski.",
  de: "Du empfiehlst das Business-Paket (75 €). Freund zahlt 67,50 €. Dein nächstes Projekt ist 10% günstiger - automatisch.",
  fr: "Tu recommandes le forfait Business (75 €). Ton ami paie 67,50 €. Ton prochain projet est 10% moins cher - automatiquement.",
  nl: "Je raadt het Business-pakket aan (75 €). Vriend betaalt 67,50 €. Jouw volgend project is 10% goedkoper - automatisch.",
  en: "You refer the Business package ($85). Friend pays $76.50. Your next project is 10% cheaper - automatically.",
  sv: "Du rekommenderar Business-paketet (850 kr). Din vän betalar 765 kr. Ditt nästa projekt är 10% billigare - automatiskt.",
};

const PRICING_PAGE_DESC = {
  bs: "Paketi i cijene za web stranice. Starter od 50 KM, Business od 150 KM, Premium od 250 KM.",
  de: "Paketpreise für Webseiten. Starter ab 25 €, Business ab 75 €, Premium ab 125 €.",
  fr: "Forfaits et prix pour sites web. Starter dès 25 €, Business dès 75 €, Premium dès 125 €.",
  nl: "Paketten en prijzen voor websites. Starter vanaf 25 €, Business vanaf 75 €, Premium vanaf 125 €.",
  en: "Web development packages. Starter from $30, Business from $85, Premium from $140.",
  sv: "Paket och priser för webbplatser. Starter från 280 kr, Business från 850 kr, Premium från 1 400 kr.",
};

const HIRE_SEO_DESC = {
  bs: "Spreman da gradiš nešto? Fiksne cijene - od 50 KM za landing stranicu. Brza isporuka, potpuno vlasništvo.",
  de: "Bereit etwas zu bauen? Festpreise - ab 25 € für eine Landing Page. Schnelle Lieferung, vollständiges Eigentum.",
  fr: "Prêt à construire quelque chose ? Prix fixes - à partir de 25 € pour une landing page.",
  nl: "Klaar om iets te bouwen? Vaste prijzen - vanaf 25 € voor een landingspagina.",
  en: "Ready to build something? Fixed-price web development - from $30 for a landing page. Fast turnaround, full ownership.",
  sv: "Redo att bygga något? Fasta priser - från 280 kr för en landningssida.",
};

for (const lang of Object.keys(PRICES)) {
  const filePath = join(I18N_DIR, `${lang}.js`);
  let src = readFileSync(filePath, "utf8");
  const original = src;
  const p = PRICES[lang];
  const h = HIRE_PKG_PRICES[lang];

  // pkg_*_price
  src = src.replace(/(pkg_starter_price:\s*)"[^"]*"/, `$1"${p.starter}"`);
  src = src.replace(/(pkg_business_price:\s*)"[^"]*"/, `$1"${p.business}"`);
  src = src.replace(/(pkg_premium_price:\s*)"[^"]*"/, `$1"${p.premium}"`);

  // form_pkg_*_price
  src = src.replace(/(form_pkg_starter_price:\s*)"[^"]*"/, `$1"${p.starter}"`);
  src = src.replace(/(form_pkg_business_price:\s*)"[^"]*"/, `$1"${p.business}"`);
  src = src.replace(/(form_pkg_premium_price:\s*)"[^"]*"/, `$1"${p.premium}"`);

  // hire_pkg prices
  src = src.replace(/(hire_pkg1_price:\s*)"[^"]*"/, `$1"${h.p1}"`);
  src = src.replace(/(hire_pkg2_price:\s*)"[^"]*"/, `$1"${h.p2}"`);
  src = src.replace(/(hire_pkg3_price:\s*)"[^"]*"/, `$1"${h.p3}"`);

  // faq3_a
  src = src.replace(/(faq3_a:\s*)"[^"]*"/, `$1"${FAQ3_A[lang]}"`);

  // referral_example
  src = src.replace(/(referral_example:\s*)"[^"]*"/, `$1"${REFERRAL_EXAMPLE[lang]}"`);

  // pricing_page_desc
  src = src.replace(/(pricing_page_desc:\s*)"[^"]*"/, `$1"${PRICING_PAGE_DESC[lang]}"`);

  // hire_seo_desc
  src = src.replace(/(hire_seo_desc:\s*)"[^"]*"/, `$1"${HIRE_SEO_DESC[lang]}"`);

  if (src !== original) {
    writeFileSync(filePath, src, "utf8");
    console.log(`✅  ${lang}.js updated`);
  } else {
    console.log(`⚪  ${lang}.js — no changes`);
  }
}

console.log("\nDone. Check files before committing.");
