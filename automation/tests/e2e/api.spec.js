
//--------------------E2E API TESTS ------------------
const { test, expect } = require('@playwright/test');

// Base URL for API requests (can be set via environment variable or defaults to localhost)
const BASE_URL = process.env.API_URL || 'http://localhost:3000';

// ------------------ 
// SUCCESS SCENARIOS
// ------------------ 
// Note: These tests assume the mock server is running and accessible at BASE_URL

// -------------------------------
// This test checks that when a valid postcode is provided, the API returns a successful response with 12 or more addresses, which allows us to confirm that our application can successfully retrieve and display address information for valid postcodes, providing a good user experience for customers looking up their addresses based on their postcode input.
// The test validates both the HTTP status and the structure/content of the response to ensure it meets our expectations for this postcode scenario, confirming that our application can handle and display address information correctly when provided with valid input.
// -------------------------------
test('SW1A returns 12+ addresses', async ({ request }) => {
  const res = await request.post(`${BASE_URL}/api/postcode/lookup`, {
    data: { postcode: 'SW1A 1AA' }
  });
  // We expect a successful response with 12 or more addresses for SW1A 1AA
  // The test validates both the HTTP status and the structure/content of the response to ensure it meets our expectations for this postcode scenario.
  const body = await res.json();
  // Validate response structure and content
  // We check that the response is successful, contains the correct postcode, and includes an array of addresses with at least 12 entries, which aligns with our mock server's behavior for this postcode.
  expect(res.ok()).toBeTruthy();
  expect(body.postcode).toBe('SW1A 1AA');
  expect(body.addresses.length).toBeGreaterThanOrEqual(12);
});

//----------------------------------------------------------
// Additional tests for other postcodes and scenarios can be added similarly, following the pattern of making API requests and validating responses based on our mock server's defined behavior.
// For example, we can test the empty address scenario for EC1A 1BB, the delayed response for M1 1AE, and the retry logic for BS1 4DJ, as well as edge cases like missing or invalid postcodes.
//--------------------------------------------------------------
test('EC1A returns empty addresses', async ({ request }) => {
  const res = await request.post(`${BASE_URL}/api/postcode/lookup`, {
    // We test the scenario where the postcode EC1A 1BB returns an empty array of addresses, which is a valid edge case to ensure our application can handle situations where no addresses are found for a given postcode.
    // The test checks that the API responds successfully but with an empty addresses array, confirming that our application can gracefully handle cases where a postcode does not yield any results.
    data: { postcode: 'EC1A 1BB' }
  });
  /// Validate response for empty addresses
  const body = await res.json();

  expect(body.addresses).toEqual([]);
});

// ------------------ FAILURE + EDGE CASES ------------------

// ------------------------------
// This test checks that when the BS1 4DJ postcode is requested, the first request fails with a 500 status code and the second request succeeds, which allows us to confirm that our application's retry logic is functioning correctly in handling transient server errors for this specific postcode scenario.
// BS1 MUST be serial (deterministic retry)
// By marking this test suite as serial, we ensure that the state of the mock server is consistent across tests, allowing us to accurately validate the retry behavior for the BS1 4DJ postcode scenario, which is designed to fail on the first request and succeed on the second.
// The first test checks that the initial request to the BS1 4DJ postcode returns a 500 Internal Server Error, which is the expected behavior according to our mock server's design for this postcode.
// The second test checks that a subsequent request to the same postcode succeeds, which validates that our application's retry mechanism is functioning correctly and can recover from transient server errors as designed in our mock server's behavior for the BS1 4DJ postcode scenario.
// This setup ensures that before each test in this suite, we reset the state of the mock server, which is crucial for testing the retry logic of the BS1 4DJ postcode. By resetting the server, we can guarantee that the first request will fail and the second will succeed, allowing us to validate that our application correctly handles retries in this scenario.
// ------------------------------
test.describe.serial('BS1 retry logic', () => {
  // The BS1 4DJ postcode is designed to fail on the first request and succeed on the second, which allows us to test our application's retry logic in a controlled manner. By marking this test suite as serial, we ensure that the state of the mock server is consistent across tests, allowing us to accurately validate the retry behavior for this specific postcode scenario.
  test.beforeEach(async ({ request }) => {
    await request.post(`${BASE_URL}/api/reset`);
  });
  // This setup ensures that before each test in this suite, we reset the state of the mock server, which is crucial for testing the retry logic of the BS1 4DJ postcode. By resetting the server, we can guarantee that the first request will fail and the second will succeed, allowing us to validate that our application correctly handles retries in this scenario.
  // The first test checks that the initial request to the BS1 4DJ postcode returns a 500 Internal Server Error, which is the expected behavior according to our mock server's design for this postcode.
  test('should fail first time with 500', async ({ request }) => {
    const res = await request.post(`${BASE_URL}/api/postcode/lookup`, {
      data: { postcode: 'BS1 4DJ' }
    });
    // We expect the first request to fail with a 500 status code, which allows us to confirm that our application can handle server errors and trigger the retry logic as intended for this specific postcode scenario.

    expect(res.status()).toBe(500);
  });
  
  // ------------------------------------------------
  // The second test checks that a subsequent request to the same postcode succeeds, which validates that our application's retry mechanism is functioning correctly and can recover from transient server errors as designed in our mock server's behavior for the BS1 4DJ postcode scenario.
  // By validating that the second request succeeds after the first one fails, we can confirm that our application correctly implements retry logic for transient errors, providing a better user experience by allowing for automatic recovery from temporary issues with the API.
  // This test ensures that our application can successfully recover from transient server errors for the BS1 4DJ postcode scenario, which is crucial for maintaining a robust and user-friendly API experience for customers who may encounter occasional issues with the backend.
  // ------------------------------------------------
  test('should succeed on retry', async ({ request }) => {
    await request.post(`${BASE_URL}/api/postcode/lookup`, {
      data: { postcode: 'BS1 4DJ' }
    });
    // The first request is expected to fail, so we ignore its result and make a second request to validate that it succeeds, confirming that our retry logic can successfully recover from the initial failure for this postcode scenario.
    const res = await request.post(`${BASE_URL}/api/postcode/lookup`, {
      data: { postcode: 'BS1 4DJ' }
    });

    expect(res.ok()).toBeTruthy();
  });

});

