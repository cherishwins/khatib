# Khatib Project — Fresh-Thread Prompt Series (v3)

Two self-contained prompts. Each runs in its own Claude thread. Run them in this order.

The earlier v1 prompt series had three threads. The first one (CONTENT-OVERHAUL) has already executed — the result is `khatib-brand-kit-v3/`, which is the input to both threads in this v3 series. The original prompt is preserved as `_archived-CONTENT-OVERHAUL-PROMPT.md` for reference.

---

## The directive that controls every thread

On 2 May 2026, Dr. Khatib confirmed via WhatsApp:

> "Yes... kindly, I don't like to mention about military personality."

This is final. **No military service, medals, units, courses, postings, or institutional attribution appears anywhere in any output of these threads.** Every prompt below carries this directive at the top and reinforces it throughout. The civilian engineering record alone is the brand.

---

## The two threads

### Thread 1 — `META-AND-ICONS-PROMPT.md`

**Goal.** Produce the complete favicon, OpenGraph, Apple touch icon, Android maskable icon, Windows tile, PWA manifest, and structured-metadata stack. Every device. Every browser. Every social platform. Pixel-perfect. Civilian-only.

**Run this first.** The website build depends on the icons and meta helper.

**Attach to the thread:**
- The complete `khatib-brand-kit-v3/` folder
- `khatib-portrait-original.jpg` from `khatib-social-v3/`

**Output:** A `khatib-meta-bundle/` folder with `public/icons-and-meta/`, a Next.js `metadata.ts` helper, a dynamic OG route, validation matrices, a civilian-audit report, and a paste-ready head-meta snippet.

**Time estimate:** medium thread. Mostly asset rendering and validation matrix population.

---

### Thread 2 — `WEBSITE-PRODUCTION-BUILD-PROMPT.md`

**Goal.** Build the production website at miladkhatib.com using the v3 brand kit, the meta bundle, and the social pack. Bilingual EN/AR with full RTL. Static-first. Performance-budgeted. Accessibility-locked. Ready to deploy to Cloudflare Pages.

**Run this second — and run it in Claude Code or another agentic environment that can install dependencies, render Playwright tests, and iterate.** A regular Claude thread can write the code but cannot run it; the build will be much higher quality if Claude can execute.

**Attach to the thread:**
- The complete `khatib-brand-kit-v3/` folder
- The `khatib-meta-bundle/` folder (output of Thread 1)
- The `khatib-social-v3/` folder including the portrait

**Output:** A complete Next.js 14 project ready for `git init` and deploy to Cloudflare Pages. Bilingual. 100/100 Lighthouse across all four scores. Eleven pages × two languages. Three pillars. The publications page that Dr. Khatib explicitly asked for. The civilian-audit script wired into CI.

**Time estimate:** long Claude Code session. Multiple iterations expected. Plan for it.

---

## Dependencies

```
khatib-brand-kit-v3/   (already produced — input to both threads)
       ↓
Thread 1 (META-AND-ICONS)
       ↓
khatib-meta-bundle/
       ↓
Thread 2 (WEBSITE BUILD) — also takes khatib-brand-kit-v3 and khatib-social-v3
       ↓
khatib-website/   →  deploy to Cloudflare Pages
```

---

## Pre-flight checklist before Thread 1

- [ ] `khatib-brand-kit-v3/` folder exists with all files (logos, patterns, examples, references, the four top-level docs)
- [ ] `khatib-social-v3/khatib-portrait-original.jpg` is at full resolution
- [ ] You have read the v3 directive in `khatib-brand-kit-v3/SKILL.md` and confirmed you understand the civilian-only rule

## Pre-flight checklist before Thread 2

- [ ] `khatib-meta-bundle/` exists with all PNG icon variants and the `metadata.ts` helper
- [ ] Civilian audit on the meta bundle reports zero matches
- [ ] You're running in Claude Code or an environment with shell access, Node.js, and Playwright installed
- [ ] You have a placeholder `miladkhatib.com` Cloudflare Pages project ready, or are happy to set one up after the build

---

## What's pending and not blocking either thread

These four items can be supplied via WhatsApp at any time and swapped into the deployed site post-launch with a single commit. They are not blockers:

- OEA Beirut registration number (membership year is locked in)
- Patent registration numbers (both 2023 and 2025)
- Companion publication for the 2025 patent (currently shown as "forthcoming")
- MBA conferral confirmation (currently shown as "in progress")

The combined WhatsApp ask draft for these four is in `khatib-brand-kit-v3/RECONCILIATION-NOTES.md`.

---

## The honesty rule that runs through both threads

Every claim, every credential, every date, every DOI on every page of every thread's output must be traceable to the v3 brand kit, the CV's civilian sections, or confirmed WhatsApp messages. If a fact is missing, the deliverable contains a clearly-marked `<!-- pending -->` HTML comment, not a guess.

The civilian-only directive is the controlling rule. Any military reference that slips into any output fails the thread's definition of done. The civilian audit script in Thread 2 makes this enforceable in CI; the equivalent grep in Thread 1 makes it enforceable at the meta-bundle stage.

---

## Final note

The two prompts are deliberately long. Verbosity is a feature here — every constraint named is a future error prevented. Read each one fully before pasting. The deliverables they produce will only be as good as the constraints you bring into the thread.

Two threads. One civilian-only, bilingual, performant, accessible, brand-coherent website. The asset Dr. Khatib asked for, plus the assets he didn't know to ask for, plus the discipline to keep his preferences honoured at every layer. Ready to ship.
