// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Chris Test"
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

test.describe('Chris Test', () => {

  const vars = new Proxy<Record<string, string>>({
    "email": `qa+gi_order_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailReg": `qa+gi_reg_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "emailForgot": `qa+gi_forgot_${Math.random().toString(36).substring(2, 10)}@saucal.com`,
    "payPalUser": "qa+gi_sb-8eg0v132169@saucal.com",
    "payPalPass": process.env.PAY_PAL_PASS ?? '',
    "adminUser": "saucal_maintenance_admin",
    "adminPass": process.env.ADMIN_PASS ?? '',
  }, { get: (o: Record<string, string>, k: string) => (k in o ? o[k] : '') });

  test('Home page', async ({ page }) => {
    await page.goto(`/`);
    await page.waitForLoadState('load');

    vars.extraFilter = ``;
    vars.limit = `1000`;
    vars.email = `test+saucal-qep0rv@playgrounds.saucal.io`;
    vars.emails = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(async (resolve, reject) => {
        try {
            // Create a URLSearchParams object to hold the POST request data
            const data = new URLSearchParams();
            data.append('action', 'fetch_mail'); // The 'action' to call the PHP function
            data.append('email', `${vars.email}`);
            data.append('extraFilter', `${vars.extraFilter}`);
            data.append('limit', vars.limit);

            // Perform the AJAX request directly in the browser console
            const response = await fetch(ajax_object.ajax_url, { // Replace with your site URL
                method: 'POST',
                body: data,
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            // Convert the response to JSON
            const result = await response.json();

            // Check if the request was successful
            if (result.success) {
                resolve(JSON.parse(result.data)); // Resolve with the mail data
            } else {
                reject(new Error('Failed to fetch mail'));
            }
        } catch (error) {
            reject(error); // Reject the promise with the caught error
        }
}) }, vars);
    vars.emailURL = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let messages = vars.emails
const id = messages.messages[0].ID

return 'https://mail.playgrounds.saucal.io/view/'+ id +'.html' }, vars);
    await page.goto(`${vars.emailURL ?? ''}`);
    await page.waitForLoadState('load');
  });

});
