# Maintenance — miladkhatib.com

## Add a new publication

The `content/publications.ts` file is auto-generated. Two options:

**(A) Update the source HTML and re-extract.** Edit
`extracted/mkhatib/publications-page.html` to add the new entry, then:

```bash
npm run extract:publications
```

**(B) Hand-edit the generated TS.** Open `content/publications.ts`, append a
new object matching the existing shape, and increment `totalCount` if the
new entry is the highest `num`. Update `home.viewAll` strings in the EN/AR
translations if the count changes.

Then push. The civilian audit runs automatically on build.

## Add a new editorial role

```bash
npm run extract:editorial
```

Edits the source HTML at `extracted/mkhatib/editorial-roles.html`, then
re-runs the extractor.

## Update the OEA registration number

Open `content/translations/en.json` and `content/translations/ar.json`,
locate the `home.credentials` and `about.memberships` arrays, replace the
`OEA Beirut · member since January 1999` line with the version that
includes the registration number.

## Swap the patent companion publication for the 2025 patent

Edit `content/patents.ts`, find the `food-particle-2025` entry's
`companion` object, replace the placeholder citation with the real one,
add the DOI, remove the `note_en` / `note_ar` fields.

## Mark MBA as conferred

Edit `content/timeline.ts`. Change the AUST entry's `description_en` /
`description_ar` from "Expected end of current semester" to the
conferral year and remove `current` from `year` (replace with the year).

## Run the audit alone

```bash
npm run audit:civilian
```

Wired into `npm run build` (prebuild). You cannot ship a build that
contains a banned term.

## Run the unit tests

```bash
npm test                # one-shot
npm run test:watch      # watch mode
```

Vitest covers: studio auth (HMAC sign/verify, expiry, allowlist, kind
discrimination, payload-tamper rejection), i18n path helpers, sealed-
document persistence + summarisation, and the Beirut-pinned greeting.

---

## Khatib Studio (`/studio`)

Auth-gated document workshop for Dr. Khatib (and Jesse). The dashboard at
`/studio` lists every available tool plus a recent-sealed-documents log
shared across all of them.

| Route | Purpose | Output |
|---|---|---|
| `/studio/letter` | Daily correspondence | A4 letterhead, EN or AR |
| `/studio/capability` | Tender prequalification | 4-page A4 capability statement, EN or AR |

### Required environment variables

```
RESEND_API_KEY=...                          # already set for /api/contact
RESEND_FROM=Khatib Studio <noreply@miladkhatib.com>
STUDIO_SESSION_SECRET=<openssl rand -hex 32>
STUDIO_ALLOWLIST=milad@miladkhatib.com,donaldwindysurfer@gmail.com
```

In Vercel: add all four to **Production**. `STUDIO_SESSION_SECRET` must be
≥32 chars; rotating it signs out everyone.

### Architecture

- **Shared chrome** lives in `components/studio/StudioWorkshop.tsx` — top
  bar, command bar, ⌘K palette, sealed drawer, keyboard shortcuts, seal
  animation, save state. Every studio renders into it.
- **Editable primitives** (`Editable`, `EditableBody`) live in
  `components/studio/Editable.tsx` — single source of truth for
  contentEditable behaviour.
- **Sealed-document log** (`lib/studio/sealed.ts`) is a discriminated
  union by `kind` (`'letter' | 'capability'`). Each kind round-trips
  losslessly through `recordSealed*` → `loadSealed` → restore.
- **Templates** (`content/studio-templates/`) are typed modules,
  separately reviewable. Adding a template auto-surfaces it in the studio
  ⌘K palette.
- **Motion + sound** (`lib/studio/motion.ts`) honour
  `prefers-reduced-motion` — gold-rule sweep and soft-thunk on Seal both
  skip when the OS preference is set.
- **Greeting** in the dashboard uses `Intl.DateTimeFormat` pinned to
  `Asia/Beirut`, so SSR matches client regardless of where Vercel runs
  the function.

### Adding a new tool

Three steps:

1. Add an entry to the `TOOLS` array in `components/studio/StudioDashboard.tsx`.
2. Create `app/studio/your-tool/page.tsx` calling `requireSession()`.
3. Build the studio component using the shared shell:

```tsx
return (
  <StudioWorkshop
    toolName="YOUR TOOL"
    userEmail={userEmail}
    locale={draft.locale}
    setLocale={setLocale}
    saveState={saveState}
    sealedCount={sealedCount}
    sealedRefresh={sealedRefresh}
    sealedKind="your-kind"
    onSeal={onSeal}
    onClearDraft={clearDraft}
    onRestore={onRestore}
    extraPaletteActions={...}
    extraCommandBarItems={...}
  >
    <YourPaper />
  </StudioWorkshop>
);
```

The shell handles the entire chrome + keyboard + palette + sealed drawer.

### Adding a new letter template

Append to `content/studio-templates/letters.ts`:

```ts
{
  id: 'my_template',
  label: 'My new template',
  apply: (locale) => locale === 'ar'
    ? { re: 'الموضوع', salutation: '...', body: '...', signoff: '...' }
    : { re: 'Subject', salutation: '...', body: '...', signoff: '' },
},
```

The template auto-appears in the ⌘K palette.

### Usage (for Khatib)

1. Visit `/studio` → enter your email → check inbox → click the magic link (15-min expiry).
2. From the dashboard, pick **Letterhead** or **Capability Statement**.
3. Click directly on any field to edit in place.
4. Footer (OEA, ORCID, patents, contact) is non-editable — brand-locked truth.
5. **Seal & Export** (or **⌘P**): a gold rule sweeps across the page and the
   print dialog opens. Choose **Save as PDF**, set margins to **None**.
6. Drafts auto-save. Sealed documents are logged (⌘O to view, click any
   entry to restore as a draft).

### Keyboard shortcuts

| Shortcut | Action |
|---|---|
| `⌘K` / `Ctrl+K` | Command palette |
| `⌘L` / `Ctrl+L` | Toggle EN ⇄ AR |
| `⌘P` / `Ctrl+P` | Seal & export PDF |
| `⌘O` / `Ctrl+O` | Open sealed-documents drawer |
| `Esc` | Close palette/drawer |

The studio is `noindex,nofollow` and the session cookie is httpOnly + sameSite=lax.

### Capability Statement — page structure

Fixed 4-page A4. Edit only what's customised per tender:

| Page | Editable | Locked (brand truth) |
|---|---|---|
| 1 · Cover | Issued To, Context, REF, Date | Wordmark, tagline, gold rules |
| 2 · Practice | Practice description | Three pillars, stats strip |
| 3 · Representative work | All 4 case-study items | (None — fully editable per tender) |
| 4 · Credentials | Optional engagement note | Education, memberships, languages, software, profiles, contact |
