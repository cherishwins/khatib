// Civilian-venue speaking record. Non-civilian-venue presentations excluded per v3 directive.
//
// Per the brand kit (RECONCILIATION-NOTES.md, working brief): the only entries
// confirmed-by-CV-civilian-side and explicitly named are:
//   - ACI 1st Lebanese speaker, 24 Hours of Concrete Knowledge
//   - ICCEIC 2024 keynote in China
//
// Additional entries are PENDING — Dr. Khatib was asked (via Jesse's working
// brief) for the actual talk titles, venues, and dates. They have not yet been
// supplied. Per the v3 honesty rule: missing facts surface as `<!-- pending -->`
// markers, not guesses. The two confirmed entries below are the entire public
// list until more arrive.
export interface Talk {
  date: string;
  title_en: string;
  title_ar: string;
  venue: string;
  country: string;
  link?: string;
}

export const talks: Talk[] = [
  {
    date: '2024',
    title_en: 'Engineering by proof — invited keynote',
    title_ar: 'الهندسة بالبرهان — كلمة رئيسية مدعوّة',
    venue: 'ICCEIC 2024 (International Conference on Civil Engineering, Innovation and Cooperation)',
    country: 'China',
  },
  {
    date: '2024',
    title_en: '24 Hours of Concrete Knowledge — first Lebanese speaker',
    title_ar: '٢٤ ساعة من المعرفة الخرسانية — أول متحدث لبناني',
    venue: 'American Concrete Institute (ACI) — global online programme',
    country: 'International',
  },
];

// PENDING: additional talk titles, venues, and dates from Dr. Khatib's CV's
// civilian sections. The page surfaces a "more entries pending" notice.
export const SPEAKING_PENDING_NOTE_EN =
  'Additional talk titles and venues are pending Dr. Khatib’s confirmation. Only entries explicitly cited in the brand kit are listed.';
export const SPEAKING_PENDING_NOTE_AR =
  'عناوين ومحاضرات إضافية بانتظار تأكيد د. الخطيب. لا تُدرَج هنا إلّا البنود المذكورة صراحةً في حزمة العلامة.';
