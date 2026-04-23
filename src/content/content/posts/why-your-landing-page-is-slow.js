export const content = `
## The real culprits

Most developers assume their site is slow because of something complex. Bad rendering strategy, unoptimised React tree, wrong caching headers. Sometimes. But most of the time, when I audit a slow landing page, it's the same three things:

**Unoptimised images.** A 4MB hero image that loads on mobile. Every photographer's portfolio site I've ever looked at does this. The fix is boring: compress to WebP, add width/height attributes, lazy-load anything below the fold.

**Too many fonts.** Every font family you load is a render-blocking request. Load two weights of one font, not three families. If you're using Google Fonts, at minimum add \`display=swap\` to the URL. Better: self-host them with \`@font-face\` so there's no third-party DNS lookup.

**Scripts nobody remembers adding.** Intercom. That cookie banner. The LinkedIn insight tag. The Hotjar snippet from 2022 that nobody uses anymore. Each one adds network requests and parse time. Open Chrome DevTools   Network   sort by size. You'll be surprised what's in there.

---

## The number that actually matters

Stop looking at your Lighthouse score. It's measured on an emulated slow device with throttled CPU, which doesn't reflect your real users. What matters is **LCP** — Largest Contentful Paint — in the real world.

Set up Google Search Console (free) and look at Core Web Vitals. That's your actual data from your actual users on their actual devices. Lighthouse is a diagnostic tool, not a report card.

---

## What to fix first

In order of impact per hour of work:

1. **Images** — run everything through [Squoosh](https://squoosh.app) or a build-time optimiser. Convert to WebP. Add \`loading="lazy"\` to anything below the fold.
2. **Remove unused scripts** — audit your \`<head>\` and your tag manager. Delete anything you're not actively using.
3. **Font loading** — self-host or at minimum add \`font-display: swap\` to your \`@font-face\` declarations.
4. **Defer non-critical JS** — anything that isn't needed for initial render should have \`defer\` or load after \`DOMContentLoaded\`.

---

## What not to touch yet

SSR, edge functions, CDN configuration — these matter at scale. If you're getting under 10k visits a month, they're not your bottleneck. Fix the obvious stuff first. A 4MB image is costing you more than any render strategy decision.

The boring fixes are boring because they work. Do those first.
`;
