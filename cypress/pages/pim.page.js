import BasePage from './base.page';

class PIMPage extends BasePage {
    elements = {
        pimMenu: () => cy.contains('PIM'),
        addEmployeeButton: () => cy.contains('button', 'Add'),
        addEmployeeMenuItem: () => cy.contains('Add Employee'),
        employeeListMenuItem: () => cy.contains('Employee List'),

        firstNameInput: () => cy.get('input[name="firstName"]'),
        middleNameInput: () => cy.get('input[name="middleName"]'),
        lastNameInput: () => cy.get('input[name="lastName"]'),
        employeeIdInput: () => cy.get('.oxd-grid-item > .oxd-input-group > .oxd-input-group__label-wrapper').contains('Employee Id').parent().parent().find('input'),

        createLoginToggle: () => cy.get('.oxd-switch-input'),
        usernameInput: () => cy.get('input[autocomplete="off"]').eq(1),
        passwordInput: () => cy.get('input[type="password"]').eq(0),
        confirmPasswordInput: () => cy.get('input[type="password"]').eq(1),

        saveButton: () => cy.get('button[type="submit"]'),
        cancelButton: () => cy.contains('button', 'Cancel'),

        employeeNameInput: () => cy.get('.oxd-autocomplete-text-input > input'),
        employeeIdSearchInput: () => cy.get('.oxd-grid-item').eq(1).find('input'),
        searchButton: () => cy.get('button[type="submit"]'),
        resetButton: () => cy.contains('button', 'Reset'),

        employeeListTable: () => cy.get('.oxd-table-body'),
        employeeRecords: () => cy.get('.oxd-table-card'),
        recordCheckbox: () => cy.get('.oxd-checkbox-input'),
        deleteButton: () => cy.get('.oxd-button--label-danger'),
        confirmDeleteButton: () => cy.contains('button', 'Yes, Delete'),

        personalDetailsTab: () => cy.contains('Personal Details'),
        contactDetailsTab: () => cy.contains('Contact Details'),
        licenseNumberInput: () => cy.get('.oxd-grid-item').contains('License Number').parent().parent().find('input'),
        licenseExpiryDateInput: () => cy.get('.oxd-grid-item').contains('License Expiry Date').parent().parent().find('input'),
        nationalityDropdown: () => cy.get('.oxd-select-text--arrow').eq(0),
        maritalStatusDropdown: () => cy.get('.oxd-select-text--arrow').eq(1),
        dateOfBirthInput: () => cy.get('.oxd-grid-item').contains('Date of Birth').parent().parent().find('input'),
        genderRadio: (gender) => cy.get('.oxd-radio-input').parent().contains(gender).parent().find('input'),

        street1Input: () => cy.get('.oxd-grid-item').contains('Street 1').parent().parent().find('input'),
        street2Input: () => cy.get('.oxd-grid-item').contains('Street 2').parent().parent().find('input'),
        cityInput: () => cy.get('.oxd-grid-item').contains('City').parent().parent().find('input'),
        stateInput: () => cy.get('.oxd-grid-item').contains('State/Province').parent().parent().find('input'),
        zipCodeInput: () => cy.get('.oxd-grid-item').contains('Zip/Postal Code').parent().parent().find('input'),
        countryDropdown: () => cy.get('.oxd-select-text--arrow').eq(0),
        homeTelephoneInput: () => cy.get('.oxd-grid-item').contains('Home').parent().parent().find('input'),
        mobileInput: () => cy.get('.oxd-grid-item').contains('Mobile').parent().parent().find('input'),
        workTelephoneInput: () => cy.get('.oxd-grid-item').contains('Work').parent().parent().find('input'),
        workEmailInput: () => cy.get('.oxd-grid-item').contains('Work Email').parent().parent().find('input'),
        otherEmailInput: () => cy.get('.oxd-grid-item').contains('Other Email').parent().parent().find('input'),

        successMessage: () => cy.get('.oxd-toast-content--success'),
        toastMessage: () => cy.get('.oxd-toast')
    };

    navigateToPIM() {
        this.clickElement(this.elements.pimMenu);
        this.verifyUrlIncludes('/pim');
    }

    clickAddEmployee() {
        this.clickElement(this.elements.addEmployeeButton);
        this.verifyUrlIncludes('/addEmployee');
    }

    navigateToEmployeeList() {
        this.clickElement(this.elements.employeeListMenuItem);
    }

