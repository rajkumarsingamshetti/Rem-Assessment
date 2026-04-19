import { test, expect } from '@playwright/test';
import { skipSizes } from '../../fixtures/skipSizes';

test('E2E - Commercial Skip Hire (Random Skip Size)', async ({ page }) => {

  await page.goto('/');

  await page.getByRole('link', { name: /get a quote online/i }).first().click();
  await page.getByRole('link', { name: 'COMMERCIAL SKIP HIRE' }).click();

  // ------------ RANDOM SKIP SELECTION-------------
  const randomSize = skipSizes[Math.floor(Math.random() * skipSizes.length)];

  // Wait for the skip options to be visible and select the random size
  const option = page.getByText(randomSize, { exact: false }).first();

  // Ensure the option is visible and interactable before clicking
  await option.waitFor({ state: 'visible' });
  await option.scrollIntoViewIfNeeded();
  await option.click();
  console.log(`Selected skip size: ${randomSize}`);

  //------------ CONTINUE WITH THE REST OF THE FORM FILLING -------------
  // Step 1

  await page.getByRole('checkbox', { name: /Yes It Will Be Placed/i }).check();
  await page.getByRole('checkbox', { name: 'Plasterboard' }).check();

  //  await page.getByRole('checkbox', { name: 'Plasterboard' }).check();
  await page.getByRole('img', { name: '...' }).click();
  await page.getByRole('link', { name: '18' }).click();
  await page.getByRole('button', { name: 'Next' }).click();

  //---- Step 2: Fill form with commercial data ----
  await page.getByRole('textbox', { name: 'First name' }).fill('rajkumar');
  await page.getByRole('textbox', { name: 'Last name' }).fill('singam');
  await page.getByRole('textbox', { name: 'Phone Number Of The Person' }).fill('8367240010');
  await page.getByRole('textbox', { name: 'Email*' }).fill('rajkumar.sinaga@gmail.com');

  // Address details
  // Note: The address details are hardcoded for this test. We can enhance the test later to use dynamic or random address data for more comprehensive coverage.
  await page.getByRole('textbox', { name: 'Address Where You Want The' }).fill('324');
  await page.getByRole('textbox', { name: 'Address Line' }).fill('hugh street');
  await page.getByRole('textbox', { name: 'City' }).fill('main road');
  await page.getByRole('textbox', { name: 'ZIP / Postal Code' }).fill('ig11yt');
  await page.getByRole('textbox', { name: 'County / State / Region' }).fill('london');
  await page.getByRole('button', { name: 'Get Quote' }).click();

  // ---- Final validations ----
  await expect(page.getByText('QUOTATION SUBMITTED')).toBeVisible();
});