import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PatentDetailPage } from '@/components/khatib/PatentsPage';
import { getDictionary } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';
import { findPatent, patents } from '@/content/patents';

const dict = getDictionary('ar');

export function generateStaticParams() {
  return patents.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: { params: { slug: string } }): Promise<Metadata> {
  const patent = findPatent(params.slug);
  if (!patent) return {};
  return buildMetadata({
    title: patent.title_ar,
    description: patent.abstract_ar[0]?.slice(0, 160) ?? patent.title_ar,
    path: `/ar/patents/${patent.slug}`,
    locale: 'ar',
    ogType: 'article',
  });
}

export default function Page({ params }: { params: { slug: string } }) {
  const patent = findPatent(params.slug);
  if (!patent) notFound();
  return <PatentDetailPage locale="ar" dict={dict} patent={patent} />;
}
