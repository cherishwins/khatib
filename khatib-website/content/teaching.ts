// Civilian-only teaching record. CV-traceable.
// Excluded entries from other contexts are filtered per the v3 directive.
export interface TeachingPost {
  institution: string;
  period: string;
  courses_en: string[];
  courses_ar: string[];
}

export const teaching: TeachingPost[] = [
  {
    institution: 'Lebanese International University',
    period: '2023 → present',
    courses_en: [
      'Geotechnical Engineering (Master)',
      'Drainage and Irrigation (Master)',
      'Technology of Construction (Master)',
    ],
    courses_ar: [
      'الهندسة الجيوتقنية (ماجستير)',
      'الصرف والريّ (ماجستير)',
      'تكنولوجيا البناء (ماجستير)',
    ],
  },
  {
    institution: 'University of Balamand',
    period: '2021 → present',
    courses_en: [
      'Theory of Structures (undergraduate, 2021–2022)',
      'Construction Management (undergraduate, 2021–2022)',
      'Research Supervision (current)',
    ],
    courses_ar: [
      'نظرية المنشآت (إجازة جامعية، 2021–2022)',
      'إدارة الإنشاءات (إجازة جامعية، 2021–2022)',
      'إشراف بحثي (حالياً)',
    ],
  },
  {
    institution: 'ISSAE-Cnam Liban',
    period: '2020 → present',
    courses_en: ['Research Supervision'],
    courses_ar: ['إشراف بحثي'],
  },
];
