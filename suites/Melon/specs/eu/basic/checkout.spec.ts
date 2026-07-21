// EU checkout (GI "05 – Checkout page", EU Site). Add the composite goggle, walk to the
// FunnelKit Aero (WFACP) checkout via cart (customer clicks, rule 30), and assert the
// order summary totals are consistent. EU is VAT-INCLUSIVE (the tax is inside the
// subtotal), but total = subtotal + shipping still holds — so the same total-math as UK
// applies; only the price parsing differs (EUR comma decimals, handled by money()).
import { test } from '../../../fixtures';
import { REGIONS, addCompositeToCart, goToCart, goToCheckoutFromCart, readCheckoutTotals } from '../../../helpers/melon';
import { assertCheckoutTotals } from '../../../helpers/assertions';

test.describe('EU — checkout', { tag: ['@plugin:woocommerce', '@plugin:funnelkit-funnel-builder'] }, () => {
  test('MO-EU-CHECKOUT-01 – checkout order summary totals are consistent', async ({ shopperPage }) => {
    const cart = await addCompositeToCart(shopperPage, REGIONS.eu);
    await goToCart(shopperPage);
    await goToCheckoutFromCart(shopperPage);
    const totals = await readCheckoutTotals(shopperPage);
    await assertCheckoutTotals(cart, totals);
  });
});
