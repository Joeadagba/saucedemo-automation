## 📋 Overview
This repository contains automated tests for the Saucedemo e-commerce application (https://www.saucedemo.com/) as part of a QA Engineer assessment for QaceTech.

## ✅ Test Coverage

### Login Tests (Valid & Invalid)
- Valid login with standard_user, problem_user, performance_glitch_user
- Invalid login with locked_out_user, wrong password, empty fields
- Edge cases: case sensitivity, non-existent users

### Add to Cart Tests
- Add single product
- Add multiple products  
- Add from product detail page
- Cannot add same product twice

### Checkout Tests
- Complete checkout flow
- Cancel from information page
- Cancel from overview page  
- Validation: empty fields (first name, last name, postal code)
- Edge cases: special characters, long names

## 📊 Test Results
- **Total Tests**: 17
- **Passed**: 17
- **Failed**: 0
- **Status**: ✅ All tests passing

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- npm installed

### Installation
```bash
# Clone the repository
git clone https://github.com/Joeadagba/saucedemo-automation.git

# Navigate to project folder
cd saucedemo-automation

# Install dependencies
npm install
### Running Tests
```bash
# Run tests in interactive mode (with browser)
npx cypress open

# Run tests in headless mode (command line)
npx cypress run

🛠️ Technologies Used
Cypress - Test automation framework

JavaScript - Programming language

Node.js - Runtime environment

📁 Project Structure
text
saucedemo-automation/
├── cypress/
│   ├── e2e/
│   │   └── saucedemo.cy.js    # All test cases
│   ├── fixtures/                # Test data
│   ├── support/                 # Custom commands
│   └── videos/                   # Test recordings
├── cypress.config.js            # Cypress configuration
├── package.json                  # Dependencies
└── README.md                     # This file
👤 Author
Joeadagba

GitHub: @Joeadagba

📅 Date
March 2026

📄 License
This project is for assessment purposes only.