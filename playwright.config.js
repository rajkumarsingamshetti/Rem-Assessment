// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './automation/tests',

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
   //retries: 1,

  reporter: 'html',

  use: {
    baseURL:"https://www.renewableenergymarketing.net/skip-hire/", // now works ✅
    headless: process.env.CI ? true : false, // Run headless in CI/Docker, headed locally
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10000, // Increase action timeout for slower container environment
    navigationTimeout: 30000, // Increase navigation timeout
   
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
    name: 'mobile',
    //use: { ...devices['iPhone 13'] },
  }
  ]
});