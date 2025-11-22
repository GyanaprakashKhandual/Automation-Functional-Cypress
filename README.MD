# Cypress Cucumber BDD Automation Framework

A professional test automation framework for OrangeHRM using Cypress and Cucumber BDD approach with Page Object Model design pattern.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Open Cypress Test Runner
npm run cypress:open

# Run tests headless
npm run test:headless
```

## 📋 Prerequisites

- Node.js (v16+)
- npm (v8+)

## 🏗️ Project Structure

```
cypress/
├── e2e/
│   ├── apps/              # Feature files
│   │   ├── login.feature
│   │   └── pim.feature
│   └── scripts/           # Step definitions
│       ├── base.script.js
│       ├── login.script.js
│       └── pim.script.js
├── fixtures/              # Test data
│   └── pim.data.json
├── pages/                 # Page Objects
│   ├── base.page.js
│   ├── login.page.js
│   └── pim.page.js
└── support/
    ├── commands.js        # Custom commands
    └── e2e.js            # Global config
```

## 🧪 Test Scenarios

### Login Module

- Valid/Invalid login
- Empty credentials validation
- Logout functionality

### PIM Module

- Add employee with/without login
- Search employee by name/ID
- Update personal & contact details
- Delete employee records
- Bulk employee operations

## 📝 Available Scripts

| Command                 | Description                    |
| ----------------------- | ------------------------------ |
| `npm run cypress:open`  | Open Cypress Test Runner       |
| `npm run test:headless` | Run all tests in headless mode |
| `npm run test:headed`   | Run tests in headed mode       |
| `npm run test:chrome`   | Run tests in Chrome browser    |
| `npm run test:firefox`  | Run tests in Firefox browser   |

## 🏷️ Running Tests by Tags

```bash
# Run smoke tests
npx cypress run --env tags="@smoke"

# Run regression tests
npx cypress run --env tags="@regression"

# Run specific module
npx cypress run --env tags="@login"
npx cypress run --env tags="@pim"
```

## 📊 Test Reports

Reports are automatically generated after test execution:

- **HTML Report:** `cypress/reports/cucumber-html/index.html`
- **JSON Report:** `cypress/reports/cucumber-json/cucumber-report.json`
- **Videos:** `cypress/videos/`
- **Screenshots:** `cypress/screenshots/`

## 🔧 Configuration

**Base URL:** `https://opensource-demo.orangehrmlive.com`

**Test Credentials:**

- Username: `Admin`
- Password: `admin123`

## 🎯 Key Features

- ✅ BDD with Cucumber Gherkin syntax
- ✅ Page Object Model pattern
- ✅ Reusable custom commands
- ✅ Data-driven testing with JSON fixtures
- ✅ Automatic screenshots on failure
- ✅ Video recording of test execution
- ✅ Tag-based test execution
- ✅ Multi-browser support

## 📖 Writing Tests

### Feature File

```gherkin
Feature: Login Functionality

  @smoke
  Scenario: Successful login
    Given I navigate to the OrangeHRM login page
    When I enter valid username and password
    And I click on the login button
    Then I should be redirected to the dashboard page
```

### Step Definition

```javascript
Given("I navigate to the OrangeHRM login page", () => {
  loginPage.visit();
  loginPage.verifyLoginFormVisible();
});
```

### Page Object

```javascript
class LoginPage extends BasePage {
  elements = {
    usernameInput: () => cy.get('input[name="username"]'),
  };

  visit() {
    super.visit("/web/index.php/auth/login");
  }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

ISC License

---

**Built with ❤️ using Cypress & Cucumber**
