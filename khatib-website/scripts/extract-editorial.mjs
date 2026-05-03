// Extract editorial / reviewer roles from the v3 brand-kit editorial-roles.html.
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const inputArg = process.argv[2] ?? '../extracted/mkhatib/editorial-roles.html';
const outputArg = process.argv[3] ?? './content/editorial-roles.ts';
const html = readFileSync(resolve(inputArg), 'utf8');

function decode(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .trim();
}

const sectionRe = /<section class="region-section">([\s\S]*?)<\/section>/g;
const sections = [...html.matchAll(sectionRe)].map((m) => m[1]);

const groups = sections.map((section) => {
  const region = decode(/<h2 class="region-name">([\s\S]*?)<\/h2>/.exec(section)?.[1] ?? '');
  // Roles are flat (no nested div). Match each <div class="role"> by capturing
  // up to and including its </a> tag, with optional trailing whitespace.
  const roles = [...section.matchAll(/<div class="role">([\s\S]*?)<\/a>/g)].map((rm) => {
    const block = rm[1];
    const role = decode(/<div class="role-mono">([\s\S]*?)<\/div>/.exec(block)?.[1] ?? '');
    const name = decode(/<div class="role-name">([\s\S]*?)<\/div>/.exec(block)?.[1] ?? '');
    const publisher = decode(
      /<div class="role-publisher">([\s\S]*?)<\/div>/.exec(block)?.[1] ?? '',
    );
    const link = /<a class="role-link" href="([^"]+)"/.exec(rm[0])?.[1];
    return { role, name, publisher, link };
  });
  return { region, roles };
});

const total = groups.reduce((acc, g) => acc + g.roles.length, 0);
console.error(`found ${groups.length} regions, ${total} roles`);

const banner = `// AUTO-GENERATED from extracted/mkhatib/editorial-roles.html\n`;
const body =
  banner +
  `export interface EditorialRole {\n  role: string;\n  name: string;\n  publisher: string;\n  link?: string;\n}\n` +
  `export interface EditorialGroup {\n  region: string;\n  roles: EditorialRole[];\n}\n\n` +
  `export const editorialGroups: EditorialGroup[] = ${JSON.stringify(groups, null, 2)};\n` +
  `export const editorialTotal = ${total};\n`;

writeFileSync(resolve(outputArg), body);
console.error(`wrote → ${outputArg}`);
