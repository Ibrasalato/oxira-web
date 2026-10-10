// Text for the local-currency hint under SAR prices (components/FxNote.astro). Shown only to visitors outside Saudi Arabia.
import type { Lang } from './content';

export const fxText: Record<Lang, { label: string; note: string }> = {
  ar: { label: 'عرض المبلغ التقريبي بـ', note: 'الدفع بالريال السعودي، والمبلغ المحوّل تقريبي.' },
  en: { label: 'Show approximate amounts in', note: 'Billed in SAR; converted amount is approximate.' },
  de: { label: 'Ungefähre Beträge in', note: 'Abrechnung in SAR; der umgerechnete Betrag ist ein Näherungswert.' },
  fr: { label: 'Montants approximatifs en', note: 'Facturé en SAR ; le montant converti est approximatif.' },
  ru: { label: 'Примерные суммы в', note: 'Оплата в саудовских риялах (SAR); пересчитанная сумма приблизительна.' },
};
