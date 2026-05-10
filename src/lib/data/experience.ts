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
};

const EXPERIENCE: Experience[] = [
  {
    id: 'ex-01',
    periodEn: 'Current focus',
    periodAr: 'التركيز الحالي',
    roleEn: 'Full-Stack Software Engineer',
    roleAr: 'مهندس برمجيات Full-Stack',
    companyEn: 'Independent Projects',
    companyAr: 'مشاريع مستقلة',
    summaryEn:
      'Build production web and mobile products with a focus on multilingual interfaces, fast delivery, clean data flows, and maintainable full-stack architecture.',
    summaryAr:
      'بناء منتجات ويب وموبايل جاهزة للإنتاج مع التركيز على الواجهات متعددة اللغات، سرعة التسليم، وضوح تدفق البيانات، وبنية Full-Stack قابلة للصيانة.',
    skills: ['sk-01', 'sk-02', 'sk-04', 'sk-08', 'sk-09', 'sk-10'],
  },
  {
    id: 'ex-02',
    periodEn: 'Real estate platforms',
    periodAr: 'منصات عقارية',
    roleEn: 'Bilingual Platform Developer',
    roleAr: 'مطور منصات ثنائية اللغة',
    companyEn: 'Concept IMD',
    companyAr: 'Concept IMD',
    summaryEn:
      'Delivered a bilingual real estate experience with RTL support, SEO-focused pages, dynamic content, map-driven browsing, and project filtering.',
    summaryAr:
      'تنفيذ تجربة عقارية ثنائية اللغة بدعم RTL، وصفحات مهيأة لمحركات البحث، ومحتوى ديناميكي، وتصفح يعتمد على الخرائط، وفلاتر للمشاريع.',
    skills: ['sk-01', 'sk-02', 'sk-04', 'sk-08', 'sk-06'],
  },
  {
    id: 'ex-03',
    periodEn: 'Commerce systems',
    periodAr: 'أنظمة تجارة',
    roleEn: 'E-commerce Product Developer',
    roleAr: 'مطور منتجات تجارة إلكترونية',
    companyEn: 'GamezCards',
    companyAr: 'GamezCards',
    summaryEn:
      'Built e-commerce flows for digital products, including product browsing, cart behavior, checkout readiness, pricing presentation, and automated code delivery patterns.',
    summaryAr:
      'بناء تدفقات تجارة إلكترونية للمنتجات الرقمية تشمل تصفح المنتجات، سلوك السلة، جاهزية الدفع، عرض الأسعار، وأنماط التسليم الآلي للأكواد.',
    skills: ['sk-01', 'sk-02'],
  },
  {
    id: 'ex-04',
    periodEn: 'Shopify delivery',
    periodAr: 'تنفيذ Shopify',
    roleEn: 'Shopify Frontend Developer',
    roleAr: 'مطور واجهات Shopify',
    companyEn: 'ElMadrasah.com',
    companyAr: 'ElMadrasah.com',
    summaryEn:
      'Improved a bilingual education storefront through Shopify theme work, Liquid customization, SEO enhancements, structured data, blog improvements, and analytics integrations.',
    summaryAr:
      'تحسين واجهة تعليمية ثنائية اللغة من خلال تطوير قالب Shopify، تخصيص Liquid، تحسينات SEO، البيانات المنظمة، تحسين المدونة، وتكاملات التحليلات.',
    skills: ['sk-01', 'sk-03', 'sk-07', 'sk-11'],
  },
];

export default EXPERIENCE;
