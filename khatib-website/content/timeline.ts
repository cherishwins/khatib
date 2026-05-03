// Civilian career timeline. CV-traceable. Starts at 1998 — no entries pre-1998.
export interface TimelineEntry {
  year: string;
  role_en: string;
  role_ar: string;
  institution: string;
  description_en?: string;
  description_ar?: string;
}

export const timeline: TimelineEntry[] = [
  {
    year: '1998',
    role_en: 'Bachelor, Civil Engineering',
    role_ar: 'بكالوريوس في الهندسة المدنية',
    institution: 'Beirut Arab University',
  },
  {
    year: '2005',
    role_en: 'Master, Civil Engineering',
    role_ar: 'ماجستير في الهندسة المدنية',
    institution: 'Beirut Arab University',
  },
  {
    year: '2018',
    role_en: 'PhD, Structural & Geotechnical Engineering',
    role_ar: 'دكتوراه في الهندسة الإنشائية والجيوتقنية',
    institution: 'Beirut Arab University',
  },
  {
    year: '2020 →',
    role_en: 'Research Supervisor',
    role_ar: 'مشرف أبحاث',
    institution: 'ISSAE-Cnam Liban',
  },
  {
    year: '2021–2022',
    role_en: 'Theory of Structures · Construction Management',
    role_ar: 'نظرية المنشآت · إدارة الإنشاءات',
    institution: 'University of Balamand',
  },
  {
    year: '2022 →',
    role_en: 'Research Supervisor',
    role_ar: 'مشرف أبحاث',
    institution: 'University of Balamand',
  },
  {
    year: '2023 →',
    role_en: 'Geotechnical · Drainage & Irrigation · Construction Technology',
    role_ar: 'هندسة جيوتقنية · صرف وريّ · تكنولوجيا البناء',
    institution: 'Lebanese International University',
  },
  {
    year: 'current',
    role_en: 'MBA Candidate',
    role_ar: 'مرشّح لماجستير إدارة الأعمال',
    institution: 'American University of Science and Technology (AUST)',
    description_en: 'Expected end of current semester',
    description_ar: 'متوقَّع في نهاية الفصل الجاري',
  },
];
