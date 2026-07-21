// EU home (GI "01 – Home Page", EU Site). Assert the EU home loads on the right blog
// (title "Melon Optics EU", country Germany, currency EUR). The DE→/eu/ redirect and
// the full country-switch matrix are already covered by the UK home spec (rule 11) —
// not duplicated here.
import { test } from '../../../fixtures';
import { REGIONS, primeRegion } from '../../../helpers/melon';
import { assertOnRegionHome, assertCountryAndCurrency } from '../../../helpers/assertions';

test.describe('EU — home', { tag: ['@plugin:woocommerce', '@plugin:melon-optics-geolocation'] }, () => {
  test('MO-EU-HOME-01 – EU home page loads on the EU storefront', async ({ shopperPage }) => {
    await primeRegion(shopperPage, REGIONS.eu);
    await assertOnRegionHome(shopperPage, REGIONS.eu);
    await assertCountryAndCurrency(shopperPage, {
      mocs: REGIONS.eu.mocs,
      country: REGIONS.eu.country,
      currency: REGIONS.eu.currency,
      title: REGIONS.eu.title,
    });
  });
});
