class BasePage {
    constructor() {
        this.timeout = 10000;
    }

    visit(url) {
        cy.visit(url);
        cy.wait(2000);
    }

    click(selector) {
        cy.get(selector, { timeout: this.timeout }).click();
    }

    typeText(selector, text) {
        cy.get(selector, { timeout: this.timeout }).clear().type(text, { delay: 50 });
    }

    getText(selector) {
        return cy.get(selector, { timeout: this.timeout }).invoke('text');
    }

    getAttribute(selector, attribute) {
        return cy.get(selector, { timeout: this.timeout }).invoke('attr', attribute);
    }

    waitForElement(selector, timeout = this.timeout) {
        cy.get(selector, { timeout }).should('be.visible');
    }

    isElementVisible(selector) {
        return cy.get(selector, { timeout: this.timeout }).should('be.visible');
    }

    isElementPresent(selector) {
        return cy.get(selector, { timeout: this.timeout }).should('exist');
    }

    verifyElementText(selector, expectedText) {
        cy.get(selector, { timeout: this.timeout }).should('contain', expectedText);
    }

    verifyPageTitle(expectedTitle) {
        cy.title().should('include', expectedTitle);
    }

    verifyUrl(expectedUrl) {
        cy.url().should('include', expectedUrl);
    }

    getElementCount(selector) {
        return cy.get(selector, { timeout: this.timeout }).its('length');
    }

    scrollToElement(selector) {
        cy.get(selector, { timeout: this.timeout }).scrollIntoView();
    }

    hoverOverElement(selector) {
        cy.get(selector, { timeout: this.timeout }).trigger('mouseover');
    }

    waitForElementToDisappear(selector, timeout = this.timeout) {
        cy.get(selector, { timeout }).should('not.exist');
    }

    assertElementExists(selector) {
        cy.get(selector, { timeout: this.timeout }).should('exist');
    }

    assertElementDoesNotExist(selector) {
        cy.get(selector, { timeout: this.timeout }).should('not.exist');
    }

    assertElementContainsText(selector, text) {
        cy.get(selector, { timeout: this.timeout }).should('contain.text', text);
    }

    getPageTitle() {
        return cy.title();
    }

    getCurrentUrl() {
        return cy.url();
    }

    pressKey(key) {
        cy.get('body').type(`{${key}}`);
    }
}

module.exports = BasePage;