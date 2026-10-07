// Copy for the help center (/help/) and the trust page (/trust/), one JSON file per language.
import type { Lang } from './content';
import har from './help/ar.json';
import hen from './help/en.json';
import hde from './help/de.json';
import hfr from './help/fr.json';
import hru from './help/ru.json';
import tar from './trust/ar.json';
import ten from './trust/en.json';
import tde from './trust/de.json';
import tfr from './trust/fr.json';
import tru from './trust/ru.json';

export type HelpDict = typeof hen;
export type TrustDict = typeof ten;
export const helpText: Record<Lang, HelpDict> = { ar: har, en: hen, de: hde, fr: hfr, ru: hru };
export const trustText: Record<Lang, TrustDict> = { ar: tar, en: ten, de: tde, fr: tfr, ru: tru };
