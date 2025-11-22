import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../../pages/login.page';
import { testData } from './base.script';

const loginPage = new LoginPage();

Given('I navigate to the OrangeHRM login page', () => {
    loginPage.visit();
    loginPage.verifyLoginFormVisible();
});

When('I enter valid username and password', () => {
    loginPage.enterUsername(testData.login.validCredentials.username);
    loginPage.enterPassword(testData.login.validCredentials.password);
});

When('I enter invalid username and password', () => {
    loginPage.enterUsername(testData.login.invalidCredentials.username);
    loginPage.enterPassword(testData.login.invalidCredentials.password);
});

When('I click on the login button', () => {
    loginPage.clickLogin();
});

When('I leave the username and password fields empty', () => {
    loginPage.elements.usernameInput().clear();
    loginPage.elements.passwordInput().clear();
});

When('I login with valid credentials', () => {
    loginPage.login(
        testData.login.validCredentials.username,
        testData.login.validCredentials.password
    );
    cy.wait(2000);
});

When('I click on the user dropdown menu', () => {
    loginPage.clickUserDropdown();
});

When('I click on logout option', () => {
    loginPage.clickLogout();
});

Then('I should be redirected to the dashboard page', () => {
    cy.url().should('include', '/dashboard');
    cy.wait(1000);
});

Then('I should see the dashboard header', () => {
    loginPage.verifyDashboardDisplayed();
});

Then('I should see an error message', () => {
    loginPage.verifyErrorMessage();
});

Then('I should remain on the login page', () => {
    loginPage.verifyLoginPageDisplayed();
});

Then('I should see required field error messages', () => {
    loginPage.verifyRequiredFieldErrors();
});

Then('I should be redirected to the login page', () => {
    loginPage.verifyLoginPageDisplayed();
});