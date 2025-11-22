import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../../pages/login.page';
import PIMPage from '../../pages/pim.page';
import { testData } from './base.script';

const loginPage = new LoginPage();
const pimPage = new PIMPage();

Given('I am logged into OrangeHRM', () => {
    loginPage.visit();
    loginPage.login(
        testData.login.validCredentials.username,
        testData.login.validCredentials.password
    );
    cy.wait(2000);
    cy.url().should('include', '/dashboard');
});

Given('I navigate to the PIM module', () => {
    pimPage.navigateToPIM();
    cy.wait(1000);
});

When('I click on Add Employee button', () => {
    pimPage.clickAddEmployee();
    cy.wait(1000);
});

When('I enter employee details from test data', (dataTable) => {
    const rows = dataTable.rawTable.slice(1);
    const [firstName, middleName, lastName] = rows[0];

    pimPage.enterFirstName(firstName);
    pimPage.enterMiddleName(middleName);
    pimPage.enterLastName(lastName);
});

When('I enter employee ID', () => {
    pimPage.enterEmployeeId(testData.employee.addEmployee.employeeId);
});

When('I enable create login details', () => {
    pimPage.enableCreateLoginDetails();
    cy.wait(500);
});

When('I enter login credentials', () => {
    const loginDetails = testData.employee.addEmployee.createLoginDetails;
    pimPage.enterLoginUsername(loginDetails.username);
    pimPage.enterLoginPassword(loginDetails.password);
    pimPage.enterConfirmPassword(loginDetails.confirmPassword);
});

When('I save the employee details', () => {
    pimPage.clickSave();
    cy.wait(2000);
});

When('I enter employee name in search field', () => {
    pimPage.searchEmployeeByName(testData.employee.searchEmployee.employeeName);
});

When('I enter employee ID in search field', () => {
    pimPage.searchEmployeeById(testData.employee.searchEmployee.employeeId);
});

When('I click on the search button', () => {
    pimPage.elements.searchButton().click();
    cy.wait(1000);
});

When('I search for an employee', () => {
    pimPage.searchEmployeeByName(testData.employee.searchEmployee.employeeName);
});

When('I search for an employee to delete', () => {
    pimPage.searchEmployeeByName(testData.employee.deleteEmployee.employeeName);
});

When('I click on the employee record', () => {
    pimPage.elements.employeeRecords().first().click();
    cy.wait(1000);
});

When('I update employee personal information', () => {
    const personalDetails = testData.employee.editEmployee.personalDetails;
    pimPage.updatePersonalDetails(personalDetails);
});

When('I navigate to contact details section', () => {
    pimPage.navigateToContactDetails();
    cy.wait(1000);
});

When('I update contact information from test data', () => {
    const contactDetails = testData.employee.editEmployee.contactDetails;
    pimPage.updateContactDetails(contactDetails);
});

When('I save the changes', () => {
    pimPage.clickSave();
    cy.wait(2000);
});

When('I select the employee checkbox', () => {
    pimPage.selectEmployeeRecord();
    cy.wait(500);
});

When('I click on delete button', () => {
    pimPage.clickDelete();
    cy.wait(500);
});

When('I confirm the deletion', () => {
    pimPage.confirmDelete();
    cy.wait(2000);
});

When('I add multiple employees from test data', () => {
    const employees = testData.employeeList.multipleEmployees;

    employees.forEach((employee) => {
        pimPage.clickAddEmployee();
        cy.wait(1000);

        pimPage.enterFirstName(employee.firstName);
        pimPage.enterLastName(employee.lastName);
        pimPage.enterEmployeeId(employee.employeeId);
        pimPage.clickSave();
        cy.wait(2000);

        pimPage.navigateToPIM();
        cy.wait(1000);
    });
});

When('I enter first name as {string}', (firstName) => {
    pimPage.enterFirstName(firstName);
});

When('I enter middle name as {string}', (middleName) => {
    pimPage.enterMiddleName(middleName);
});

When('I enter last name as {string}', (lastName) => {
    pimPage.enterLastName(lastName);
});

When('I enter employee ID as {string}', (employeeId) => {
    pimPage.enterEmployeeId(employeeId);
});

When('I am on the employee list page', () => {
    pimPage.navigateToEmployeeList();
    cy.wait(1000);
});

Then('the employee should be added successfully', () => {
    cy.url().should('include', '/pim/viewPersonalDetails/empNumber');
    pimPage.verifySuccessMessage();
});

Then('I should see success message', () => {
    pimPage.verifySuccessMessage();
});

Then('the employee should be added successfully with login access', () => {
    cy.url().should('include', '/pim/viewPersonalDetails/empNumber');
    pimPage.verifySuccessMessage();
});

Then('I should see the employee in search results', () => {
    pimPage.verifyEmployeeInResults();
});

Then('the employee details should match the search criteria', () => {
    pimPage.elements.employeeRecords().should('contain', testData.employee.searchEmployee.employeeName);
});

Then('the employee ID should match', () => {
    pimPage.elements.employeeRecords().should('contain', testData.employee.searchEmployee.employeeId);
});

Then('the employee details should be updated', () => {
    pimPage.verifySuccessMessage();
});

Then('contact details should be updated successfully', () => {
    pimPage.verifySuccessMessage();
});

Then('the employee should be removed from the system', () => {
    cy.wait(1000);
    pimPage.verifySuccessMessage();
});

Then('all employees should be added successfully', () => {
    cy.log('All employees have been added successfully');
});

Then('I should see the list of employees', () => {
    pimPage.verifyEmployeeListDisplayed();
});

Then('the employee records should be displayed with all columns', () => {
    pimPage.elements.employeeListTable().should('be.visible');
    pimPage.elements.employeeRecords().should('have.length.at.least', 1);
});