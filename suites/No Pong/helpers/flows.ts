// High-level order orchestration. Drives the shopper through PDP → cart →
// classic single-page checkout → payment → order-received, capturing the
// canonical money/label values at each surface. Returns a FlowCapture; performs
// NO assertions (see assertions.ts).
//
// The capture chain is the parity backbone: every downstream assertion compares
// against what was captured here. No Pong uses CLASSIC checkout (no cart drawer),
// so the capture set is PDP → checkout totals → order-received.
import type { Page } from '@playwright/test';
import type {
  OrderConfig,
  OrderResult,
  SubscriptionConfig,
  SubscriptionResult,
  WholesaleConfig,
} from '../types/test-config';
import {
  addSubscriptionToCart,
  addToCart,
  addWholesaleProductToCart,
  captureCheckoutTotals,
  captureCheckoutRecurringTotals,
  captureOrderRecurringTotals,
  readCheckoutStories,
  dismissPopups,
  emailFor,
  fillCheckoutAddress,
  pay,
  PAYMENT_LABEL,
  readOrderReceived,
  readPointsEarned,
  readSubscriptionDetails,
  warnIfNoTaxOrShipping,
  type OrderReceived,
  type PdpCapture,
  type Totals,
} from './nopong';

/** A SubscriptionConfig drives the same checkout path as a new-user order. Exported
 *  so subscription specs can reuse the order-parity asserts (which take an OrderConfig). */
export function subscriptionAsOrder(config: SubscriptionConfig): OrderConfig {
  return {
    testId: config.testId,
    title: config.title,
    region: config.region,
    product: 'subscription',
    user: 'new',
    payment: config.payment,
    pdp: config.pdp,
    expectedStatus: 'Processing',
  };
}


export interface OrderPages {
  shopperPage: Page;
  adminPage: Page;
  emailPage: Page;
}

/**
 * Everything captured during the order, for parity assertions downstream. Generic
 * over the result type so a subscription flow carries its richer SubscriptionResult
 * (recurring totals, subscription number) without a separate capture type.
 */
export interface FlowCapture<R extends OrderResult = OrderResult> {
  pdp: PdpCapture;
  checkout: Totals;
  order: OrderReceived;
  result: R;
  email: string;
  /** Custom checkout "stories" headings captured during order processing. */
  stories: string[];
  /** Subscription-only: the "Recurring totals" section captured at checkout (source
   *  of truth) and again on the thank-you page (for surface parity). */
  recurringCheckout?: Totals;
  recurringOrder?: Totals;
}

/**
 * Place an order end-to-end on the shopper context and return all captured
 * values. Admin/email contexts are untouched here — assertions use them later,
 * so their lazy fixtures only spin up when verification runs.
 */
export async function runOrderFlow(
  { shopperPage }: OrderPages,
  config: OrderConfig
): Promise<FlowCapture> {
  await shopperPage.goto('./');
  await shopperPage.waitForLoadState('load');
  await dismissPopups(shopperPage);

  const pdp = await addToCart(shopperPage, config.region, config.pdp);

  // fillCheckoutAddress self-navigates to checkout/ (and skips entry for a
  // logged-in user, whose address prefills).
  await fillCheckoutAddress(shopperPage, config);

  const checkout = await captureCheckoutTotals(shopperPage);
  await warnIfNoTaxOrShipping(shopperPage, { testId: config.testId });
  const pointsEarned = await readPointsEarned(shopperPage);

  await pay(shopperPage, config);
  // The custom checkout "stories" modal shows during processing — capture it
  // BEFORE readOrderReceived waits for the redirect (which tears the modal down).
  const stories = await readCheckoutStories(shopperPage);
  const order = await readOrderReceived(shopperPage);

  const result: OrderResult = {
    productName: order.productName || pdp.productName,
    unitPrice: pdp.unitPrice,
    subtotal: order.subtotal,
    shipping: order.shipping,
    tax: order.tax,
    total: order.total,
    orderNumber: order.orderNumber,
    email: emailFor(config),
    paymentLabel: order.paymentLabel || PAYMENT_LABEL[config.payment],
    pointsEarned,
  };

  console.log(
    `[${config.testId}] order #${result.orderNumber}` +
      `\n  product:  ${result.productName} @ ${result.unitPrice}` +
      `\n  checkout: subtotal=${checkout.subtotal} shipping=${checkout.shipping} tax=${checkout.tax} total=${checkout.total}` +
      `\n  order:    subtotal=${result.subtotal} shipping=${result.shipping} tax=${result.tax} total=${result.total}` +
      `\n  points:   ${result.pointsEarned ?? 'none'} | payment: ${result.paymentLabel}`
  );

  return { pdp, checkout, order, result, email: result.email, stories };
}

