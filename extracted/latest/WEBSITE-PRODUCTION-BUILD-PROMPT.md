# Fresh-Thread Prompt — Khatib Website Production Build (miladkhatib.com)

> **Copy everything below the horizontal rule into a fresh Claude thread, ideally with Claude Code or another agentic environment that can execute, install dependencies, and iterate.**
>
> **Attach to that thread:**
> - The complete `khatib-brand-kit-v3/` folder (civilian edition)
> - The complete `khatib-social-v3/` folder including `khatib-portrait-original.jpg`
> - The `khatib-meta-bundle/` folder (after the META-AND-ICONS thread has run)

---

## The directive that controls this entire build

On 2 May 2026, Dr. Khatib confirmed via WhatsApp:

> "Yes... kindly, I don't like to mention about military personality."

This is final. **No military service, medals, units, courses, postings, or institutional attribution appears anywhere on miladkhatib.com — page bodies, navigation, OG metadata, alt text, JSON-LD, sitemap, robots.txt, `aria-label` text, source-code comments, README, or any rendered output.** The civilian engineering record alone is the brand. Read `SKILL.md`'s civilian-only honesty rule (the controlling rule at the top of the honesty rules section) before touching any file. If at any point during the build a decision feels like it's drifting toward institutional framing, default toward the more civilian-clean choice without exception.

---

## Context

This thread builds the production website for Dr. Milad Khatib at **miladkhatib.com** — replacing a single-page generic template with a bilingual, accessible, performant, brand-coherent site that does honour to his civilian engineering record.

The site has one job above all others: **establish credibility in under five seconds for a sceptical reader.** The reader could be a procurement officer at a Gulf sovereign wealth fund, an insurer's counsel screening forensic engineers, an academic reviewer checking authorship, or a Lebanese ministry committee deciding who to retain. None of these readers will scroll. They will glance, judge, and either continue or close the tab.

Every line of code, every byte of asset, every tag of metadata in this build serves that five-second test.

**The brand kit v3 is the constitution of this build.** Read it cover-to-cover before writing a single component. The honesty rules apply with full force; the civilian-only directive is the controlling rule. The visual tokens are non-negotiable. The two-register voice (English consultant / Arabic heritage) is the spine.

**The CV is the source of truth for civilian content only.** Every credential, publication, role, and date traces to a specific civilian line in the CV. The CV's military sections are not source material for this site.

---

## What you are building

A Next.js 14 application using the App Router, deployed to Cloudflare Pages or Vercel (decide in the deployment section), bilingual EN/AR with full RTL, statically generated where possible, dynamically rendered only where personalization or freshness require it.

### Stack — non-negotiable

- **Next.js 14** App Router (not Pages Router)
- **TypeScript** strict mode, no `any`, no `@ts-ignore`
- **Tailwind CSS** with the custom config from the brand kit's design system stage (extend, do not replace, the brand tokens)
- **shadcn/ui** for primitive components — Button, Dialog, Sheet, Tabs, Accordion, Separator, ScrollArea — themed to brand tokens
- **next-intl** for EN/AR routing and translations
- **Sharp** for image optimization
- **Playwright** for e2e tests (a small suite, not exhaustive)
- **Vitest** for unit tests where logic warrants
- **Biome** or ESLint + Prettier for formatting and linting
- **Zod** for any runtime data validation
- **`next/og`** for dynamic OpenGraph generation per page

No React Native, no monorepo tooling, no GraphQL, no headless CMS. The content is small enough and stable enough to live as typed TypeScript modules under `content/`.

### Stack — explicitly forbidden

- No Bootstrap, no Material UI, no Chakra. Brand visual coherence is the entire point.
- No client-side rendering for content that can be static. The home page must be HTML on first byte.
- No Google Analytics 4. Use Plausible (self-hosted preferred) or Cloudflare Web Analytics.
- No third-party widgets (chat bubbles, feedback popups, scroll-tracking heatmaps). They corrupt the brand surface and leak user data.
- No carousels on the home page.
- No image sliders. No parallax scrolling. No scroll-jacking. No splash animations beyond a minimal entry fade.
- No "Let's chat!" CTAs. The CTA is a clear contact path, written in the brand voice.

---

## Site map — final, locked

