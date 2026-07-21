// EU product page (GI "03 – Product page", EU Site). Reach the composite goggle the
// customer way (rule 30): home → "Bike" mega-menu → product tile, then assert the page
// loads with title, price and add-to-cart (behaviour/existence, rule 35). On EU the
// goggle flyout is under the "Bike" trigger (UK uses "Goggles").
import { test } from '../../../fixtures';
import { REGIONS, EU_PRODUCTS, openProductViaMegaMenu } from '../../../helpers/melon';
import { assertProductPage } from '../../../helpers/assertions';

test.describe('EU — product page', { tag: ['@plugin:woocommerce', '@plugin:woocommerce-composite-products', '@plugin:megamenu'] }, () => {
  test('MO-EU-PROD-01 – composite goggle product page loads', async ({ shopperPage }) => {
    await openProductViaMegaMenu(shopperPage, REGIONS.eu, EU_PRODUCTS.goggles);
    await assertProductPage(shopperPage, EU_PRODUCTS.goggles, REGIONS.eu.symbol);
  });
});
