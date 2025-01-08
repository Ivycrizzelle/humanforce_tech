import { devices } from '@playwright/test';
// import dotenv from "dotenv"
import type { PlaywrightTestConfig } from '@playwright/test';
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();
// dotenv.config()
/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  globalSetup: require.resolve('./lib/helpers/global-setup.ts'),
  testDir: './tests',
  retries: 2,
  reporter: [['html', { open: 'never' }]],
  timeout: 5 * 60 * 1000,
  testMatch: 'tests/*.spec.ts',
  expect: {
    timeout: 30000,
  },
  workers: '80%',
  fullyParallel: true,
  use: {
    actionTimeout: 0,
    trace: 'on-first-retry',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        headless: true,
      },
    },
  ],
};
export default config;