// ---------------------------------------------------------------------------
// Subscription / wholesale flows — filled in Tasks 13-15. Stubbed so the type
// surface is stable for callers written against it.
// ---------------------------------------------------------------------------

/**
 * Place a subscription order end-to-end (Monthly Club product → subscription
 * checkout → payment → order-received), then read the subscription number +
 * next-payment date from My Account. Returns a SubscriptionResult.
 */
export async function runSubscriptionFlow(
  { shopperPage }: OrderPages,
  config: SubscriptionConfig
): Promise<FlowCapture<SubscriptionResult>> {
  const orderLike = subscriptionAsOrder(config);

  await shopperPage.goto('./');
  await shopperPage.waitForLoadState('load');
  await dismissPopups(shopperPage);

  const pdp = await addSubscriptionToCart(shopperPage, config.region);
  await fillCheckoutAddress(shopperPage, orderLike);

  const checkout = await captureCheckoutTotals(shopperPage);
  // Recurring totals from the checkout review's "Recurring totals" section, captured
  // here (after address, before payment) — subtotal/shipping/total + AU inclusive GST.
  const recurring = await captureCheckoutRecurringTotals(shopperPage);
  await warnIfNoTaxOrShipping(shopperPage, { testId: config.testId });
  const pointsEarned = await readPointsEarned(shopperPage);

  await pay(shopperPage, orderLike);
  const stories = await readCheckoutStories(shopperPage); // during processing, before redirect
  const order = await readOrderReceived(shopperPage);
  // Recurring totals again on the thank-you page — for surface parity against the
  // checkout-captured recurring (BEFORE readSubscriptionDetails navigates away).
  const recurringOrder = await captureOrderRecurringTotals(shopperPage);
  const { subscriptionNumber, nextPaymentDate } = await readSubscriptionDetails(shopperPage);

  const result: SubscriptionResult = {
    productName: order.productName || pdp.productName,
    unitPrice: pdp.unitPrice,
    subtotal: order.subtotal,
    shipping: order.shipping,
    tax: order.tax,
    total: order.total,
    orderNumber: order.orderNumber,
    email: emailFor(orderLike),
    paymentLabel: order.paymentLabel || PAYMENT_LABEL[config.payment],
    pointsEarned,
    subscriptionNumber,
    nextPaymentDate,
    recurring,
    stories,
  };

  return {
    pdp,
    checkout,
    order,
    result,
    email: result.email,
    stories,
    recurringCheckout: recurring,
    recurringOrder,
  };
}

/**
 * Place a wholesale-priced order end-to-end: the caller logs in as the wholesale
 * customer first (helpers/nopong.wholesaleLogin), then this adds a wholesale
 * product → checkout (saved address prefills for the logged-in account) →
 * payment → order-received. Returns an OrderResult.
 */
export async function runWholesaleFlow(
  { shopperPage }: OrderPages,
  config: WholesaleConfig
): Promise<OrderResult> {
  const orderLike: OrderConfig = {
    testId: config.testId,
    title: config.title,
    region: config.region,
    product: 'wholesale',
    user: 'logged', // wholesale account is logged in; saved address prefills
    payment: config.payment,
    pdp: config.pdp,
    expectedStatus: 'Processing',
    accountEmail: config.email,
  };

  const pdp = await addWholesaleProductToCart(shopperPage);
  await fillCheckoutAddress(shopperPage, orderLike);

  await captureCheckoutTotals(shopperPage); // also waits for checkout to settle
  await warnIfNoTaxOrShipping(shopperPage, { testId: config.testId });

  await pay(shopperPage, orderLike);
  const order = await readOrderReceived(shopperPage);

  return {
    productName: order.productName || pdp.productName,
    unitPrice: pdp.unitPrice,
    subtotal: order.subtotal,
    shipping: order.shipping,
    tax: order.tax,
    total: order.total,
    orderNumber: order.orderNumber,
    email: config.email,
    paymentLabel: order.paymentLabel || PAYMENT_LABEL[config.payment],
  };
}
