import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '.env') });

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
  globalSetup: './global-setup.ts',
  // Region is the outermost dimension (rule 11). AU is a standalone host; CA/US are
  // multisite subsites under a shared parent host (baseURL ends with /ca/ or /us/,
  // trailing slash REQUIRED). All goto() calls are relative (rule 12).
  //
  // Refund/destructive specs are gated to one region by REFUND_PROJECT via a
  // test.skip guard inside place-order.spec.ts — not by testMatch.
  projects: [
    {
      name: 'au',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.BASE_URL_AU,
        // Tax (GST) only shows when WooCommerce geolocates the visitor to AU. WC keys
        // off the request IP (WC_Geolocation::get_ip_address reads X-Forwarded-For /
        // X-Real-IP), NOT navigator.geolocation — so we spoof an AU IP via headers.
        // 139.130.4.5 = Telstra (AU). ponytail: header spoof; if go-vip's edge
        // overwrites X-Forwarded-For, switch to an AU-exit `proxy` instead.
        extraHTTPHeaders: {
          'X-Forwarded-For': process.env.AU_GEO_IP || '139.130.4.5',
          'X-Real-IP': process.env.AU_GEO_IP || '139.130.4.5',
        },
      },
      testMatch: ['au/**'],
    },
    {
      name: 'ca',
      use: { ...devices['Desktop Chrome'], baseURL: process.env.BASE_URL_CA },
      testMatch: ['ca/**'],
    },
    {
      name: 'us',
      use: { ...devices['Desktop Chrome'], baseURL: process.env.BASE_URL_US },
      testMatch: ['us/**'],
    },
  ],
});
