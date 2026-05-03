import type { Metadata, Viewport } from 'next';
import '../globals.css';
import { fontVariables } from '@/lib/fonts';
import { getDictionary } from '@/lib/i18n';
import { brand } from '@/lib/tokens';
import { SiteHeader } from '@/components/khatib/SiteHeader';
import { SiteFooter } from '@/components/khatib/SiteFooter';

const dict = getDictionary('en');

export const viewport: Viewport = {
  themeColor: '#0A0E17',
  colorScheme: 'dark light',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? `https://${brand.domain}`),
  title: { default: brand.nameEn, template: '%s · Dr. Milad Khatib' },
  description:
    'Beirut-based civilian civil engineering consultancy. Structural, geotechnical, and forensic. Two patents, fifty-two publications, twenty-one editorial roles.',
  applicationName: 'Dr. Milad Khatib',
  formatDetection: { telephone: false },
  referrer: 'strict-origin-when-cross-origin',
  manifest: '/icons-and-meta/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/icons-and-meta/favicon.ico' },
      { url: '/icons-and-meta/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons-and-meta/favicon-16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/icons-and-meta/apple-touch-icon.png', sizes: '180x180' }],
  },
};

export default function EnglishRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={fontVariables}>
      <body className="bg-deep-navy text-cream antialiased">
        <a href="#main" className="skip-link">
          {dict.nav.skipToContent}
        </a>
        <SiteHeader locale="en" dict={dict} />
        <main id="main">{children}</main>
        <SiteFooter locale="en" dict={dict} />
      </body>
    </html>
  );
}