```
/                                  Home
/about                             About — full bio, education, civilian career timeline
/services                          Services overview — three pillars
/services/structural               Structural engineering
/services/geotechnical             Geotechnical engineering
/services/forensic                 Forensic & expert-witness
/patents                           Patents index
/patents/economic-vessel-2023      Patent 1 case study
/patents/food-particle-2025        Patent 2 case study
/publications                      Publications — all 52 with filters
/publications/[slug]               Optional individual publication landing pages for the most-cited 6
/editorial                         Editorial / reviewer positions
/teaching                          Teaching record (LIU, Balamand, Cnam)
/speaking                          Civilian oral presentations / keynotes / interviews
/contact                           Contact

/ar/[every page above]             Arabic mirror, full RTL

/legal/privacy
/legal/terms
/legal/imprint
/sitemap.xml
/robots.txt
/manifest.webmanifest
/api/og/[...slug]                  Dynamic OG image generator
```

**The Arabic mirror is not optional.** Every page exists in both languages.

**Pages explicitly excluded from this site map** (per the civilian-only directive — do not build, do not link to, do not include in the sitemap):
- No `/services/disaster` page (the v2 fourth pillar — not in v3)
- No `/public-service` page (held back per client preference; preserved in `khatib-brand-kit-v3/_optional/` for possible future use only)

**For the `/teaching` page:** Reference only the civilian academic posts from the CV — the Lebanese International University Master's-level courses, the University of Balamand undergraduate courses, the ISSAE-Cnam Liban research supervision. **Do not reference any military academy teaching.** The CV lists "Resistance Materials" and "Roads and Pavements" courses at the Military Academy; those entries are excluded from the public site.

**For the `/speaking` page:** Reference only civilian-venue speaking engagements from the CV. The page works perfectly with the academic and engineering-society talks alone — ACI 24HCK, ICCEIC 2024 keynote, the OEA seminars, the university talks, the published-research conference presentations. **Filter out any presentation given in a military setting** (Fouad Shehab Command and Staff College, Lebanese Military Academic, etc.) and any presentation whose subject is military-policy adjacent ("Towards new economic vision" given at military venues, etc.). The civilian speaking record alone is more than substantial.

---

## Page-by-page specifications

### Home (`/`)

**Hero.** Full-viewport navy ground, isometric grid texture at 4% opacity. Three-column desktop layout, single-column mobile. Left column 45%: Dr. Khatib's portrait with the same fade-into-navy treatment used in the social pack's About hero. Right column 55%: eyebrow tag (`Civil Engineering · Beirut · OEA Member since 1999`), gold rule, Cormorant Garamond H1 (`Dr. Milad Khatib`), gold tracked subline (`Civil Engineering Consultancy`), Arabic name in IBM Plex Sans Arabic, italic tagline pair (`Engineering by proof. — الهندسة بالبرهان.`).

Below the hero, a single horizontal credential strip — *not* a metric brag, but a calm record:

```
PhD · BAU · 2018      |     LIU · Balamand · Cnam      |     2 Patents · LB     |     52 Publications · 21 Editorial Roles
```

Mono text, gold rules between groups, small enough to fit on one line at 1280 px and stack at 768 px.

**Pillars section.** Three cards: Structural / Geotechnical / Forensic. Each card: pillar number in mono, Cormorant heading, two-line plain-English description, link to `/services/[pillar]`. Mobile-stack, desktop-grid 3×1.

**Selected publications.** Six papers, not all 52. Each shown as a `<PublicationItem />` with title, journal, year, DOI link. Below the six, a single line: `52 publications total — view full record →` linking to `/publications`. The book *Breaking Limits in Prestressed Concrete* gets its own callout card adjacent to the selected publications, with the Amazon link.

**Patents.** Two cards, side by side desktop, stacked mobile. Each shows year of registration, jurisdiction (Lebanon), title, and links to the patent case study page.

**Closing strip.** Navy ground, single Cormorant italic line in gold: *"Engineering by proof."* Bilingual pair below in smaller type. Below that, contact mini-card with email, phone, and a link to `/contact`.

**No mailing-list signup. No social-proof carousel. No "trusted by" logo wall. No reference to public-service work.** The civilian credentials carry the weight.

### About (`/about`)

Long-form page. Three sections separated by gold rules.