    enterFirstName(firstName) {
        this.typeText(this.elements.firstNameInput, firstName);
        return this;
    }

    enterMiddleName(middleName) {
        this.typeText(this.elements.middleNameInput, middleName);
        return this;
    }

    enterLastName(lastName) {
        this.typeText(this.elements.lastNameInput, lastName);
        return this;
    }

    enterEmployeeId(employeeId) {
        this.typeText(this.elements.employeeIdInput, employeeId);
        return this;
    }

    enableCreateLoginDetails() {
        this.clickElement(this.elements.createLoginToggle);
    }

    enterLoginUsername(username) {
        this.typeText(this.elements.usernameInput, username);
        return this;
    }

    enterLoginPassword(password) {
        this.typeText(this.elements.passwordInput, password);
        return this;
    }

    enterConfirmPassword(confirmPassword) {
        this.typeText(this.elements.confirmPasswordInput, confirmPassword);
        return this;
    }

    clickSave() {
        this.clickElement(this.elements.saveButton);
    }

    addEmployee(employeeData) {
        this.enterFirstName(employeeData.firstName);
        this.enterMiddleName(employeeData.middleName);
        this.enterLastName(employeeData.lastName);
        this.enterEmployeeId(employeeData.employeeId);
        this.clickSave();
    }

    addEmployeeWithLogin(employeeData, loginData) {
        this.enterFirstName(employeeData.firstName);
        this.enterMiddleName(employeeData.middleName);
        this.enterLastName(employeeData.lastName);
        this.enterEmployeeId(employeeData.employeeId);
        this.enableCreateLoginDetails();
        this.waitFor(500);
        this.enterLoginUsername(loginData.username);
        this.enterLoginPassword(loginData.password);
        this.enterConfirmPassword(loginData.confirmPassword);
        this.clickSave();
    }

    searchEmployeeByName(employeeName) {
        this.typeText(this.elements.employeeNameInput, employeeName);
        this.waitFor(1000);
        this.clickElement(this.elements.searchButton);
        this.waitFor(1000);
    }

    searchEmployeeById(employeeId) {
        this.typeText(this.elements.employeeIdSearchInput, employeeId);
        this.clickElement(this.elements.searchButton);
        this.waitFor(1000);
    }

    updatePersonalDetails(personalData) {
        if (personalData.licenseNumber) {
            this.typeText(this.elements.licenseNumberInput, personalData.licenseNumber);
        }
        if (personalData.dateOfBirth) {
            this.typeText(this.elements.dateOfBirthInput, personalData.dateOfBirth);
        }
        if (personalData.gender) {
            this.clickWithForce(this.elements.genderRadio(personalData.gender));
        }
    }

    navigateToContactDetails() {
        this.clickElement(this.elements.contactDetailsTab);
    }

    updateContactDetails(contactData) {
        if (contactData.street1) {
            this.typeText(this.elements.street1Input, contactData.street1);
        }
        if (contactData.street2) {
            this.typeText(this.elements.street2Input, contactData.street2);
        }
        if (contactData.city) {
            this.typeText(this.elements.cityInput, contactData.city);
        }
        if (contactData.state) {
            this.typeText(this.elements.stateInput, contactData.state);
        }
        if (contactData.zipCode) {
            this.typeText(this.elements.zipCodeInput, contactData.zipCode);
        }
        if (contactData.mobile) {
            this.typeText(this.elements.mobileInput, contactData.mobile);
        }
        if (contactData.workEmail) {
            this.typeText(this.elements.workEmailInput, contactData.workEmail);
        }
    }

    selectEmployeeRecord(index = 0) {
        this.clickWithForce(this.elements.recordCheckbox, index);
    }

    clickDelete() {
        this.clickElement(this.elements.deleteButton);
    }

    confirmDelete() {
        this.clickElement(this.elements.confirmDeleteButton);
    }

    deleteEmployee() {
        this.selectEmployeeRecord();
        this.clickDelete();
        this.confirmDelete();
    }

    verifySuccessMessage() {
        this.verifyElementVisible(this.elements.successMessage);
    }

    verifyEmployeeInResults() {
        this.verifyElementCount(this.elements.employeeRecords, 1);
    }

    verifyNoRecordsFound() {
        cy.contains('No Records Found').should('be.visible');
    }

    verifyEmployeeListDisplayed() {
        this.verifyElementVisible(this.elements.employeeListTable);
    }
}

export default PIMPage;