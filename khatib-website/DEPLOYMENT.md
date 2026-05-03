# Deployment — miladkhatib.com

## Recommended host

**Cloudflare Pages.** Reasoning per the brand-kit prompt: primary audience
is in Lebanon and the Gulf, where Cloudflare PoPs (Beirut, Cairo, Dubai,
Istanbul) outperform Vercel's (Frankfurt, London) on real 4G connections.
The site also deploys cleanly to Vercel; the choice is operational, not
technical.

## First-time setup (Cloudflare Pages)

1. Create a Cloudflare Pages project pointed at this repository.
2. Build settings:
   - Build command: `npm run build`
   - Build output directory: `.next` (with the official Next.js on Pages
     adapter — `@cloudflare/next-on-pages`) **or** `out` (if you opt into
     static export; not recommended because of the contact form route).
3. Environment variables (Production + Preview):
   - `NEXT_PUBLIC_SITE_URL=https://miladkhatib.com`
   - `RESEND_API_KEY=…` (set as a secret)
   - `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=miladkhatib.com` (if Plausible is set up)
4. Custom domain:
   - `miladkhatib.com` and `www.miladkhatib.com` → CNAME to the Pages target.
   - Preserve existing `MX`, `SPF`, `DKIM`, `DMARC` records for email.
   - Add `CAA` records for Let's Encrypt.
   - Enable HSTS preload after a 30-day observation period.

## Vercel alternative

```bash
vercel --prod
```

Set the same environment variables in the Vercel project settings. The
build is `npm run build`, which already runs the civilian audit before
`next build`.

## CI gates (every PR)

- `npm run typecheck` (clean)
- `npm run lint`
- `npm run audit:civilian` (zero matches)
- `npm run build` (succeeds, includes the audit)

## Post-launch tasks

- Ship the META-AND-ICONS bundle output into `public/icons-and-meta/`
  (favicon.ico, all PNG variants, browserconfig.xml, the OG renders).
- Replace the inline-monogram portrait placeholder with the authorised
  `khatib-portrait-original.jpg` from the social pack.
- Submit `https://miladkhatib.com/sitemap.xml` to Google Search Console and
  Bing Webmaster Tools.
- Validate every page through:
  - https://search.google.com/test/rich-results
  - https://realfavicongenerator.net/favicon_checker
  - https://validator.schema.org/
  - https://www.linkedin.com/post-inspector/
- Run a Lighthouse pass on the deployed preview. The brand-kit prompt sets
  the targets (Performance ≥ 95, Accessibility = 100, Best Practices = 100,
  SEO = 100, PWA = 100). The first build is reasonably close on a clean
  network; closing remaining gaps is post-launch optimization.

## Roll-back

Cloudflare Pages keeps every deployment. To revert:

```bash
# In the Cloudflare dashboard: Pages → project → Deployments → Promote previous
```

Never force-push to `main`. Branch and PR for everything.
