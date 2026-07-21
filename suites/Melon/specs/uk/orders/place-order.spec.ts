// UK orders (GI "Upsell Accepted / Upsell rejected - Place Order - UK Site" + the
// order-receipt email test). Places a real order with the preset composite goggle,
// pays with the Stripe test card, then either ACCEPTS or REJECTS the wfocu upsell.
// Verifies the order on the thank-you page, in My Account, and in the receipt email.
//
// GI's cart/checkout total assertions are intentionally omitted here — cart.spec and
// checkout.spec already cover them (rule: full parity minus what's covered elsewhere).
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
import type { PlacedOrder, UpsellChoice } from '../../../types/test-config';

const ORDER_RECEIPT_SUBJECT = 'Your Melon Optics order receipt from';

const CASES: { id: string; name: string; choice: UpsellChoice; tag: string }[] = [
  { id: 'MO-UK-ORDER-01', name: 'place order, accept the upsell', choice: 'accept', tag: 'accepted' },
  { id: 'MO-UK-ORDER-02', name: 'place order, reject the upsell', choice: 'reject', tag: 'rejected' },
];

test.describe('UK — place order', { tag: ['@plugin:woocommerce', '@plugin:funnelkit-funnel-builder', '@plugin:woocommerce-composite-products'] }, () => {
  for (const c of CASES) {
    test(`${c.id} – ${c.name}`, async ({ shopperPage, emailPage }) => {
      const customer = makeCustomer(c.tag);

      // Product → cart → checkout (totals asserted in cart.spec / checkout.spec).
      const selection = await addGoggleAndCapture(shopperPage, REGIONS.uk);
      await goToCart(shopperPage);
      await goToCheckoutFromCart(shopperPage);

      // Fill WFACP (GB country — the runner IP geolocates to AR by default), pay, place.
      await fillCheckout(shopperPage, customer);
      // Let the order bump + payment section settle BEFORE entering the card — a late
      // update_checkout re-mounts the Stripe iframe and would wipe it (blocks submit).
      await settlePaymentSection(shopperPage);
      await fillStripeCard(shopperPage);
      await placeOrder(shopperPage);
      await shopperPage.waitForLoadState('domcontentloaded', { timeout: 30_000 });
      // Post-purchase wfocu upsell funnel.
      const upsell = await handleUpsell(shopperPage, c.choice);
      const orderNumber = await readOrderNumber(shopperPage);

      const order: PlacedOrder = { selection, upsell, customer, orderNumber };

      // 1) Thank-you page.
      await assertOrderReceived(shopperPage, order);

      // 2) My Account order — reached the customer way (My Account → Orders → View),
      // not a direct goto (rule 30). WFACP auto-creates + logs in the account on checkout.
      await openMyAccountOrder(shopperPage, REGIONS.uk, orderNumber);
      await assertMyAccountOrder(shopperPage, order);

      // 3) Order-receipt email (Mailpit).
      await openEmailBySubject(emailPage, customer.email, ORDER_RECEIPT_SUBJECT);
      await assertOrderEmail(emailPage, order);
    });
  }
});
