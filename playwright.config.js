// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './automation/tests',

  fullyParallel: true,
  forbidOnly: !!process.env.CI,

  reporter: 'html',

  use: {
    baseURL: "https://www.renewableenergymarketing.net/skip-hire/",
    headless: process.env.CI ? true : false,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile',
    },

    // ✅ API TEST PROJECT
    {
      name: 'api',
      testMatch: /.*api\.spec\.js/,
      use: {
        baseURL: 'http://localhost:3000',
      },
    }
  ],

  // ✅ AUTO START MOCK SERVER
  webServer: {
    command: 'node api/mock-server.js',
    port: 3000,
    reuseExistingServer: true,
  },
});