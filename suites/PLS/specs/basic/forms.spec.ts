// Lead/contact form suite — replaces GI Basic 03 (Dental Hygiene Clinical Skills
// Refresher inquiry), 04 (CE Requirements by State search) and 08 (Contact page).
//
// The GI export targeted Elementor field ids; the site now renders KADENCE
// advanced forms (site drift — docs/site-exploration.md), so fields are matched
// by their visible labels (stable across form-builder re-IDs) with the Kadence
// success notice as the submit gate. Navigation uses the real menus (rule 30
// spirit): the Courses submenu for 03/04, the header Contact link for 08.
//
// Thin specs: fills via resilient wrappers, asserts in assertions.ts (rule 6).
import { test } from '../../fixtures';
import {
  dismissPopups,
  emailForTest,
  goToCoursesSubmenuItem,
} from '../../helpers/pls';
import {
  assertKadenceFormSuccess,
  assertStateSearchResults,
} from '../../helpers/assertions';
import { ctxFor, resilientClick, resilientFill, resilientSelect } from '../../helpers/resilient';

test.describe('PLS Forms', { tag: ['@plugin:kadence-blocks', '@plugin:woocommerce'] }, () => {
  test('PLS-FORM-01 — refresher-course inquiry form submits', async ({ shopperPage: page }) => {
    const ctx = ctxFor(page);
    await page.goto('./');
    await page.waitForLoadState('load');
    await dismissPopups(page);

    await goToCoursesSubmenuItem(page, 'Dental Hygiene Clinical Skills Refresher');

    await resilientFill(ctx, { primary: page.getByLabel(/^name/i).first(), ai: 'the inquiry form Name field' }, 'QA Testing');
    await resilientFill(ctx, { primary: page.getByLabel(/^email/i).first(), ai: 'the inquiry form Email field' }, emailForTest('form_refresher'));
    await resilientFill(ctx, { primary: page.getByLabel(/^phone/i).first(), ai: 'the inquiry form Phone field' }, '1231231234');
    await resilientFill(ctx, { primary: page.getByLabel(/currently licensed/i).first(), ai: 'the inquiry form Currently licensed field' }, 'yes');
    await resilientFill(ctx, { primary: page.getByLabel(/why are you interested/i).first(), ai: 'the inquiry form message field' }, 'Testing message');

    await resilientClick(ctx, {
      primary: page.locator('.kb-advanced-form button[type="submit"], form.kb-advanced-form button').first(),
      alt: page.getByRole('button', { name: /submit/i }).first(),
      ai: 'the inquiry form Submit button',
    });
    await assertKadenceFormSuccess(page);
  });

  test('PLS-FORM-02 — CE requirements by state search returns the state', async ({ shopperPage: page }) => {
    const ctx = ctxFor(page);
    await page.goto('./');
    await page.waitForLoadState('load');
    await dismissPopups(page);

    await goToCoursesSubmenuItem(page, 'CE Requirements by State');

    // #csearch is a state <select> (AL … WY) inside form.search-courses-form.
    await resilientSelect(ctx, { primary: page.locator('#csearch'), ai: 'the state search dropdown' }, 'FL');
    await resilientClick(ctx, {
      primary: page.locator('form.search-courses-form input[type="submit"], form.search-courses-form button[type="submit"]').first(),
      alt: page.getByRole('button', { name: /search/i }).first(),
      ai: 'the state search submit button',
    });
    await page.waitForLoadState('load');
    await assertStateSearchResults(page, /florida/i);
  });

  test('PLS-FORM-03 — contact form submits', async ({ shopperPage: page }) => {
    const ctx = ctxFor(page);
    await page.goto('./');
    await page.waitForLoadState('load');
    await dismissPopups(page);

    await resilientClick(ctx, {
      primary: page.getByRole('navigation', { name: /primary/i }).getByRole('link', { name: /^contact$/i }).first(),
      alt: page.locator('nav a[href*="/contact-us/"]').first(),
      ai: 'the Contact entry in the primary menu',
    });
    await page.waitForLoadState('load');

    await resilientFill(ctx, { primary: page.getByLabel(/first name/i).first(), ai: 'the contact form First Name field' }, 'QA');
    await resilientFill(ctx, { primary: page.getByLabel(/last name/i).first(), ai: 'the contact form Last Name field' }, 'Testing');
    await resilientFill(ctx, { primary: page.getByLabel(/professional title/i).first(), ai: 'the contact form Professional Title field' }, 'QA Engineer');
    await resilientFill(ctx, { primary: page.getByLabel(/^email/i).first(), ai: 'the contact form Email field' }, emailForTest('form_contact'));
    await resilientFill(ctx, { primary: page.getByLabel(/^phone/i).first(), ai: 'the contact form Phone field' }, '1231231234');
    await resilientFill(ctx, { primary: page.getByLabel(/subject/i).first(), ai: 'the contact form Subject field' }, 'Testing Subject');
    await resilientFill(ctx, { primary: page.getByLabel(/message/i).first(), ai: 'the contact form Message field' }, 'Testing message');

    await resilientClick(ctx, {
      primary: page.locator('.kb-advanced-form button[type="submit"], form.kb-advanced-form button').first(),
      alt: page.getByRole('button', { name: /submit|send/i }).first(),
      ai: 'the contact form Submit button',
    });
    await assertKadenceFormSuccess(page);
  });
});
