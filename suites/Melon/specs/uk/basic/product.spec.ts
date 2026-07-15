// UK product page (GI "03 – Product page"). GI captured price/description but
// asserted nothing (it fed the cart/checkout tests). As a standalone basic test,
// assert the composite product page loads with title, price and add-to-cart
// (behaviour/existence, rule 35). The full component-selection + price parity is
// exercised by the cart/checkout specs.
import { test } from '../../../fixtures';
import { REGIONS, PRODUCTS, openProduct } from '../../../helpers/melon';
import { assertProductPage } from '../../../helpers/assertions';

test.describe('UK — product page', { tag: ['@plugin:woocommerce', '@plugin:woocommerce-composite-products'] }, () => {
  test('MO-UK-PROD-01 – composite goggle product page loads', async ({ shopperPage }) => {
    await openProduct(shopperPage, REGIONS.uk, PRODUCTS.goggles);
    await assertProductPage(shopperPage, PRODUCTS.goggles);
  });
});
