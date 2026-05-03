// Capability statement default copy — typed, separately reviewable.

import type { Locale, RepWork } from '@/lib/studio/sealed';

export const PRACTICE_INTRO: Record<Locale, string> = {
  en:
    'Dr. Milad Khatib is a Beirut-based civil engineering consultant, academic, and patent-holder. ' +
    'He holds a PhD in Structural and Geotechnical Engineering from Beirut Arab University (2018), is currently completing an MBA at the American University of Science and Technology, and holds assistant-professor and research-supervisor roles at the Lebanese International University, the University of Balamand, and ISSAE-Cnam Liban. ' +
    'His published record includes fifty-two peer-reviewed contributions across IWA, Springer, Elsevier, and Taylor & Francis, twenty-one editorial and reviewer positions at international journals, and a book published on Amazon. He has been an OEA Beirut member since 1999.',
  ar:
    'الدكتور ميلاد الخطيب مهندس استشاري وأكاديمي وصاحب براءتي اختراع، مقيم في بيروت. يحمل شهادة الدكتوراه في الهندسة الإنشائية والجيوتقنية من جامعة بيروت العربية (٢٠١٨)، ويستكمل حالياً شهادة الماجستير في إدارة الأعمال من الجامعة الأميركية للعلوم والتكنولوجيا. يشغل مناصب أستاذ مساعد ومشرف أبحاث في الجامعة اللبنانية الدولية وجامعة البلمند ومعهد العلوم التطبيقية والاقتصادية - الكنام لبنان. ' +
    'يشمل سجله العلمي اثنين وخمسين بحثاً منشوراً في دوريات دولية محكّمة، وواحداً وعشرين موقعاً في هيئات تحرير ومراجعة، وكتاباً منشوراً. وهو عضو في نقابة المهندسين في بيروت منذ ١٩٩٩.',
};

export const REP_WORK: Record<Locale, RepWork[]> = {
  en: [
    {
      title: 'Inverted-U shear-strength enhancement methodology',
      scope: 'Post-tensioned slab punching shear re-analysis using inverted-U reinforcement, validated experimentally and numerically.',
      methodology: 'Khatib (2020), Case Studies in Construction Materials. DOI 10.1016/j.cscm.2020.e00370',
      outcome: 'Methodology adopted in subsequent peer-reviewed work and consolidated in book on Amazon.',
    },
    {
      title: 'GIN-method curtain grouting envelope, Lebanese gravity dam',
      scope: 'Geotechnical re-analysis of dam foundation seepage under staged GIN-method injection at 8–12 MPa.',
      methodology: 'Khatib (2022), Water Practice & Technology 17(8): 1679–1691. DOI 10.2166/wpt.2022.083',
      outcome: '42% reduction in seepage flow validated against published methodology.',
    },
    {
      title: 'Monostrand anchorage re-validation',
      scope: 'Forensic re-analysis of monostrand anchorage slip in unbonded post-tension flat-slab systems.',
      methodology: 'Khatib (2024), Heliyon. DOI 10.1016/j.heliyon.2024.e28996',
      outcome: 'Defensible expert opinion methodology referenced in subsequent forensic engagements.',
    },
    {
      title: 'Insulated diaphragm-wall thermo-mechanical analysis',
      scope: 'PLAXIS 2D thermo-mechanical analysis of insulated diaphragm walls for urban excavation.',
      methodology: 'Khatib (2025), case study under preparation.',
      outcome: 'Site-specific Lebanese clay/limestone characterisation; informed signoff on urban project.',
    },
  ],
  ar: [
    {
      title: 'منهجية تعزيز مقاومة القص بالتسليح المعكوس على شكل U',
      scope: 'إعادة تحليل قص الانثقاب في البلاطات سابقة الإجهاد باستخدام التسليح المعكوس، بالتحقق التجريبي والعددي.',
      methodology: 'Khatib (2020)، Case Studies in Construction Materials. DOI 10.1016/j.cscm.2020.e00370',
      outcome: 'اعتُمدت المنهجية في أعمال محكّمة لاحقة وضُمّنت في كتاب منشور على أمازون.',
    },
    {
      title: 'حدود حقن الستار بطريقة GIN، سدّ ثقالي لبناني',
      scope: 'إعادة تحليل جيوتقني لتسرّب أساس السد تحت الحقن المتدرّج بطريقة GIN عند ٨–١٢ ميغاباسكال.',
      methodology: 'Khatib (2022), Water Practice & Technology 17(8): 1679–1691. DOI 10.2166/wpt.2022.083',
      outcome: 'تخفيض ٤٢٪ في تدفّق التسرّب بالتحقق من المنهجية المنشورة.',
    },
    {
      title: 'إعادة التحقّق من تثبيت السلسلة الأحادية',
      scope: 'إعادة تحليل قضائي لانزلاق تثبيت السلسلة الأحادية في أنظمة البلاطات سابقة الإجهاد غير المرتبطة.',
      methodology: 'Khatib (2024)، Heliyon. DOI 10.1016/j.heliyon.2024.e28996',
      outcome: 'منهجية رأي خبير قابلة للدفاع، مرجعية لمهمات قضائية لاحقة.',
    },
    {
      title: 'التحليل الحراري-الميكانيكي للجدار الحاجز المعزول',
      scope: 'تحليل حراري-ميكانيكي بـ PLAXIS 2D للجدران الحاجزة المعزولة لحفرية حضرية.',
      methodology: 'Khatib (2025)، دراسة حالة قيد الإعداد.',
      outcome: 'توصيف خاص بالموقع للتربة الطينية والحجر الجيري في لبنان؛ أسهم في توقيع المشروع.',
    },
  ],
};
