// ------------------------------
// Mock API server for testing postcode lookup and skip booking flows
// This server simulates various scenarios for postcode lookups, including:
// - Multiple addresses (SW1A 1AA)
// - No addresses (EC1A 1BB)
// - Delayed response (M1 1AE)
// - Initial failure followed by success (BS1 4DJ)
// It also provides endpoints for waste type selection, skip availability, and booking confirmation.
// To run this server:
// 1. Ensure Node.js is installed.
// 2. Save this code to a file named `mock-server.js`.
// 3. Run `npm install express` to install dependencies.
// 4. Start the server with `node mock-server.js`.
// The server will listen on port 3000 by default, and you can interact with it using HTTP requests.
// Note: This is a simple mock server intended for testing purposes. It does not implement any real business logic or data persistence.
// ------------------------------

const express = require('express');
const app = express();
const port = Number(process.env.PORT) || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Track retries
const requestCount = {};

// Generate structured addresses
function generateAddresses(postcode, street, city, count) {
  return Array.from({ length: count }, (_, i) => ({
    id: `addr_${i + 1}`,
    line1: `${i + 1} ${street}`,
    city
  }));
}

// -----------------------------
// POST /api/postcode/lookup
// -----------------------------
app.post('/api/postcode/lookup', (req, res) => {
  const { postcode } = req.body;

  if (!postcode) {
    return res.status(400).json({ error: 'Postcode is required' });
  }

  const clean = postcode.trim().toUpperCase();

  // SW1A → 12+
  if (clean === 'SW1A 1AA') {
    return res.json({
      postcode: clean,
      addresses: generateAddresses(clean, 'Downing Street', 'London', 12)
    });
  }

  // EC1A → empty
  if (clean === 'EC1A 1BB') {
    return res.json({
      postcode: clean,
      addresses: []
    });
  }

  // M1 → delay
  if (clean === 'M1 1AE') {
    return setTimeout(() => {
      res.json({
        postcode: clean,
        addresses: generateAddresses(clean, 'Market Street', 'Manchester', 2)
      });
    }, 3000);
  }

  // BS1 → fail then succeed
  if (clean === 'BS1 4DJ') {
    if (!requestCount[clean]) {
      requestCount[clean] = 1;
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    return res.json({
      postcode: clean,
      addresses: generateAddresses(clean, 'Harbour Street', 'Bristol', 2)
    });
  }

  // Invalid postcode
  if (!/^[A-Z0-9 ]+$/.test(clean)) {
    return res.json({
      postcode: clean,
      addresses: []
    });
  }

  // Default
  return res.json({
    postcode: clean,
    addresses: generateAddresses(clean, 'Default Street', 'UK', 2)
  });
});

// -----------------------------
// POST /api/waste-types
// -----------------------------
app.post('/api/waste-types', (req, res) => {
  res.json({ ok: true });
});

// -----------------------------
// GET /api/skips
// -----------------------------
app.get('/api/skips', (req, res) => {
  const { heavyWaste } = req.query;

  const isHeavy = heavyWaste === 'true';

  const skips = [
    { size: '4-yard', price: 120, disabled: false },
    { size: '6-yard', price: 150, disabled: false },
    { size: '8-yard', price: 180, disabled: false },
    { size: '10-yard', price: 220, disabled: false },
    { size: '12-yard', price: 260, disabled: false },
    { size: '15-yard', price: 300, disabled: false },
    { size: '20-yard', price: 350, disabled: isHeavy },
    { size: '25-yard', price: 400, disabled: isHeavy },
    { size: '30-yard', price: 450, disabled: false }
  ];

  res.json({ skips });
});

// -----------------------------
// POST /api/booking/confirm
// -----------------------------
app.post('/api/booking/confirm', (req, res) => {
  res.json({
    status: 'success',
    bookingId: 'BK-12345'
  });
});

// -----------------------------
// POST /api/reset
// -----------------------------
app.post('/api/reset', (req, res) => {
  Object.keys(requestCount).forEach(key => delete requestCount[key]);
  res.json({ reset: true });
});

// ------------------------------
// Start the server
// ------------------------------
app.listen(port, () => {
  console.log(`Mock server running at http://localhost:${port}`);
});