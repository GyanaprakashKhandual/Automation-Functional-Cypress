const { Given, When, Then } = require('@cucumber/cucumber');
const GoogleHomePage = require('../../pages/google.home.page');
const GoogleSearchResultsPage = require('../../pages/search.result.page');

Given('User opens Google homepage', function () {
    GoogleHomePage.openGoogleHomepage();
    cy.wait(2000);
    GoogleHomePage.verifyGoogleUrl();
    cy.log('✓ User opened Google homepage successfully');
});

When('User enters {string} in search box', function (searchQuery) {
    GoogleHomePage.enterSearchQuery(searchQuery);
    cy.log(`✓ User entered search query: ${searchQuery}`);
});

When('User clicks Google search button', function () {
    GoogleHomePage.clickSearchButton();
    cy.log('✓ User clicked search button');
});

When('User presses Enter to search', function () {
    GoogleHomePage.pressEnterToSearch();
    cy.log('✓ User pressed Enter to search');
});

Then('Google homepage should display search box', function () {
    GoogleHomePage.verifySearchBoxVisible();
    cy.log('✓ Google search box is visible');
});

Then('Google logo should be visible', function () {
    GoogleHomePage.verifyGoogleLogoVisible();
    cy.log('✓ Google logo is visible');
});

Then('Google search button should be visible', function () {
    GoogleHomePage.verifySearchButtonVisible();
    cy.log('✓ Google search button is visible');
});

Then('Search results page should display', function () {
    GoogleSearchResultsPage.verifySearchResultsPageDisplayed();
    cy.log('✓ Search results page is displayed');
});

Then('Results count should be greater than {int}', function (count) {
    GoogleSearchResultsPage.getSearchResultsCount().then(resultCount => {
        expect(resultCount).to.be.greaterThan(count);
        cy.log(`✓ Results count (${resultCount}) is greater than ${count}`);
    });
});

Then('Search results should contain {string}', function (searchTerm) {
    GoogleSearchResultsPage.verifySearchQueryInResults(searchTerm);
    cy.log(`✓ Search results contain "${searchTerm}"`);
});

Then('Page title should contain {string}', function (expectedTitle) {
    GoogleSearchResultsPage.verifyPageTitleContainsQuery(expectedTitle);
    cy.log(`✓ Page title contains "${expectedTitle}"`);
});

Then('First search result should be visible', function () {
    GoogleSearchResultsPage.verifyFirstResultExists();
    cy.log('✓ First search result is visible');
});

Then('First search result should have valid link', function () {
    GoogleSearchResultsPage.verifyFirstResultHasValidLink();
    cy.log('✓ First search result has valid link');
});

Then('First search result should contain text', function () {
    GoogleSearchResultsPage.getFirstResultTitle().then(title => {
        expect(title).to.not.be.empty;
        cy.log(`✓ First result contains text: ${title}`);
    });
});

When('User clicks on first search result', function () {
    GoogleSearchResultsPage.clickFirstResult();
    cy.log('✓ User clicked on first search result');
});

Then('Search results should have valid links', function () {
    GoogleSearchResultsPage.verifyAllResultsHaveLinks();
    cy.log('✓ All search results have valid links');
});