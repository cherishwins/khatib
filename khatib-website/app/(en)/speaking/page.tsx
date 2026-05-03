import type { Metadata } from 'next';
import { SpeakingPage } from '@/components/khatib/SpeakingPage';
import { getDictionary } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';

const dict = getDictionary('en');
export const metadata: Metadata = buildMetadata({
  title: dict.speaking.title,
  description: dict.speaking.lede,
  path: '/speaking',
  locale: 'en',
});

export default function Page() {
  return <SpeakingPage locale="en" dict={dict} />;
}
