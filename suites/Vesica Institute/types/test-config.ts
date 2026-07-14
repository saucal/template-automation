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
// Brand — this project targets ONE brand/host. Pur Crystal is a separate branch
// (feat/purcrystal-playwright-refactor) with the core duplicated; there this
// literal is 'purcrystal'. Kept as a typed field so both branches stay parallel.
// ---------------------------------------------------------------------------

export type Brand = 'purcrystal';

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
  /** Category page to pick the FIRST in-stock product from (GI flow). */
  categoryPath: string;
  qty?: number;
  /** Ship to a separate address (GI Pur Crystal) → second shipping address block. */
  shipToDifferent?: boolean;
  /** For user='logged', the reused account email from an earlier chain test. */
  accountEmail?: string;
  /** Expected WC order status on the thank-you / admin surfaces. */
  expectedStatus: 'Processing' | 'Completed' | 'On hold' | 'Refunded';
  /** This product grants a membership (GI CC order → tr.membership + My-Membership). */
  isMembership?: boolean;
  /** Whether this order is expected to have a non-$0 shipping row. */
  expectShipping?: boolean;
  /** Whether this order is expected to have a tax row. */
  expectTax?: boolean;
  /** Refund expectations (config-driven — differs per gateway). */
  refund?: {
    notePattern?: RegExp;
    status?: 'Refunded' | 'Cancelled';
    /** Also refund the shipping line + shipping tax (full refund). */
    includeShipping?: boolean;
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
 * Facts captured ONCE during the flow (PDP + order-received), then asserted on every
 * surface that renders them (thank-you · My Account · email · admin). Never re-read
 * per surface, never hardcode.
 */
export interface OrderResult {
  orderNumber: string;
  /** WP post id parsed from the order-received URL (for admin navigation; ≠ display number). */
  postId: string;
  /** Email used for billing — guest/new random or reused logged account. */
  billingEmail: string;
  /** Product name captured from the PDP (h1.product_title, dash-normalised). */
  productName: string;
  /** Unit price captured from the PDP (raw display, e.g. "$100.00"). */
  unitPrice: string;
  /** Customer-facing payment-method label ("Credit Card" / "PayPal"). */
  paymentLabel: string;
  totals: CapturedTotals;
  /** Billing address block text (order-received). */
  billingBlock: string;
  /** Shipping address block text (order-received) — present when a shipping column shows. */
  shippingBlock?: string;
  /** Gateway order note text (admin) if captured during the flow. */
  gatewayNote?: string;
}
