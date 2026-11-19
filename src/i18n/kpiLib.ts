// Ready-made KPI library for Oxira KPI: common job families with suggested indicators.
// Targets are left for the company to set (they differ by business); weights are a starting point that sums to 100.
export type LibKpi = { ar: string; en: string; unitAr: string; unitEn: string; dir: 'up' | 'down'; weight: number };
export type LibFamily = { key: string; ar: string; en: string; kpis: LibKpi[] };

const k = (ar: string, en: string, unitAr: string, unitEn: string, dir: 'up' | 'down', weight: number): LibKpi => ({ ar, en, unitAr, unitEn, dir, weight });

export const kpiLibrary: LibFamily[] = [
  { key: 'sales', ar: 'المبيعات', en: 'Sales', kpis: [
    k('قيمة المبيعات المحققة', 'Sales value achieved', 'ر.س', 'SAR', 'up', 40),
    k('عدد العملاء الجدد', 'New customers', 'عميل', 'customers', 'up', 20),
    k('نسبة تحويل العروض إلى صفقات', 'Quote-to-deal conversion', '%', '%', 'up', 15),
    k('نسبة التحصيل من المبيعات', 'Collection rate on sales', '%', '%', 'up', 15),
    k('نسبة المرتجعات', 'Returns rate', '%', '%', 'down', 10),
  ] },
  { key: 'service', ar: 'خدمة العملاء', en: 'Customer service', kpis: [
    k('رضا العملاء (CSAT)', 'Customer satisfaction (CSAT)', '%', '%', 'up', 30),
    k('متوسط زمن الرد الأول', 'Average first response time', 'دقيقة', 'min', 'down', 20),
    k('نسبة الحل من أول تواصل', 'First contact resolution', '%', '%', 'up', 20),
    k('عدد الطلبات المغلقة', 'Tickets resolved', 'طلب', 'tickets', 'up', 20),
    k('الشكاوى المتصاعدة', 'Escalated complaints', 'شكوى', 'complaints', 'down', 10),
  ] },
  { key: 'marketing', ar: 'التسويق', en: 'Marketing', kpis: [
    k('عدد العملاء المحتملين المؤهلين', 'Qualified leads', 'عميل محتمل', 'leads', 'up', 30),
    k('تكلفة العميل المحتمل', 'Cost per lead', 'ر.س', 'SAR', 'down', 20),
    k('العائد على الإنفاق الإعلاني', 'Return on ad spend', 'ضعف', 'x', 'up', 20),
    k('نمو زيارات الموقع', 'Website traffic growth', '%', '%', 'up', 15),
    k('الالتزام بخطة المحتوى', 'Content plan delivery', '%', '%', 'up', 15),
  ] },
  { key: 'hr', ar: 'الموارد البشرية', en: 'Human resources', kpis: [
    k('مدة شغل الوظيفة الشاغرة', 'Time to fill a vacancy', 'يوم', 'days', 'down', 25),
    k('معدل دوران الموظفين', 'Employee turnover', '%', '%', 'down', 25),
    k('ساعات التدريب لكل موظف', 'Training hours per employee', 'ساعة', 'hours', 'up', 15),
    k('إنجاز التقييمات في موعدها', 'Reviews completed on time', '%', '%', 'up', 20),
    k('دقة مسير الرواتب', 'Payroll accuracy', '%', '%', 'up', 15),
  ] },
  { key: 'finance', ar: 'المالية والمحاسبة', en: 'Finance and accounting', kpis: [
    k('إقفال الحسابات الشهرية في موعدها', 'Month-end close on time', '%', '%', 'up', 25),
    k('متوسط أيام التحصيل', 'Days sales outstanding', 'يوم', 'days', 'down', 25),
    k('دقة القيود والتقارير', 'Accuracy of entries and reports', '%', '%', 'up', 20),
    k('سداد الموردين في موعده', 'Supplier payments on time', '%', '%', 'up', 15),
    k('ملاحظات المراجعة', 'Audit findings', 'ملاحظة', 'findings', 'down', 15),
  ] },
  { key: 'operations', ar: 'العمليات والتشغيل', en: 'Operations', kpis: [
    k('الالتزام بمواعيد التسليم', 'On-time delivery', '%', '%', 'up', 30),
    k('الإنتاجية مقابل الخطة', 'Productivity vs plan', '%', '%', 'up', 25),
    k('نسبة الأخطاء أو الهدر', 'Error or waste rate', '%', '%', 'down', 20),
    k('حوادث السلامة', 'Safety incidents', 'حادثة', 'incidents', 'down', 15),
    k('الالتزام بالإجراءات', 'Process compliance', '%', '%', 'up', 10),
  ] },
  { key: 'it', ar: 'تقنية المعلومات', en: 'IT', kpis: [
    k('توفر الأنظمة', 'System uptime', '%', '%', 'up', 30),
    k('متوسط زمن حل البلاغات', 'Mean time to resolve tickets', 'ساعة', 'hours', 'down', 25),
    k('البلاغات المحلولة ضمن اتفاقية الخدمة', 'Tickets resolved within SLA', '%', '%', 'up', 20),
    k('إنجاز المشاريع في موعدها', 'Projects delivered on time', '%', '%', 'up', 15),
    k('الحوادث الأمنية', 'Security incidents', 'حادثة', 'incidents', 'down', 10),
  ] },
  { key: 'procurement', ar: 'المشتريات والمخازن', en: 'Procurement and warehouse', kpis: [
    k('الوفر في تكلفة الشراء', 'Purchase cost savings', '%', '%', 'up', 25),
    k('مدة تنفيذ طلب الشراء', 'Purchase order cycle time', 'يوم', 'days', 'down', 25),
    k('دقة المخزون', 'Inventory accuracy', '%', '%', 'up', 20),
    k('الأصناف المنتهية أو التالفة', 'Expired or damaged stock', 'ر.س', 'SAR', 'down', 15),
    k('تقييم أداء الموردين', 'Supplier performance score', '%', '%', 'up', 15),
  ] },
  { key: 'admin', ar: 'الشؤون الإدارية والسكرتارية', en: 'Administration', kpis: [
    k('إنجاز المهام في موعدها', 'Tasks completed on time', '%', '%', 'up', 35),
    k('دقة المراسلات والتقارير', 'Accuracy of correspondence and reports', '%', '%', 'up', 25),
    k('زمن الرد على الطلبات الداخلية', 'Response time to internal requests', 'ساعة', 'hours', 'down', 20),
    k('رضا الإدارات الداخلية', 'Internal customer satisfaction', '%', '%', 'up', 20),
  ] },
  { key: 'teaching', ar: 'التعليم والتدريب', en: 'Teaching and training', kpis: [
    k('متوسط نتائج الطلاب', 'Average student results', '%', '%', 'up', 30),
    k('نسبة تحضير الدروس', 'Lesson preparation rate', '%', '%', 'up', 20),
    k('نتيجة الزيارة الصفية', 'Classroom visit score', '%', '%', 'up', 25),
    k('غياب المعلم', 'Teacher absence', 'يوم', 'days', 'down', 10),
    k('رضا أولياء الأمور', 'Parent satisfaction', '%', '%', 'up', 15),
  ] },
  { key: 'management', ar: 'الإدارة والقيادة', en: 'Management and leadership', kpis: [
    k('تحقيق أهداف القسم', 'Department goals achieved', '%', '%', 'up', 40),
    k('الالتزام بالميزانية', 'Budget adherence', '%', '%', 'up', 20),
    k('متوسط أداء الفريق', 'Team average performance', '%', '%', 'up', 20),
    k('استقرار الفريق (الاحتفاظ بالموظفين)', 'Team retention', '%', '%', 'up', 20),
  ] },
];
