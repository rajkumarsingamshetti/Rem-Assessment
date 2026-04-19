// -----------------------------
// Skip Sizes Fixture
// -----------------------------
export const skipSizes = [
  "2 yard",
  "4 yard",
  "6 yard",
  "8 yard",
  "10 yard",
  "12 yard",
  "20 yard",
  "40 yard"
];

// Utility function to get a random skip size
export function getRandomSkipSize() {
  return skipSizes[Math.floor(Math.random() * skipSizes.length)];
}