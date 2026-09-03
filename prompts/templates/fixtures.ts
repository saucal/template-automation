// tests/fixtures/index.ts — woolverine provides shopperPage / mobileShopperPage / adminPage /
// emailPage (all lazy), artifacts and the lokinator stack. Only site specifics live here.
import path from 'path';
import { createTest, ensureAdminState, preseedCookieConsent } from 'woolverine';

export const { test, config } = createTest({
  checkout: 'classic', // ADAPT: 'blocks' — the live DOM outranks this, the other variant is the alt tier
  cart: 'classic',
  admin: 'hpos', // ADAPT: 'legacy' — the other storage is always the fallback
  // ADAPT: consent plugin family ('cookielawinfo' | 'cookieyes'); drop when the site shows no bar.
  shopperPrepare: async (page) => { await preseedCookieConsent(page, 'cookielawinfo'); },
  // Lazy per-project admin auth, cached + validated (throttle-safe). `prepare` = bot gates / SSO toggles.
  adminAuth: (project, baseURL) =>
    ensureAdminState({ baseURL, statePath: path.join(__dirname, '..', 'auth', `admin-${project}.json`) }),
}, path.join(__dirname, '..'));

export { expect } from 'woolverine';