**Section 1 — Bio paragraph.** Three paragraphs, English consultant register. The full bio is the v3 civilian positioning paragraph from `khatib-brand-kit-v3/POSITIONING-SHIFT.md`. Use it verbatim or as the basis for slight expansion. **No military service mentioned.** No "26+ years" — the timeline that follows establishes career length implicitly.

**Section 2 — Career timeline.** A vertical timeline from 1998 (Bachelor BAU) to present. Each row: year, role, institution, one-line description. Pull from the CV's civilian-only timeline:
- 1998 — Bachelor, Civil Engineering, BAU
- 2005 — Master, Civil Engineering, BAU
- 2018 — PhD, Structural & Geotechnical Engineering, BAU
- 2020 → present — Research Supervisor, ISSAE-Cnam Liban
- 2021–2022 — Theory of Structures & Construction Management, University of Balamand
- 2022 → present — Research Supervisor, University of Balamand
- 2023 → present — Geotechnical Engineering / Drainage & Irrigation / Technology of Construction, Lebanese International University
- (current) — MBA Candidate, AUST

This timeline establishes 27-year continuity without a single military-adjacent line. Do not extend it back into the military years; the timeline starts at 1998 and references academic and civilian-engineering touchpoints only.

**Section 3 — Languages, software, memberships.** Mono text. English, French, Italian, Arabic native. Below: technical software competencies (MATLAB, AutoCAD, ANSYS, ABAQUS, ETABS, Primavera P6) — short list, one line. Below that: memberships — OEA Beirut (since January 1999), SPSC Sustainability Ambassador (verifiable code 00014774), ACSE, civilian editorial bodies summarised with link to `/editorial`.

### Services overview (`/services`)

Three cards. Each leads to its dedicated page.

### Service pages (`/services/[pillar]`)

Each is structured the same way:

1. Hero — pillar number, Cormorant heading, plain-English summary
2. Methodology — three to five bullet points in IBM Plex Sans, each tied to a specific code or published reference where possible
3. Representative work — three to six bullet points referencing his actual published research with DOIs where applicable
4. When this engagement makes sense — three short sentences naming the kind of client situation that warrants this service
5. Contact CTA — a single line linking to `/contact?topic=[pillar]`

The Forensic / Expert-Witness page additionally lists: jurisdictions of testimony (English and Arabic), retainer model (high-level, no figures), turnaround commitment.

**Important constraint on the Forensic page:** Examples of past forensic work must reference only the published research that grounds the methodology — the inverted-U reinforcement papers, the GIN-method dam grouting paper, the monostrand anchorage paper. **Do not reference any past disaster-response engagement.** "Methodology before conclusion" framing applies — the brand is built on documented research methodology, not committee work.

### Patents pages

Use the v3 patent case study templates. One page per patent. Each page is essentially a long-form rendering of `examples/patent-case-study.html` and `examples/patent-case-study-2.html` with deeper copy, the companion publication cited inline (Springer 2023 chapter for patent 1, "forthcoming" for patent 2 until confirmed), and a clear NCNDA-gated licensing CTA at the bottom. Both patents stated as Lebanese-registered. No language implying international filing.

### Publications (`/publications`)

The asset Dr. Khatib explicitly asked for via WhatsApp.

**Layout.** Filter sidebar on desktop (left, 280 px wide, sticky), filter pull-down on mobile. Main content area: list of publications, sorted by year descending by default.

**Filters:**
- Topic: Post-tensioned & prestressed concrete · Geotechnical & dam engineering · Water resources · Sustainable construction · Disaster engineering & seismic
- Year: 1998 → 2026 with multi-select
- Venue type: Journal article · Book chapter · Conference proceedings · Book
- Search by keyword (titles only, client-side fuzzy match)

**Each publication entry:**
- Authors (Khatib first if first-listed in CV, otherwise correct order)
- Title (verbatim from CV — do not paraphrase)
- Journal / venue (italicized, full name)
- Year, volume, issue, pages where given
- DOI as a clickable external link
- Topic tag(s) — one or two pill labels

**The book** (*Breaking Limits in Prestressed Concrete*) gets a dedicated card at the very top of the list — outside the year-sorted feed. The Amazon link is the primary CTA on that card.

**Hero stat strip — restrained, not boastful:**
```
52 publications  ·  21 editorial positions  ·  2 patents  ·  1 book
```
Mono, small, no inflation. Just the count.

