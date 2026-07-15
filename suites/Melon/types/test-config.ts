// Typed config objects — replace GI's `Record<string,string>` vars bags (rule 1, 9).
//
// TestConfig  = what THIS test does.
// RegionConfig = what a Melon SITE is (per-blog facts, reached via ?mocs=).
// Result      = data captured by a flow, asserted afterwards.

/** The full-spec regions we build suites for. Others (us/za) are switch targets only. */
export type RegionKey = 'uk' | 'eu';

/**
 * A Melon storefront site. Melon is a path-based WP multisite on one host; each
 * blog is reached by priming `?mocs=<code>` which redirects to `path`.
 * See melon-optics-geolocation/src/GeoLocationRedirect.php for the country→blog map.
 */
export interface RegionConfig {
  key: RegionKey;
  /** Subsite path from the host root, WITH trailing slash. '' = root (UK). e.g. 'eu/'. */
  path: string;
  /** Country code to prime via ?mocs= — wins over the persisted country cookie. */
  mocs: string;
  /** Page-title fragment that proves we're on this blog, e.g. 'Melon Optics EU'. */
  title: string;
  /** Expected selected text of #mo-country-dropdown, e.g. 'Germany'. */
  country: string;
  /** Expected #currency_switcher value, e.g. 'EUR'. SOFT — the switcher lags a page load. */
  currency: string;
  /** Currency symbol used in prices, e.g. '€'. */
  symbol: string;
}

/**
 * One row of the country-switcher matrix (collapses GI's 6 "Home Page – region"
 * variants into one parameterized spec, rules 11/35). Priming `?mocs` either stays
 * on the current blog (currency switch only) or redirects to another (landsOn path).
 */
export interface CountrySwitch {
  /** Code sent as ?mocs= AND the value the dropdown should hold afterwards. */
  mocs: string;
  /** Expected selected text of #mo-country-dropdown, e.g. 'Canada'. */
  country: string;
  /** Expected URL pathname after the redirect settles, e.g. '/', '/eu/', '/us/'. */
  landsOn: string;
  /** Page-title fragment proving the landing blog. */
  title: string;
}

/** Captured cart facts (from the product page + cart), asserted afterwards. As money numbers. */
export interface CartResult {
  productName: string;
  unitPrice: number;
  qty: number;
  subtotal: number; // unitPrice × qty
}

/** Checkout order-summary totals, as money numbers. */
export interface CheckoutTotals {
  subtotal: number;
  shipping: number;
  total: number;
}
