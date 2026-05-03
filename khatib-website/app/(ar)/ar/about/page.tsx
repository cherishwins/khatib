import type { Metadata } from 'next';
import { AboutPage } from '@/components/khatib/AboutPage';
import { getDictionary } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';

const dict = getDictionary('ar');

export const metadata: Metadata = buildMetadata({
  title: dict.about.title,
  description: dict.about.lede,
  path: '/ar/about',
  locale: 'ar',
  ogType: 'profile',
});

export default function Page() {
  return <AboutPage locale="ar" dict={dict} />;
}
