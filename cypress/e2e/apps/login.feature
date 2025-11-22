Feature: OrangeHRM Login Functionality
  As a user of OrangeHRM
  I want to be able to login to the system
  So that I can access the application features

  Background:
    Given I navigate to the OrangeHRM login page

  @smoke @login
  Scenario: Successful login with valid credentials
    When I enter valid username and password
    And I click on the login button
    Then I should be redirected to the dashboard page
    And I should see the dashboard header

  @regression @login
  Scenario: Unsuccessful login with invalid credentials
    When I enter invalid username and password
    And I click on the login button
    Then I should see an error message
    And I should remain on the login page

  @regression @login
  Scenario: Login with empty credentials
    When I leave the username and password fields empty
    And I click on the login button
    Then I should see required field error messages

  @regression @login
  Scenario: Logout functionality
    When I login with valid credentials
    And I click on the user dropdown menu
    And I click on logout option
    Then I should be redirected to the login page