**Performance budget.** This page must render in under 1.5 seconds on a 3G connection. Static-generate the publications list at build time. Filtering is client-side; no API roundtrips. Total page weight under 250 KB excluding fonts.

**Note on the data source.** The complete 52-publication list is already encoded in the v3 brand kit's `examples/publications-page.html`. Extract the structured data from that HTML's `data-*` attributes (or re-encode from the CV) into a typed `content/publications.ts` module. Do not introduce new entries; do not omit entries. Verbatim 52.

### Editorial (`/editorial`)

All 21 editorial / reviewer positions. Each row: journal name, publisher, role (editorial board member / reviewer), country of publication, link to verification URL where given in the CV. Group by region (Asia / Europe / Americas / Middle East) — match the structure already implemented in the v3 kit's `examples/editorial-roles.html`.

### Teaching (`/teaching`)

Three columns: institution, period, courses taught. Pulled from the CV's Teaching section, civilian-only. **Do not include the Military Academy entries** (Resistance Materials, Roads and Pavements taught to Officer cadets — these are excluded from the public site even though "Resistance Materials" sounds civilian, because the audience attribution is military). Include only:
- Lebanese International University — Master's-level courses, current
- University of Balamand — undergraduate courses + research supervision, current
- ISSAE-Cnam Liban — research supervision, current

### Speaking (`/speaking`)

Civilian-venue oral presentations and interviews from the CV. Each row: date, title, venue, country, link to verification (some entries in the CV have YouTube, university news pages, or social posts as evidence — use those).

**Filter rules:** Include only talks delivered at civilian venues — universities (BAU, AUB, USEK, RHU, University of Balamand, Lebanese University, NDU, City University), professional bodies (OEA, ACI, NDU, FIDIC seminars), and academic conferences (ICCEIC 2024, AICSGE, NRSEM, ICCE, MMSE, ISWPT, WREM, GEESD, etc.). **Exclude all military-venue presentations** — Fouad Shehab Command and Staff College, Lebanese Military Academic, and any presentation whose audience attribution is military.

The civilian speaking record alone runs to ~20 entries and is more than substantial for a Speaking page.

### Contact (`/contact`)

Three columns desktop, single column mobile.

