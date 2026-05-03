# Dr. Milad Khatib · Brand Kit v3 (Civilian Edition)

Complete brand identity, application templates, and website-rebuild plan for **miladkhatib.com** — built around a documented civilian engineering record: 27 years of practice, 52 peer-reviewed publications, 21 editorial board positions, 2 Lebanese-registered patents, 1 published book, three concurrent academic posts, and an MBA in progress.

This is v3 of the kit.

- v1 was built before the CV arrived (uncertainty)
- v2 was built around the CV (abundance)
- **v3 is built around Dr. Khatib's WhatsApp directive of 2 May 2026: civilian only, no military references on any public materials**

---

## Quick start

1. Open **`references/brand-guide.html`** in a browser. That's the showpiece — every brand element rendered with live web fonts, all civilian-edition application templates.
2. Read **`POSITIONING-SHIFT.md`** to understand the v1 → v2 → v3 trajectory and why we got here.
3. Read **`SKILL.md`** for the full brand specification with the controlling civilian-only rule.
4. Read **`RECONCILIATION-NOTES.md`** for the working list of what's confirmed, what's still pending Dr. Khatib's WhatsApp confirmation, and a single combined WhatsApp ask draft.
5. When ready to build the site, follow **`WEBSITE-REBUILD-PROMPTS.md`** — six self-contained prompts you can paste into fresh Claude threads, in order.

---

## What v3 contains

**Active examples — the civilian brand surface.**
- `examples/letterhead-en.html` — English letterhead with OEA membership-since-1999
- `examples/letterhead-ar.html` — Arabic letterhead, RTL, parallel content
- `examples/og-image.html` — 1200×630 social share preview
- `examples/linkedin-banner.html` — 1584×396 personal banner
- `examples/capability-statement-cover.html` — A4 cover, three pillars (Structural / Geotechnical / Forensic)
- `examples/patent-case-study.html` — 2023 patent, with Springer companion publication cited
- `examples/patent-case-study-2.html` — 2025 patent
- `examples/publications-page.html` — All 52 publications, sortable by year / topic / venue type, the book pinned at the top
- `examples/editorial-roles.html` — All 21 editorial board / reviewer positions, grouped by region

**Held back in `_optional/`.**
- `public-service-record.html.OPTIONAL` — the four committee chairmanships page, preserved for possible future use; does not run in the active kit. See `_optional/README.md` for reactivation steps if ever needed.

---

## Folder structure

```
khatib-brand-kit-v3/
├── README.md                              ← you are here
├── SKILL.md                               ← brand specification (civilian-only rule controlling)
├── brand-dna.yaml                         ← machine-readable spec
├── POSITIONING-SHIFT.md                   ← v1 → v2 → v3 rationale
├── RECONCILIATION-NOTES.md                ← working notes + open WhatsApp asks
├── WEBSITE-REBUILD-PROMPTS.md             ← from v1, still applies (with civilian-only caveat)
│
├── _optional/                             ← held-back materials
│   ├── README.md                          ← what's here and why
│   ├── public-service-record.html.OPTIONAL
│   └── preview-public-service.png.OPTIONAL
│
├── logos/                                 ← unchanged from v1
│   ├── khatib-mark-primary.svg
│   ├── khatib-mark-light.svg
│   ├── khatib-monogram.svg
│   ├── khatib-favicon.svg
│   └── khatib-wordmark.svg
│
├── patterns/                              ← unchanged from v1
│   ├── isometric-grid.svg
│   └── patent-schematic.svg
│
├── examples/
│   ├── og-image.html
│   ├── linkedin-banner.html
│   ├── letterhead-en.html
│   ├── letterhead-ar.html
│   ├── capability-statement-cover.html    ← three pillars
│   ├── patent-case-study.html             ← with companion publication
│   ├── patent-case-study-2.html
│   ├── publications-page.html             ← all 52, sortable
│   ├── editorial-roles.html               ← all 21, grouped by region
│   └── preview-*.png                      ← rendered previews
│
└── references/
    ├── brand-guide.html                   ← the showpiece
    └── preview-brand-guide.png            ← full render
```

---

## Brand DNA at a glance

- **Tagline:** *Engineering by proof.* / *الهندسة بالبرهان.*
- **Colors:** Deep Navy `#0A0E17` · Gold `#C8A44E` · Heritage Green `#1A4D2E` · Blueprint Blue `#2E5E8B` · Cream `#F5F1E8`
- **Typography:** Cormorant Garamond (display) · IBM Plex Sans (body) · IBM Plex Sans Arabic (all Arabic) · IBM Plex Mono (technical metadata)
- **Mark:** MK serif inside an isometric cube
- **Voice:** Two registers — English consultant (technical, plain-spoken, project-led) and Arabic heritage (formal, scholarly, OEA-respectful)
- **Pillars:** Structural · Geotechnical · Forensic

---

## The controlling rule

The single most important rule in `SKILL.md`, and the rule that shapes every other rule:

> This is a civilian engineering brand. Dr. Khatib has explicitly confirmed via WhatsApp (2 May 2026) that he does not want military service referenced anywhere on his public materials. That preference is non-negotiable.

When in doubt about whether to include something, default to whatever leaves the civilian surface cleaner. The CV is the source of facts; the website is the curated subset of those facts that Dr. Khatib has consented to publish. Those are different documents, on purpose.

---

## Pending client confirmations

Before specific external content goes live, confirm via WhatsApp:

- [ ] **OEA Beirut registration number** — for letterheads and capability statements
- [ ] **Patent registration numbers** — both 2023 and 2025
- [ ] **Companion publication for the 2025 patent** — exists / in submission / forthcoming?
- [ ] **MBA conferral** (currently shown as "in progress")
- [ ] **Phone number on public contact page** — confirm publish

A single combined ask draft is in `RECONCILIATION-NOTES.md`.

---

*Inspired by · Ibrahim Energy Partners brand system*
