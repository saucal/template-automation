// High-level order flow orchestrator. Composes helpers/purcrystal.ts steps and returns
// a captured OrderFlowCapture; NO expect() here (assertions live in assertions.ts).
// Mirrors the GI "Pur Crystal - Basic WooCommerce Tests - User" flow (CC, qty 2,
// ship-to-different-address).
import { type Page } from '@playwright/test';
import type { OrderConfig, OrderResult, CapturedTotals } from '../types/test-config';
import {
  pickFirstProduct,
  addToCartFromPdp,
  readCartLine,
  proceedToCheckout,
  submitEmptyCheckoutForErrors,
  fillCheckoutAddress,
  fillShippingAddress,
  captureCheckoutTotals,
  placeOrderAuthNet,
  payPayPal,
  readOrderReceived,
  BILLING,
  SHIPPING,
  DEFAULT_QTY,
  orderEmail,
  type PdpCapture,
} from './purcrystal';

export interface OrderPages {
  shopperPage: Page;
  adminPage?: Page;
  emailPage?: Page;
}

/** Everything captured during a place-order flow — the parity source for assertions. */
export interface OrderFlowCapture {
  config: OrderConfig;
  pdp: PdpCapture;
  cartLine: Awaited<ReturnType<typeof readCartLine>>;
  /** The validation-error notice text from the empty-checkout submit (guest/new only). */
  validationError?: string;
  checkoutTotals: CapturedTotals;
  result: OrderResult;
}

/**
 * Place an order end-to-end (GI test 01 CC / test 02 PayPal). Steps:
 *  1. prime home, pick the first product from the category, capture name+price
 *  2. add to cart → capture cart line
 *  3. proceed to checkout
 *  4. guest/new: validation-first (empty submit) → fill billing; logged: address prefilled
 *  5. capture checkout totals, pay (Auth.Net test-prefilled / PayPal PPCP)
 *  6. read order-received into an OrderResult
 * `config.accountEmail` (logged) reuses the chained account; else a unique email is used.
 */
export async function runOrderFlow({ shopperPage: page }: OrderPages, config: OrderConfig): Promise<OrderFlowCapture> {
  const email = config.accountEmail ?? orderEmail(config.testId.toLowerCase().replace(/[^a-z0-9]+/g, '_'));

  await page.goto('/', { waitUntil: 'load' });
  const pdp = await pickFirstProduct(page, config.categoryPath, { qty: config.qty ?? DEFAULT_QTY, type: 'simple' });
  await addToCartFromPdp(page);
  const cartLine = await readCartLine(page);
  await proceedToCheckout(page);

  // GI Pur Crystal orders as a guest: validation-first, fill billing, ship-to-different.
  const validationError = await submitEmptyCheckoutForErrors(page);
  await fillCheckoutAddress(page, { ...BILLING, email });
  if (config.shipToDifferent) await fillShippingAddress(page, SHIPPING);

  const checkoutTotals = await captureCheckoutTotals(page);

  if (config.payment === 'paypal') await payPayPal(page);
  else await placeOrderAuthNet(page);

  const result = await readOrderReceived(page, config);
  result.billingEmail = email;
  result.unitPrice = pdp.unitPrice || result.unitPrice;
  result.productName = result.productName || pdp.productName;

  return { config, pdp, cartLine, validationError, checkoutTotals, result };
}
