# Fresh-Thread Prompt — Complete OpenGraph, Favicon & Device-Icon System for miladkhatib.com

> **Copy everything below the horizontal rule into a fresh Claude thread.**
>
> **Attach to that thread:**
> - The complete `khatib-brand-kit-v3/` folder (civilian edition) — `SKILL.md`, `brand-dna.yaml`, `logos/`, `patterns/`, `examples/og-image.html`, `references/brand-guide.html`
> - The portrait `khatib-portrait-original.jpg` from `khatib-social-v3/`

---

## The directive that controls this thread

On 2 May 2026, Dr. Khatib confirmed via WhatsApp:

> "Yes... kindly, I don't like to mention about military personality."

This is final. **No military service, medals, units, courses, or postings appear anywhere — in OG metadata descriptions, alt text, JSON-LD schemas, file names, social share previews, or any rendered output of this thread.** The civilian engineering record alone is the brand. Read `SKILL.md`'s civilian-only honesty rule (the controlling rule at the top of the honesty rules section) before touching any file.

---

## Task

Produce the **complete head-meta and image-asset bundle** for miladkhatib.com so that every favicon, app icon, social share preview, and tile renders beautifully on every device, browser, OS, and platform combination — without exception, and without per-page fragility.

The Khatib brand carries a senior civilian-engineer voice; the metadata stack must match. A blurry favicon, a cropped OG image, or an Android home-screen icon that says "M" instead of "MK" is the kind of detail a sharp counterpart notices, and it puts the entire credibility argument under suspicion. **Pixel-perfect, zero exceptions, every device.**

Read `SKILL.md` and `brand-dna.yaml` first. Use the brand kit's tokens — Deep Navy `#0A0E17`, Gold `#C8A44E`, Heritage Green `#1A4D2E`, Cream `#F5F1E8`, Cormorant Garamond / IBM Plex Sans / IBM Plex Sans Arabic / IBM Plex Mono. The MK isometric-cube monogram is the icon mark; the primary lockup with portrait is the OG hero. **No invented colors, no Tailwind defaults, no stock fonts.**

---

## Deliverable

A single folder, `public/icons-and-meta/`, plus a single document, `head-meta-snippet.html`, plus a Next.js metadata helper, `app/lib/metadata.ts`. After dropping these into the project, every page automatically gets the correct meta — no per-page work.

### Folder structure to produce

```
public/
├── icons-and-meta/
│   ├── favicon.ico                          ← multi-resolution ICO: 16, 32, 48 px
│   ├── favicon-16.png                       ← legacy fallback
│   ├── favicon-32.png                       ← legacy fallback
│   ├── favicon-96.png                       ← Google TV, some older Android
│   ├── icon-192.png                         ← PWA manifest, Android home
│   ├── icon-256.png                         ← Windows pinned site
│   ├── icon-384.png                         ← PWA splash mid
│   ├── icon-512.png                         ← PWA splash large, Android share
│   ├── icon-1024.png                        ← future-proof high-DPI
│   ├── icon-192-maskable.png                ← Android adaptive (15% safe zone)
│   ├── icon-512-maskable.png                ← Android adaptive (15% safe zone)
│   ├── apple-touch-icon.png                 ← 180×180, iOS home screen
│   ├── apple-touch-icon-precomposed.png     ← 180×180, iOS legacy
│   ├── apple-touch-icon-152.png             ← iPad
│   ├── apple-touch-icon-167.png             ← iPad Pro
│   ├── safari-pinned-tab.svg                ← monochrome SVG, Safari pinned tab
│   ├── mstile-70.png                        ← Windows 10 small tile
│   ├── mstile-150.png                       ← Windows 10 medium tile
│   ├── mstile-310-150.png                   ← Windows 10 wide tile
│   ├── mstile-310.png                       ← Windows 10 large tile
│   ├── browserconfig.xml                    ← Windows tile config
│   ├── manifest.webmanifest                 ← PWA manifest, full spec (EN)
│   ├── manifest-ar.webmanifest              ← PWA manifest, Arabic locale
│   │
│   ├── og-default.png                       ← 1200×630 default OG (homepage)
│   ├── og-default@2x.png                    ← 2400×1260 retina-density OG
│   ├── og-square.png                        ← 1200×1200 (LinkedIn alt)
│   ├── og-twitter.png                       ← 1200×675 X / Twitter
│   ├── og-whatsapp.png                      ← 400×400 (WhatsApp link preview)
│   │
│   ├── og-template-page.html                ← per-page OG template (Playwright-renderable)
│   └── README.md                            ← regeneration instructions
│
└── (separately at the project root)
    ├── robots.txt
    └── sitemap.xml                          ← stubs only at this stage
```

