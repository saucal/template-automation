// High-level order orchestration. Drives the shopper through shop → PDP → cart →
// checkout → payment → order-received, capturing canonical values at each surface.
// Returns a FlowCapture; performs NO assertions (see assertions.ts).
import type { Page } from '@playwright/test';
import type { OrderConfig, OrderResult, CapturedPrices } from '../types/test-config';
import {
  dismissOverlays,
  emailFor,
  fillAcceptBlue,
  fillCheckout,
  findAndAddProduct,
  goToCheckout,
  capturePrices,
  PAYMENT_LABEL,
  placeOrder,
  readOrderReceived,
  warnIfNoTaxOrShipping,
  type OrderReceived,
  type PdpCapture,
} from './repurposed';

export interface OrderPages {
  shopperPage: Page;
  adminPage: Page;
  emailPage: Page;
}

/** Everything captured during the order, for parity assertions downstream. */
export interface FlowCapture {
  pdp: PdpCapture;
  checkout: Omit<CapturedPrices, 'productName' | 'unitPrice'>;
  order: OrderReceived;
  result: OrderResult;
  email: string;
}

/**
 * Place an order end-to-end on the shopper context and return all captured values.
 * Admin/email contexts are untouched — assertions use them later.
 */
export async function runOrderFlow(
  { shopperPage }: OrderPages,
  config: OrderConfig
): Promise<FlowCapture> {
  await shopperPage.goto('/');
  await shopperPage.waitForLoadState('load');
  await dismissOverlays(shopperPage);

  // Add product to cart (simple or variable, per config.pdp.kind)
  const pdp = await findAndAddProduct(shopperPage, config.pdp);

  // Go to checkout and fill the form
  await goToCheckout(shopperPage);
  await fillCheckout(shopperPage, config);

  // Capture prices from checkout order review
  const checkout = await capturePrices(shopperPage);
  await warnIfNoTaxOrShipping(shopperPage, { testId: config.testId });

  // Fill payment and place order
  await fillAcceptBlue(shopperPage);
  await placeOrder(shopperPage);

  // Read order-received page
  const order = await readOrderReceived(shopperPage);

  const result: OrderResult = {
    productName: order.productName || pdp.productName,
    unitPrice: pdp.unitPrice,
    subtotal: order.subtotal || checkout.subtotal,
    shipping: order.shipping || checkout.shipping,
    tax: order.tax || checkout.tax,
    ccFee: checkout.ccFee,
    total: order.total || checkout.total,
    orderNumber: order.orderNumber,
    email: emailFor(config),
    paymentLabel: order.paymentLabel || PAYMENT_LABEL,
  };

  return { pdp, checkout, order, result, email: result.email };
}
