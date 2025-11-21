const BasePage = require('./base.page');

class GoogleSearchResultsPage extends BasePage {
    constructor() {
        super();
        // Google Search Results Page Selectors
        this.searchResults = 'div#search';
        this.resultItems = 'div.g';
        this.resultTitles = 'h3';
        this.resultLinks = 'a[href^="http"]';
        this.resultDescriptions = 'div.VwiC3b';
        this.firstResult = 'div.g:first-child';
        this.firstResultTitle = 'div.g:first-child h3';
        this.firstResultLink = 'div.g:first-child a';
        this.resultsStats = 'div#result-stats';
        this.searchBox = 'input[name="q"]';
        this.paginationNextButton = 'a#pnext';
        this.paginationPrevButton = 'a#pnext';
        this.relatedSearches = 'div.msTBw';
    }

    // Verify search results page is displayed
    verifySearchResultsPageDisplayed() {
        cy.get(this.searchResults, { timeout: 10000 }).should('be.visible');
    }

    // Get search results count
    getSearchResultsCount() {
        return cy.get(this.resultItems).its('length');
    }

    // Verify search results count is greater than 0
    verifyResultsCountGreaterThanZero() {
        cy.get(this.resultItems).should('have.length.greaterThan', 0);
    }

    // Get all result titles
    getAllResultTitles() {
        return cy.get(this.resultTitles).invoke('text');
    }

    // Verify first result exists
    verifyFirstResultExists() {
        cy.get(this.firstResult).should('exist');
        cy.get(this.firstResult).should('be.visible');
    }

    // Get first result title
    getFirstResultTitle() {
        return cy.get(this.firstResultTitle).invoke('text');
    }

    // Get first result URL
    getFirstResultUrl() {
        return cy.get(this.firstResultLink).invoke('attr', 'href');
    }

    // Verify first result has valid link
    verifyFirstResultHasValidLink() {
        cy.get(this.firstResultLink).should('have.attr', 'href');
        cy.get(this.firstResultLink).invoke('attr', 'href').should('not.be.empty');
    }

    // Verify search query is in page title
    verifySearchQueryInPageTitle(searchQuery) {
        cy.title().should('include', searchQuery);
    }

    // Verify search query is in results
    verifySearchQueryInResults(searchQuery) {
        cy.get(this.searchResults).should('contain', searchQuery);
    }

    // Click on first search result
    clickFirstResult() {
        cy.get(this.firstResultLink).first().click();
        cy.wait(3000);
    }

    // Verify result contains specific text
    verifyResultContainsText(resultIndex, text) {
        cy.get(this.resultItems).eq(resultIndex).should('contain', text);
    }

    // Get number of results displayed
    getDisplayedResultsNumber() {
        return cy.get(this.resultItems).then($results => {
            return $results.length;
        });
    }

    // Verify results statistics are visible
    verifyResultsStatsVisible() {
        cy.get(this.resultsStats).should('be.visible');
    }

    // Get results statistics text
    getResultsStats() {
        return cy.get(this.resultsStats).invoke('text');
    }

    // Verify next page button exists
    verifyNextPageButtonExists() {
        cy.get(this.paginationNextButton).should('exist');
    }

    // Click next page button
    clickNextPageButton() {
        cy.get(this.paginationNextButton).click();
        cy.wait(3000);
    }

    // Verify search box contains search query
    verifySearchBoxContainsQuery(query) {
        cy.get(this.searchBox).should('have.value', query);
    }

    // Get all result links
    getAllResultLinks() {
        return cy.get(this.resultLinks).then($links => {
            const links = [];
            $links.each((index, link) => {
                links.push(link.href);
            });
            return links;
        });
    }

    // Verify all results have links
    verifyAllResultsHaveLinks() {
        cy.get(this.resultItems).each($result => {
            cy.wrap($result).find('a').should('have.attr', 'href');
        });
    }

    // Scroll to specific result
    scrollToResult(resultIndex) {
        cy.get(this.resultItems).eq(resultIndex).scrollIntoView();
    }

    // Verify page title contains search query
    verifyPageTitleContainsQuery(query) {
        cy.title().then(title => {
            expect(title).to.include(query);
        });
    }
}

module.exports = new GoogleSearchResultsPage();