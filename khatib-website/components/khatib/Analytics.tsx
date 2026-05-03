// Umami analytics — privacy-respecting, cookieless. Mirrors the version in existing-repo
// so the public site, the studio, and any future surface all report to the same dashboard.
// Site ID hardcoded; data destination is cloud.umami.is.

import Script from 'next/script';

const UMAMI_WEBSITE_ID = 'd620efb1-b66d-40e2-a412-dbad60862b72';
const UMAMI_SRC = 'https://cloud.umami.is/script.js';

export function Analytics() {
  return (
    <Script
      src={UMAMI_SRC}
      strategy="afterInteractive"
      data-website-id={UMAMI_WEBSITE_ID}
      defer
    />
  );
}
