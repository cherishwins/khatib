import type { Metadata, Viewport } from 'next';
import '../globals.css';
import { fontVariables } from '@/lib/fonts';
import { getDictionary } from '@/lib/i18n';
import { brand } from '@/lib/tokens';
import { Analytics } from '@/components/khatib/Analytics';
import { SiteHeader } from '@/components/khatib/SiteHeader';
import { SiteFooter } from '@/components/khatib/SiteFooter';

const dict = getDictionary('ar');

export const viewport: Viewport = {
  themeColor: '#0A0E17',
  colorScheme: 'dark light',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? `https://${brand.domain}`),
  title: { default: brand.nameAr, template: '%s · د. ميلاد الخطيب' },
  description:
    'مكتب استشارات هندسية مدنية في بيروت. إنشائي، جيوتقني، وخبرة فنية. براءتا اختراع، اثنان وخمسون منشوراً، إحدى وعشرون عضوية تحريرية.',
  applicationName: 'د. ميلاد الخطيب',
  formatDetection: { telephone: false },
  referrer: 'strict-origin-when-cross-origin',
  manifest: '/icons-and-meta/manifest-ar.webmanifest',
  // icons + opengraph-image auto-injected by Next.js conventions:
  // app/icon.tsx · app/apple-icon.tsx · app/(ar)/opengraph-image.tsx
};

export default function ArabicRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={fontVariables}>
      <body className="bg-deep-navy font-arabic text-cream antialiased">
        <a href="#main" className="skip-link">
          {dict.nav.skipToContent}
        </a>
        <SiteHeader locale="ar" dict={dict} />
        <main id="main">{children}</main>
        <SiteFooter locale="ar" dict={dict} />
        <Analytics />
      </body>
    </html>
  );
}
