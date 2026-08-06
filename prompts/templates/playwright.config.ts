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
  // viewport is declared HERE, inside the project — a top-level `use.viewport`
  // is clobbered by the devices spread, which carries its own 1280x720. The
  // fixture reads this one value and feeds it to the browser launch, every
  // context and the video size, so there is exactly one viewport in the suite.
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1920, height: 1080 } },
    },
  ],
});
