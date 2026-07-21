// Melon Optics — Playwright config.
//
// Environments are the PROJECT dimension (rule 34): Melon runs on two separate
// hosts (maintenance + staging), each its own project with its own baseURL.
// Region (uk/eu/us) is NOT a project — all regions live on ONE host, reached at
// runtime via the `?mocs=` country switch (see helpers/melon.ts). Regions are a
// spec-folder + config dimension (specs/uk, specs/eu).
//
// Auth is lazy per-env (rule 32, helpers/admin-login.ts) — no globalSetup, so we
// only authenticate the host we actually run.
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '.env') });

// Each environment → one project. `main` reads BASE_URL_MAIN, falls back to BASE_URL.
const ENVIRONMENTS = ['maintenance', 'staging'] as const;
const baseUrlFor = (env: string): string | undefined =>
  process.env[`BASE_URL_${env.toUpperCase()}`] ?? process.env.BASE_URL;

export default defineConfig({
  testDir: './specs',
  timeout: 240_000,
  expect: { timeout: 15_000, toHaveScreenshot: { maxDiffPixelRatio: 0.1 } },
  fullyParallel: false,
  workers: 2,
  retries: process.env.CI ? 1 : 0,
  reporter: [['html', { outputFolder: 'reports', open: 'never' }], ['list']],
  use: {
    actionTimeout: 15_000,
    // Composite product pages build slowly on the maintenance host — the configurator
    // resolves the combination + loads per-component images, so `load` fires ~11s (DCL
    // ~10s, barely faster). Actions stay tight at 15s; only navigations get headroom so
    // these heavy pages don't flake at the edge of the budget under parallel load.
    navigationTimeout: 45_000,
    trace: 'retain-on-failure',
    // Fixture owns the named per-context failure shot (rule 25); disable the built-in.
    screenshot: 'off',
    video: { mode: 'retain-on-failure', size: { width: 1280, height: 720 } },
    launchOptions: { slowMo: 250 },
    ignoreHTTPSErrors: true,
  },
  // No top-level use.baseURL — the per-project baseURL must win (rule 34).
  projects: ENVIRONMENTS.map((env) => ({
    name: env,
    use: { ...devices['Desktop Chrome'], baseURL: baseUrlFor(env) },
  })),
});
