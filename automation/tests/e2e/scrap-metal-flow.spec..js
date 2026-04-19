import { test, expect } from '@playwright/test';

const date = '10';

test('E2E - Scrap Metal Skip Hire Flow', async ({ page }) => {

  // 🔹 Open homepage
  await page.goto('/');

  // 🔹 Validate phone number is visible
  await expect(
    page.locator('//span[contains(@class,"call-us")]')
  ).toContainText('0800 808 5475');

  // 🔹 Click "Get a Quote Online"
  await expect(page.locator('a.btn-danger').first()).toBeVisible();
  await page.locator('a.btn-danger').first().click();

  // 🔹 Validate navigation to selection page
  await expect(
    page.getByText(/please choose your type of skip hire/i)
  ).toBeVisible();

  // 🔹 Select Commercial Skip Hire
  await page.getByRole('link', { name: /commercial skip hire/i }).click();

  // 🔹 Verify Step 1 page loaded
  await expect(
    page.getByRole('heading', { name: 'SKIP HIRE ONLINE QUOTATION FORM' })
  ).toBeVisible();

  // ============================
  // Step 1: Select options
  // ============================

  //  Select skip size
  const skipSize = page.getByLabel('8 yard');
  await skipSize.check();
  await expect(skipSize).toBeChecked();

  //  Select placement option
  const placement = page.getByLabel(/yes it will be placed/i);
  await placement.check();
  await expect(placement).toBeChecked();

  //  Select waste type
  const waste = page.getByLabel('Scrap Metal');
  await waste.check();
  await expect(waste).toBeChecked();

  // Open date picker
  await page.locator('.datepicker').click();
  await expect(page.locator('.ui-datepicker-calendar')).toBeVisible();

  //  Select date dynamically
  await page.locator('.ui-datepicker-calendar')
    .getByRole('link', { name: date })
    .click();

  //  Click Next
  await page.getByRole('button', { name: /next/i }).click();

  //  Verify Step 2 page loaded
  await expect(
    page.getByRole('heading', { name: 'SKIP HIRE ONLINE QUOTATION FORM' })
  ).toBeVisible();

  // ============================
  //  Step 2: Fill form
  // ============================

  //  Fill First Name
  const firstName = page.getByLabel(/first name/i);
  await firstName.fill('rajkumar');
  await expect(firstName).toHaveValue('rajkumar');

  //  Fill Last Name
  const lastName = page.getByLabel(/last name/i);
  await lastName.fill('singam');
  await expect(lastName).toHaveValue('singam');

  //  Fill Phone
  const phone = page.getByLabel(/phone/i);
  await phone.fill('8367240010');
  await expect(phone).toHaveValue('8367240010');

  //  Fill Email
  const email = page.getByLabel(/email/i);
  await email.fill('rajkumar.sinaga@gmail.com');
  await expect(email).toHaveValue('rajkumar.sinaga@gmail.com');

  //  Fill Address
  const address = page.getByLabel(/address where/i);
  await address.fill('324');
  await expect(address).toHaveValue('324');

  //  Address Line
  const addressLine = page.getByLabel(/address line/i);
  await addressLine.fill('High Street');
  await expect(addressLine).toHaveValue('High Street');

  //  City
  const city = page.getByLabel(/city/i);
  await city.fill('London');
  await expect(city).toHaveValue('London');

  //  Postal Code
  const zip = page.getByLabel(/zip|postal/i);
  await zip.fill('IG1 1YT');
  await expect(zip).toHaveValue('IG1 1YT');

  //  County
  const county = page.getByLabel(/county/i);
  await county.fill('London');
  await expect(county).toHaveValue('London');

  //  Submit form
  await page.getByRole('button', { name: /get quote/i }).click();

  //  Final assertion (success message)
  await expect(
    page.getByText(/quotation submitted/i)
  ).toBeVisible();

});