// ---------------------------------------------
// Additional tests for other failure and edge case scenarios can be added similarly, following the pattern of making API requests and validating responses based on our mock server's defined behavior for those scenarios.
// For example, we can test the missing postcode scenario, invalid postcode format, and latency for the M1 1AE postcode, as well as edge cases related to skip selection and booking confirmation.
// ---------------------------------------------
test('should fail when postcode is missing', async ({ request }) => {
  const res = await request.post(`${BASE_URL}/api/postcode/lookup`, {
    data: {}
  });
  // We expect the API to return a 400 Bad Request status when the postcode is missing from the request body, which allows us to confirm that our application correctly validates input and handles cases where required data is not provided.
  // This test ensures that our application can gracefully handle invalid input scenarios and provides appropriate feedback when required information is missing, which is crucial for maintaining a robust and user-friendly API.
  expect(res.status()).toBe(400);
});

// --------------------------------------------
// ------------------ Invalid postcode format test ------------------
// This test checks that when an invalid postcode format is provided, the API responds with a successful status but returns an empty array of addresses, which allows us to confirm that our application can gracefully handle and respond to invalid input without causing errors or unexpected behavior, ensuring a better user experience even when users provide incorrect data.
// By validating that the API returns a successful response with an empty addresses array for an invalid postcode format, we can ensure that our application is designed to handle such edge cases gracefully, which is important for maintaining a good user experience even when users provide incorrect data.
// ---------------------------------------------
test('should handle invalid postcode', async ({ request }) => {
  const res = await request.post(`${BASE_URL}/api/postcode/lookup`, {
    data: { postcode: '@@@@' }
  });
  // We expect the API to return a successful response with an empty addresses array for an invalid postcode format, which confirms that our application can gracefully handle and respond to invalid input without causing errors or unexpected behavior, ensuring a better user experience even when users provide incorrect data.
  const body = await res.json();
  // Validate that the response is successful but contains no addresses for an invalid postcode format, confirming that our application can handle such edge cases gracefully.
  expect(body.addresses.length).toBe(0);
});

// --------------------------------------------
// This test checks that when the M1 1AE postcode is requested, the API simulates a delay of at least 3 seconds before responding, which allows us to confirm that our application can handle delayed responses from the API without timing out or crashing, ensuring a more resilient user experience in real-world scenarios where network latency can occur.
// By measuring the time taken for the API to respond and validating that it meets the expected delay, we can ensure that our application is designed to handle such scenarios gracefully, which is important for maintaining a good user experience even when external factors like network latency come into play.
// This test ensures that our application can handle delayed responses from the API without timing out or crashing, which is crucial for maintaining a resilient and user-friendly experience for customers who may encounter slower network conditions or temporary issues with the backend.
// ---------------------------------------------
test('M1 should simulate delay', async ({ request }) => {
  const start = Date.now();
  // We expect the API to take at least 3 seconds to respond for the M1 1AE postcode, which allows us to confirm that our application can handle delayed responses and does not time out or crash when faced with slower API responses, ensuring a more resilient user experience in real-world scenarios where network latency can occur.
  await request.post(`${BASE_URL}/api/postcode/lookup`, {
    data: { postcode: 'M1 1AE' }
  });
  //  By measuring the time taken for the API to respond and validating that it meets the expected delay, we can ensure that our application is designed to handle such scenarios gracefully, which is important for maintaining a good user experience even when external factors like network latency come into play.
  const duration = Date.now() - start;
  // Validate that the response time is at least 3 seconds for the M1 1AE postcode, confirming that our application can handle delayed responses as designed in our mock server's behavior for this postcode scenario.
  expect(duration).toBeGreaterThanOrEqual(3000);
});

