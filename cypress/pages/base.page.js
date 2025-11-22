class BasePage {
    visit(url) {
        cy.visit(url);
    }

    clickElement(element) {
        element().click();
    }

    typeText(element, text) {
        element().clear().type(text);
        return this;
    }

    verifyUrlIncludes(urlPart) {
        cy.url().should('include', urlPart);
    }

    verifyElementVisible(element) {
        element().should('be.visible');
    }

    verifyElementCount(element, count) {
        element().should('have.length.at.least', count);
    }

    waitFor(milliseconds) {
        cy.wait(milliseconds);
    }

    clickWithForce(element, index = null) {
        if (index !== null) {
            element().eq(index).click({ force: true });
        } else {
            element().click({ force: true });
        }
    }
}

export default BasePage;