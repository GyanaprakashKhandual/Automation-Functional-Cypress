import './commands';
import '@shelex/cypress-allure-plugin';

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

Cypress.config('defaultCommandTimeout', 10000);

beforeEach(() => {
    cy.log('Test Started: ' + Cypress.currentTest.title);
});

afterEach(() => {
    cy.log('Test Completed: ' + Cypress.currentTest.title);

    if (Cypress.currentTest.state === 'failed') {
        cy.screenshot(Cypress.currentTest.title + ' - FAILED');
    }
});

beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
});

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

Cypress.config('defaultCommandTimeout', 10000);

beforeEach(() => {
    cy.log('Test Started: ' + Cypress.currentTest.title);
});

afterEach(() => {
    cy.log('Test Completed: ' + Cypress.currentTest.title);

    if (Cypress.currentTest.state === 'failed') {
        cy.screenshot(Cypress.currentTest.title + ' - FAILED');
    }
});

beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
});