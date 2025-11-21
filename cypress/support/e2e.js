// Load commands
require('./commands');

// Disable uncaught exception handling
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

// Set default timeout
Cypress.config('defaultCommandTimeout', 10000);

// Before each test hook
beforeEach(function () {
    cy.log('========================================');
    cy.log('TEST STARTED: ' + this.currentTest.title);
    cy.log('========================================');
});

// After each test hook
afterEach(function () {
    cy.log('========================================');
    cy.log('TEST COMPLETED: ' + this.currentTest.title);
    cy.log('========================================');
});

// On test failure
Cypress.on('fail', (error, runnable) => {
    cy.screenshot(`failure-${Date.now()}`);
    throw error;
});