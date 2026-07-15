// UK home + country switcher.
//
// Collapses GI's "01 – Home Page" + its 6 "Home Page – <region>" variants into
// two tests (rules 11/35): one asserts the UK home loads on the right blog; one
// parameterizes the country-switcher matrix (prime ?mocs= → assert redirect +
// selected country). The `?mocs=` model replaces IP geolocation entirely.
import { test } from '../../../fixtures';
import { REGIONS, COUNTRY_SWITCHES, primeRegion, switchCountry } from '../../../helpers/melon';
import { assertOnRegionHome, assertRegionLanding, assertCountryAndCurrency } from '../../../helpers/assertions';

test.describe('UK — home & country switcher', { tag: ['@plugin:woocommerce', '@plugin:melon-optics-geolocation'] }, () => {
  test('MO-UK-HOME-01 – UK home page loads on the UK storefront', async ({ shopperPage }) => {
    await primeRegion(shopperPage, REGIONS.uk);
    await assertOnRegionHome(shopperPage, REGIONS.uk);
    await assertCountryAndCurrency(shopperPage, {
      mocs: REGIONS.uk.mocs,
      country: REGIONS.uk.country,
      currency: REGIONS.uk.currency,
      title: REGIONS.uk.title,
    });
  });

  for (const sw of COUNTRY_SWITCHES) {
    test(`MO-UK-HOME-02 – switch country to ${sw.country} → ${sw.landsOn}`, async ({ shopperPage }) => {
      // Start on UK root so the switch is exercised from the main site each time.
      await primeRegion(shopperPage, REGIONS.uk);
      await switchCountry(shopperPage, sw);
      await assertRegionLanding(shopperPage, sw);
    });
  }
});
