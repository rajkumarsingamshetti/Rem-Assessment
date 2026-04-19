// -----------------------------
// StepOnePage - Page Object Model for Step One of the Skip Hire Quote Flow
// -----------------------------  
export class StepOnePage {
  // -----------------------------
  // Page Object Model for Step One
  // -----------------------------  
  constructor(page) {
    // Locators
    this.page = page;

    // Common locators
    this.getQuoteBtn = page.locator('#cbb-row-no-2').getByRole('link', { name: /Get A Quote Online/i })
    this.domesticLink = page.getByRole('link', { name: 'DOMESTIC SKIP HIRE' });
    this.commercialLink = page.getByRole('link', { name: 'COMMERCIAL SKIP HIRE' });

    // For simplicity, we select a fixed skip size here. We can enhance this later to be dynamic/random.
    this.skipSize8 = page.getByLabel('8 yard');
    this.placementYes = page.getByLabel(/yes it will be placed/i);
    this.wastePlasterboard = page.getByLabel('Plasterboard');

    // Date picker locators
    this.dateInput = page.getByRole('img', { name: '...' });
    this.day18 = page.getByRole('link', { name: '18' });

    // Next button
    this.nextBtn = page.getByRole('button', { name: /next/i });

    // Heading for validation
    this.heading = page.getByText(/please choose your type of skip hire/i);
  }

  // -----------------------------
  // Page Actions
  // -----------------------------
  // Each action is a single interaction, no assertions here
  // Full flow is in completeStepOne() method
  // -----------------------------

  // Navigation
  async navigate() {
    await this.page.goto('/');
  }

  // Step 1 actions
  async clickGetQuote() {
    await this.getQuoteBtn.click();
  }

  // Option selections
  async selectDomestic() {
    await this.domesticLink.click();
  }

  // Commercial flow has a different link, so we need a separate method
  async selectCommercial() {
    await this.commercialLink.click();
  }

  // For simplicity, we select a fixed skip size here. We can enhance this later to be dynamic/random.
  async selectSkipSize() {
    await this.skipSize8.check();
  }

  // Placement option
  async selectPlacement() {
    await this.placementYes.check();
  }

  // Waste type selection
  async selectWasteType() {
    await this.wastePlasterboard.check();
  }

  // Date selection
  async selectDate() {
    await this.dateInput.click();
    await this.day18.click();
  }

  // Click next to go to Step 2
  async clickNext() {
    await this.nextBtn.click();
  }

  // Full flow for Step 1 - combines all actions in the correct sequence
  async completeStepOne() {
    await this.clickGetQuote();
    await this.selectDomestic();
    await this.selectSkipSize();
    await this.selectPlacement();
    await this.selectWasteType();
    await this.selectDate();
    await this.clickNext();
  }

  // Full flow for Commercial Skip Hire - different link but same rest of the steps
  async commercialLinkcompleteStepOne() {
    await this.clickGetQuote();
    await this.selectCommercial();
    await this.selectSkipSize();
    await this.selectPlacement();
    await this.selectWasteType();
    await this.selectDate();
    await this.clickNext();
  }
}