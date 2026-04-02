export const content = `
## What's actually good about it

Server Components are genuinely useful once you stop fighting them. The mental model — components that run on the server and ship zero JS to the client — is correct and the performance benefits are real. Data fetching co-located with the component that needs it, no waterfall, no client-side loading states for static content.

The file-system routing is clean. \`app/dashboard/settings/page.tsx\` maps to \`/dashboard/settings\`. Layouts nest automatically. You stop thinking about routing and just think about folders.

And the Turbopack dev server (finally stable-ish in Next 14) is fast. After years of waiting 3–4 seconds for a hot reload, sub-500ms feels like a different tool.

---

## What's confusing and the docs don't warn you

**The \`use client\` directive is not intuitive.** Marking a component as a Client Component doesn't mean it only renders client-side — it means it renders on both server and client (SSR + hydration), just like the old Pages Router. This confused me for longer than I'd like to admit. The mental model in the docs is incomplete.

**You can't use React hooks in Server Components.** Fine. But the error message when you try is bad. It took me a while to understand that \`useState\` in a file without \`use client\` just... explodes at runtime, not at build time.

**Caching is aggressive and opaque.** By default, \`fetch\` calls in Server Components are cached indefinitely. This is documented, but not prominently. I've lost 30 minutes twice to stale data that was being served from cache when I expected a fresh response. The escape hatch is \`fetch(url, { cache: 'no-store' })\` or \`{ next: { revalidate: 0 } }\`. Fine once you know it.

**Middleware runs on the Edge, which has limitations.** No Node APIs. No \`fs\`. This burns you the first time you try to do something reasonable in middleware that works fine in a Route Handler.

---

## Should you migrate?

If you're starting a new project: yes, App Router, no question.

If you have a working Pages Router project: wait for a real reason. "Better architecture" is not a real reason. SEO improvements for a site that's already ranking? Not worth the migration cost. Starting to add features where Server Components would meaningfully reduce JS bundle size? Maybe.

I migrated three projects to App Router. One was worth it (a content-heavy site where I could eliminate almost all client-side data fetching). Two were not — I did it for learning reasons and the users noticed nothing except slightly longer dev sessions while I figured out caching.

The router is good. The migration cost is real. Make the decision deliberately.
`
