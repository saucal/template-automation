// Typed config model — replaces the GI Record<string,string> vars bag (rule 9).
// Mirrors leggari's three roles (config / result / suite-vars), extended with
// region and subscription/wholesale domain configs.
//
// DOM-first project: no WC REST. SuiteVars is DOM-read in beforeAll, not fetched.

export type Region = 'au' | 'ca' | 'us';
export type ProductKind = 'simple' | 'variable' | 'subscription' | 'wholesale';
export type PaymentMethod = 'stripe' | 'paypal';
export type UserKind = 'guest' | 'new' | 'logged' | 'wholesale';

/**
 * Billing identity for one region. Both long and short forms are kept: classic
 * checkout uses select2 (full label, e.g. "Australia"); WC Blocks passes the
 * value to a native <select> (short code, e.g. "AU").
 */
export interface BillingDetails {
  firstName: string;
  lastName: string;
  company?: string;
  street: string;
  city: string;
  state: string;
  shortState: string;
  zip: string;
  country: string;
  shortCountry: string;
  /** select2 container text for the country field, e.g. "Australia". */
  countryComplete: string;
  phone: string;
  email?: string;
}

/** Simple product — direct product URL, set quantity, add to cart. */
export interface SimplePdp {
  kind: 'simple';
  slug: string;
  qty: number;
}

/** Variable product — pick a variation, set quantity. */
export interface VariablePdp {
  kind: 'variable';
  slug: string;
  /** variation option value to select (e.g. attribute term). */
  variation: string;
  qty: number;
}

/** Subscription product — added like a simple product but on a subscription plan. */
export interface SubscriptionPdp {
  kind: 'subscription';
  slug: string;
  qty: number;
}

export type PdpConfig = SimplePdp | VariablePdp | SubscriptionPdp;

export interface OrderConfig {
  /** stable id, e.g. 'NP-AU-PO-01' */
  testId: string;
  /** human title for reports */
  title: string;
  region: Region;
  product: ProductKind;
  user: UserKind;
  payment: PaymentMethod;
  pdp: PdpConfig;
  expectedStatus: 'Processing' | 'On hold' | 'Completed';
  /** Order status AFTER a refund/void. Stripe issues a true refund → 'Refunded'. */
  refundedStatus?: 'Refunded' | 'Cancelled';
  /** Regex the gateway refund note must match (rule 27) — never hardcode the copy. */
  refundNotePattern?: RegExp;
  /** Email to reuse for a logged-in order (rule 28) — the SAME account as a prior order. */
  accountEmail?: string;
  /** Stripe: tick "Save payment information…" so the card is stored on the account. */
  savePaymentMethod?: boolean;
  /** Stripe: pay with a previously-saved card token instead of entering a new card. */
  useSavedCard?: boolean;
}

/** Money/label values captured at PDP/cart — the source of truth for parity. */
export interface CapturedPrices {
  productName: string;
  /** per-unit / line price as rendered, e.g. '$24.00' */
  unitPrice: string;
  subtotal: string;
  /** shipping as rendered ('$12.00' | 'Free') */
  shipping: string;
  tax: string;
  total: string;
}

export interface OrderResult extends CapturedPrices {
  orderNumber: string;
  email: string;
  /** payment-method label as shown on order surfaces ('Credit / Debit Card' | 'PayPal'). */
  paymentLabel: string;
  /** points awarded by the Points/Rewards plugin, if present on this order. */
  pointsEarned?: number;
}

export interface SubscriptionConfig {
  testId: string;
  title: string;
  region: Region;
  payment: PaymentMethod;
  pdp: SubscriptionPdp;
  /** Expected subscription status after the manage action (cancel/activate/etc). */
  expectedSubStatus?: 'Active' | 'Cancelled' | 'On hold' | 'Pending Cancellation';
}

export interface SubscriptionResult extends OrderResult {
  subscriptionNumber: string;
  /** next payment date as rendered on the subscription. */
  nextPaymentDate: string;
  /**
   * The "Recurring totals" section from the checkout review (what bills each
   * renewal), captured before payment. The inherited subtotal/shipping/tax/total are
   * the FIRST payment (which includes any one-off sign-up fee); these are the
   * recurring amounts: subtotal, shipping, total, and AU's inclusive GST.
   */
  recurring: Pick<CapturedPrices, 'subtotal' | 'shipping' | 'tax' | 'total'>;
  /** Custom checkout "stories" headings captured during order processing. */
  stories: string[];
}

export interface WholesaleConfig {
  testId: string;
  title: string;
  region: Region;
  /** Wholesale account login (set in .env or registered in-flow). */
  email: string;
  pdp: PdpConfig;
  payment: PaymentMethod;
}

/** Per-region constants. Lives in helpers/nopong.ts as `regionConfig` (rule 11). */
export interface RegionConfig {
  /** currency symbol, e.g. '$' */
  currency: string;
  /** ISO currency code, e.g. 'AUD' | 'CAD' | 'USD' */
  currencyCode: string;
  billing: BillingDetails;
  products: {
    simple: { slug: string };
    variable: { slug: string; variation: string };
    subscription: { slug: string };
    wholesale?: { slug: string };
  };
  /** whether a tax row is expected at checkout for this region (rule 22). */
  expectTax: boolean;
  /**
   * whether tax is INCLUSIVE (baked into subtotal & total — AU GST) rather than a
   * separate additive row (CA/US). `readTotals` surfaces the amount either way (AU's
   * "Includes $X GST" note), but the internal total-consistency check must NOT add it
   * back when inclusive — the subtotal already contains it.
   */
  taxInclusive: boolean;
  /** whether a shipping row is expected at checkout for this region (rule 22). */
  expectShipping: boolean;
}

/** Site-level values, DOM-read once in beforeAll. */
export interface SuiteVars {
  /** site title — parallel-safe filter for shared inboxes / parity. */
  title: string;
  /** classic/blocks marker, if a spec needs to branch (rule 21). */
  blog?: string;
}
