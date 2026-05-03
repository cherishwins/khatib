import type { MetadataRoute } from 'next';
import { brand } from '@/lib/tokens';
import { patents } from '@/content/patents';

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${brand.domain}`;

const STATIC_PATHS = [
  '/',
  '/about',
  '/services',
  '/services/structural',
  '/services/geotechnical',
  '/services/forensic',
  '/patents',
  '/publications',
  '/editorial',
  '/teaching',
  '/speaking',
  '/contact',
  '/legal/privacy',
  '/legal/terms',
  '/legal/imprint',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const path of STATIC_PATHS) {
    const enUrl = `${SITE}${path}`;
    const arPath = path === '/' ? '/ar' : `/ar${path}`;
    const arUrl = `${SITE}${arPath}`;
    const alternates = {
      languages: { en: enUrl, ar: arUrl, 'x-default': enUrl },
    };
    entries.push({ url: enUrl, lastModified: now, alternates });
    entries.push({ url: arUrl, lastModified: now, alternates });
  }

  for (const p of patents) {
    const en = `${SITE}/patents/${p.slug}`;
    const ar = `${SITE}/ar/patents/${p.slug}`;
    const alternates = { languages: { en, ar, 'x-default': en } };
    entries.push({ url: en, lastModified: now, alternates });
    entries.push({ url: ar, lastModified: now, alternates });
  }

  return entries;
}
