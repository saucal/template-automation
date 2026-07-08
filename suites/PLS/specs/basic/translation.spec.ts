// Weglot translation — replaces GI Basic 17 (Transaltion [sic]). Switches the
// site to Spanish via the header language menu, asserts the primary nav renders
// Spanish labels, switches back and asserts English.
//
// GI also matched two home-page list paragraphs verbatim — content-managed copy
// that drifts (its asserts were already optional/try-catch in the export), so
// the stable regression surface kept here is the translated MENU (rule 35).
import { test } from '../../fixtures';
import { dismissPopups } from '../../helpers/pls';
import { assertMenuLanguage } from '../../helpers/assertions';
import { ctxFor, resilientClick } from '../../helpers/resilient';

test.describe('PLS Translation', { tag: ['@plugin:weglot'] }, () => {
  test('PLS-I18N-01 — ES switch translates the menu, EN switch restores it', async ({ shopperPage: page }) => {
    const ctx = ctxFor(page);
    await page.goto('./');
    await page.waitForLoadState('load');
    await dismissPopups(page);

    await assertMenuLanguage(page, 'en');

    // The Weglot menu renders EN as a parent with ES beneath (hover to reveal).
    await page.locator('li.weglot-parent-menu-item').first().hover().catch(() => {});
    await resilientClick(ctx, {
      primary: page.locator('a[href*="/es/"]').filter({ visible: true }).first(),
      alt: page.locator('li.menu-item-weglot a').filter({ hasText: /^es$/i }).first(),
      ai: 'the ES language switcher link',
    });
    await page.waitForURL('**/es/**', { timeout: 15_000 });
    await page.waitForLoadState('load');
    await assertMenuLanguage(page, 'es');

    await page.locator('li.weglot-parent-menu-item').first().hover().catch(() => {});
    await resilientClick(ctx, {
      primary: page.locator('li.menu-item-weglot a').filter({ hasText: /^en$/i }).first(),
      alt: page.locator('a[title="English"]').first(),
      ai: 'the EN language switcher link',
    });
    await page.waitForLoadState('load');
    await assertMenuLanguage(page, 'en');
  });
});
