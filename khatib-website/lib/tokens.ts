// Brand tokens — single source of truth, mirrors brand-dna.yaml
// Do not introduce values not in the v3 brand kit.

export const colors = {
  // Primary — Deep Navy
  deepNavy: '#0A0E17',
  navy: '#0F1A2E',
  midnight: '#1A2640',
  // Secondary — Gold (innovation accent; max 3 uses per page)
  gold: '#C8A44E',
  goldLight: '#D4B76A',
  goldDark: '#A68A3E',
  // Tertiary — Heritage Green (Arabic-first, sustainability)
  heritageGreen: '#1A4D2E',
  greenLight: '#2A6B40',
  greenDark: '#0F3A1F',
  // Tertiary — Blueprint Blue (technical / diagrammatic)
  blueprintBlue: '#2E5E8B',
  blueprintLight: '#5A8AB8',
  blueprintDark: '#1F4567',
  // Neutrals
  cream: '#F5F1E8',
  warmGray: '#9A9589',
  stone: '#5A5651',
  white: '#FFFFFF',
} as const;

export const brand = {
  nameEn: 'Dr. Milad Khatib · Civil Engineering Consultancy',
  nameAr: 'د. ميلاد الخطيب · الاستشارات الهندسية المدنية',
  shortNameEn: 'Dr. Milad Khatib',
  shortNameAr: 'د. ميلاد الخطيب',
  taglineEn: 'Engineering by proof.',
  taglineAr: 'الهندسة بالبرهان.',
  domain: 'miladkhatib.com',
  email: 'milad@miladkhatib.com',
  // CV lists +961 3 927 934, but RECONCILIATION-NOTES.md flags it as
  // "Worth a quick confirm before publishing on a public site." Until the
  // WhatsApp confirmation arrives, we render a "Pending" indicator instead
  // of the number. Swap to the confirmed value when it arrives.
  phoneConfirmed: false as const,
  phoneCandidate: '+961 3 927 934',
  city: 'Beirut',
  country: 'Lebanon',
  oeaSince: '1999-01',
  careerStart: 1998,
} as const;

export const profiles = {
  orcid: '0000-0002-0140-0941',
  scopus: '57202890131',
  googleScholar: 'rZQRkikAAAAJ',
  researchgate: 'Milad-Khatib',
  publons: '3464477/milad-khatib',
  sciprofiles: '1156816',
  spscCode: '00014774',
  amazonBook: 'https://www.amazon.in/-/hi/M-S-Khatib-ebook/dp/B0FZ5XV829',
} as const;

export type Locale = 'en' | 'ar';
export const LOCALES: Locale[] = ['en', 'ar'];
export const DEFAULT_LOCALE: Locale = 'en';
