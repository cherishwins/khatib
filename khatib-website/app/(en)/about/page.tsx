import type { Metadata } from 'next';
import { AboutPage } from '@/components/khatib/AboutPage';
import { getDictionary } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';

const dict = getDictionary('en');

export const metadata: Metadata = buildMetadata({
  title: dict.about.title,
  description: dict.about.lede,
  path: '/about',
  locale: 'en',
  ogType: 'profile',
});

export default function Page() {
  return <AboutPage locale="en" dict={dict} />;
}