### Head-meta snippet to produce

A single `head-meta-snippet.html` containing the complete `<head>` block ready to paste into any layout. Every modern best practice represented, no missing tags, no redundant tags, ordered by browser parsing priority.

### Next.js metadata helper to produce

`app/lib/metadata.ts` exporting a typed function `buildMetadata({ title, description, path, ogImage, locale })` that returns a Next.js 14 `Metadata` object with everything correctly populated for the page in question. Includes hreflang pairs for EN ↔ AR. Defaults to `og-default.png` if no per-page OG image is supplied.

---

## Asset specifications — exact

### Icon family (all derived from the MK monogram)

The icon mark across all sizes is the **MK serif monogram inside the isometric cube outline**, on Deep Navy `#0A0E17` background, gold cube outline, white serif MK, gold rule above.

Below 64 px the cube outline drops away and the favicon collapses to MK + gold rules above and below (the existing `khatib-favicon.svg` pattern). The breakpoints:

| Size | Variant |
|---|---|
| 16, 32, 48 (favicon.ico) | Simplified — MK + gold rules, no cube |
| 64, 96, 128 | Simplified — MK + gold rules, no cube |
| 152, 167, 180 (Apple touch) | Full mark — MK + cube + ENG · LB |
| 192, 256, 384, 512, 1024 | Full mark — MK + cube + ENG · LB |
| Safari pinned-tab SVG | Monochrome MK + cube outline only, no fill, ready for Safari recolor |

**Padding:** Apple touch icons need `~10%` interior padding so iOS does not crop the cube edges when applying its rounded mask. Android adaptive icons (the 192/512 maskable variants) need a `~15%` safe zone — produce the navy-padded `purpose: "maskable"` PNGs in addition to the standard ones.

**File format rules:**
- ICO uses Windows PNG-encoded layers, not BMP, for sharpness
- All PNGs are 8-bit RGB (not paletted), no alpha unless explicitly required (Safari pinned tab is the only SVG that needs `path` not `image`)
- Compress losslessly with `oxipng` or equivalent — no quality loss, smallest byte count

### OG image family

The OG hero is **the Dr. Milad Khatib brand lockup with portrait integrated** — same composition as the `khatib-social-v3/` About-page hero, adjusted for OG aspect ratios.

For each OG variant:

| File | Size | Purpose | Composition notes |
|---|---|---|---|
| `og-default.png` | 1200×630 | Facebook, LinkedIn, OpenGraph default | Portrait left 45%, type column right 55%; navy ground; "Engineering by proof." tagline |
| `og-default@2x.png` | 2400×1260 | Retina density for some scrapers | Same composition, 2× resolution |
| `og-square.png` | 1200×1200 | LinkedIn square fallback | Portrait top half, type bottom half, monogram bottom corner |
| `og-twitter.png` | 1200×675 | Twitter `summary_large_image` | Same as default but tighter type — Twitter crops aggressively |
| `og-whatsapp.png` | 400×400 | WhatsApp link preview thumbnail | Square, monogram large, name compact |

**Critical OG rules:**
- Text inside the OG must remain legible when shrunk to 200 px wide (Twitter timeline thumbnail). That means: name >= 80 px tall in source, no body text below 32 px in source, no thin weights for primary type.
- Safe area: keep the entire composition within an `8%` interior safe margin. Some platforms crop edges.
- Navy background at the literal `#0A0E17` value — not a near-black. Several social platforms strip alpha and you want the brand color to come through, not platform-default-black.
- File size **under 500 KB** per OG image. Most social platforms have hard limits around 5 MB but cache small files better and re-fetch them less often.
- `og:image:alt` text for the homepage default: `"Dr. Milad Khatib — Civil Engineering Consultancy. Beirut, Lebanon."` — civilian-only framing, no institutional attribution.

