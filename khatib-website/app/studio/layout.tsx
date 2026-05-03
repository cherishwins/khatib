import type { Metadata, Viewport } from 'next';
import '../globals.css';
import './studio.css';
import { fontVariables } from '@/lib/fonts';

export const viewport: Viewport = {
  themeColor: '#0A0E17',
  colorScheme: 'dark light',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Khatib Studio',
  robots: { index: false, follow: false, nocache: true },
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={fontVariables}>
      <body className="bg-deep-navy text-cream antialiased">{children}</body>
    </html>
  );
}
