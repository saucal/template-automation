// PLS refactored suite config. Two environments (sites), one Chromium project
// each — pick one with `--project=maintenance` / `--project=main`, or run both
// by omitting `--project`. generated/ is kept for reference only and never run;
// the refactored suite lives in ./specs.
//
// Each environment's base URL comes from .env (BASE_URL_<ENV>, trailing slash —
// all goto() calls are relative), falling back to BASE_URL. Admin auth is LAZY
// and PER-SITE: the admin/email fixtures call ensureAdminState with the project's
// name + baseURL on first use (auth/admin-<project>.json), so only the site you
// actually run authenticates — no globalSetup, no fake "setup" test entry.
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '.env') });

// The two PLS sites. .env holds one base-URL key per env:
//   BASE_URL_MAINTENANCE=https://pls-maintenance.mystagingwebsite.com/
//   BASE_URL_MAIN=https://pls.mystagingwebsite.com/
const ENVIRONMENTS = ['maintenance', 'main'] as const;
const baseUrlFor = (env: string): string | undefined =>
  process.env[`BASE_URL_${env.toUpperCase()}`] ?? process.env.BASE_URL;

export default defineConfig({
  testDir: './specs',
  timeout: 240_000,
  expect: {
    timeout: 15_000,
    toHaveScreenshot: { maxDiffPixelRatio: 0.15 },
  },
  fullyParallel: false,
  workers: 2,
  // The pls-core/WC Blocks multi-step wizard intermittently orphans the cart
  // between steps ("Cannot create order from empty cart" at Place Order) — a
  // platform-level session race, not a selector issue. Retries absorb it.
  retries: process.env.CI ? 2 : 1,
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
    launchOptions: { slowMo: 250 },
    ignoreHTTPSErrors: true,
  },
  // One project per environment; each carries its own baseURL. The fixtures key
  // per-site admin auth off the project name (auth/admin-<project>.json).
  projects: ENVIRONMENTS.map((env) => ({
    name: env,
    use: { ...devices['Desktop Chrome'], baseURL: baseUrlFor(env) },
  })),
});
