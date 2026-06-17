import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const BASE_URL = 'https://adiss.dev';

const DEFAULTS = {
  title: 'Adis Klobodanović — Web Developer',
  description: 'Full-stack web developer iz BiH. Izrađujem moderne web stranice i aplikacije za firme.',
  image: `${BASE_URL}/og-image.jpg`,
};

export default function SEO({ title, description, image, noIndex = false }) {
  const { pathname } = useLocation();
  const canonical = `${BASE_URL}${pathname}`;

  const resolvedTitle = title
    ? `${title} | Adis.dev`
    : DEFAULTS.title;
  const resolvedDesc = description || DEFAULTS.description;
  const resolvedImage = image || DEFAULTS.image;

  return (
    <Helmet>
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDesc} />
      <link rel="canonical" href={canonical} />

      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDesc} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={resolvedImage} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDesc} />
      <meta name="twitter:image" content={resolvedImage} />
    </Helmet>
  );
}
