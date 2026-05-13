export type Experience = {
  id: string;
  periodEn: string;
  periodAr: string;
  roleEn: string;
  roleAr: string;
  companyEn: string;
  companyAr: string;
  summaryEn: string;
  summaryAr: string;
  skills: string[];
  current?: boolean;
};

const EXPERIENCE: Experience[] = [
  {
    id: 'ex-01',
    periodEn: 'Sep 2025 — Present',
    periodAr: 'سبتمبر 2025 — الآن',
    roleEn: 'Front End Developer',
    roleAr: 'مطور واجهات أمامية',
    companyEn: 'ElMadrasah.com',
    companyAr: 'ElMadrasah.com',
    summaryEn:
      'Maintain and enhance the Shopify storefront and a React Vite educational and admin dashboard, shipping bilingual UI work, performance improvements, and feature iterations across both surfaces.',
    summaryAr:
      'صيانة وتطوير متجر Shopify ولوحة تحكم تعليمية وإدارية مبنية بـ React Vite، مع تنفيذ تحسينات ثنائية اللغة وتطوير الأداء وتكرار الميزات على المنصتين.',
    skills: ['sk-01', 'sk-03', 'sk-07', 'sk-05', 'sk-11', 'sk-12'],
    current: true,
  },
  {
    id: 'ex-02',
    periodEn: 'Dec 2023 — Sep 2025',
    periodAr: 'ديسمبر 2023 — سبتمبر 2025',
    roleEn: 'Full-Stack Software Engineer',
    roleAr: 'مهندس برمجيات Full-Stack',
    companyEn: 'LinkYou',
    companyAr: 'LinkYou',
    summaryEn:
      'Built front-end applications, designed and shipped RESTful APIs, modeled databases, and architected systems end-to-end while leading the website development team through delivery and code review.',
    summaryAr:
      'بناء تطبيقات الواجهة الأمامية، وتصميم وتنفيذ واجهات RESTful، ونمذجة قواعد البيانات، وتصميم البنية الكاملة للأنظمة، إلى جانب قيادة فريق تطوير الموقع خلال التنفيذ ومراجعة الكود.',
    skills: [
      'sk-01',
      'sk-02',
      'sk-04',
      'sk-08',
      'sk-09',
      'sk-10',
      'sk-05',
      'sk-12',
    ],
  },
  {
    id: 'ex-03',
    periodEn: 'Sep 2023 — Feb 2025',
    periodAr: 'سبتمبر 2023 — فبراير 2025',
    roleEn: 'Teaching Assistant',
    roleAr: 'معيد',
    companyEn: 'MTI University',
    companyAr: 'جامعة الحديثة للتكنولوجيا والمعلومات',
    summaryEn:
      'Taught technical courses in the Computer Science department and supervised undergraduate students and graduation projects — sharpening leadership, presentation, communication, and planning along the way.',
    summaryAr:
      'تدريس مقررات تقنية في قسم علوم الحاسب والإشراف على الطلاب ومشاريع التخرج، مما طوّر مهارات القيادة والعرض والتواصل والتخطيط.',
    skills: [],
  },
];

export default EXPERIENCE;
