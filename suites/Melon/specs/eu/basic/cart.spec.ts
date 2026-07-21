// EU cart (GI "04 – Cart Page", EU Site). Configure the composite goggle, add it, go
// to the cart via the "View cart" notice (customer click, rule 30), and assert the cart
// lists the product with a subtotal matching the captured unit price × qty. Prices are
// EUR with comma decimals ("€80,00") — money() parses both locales.
import { test } from '../../../fixtures';
import { REGIONS, addCompositeToCart, goToCart } from '../../../helpers/melon';
import { assertCartContents } from '../../../helpers/assertions';

test.describe('EU — cart', { tag: ['@plugin:woocommerce', '@plugin:woocommerce-composite-products', '@plugin:funnelkit-cart'] }, () => {
  test('MO-EU-CART-01 – composite goggle adds to cart with correct subtotal', async ({ shopperPage }) => {
    const cart = await addCompositeToCart(shopperPage, REGIONS.eu);
    await goToCart(shopperPage);
    await assertCartContents(shopperPage, cart);
  });
});
