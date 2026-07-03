import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '.env') });

// One project per region × tier — `au-preprod`, `au-develop`, `ca-preprod`, … — so
// the VS Code Test Explorer shows a separate list per tier (same tests) and the CLI
// selects with `--project=au-develop`.
import { baseUrlFor, REGIONS, TIERS } from './env-tier';

export default defineConfig({
  // Refactored, region-grouped suite lives in ./specs (generated/ kept for reference, not run).
  testDir: './specs',
  timeout: 240_000,
  expect: {
    timeout: 15_000,
    toHaveScreenshot: { maxDiffPixelRatio: 0.15 },
  },
  fullyParallel: false,
  workers: 2,
  retries: process.env.CI ? 1 : 0,
  reporter: [
    ['html', { outputFolder: 'reports', open: 'never' }],
    ['list'],
  ],
  use: {
    viewport: { width: 1920, height: 1080 },
    actionTimeout: 15_000,
    // Failure-only artifacts: recorded every test, kept & attached only on failure
    // (the fixture discards them on pass).
    trace: 'retain-on-failure',
    // 'off' on purpose: the runner instruments the shared chromium, so the built-in
    // failure screenshot DOES fire on our manual contexts and attaches a duplicate
    // screenshot.png. The fixture owns the named per-context shot (rule 25).
    screenshot: 'off',
    video: { mode: 'retain-on-failure' },
    launchOptions: { slowMo: 500 },
    ignoreHTTPSErrors: true,
  },
  // Region is the outermost dimension (rule 11). AU is a standalone host; CA/US are
  // multisite subsites under a shared parent host (baseURL ends with /ca/ or /us/,
  // trailing slash REQUIRED). All goto() calls are relative (rule 12).
  //
  // Each region×tier is TWO projects: a `setup-<name>` project (auth.setup.ts) that
  // logs the admin into that site, and the `<name>` test project that DEPENDS on it.
  // Playwright runs a project's dependency only when that project runs, so selecting
  // `--project=au-preprod` authenticates ONLY the AU preprod host — no global login
  // into hosts you're not testing. No globalSetup.
  //
  // Refund/destructive specs are gated to one region by REFUND_PROJECT via a
  // test.skip guard inside place-order.spec.ts — not by testMatch.
  //
  // NB: no X-Forwarded-For / X-Real-IP AU-geolocation spoof (AU GST is shop-base, shown
  // without it). A context-wide XFF header also broke PayPal — its CDN rejects
  // cross-origin assets carrying a client-spoofed XFF. If GST ever needs forcing for a
  // non-AU runner, scope the header to the SUT host (context.route) or use an AU proxy.
  projects: REGIONS.flatMap((region) =>
    TIERS.flatMap((tier) => {
      const name = `${region}-${tier}`;
      const use = { ...devices['Desktop Chrome'], baseURL: baseUrlFor(region, tier) };
      return [
        { name: `setup-${name}`, testMatch: /auth\.setup\.ts$/, use },
        { name, use, testMatch: [`${region}/**`], dependencies: [`setup-${name}`] },
      ];
    })
  ),
});
