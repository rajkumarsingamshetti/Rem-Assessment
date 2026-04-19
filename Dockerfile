# Use official Node.js base image with Playwright dependencies pre-installed
FROM mcr.microsoft.com/playwright:v1.59.1-jammy

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Install Playwright browsers
RUN npx playwright install

# Copy project files
COPY . .

# Create output directories for reports and results
RUN mkdir -p playwright-report test-results

# Set environment to use baseURL from playwright.config.js
ENV CI=true

# Default command: run Playwright tests
CMD ["npx", "playwright", "test"]
