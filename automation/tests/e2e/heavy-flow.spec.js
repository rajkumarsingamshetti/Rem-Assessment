// This test simulates the end-to-end flow for a heavy waste skip hire booking, covering the entire user journey from entering the postcode to confirming the booking. It includes API mocking for postcode lookup, waste types, skip availability based on waste type, and booking confirmation to ensure a consistent and controlled testing environment. The test validates that the correct skips are offered for heavy waste and that the booking process completes successfully with the expected confirmation message.
// The test uses Playwright's route interception to mock API responses for po
// poststcode lookup, waste types, skip availability, and booking confirmation. This allows us to simulate specific scenarios and ensure that our application behaves correctly under controlled conditions, without relying on external APIs or data that may change over time. The mocked responses are defined in the testData fixture for easy maintenance and clarity.
import { test, expect } from '@playwright/test';
import { StepOnePage } from '../../pages/StepOnePage';
import { StepTwoPage } from '../../pages/StepTwoPage';
import { testData, mockResponses } from '../../fixtures/testData';

//------------------------------- Note on API mocking ------------------------------
// The test includes comprehensive API mocking for the postcode lookup, waste types, skip availability based on waste type, and booking confirmation endpoints. This allows us to simulate specific scenarios and ensure that our application behaves correctly under controlled conditions, without relying on external APIs or data that may change over time. The mocked responses are defined in the testData fixture for easy maintenance and clarity. 
test('E2E - Heavy Waste Flow', async ({ page }) => {

  // Mock postcode
  await page.route('**/api/postcode/lookup', async route => {
    await route.fulfill({ json: mockResponses.postcodeLookup['SW1A 1AA'] });
  });

  // Mock waste types
  await page.route('**/api/waste-types', async route => {
    await route.fulfill({ json: mockResponses.wasteTypes });
  });

  //  FIXED skips mocking
  await page.route('**/api/skips**', async route => {
    const url = route.request().url();

    if (url.includes('heavyWaste=true')) {
      await route.fulfill({ json: { skips: mockResponses.skips.heavy } });
    } else {
      await route.fulfill({ json: { skips: mockResponses.skips.default } });
    }
  });

  // Mock booking
  await page.route('**/api/booking/confirm', async route => {
    await route.fulfill({ json: mockResponses.bookingConfirm });
  });
  // Initialize page objects
  const stepOne = new StepOnePage(page);
  const stepTwo = new StepTwoPage(page);

  //  Step 1: Navigate
  await stepOne.navigate();

  //  Validate homepage loaded
  await expect(stepOne.getQuoteBtn).toBeVisible();

  // Complete Step 1
  await stepOne.completeStepOne();

  //  Validate Step 2 page
  await expect(page.getByText(/skip hire online quotation form/i)).toBeVisible();

  //  Step 2: Fill form with heavy waste data
  await stepTwo.completeStepTwo(testData);
});