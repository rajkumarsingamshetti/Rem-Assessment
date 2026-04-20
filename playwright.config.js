// @ts-check
const { defineConfig, devices } = require('@playwright/test');

// See https://playwright.dev/docs/test-configuration for more details.
module.exports = defineConfig({
  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: './automation/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: 'html',
  // Configure projects for major browsers.
  use: {
    baseURL:"https://www.renewableenergymarketing.net/skip-hire/", // Set the base URL for all tests.
    headless: process.env.CI ? true : false, // Run in headless mode on CI, headed mode locally for debugging
    trace: 'on-first-retry', // Collect trace only on the first retry of a failed test.
    screenshot: 'only-on-failure', // Capture screenshots only on test failures.
    video: 'retain-on-failure', // Record video only for failed tests.
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
    use: { ...devices['iPhone 13'] }, // use this line to test on iPhone 13
    //use: { ...devices['Pixel 5'] }, // Use Pixel 5 for mobile testing
  },
  
  // - API tests using the mock server
   {
      name: 'api',
      testMatch: /.*api\.spec\.js/,
      use: {
        baseURL: 'http://localhost:3000',
      },
    }
  ],

  //AUTO START MOCK SERVER
  webServer: {
    command: 'node api/mock-server.js',
    port: 3000,
    reuseExistingServer: true,
  },
  
  

  
});