Column 1 — Direct contact: email (`milad@miladkhatib.com`), phone (`+961 3 927 934`, pending Dr. Khatib's confirmation per `RECONCILIATION-NOTES.md`), Beirut location.
Column 2 — Academic profiles: ORCID, Scopus, Google Scholar, ResearchGate links from the CV.
Column 3 — Inquiry form: Name, Email, Topic (dropdown: Forensic / Structural / Geotechnical / Patent licensing / Academic collaboration / Other), Message.

Contact form must validate client-side with Zod schema, post to a Next.js API route that uses Resend or a similar email API, return a success state without page navigation, and gracefully handle failure.

### Legal pages

- `/legal/privacy` — short, honest privacy policy. Lists what is collected (form submissions only), how long it is retained, who has access. No tracking cookies.
- `/legal/terms` — terms of use, governing law (Lebanon).
- `/legal/imprint` — required for some EU readers; lists Dr. Khatib's professional details. **Civilian-only.**

---

## Component library

Build these primitives in `components/khatib/` first, then use them throughout. Every component fully typed, every component has a Storybook entry, every component renders correctly in both LTR and RTL.

### Atoms

- `<Mark variant="navy" | "cream" | "mono" lang="en" | "ar" />` — primary lockup
- `<Monogram size={number} />` — MK isometric cube
- `<Wordmark variant="navy" | "cream" lang="en" | "ar" />` — type-only lockup
- `<GoldRule width="full" | "short" | number />` — branded horizontal rule
- `<Eyebrow withRule={boolean}>...</Eyebrow>` — mono uppercase eyebrow with optional inline rule
- `<Tagline lang="en" | "ar" | "both" />` — *Engineering by proof.* / الهندسة بالبرهان.
- `<Citation>...</Citation>` — IEEE-style publication citation

### Molecules

- `<SectionHeading number, title, lede />` — eyebrow + Cormorant H2 + lede paragraph
- `<StatBlock label, value, mono?>` — bordered stat card with gold left border
- `<PillarCard number, title, summary, href />` — for the three service pillars
- `<PublicationItem authors, title, venue, year, doi, topics />` — single publication row
- `<EditorialRoleItem journal, publisher, role, region, verifyUrl />` — single editorial position
- `<PatentCard year, title, jurisdiction, summary, href />` — patent landing card
- `<TimelineRow year, role, institution, description />` — vertical timeline row

### Organisms

- `<DocumentHero eyebrow, title, sublineEn, sublineAr, taglinePair, portrait? />` — used on home and document covers
- `<CredentialStrip items[] />` — the calm credential row used on home
- `<PillarsGrid pillars[3] />` — three-pillar block (NOT four — the disaster pillar is excluded)
- `<SelectedPublications publications[6], totalCount />` — selected papers + total link
- `<BilingualToggle currentLocale />` — EN/AR switch with persistence
- `<LanguageMeta locale />` — sets `lang` and `dir` on document
- `<ContactForm />` — full inquiry form

### Layout

- `<SiteHeader />` — sticky on scroll, primary lockup left, language toggle right, hamburger on mobile
- `<SiteFooter />` — three-column footer: practice, registration, innovation. Mirrors the letterhead footer.
- `<MainNav />` — horizontal nav on desktop, drawer on mobile

Storybook stories for every component, with all the variants documented.

---

## Bilingual & RTL — non-negotiable rules

1. **Every page renders at `/page` (English) and `/ar/page` (Arabic).**
2. The Arabic version sets `<html lang="ar" dir="rtl">`. Every directional CSS property uses logical properties (`margin-inline-start`, `padding-inline-end`, `text-align: start`) so the layout mirrors automatically.
3. Cormorant Garamond is for English headings only. Arabic headings use IBM Plex Sans Arabic at heavier weights — typically 600 or 700.
4. The language toggle is visible on every page. It preserves the route segment when switching: `/about` ↔ `/ar/about`.
5. Numbers default to Western Arabic (0–9) in both languages.
6. Translations are not Google-translated. Arabic copy lives in `messages/ar.json` and is reviewed for technical accuracy.
7. The portrait, the brand colors, the typography scale, the layout grid — all identical between languages.

---

## Performance budget — pass / fail

This site must hit these numbers on a deployed preview, measured via Lighthouse on a slow-3G simulated connection:

- LCP < 2.5 seconds
- INP < 200 milliseconds
- CLS < 0.1
- Total page weight, home page, < 400 KB excluding fonts
- Total JS shipped to client, home page, < 80 KB after compression
- Lighthouse Performance score >= 95
- Lighthouse Accessibility score = 100
- Lighthouse Best Practices score = 100
- Lighthouse SEO score = 100
- Lighthouse PWA score = 100

Specific tactics to hit the budget:

- Self-host critical font weights (Cormorant 700, Plex Sans 400/500, Plex Sans Arabic 500) as WOFF2 with `font-display: swap`
- Subset fonts to Latin + Arabic only — no Cyrillic, no extended Greek, no Vietnamese
- Use Next.js Image with priority on the hero portrait and lazy loading on everything else
- Generate static OG images at build time for stable URLs; use the dynamic OG route only for parameterized pages
- Inline critical CSS for the hero
- Defer all non-critical JavaScript
- No client-side data fetching on the home page
- Compress all PNGs with `oxipng -o max`
- Compress all SVGs with `svgo`
- Cache headers: HTML `s-maxage=60, stale-while-revalidate=86400`; assets `public, max-age=31536000, immutable`

---

## Accessibility — WCAG 2.2 AA

1. Every interactive element has a visible focus ring in gold (`#C8A44E`) on navy and Deep Navy on cream
2. Every image has alt text — the portrait alt is `"Dr. Milad Khatib at his office, Beirut, 2026"` (the v3 civilian-framed alt). No "decorated officer," no "engineering officer," no institutional attribution.
3. Heading hierarchy is strict: one H1 per page, H2 for major sections, H3 for sub-sections, no skipping levels
4. Color contrast: every text/background pair tested. The brand's gold-on-cream combination fails AA — do not use it for body copy. Only use gold against navy or heritage green for text.
5. Keyboard navigation works on every page. Tab order matches visual order. Skip-to-content link at the top of every page.
6. Screen readers: every landmark labelled (`<main>`, `<nav aria-label="Primary">`, `<aside aria-label="Filters">`)
7. RTL support is not just visual — `aria-label` text reverses, breadcrumb separators flip, screen-reader announcements respect language
8. Forms have associated labels, not just placeholders. Errors are announced. Required fields marked with both visual indicator and `aria-required="true"`
9. Animations respect `prefers-reduced-motion`.

---

## SEO — every page

Per-page metadata generated by the `buildMetadata()` helper from the META-AND-ICONS bundle. Every page has:

- Unique title (max 60 chars), unique meta description (140–160 chars) — **civilian-framed**
- Canonical URL
- Hreflang pair (EN ↔ AR) and `x-default`
- OpenGraph title, description, image, locale
- Twitter card with large image
- JSON-LD: civilian-only `Person` schema (homepage and About), `BreadcrumbList` (every page), `ScholarlyArticle` (each publication detail page if built), `CreativeWork` with `additionalType: Patent` (each patent page)

Sitemap.xml generated at build time, submitted to Google Search Console and Bing Webmaster Tools post-deploy.

Robots.txt explicit: `Allow: /`, `Sitemap: https://miladkhatib.com/sitemap.xml`. No sneaky disallows.

**Structured data tested on every page** against Google Rich Results Test before deploy.

---

## Content rules — applied during build

Every piece of content rendered on the site must satisfy:

1. Traceable to the v3 brand kit, the CV (civilian sections only), or `RECONCILIATION-NOTES.md`
2. Voice-checked against the two-register rules in `SKILL.md`
3. **No military references whatsoever.** This is a hard build-blocker. Any military reference that slips into any page, any meta tag, any source comment, any file name fails the build.
4. No "26+ years" — replaced with the timeline showing 1998 to present
5. No aggregate citation count — instead the calm "52 publications" with link to ORCID / Scopus
6. No invented credentials, no soft-pedalled quotes, no AI-generated stock imagery anywhere
7. No public-service-record page, no disaster-assessment service page, no fourth pillar

---

## Civilian audit — required before deploy

Add a build-time check to the project. A single `scripts/audit-civilian.mjs` script that greps every output file (every `.tsx`, `.ts`, `.json`, `.md`, `.mjs`, `.html`, every generated page in `.next/`) for the regex:

```
/military|LAF|Armed Forces|Battalion|Valour|Anti-Terror|Felicitation|Commendation|Infantry|PLA Shijiazhuang|Engineering Directorate|Office of Military|Strategic and Security|Beirut Port|public-service|public service record|Disaster & Post-Event/i
```

If the script finds **any** match, `npm run build` fails with a non-zero exit code and a clear error pointing at the offending file. Wire this script into the CI pipeline so a PR cannot merge with any match.

The civilian audit runs on every PR, every deploy, every release. The directive is permanent; the safeguard is permanent.

---

## Deployment

**Hosting recommendation: Cloudflare Pages.** Reasoning: primary audience is in Lebanon and the broader MENA region, where Cloudflare's PoPs (Beirut, Cairo, Dubai, Istanbul) outperform Vercel's (Frankfurt, London) on real 4G connections. Cost is zero for this scale. Edge functions handle the contact form. Image optimization handled at the build step rather than runtime.

**Domain.** miladkhatib.com is already registered. DNS migration to Cloudflare. Records:
- `A` and `AAAA` for `@` and `www` to Cloudflare Pages
- Existing `MX` records preserved for email delivery
- `SPF`, `DKIM`, `DMARC` for the email sender (Resend or equivalent for the contact form)
- `CAA` for Let's Encrypt
- HSTS preload after a 30-day observation period

**CI/CD.** Git-based deployment. `main` branch → production. PRs → preview deployments with `noindex`. Required checks: TypeScript, Biome/ESLint, build, Playwright e2e, Lighthouse CI on the preview URL, **civilian audit script**.

**Secrets.** Environment variables for Resend API key, Plausible site ID, no others. Secrets stored in Cloudflare Pages dashboard, not in the repo.

**Monitoring.** Cloudflare Web Analytics for traffic. Plausible (self-hosted on a small VPS) for richer analytics including the EN/AR split. Sentry for error monitoring (free tier).

---

## Testing

- Unit tests on any pure logic (Zod schemas, citation formatting, language toggle URL transformation)
- Component tests on the form (validation, submission, error states)
- Playwright e2e tests on:
  - Home page renders both languages
  - Language toggle preserves route
  - Contact form submission round-trip (mocked)
  - Publications page filters work client-side
  - Every page has correct title and canonical
  - 404 page renders branded
- Lighthouse CI in PR pipeline
- **Civilian audit script** in PR pipeline (must report zero matches)
- Manual cross-browser pass before launch: Safari (iOS, macOS), Chrome (Android, desktop), Firefox, Samsung Internet, Edge

---

## Definition of done

The website is complete and ready to launch when:

1. Every page in the site map exists in both languages
2. Every Lighthouse score (Performance, Accessibility, Best Practices, SEO, PWA) hits the threshold on the deployed preview
3. Every content item is traceable to the v3 brand kit, the CV's civilian sections, or `RECONCILIATION-NOTES.md`
4. **The civilian audit script returns zero matches across all built output**
5. The publications page lists all 52 papers, filterable by year, topic, and venue type, performant on 3G
6. The contact form delivers email reliably and validates correctly
7. Hreflang pairs and structured data validate against Google's Rich Results Test
8. The realfavicongenerator.net checker reports 100% green
9. Every meta tag from the META-AND-ICONS bundle is present in the head of every page
10. The site renders correctly on iPhone SE through iPad Pro to 4K desktop, in both Safari, Chrome, Firefox, and Samsung Internet, in both languages
11. A Loom or screen recording of the deployed site walking through all pages exists, ready to send to Dr. Khatib for final approval before the DNS cutover

If any criterion fails, fix before declaring done.

---

## Output structure

Deliver the complete project as a folder, ready for `git init` and a single `git push` to production:

```
khatib-website/
├── README.md                         ← project overview, dev instructions, deploy instructions
├── DEPLOYMENT.md                     ← Cloudflare Pages setup, DNS records, environment variables
├── MAINTENANCE.md                    ← how to add a publication, update OEA number, swap portrait
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.mjs
├── biome.json (or .eslintrc + .prettierrc)
├── .gitignore
├── .env.example                      ← documented env vars, no secrets
│
├── public/
│   ├── icons-and-meta/               ← from the META bundle thread
│   ├── fonts/                        ← self-hosted critical WOFF2
│   ├── images/                       ← optimized portrait, project photos when supplied
│   ├── favicon.ico
│   ├── robots.txt
│   ├── sitemap.xml                   ← generated at build
│   └── manifest.webmanifest
│
├── app/
│   ├── layout.tsx                    ← root layout, language-agnostic
│   ├── page.tsx                      ← English home
│   ├── [...slugs]/
│   ├── ar/
│   │   ├── layout.tsx                ← Arabic root layout, dir="rtl"
│   │   ├── page.tsx                  ← Arabic home
│   │   └── [...slugs]/
│   ├── api/
│   │   ├── contact/route.ts
│   │   └── og/[...slug]/route.tsx
│   └── lib/
│       ├── metadata.ts               ← from META bundle
│       └── i18n.ts
│
├── components/
│   └── khatib/                       ← every component listed above
│
├── content/                          ← typed TS modules, source of truth
│   ├── publications.ts               ← all 52, with topics
│   ├── editorial-roles.ts            ← all 21
│   ├── teaching.ts                   ← from CV, civilian-only
│   ├── speaking.ts                   ← from CV, civilian-only
│   ├── patents.ts                    ← both patents
│   ├── languages.ts
│   ├── timeline.ts                   ← career timeline for About page (1998 →)
│   └── translations/
│       ├── en.json
│       └── ar.json
│
├── scripts/
│   └── audit-civilian.mjs            ← the civilian-content guard
│
├── tests/
│   ├── unit/
│   ├── component/
│   └── e2e/
│
└── .storybook/                       ← if Storybook is used
```

---

## Final note

When you are uncertain about a decision in this build — about voice, about layout, about a credential's framing, about whether to include something — default to the most restrained, most factual, most defensible, **most civilian-clean** choice. The brand's promise is *engineering by proof*. The build itself must be evidence of the brand it carries.

The directive that controls this build is not a compliance checkbox. It is a man's preference, expressed clearly, in a context where the stakes are higher than any web project. Honour it without exception.

Show your work. Cite your sources. Render your pages. Test your claims. Run the civilian audit. Ship the site.
