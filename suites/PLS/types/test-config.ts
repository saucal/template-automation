// Typed config model — replaces the GI Record<string,string> vars bag (rule 9).
// Three roles: config (what a test does), capture/result (what a flow returned),
// site constants (helpers/pls.ts). Single region (US site), single gateway
// (Stripe via WC Blocks), so no region dimension.
//
// DOM-first project: no WC REST usage anywhere, so there is no SuiteVars fetch
// and no wc-api helper (prompt rule: omit when unused).

/** Billing identity used at checkout (WC Blocks native selects → short codes). */
export interface BillingDetails {
  firstName: string;
  /** Custom pls-core checkout field (#billing-pls-core-middle_name). */
  middleName: string;
  lastName: string;
  company: string;
  street: string;
  street2: string;
  city: string;
  /** Short state code for the blocks <select>, e.g. 'FL'. */
  state: string;
  zip: string;
  /** Short country code for the blocks <select>, e.g. 'US'. */
  country: string;
  phone: string;
}

/** One course participant (checkout wizard step 2). */
export interface Participant {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  /** One of the 14 credential options (CRDH, RDA, FTD, …). */
  credentials: string;
}

export interface OrderConfig {
  /** stable id, e.g. 'PLS-PO-01' */
  testId: string;
  /** human title for reports */
  title: string;
  /** guest = checkout creates the account (passwordless); logged = pre-authenticated. */
  user: 'guest' | 'logged';
  /** course seats — one participant per seat; the site spawns one subscription per seat. */
  qty: number;
  /** Virtual subscription courses auto-complete. */
  expectedStatus: 'Completed' | 'Processing';
  /** Order status AFTER a refund. Stripe issues a true refund → 'Refunded'. */
  refundedStatus?: 'Refunded' | 'Cancelled';
  /** Regex the gateway refund note must match (rule 27) — never hardcode the copy. */
  refundNotePattern?: RegExp;
  /** Email to reuse for a logged-in order (rule 28) — the SAME account as a prior order. */
  accountEmail?: string;
}

/** Values captured on the course PDP — the parity source of truth. */
export interface CourseCapture {
  productName: string;
  /** per-seat price as rendered, e.g. '$18.00' */
  unitPrice: string;
  /** subscription-period variation label, e.g. '7 Days'; '' for a non-variable course. */
  periodLabel: string;
}

/**
 * Money values read from one surface. PLS courses are virtual and untaxed, so
 * shipping/tax are expected-empty ('' = row absent) — kept in the model so the
 * rule-22 warner and expectMoney's skip-absent semantics still apply if the site
 * ever grows a taxed/shipped product.
 */
export interface Totals {
  subtotal: string;
  discount: string;
  shipping: string;
  tax: string;
  total: string;
}

/** Everything the order flow captured, asserted against every downstream surface. */
export interface OrderResult extends Totals {
  productName: string;
  unitPrice: string;
  qty: number;
  /** Sequential display number (wt-sequential-order-numbers), e.g. 'O-08924'. */
  orderNumber: string;
  /** WP post id from the order-received URL — the admin editor is keyed by this. */
  postId: string;
  email: string;
  /** Customer-facing gateway label ('Credit / Debit Card'). */
  paymentLabel: string;
  participants: Participant[];
  /** Related subscriptions created by the order — one per seat/participant. */
  subscriptionNumbers: string[];
}
