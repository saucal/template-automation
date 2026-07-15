// UK cart (GI "04 – Cart Page"). Configure the composite goggle, add it, go to the
// cart via the "View cart" notice (customer click, rule 30), and assert the cart
// lists the product with a subtotal matching the captured unit price × qty.
import { test } from '../../../fixtures';
import { REGIONS, addCompositeToCart, goToCart } from '../../../helpers/melon';
import { assertCartContents } from '../../../helpers/assertions';

test.describe('UK — cart', { tag: ['@plugin:woocommerce', '@plugin:woocommerce-composite-products', '@plugin:funnelkit-cart'] }, () => {
  test('MO-UK-CART-01 – composite goggle adds to cart with correct subtotal', async ({ shopperPage }) => {
    const cart = await addCompositeToCart(shopperPage, REGIONS.uk);
    await goToCart(shopperPage);
    await assertCartContents(shopperPage, cart);
  });
});
