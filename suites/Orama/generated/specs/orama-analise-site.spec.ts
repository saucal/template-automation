// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Orama analise site"
// Review all TODOs before running.
import dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';

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

test.describe('Orama analise site', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('Estratégias Mensais - Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`#menu-item-232 > a > span`).first().hover();
    await page.locator(`#menu-item-1188 > a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('Fundos de Investimento - Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`#menu-item-232 > a > span`).first().hover();
    await page.locator(`#menu-item-2136 > a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('Fundos Imobiliários e FIAgro - Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`#menu-item-232 > a > span`).first().hover();
    await page.locator(`#menu-item-1218 > a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('Home Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.waitForLoadState('load');
  });

  test('Mapa de Tendencias - Category Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`#menu-item-111 > a > span`).first().hover();
    await page.locator(`#menu-item-87 > a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('Panorama Diario - Category Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`#menu-item-111 > a > span`).first().hover();
    await page.locator(`#menu-item-15423 > a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('Panorama Politico - Category Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`#menu-item-111 > a > span`).first().hover();
    await page.locator(`#menu-item-3341 > a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('Projeções Macro - Category Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`#menu-item-111 > a > span`).first().hover();
    await page.locator(`#menu-item-934 > a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('Renda Fixa - Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`#menu-item-232 > a > span`).first().hover();
    await page.locator(`#menu-item-1199 > a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

  test('Textos Tematicos - Category Page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    await page.locator(`#menu-item-111 > a > span`).first().hover();
    await page.locator(`#menu-item-90 > a`).filter({ visible: true }).first().click({ force: true });
    await page.waitForLoadState('load');
  });

});
