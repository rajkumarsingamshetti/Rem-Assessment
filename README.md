<div align="center">

# 🚛 Rem-Assessment — Skip Hire QA Automation Framework

[![Playwright](https://img.shields.io/badge/Playwright-v1.59+-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docs.docker.com/compose/)
[![Express.js](https://img.shields.io/badge/Express.js-Mock%20API-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Lighthouse](https://img.shields.io/badge/Lighthouse-92%2F100-F44B21?style=for-the-badge&logo=lighthouse&logoColor=white)](#performance--accessibility)
[![License](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)](./package.json)

**A production-grade, enterprise-level QA automation framework for a multi-step skip hire booking system.**

[🚀 Quick Start](#-quick-start) • [🐳 Docker](#-docker-deployment) • [📋 Test Coverage](#-test-coverage) • [🏗️ Architecture](#-project-architecture) • [📊 Reports](#-performance--accessibility)

</div>

---

## 🎯 Project Overview

This repository is a **complete, end-to-end QA assessment framework** for a skip hire booking system — designed to showcase senior-level automation engineering. It combines automated E2E testing, API mocking, manual test documentation, bug reporting, containerisation, and performance analysis.

### 🏆 Assessment Compliance

| Requirement | Status | Evidence |
|---|---|---|
| E2E Automation Tests | ✅ Complete | 5 flows, 40+ assertions |
| Mock API Server | ✅ Complete | 4 deterministic endpoints |
| Manual Test Cases | ✅ Complete | 40+ scenarios documented |
| Bug Reports | ✅ Complete | 10 bugs with severity/priority |
| Docker Deployment | ✅ Complete | One-command docker compose up |
| Performance Testing | ✅ Complete | Lighthouse 92/100 |
| Accessibility Audit | ✅ Complete | WCAG 2.1 AA — 97% |
| UI Evidence | ✅ Complete | 14 screenshots + 85s video |

---

## ✨ Features

- 🎭 **5 Complete E2E Test Flows** — Commercial, Domestic, Heavy, Plasterboard, Scrap Metal
- 🔌 **Mock API Server** — Express.js with deterministic fixtures, latency simulation and retry logic
- 📋 **40+ Manual Test Cases** — Positive, negative, edge cases, and API failure scenarios
- 🐛 **10 Professional Bug Reports** — Severity classification, screenshots and reproduction steps
- 🐳 **Docker Compose** — One-command docker compose up for full environment
- 📊 **Lighthouse 92/100** — Performance, accessibility, SEO and best practices
- ♿ **WCAG 2.1 AA 97% Compliance** — Full accessibility audit included
- 📸 **14 Screenshot Evidence** — Mobile, desktop, error states, disabled states
- 🎥 **85-Second Flow Video** — Complete booking flow demonstration
- 🔄 **Page Object Model** — Clean, maintainable test architecture
- ⚡ **Parallel Test Execution** — Faster CI runs

---

## 🚀 Quick Start

### Prerequisites

```bash
node --version   # v18+ required
npm --version    # v8+
```

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/rajkumarsingamshetti/Rem-Assessment.git
cd Rem-Assessment

# 2. Install dependencies
npm install

# 3. Install Playwright browsers
npx playwright install

# 4. Start the Mock API Server
npm start
# Server runs at: http://localhost:3000

# 5. Run all E2E tests (new terminal)
npm test

# 6. View the HTML test report
npx playwright show-report
```

---

## 🐳 Docker Deployment

```bash
# Run everything (API + tests + reports)
docker compose up

# Run in background
docker compose up -d

# View logs
docker compose logs -f

# Stop all services
docker compose down
```

| Service | Port | Description |
|---|---|---|
| Mock API Server | 5000 | Express.js deterministic fixture API |
| Test Runner | — | Playwright E2E suite (auto-runs) |

---

## 🏗️ Project Architecture

```
Rem-Assessment/
├── 📁 api/
│   ├── mock-server.js          # Express.js mock API (4 endpoints)
│   └── Dockerfile              # API container config
├── 📁 automation/
│   ├── 📁 fixtures/
│   │   ├── testData.js         # Valid test data constants
│   │   ├── invalidData.js      # Edge case data
│   │   └── skipSizes.js        # Skip size fixtures
│   ├── 📁 pages/               # Page Object Model
│   │   ├── StepOnePage.js      # Postcode + waste type selection
│   │   └── StepTwoPage.js      # Skip selection + confirmation
│   └── 📁 tests/
│       ├── 📁 e2e/
│       │   ├── commercial-flow.spec.js
│       │   ├── domestic-flow.spec.js
│       │   ├── heavy-flow.spec.js
│       │   ├── plasterboard-flow.spec.js
│       │   └── scrap-metal-flow.spec.js
│       └── 📁 navigation/
├── 📁 manual-testcases/
│   ├── BUG_REPORT.md           # 10 bugs with severity/priority
│   ├── EdgeTestCases.md        # Edge case scenarios
│   ├── End-to-End Test Cases.md # 40+ scenario matrix
│   ├── negative-testcases.md
│   └── positive-testcases.md
├── 📁 ui/
│   ├── 📁 screenshots/         # 14 evidence screenshots
│   ├── 📁 videos/              # 85-second flow video
│   └── 📁 reports/
│       ├── lighthouse-report.html
│       └── accessibility-audit.pdf
├── playwright.config.js
├── docker-compose.yml
├── Dockerfile
└── package.json
```

---

## 🔌 Mock API Reference

| Endpoint | Method | Description |
|---|---|---|
| /api/postcode/lookup | POST | Address lookup with latency/retry scenarios |
| /api/waste-types | POST | All waste type options |
| /api/skips | GET | Skip options (Heavy waste restricts 20/25 yard) |
| /api/booking/confirm | POST | Booking confirmation |

### Postcode Scenarios

| Postcode | Response | Use Case |
|---|---|---|
| SW1A 1AA | 12+ addresses | Valid lookup |
| EC1A 1BB | Empty array | No results |
| M1 1AE | 2 addresses (3s delay) | Latency testing |
| BS1 4DJ | 500 error then success | Retry logic |

---

## 📋 Test Coverage

| Flow | Key Assertions |
|---|---|
| 🏗️ Commercial | Commercial waste selection, skip filtering, booking confirmation |
| 🏠 Domestic | Residential booking, address lookup, state persistence |
| 🏋️ Heavy | Heavy waste skip restrictions (20/25 yard disabled) |
| 🧱 Plasterboard | Handling options display, multi-option selection |
| 🔩 Scrap Metal | Scrap metal flow, booking confirmation |

### Manual Test Coverage (40+ Scenarios)

| Category | Count |
|---|---|
| Postcode Lookup | 8 scenarios |
| Waste Type Selection | 6 scenarios |
| Skip Size Selection | 8 scenarios |
| Form Validation | 6 scenarios |
| API Error Handling | 5 scenarios |
| Cross-browser and Mobile | 4 scenarios |
| Accessibility | 3 scenarios |

---

## 📊 Performance and Accessibility

### Lighthouse Results — 92/100 Overall

| Category | Score | Rating |
|---|---|---|
| ⚡ Performance | 88/100 | 🟡 Good |
| ♿ Accessibility | 95/100 | 🟢 Excellent |
| ✅ Best Practices | 96/100 | 🟢 Excellent |
| 🔍 SEO | 98/100 | 🟢 Excellent |

**WCAG 2.1 AA Compliance: 97%** — 0 critical issues, full assistive technology support.

---

## 🧪 Running Tests

```bash
# All tests
npm test

# Specific flow
npx playwright test automation/tests/e2e/domestic-flow.spec.js

# Headed mode (watch the browser)
npx playwright test --headed

# Debug with Playwright Inspector
npx playwright test --debug

# CI headless mode
CI=true npm test

# View HTML report
npx playwright show-report
```

---

## 👨‍💻 Author

**Rajkumar Singamshetti** — QA Automation Engineer | 5 Years Experience
📍 Cape Town, South Africa | 📧 singamshetti.sa@gmail.com

[![GitHub Profile](https://img.shields.io/badge/View%20My%20GitHub%20Profile-rajkumarsingamshetti-181717?style=for-the-badge&logo=github)](https://github.com/rajkumarsingamshetti)

---

<div align="center">

*Built to demonstrate senior-level QA Automation Engineering — clean code, comprehensive coverage, professional documentation.*

</div>
