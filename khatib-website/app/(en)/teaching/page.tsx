import type { Metadata } from 'next';
import { TeachingPage } from '@/components/khatib/TeachingPage';
import { getDictionary } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';

const dict = getDictionary('en');
export const metadata: Metadata = buildMetadata({
  title: dict.teaching.title,
  description: dict.teaching.lede,
  path: '/teaching',
  locale: 'en',
});

export default function Page() {
  return <TeachingPage locale="en" dict={dict} />;
}
