Cypress.Commands.add('login', (username, password) => {
    cy.visit('/web/index.php/auth/login');
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
});

Cypress.Commands.add('loginWithdata', () => {
    cy.fixture('pim.data.json').then((testData) => {
        cy.login(
            testData.login.validCredentials.username,
            testData.login.validCredentials.password
        );
    });
});

Cypress.Commands.add('navigateToPIM', () => {
    cy.contains('PIM').click();
    cy.url().should('include', '/pim');
});

Cypress.Commands.add('waitForPageLoad', () => {
    cy.get('.oxd-loading-spinner', { timeout: 10000 }).should('not.exist');
});

Cypress.Commands.add('clickByText', (text) => {
    cy.contains(text).click();
});

Cypress.Commands.add('typeWithClear', { prevSubject: 'element' }, (subject, text) => {
    cy.wrap(subject).clear().type(text);
});

Cypress.Commands.add('selectDropdownOption', (dropdownSelector, optionText) => {
    cy.get(dropdownSelector).click();
    cy.contains(optionText).click();
});

Cypress.Commands.add('verifyToastMessage', (messageType = 'success') => {
    cy.get(`.oxd-toast-content--${messageType}`).should('be.visible');
});

Cypress.Commands.add('waitAndClick', { prevSubject: 'element' }, (subject) => {
    cy.wrap(subject).should('be.visible').wait(500).click();
});

Cypress.Commands.add('typeSlowly', { prevSubject: 'element' }, (subject, text, delay = 100) => {
    cy.wrap(subject).clear();
    text.split('').forEach((char) => {
        cy.wrap(subject).type(char);
        cy.wait(delay);
    });
});

Cypress.Commands.add('shouldContainText', { prevSubject: 'element' }, (subject, text) => {
    cy.wrap(subject).should('contain.text', text);
});

Cypress.Commands.add('clearAllFilters', () => {
    cy.contains('button', 'Reset').click();
    cy.wait(1000);
});

Cypress.Commands.add('takeScreenshot', (name) => {
    const timestamp = new Date().getTime();
    cy.screenshot(`${name}-${timestamp}`);
});

Cypress.Commands.add('elementExists', (selector) => {
    cy.get('body').then($body => {
        return $body.find(selector).length > 0;
    });
});

Cypress.Commands.add('scrollAndClick', { prevSubject: 'element' }, (subject) => {
    cy.wrap(subject).scrollIntoView().should('be.visible').click();
});

Cypress.Commands.add('waitForAPI', (alias, timeout = 10000) => {
    cy.wait(alias, { timeout });
});

Cypress.Commands.add('selectAutocomplete', (inputSelector, searchText, optionText) => {
    cy.get(inputSelector).clear().type(searchText);
    cy.wait(1000);
    cy.contains(optionText).click();
});

Cypress.Commands.add('verifyUrlContains', (urlPart) => {
    cy.url().should('include', urlPart);
});

Cypress.Commands.add('getByTestId', (testId) => {
    return cy.get(`[data-testid="${testId}"]`);
});

Cypress.Commands.add('clickByIndex', (selector, index) => {
    cy.get(selector).eq(index).click();
});

Cypress.Commands.add('verifyTableHasData', (tableSelector) => {
    cy.get(tableSelector).find('tr').should('have.length.at.least', 2);
});

Cypress.Commands.add('clearAndTypeIfExists', (selector, text) => {
    cy.get('body').then($body => {
        if ($body.find(selector).length > 0) {
            cy.get(selector).clear().type(text);
        }
    });
});