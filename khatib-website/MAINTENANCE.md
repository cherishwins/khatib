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

## Update the OEA registration number

Open `content/translations/en.json` and `content/translations/ar.json`,
locate the `home.credentials` and `about.memberships` arrays, replace the
`OEA Beirut · member since January 1999` line with the version that
includes the registration number.

## Swap the portrait

Drop the authorised portrait (`khatib-portrait-original.jpg`) into
`public/images/`. Edit `components/khatib/HomePage.tsx`: replace the
`<Monogram size={220} />` placeholder block with a `<Image>` component
pointing at `/images/khatib-portrait-original.jpg`. Set `priority` and
`alt="Dr. Milad Khatib at his office, Beirut, 2026"`.

## Add a new editorial role

Edit the source HTML at `extracted/mkhatib/editorial-roles.html`, then
re-run `node scripts/extract-editorial.mjs`.

## Swap the patent companion publication for the 2025 patent

Edit `content/patents.ts`, find the `food-particle-2025` entry's
`companion` object, replace the placeholder citation with the real one,
add the DOI, remove the `note_en` / `note_ar` fields.

## Mark MBA as conferred

Edit `content/timeline.ts`. Change the AUST entry's `description_en` /
`description_ar` from "Expected end of current semester" to the
conferral year and remove `current` from `year` (replace with the year).

## Add a new language

Out of scope. Site is bilingual EN/AR by design.

## Run the audit alone

```bash
npm run audit:civilian
```

This is also wired into `npm run build` (prebuild). You cannot ship a
build that contains a banned term.
