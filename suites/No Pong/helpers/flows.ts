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
} from './nopong';

/** A SubscriptionConfig drives the same checkout path as a new-user order. */
function subscriptionAsOrder(config: SubscriptionConfig): OrderConfig {
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

/** Everything captured during the order, for parity assertions downstream. */
export interface FlowCapture {
  pdp: PdpCapture;
  checkout: Pick<OrderResult, 'subtotal' | 'shipping' | 'tax' | 'total'>;
  order: OrderReceived;
  result: OrderResult;
  email: string;
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

  return { pdp, checkout, order, result, email: result.email };
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
): Promise<SubscriptionResult> {
  const orderLike = subscriptionAsOrder(config);

  await shopperPage.goto('./');
  await shopperPage.waitForLoadState('load');
  await dismissPopups(shopperPage);

  const pdp = await addSubscriptionToCart(shopperPage, config.region);
  await fillCheckoutAddress(shopperPage, orderLike);

  const checkout = await captureCheckoutTotals(shopperPage);
  await warnIfNoTaxOrShipping(shopperPage, { testId: config.testId });
  const pointsEarned = await readPointsEarned(shopperPage);

  await pay(shopperPage, orderLike);
  const order = await readOrderReceived(shopperPage);
  const { subscriptionNumber, nextPaymentDate } = await readSubscriptionDetails(shopperPage);

  return {
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
