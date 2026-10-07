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
 * Builder prices in SAR, before 15% VAT. Edit here and the service page, studio and order total update.
 * kind: one-time | year | month. "site" is always included.
 */
export const builderPrices = {
  site: { price: 1499, kind: 'one-time' },
  hosting: { price: 399, kind: 'year' },
  domain: { price: 99, kind: 'year' },
  support: { price: 149, kind: 'month' },
  logo: { price: 499, kind: 'one-time' },
} as const;
export type PackageId = keyof typeof builderPrices;
export const packageIds = Object.keys(builderPrices) as PackageId[];