Render the OG images using **Playwright + Chromium at `device_scale_factor=2`**, pulling Cormorant Garamond + IBM Plex Sans + IBM Plex Sans Arabic + IBM Plex Mono from Google Fonts at full weight range with `display: swap`. Wait for `networkidle` plus `1500 ms` extra so fonts settle before screenshot. The `og-template-page.html` you produce should be re-runnable any time per-page OG variants are needed.

### Per-page dynamic OG (Stage 2 — bonus)

For pages that warrant a unique OG (patents, named publications), produce a **dynamic Next.js OG route** at `app/api/og/route.tsx` using the `next/og` `ImageResponse` API. Inputs: `?title=...&pillar=...&kind=...`. Output: 1200×630 navy-ground image with the page-specific title in Cormorant Garamond, the pillar tag in mono, and the brand wordmark + tagline locked into the bottom margin. Cache headers: `public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000`.

The dynamic route accepts **only civilian content** — pillars are limited to `structural | geotechnical | forensic | research | patent | publication | about | contact`. Any other pillar value should fall back to the default rendering. Do not accept `disaster` or any pillar that maps to public-service work; that page family does not exist.

---

## `manifest.webmanifest` requirements

Produce a complete PWA manifest:

```json
{
  "name": "Dr. Milad Khatib — Civil Engineering Consultancy",
  "short_name": "M. Khatib",
  "description": "Structural, geotechnical, and forensic civil engineering. Beirut, Lebanon.",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "orientation": "any",
  "background_color": "#0A0E17",
  "theme_color": "#0A0E17",
  "lang": "en",
  "dir": "ltr",
  "categories": ["business", "professional", "education"],
  "icons": [
    { "src": "/icons-and-meta/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any" },
    { "src": "/icons-and-meta/icon-192-maskable.png", "sizes": "192x192", "type": "image/png", "purpose": "maskable" },
    { "src": "/icons-and-meta/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any" },
    { "src": "/icons-and-meta/icon-512-maskable.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ],
  "shortcuts": [
    { "name": "Patents", "url": "/patents", "icons": [...] },
    { "name": "Publications", "url": "/publications", "icons": [...] },
    { "name": "Contact", "url": "/contact", "icons": [...] }
  ]
}
```

Produce a separate `manifest-ar.webmanifest` for the Arabic-locale subtree with `"lang": "ar"`, `"dir": "rtl"`, and translated `name` / `short_name` / `description`. **Description must be civilian-only** — translate the English description's content directly; do not introduce framing that English doesn't have.

---

## `head-meta-snippet.html` requirements

Produce a complete `<head>` block containing — in this exact source order, because parser priority matters for First Contentful Paint:

1. **Charset and viewport (first 1024 bytes):**
   - `<meta charset="utf-8">`
   - `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`
   - `<meta name="format-detection" content="telephone=no">`

2. **DNS preconnect / preload (early hints):**
   - `<link rel="preconnect" href="https://fonts.googleapis.com">`
   - `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`
   - `<link rel="preload" as="font" type="font/woff2" crossorigin href="...cormorant-700.woff2">` (self-host the critical hero weight)

3. **Theme color & color scheme (with `prefers-color-scheme` variants):**
   - `<meta name="theme-color" content="#0A0E17" media="(prefers-color-scheme: dark)">`
   - `<meta name="theme-color" content="#0A0E17" media="(prefers-color-scheme: light)">`
   - `<meta name="color-scheme" content="dark light">`

4. **Title and description** (per-page, populated by helper)

5. **Canonical and hreflang:**
   - `<link rel="canonical" href="...">`
   - `<link rel="alternate" hreflang="en" href="...">`
   - `<link rel="alternate" hreflang="ar" href="...">`
   - `<link rel="alternate" hreflang="x-default" href="...">`

