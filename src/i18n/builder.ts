// Copy for the website builder (Oxira Studio), one JSON file per language with the same structure.
import type { Lang } from './content';
import ar from './builder/ar.json';
import en from './builder/en.json';
import de from './builder/de.json';
import fr from './builder/fr.json';
import ru from './builder/ru.json';

export type BuilderDict = typeof en;
export const builderText: Record<Lang, BuilderDict> = { ar, en, de, fr, ru };

/**
 * Packages in SAR, before 15% VAT. Edit here and the service page, studio and order total update.
 * Keep in sync with the "Calculate amount" node in the n8n workflow "Oxira 7 — Website Builder Payments".
 */
export const plans = {
  starter: { price: 1499, domainIncluded: false },
  pro: { price: 2499, domainIncluded: true },
  business: { price: 4999, domainIncluded: true },
} as const;
export type PlanId = keyof typeof plans;
export const planIds = Object.keys(plans) as PlanId[];
/** Extra yearly domain for the Starter plan, and renewals from the second year. */
export const domainPrice = 99;
export const renewals = { hosting: 399, domain: 99 };
