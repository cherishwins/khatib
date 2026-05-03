// Font bytes for Satori (ImageResponse). Read once at module load.
// Bundled in public/fonts/ so icons are deterministic at build time — no network.

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const FONT_DIR = join(process.cwd(), 'public/fonts');

export const cormorantBold = readFileSync(join(FONT_DIR, 'CormorantGaramond-Bold.ttf'));
export const plexMonoRegular = readFileSync(join(FONT_DIR, 'IBMPlexMono-Regular.ttf'));
export const plexArabicBold = readFileSync(join(FONT_DIR, 'IBMPlexSansArabic-Bold.ttf'));
