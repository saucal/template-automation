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
  addToCart,
  captureCheckoutTotals,
  dismissPopups,
  emailFor,
  fillCheckoutAddress,
  pay,
  PAYMENT_LABEL,
  readOrderReceived,
  readPointsEarned,
  warnIfNoTaxOrShipping,
  type OrderReceived,
  type PdpCapture,
} from './nopong';

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

/** Place a subscription order end-to-end. Implemented in Task 13. */
export async function runSubscriptionFlow(
  _pages: OrderPages,
  _config: SubscriptionConfig
): Promise<SubscriptionResult> {
  throw new Error('runSubscriptionFlow not implemented yet (Task 13)');
}

/** Place a wholesale-priced order end-to-end. Implemented in Task 15. */
export async function runWholesaleFlow(
  _pages: OrderPages,
  _config: WholesaleConfig
): Promise<OrderResult> {
  throw new Error('runWholesaleFlow not implemented yet (Task 15)');
}
