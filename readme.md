Markdown# Automation Testing Tasks (API & Frontend)

This repository contains my solution to the assigned technical tasks. The project documents my fast-paced learning of a new technology stack (JavaScript & Playwright) and my professional transition toward web automation.

To date, my career has been focused on full-stack manual testing and specialized test automation for Electronic Control Units (ECUs) within the Automotive industry. Given that automotive automation relies on low-level tools and embedded systems frameworks, this project demonstrates my ability to pivot, quickly master modern web technologies, and apply my core QA expertise to a new domain.

## 🛠 Tech Stack

The following tools and technologies were used in this solution:

* **IDE:** Visual Studio Code with the official Playwright extension (used for debugging and test generation).
* **Language:** JavaScript (Node.js runtime).
* **Framework:** Playwright (test runner, trace viewer).
* **Others:** `dotenv` for secure API key management.

---

## 🚀 Setup and Installation

The project is ready for immediate execution after local configuration.

### 1. Cloning and installing dependencies
```bash
git clone [https://github.com/annahad/Moxymind_TechTasks.git](https://github.com/annahad/Moxymind_TechTasks.git)
cd Moxymind_TechTasks
npm install
npx playwright install
2. Environment SetupCreate a .env file in the root directory (refer to .env.example) and insert your API key generated on the reqres.in website:Útržok kóduAPI_KEY=your_reqres_id
🏃 Running TestsI leverage the Playwright runner for various validation types:CommandPurposenpx playwright testRuns all tests in headless mode.npx playwright test --uiUI Mode (Recommended for review) – visual execution and debugging.npx playwright test tests/FrontendRuns only frontend scenarios (SauceDemo).npx playwright test tests/ApiRuns only API tests (ReqRes.in).npx playwright show-reportView test execution reports.📂 Scope of the Solution🌐 Frontend (SauceDemo)Focused on Core Business Logic and stability:Login & Logout: Validation of access and correct session termination.E2E Shopping Flow: Complete process from cart to checkout.Best Practices: Utilization of robust data-test selectors and modularized login functions to reduce duplication.🔌 API (ReqRes.in)Backend layer validation:CRUD Operations: Testing GET (data retrieval) and POST (user creation).Data-Driven Testing: External storage of test data in data_users.json.Performance: Response time checks (limit set under 500ms).📈 Technical Debt & Learning PathAs this is my first comprehensive project using JavaScript and Playwright, my next steps will focus on:Refactoring to Page Object Model (POM): Transitioning from linear scripts to a structured object-oriented architecture.CI/CD Integration: Automating test runs via GitHub Actions.Expanded Coverage: Implementation of negative test cases and deeper API schema validation.