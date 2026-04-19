import { test, expect } from '@playwright/test';
import { StepOnePage } from '../../pages/StepOnePage';
import { StepTwoPage } from '../../pages/StepTwoPage';
import { testData } from '../../fixtures/testData';
import { invalidData } from '../../fixtures/invalidData';
test('E2E - commercial Skip Hire Flow', async ({ page }) => {

  const stepOne = new StepOnePage(page);
  const stepTwo = new StepTwoPage(page);

  //--------------------------------- Step 1: Navigate and validate homepage ------------------

  await stepOne.navigate();

  // Validate homepage loaded
  await expect(stepOne.getQuoteBtn).toBeVisible();

  //Complete Step 1
  await stepOne.commercialLinkcompleteStepOne();
  await expect(
    page.getByText(/skip hire online quotation form/i)
  ).toBeVisible();

  //tep 2: Fill form with invalid data to test error handling
  await stepTwo.completeStepTwo(invalidData);
  await expect(page.getByText(/There was a problem with your submission. Errors have been highlighted below./)).toBeVisible();

  // Test with valid data for successful submission
  await stepTwo.completeStepTwo(testData);
  await expect(
    page.getByText(/quotation submitted/i)
  ).toBeVisible();

});