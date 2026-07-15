// UK checkout (GI "05 – Checkout page"). Add the composite goggle, walk to the
// FunnelKit Aero (WFACP) checkout via cart (customer clicks, rule 30), and assert
// the order summary totals are consistent: subtotal carries the cart price through
// and total = subtotal + shipping (UK is tax-exclusive at these totals).
import { test } from '../../../fixtures';
import { REGIONS, addCompositeToCart, goToCart, goToCheckoutFromCart, readCheckoutTotals } from '../../../helpers/melon';
import { assertCheckoutTotals } from '../../../helpers/assertions';

test.describe('UK — checkout', { tag: ['@plugin:woocommerce', '@plugin:funnelkit-funnel-builder'] }, () => {
  test('MO-UK-CHECKOUT-01 – checkout order summary totals are consistent', async ({ shopperPage }) => {
    const cart = await addCompositeToCart(shopperPage, REGIONS.uk);
    await goToCart(shopperPage);
    await goToCheckoutFromCart(shopperPage);
    const totals = await readCheckoutTotals(shopperPage);
    await assertCheckoutTotals(cart, totals);
  });
});
