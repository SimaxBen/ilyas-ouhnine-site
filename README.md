# ilyasouhnine.tech

The site behind my freelance practice. Next.js 15 (App Router), TypeScript,
bilingual FR/EN, **zero UI dependencies** — no CSS framework, no component library,
no i18n package. 23 static pages, ~103 kB of shared JS.

**Live:** [ilyasouhnine.tech](https://ilyasouhnine.tech)

![Home page](docs/screenshot-home.png)

## Why it's built this way

Three decisions worth explaining, because they're the reason this repo is small.

**No CSS framework.** For four pages plus one template, a utility framework costs more
than it saves — a build step, a config file, and markup you can't read. Everything lives
in one `globals.css` with design tokens at the top. Changing the accent colour is one line.

**No i18n library.** Two locales, one typed dictionary in `lib/content.ts`, and a
`[locale]` route segment. TypeScript enforces that the English object has exactly the
same keys as the French one — so a half-translated page fails the build instead of
shipping. That's the entire mechanism, and it replaced a dependency.

**A build that refuses to publish unmeasured numbers.** `scripts/check-placeholders.mjs`
runs on `prebuild` and fails if any `⟦TOKEN⟧` remains in the content files. Case-study
metrics start as tokens and only become text once they've actually been measured. It has
blocked a deploy, which is the point:

```
✖ Build bloqué : 7 valeur(s) non remplie(s).
  ⟦EXACTITUDE⟧    lib/cases.ts
```

## Run it

```bash
npm install
npm run dev      # http://localhost:3000 → redirects to /fr
npm run check    # placeholder guard, on its own
npm run build    # runs check first
```

## Layout

```
app/[locale]/          home · cases · cases/[slug] · about · contact
lib/content.ts         all UI copy, FR and EN, typed against each other
lib/cases.ts           case studies, with a `published` flag per entry
lib/config.ts          contact details, rates, links
app/globals.css        the whole design system, tokens first
```

Light and dark themes follow the visitor's system setting. Fonts are system stacks —
no network request, no layout shift.

## What I'd do differently

I'd have written the placeholder guard before the content, not after. It exists because
I nearly shipped a case study quoting an accuracy figure nobody had measured — the guard
is the fix, but the near-miss is the lesson.

---

Maintenance notes (content, deployment, checklists) are in [MAINTENANCE.md](MAINTENANCE.md).
