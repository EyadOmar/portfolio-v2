export type Project = {
  id: string;
  name: string;
  descriptionEn: string;
  descriptionAr: string;
  skills: string[];
};

const PROJECTS: Project[] = [
  {
    id: 'pr-01',
    name: 'Concept IMD',
    descriptionEn:
      'A bilingual real estate platform built for Concept IMD to showcase projects, areas, developers, and property-related content. The project focuses on Arabic-English localization, RTL support, SEO-friendly pages, dynamic content management, maps, project filtering, and a modern real estate user experience.',
    descriptionAr:
      'منصة عقارية ثنائية اللغة تم تطويرها لصالح Concept IMD لعرض المشاريع والمناطق والمطورين والمحتوى العقاري. يركز المشروع على دعم العربية والإنجليزية، واتجاه RTL، وتحسين محركات البحث، وإدارة المحتوى الديناميكي، والخرائط، وفلاتر المشاريع، وتجربة مستخدم حديثة في مجال العقارات.',
    skills: ['sk-01', 'sk-02', 'sk-04', 'sk-08', 'sk-06'],
  },
  {
    id: 'pr-02',
    name: 'GamezCards',
    descriptionEn:
      'A digital gift cards e-commerce platform offering gaming cards and digital products with a smooth shopping experience, product browsing, cart flow, secure checkout, competitive pricing, and fast automated delivery of digital codes.',
    descriptionAr:
      'منصة تجارة إلكترونية لبطاقات الهدايا الرقمية ومنتجات الألعاب، توفر تجربة شراء سلسة تشمل تصفح المنتجات، السلة، الدفع الآمن، أسعار تنافسية، وتسليم سريع وتلقائي للأكواد الرقمية.',
    skills: ['sk-01', 'sk-02'],
  },
  {
    id: 'pr-03',
    name: 'ElMadrasah.com',
    descriptionEn:
      'An educational platform focused on international exam preparation and online learning. My work included Shopify theme development, bilingual Arabic-English interface improvements, Liquid customization, SEO enhancements, structured data, blog improvements, and analytics-related integrations.',
    descriptionAr:
      'منصة تعليمية متخصصة في التحضير للاختبارات الدولية والتعلم عبر الإنترنت. شمل عملي تطوير قالب Shopify، تحسين الواجهة ثنائية اللغة بالعربية والإنجليزية، تخصيص Liquid، تحسينات SEO، إضافة البيانات المنظمة، تحسين المدونة، والمساهمة في تكاملات التحليلات.',
    skills: ['sk-01', 'sk-03', 'sk-07', 'sk-11'],
  },
];

export default PROJECTS;
