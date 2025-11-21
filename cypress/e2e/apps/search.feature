Feature: Google Search Functionality

    Background:
        Given User opens Google homepage

    Scenario: Verify Google homepage loads correctly
        Then Google homepage should display search box
        And Google logo should be visible
        And Google search button should be visible

    Scenario: Perform a single search and verify results
        When User enters "Cypress testing" in search box
        And User clicks Google search button
        Then Search results page should display
        And Search results should contain "Cypress"
        And Results count should be greater than 0
        And Page title should contain "Cypress testing"

    Scenario: Verify search result links are clickable
        When User enters "Automation testing" in search box
        And User clicks Google search button
        Then First search result should be visible
        And First search result should have valid link
        And First search result should contain text

    Scenario Outline: Multiple search queries
        When User enters "<searchQuery>" in search box
        And User clicks Google search button
        Then Search results page should display
        And Results count should be greater than 0
        And Page title should contain "<searchQuery>"

        Examples:
            | searchQuery           |
            | JavaScript Cypress    |
            | Automation Framework  |
            | Web Testing Tools     |
            | QA Testing Frameworks |