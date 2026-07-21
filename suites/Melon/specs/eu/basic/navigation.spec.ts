// EU mega-menu navigation (GI "02 – Accessories Page", EU Site). Like UK, GI's
// zero-assertion nav smoke becomes a behaviour check (rules 11/35): open the mega-menu
// trigger and follow its flyout category link to a populated category, all by real
// customer hover+click (rule 30). GI's "02 – Bike Menu" menu-open smoke is folded
// (see EU_MENU_NAVS). On EU the accessories flyout is under the "Extras" trigger.
import { test } from '../../../fixtures';
import { REGIONS, EU_MENU_NAVS, primeRegion, navigateToCategory } from '../../../helpers/melon';
import { assertOnCategory } from '../../../helpers/assertions';

test.describe('EU — mega-menu navigation', { tag: ['@plugin:woocommerce', '@plugin:megamenu'] }, () => {
  for (const nav of EU_MENU_NAVS) {
    test(`MO-EU-NAV – ${nav.name} menu → category`, async ({ shopperPage }) => {
      await primeRegion(shopperPage, REGIONS.eu);
      await navigateToCategory(shopperPage, nav.trigger, nav.category);
      await assertOnCategory(shopperPage, nav.category);
    });
  }
});
