// Terms of service and refund policy, one JSON file per language with the same structure.
import type { Lang } from './content';
import ar from './terms/ar.json';
import en from './terms/en.json';
import de from './terms/de.json';
import fr from './terms/fr.json';
import ru from './terms/ru.json';

export type TermsDoc = typeof en;
export const terms: Record<Lang, TermsDoc> = { ar, en, de, fr, ru } as Record<Lang, TermsDoc>;
