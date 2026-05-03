// Both patents Lebanese-registered. Patent numbers pending client confirmation.
// Abstract / claim copy lifted verbatim from the v3 brand-kit case-study templates
// (extracted/mkhatib/patent-case-study.html and patent-case-study-2.html).
export interface Patent {
  slug: string;
  year: number;
  jurisdiction: string;
  title_en: string;
  title_ar: string;
  abstract_en: string[];
  abstract_ar: string[];
  claims_en: string[];
  claims_ar: string[];
  status_en: string;
  status_ar: string;
  inventors: string;
  registrationNumber: string; // pending — keep placeholder verbatim
  companion?: {
    citation_en: string;
    citation_ar: string;
    doi?: string;
    note_en?: string;
    note_ar?: string;
  };
}

export const patents: Patent[] = [
  {
    slug: 'economic-vessel-2023',
    year: 2023,
    jurisdiction: 'Lebanon',
    title_en: 'Economic Vessel for Solid-Waste Recovery in Waterways',
    title_ar: 'سفينة اقتصادية لتجميع النفايات الصلبة في الممرات المائية',
    abstract_en: [
      'A small, low-cost vessel designed to collect solid waste — plastics, organic debris, urban runoff — from rivers, lakes, and protected coastal waters. The system uses a passive collection grille combined with a buoyant skiff that can be deployed by a single operator from any accessible bank or jetty.',
      'Designed for Lebanese waterways where scale, budget, and accessibility constraints make industrial trash-skimmers impractical. Material specification favours locally-sourced marine-grade aluminium and HDPE. Co-inventor: Dr. Bassam Mahmoud.',
      'The underlying engineering is documented in a peer-reviewed book chapter at Springer: Khatib & Mahmoud, Lecture Notes in Civil Engineering, Vol. 366 (2023), Springer Singapore. DOI 10.1007/978-981-99-3737-0_11.',
    ],
    abstract_ar: [
      'سفينة صغيرة منخفضة التكلفة مصمَّمة لتجميع النفايات الصلبة — البلاستيك، الحطام العضوي، الجريان الحضري — من الأنهار والبحيرات والمياه الساحلية المحميّة. يستخدم النظام شبكة تجميع سلبية مع زورق طافٍ يمكن نشره بمشغّل واحد من أي ضفة أو رصيف.',
      'مصمَّمة للمجاري المائية اللبنانية حيث تجعل قيود الحجم والميزانية وإمكانية الوصول أجهزة كَشط القمامة الصناعية غير عملية. تفضّل مواصفة المواد الألمنيوم بدرجة بحرية وHDPE المتوفّرين محلياً. المخترع المشارك: د. بسّام محمود.',
      'الهندسة الكامنة موثَّقة في فصل كتاب محكّم لدى Springer: Khatib & Mahmoud, Lecture Notes in Civil Engineering, Vol. 366 (2023), Springer Singapore. DOI 10.1007/978-981-99-3737-0_11.',
    ],
    claims_en: [
      'A floating collection vessel with a removable grille assembly that captures floating debris while permitting water passage.',
      'A modular grille designed for tool-free replacement, allowing rapid changeover during operation.',
      'Buoyancy and trim configured for single-operator deployment from a fixed shore point.',
      'Local-material specification compatible with Lebanese supply chains and small-municipality budgets.',
    ],
    claims_ar: [
      'سفينة تجميع طافية مع شبكة قابلة للإزالة تلتقط الحطام الطافي مع السماح بمرور الماء.',
      'شبكة معيارية قابلة للاستبدال بدون أدوات، تتيح التبديل السريع أثناء التشغيل.',
      'الطفو والتعديل مهيّآن للنشر بمشغّل واحد من نقطة شاطئية ثابتة.',
      'مواصفة مواد محلية متوافقة مع سلاسل التوريد اللبنانية وميزانيات البلديات الصغيرة.',
    ],
    status_en: 'Registered · Lebanon · 2023',
    status_ar: 'مسجَّل · لبنان · 2023',
    inventors: 'Dr. Milad Khatib · Dr. Bassam Mahmoud',
    registrationNumber: '[ to be inserted ]', // pending Dr. Khatib's WhatsApp confirmation
    companion: {
      citation_en:
        'Khatib & Mahmoud (2023). Lecture Notes in Civil Engineering, Vol. 366. Springer Singapore.',
      citation_ar:
        'الخطيب ومحمود (2023). Lecture Notes in Civil Engineering، المجلّد 366. Springer Singapore.',
      doi: '10.1007/978-981-99-3737-0_11',
    },
  },
  {
    slug: 'food-particle-2025',
    year: 2025,
    jurisdiction: 'Lebanon',
    title_en: 'Food-Particle Collection Device for Post-Eating Hygiene',
    title_ar: 'جهاز تجميع جزيئات الطعام والسوائل من الفم بعد الأكل',
    abstract_en: [
      'A small personal-hygiene device for collecting food particles and liquid spills — milk, food remnants, seed shells — from the mouth after eating. Designed as a domestic and clinical-care product, with applications in both general hygiene and assisted-living contexts where conventional post-meal cleaning is impractical or insufficient.',
      'The device occupies a small market gap between disposable wipes and dental-hygiene equipment, offering a reusable single-use-cartridge approach designed for cost-conscious manufacture in regional supply chains. Sole inventor.',
    ],
    abstract_ar: [
      'جهاز شخصي صغير للنظافة، يجمع جزيئات الطعام والسوائل المنسكبة — الحليب، بقايا الطعام، قشور البذور — من الفم بعد الأكل. مصمَّم كمنتج للاستخدام المنزلي والرعاية السريرية، بتطبيقات في النظافة العامة وسياقات الرعاية المساعدة حيث يكون التنظيف التقليدي بعد الوجبات غير عملي أو غير كافٍ.',
      'يشغل الجهاز فجوة سوقية صغيرة بين المناديل القابلة للاستخدام مرّة واحدة وأدوات نظافة الأسنان، ويقدّم نهج خرطوشة استخدام واحد قابل لإعادة الاستعمال، مصمَّم للتصنيع المنخفض التكلفة في سلاسل التوريد الإقليمية. المخترع المنفرد.',
    ],
    claims_en: [
      'A handheld personal-care device for the collection of solid and liquid post-meal residues from the oral cavity.',
      'A modular collection chamber designed for single-use replacement, allowing rapid changeover without device disassembly.',
      'An ergonomic form factor configured for use by both able-bodied and assisted users.',
      'A material specification compatible with regional manufacture and cleaning protocols.',
    ],
    claims_ar: [
      'جهاز عناية شخصية محمول لتجميع البقايا الصلبة والسائلة بعد الوجبات من تجويف الفم.',
      'حجرة تجميع معيارية مصمَّمة للاستبدال بعد الاستخدام الواحد، تتيح التبديل السريع بدون تفكيك الجهاز.',
      'شكل مريح للاستخدام مهيّأ لكلٍّ من المستخدمين الأصحّاء والمستخدمين الذين يحتاجون مساعدة.',
      'مواصفة مواد متوافقة مع التصنيع وبروتوكولات التنظيف الإقليمية.',
    ],
    status_en: 'Registered · Lebanon · 2025',
    status_ar: 'مسجَّل · لبنان · 2025',
    inventors: 'Dr. Milad Khatib',
    registrationNumber: '[ to be inserted ]', // pending Dr. Khatib's WhatsApp confirmation
    companion: {
      citation_en: 'Companion publication forthcoming or under preparation.',
      citation_ar: 'منشور علمي مرافق قيد الإعداد.',
      note_en: 'Pending — citation will be added on publication.',
      note_ar: 'قيد الإعداد — سيُضاف الاقتباس عند النشر.',
    },
  },
];

export function findPatent(slug: string): Patent | undefined {
  return patents.find((p) => p.slug === slug);
}
