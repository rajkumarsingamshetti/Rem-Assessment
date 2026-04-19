// E2E Test for Domestic Skip Hire Flow
// This test covers the end-to-end flow for a domestic skip hire quote, including form submission and validation of the success message.
// It uses the StepOnePage and StepTwoPage page objects to interact with the application, and test data from the fixtures.
// The test is designed to be robust and maintainable, with clear separation of concerns between the test logic and the page interactions.
// Assertions are included to validate that the correct pages are loaded and that the final submission is successful. 
import { test, expect } from '@playwright/test';
import { StepOnePage } from '../../pages/StepOnePage';
import { StepTwoPage } from '../../pages/StepTwoPage';
import { testData } from '../../fixtures/testData';
import { skipSizes } from '../../fixtures/skipSizes';
// Note: The skipSizes fixture is imported but not currently used in this test. We can enhance the test later to select a random skip size from the available options for more comprehensive coverage.
test('E2E - Domestic Skip Hire Flow', async ({ page }) => {
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
  await expect(
    page.getByText(/skip hire online quotation form/i)
  ).toBeVisible();

  //  Step 2: Fill form
  await stepTwo.completeStepTwo(testData);

  //  Final validations
  await expect(
    page.getByText(/quotation submitted/i)
  ).toBeVisible();

});