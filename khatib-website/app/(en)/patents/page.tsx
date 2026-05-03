import type { Metadata } from 'next';
import { PatentsIndexPage } from '@/components/khatib/PatentsPage';
import { getDictionary } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';

const dict = getDictionary('en');
export const metadata: Metadata = buildMetadata({
  title: dict.patents.title,
  description: dict.patents.lede,
  path: '/patents',
  locale: 'en',
});

export default function Page() {
  return <PatentsIndexPage locale="en" dict={dict} />;
}
