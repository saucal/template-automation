// Typed config model for the repurposedMATERIALS place-order suite.
//
// Simplified from leggari: simple + variable products, Accept.Blue v2 payment,
// CC processing fee as a captured line item.

export type PaymentMethod = 'acceptblue';
export type UserKind = 'guest' | 'new' | 'logged';

export interface SimplePdp {
  kind: 'simple';
  /** Explicit product URL path. Omit for dynamic selection. */
  slug?: string;
  /** When slug is omitted, pick a random in-stock simple product under this price. */
  maxPrice?: number;
  qty: number;
}

/**
 * Variable product. Picks a random in-stock variable product under maxPrice and
 * selects the first available option in every attribute dropdown (GI parity —
 * `selectFirstAvailableVariation`). Attributes are generic (e.g. location), not
 * hardcoded.
 */
export interface VariablePdp {
  kind: 'variable';
  /** Explicit product URL path. Omit for dynamic selection. */
  slug?: string;
  /** When slug is omitted, pick a random in-stock variable product under this price. */
  maxPrice?: number;
  qty: number;
}

export type PdpConfig = SimplePdp | VariablePdp;

export interface OrderConfig {
  testId: string;
  title: string;
  user: UserKind;
  payment: PaymentMethod;
  pdp: PdpConfig;
  expectedStatus: 'Processing';
  /**
   * Reuse an existing customer account (GI parity: the logged-user order is placed
   * on the SAME account created by the new-user order, so its saved address
   * prefills checkout and the confirmation email lands in that account's inbox).
   * When set, emailFor() returns this instead of a per-test generated address.
   */
  accountEmail?: string;
}

export interface CapturedPrices {
  productName: string;
  unitPrice: string;
  subtotal: string;
  shipping: string;
  tax: string;
  /** Accept.Blue 3.25% credit card processing fee. */
  ccFee: string;
  total: string;
}

export interface OrderResult extends CapturedPrices {
  orderNumber: string;
  email: string;
  /** Payment-method label as it appears on order surfaces, e.g. 'Credit Card'. */
  paymentLabel: string;
  /** Selected variation option labels (variable products) — asserted on the order. */
  variations?: string[];
}

/** Site-level values fetched once (DOM read). */
export interface SuiteVars {
  /** Site title — parallel-safe filter for the Playgrounds Mailpit inbox. */
  title: string;
}
