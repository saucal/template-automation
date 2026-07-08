// High-level order orchestration. Drives the shopper from the Courses menu →
// course PDP → cart drawer → cart → the 4-step checkout wizard → order-received,
// capturing the canonical money/label values at each surface. Returns a
// FlowCapture; performs NO assertions (assertions.ts owns every expect()).
//
// The capture chain is the parity backbone: every downstream surface (thank-you,
// My Account, admin, emails) is asserted against what was captured here — never
// against hardcoded literals, so the suite survives catalogue/price drift
// between maintenance cycles.
import type { Page } from '@playwright/test';
import type { OrderConfig, OrderResult, Totals } from '../types/test-config';
import {
  addCourseToCart,
  BILLING,
  dismissPopups,
  emailFor,
  fillBillingStep,
  fillParticipantsStep,
  fillStripeStep,
  goToAllCourses,
  goToCartFromDrawer,
  nextStep,
  ORDER_NOTE,
  participantsFor,
  PAYMENT_LABEL,
  pickCourseFromGrid,
  placeOrderWithNote,
  proceedToCheckout,
  readBlocksSummary,
  readCartLine,
  readCartTotals,
  readCredentialOptions,
  readOrderReceived,
  warnIfNoTaxOrShipping,
  type CartLine,
  type OrderReceived,
} from './pls';
import type { CourseCapture } from '../types/test-config';

export interface OrderPages {
  shopperPage: Page;
  adminPage: Page;
  emailPage: Page;
}

/** Everything captured during the order, for parity assertions downstream. */
export interface FlowCapture {
  /** Grid listing capture (name + listed price). */
  listing: { name: string; listingPrice: string };
  /** PDP capture (title, per-seat price, subscription-period label). */
  course: CourseCapture;
  cart: { line: CartLine; totals: Totals };
  /** Blocks order summary read on the Confirmation step, before Place Order. */
  checkout: Totals & { itemName: string; itemTotal: string };
  /** Option labels of each participant credentials select (GI options check). */
  credentialOptions: string[][];
  order: OrderReceived;
  result: OrderResult;
}

/** The storefront half of the order flow (home → course → cart), reused by the
 *  basic cart-parity spec which stops at the cart. */
export type CartCapture = Pick<FlowCapture, 'listing' | 'course' | 'cart'>;

/**
 * Browse from home to a course via the Courses menu, add `qty` seats to the cart
 * through the drawer, and capture listing/PDP/cart values. Lands on the cart page.
 */
export async function runCartFlow(page: Page, testId: string, qty: number): Promise<CartCapture> {
  await page.goto('./');
  await page.waitForLoadState('load');
  await dismissPopups(page);

  await goToAllCourses(page);
  const listing = await pickCourseFromGrid(page);
  const course = await addCourseToCart(page, qty);
  await goToCartFromDrawer(page);

  const cart = { line: await readCartLine(page), totals: await readCartTotals(page) };
  await warnIfNoTaxOrShipping(page, { testId });
  return { listing, course, cart };
}

/**
 * Place a course order end-to-end on the shopper context and return all captured
 * values. Admin/email contexts are untouched here — assertions use them later,
 * so their lazy fixtures only spin up when verification runs.
 *
 * Steps: home → Courses menu → All CE Courses → pick course → select period +
 * qty → Sign up now → drawer View cart → cart capture → Proceed to checkout →
 * wizard (Billing → Participants → Payment → Confirmation) → note → Place Order
 * → order-received capture. Lands on the thank-you page, logged in as the
 * auto-created account (guest orders create + sign in the purchaser).
 */
export async function runOrderFlow({ shopperPage: page }: OrderPages, config: OrderConfig): Promise<FlowCapture> {
  const { listing, course, cart } = await runCartFlow(page, config.testId, config.qty);

  await proceedToCheckout(page);

  await fillBillingStep(page, BILLING, emailFor(config));
  await nextStep(page, 'Participants');

  const participants = participantsFor(config);
  await fillParticipantsStep(page, participants);
  const credentialOptions = await readCredentialOptions(page);
  await nextStep(page, 'Payment');

  await fillStripeStep(page);
  await nextStep(page, 'Confirmation');

  const checkout = await readBlocksSummary(page);
  await placeOrderWithNote(page, ORDER_NOTE);

  const order = await readOrderReceived(page);

  const result: OrderResult = {
    productName: order.productName || course.productName,
    unitPrice: course.unitPrice,
    qty: config.qty,
    subtotal: order.subtotal,
    discount: order.discount,
    shipping: order.shipping,
    tax: order.tax,
    total: order.total,
    orderNumber: order.orderNumber,
    postId: order.postId,
    email: emailFor(config),
    paymentLabel: order.paymentLabel || PAYMENT_LABEL,
    participants,
    subscriptionNumbers: order.subscriptions.map((s) => s.number),
  };

  console.log(
    `[${config.testId}] order ${result.orderNumber} (post ${result.postId})` +
      `\n  course:   ${result.productName} (${course.periodLabel || 'no period'}) @ ${result.unitPrice} × ${result.qty}` +
      `\n  cart:     line=${cart.line.subscriptionPrice} subtotal=${cart.totals.subtotal} total=${cart.totals.total}` +
      `\n  checkout: subtotal=${checkout.subtotal} total=${checkout.total}` +
      `\n  order:    subtotal=${result.subtotal} total=${result.total} | subs: ${result.subscriptionNumbers.join(', ')}`
  );

  return { listing, course, cart, checkout, credentialOptions, order, result };
}
