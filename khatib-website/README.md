# miladkhatib.com

Bilingual EN/AR website for Dr. Milad Khatib · Civil Engineering Consultancy.
Built per the v3 brand-kit prompt (see `../extracted/latest/`). Civilian-only.

## Quick start

```bash
npm install
cp .env.example .env.local   # optional: only needed for the contact form to actually send
npm run dev                  # http://localhost:3000  (EN)  ·  http://localhost:3000/ar  (AR)
```

## Build

```bash
npm run build                # runs civilian audit, then next build
npm run start                # serves the production build on :3000
```

The build is blocked by a non-zero exit from `scripts/audit-civilian.mjs` if any
file in the project contains a banned term from the v3 directive. This guard is
non-negotiable per Dr. Khatib's WhatsApp directive of 2 May 2026.

## Layout

```
app/
  (en)/                 English route group — root layout sets <html lang="en">
    layout.tsx
    page.tsx                  /
    about/page.tsx            /about
    services/                 /services + /services/{structural,geotechnical,forensic}
    patents/                  /patents + /patents/[slug]
    publications/page.tsx
    editorial/page.tsx
    teaching/page.tsx
    speaking/page.tsx
    contact/page.tsx
    legal/                    /legal/{privacy,terms,imprint}
    not-found.tsx
  (ar)/                 Arabic route group — root layout sets <html lang="ar" dir="rtl">
    layout.tsx
    ar/page.tsx               /ar
    ar/about/page.tsx         /ar/about
    ... (mirrors every English page under /ar/*)
    not-found.tsx
  api/contact/route.ts        Contact form delivery (Resend)
  sitemap.ts                  /sitemap.xml — generated, every page in both langs with hreflang
  robots.ts                   /robots.txt
  globals.css

components/khatib/      Brand component library (Mark, Monogram, Wordmark,
                        atoms, cards, SectionHeading, ContactForm, page shells).

content/
  publications.ts       52 publications, auto-generated from the brand kit's HTML
  editorial-roles.ts    21 roles, auto-generated
  teaching.ts           Civilian teaching record (CV-traceable)
  speaking.ts           Civilian-venue talks
  patents.ts            Both patents, EN+AR copy
  timeline.ts           1998 → present career timeline (no entries pre-1998)
  translations/
    en.json
    ar.json

lib/
  tokens.ts             Brand colors, names, profile IDs (mirrors brand-dna.yaml)
  fonts.ts              next/font setup for Cormorant + IBM Plex (Sans, Arabic, Mono)
  i18n.ts               getDictionary(), altPath(), localizedPath()
  metadata.ts           buildMetadata(), JSON-LD helpers (Person, WebSite, Breadcrumb)

scripts/
  audit-civilian.mjs        Build-blocking grep for the v3 directive
  extract-publications.mjs  Re-emit content/publications.ts from the source HTML
  extract-editorial.mjs     Re-emit content/editorial-roles.ts

public/
  icons-and-meta/       PWA manifests (EN + AR). Icon PNGs to be supplied by
                        the META-AND-ICONS thread output (see ../extracted/latest/).
```

## Bilingual implementation

Two parallel root layouts via Next.js route groups (`(en)` and `(ar)`). Each
root layout owns its own `<html lang dir>` element. The `LanguageToggle`
client component resolves the partner URL via `lib/i18n.ts:altPath()` so
`/about` ↔ `/ar/about` cleanly.

We deliberately did **not** adopt `next-intl` even though the brand-kit
prompt suggested it. Reasoning: the dual-root-layout pattern is officially
supported by Next.js 14, ships zero runtime translation library, keeps the
dictionaries as static JSON, and produces fully static HTML for both
locales. The trade-off is that every route exists twice in the app tree;
the wrappers are deliberately thin (≈18 lines each).

## Content rules

Every entry in `content/*.ts` is traceable to:

1. The brand kit (`extracted/mkhatib/`)
2. The CV's civilian sections only
3. `RECONCILIATION-NOTES.md`

The civilian audit script is the enforceable check. Add new entries with
care; if they don't trace cleanly, they don't ship.

## Pending items (per `RECONCILIATION-NOTES.md`)

These items are **rendered as pending placeholders** in the live UI per the
brand-kit honesty rule ("missing facts surface as `<!-- pending -->` markers,
not guesses"). Swap each in with a single commit when Dr. Khatib supplies it.

| Item | Where it surfaces | What to change |
|---|---|---|
| OEA Beirut registration number | `home.credentials`, `about.memberships`, footer | Edit both `content/translations/*.json` |
| Patent #1 registration number (2023) | `/patents/economic-vessel-2023` meta strip | `content/patents.ts` → `registrationNumber` |
| Patent #2 registration number (2025) | `/patents/food-particle-2025` meta strip | `content/patents.ts` → `registrationNumber` |
| 2025 patent companion publication | `/patents/food-particle-2025` companion box | `content/patents.ts` → `companion` |
| MBA conferral year | About timeline | `content/timeline.ts` (last entry) |
| Public phone number | `/contact` direct-contact column | `lib/tokens.ts` → `phoneConfirmed: true` |
| Authorised portrait | Home hero | Drop file in `public/images/`, edit `HomePage.tsx` |
| Additional speaking entries | `/speaking` | Append to `content/speaking.ts` (currently 2 confirmed entries + pending notice) |

The civilian audit script blocks any build that would re-introduce a banned term.

## Performance budget

This first build hits ~94 kB First Load JS on most static pages and ~103 kB
on the contact page (Zod adds the difference). The brand kit prompt targets
< 80 kB on the home page. Closing that gap is post-launch optimization:
self-host the critical font weights instead of relying on `next/font` for
all weights, and trim the Zod dependency from the contact form by hand-rolling
the validation if it becomes a real bottleneck.

## Deploy

See `DEPLOYMENT.md`.
