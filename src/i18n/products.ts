// Copy for the add-on product pages (/products/...), one JSON file per language with the same structure.
import type { Lang } from './content';
import type { ProductId } from '../builder/addons';
import type { CategoryId } from '../builder/catalog';
import ar from './products/ar.json';
import en from './products/en.json';
import de from './products/de.json';
import fr from './products/fr.json';
import ru from './products/ru.json';

export type ProductsDict = typeof en;
export const productsText: Record<Lang, ProductsDict> = { ar, en, de, fr, ru };

/** URL slug of each product page, chosen for the words people search on Google. */
export const productSlugs: Record<ProductId, string> = {
  booking: 'booking-system',
  menu: 'digital-menu-qr',
  reviews: 'google-reviews',
  chat: 'ai-chatbot',
  content: 'social-media-content',
  tickets: 'event-tickets',
  seo: 'google-seo',
};
export const productPath = (id: ProductId) => `/products/${productSlugs[id]}/`;

/** Business types each product suits, linked to the matching designs in the gallery. */
export const productFor: Record<ProductId, CategoryId[]> = {
  booking: ['clinic', 'dental', 'beauty', 'barber', 'fitness', 'cars', 'cleaning', 'law'],
  menu: ['restaurant', 'cafe', 'bakery', 'hotel'],
  reviews: ['restaurant', 'cafe', 'clinic', 'dental', 'beauty', 'barber', 'cars', 'hotel'],
  chat: ['store', 'realestate', 'clinic', 'education', 'hotel', 'tech', 'perfume', 'cars'],
  content: ['store', 'perfume', 'restaurant', 'cafe', 'beauty', 'fitness', 'florist', 'agency'],
  tickets: ['events', 'venue', 'education', 'charity', 'fitness'],
  seo: ['clinic', 'dental', 'beauty', 'realestate', 'law', 'cleaning', 'cars', 'restaurant'],
};