6. **Icon link tags — full, ordered, in the order browsers actually parse them:**
   - `<link rel="icon" type="image/x-icon" href="/favicon.ico">` (root, traditional)
   - `<link rel="icon" type="image/png" sizes="16x16" href="/icons-and-meta/favicon-16.png">`
   - `<link rel="icon" type="image/png" sizes="32x32" href="/icons-and-meta/favicon-32.png">`
   - `<link rel="icon" type="image/png" sizes="96x96" href="/icons-and-meta/favicon-96.png">`
   - `<link rel="icon" type="image/png" sizes="192x192" href="/icons-and-meta/icon-192.png">`
   - `<link rel="icon" type="image/svg+xml" href="/icons-and-meta/safari-pinned-tab.svg">`
   - `<link rel="apple-touch-icon" sizes="180x180" href="/icons-and-meta/apple-touch-icon.png">`
   - `<link rel="apple-touch-icon" sizes="152x152" href="/icons-and-meta/apple-touch-icon-152.png">`
   - `<link rel="apple-touch-icon" sizes="167x167" href="/icons-and-meta/apple-touch-icon-167.png">`
   - `<link rel="apple-touch-icon-precomposed" href="/icons-and-meta/apple-touch-icon-precomposed.png">`
   - `<link rel="mask-icon" href="/icons-and-meta/safari-pinned-tab.svg" color="#0A0E17">`
   - `<link rel="manifest" href="/icons-and-meta/manifest.webmanifest">`
   - `<meta name="msapplication-config" content="/icons-and-meta/browserconfig.xml">`
   - `<meta name="msapplication-TileColor" content="#0A0E17">`
   - `<meta name="msapplication-TileImage" content="/icons-and-meta/mstile-150.png">`
   - `<meta name="application-name" content="Dr. Milad Khatib">`
   - `<meta name="apple-mobile-web-app-title" content="M. Khatib">`
   - `<meta name="apple-mobile-web-app-capable" content="yes">`
   - `<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">`

7. **Open Graph (Facebook, LinkedIn, etc.):**
   - `og:type` = `profile` for homepage and `/about`, `article` for publications, `website` elsewhere
   - `og:site_name` = `"Dr. Milad Khatib · Civil Engineering Consultancy"`
   - `og:title`, `og:description`, `og:url`
   - `og:image` (absolute URL, not relative — required by Facebook)
   - `og:image:secure_url` (HTTPS variant, technically required)
   - `og:image:type` = `image/png`
   - `og:image:width` = `1200`, `og:image:height` = `630`
   - `og:image:alt`
   - `og:locale` = `en_US`, `og:locale:alternate` = `ar_LB`
   - For profile pages: `profile:first_name`, `profile:last_name`, `profile:username`

8. **Twitter / X cards:**
   - `twitter:card` = `summary_large_image`
   - `twitter:site` = `@miladkhatib` (placeholder, confirm or remove)
   - `twitter:creator` = same
   - `twitter:title`, `twitter:description`
   - `twitter:image` (absolute URL)
   - `twitter:image:alt`

9. **Article / publication-specific (when applicable):**
   - `article:author`, `article:published_time`, `article:modified_time`
   - `article:section`, `article:tag` (one per tag)

10. **Schema.org JSON-LD as `<script type="application/ld+json">`:**
    - `Person` schema for Dr. Khatib (name, alternateName Arabic, jobTitle, affiliation, alumniOf, hasCredential array, sameAs array, knowsLanguage, image)
    - `BreadcrumbList` schema, populated per page
    - `WebSite` schema with potential `SearchAction`
    - For publications: `ScholarlyArticle` schema
    - For patents: `CreativeWork` (no real `Patent` schema exists yet) with `additionalType: "https://schema.org/Patent"`

11. **Security and performance hints:**
    - `<meta http-equiv="X-UA-Compatible" content="IE=edge">` (legacy IE support, harmless)
    - `<meta name="referrer" content="strict-origin-when-cross-origin">`
    - `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">`

