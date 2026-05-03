// Parse the v3 brand-kit publications-page.html and emit a typed TS module.
// Run once when the source HTML changes.
//   node scripts/extract-publications.mjs <input.html> <output.ts>

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const inputArg = process.argv[2] ?? '../extracted/mkhatib/publications-page.html';
const outputArg = process.argv[3] ?? './content/publications.ts';

const html = readFileSync(resolve(inputArg), 'utf8');

// Decode common HTML entities inside extracted text fragments.
function decode(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&nbsp;/g, ' ')
    .replace(/&hellip;/g, '…')
    .replace(/&rsquo;/g, '’')
    .replace(/&lsquo;/g, '‘')
    .trim();
}

const articleRe = /<article class="pub( is-book)?"[\s\S]*?<\/article>/g;
const matches = [...html.matchAll(articleRe)].map((m) => m[0]);
console.error(`found ${matches.length} <article> blocks`);

const publications = matches.map((block) => {
  const year = Number(/data-year="(\d+)"/.exec(block)?.[1] ?? 0);
  const type = /data-type="([^"]+)"/.exec(block)?.[1] ?? 'journal';
  const topics = (/data-topics="([^"]+)"/.exec(block)?.[1] ?? '').split(/\s+/).filter(Boolean);
  const num = Number(/<div class="pub-num">(\d+)<\/div>/.exec(block)?.[1] ?? 0);
  const title = decode(/<h3 class="pub-title">([\s\S]*?)<\/h3>/.exec(block)?.[1] ?? '');
  const venue = decode(/<div class="pub-venue">([\s\S]*?)<\/div>/.exec(block)?.[1] ?? '');
  const doiAttr = /<a class="doi[^"]*"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/.exec(block);
  let doi;
  let externalUrl;
  let externalLabel;
  if (doiAttr) {
    const url = doiAttr[1];
    const labelText = decode(doiAttr[2].replace(/<[^>]+>/g, ''));
    if (url.includes('doi.org/')) {
      doi = url.split('doi.org/')[1];
    } else {
      externalUrl = url;
      externalLabel = labelText.replace(/\s*→\s*$/, '').trim();
    }
  }
  const isBook = /class="pub is-book"/.test(block);
  return { num, year, type, topics, title, venue, doi, externalUrl, externalLabel, isBook };
});

publications.sort((a, b) => a.num - b.num);

const banner = `// AUTO-GENERATED from extracted/mkhatib/publications-page.html\n// 52 verbatim entries — do not edit by hand. Regenerate via npm run extract:publications.\n`;

const body =
  banner +
  `import type { PublicationItemData } from '@/components/khatib/PublicationItem';\n\n` +
  `export const publications: PublicationItemData[] = ${JSON.stringify(publications, null, 2)};\n\n` +
  `export const totalCount = ${publications.length};\n`;

writeFileSync(resolve(outputArg), body);
console.error(`wrote ${publications.length} publications → ${outputArg}`);
