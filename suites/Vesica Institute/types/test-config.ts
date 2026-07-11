/**
 * Typed test configuration — replaces GI's `Record<string,string>` vars bag.
 *
 * Consumed by: helpers/{vesica,flows,assertions}.ts and specs/**.
 * DOM-first project (no WC REST / SuiteVars) — everything a flow needs is captured
 * from the browser and returned in an OrderResult.
 *
 * Split:
 *   BrandConfig — what a SITE has (per-brand slugs/IDs, gateway capabilities, refund copy)
 *   OrderConfig — what THIS test does (user kind, payment, expected status)
 *   OrderResult — data captured ONCE at order-received, asserted on every surface
 *                 (thank-you · My Account · email · admin) — the capture-once parity model
 */

// ---------------------------------------------------------------------------
// Brand (the outermost Playwright-project dimension — two Kinsta hosts)
// ---------------------------------------------------------------------------

export type Brand = 'vesica' | 'purcrystal';

export type Payment = 'cc' | 'paypal';
export type UserKind = 'guest' | 'new' | 'logged';

// ---------------------------------------------------------------------------
// Address
// ---------------------------------------------------------------------------

export interface BillingAddress {
  firstName: string;
  lastName: string;
  company?: string;
  address: string;
  address2?: string;
  city: string;
  /** Long form for classic select2 (e.g. "California") */
  state: string;
  /** Short code for blocks <select> (e.g. "CA") */
  shortState?: string;
  zip: string;
  /** Long form (e.g. "United States") */
  country: string;
  /** Short code (e.g. "US") */
  shortCountry?: string;
  phone: string;
  email: string;
}

// ---------------------------------------------------------------------------
// Per-brand site config
// ---------------------------------------------------------------------------

export interface BrandProduct {
  /** Product slug for /product/<slug> or add-to-cart resolution (helpers/vesica.ts). */
  slug: string;
  /** Numeric product id for /?add-to-cart=<id>, when known. Per-brand — NEVER shared. */
  id?: string;
  type: 'simple' | 'variable';
}

export interface BrandConfig {
  /** .env key holding this brand's baseURL (BASE_URL_VESICA / BASE_URL_PURCRYSTAL). */
  baseUrlEnvKey: 'BASE_URL_VESICA' | 'BASE_URL_PURCRYSTAL';
  /** Default product the order flow buys. */
  product: BrandProduct;
  /** Optional variable product (Pur Crystal). */
  variableProduct?: BrandProduct;
  /** Gateways this brand's user suite exercises. */
  hasPayPal: boolean;
  hasRegister: boolean;
  /** Admin order note emitted by the gateway on refund (scan-all + regex, order-notes.ts). */
  refundNotePattern: RegExp;
  /** WC order status after a refund (Authorize.Net refunds → Refunded; a void → Cancelled). */
  refundedStatus: 'Refunded' | 'Cancelled';
}

// ---------------------------------------------------------------------------
// Order config + result
// ---------------------------------------------------------------------------

export interface OrderConfig {
  testId: string;
  brand: Brand;
  user: UserKind;
  payment: Payment;
  /** Override the brand's default product. */
  product?: BrandProduct;
  qty?: number;
  /** For user='new', create a WP account during/after checkout (passwordless). */
  createAccount?: boolean;
  /** For user='logged', the reused account email from an earlier chain test. */
  accountEmail?: string;
  /** Expected WC order status on the thank-you / admin surfaces. */
  expectedStatus: 'Processing' | 'Completed' | 'On hold';
  /** Refund expectations (config-driven — differs per gateway). */
  refund?: {
    /** Overrides brand default when the same brand has multiple gateways. */
    notePattern?: RegExp;
    status?: 'Refunded' | 'Cancelled';
  };
}

/** Money captured as raw display text; compared as numbers only when numeric. */
export interface CapturedTotals {
  subtotal?: string;
  shipping?: string;
  tax?: string;
  total: string;
}

/**
 * Facts captured ONCE at order-received, then asserted on every surface that renders
 * them (thank-you · My Account · email · admin). Never re-read per surface, never hardcode.
 */
export interface OrderResult {
  orderNumber: string;
  /** WP post id parsed from the order-received URL (for admin navigation; ≠ display number). */
  postId: string;
  /** Email used for billing — guest/new random or reused logged account. */
  billingEmail: string;
  /** Customer-facing payment-method label ("Credit Card" / "PayPal"). */
  paymentLabel: string;
  totals: CapturedTotals;
  /** Stable billing-block lines captured from thank-you (name/street/city/postcode). */
  billingBlock: string;
  /** Gateway order note text (admin) if captured during the flow. */
  gatewayNote?: string;
}
