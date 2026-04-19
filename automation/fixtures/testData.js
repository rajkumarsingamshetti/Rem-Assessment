// -----------------------------
// Test Data Fixture
// -----------------------------  
export const testData = {
  firstName: 'rajkumar',
  lastName: 'singam',
  phone: '8367240010',
  email: 'rajkumar@gmail.com',
  address1: '1904 rapheal house ',
  address2: 'High Street',
  city: 'London',
  postcode: 'IG1 1YT',
  county: 'London'
};

// ------------------------------
// Mock API Responses
// -----------------------------
export const mockResponses = {
  postcodeLookup: {
    'SW1A 1AA': { addresses: Array.from({ length: 12 }, (_, i) => `Address ${i + 1}, SW1A 1AA`) },
    'EC1A 1BB': { addresses: [] },
    'M1 1AE': { addresses: ['Delayed Address 1', 'Delayed Address 2'] },
    'BS1 4DJ': { addresses: ['Retry Address 1', 'Retry Address 2'] }
  },

  // ------------------------------
  // Waste types and skip options for dynamic UI testing
  // ------------------------------
  wasteTypes: {
    wasteTypes: [
      { id: 'general', name: 'General waste' },
      { id: 'heavy', name: 'Heavy waste' },
      { id: 'plasterboard', name: 'Plasterboard', handlingOptions: ['Recycle', 'Dispose', 'Reuse'] }
    ]
  },

  //  ------------------------------
  // Skip options with enabled/disabled states to test dynamic UI behavior
  // ------------------------------
  skips: {
    general: [
      { id: 'skip1', size: '4 yard', enabled: true },
      { id: 'skip2', size: '6 yard', enabled: true },
      { id: 'skip3', size: '8 yard', enabled: true },
      { id: 'skip4', size: '10 yard', enabled: true },
      { id: 'skip5', size: '12 yard', enabled: true },
      { id: 'skip6', size: '15 yard', enabled: true },
      { id: 'skip7', size: '20 yard', enabled: true },
      { id: 'skip8', size: '25 yard', enabled: true },
      { id: 'skip9', size: '30 yard', enabled: true }
    ],

    //------------------------------
    // Heavy waste disables certain skip sizes to test conditional UI logic
    //------------------------------
    heavy: [
      { id: 'skip1', size: '4 yard', enabled: true },
      { id: 'skip2', size: '6 yard', enabled: true },
      { id: 'skip3', size: '8 yard', enabled: true },
      { id: 'skip4', size: '10 yard', enabled: true },
      { id: 'skip5', size: '12 yard', enabled: true },
      { id: 'skip6', size: '15 yard', enabled: true },
      { id: 'skip7', size: '20 yard', enabled: false }, // Disabled for heavy
      { id: 'skip8', size: '25 yard', enabled: false }, // Disabled for heavy
      { id: 'skip9', size: '30 yard', enabled: true }
    ],

    //-------------------------------
    // Plasterboard waste has all skip sizes enabled to test different waste type logic
    //-------------------------------
    plasterboard: [
      { id: 'skip1', size: '4 yard', enabled: true },
      { id: 'skip2', size: '6 yard', enabled: true },
      { id: 'skip3', size: '8 yard', enabled: true },
      { id: 'skip4', size: '10 yard', enabled: true },
      { id: 'skip5', size: '12 yard', enabled: true },
      { id: 'skip6', size: '15 yard', enabled: true },
      { id: 'skip7', size: '20 yard', enabled: true },
      { id: 'skip8', size: '25 yard', enabled: true },
      { id: 'skip9', size: '30 yard', enabled: true }
    ]
  },
  // ------------------------------
  // Booking confirmation response to validate end-to-end booking flow
  // ------------------------------
  bookingConfirm: { success: true, bookingId: 'BK123456' }
};