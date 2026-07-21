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

/** A postal address filled into the WFACP checkout (no company field on this site). */
export interface Address {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  postcode: string;
  /** Country code for the WooCommerce checkout select (e.g. 'GB'). Drives shipping/tax. */
  countryCode: string;
  /** Human country name as shown on the order (e.g. 'United Kingdom (UK)'). */
  countryName: string;
  phone?: string;
}

/** A checkout customer: a per-run email plus billing + (different) shipping addresses. */
export interface Customer {
  email: string;
  billing: Address;
  shipping: Address;
}

/** Whether the post-purchase wfocu upsell offer is accepted or rejected. */
export type UpsellChoice = 'accept' | 'reject';

/** Composite goggle facts captured on the product page, asserted across the order surfaces. */
export interface CompositeSelection {
  /** Product title, e.g. 'Diablo Goggle (mtb)'. */
  prodDesc: string;
  /** Unit price as a money number. */
  unitPrice: number;
  /** The 4 main-component display texts, e.g. 'Frame : Cosmic Black'. */
  components: string[];
}

/** One accepted upsell line item (wfocu can present up to two offers in sequence). */
export interface UpsellItem {
  desc: string;
  price: number;
}

/** Result of the post-purchase upsell step. */
export interface UpsellResult {
  accepted: boolean;
  items: UpsellItem[];
}

/** Everything captured while placing an order, asserted on thank-you / my-account / email. */
export interface PlacedOrder {
  selection: CompositeSelection;
  upsell: UpsellResult;
  customer: Customer;
  orderNumber: string;
  /** Totals are covered by checkout.spec; captured opportunistically, not always asserted. */
  subtotal?: number;
  shipping?: number;
  total?: number;
}
