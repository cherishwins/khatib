import type { Metadata } from 'next';
import { ContactPage } from '@/components/khatib/ContactPage';
import { getDictionary } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';

const dict = getDictionary('en');
export const metadata: Metadata = buildMetadata({
  title: dict.contact.title,
  description: dict.contact.lede,
  path: '/contact',
  locale: 'en',
});

export default function Page() {
  return <ContactPage locale="en" dict={dict} />;
}
