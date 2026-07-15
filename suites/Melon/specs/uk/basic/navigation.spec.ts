// UK mega-menu navigation (GI "02 – Accessories Page"). GI had no assertions (nav
// smoke); per rules 11/35 this becomes a behaviour check: hovering the mega-menu
// trigger reveals the flyout and its category link navigates to a populated
// category. All navigation is by real customer hover+click, never goto (rule 30).
// GI's "02 – Sunglasses Menu" (menu-open-only smoke) is folded — see UK_MENU_NAVS.
import { test } from '../../../fixtures';
import { REGIONS, UK_MENU_NAVS, primeRegion, navigateToCategory } from '../../../helpers/melon';
import { assertOnCategory } from '../../../helpers/assertions';

test.describe('UK — mega-menu navigation', { tag: ['@plugin:woocommerce', '@plugin:megamenu'] }, () => {
  for (const nav of UK_MENU_NAVS) {
    test(`MO-UK-NAV – ${nav.name} menu → category`, async ({ shopperPage }) => {
      await primeRegion(shopperPage, REGIONS.uk);
      await navigateToCategory(shopperPage, nav.trigger, nav.category);
      await assertOnCategory(shopperPage, nav.category);
    });
  }
});
