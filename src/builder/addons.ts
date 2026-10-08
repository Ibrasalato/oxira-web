// Monthly add-ons for published websites. Prices in SAR before VAT.
// Keep in sync with the "Account" node in n8n workflow "Oxira 13 — Client account (portal)".
export const addonIds = ['booking', 'menu', 'reviews', 'chat', 'content', 'tickets', 'seo', 'seogrowth', 'social', 'socialpro', 'ads'] as const;
export type AddonId = (typeof addonIds)[number];

export const addonPrices: Record<AddonId, { price: number; feePercent?: number }> = {
  booking: { price: 99 },
  menu: { price: 49 },
  reviews: { price: 79 },
  chat: { price: 199 },
  content: { price: 499 },
  tickets: { price: 0, feePercent: 5 },
  seo: { price: 299 },
  seogrowth: { price: 799 },
  social: { price: 699 },
  socialpro: { price: 1499 },
  ads: { price: 999 },
};

/** Add-ons with their own product page (the SEO Growth plan is shown on the SEO page, Social Pro on the social page). */
export const productIds = ['booking', 'menu', 'reviews', 'chat', 'content', 'tickets', 'seo', 'social', 'ads'] as const;
export type ProductId = (typeof productIds)[number];

/** Higher plan shown on a product page next to the product's own (basic) plan. */
export const growthPlanOf: Partial<Record<ProductId, AddonId>> = { seo: 'seogrowth', social: 'socialpro' };

/** Product page that presents an add-on (plans without their own page point to the main product). */
export const productOf = (id: AddonId): ProductId =>
  id === 'seogrowth' ? 'seo' : id === 'socialpro' ? 'social' : (id as ProductId);

/** Simple line icons (24×24, stroke). */
export const addonIcons: Record<AddonId, string> = {
  booking: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4M8 15l2.5 2.5L16 13"/>',
  menu: '<path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4z"/><path d="M14 14h2v2h-2zM18 18h2v2h-2zM14 18h2M18 14h2"/>',
  reviews: '<path d="M12 3l2.6 5.6L20 9.4l-4.2 4 1 5.8L12 16.6 7.2 19.2l1-5.8L4 9.4l5.4-.8z"/>',
  chat: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 10h8M8 13h5"/>',
  content: '<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/>',
  tickets: '<path d="M3 8a2 2 0 0 0 0 4v4h18v-4a2 2 0 0 0 0-4V4H3z"/><path d="M13 4v16" stroke-dasharray="2 2"/>',
  seo: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21M7.5 12l2-2.5 2 1.5 2.5-3"/>',
  seogrowth: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21M7.5 12l2-2.5 2 1.5 2.5-3"/>',
  social: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".6"/>',
  socialpro: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".6"/>',
  ads: '<path d="M3 10v4a1 1 0 0 0 1 1h3l6 4V5L7 9H4a1 1 0 0 0-1 1z"/><path d="M17 8.5a5 5 0 0 1 0 7M19.5 6a8.5 8.5 0 0 1 0 12"/>',
};