12. **Last in head, deferrable:**
    - Analytics snippet placeholder (Plausible or Cloudflare — no GA4 by default)

### Civilian-only constraint on JSON-LD

The `Person` schema is the most exposed metadata surface — search engines and AI summarisers read it directly. **It must be civilian-only.**

- `jobTitle` = `"Civil Engineering Consultant"` (not "Engineering Officer" or anything that implies institutional role)
- `worksFor` array lists only the civilian academic affiliations (Lebanese International University, University of Balamand, ISSAE-Cnam Liban) — no LAF, no Engineering Directorate, no military training institutions
- `affiliation` array lists only OEA Beirut, SPSC, ACSE, civilian editorial boards
- `alumniOf` lists only Beirut Arab University. **Do not include AUST** if the only AUST credential is the Strategic and Security Analysis diploma; if the MBA-in-progress is referenced (per Dr. Khatib's WhatsApp), include AUST as `alumniOf` with `endDate` blank or marked in-progress.
- `hasCredential` array lists only civilian credentials — PhD, Master, Bachelor, OEA membership, MBA-in-progress (when client confirms), patents, book. **Do not include any military credential.**
- `sameAs` array lists ORCID, Scopus, Google Scholar, ResearchGate, Publons, SciProfiles — verbatim from `brand-dna.yaml`. Nothing else.
- `description` field uses the v3 civilian positioning paragraph from `POSITIONING-SHIFT.md`. Not the v2 one.

---

## `app/lib/metadata.ts` requirements

```typescript
import type { Metadata } from 'next';

interface BuildMetadataInput {
  title: string;                    // Page-specific title, will append " · Dr. Milad Khatib"
  description: string;              // 140-160 chars ideal
  path: string;                     // e.g. "/patents/economic-vessel-2023"
  locale?: 'en' | 'ar';            // default 'en'
  ogImage?: string;                 // path or absolute URL; defaults to /icons-and-meta/og-default.png
  ogImageAlt?: string;              // override default alt
  ogType?: 'website' | 'profile' | 'article';
  publishedTime?: string;           // ISO 8601, for articles
  modifiedTime?: string;
  jsonLd?: Record<string, unknown>; // additional JSON-LD to merge
}

export function buildMetadata(input: BuildMetadataInput): Metadata {
  // Returns a fully populated Next.js Metadata object
  // Including alternates.canonical, alternates.languages (en, ar, x-default)
  // openGraph (full), twitter (full), other.* for the icon family
  // robots tuned per environment (noindex on preview, index on production)
}
```

The function must:
- Read `NEXT_PUBLIC_SITE_URL` for absolute URL construction (with `https://miladkhatib.com` fallback)
- Generate `alternates.languages` for both `en` and `ar` automatically based on `path`
- Apply `noindex` when `process.env.VERCEL_ENV === 'preview'` (or equivalent), `index` in production
- Merge any per-page `jsonLd` with the base civilian-only `Person` and `WebSite` JSON-LD

Produce **example usage** for at least:
- Homepage
- About page
- A patent landing page
- A publication detail page
- The contact page

---

## Validation requirements

Before declaring the bundle complete, verify all of the following:

1. **Icon coverage matrix** — produce a table mapping every `(device, browser)` combination to the asset that will be used:
   - iOS Safari (15+, 16+, 17+) — home screen + browser tab
   - macOS Safari — pinned tab + favorites bar
   - Chrome desktop (latest, latest-1) — tab + bookmark
   - Chrome Android — home screen (PWA) + bookmark
   - Firefox desktop + Android — tab + bookmark
   - Edge desktop — tab + Windows tile
   - Samsung Internet — tab + home screen
   - Opera, Opera Mini, Brave — tab + bookmark
   - Old Android WebView (5.0–9.0) — fallback chain
   - Windows 10/11 pinned site — tile family
   - Add-to-home-screen on iPad

2. **OG render check matrix** — produce a checklist of how the OG renders on:
   - Facebook timeline + share dialog
   - LinkedIn feed (square + landscape variants)
   - Twitter / X (`summary` + `summary_large_image`)
   - WhatsApp link preview (mobile + desktop)
   - Telegram link preview
   - Slack unfurl
   - iMessage link preview (iOS)
   - Discord embed
   - Email preview (Gmail, Outlook)

3. **Civilian-content audit** — grep every produced file for:
   - `military|LAF|Armed Forces|Battalion|Valour|Anti-Terror|Felicitation|Commendation|Infantry|PLA|Engineering Directorate|Office of Military|Strategic and Security|Beirut Port|public-service`
   - Result must be zero matches across all files. If any match appears, fix before declaring complete. The civilian-only directive is non-negotiable.

4. **Live test commands** — provide CLI commands to verify the deployed site:
   - `curl -I` to confirm correct content-types on each asset
   - `curl` + `grep` to confirm correct meta tags appear on key pages
   - Lighthouse PWA audit minimum score: 100/100
   - PageSpeed Insights expectation: LCP < 2.5s, CLS < 0.1
   - Validator URLs to plug the deployed site into:
     - https://developers.facebook.com/tools/debug/
     - https://www.linkedin.com/post-inspector/
     - https://cards-dev.twitter.com/validator
     - https://search.google.com/test/rich-results
     - https://realfavicongenerator.net/favicon_checker
     - https://validator.schema.org/

---

## Honesty rules (carried in from the brand kit)

- Default `og:locale` is `en_US` for English pages, `ar_LB` for Arabic
- Do **not** include AI-generation disclaimers in metadata. The portrait is Dr. Khatib's authorised official portrait.
- Do **not** invent profile URLs in `sameAs` — copy verbatim from `brand-dna.yaml`. ORCID 0000-0002-0140-0941, Scopus 57202890131, etc.
- Do **not** use generic stock alt text like "professional engineer" — alt text is `"Dr. Milad Khatib at his office, Beirut, 2026."` (the v3 civilian-framed alt).
- Patent and publication metadata reflects what the CV documents, not what would sound impressive. Lebanese-registered patents stated as Lebanese-registered.
- **No military references anywhere.** Per Dr. Khatib's WhatsApp directive of 2 May 2026.

---

## Output

Deliver everything to a single folder so it can be dropped into the Next.js project as a unit:

```
khatib-meta-bundle/
├── public/
│   ├── icons-and-meta/         (all PNGs, SVGs, ICO, manifests, browserconfig)
│   ├── favicon.ico             (root, traditional location)
│   ├── robots.txt
│   └── sitemap.xml
│
├── src/
│   └── lib/
│       └── metadata.ts          (the helper)
│
├── app/
│   └── api/
│       └── og/
│           └── route.tsx        (dynamic OG route)
│
├── head-meta-snippet.html       (paste-able reference)
├── icon-coverage-matrix.md      (the validation table)
├── og-render-checklist.md       (the validation checklist)
├── civilian-audit-report.md     (grep results showing zero matches)
└── README.md                    (regeneration + validation instructions)
```

Render every PNG with Playwright at `device_scale_factor=2` from a single HTML source per asset family, save the source HTML alongside the rendered PNG so the assets can be regenerated any time the brand evolves.

---

## Definition of done

The bundle is complete when:

1. **Every device / browser combo in the coverage matrix renders the correct icon** — verified against the matrix
2. **Every social platform in the OG checklist renders the correct preview** — verified against debug tools
3. **realfavicongenerator.net/favicon_checker reports 100% green**
4. **Lighthouse PWA audit reports 100/100**
5. **Schema.org validator reports zero errors on Person, WebSite, BreadcrumbList**
6. **`buildMetadata()` is fully typed, fully documented, and used on every page in the project**
7. **The OG default image renders Dr. Khatib's portrait, the brand lockup, and the tagline at WhatsApp's 200-px-wide thumbnail size with all text legible**
8. **The civilian-content audit returns zero matches across all files**
9. **Source HTML for every regenerable asset is committed to the repo so the next brand revision is one Playwright run away**

If any item fails, fix before declaring done. No "good enough" on the metadata layer — this is the layer every counterpart's email client renders before they read a word.
