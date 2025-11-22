import BasePage from './base.page';

class LoginPage extends BasePage {
    elements = {
        usernameInput: () => cy.get('input[name="username"]'),
        passwordInput: () => cy.get('input[name="password"]'),
        loginButton: () => cy.get('button[type="submit"]'),
        errorMessage: () => cy.get('.oxd-alert-content--error'),
        requiredFieldError: () => cy.get('.oxd-input-field-error-message'),
        dashboardHeader: () => cy.get('.oxd-topbar-header-breadcrumb-module'),
        userDropdown: () => cy.get('.oxd-userdropdown-tab'),
        logoutOption: () => cy.contains('Logout'),
        loginLogo: () => cy.get('.orangehrm-login-branding'),
        forgotPasswordLink: () => cy.get('.oxd-text--p')
    };

    visit() {
        super.visit('/web/index.php/auth/login');
        this.verifyUrlIncludes('/auth/login');
    }

    enterUsername(username) {
        this.typeText(this.elements.usernameInput, username);
        return this;
    }

    enterPassword(password) {
        this.typeText(this.elements.passwordInput, password);
        return this;
    }

    clickLogin() {
        this.clickElement(this.elements.loginButton);
    }

    login(username, password) {
        this.enterUsername(username);
        this.enterPassword(password);
        this.clickLogin();
    }

    loginWithValidCredentials(credentials) {
        this.login(credentials.username, credentials.password);
    }

    clickUserDropdown() {
        this.clickElement(this.elements.userDropdown);
    }

    clickLogout() {
        this.clickElement(this.elements.logoutOption);
    }

    logout() {
        this.clickUserDropdown();
        this.clickLogout();
    }

    verifyDashboardDisplayed() {
        this.verifyElementVisible(this.elements.dashboardHeader);
        this.verifyUrlIncludes('/dashboard');
    }

    verifyErrorMessage() {
        this.verifyElementVisible(this.elements.errorMessage);
    }

    verifyRequiredFieldErrors() {
        this.verifyElementCount(this.elements.requiredFieldError, 1);
    }

    verifyLoginPageDisplayed() {
        this.verifyElementVisible(this.elements.loginLogo);
        this.verifyUrlIncludes('/auth/login');
    }

    verifyLoginFormVisible() {
        this.verifyElementVisible(this.elements.usernameInput);
        this.verifyElementVisible(this.elements.passwordInput);
        this.verifyElementVisible(this.elements.loginButton);
    }
}

export default LoginPage;