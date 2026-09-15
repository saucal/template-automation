// @ts-nocheck
// Auto-generated from Ghost Inspector suite: "Inspire Gateway - Common Steps for suites"
// Review all TODOs before using in production.
import { expect, type Page } from '@playwright/test';

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

// GI: "Admin Login" (60df14afd092986f930302bd)
export async function adminLogin(page: Page, vars: Record<string, string> = {}): Promise<void> {
  try { await page.locator(`#username`).first().fill(`pluginmaintmax`); } catch { await page.locator(`#username`).first().selectOption(`pluginmaintmax`); }
  try { await page.locator(`#password`).first().fill(`%bRXXmvG$QPf%tMJT7fXTw#4`); } catch { await page.locator(`#password`).first().selectOption(`%bRXXmvG$QPf%tMJT7fXTw#4`); }
  await page.locator(`button.woocommerce-button.button.woocommerce-form-login__submit`).filter({ visible: true }).first().click({ force: true });
}

// GI: "Fill CC Info" (60de042aa120da1448ce1e57)
export async function fillCCInfo(page: Page, vars: Record<string, string> = {}): Promise<void> {
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let ccType = Array.from<any>(document.querySelectorAll<HTMLOptionElement>('#cardtype > option'));

let result = [];

    for (let i = 0; i < ccType.length; i++) {
        result.push(ccType[i].textContent);
    }
    if (result[0]==="MasterCard" && result[1]==="Visa" && result.length === 2) {
        return true;
    } else {
        return false;
    }

 }, vars)).toBeTruthy();
  try { await page.locator(`#ccnum`).first().fill(`${vars.CCard ?? ''}`); } catch { await page.locator(`#ccnum`).first().selectOption(`${vars.CCard ?? ''}`); }
  try { await page.locator(`#cardtype`).first().fill(`${vars.CCType ?? ''}`); } catch { await page.locator(`#cardtype`).first().selectOption(`${vars.CCType ?? ''}`); }
  try { await page.locator(`#expmonth`).first().fill(`${vars.month ?? ''}`); } catch { await page.locator(`#expmonth`).first().selectOption(`${vars.month ?? ''}`); }
  try { await page.locator(`#expyear`).first().fill(`${vars.year ?? ''}`); } catch { await page.locator(`#expyear`).first().selectOption(`${vars.year ?? ''}`); }
  try { await page.locator(`#cvv`).first().fill(`123`); } catch { await page.locator(`#cvv`).first().selectOption(`123`); }
  {
    const _lbl = page.locator(`label[for="saveinfo"]`).filter({ visible: true });
    if (await _lbl.count() > 0) { await _lbl.first().click(); }
    else { await page.locator(`#saveinfo`).filter({ visible: true }).first().click({ force: true }); }
  }
}

// GI: "Fill CC Info - Subscription or Save CC not setted" (60df2805f7b14768f03e4173)
export async function fillCCInfoSubscriptionOrSaveCCNotSetted(page: Page, vars: Record<string, string> = {}): Promise<void> {
  expect(await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); let ccType = Array.from<any>(document.querySelectorAll<HTMLOptionElement>('#cardtype > option'));

let result = [];

    for (let i = 0; i < ccType.length; i++) {
        result.push(ccType[i].textContent);
    }
    if (result[0]==="MasterCard" && result[1]==="Visa" && result.length === 2) {
        return true;
    } else {
        return false;
    }

 }, vars)).toBeTruthy();
  try { await page.locator(`#ccnum`).first().fill(`${vars.CCard ?? ''}`); } catch { await page.locator(`#ccnum`).first().selectOption(`${vars.CCard ?? ''}`); }
  try { await page.locator(`#cardtype`).first().fill(`${vars.CCType ?? ''}`); } catch { await page.locator(`#cardtype`).first().selectOption(`${vars.CCType ?? ''}`); }
  try { await page.locator(`#expmonth`).first().fill(`${vars.month ?? ''}`); } catch { await page.locator(`#expmonth`).first().selectOption(`${vars.month ?? ''}`); }
  try { await page.locator(`#expyear`).first().fill(`${vars.year ?? ''}`); } catch { await page.locator(`#expyear`).first().selectOption(`${vars.year ?? ''}`); }
  try { await page.locator(`#cvv`).first().fill(`123`); } catch { await page.locator(`#cvv`).first().selectOption(`123`); }
  await expect(page.locator(`#saveinfo`)).toHaveCount(0);
}

// GI: "Get transaction details" (60df53d54d555a2279c9c9e7)
export async function getTransactionDetails(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.myOrder = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  const transaction_id = 6394077009
  const url = "https://secure.inspiregateway.net/api/query.php/?security_key=G878BrDH5enF89F46tem2Fssa93DV3Ta&transaction_id="+transaction_id;
  
  let headers = new Headers();
  headers.set('Content-Type', 'text/xml; charset=utf-8');
  //headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'GET',
      mode: 'no-cors',
      headers: headers,
      })
  .then(function(response) {
    if (response.ok) {
    resolve(response.json())
    } else {
    reject(new Error('error'))
    } 
  })
}) }, vars);
}

// GI: "Woo get details" (60df2f54f7b14768f03e82c6)
export async function wooGetDetails(page: Page, vars: Record<string, string> = {}): Promise<void> {
  vars.myOrder = await _giEval(page, (vars: any) => { vars = new Proxy(vars, { get: (o, k) => (k in o ? o[k] : '') }); return new Promise(function (resolve, reject) {
  //const order = vars.orderNumber;
  const username = "ck_f807472e43ee14b9b010d9412425f9562a888ef7`; //${vars.woo_user}`; 
  const password = "cs_781254d09c1692fe2d08dfba93e5c6d7733df1d5`; //${vars.woo_pass}`; 
  const url = "https://demo:32edf066e36a@pluginmaintmax.wpengine.com/wp-json/wc/v3/orders/"+690;
  
  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  fetch(url, {method:'GET',
      //body: 'grant_type=client_credentials&client_id=' + username + '&client_secret=' + password
      headers: headers,
      })
  .then(function(response) {
    if (response.ok) {
    resolve(response.json())
    } else {
    reject(new Error('error'))
    } 
  })
}) }, vars);
}
