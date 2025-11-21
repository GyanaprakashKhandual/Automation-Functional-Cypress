// Custom command to search Google
Cypress.Commands.add('searchGoogle', (searchQuery) => {
    cy.visit('https://www.google.com');
    cy.wait(2000);
    cy.get('input[name="q"]').type(searchQuery);
    cy.get('input[name="q"]').type('{enter}');
    cy.wait(3000);
    cy.log(`✓ Searched for: ${searchQuery}`);
});

// Custom command to get search results count
Cypress.Commands.add('getResultsCount', () => {
    return cy.get('div.g').its('length');
});

// Custom command to verify element with retry
Cypress.Commands.add('verifyElementWithRetry', (selector, maxRetries = 3) => {
    let attempts = 0;

    const verify = () => {
        attempts++;
        return cy.get(selector, { timeout: 5000 }).catch(() => {
            if (attempts < maxRetries) {
                cy.wait(1000);
                return verify();
            }
            throw new Error(`Element ${selector} not found after ${maxRetries} attempts`);
        });
    };

    return verify();
});

// Custom command to take screenshot on failure
Cypress.Commands.add('takeScreenshot', (filename) => {
    cy.screenshot(filename, { overwrite: true });
});

// Custom command to clear all browser data
Cypress.Commands.add('clearBrowserData', () => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.clearSessionStorage();
    cy.log('✓ Browser data cleared');
});

// Custom command to get all links
Cypress.Commands.add('getAllLinks', (selector) => {
    return cy.get(selector).then($elements => {
        const links = [];
        $elements.each((index, element) => {
            links.push(element.href);
        });
        return links;
    });
});

// Custom command to verify page load
Cypress.Commands.add('verifyPageLoad', (timeout = 10000) => {
    cy.get('body', { timeout }).should('exist');
    cy.log('✓ Page loaded successfully');
});

// Custom command to perform search with enter key
Cypress.Commands.add('searchWithEnter', (selector, searchQuery) => {
    cy.get(selector).clear().type(searchQuery);
    cy.get(selector).type('{enter}');
    cy.wait(3000);
    cy.log(`✓ Searched using Enter key for: ${searchQuery}`);
});