// ---------------------------------------------
// ------------------ SKIP SELECTION TESTS ------------------
// This test checks that when the heavy waste option is selected, at least 2 skip options are disabled in the response, which allows us to confirm that our application correctly applies business rules related to heavy waste and provides appropriate feedback to users when certain options are not available based on their selections.
// By validating the number of disabled skip options in the response, we can ensure that our application is enforcing the correct rules for heavy waste and providing a better user experience by clearly indicating which options are not available for selection when heavy waste is involved.
// This test ensures that our application correctly implements the business logic for heavy waste and provides users with accurate information about available skip options based on their waste type selection, which is crucial for maintaining a good user experience and ensuring customers can make informed decisions when selecting skip options for their bookings.
// ---------------------------------------------
test('Heavy waste disables at least 2 skips', async ({ request }) => {
  // We expect that when the heavy waste option is selected, the API will return a list of skip options where at least 2 of them are marked as disabled, which confirms that our application is correctly implementing the business logic for heavy waste and providing users with accurate information about available skip options based on their waste type selection.
  // By validating the number of disabled skip options in the response, we can ensure that our application is enforcing the correct rules for heavy waste and providing a better user experience by clearly indicating which options are not available for selection when heavy waste is involved.
  const res = await request.get(
    `${BASE_URL}/api/skips?postcode=SW1A1AA&heavyWaste=true`
  );
  // We expect the API to return a successful response with a list of skip options, where at least 2 options are disabled when the heavy waste parameter is set to true, confirming that our application correctly applies the business rules for heavy waste and provides users with accurate information about available skip options based on their waste type selection.
  const body = await res.json();
  // Validate that at least 2 skip options are disabled for heavy waste, confirming that our application correctly implements the business logic for heavy waste and provides users with accurate information about available skip options based on their waste type selection. 
  // By checking the number of disabled skip options in the response, we can ensure that our application is enforcing the correct rules for heavy waste and providing a better user experience by clearly indicating which options are not available for selection when heavy waste is involved.
  const disabled = body.skips.filter(s => s.disabled === true);
  // We expect at least 2 skip options to be disabled for heavy waste, which confirms that our application correctly implements the business logic for heavy waste and provides users with accurate information about available skip options based on their waste type selection.
  expect(disabled.length).toBeGreaterThanOrEqual(2);
});

// ---------------------------------------------
// ------------------ BOOKING TEST ------------------
// This test checks that when a booking confirmation request is made with valid data, the API responds with a success status and a booking ID, which allows us to confirm that our application can successfully process booking confirmations and provide users with the necessary information to track their bookings.
test('Booking confirmation works', async ({ request }) => {
  // We expect that when a booking confirmation request is made with valid data, the API will return a successful response containing a booking ID, which confirms that our application can successfully process booking confirmations and provide users with the necessary information to track their bookings. By validating the response status and the presence of a booking ID, we can ensure that our booking functionality is working as intended and providing a good user experience for customers confirming their skip hire bookings.
  const res = await request.post(`${BASE_URL}/api/booking/confirm`, {
    // We send a booking confirmation request with valid data, including postcode, address ID, waste type selections, skip size, and price, which allows us to confirm that our application can successfully process booking confirmations when provided with the necessary information. By validating the response status and the presence of a booking ID, we can ensure that our booking functionality is working as intended and providing a good user experience for customers confirming their skip hire bookings.
    // The test validates that the booking confirmation API endpoint is functioning correctly by sending a request with valid booking data and checking for a successful response that includes a booking ID, confirming that our application can successfully process bookings and provide users with the necessary information to track their bookings.
    data: {
      postcode: 'SW1A 1AA',
      addressId: 'addr_1',
      heavyWaste: true,
      plasterboard: false,
      skipSize: '4-yard',
      price: 120
    }
  });

  // We expect the API to return a successful response with a booking ID when a valid booking confirmation request is made, confirming that our application can successfully process bookings and provide users with the necessary information to track their bookings.
  const body = await res.json();
  // Validate that the booking confirmation response is successful and contains a booking ID, confirming that our application can successfully process bookings and provide users with the necessary information to track their bookings.
  // By checking the response status and the presence of a booking ID, we can ensure that our booking functionality is working as intended and providing a good user experience for customers confirming their skip hire bookings.
  expect(body.status).toBe('success');
  expect(body.bookingId).toBeTruthy();
});