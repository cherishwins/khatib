// Civilian-only audit. Greps every project file for the disallowed regex defined
// in WEBSITE-PRODUCTION-BUILD-PROMPT.md. Exits non-zero on any match so CI blocks.
//
// Per Dr. Khatib's WhatsApp directive (2 May 2026): no military references,
// anywhere — page bodies, JSON, alt text, comments, file names, anywhere.

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';

const ROOT = process.cwd();
const SCAN_EXTS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.json', '.md', '.html', '.css']);
const SKIP_DIRS = new Set(['node_modules', '.next', '.git', 'out', 'extracted', 'public/icons-and-meta']);

// Match the regex documented in WEBSITE-PRODUCTION-BUILD-PROMPT.md. The "Beirut Port"
// alternation is included verbatim because the preserved-for-later optional asset
// references it; the audit catches accidental re-introduction. Use word boundaries
// where alternations could collide with civilian engineering vocabulary, and rely
// on case-insensitive matching for the rest.
const BANNED = new RegExp(
  [
    '\\bmilitary\\b',
    '\\bLAF\\b',
    '\\bArmed Forces\\b',
    '\\bBattalion\\b',
    '\\bValour\\b',
    '\\bAnti-Terror\\b',
    '\\bFelicitation\\b',
    '\\bCommendation\\b',
    '\\bInfantry\\b',
    '\\bPLA Shijiazhuang\\b',
    '\\bEngineering Directorate\\b',
    '\\bOffice of Military\\b',
    '\\bStrategic and Security\\b',
    '\\bBeirut Port\\b',
    '\\bpublic[- ]service[- ]record\\b',
    '\\bDisaster & Post-Event\\b',
  ].join('|'),
  'gi',
);

let matchCount = 0;
const matchReports = [];

function walk(dir) {
  const entries = readdirSync(dir);
  for (const name of entries) {
    if (SKIP_DIRS.has(name)) continue;
    const full = join(dir, name);
    let stat;
    try {
      stat = statSync(full);
    } catch {
      continue;
    }
    if (stat.isDirectory()) {
      walk(full);
      continue;
    }
    if (!SCAN_EXTS.has(extname(full))) continue;
    // Self-skip: this audit script names the disallowed terms. Likewise the
    // generated content modules are checked, but never the audit script itself.
    if (full.endsWith('scripts/audit-civilian.mjs')) continue;
    const text = readFileSync(full, 'utf8');
    let m;
    BANNED.lastIndex = 0;
    while ((m = BANNED.exec(text))) {
      const before = text.slice(0, m.index).split('\n');
      const line = before.length;
      const col = (before[before.length - 1] ?? '').length + 1;
      matchReports.push({ file: full.replace(`${ROOT}/`, ''), line, col, term: m[0] });
      matchCount++;
    }
  }
}

walk(ROOT);

if (matchCount > 0) {
  console.error(`\nCIVILIAN AUDIT FAILED — ${matchCount} match${matchCount === 1 ? '' : 'es'}.\n`);
  for (const r of matchReports.slice(0, 50)) {
    console.error(`  ${r.file}:${r.line}:${r.col}  →  ${r.term}`);
  }
  if (matchReports.length > 50) console.error(`  …and ${matchReports.length - 50} more`);
  console.error('\nSee CLAUDE.md / brand kit SKILL.md for the directive.\n');
  process.exit(1);
} else {
  console.log('CIVILIAN AUDIT PASSED — zero matches.');
}
