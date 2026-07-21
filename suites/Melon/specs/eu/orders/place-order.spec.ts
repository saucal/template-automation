// EU orders (GI "Melon - Place order - EU Site": 01 Place order - No Upsell + 03 Email).
// Places a real order with the preset composite goggle on the EU blog, pays with the
// Stripe test card, then verifies the order on the thank-you page, in My Account, and in
// the receipt email. The EU funnel has NO upsell (GI "No Upsell"), so handleUpsell is a
// no-op here (it exits when no offer appears). Cart/checkout total parity lives in the
// EU cart/checkout specs.
//
// EU deltas vs UK (see docs/superpowers/specs/2026-07-21-eu-tests-design.md): German
// address + DE checkout country (runner IP geolocates to Austria), EUR comma-decimal
// prices, and the localized receipt subject "Your Melon Optics EU order receipt from".
import { test } from '../../../fixtures';
import { REGIONS, goToCart, goToCheckoutFromCart } from '../../../helpers/melon';
import {
  makeCustomer,
  addGoggleAndCapture,
  fillCheckout,
  settlePaymentSection,
  fillStripeCard,
  placeOrder,
  handleUpsell,
  readOrderNumber,
} from '../../../helpers/orders';
import { openMyAccountOrder } from '../../../helpers/account';
import { openEmailBySubject } from '../../../helpers/playgrounds-email';
import { assertOrderReceived, assertMyAccountOrder, assertOrderEmail } from '../../../helpers/assertions';
import type { PlacedOrder } from '../../../types/test-config';

const ORDER_RECEIPT_SUBJECT = 'Your Melon Optics EU order receipt from';

test.describe('EU — place order', { tag: ['@plugin:woocommerce', '@plugin:funnelkit-funnel-builder', '@plugin:woocommerce-composite-products'] }, () => {
  test('MO-EU-ORDER-01 – place order (no upsell)', async ({ shopperPage, emailPage }) => {
    const customer = makeCustomer('eu_order', 'eu');

    // Product → cart → checkout (totals asserted in cart.spec / checkout.spec).
    const selection = await addGoggleAndCapture(shopperPage, REGIONS.eu);
    await goToCart(shopperPage);
    await goToCheckoutFromCart(shopperPage);

    // Fill WFACP (DE country — the runner IP geolocates to Austria by default), pay, place.
    await fillCheckout(shopperPage, customer);
    // Let the order bump + payment section settle BEFORE entering the card — a late
    // update_checkout re-mounts the Stripe iframe and would wipe it (blocks submit).
    await settlePaymentSection(shopperPage);
    await fillStripeCard(shopperPage);
    await placeOrder(shopperPage);
    await shopperPage.waitForLoadState('domcontentloaded', { timeout: 30_000 });
    // EU funnel has no upsell — this exits immediately (no accept/skip offer to route).
    const upsell = await handleUpsell(shopperPage, 'reject');
    const orderNumber = await readOrderNumber(shopperPage);

    const order: PlacedOrder = { selection, upsell, customer, orderNumber };

    // 1) Thank-you page.
    await assertOrderReceived(shopperPage, order);

    // 2) My Account order — reached the customer way (My Account → Orders → View),
    // not a direct goto (rule 30). WFACP auto-creates + logs in the account on checkout.
    await openMyAccountOrder(shopperPage, REGIONS.eu, orderNumber);
    await assertMyAccountOrder(shopperPage, order);

    // 3) Order-receipt email (Mailpit).
    await openEmailBySubject(emailPage, customer.email, ORDER_RECEIPT_SUBJECT);
    await assertOrderEmail(emailPage, order);
  });
});
