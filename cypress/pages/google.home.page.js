const BasePage = require('./base.page');

class GoogleHomePage extends BasePage {
    constructor() {
        super();
        // Google Home Page Selectors
        this.googleLogo = 'img[alt="Google"]';
        this.searchBox = 'input[name="q"]';
        this.searchButton = 'button[name="btnK"]';
        this.googleSearchButton = 'input[value="Google Search"]';
        this.luckyButton = 'input[value="I\'m Feeling Lucky"]';
        this.settingsLink = 'a:contains("Settings")';
        this.languageSection = 'div[jsname="WJz9Hc"]';
        this.footerLinks = 'footer a';
    }

    // Open Google Homepage
    openGoogleHomepage() {
        this.visit('https://www.google.com');
        cy.wait(2000);
    }

    // Verify Google logo is visible
    verifyGoogleLogoVisible() {
        this.isElementVisible(this.googleLogo);
        cy.get(this.googleLogo).should('be.visible');
    }

    // Verify search box is visible
    verifySearchBoxVisible() {
        this.isElementVisible(this.searchBox);
        cy.get(this.searchBox).should('be.visible');
    }

    // Verify search button is visible
    verifySearchButtonVisible() {
        // Try different selectors as Google changes button elements
        cy.get('body').then($body => {
            if ($body.find(this.searchButton).length > 0) {
                cy.get(this.searchButton).first().should('be.visible');
            } else if ($body.find(this.googleSearchButton).length > 0) {
                cy.get(this.googleSearchButton).first().should('be.visible');
            }
        });
    }

    // Enter search query
    enterSearchQuery(searchQuery) {
        this.typeText(this.searchBox, searchQuery);
        cy.wait(1000);
    }

    // Click search button
    clickSearchButton() {
        cy.get('body').then($body => {
            if ($body.find(this.searchButton).length > 0) {
                cy.get(this.searchButton).first().click();
            } else if ($body.find(this.googleSearchButton).length > 0) {
                cy.get(this.googleSearchButton).first().click();
            }
        });
        cy.wait(3000);
    }

    // Press Enter to search
    pressEnterToSearch() {
        cy.get(this.searchBox).type('{enter}');
        cy.wait(3000);
    }

    // Verify Google page title
    verifyGooglePageTitle() {
        cy.title().should('eq', 'Google');
    }

    // Verify search box has placeholder text
    verifySearchBoxPlaceholder() {
        cy.get(this.searchBox).should('have.attr', 'placeholder', 'Search');
    }

    // Get search box value
    getSearchBoxValue() {
        return cy.get(this.searchBox).invoke('val');
    }

    // Clear search box
    clearSearchBox() {
        cy.get(this.searchBox).clear();
    }

    // Verify page URL is Google
    verifyGoogleUrl() {
        cy.url().should('include', 'google.com');
    }
}

module.exports = new GoogleHomePage();