// Letter templates — typed, version-controlled, separately reviewable.
// Adding a new template: append to LETTER_TEMPLATES; it auto-appears in the studio palette.

import type { Locale, LetterPayload } from '@/lib/studio/sealed';

export interface LetterTemplate {
  id: string;
  label: string;
  apply: (locale: Locale) => Pick<LetterPayload, 're' | 'salutation' | 'body' | 'signoff'>;
}

export const LETTER_TEMPLATES: LetterTemplate[] = [
  {
    id: 'blank',
    label: 'Blank letter',
    apply: () => ({ re: '', salutation: '', body: '', signoff: '' }),
  },
  {
    id: 'forensic',
    label: 'Forensic structural opinion',
    apply: (locale) =>
      locale === 'ar'
        ? {
            re: 'رأي فني إنشائي',
            salutation: 'حضرة المحامي الكريم،',
            body:
              'بعد المعاينة الميدانية بتاريخ [التاريخ] ومراجعة المخططات التنفيذية لنظام الإجهاد المسبق، تؤكد إعادة التحليل بالعناصر المنتهية لطبقات البلاطة [النطاق] نمط التشوّه الزاوي المرصود في بيانات المراقبة لمدة ٩٠ يوماً.\n\n' +
              'ثلاث ملاحظات جوهرية لإجرائكم. أولاً، نمط الإخفاق منسجم مع انزلاق تثبيت السلسلة الأحادية في أسلاك الحدود. ثانياً، تفصيلة التسليح المعكوس على شكل U المطلوبة في المواصفات الإنشائية الأصلية تبدو محذوفة في ثلاث من خطوط الشبكة المتأثرة. ثالثاً، متوسط مقاومة الأسطوانة الخرسانية في الموقع بلغ ٢٨٫٤ ميغاباسكال مقابل مواصفة ٣٥ ميغاباسكال.\n\n' +
              'يُحال إليكم تقرير فني كامل مع الحسابات والصور التوثيقية والعلاج المقترح تحت غلاف منفصل خلال عشرة أيام عمل. أبقى تحت تصرفكم للشهادة المحلَّفة باللغة الإنكليزية أو العربية، بناءً على ترتيب مسبق.',
            signoff: 'تفضّلوا بقبول فائق الاحترام.',
          }
        : {
            re: 'Forensic Structural Opinion',
            salutation: 'Dear Counsel,',
            body:
              'Following the site inspection of [DATE] and review of the original post-tension shop drawings, our finite-element re-analysis of slab levels [SCOPE] confirms the corner-deflection pattern reported in the [DATA SOURCE] 90-day monitoring data.\n\n' +
              "Three findings are material to your action. First, the failure mode is consistent with monostrand anchorage slip at the boundary tendons, a phenomenon I have characterised in peer-reviewed work (Heliyon, 2024). Second, the inverted-U reinforcement detail required by the original structural specification appears to have been omitted at three of the affected gridlines. Third, the in-place concrete cylinder strength averaged 28.4 MPa against a 35 MPa specification.\n\n" +
              'A full technical report, with calculations, photographs, and proposed remediation, will follow under separate cover within ten business days. I am available for deposition by prior arrangement and will testify in English or Arabic.',
            signoff: '',
          },
  },
  {
    id: 'proposal',
    label: 'Proposal — engagement scope',
    apply: (locale) =>
      locale === 'ar'
        ? {
            re: 'عرض — نطاق الخدمة',
            salutation: 'حضرة المهندس الكريم،',
            body:
              'أشكر لكم فرصة تقديم العرض على [المشروع]. نطاق العمل كما أفهمه يغطي [النطاق]، مع المخرجات التالية:\n\n' +
              '١. [المخرَج الأول]\n٢. [المخرَج الثاني]\n٣. [المخرَج الثالث]\n\n' +
              'تتبع المنهجية [المرجع / الكود]. الجدول الزمني المبدئي: [أسابيع]. سيُحال إليكم عرض تجاري رسمي مع جدول الأتعاب تحت غلاف منفصل.',
            signoff: 'تفضّلوا بقبول فائق الاحترام.',
          }
        : {
            re: 'Proposal — Engagement Scope',
            salutation: 'Dear Sir/Madam,',
            body:
              'Thank you for the opportunity to propose on [PROJECT]. The scope as I understand it covers [SCOPE], with deliverables as follows:\n\n' +
              '1. [DELIVERABLE 1]\n2. [DELIVERABLE 2]\n3. [DELIVERABLE 3]\n\n' +
              'Methodology will follow [REFERENCE / CODE]. Indicative timeline: [WEEKS]. A formal commercial proposal with fee schedule will follow under separate cover.',
            signoff: '',
          },
  },
  {
    id: 'patent',
    label: 'Patent licensing reply',
    apply: (locale) =>
      locale === 'ar'
        ? {
            re: 'استفسار ترخيص براءة اختراع',
            salutation: 'حضرة المهندس الكريم،',
            body:
              'أشكر لكم استفساركم بشأن ترخيص [عنوان البراءة]، المسجلة في لبنان ([السنة]).\n\n' +
              'تجري مناقشات الترخيص بموجب اتفاقية عدم التحايل وعدم الإفصاح (NCNDA). سأُحيل النموذج المعتاد تحت غلاف منفصل لمراجعة المستشار القانوني. عند التوقيع يمكننا تحديد جلسة فنية تغطي نطاق المطالب وبيانات التحقق.\n\n' +
              'في انتظار استكمال المحادثة.',
            signoff: 'تفضّلوا بقبول فائق الاحترام.',
          }
        : {
            re: 'Patent Licensing — Reply to Inquiry',
            salutation: 'Dear Counsel,',
            body:
              'Thank you for your inquiry regarding licensing of [PATENT TITLE], registered in Lebanon ([YEAR]).\n\n' +
              'Licensing discussions proceed under a Non-Circumvention / Non-Disclosure Agreement (NCNDA). I will send the standard NCNDA template under separate cover for your counsel to review. On execution we can schedule a technical session covering the claim envelope and validation data.\n\n' +
              'I look forward to the conversation.',
            signoff: '',
          },
  },
];
