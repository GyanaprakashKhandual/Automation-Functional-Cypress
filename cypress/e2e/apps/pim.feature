Feature: PIM (Personnel Information Management) Module
  As an HR administrator
  I want to manage employee information
  So that I can maintain accurate employee records

  Background:
    Given I am logged into OrangeHRM
    And I navigate to the PIM module

  @smoke @pim
  Scenario: Add a new employee successfully
    When I click on Add Employee button
    And I enter employee details from test data
      | firstName  | middleName | lastName |
      | John       | Michael    | Doe      |
    And I enter employee ID
    And I save the employee details
    Then the employee should be added successfully
    And I should see success message

  @regression @pim
  Scenario: Add employee with login details
    When I click on Add Employee button
    And I enter employee details from test data
      | firstName  | middleName | lastName |
      | John       | Michael    | Doe      |
    And I enable create login details
    And I enter login credentials
    And I save the employee details
    Then the employee should be added successfully with login access

  @smoke @pim
  Scenario: Search for an existing employee
    When I enter employee name in search field
    And I click on the search button
    Then I should see the employee in search results
    And the employee details should match the search criteria

  @regression @pim
  Scenario: Search employee by ID
    When I enter employee ID in search field
    And I click on the search button
    Then I should see the employee in search results
    And the employee ID should match

  @smoke @pim
  Scenario: Edit employee personal details
    When I search for an employee
    And I click on the employee record
    And I update employee personal information
    And I save the changes
    Then I should see success message
    And the employee details should be updated

  @regression @pim
  Scenario: Update employee contact details
    When I search for an employee
    And I click on the employee record
    And I navigate to contact details section
    And I update contact information from test data
    And I save the changes
    Then contact details should be updated successfully

  @regression @pim
  Scenario: Delete an employee record
    When I search for an employee to delete
    And I select the employee checkbox
    And I click on delete button
    And I confirm the deletion
    Then the employee should be removed from the system
    And I should see success message

  @regression @pim
  Scenario: Add multiple employees
    When I add multiple employees from test data
    Then all employees should be added successfully

  @smoke @pim
  Scenario: View employee list
    When I am on the employee list page
    Then I should see the list of employees
    And the employee records should be displayed with all columns

  @regression @pim
  Scenario Outline: Add employees with different data
    When I click on Add Employee button
    And I enter first name as "<firstName>"
    And I enter middle name as "<middleName>"
    And I enter last name as "<lastName>"
    And I enter employee ID as "<employeeId>"
    And I save the employee details
    Then the employee should be added successfully

    Examples:
      | firstName | middleName | lastName  | employeeId |
      | Alice     | Marie      | Johnson   | EMP005     |
      | Bob       | Thomas     | Williams  | EMP006     |
      | Charlie   | James      | Brown     | EMP007     |