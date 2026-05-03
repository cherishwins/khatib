// Sealed-document audit log. Discriminated union by document kind so each studio
// stores exactly its draft shape and restore round-trips losslessly.

const SEALED_KEY = 'khatib-studio-sealed-v2';
const MAX_ENTRIES = 200;

export type Locale = 'en' | 'ar';

export interface RepWork {
  title: string;
  scope: string;
  methodology: string;
  outcome: string;
}

export interface LetterPayload {
  ref: string;
  date: string;
  re: string;
  salutation: string;
  body: string;
  signoff: string;
}

export interface CapabilityPayload {
  ref: string;
  date: string;
  issuedTo: string;
  engagementContext: string;
  practiceIntro: string;
  repWork: RepWork[];
  contactNote: string;
}

export type SealedDocument =
  | { kind: 'letter'; id: string; sealedAt: string; locale: Locale; payload: LetterPayload }
  | { kind: 'capability'; id: string; sealedAt: string; locale: Locale; payload: CapabilityPayload };

export type DocumentKind = SealedDocument['kind'];

function safeId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function loadSealed(): SealedDocument[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(SEALED_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw) as SealedDocument[];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function saveSealed(list: SealedDocument[]): void {
  try {
    localStorage.setItem(SEALED_KEY, JSON.stringify(list.slice(0, MAX_ENTRIES)));
  } catch {
    /* storage full — silently drop oldest */
  }
}

export function recordSealedLetter(locale: Locale, payload: LetterPayload): SealedDocument {
  const entry: SealedDocument = { kind: 'letter', id: safeId(), sealedAt: new Date().toISOString(), locale, payload };
  saveSealed([entry, ...loadSealed()]);
  return entry;
}

export function recordSealedCapability(locale: Locale, payload: CapabilityPayload): SealedDocument {
  const entry: SealedDocument = { kind: 'capability', id: safeId(), sealedAt: new Date().toISOString(), locale, payload };
  saveSealed([entry, ...loadSealed()]);
  return entry;
}

export function deleteSealed(id: string): SealedDocument[] {
  const next = loadSealed().filter((e) => e.id !== id);
  saveSealed(next);
  return next;
}

export function summarise(entry: SealedDocument): { ref: string; subject: string } {
  if (entry.kind === 'letter') {
    return { ref: entry.payload.ref, subject: entry.payload.re };
  }
  return {
    ref: entry.payload.ref,
    subject: entry.payload.issuedTo
      ? (entry.locale === 'ar' ? `بيان قدرات: ${entry.payload.issuedTo}` : `Capability Statement: ${entry.payload.issuedTo}`)
      : (entry.locale === 'ar' ? 'بيان قدرات' : 'Capability Statement'),
  };
}
