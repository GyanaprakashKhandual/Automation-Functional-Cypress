const { When, Then } = require('@cucumber/cucumber');
const GoogleSearchResultsPage = require('../../pages/search.result.page');
const GoogleHomePage = require('../../pages/google.home.page');

When('User searches for {string}', function (searchQuery) {
    GoogleHomePage.enterSearchQuery(searchQuery);
    GoogleHomePage.pressEnterToSearch();
    cy.log(`✓ User searched for: ${searchQuery}`);
});

Then('Results page title should be {string}', function (expectedTitle) {
    cy.title().then(title => {
        expect(title).to.include(expectedTitle);
        cy.log(`✓ Page title matches: ${expectedTitle}`);
    });
});

Then('Number of results should be greater than {int}', function (minResults) {
    GoogleSearchResultsPage.getDisplayedResultsNumber().then(count => {
        expect(count).to.be.greaterThan(minResults);
        cy.log(`✓ Number of results (${count}) is greater than ${minResults}`);
    });
});

Then('Search statistics should be visible', function () {
    GoogleSearchResultsPage.verifyResultsStatsVisible();
    GoogleSearchResultsPage.getResultsStats().then(stats => {
        cy.log(`✓ Search statistics visible: ${stats}`);
    });
});

Then('First result URL should be clickable', function () {
    GoogleSearchResultsPage.getFirstResultUrl().then(url => {
        expect(url).to.not.be.empty;
        expect(url).to.include('http');
        cy.log(`✓ First result URL is valid: ${url}`);
    });
});

When('User scrolls to result at position {int}', function (position) {
    GoogleSearchResultsPage.scrollToResult(position);
    cy.log(`✓ User scrolled to result at position ${position}`);
});

Then('Result at position {int} should contain {string}', function (position, text) {
    GoogleSearchResultsPage.verifyResultContainsText(position, text);
    cy.log(`✓ Result at position ${position} contains: ${text}`);
});

When('User clicks next page button', function () {
    GoogleSearchResultsPage.clickNextPageButton();
    cy.log('✓ User clicked next page button');
});

Then('All results should have clickable links', function () {
    GoogleSearchResultsPage.verifyAllResultsHaveLinks();
    cy.log('✓ All results have clickable links');
});

Then('Search box value should be {string}', function (expectedValue) {
    GoogleHomePage.getSearchBoxValue().then(value => {
        expect(value).to.equal(expectedValue);
        cy.log(`✓ Search box contains: ${expectedValue}`);
    });
});

Then('Result titles should not be empty', function () {
    GoogleSearchResultsPage.getAllResultTitles().then(titles => {
        expect(titles).to.not.be.empty;
        cy.log(`✓ Result titles are not empty`);
    });
});

Then('First result title should contain {string}', function (expectedText) {
    GoogleSearchResultsPage.getFirstResultTitle().then(title => {
        expect(title.toLowerCase()).to.include(expectedText.toLowerCase());
        cy.log(`✓ First result title contains: ${expectedText}`);
    });
});