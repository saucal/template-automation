// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Open Studio - Basic WooCommerce Tests - Guest"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { blockImageSizes } from '../helpers/common-steps-for-all-projects';

async function _giEval(page: any, fn: any, vars: any): Promise<any> {
  for (let i = 0; i < 3; i++) {
    try { return await page.evaluate(fn, vars); }
    catch (e: any) {
      if (i < 2 && /Execution context was destroyed|Target page, context or browser has been closed|frame got detached/i.test(e?.message || '')) {
        await page.waitForLoadState('domcontentloaded').catch(() => {});
        continue;
      }
      throw e;
    }
  }
}

test.describe('Open Studio - Basic WooCommerce Tests - Guest', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('01 - Home Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await blockImageSizes(page, vars);
  });

  test('02 - Courses Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await page.locator(`a[href="${vars.startUrl ?? ''}courses/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`a[href*="/instructors/"].button`).first()).toContainText(`Browse by Instructors`);
  });

  test('03 - Instructors Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await page.locator(`a[href="${vars.startUrl ?? ''}instructors/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await expect(page.locator(`a[href*="/courses/"].button`).first()).toContainText(`Browse by Instrument`);
  });

  test('04 - Mentor Sessions Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    {
      const _lbl = page.locator(`label[for="os-open-menu"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#os-open-menu`).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.locator(`li#menu-item-1123032 > a[href*="/mentor-sessions/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('05 - Pro Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.goto(`${vars.startUrl ?? ''}pro/`);
    await page.waitForLoadState('load');
    await page.waitForLoadState('load');
  });

  test('06 - Podcasts Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.goto(`${vars.startUrl ?? ''}podcasts/`);
    await page.waitForLoadState('load');
    await page.waitForLoadState('load');
  });

  test('07 - About Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`a[href="${vars.startUrl ?? ''}about-us/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('08 - Contact Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await page.locator(`a[href="${vars.startUrl ?? ''}contact/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('09 - Career Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await page.goto(`${vars.startUrl ?? ''}careers/`);
    await page.waitForLoadState('load');
    await page.waitForLoadState('load');
  });

  test('10 - Terms Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await page.locator(`a[href="${vars.startUrl ?? ''}terms-of-service/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('11 - P&P Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
    await page.locator(`a[href="${vars.startUrl ?? ''}privacy-policy/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('12 - Menu desktop', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    {
      const _lbl = page.locator(`label[for="os-open-menu"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#os-open-menu`).filter({ visible: true }).first().click({ force: true }); }
    }
    await expect(page.locator(`#primary-menu > .menu-item.menu-item-type-post_type_archive.menu-item-object-artist > a[href*="/instructors/"]`).first()).toHaveText(`Instructors`);
    await expect(page.locator(`#primary-menu > .menu-item.menu-item-type-custom.menu-item-object-custom > a[href*="/courses"]`).first()).toHaveText(`Courses & Lessons`);
    await expect(page.locator(`#primary-menu > li.menu-item.menu-item-type-post_type.menu-item-object-page:nth-of-type(3) > a[href*="/events/"]`).first()).toHaveText(`Live Schedule`);
    await expect(page.locator(`li#menu-item-1123032 > a[href*="/mentor-sessions/"]`).first()).toHaveText(`Mentor Sessions`);
    await expect(page.locator(`a[href*="/gps/"]`).first()).toContainText(`Guided Practice Sessions`);
    await blockImageSizes(page, vars);
  });

  test('12 - Menu Mobile', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`svg.kadence-svg-icon.kadence-menu-svg`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`#mobile-menu > .menu-item.menu-item-type-post_type_archive.menu-item-object-artist > a[href*="/instructors/"]`).first()).toContainText(`Instructors`);
    await expect(page.locator(`#mobile-menu > .menu-item.menu-item-type-post_type_archive.menu-item-object-sfwd-courses > a[href*="/courses/"]`).first()).toContainText(`Courses`);
    await expect(page.locator(`#mobile-menu > .menu-item.menu-item-type-post_type.menu-item-object-page > a[href*="/events/"]`).first()).toContainText(`Live Sessions`);
    await expect(page.locator(`div:nth-child(2) > div > button.drawer-toggle.header-account-button > span.header-account-label`).first()).toContainText(`Login`);
  });

  test('13 - Instructor page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`#os-open-menu > span:nth-of-type(3)`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`#primary-menu > .menu-item.menu-item-type-post_type_archive.menu-item-object-artist > a[href*="/instructors/"]`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href*="/instructors/peter-martin/"] > img.attachment-large.size-large.wp-post-image`).filter({ visible: true }).first().click({ force: true });
  });

  test('14 - Course Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.goto(`${vars.startUrl ?? ''}courses/`);
    await page.waitForLoadState('load');
    await page.locator(`a[href*="/piano/"].os-instruments-grid__instrument`).filter({ visible: true }).first().click({ force: true });
    await page.locator(`a[href*="/courses/jazz-piano-jump-start"] > img.attachment-woocommerce_single.size-woocommerce_single`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`a[href*="/join/"]`).first()).toContainText(`Join now`);
  });

  test('15 - Live Sessions Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    {
      const _lbl = page.locator(`label[for="os-open-menu"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#os-open-menu`).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.locator(`#primary-menu > li.menu-item.menu-item-type-post_type.menu-item-object-page:nth-of-type(3) > a[href*="/events/"]`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
    await page.waitForTimeout(5000);
    await expect(page.locator(`td:nth-of-type(2) > div.os-calendar-event-item.os-calendar-event-item-pro:nth-of-type(1) > .os-calendar-event-item-header > .os-calendar-event-item-header-content > .os-calendar-event-item-date > span`).first()).toContainText(`GMT 0`);
    expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let timeZone = Array.from<any>(document.querySelectorAll('.os-calendar-event-item-date > span'))
let length = timeZone.length
let boolean = true
let gmt = new Date().getTimezoneOffset() / -60
let i = 0
while (boolean === true && i < length ) {
    if (timeZone[i].innerText != 'GMT '+gmt ) {
        boolean = false
    }
    i++
}

return boolean
 }, vars)).toBeTruthy();
  });

  test('16 - Session page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.goto(`${vars.startUrl ?? ''}events/`);
    await page.waitForLoadState('load');
    await page.waitForTimeout(10000);
    await page.waitForLoadState('load');
    await page.waitForTimeout(2000);
    await page.locator(`div.os-calendar-event-item.os-calendar-event-item-pro:not(.os-calendar-event-item-past) > div > div > a`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.os-single-event__join`).first()).toContainText(`You need to be an Open Studio Pro member to attend this session.`);
    await expect(page.locator(`a[href*="pro"].button`)).not.toHaveCount(0);
    await expect(page.locator(`a[href*="pro"].button`).first()).toContainText(`Join now`);
    await page.locator(`div.os-sessions-back-link > a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForTimeout(10000);
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let elements = Array.from<any>(document.querySelectorAll<HTMLAnchorElement>('div.os-calendar-event-item:not(.os-calendar-event-item-past):not(.os-calendar-event-item-pro) > div > div > a'));
return elements.length === 0 }, vars)) {
      await page.locator(`a:nth-of-type(2).os-event-navigation-link`).filter({ visible: true }).first().click({ force: true });
    }
    await page.waitForLoadState('load');
    await page.waitForTimeout(10000);
    if (await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let elements = Array.from<any>(document.querySelectorAll<HTMLAnchorElement>('div.os-calendar-event-item:not(.os-calendar-event-item-past):not(.os-calendar-event-item-pro) > div > div > a'));
return elements.length >= 1 }, vars)) {
      await page.locator(`div.os-calendar-event-item:not(.os-calendar-event-item-past):not(.os-calendar-event-item-pro) > div > div > a`).filter({ visible: true }).first().click({ force: true });
    }
    if (page.url().includes(vars.startUrlos-sessions/')) {
      await expect(page.locator(`.os-single-event__join`).or(page.locator(`.os-event-join-event.os-login`))).not.toHaveCount(0);
    }
    if (page.url().includes(vars.startUrlos-sessions/')) {
      await page.locator(`div > div.os-sessions-back-link > a`).filter({ visible: true }).first().click({ force: true });
    }
    if (page.url().includes(vars.startUrlos-sessions/')) {
      await page.waitForTimeout(1500);
    }
    await page.locator(`tbody > tr > td > div.os-calendar-event-item-pro > div.os-calendar-event-item-header > div > a`).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`.os-single-event__joindesc`).first()).toContainText(`You need to be an Open Studio Pro member to attend this session.
Join now`);
    await expect(page.locator(`.os-single-event__join a[href*="/join/"].button`).or(page.locator(`div.entry-content.single-content a`))).not.toHaveCount(0);
    await expect(page.locator(`.os-single-event__join a[href*="/join/"].button`).or(page.locator(`div.entry-content.single-content a`)).first()).toHaveText(`Join now`);
  });

  test('18 - Join OS Membership - Checkout page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`xpath=//a[contains(text(), "Join today")]`).or(page.locator(`a[href*="/join"].button.header-button`)).filter({ visible: true }).first().click({ force: true });
    await expect(page.locator(`a[href*="/checkout/?add-to-cart=17&quantity=1"]`).first()).toContainText(`Start Free Trial`);
    await page.locator(`a[href*="/checkout/?add-to-cart=17&quantity=1"]`).filter({ visible: true }).first().click({ force: true });
  });

  test('19 - Instrument Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    {
      const _lbl = page.locator(`label[for="os-open-menu"]`).filter({ visible: true });
      if (await _lbl.count() > 0) { await _lbl.first().click(); }
      else { await page.locator(`#os-open-menu`).filter({ visible: true }).first().click({ force: true }); }
    }
    await page.goto(`${vars.startUrl ?? ''}courses`);
    await page.waitForLoadState('load');
    await page.locator(`a[href*="/piano/"].os-instruments-grid__instrument`).filter({ visible: true }).first().click({ force: true });
  });

});
