// UK product page (GI "03 – Product page"). GI captured price/description but
// asserted nothing (it fed the cart/checkout tests). As a standalone basic test,
// assert the composite product page loads with title, price and add-to-cart
// (behaviour/existence, rule 35). The full component-selection + price parity is
// exercised by the cart/checkout specs.
import { test } from '../../../fixtures';
import { REGIONS, PRODUCTS, openProductViaMegaMenu } from '../../../helpers/melon';
import { assertProductPage } from '../../../helpers/assertions';

test.describe('UK — product page', { tag: ['@plugin:woocommerce', '@plugin:woocommerce-composite-products', '@plugin:megamenu'] }, () => {
  // Reach the product the customer way (rule 30): home → Goggles mega-menu → tile.
  // The goggle is not on the shop grid, so the flyout is the only click-path.
  test('MO-UK-PROD-01 – composite goggle product page loads', async ({ shopperPage }) => {
    await openProductViaMegaMenu(shopperPage, REGIONS.uk, PRODUCTS.goggles);
    await assertProductPage(shopperPage, PRODUCTS.goggles);
  });
});
