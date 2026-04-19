// -----------------------------
// StepTwoPage - Page Object Model for Step Two of the Skip Hire Quote Flow
// ----------------------------- 
// This class encapsulates all interactions with Step Two of the quote flow, which is the form where users enter their personal and address details.
// It uses Playwright's locator strategies to find elements on the page and provides a method to complete the form with given data.
// Assertions are not included in this class, as they should be handled in the test files to keep the page object focused on interactions.    
// -----------------------------
// Importing necessary modules (if any) can be done here, but for this page object, we only need the Playwright page object passed in the constructor.
// -----------------------------
// -----------------------------
// Note: This page object assumes that the test will handle navigation to Step Two and any necessary setup before calling the completeStepTwo() method.
// -----------------------------
export class StepTwoPage {
  constructor(page) {
    // Locators
    this.page = page;

    //-----------------------------
    // Form fields locators
    //-----------------------------
    this.firstNameInput = page.getByLabel(/first name/i);
    this.lastNameInput = page.getByLabel(/last name/i);
    this.phoneInput = page.getByLabel(/phone/i);
    this.emailInput = page.getByLabel(/email/i);

    // Address details
    // The labels for address fields can vary, so we use partial matches to ensure we capture the correct inputs even if the UI changes slightly.
    // Address fields (labels may vary slightly, so using partial match)
    this.address1Input = page.getByLabel(/address where/i); // Address line 1
    this.address2Input = page.getByLabel(/address line/i);  // Address line 2
    this.cityInput = page.getByLabel(/city/i);              // City field
    // Handles both "ZIP" or "Postal Code"
    this.postcodeInput = page.getByLabel(/zip|postal/i);    // Postal Code field
    this.countyInput = page.getByLabel(/county/i);          // County field
    // Button locator using role (recommended over CSS)
    this.getQuoteButton = page.getByRole('button', {
      name: /get quote/i
    });

    // Success message locator (used for validation after submission)
    this.successMessage = page.getByText(/quotation submitted/i);
  }// assertions are done in test files, not here

  //ACTION METHOD
  async completeStepTwo(data) {

    // Fill all input fields using provided test data
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.phoneInput.fill(data.phone);
    await this.emailInput.fill(data.email);
    await this.address1Input.fill(data.address1);
    await this.address2Input.fill(data.address2);
    await this.cityInput.fill(data.city);
    await this.postcodeInput.fill(data.postcode);
    await this.countyInput.fill(data.county);

    // Click on "Get Quote" button to submit the form
    await this.getQuoteButton.click();
  }
}