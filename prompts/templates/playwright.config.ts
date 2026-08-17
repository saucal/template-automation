// Template for playwright.config.ts — copy into project root, adapt projects[]
// to the suite. WC tests share DB state; default sequential, raise workers
// only after confirming spec isolation.
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '.env') });

export default defineConfig({
  testDir: './specs',
  timeout: 240_000,
  expect: { timeout: 15_000 },
  fullyParallel: false,
  workers: 2,
  retries: process.env.CI ? 1 : 0,
  reporter: [['html', { outputFolder: 'reports', open: 'never' }], ['list']],
  use: {
    baseURL: process.env.BASE_URL,
    actionTimeout: 15_000,
    // 'on' because the fixture harvests the trace itself and can't know the
    // verdict at start time. If the runner saves traces on your Playwright
    // (>= 1.62 — verify, see [fixture-artifacts]) and you deleted the harvest,
    // every mode works here, `retain-on-failure` included.
    trace: 'on',
    // 'off' on purpose: the fixture owns the failure shot and names it per
    // context. The runner instruments the shared browserType, so its built-in
    // screenshot DOES fire on manually-created contexts and duplicates ours.
    screenshot: 'off',
    video: {
      mode: 'on',
      show: {
        actions: { duration: 500, position: 'top-right', fontSize: 14 },
        test: { level: 'step', position: 'bottom', fontSize: 12 },
      },
    },
    // slowMo lives here, not in a bespoke env var. On the Stagehand path the
    // fixture moves it onto connectOverCDP, since Stagehand owns the launch.
    launchOptions: { slowMo: 250 },
    ignoreHTTPSErrors: true,
  },
  globalSetup: './global-setup.ts',
  // The viewport comes from the device (Desktop Chrome = 1280x720) and the
  // fixture reads that one value for the browser launch, every context and the
  // video size. To change it, add `viewport` to THIS project entry, after the
  // spread — nowhere else. A top-level `use.viewport` does not work: the device
  // spread lands in the project's own `use` and clobbers it.
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
