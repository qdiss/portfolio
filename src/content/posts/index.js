// ─── Blog posts registry ──────────────────────────────────────────────────────
// Add new posts here. Content lives in individual files.
// slug must match the filename (without .jsx)

export const posts = [
  {
    slug: 'why-your-landing-page-is-slow',
    title: 'Why your landing page is slow and what to actually do about it',
    excerpt: 'Most slow sites aren\'t slow because of bad code. They\'re slow because of unoptimised images, too many fonts, and third-party scripts nobody remembers adding.',
    date: '2025-03-18',
    readTime: '6 min read',
    tags: ['Performance', 'Web'],
  },
  {
    slug: 'first-client-project',
    title: 'What I learned building my first client project from scratch',
    excerpt: 'The technical part was the easy bit. Scope creep, unclear feedback, and the phrase "can we just quickly add..." — that\'s where projects actually fall apart.',
    date: '2025-02-04',
    readTime: '8 min read',
    tags: ['Freelance', 'Process'],
  },
  {
    slug: 'nextjs-app-router-honest-thoughts',
    title: 'Next.js App Router after 6 months: honest thoughts',
    excerpt: 'It\'s good. It\'s also confusing in ways the docs don\'t fully explain. Here\'s what I wish I\'d known before migrating three projects to it.',
    date: '2025-01-12',
    readTime: '10 min read',
    tags: ['Next.js', 'React'],
  },
]

export function getPost(slug) {
  return posts.find(p => p.slug === slug) || null
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}
