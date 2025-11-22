import { Before } from '@badeball/cypress-cucumber-preprocessor';

let testData;

Before(() => {
    cy.fixture('pim.data.json').then((data) => {
        testData = data;
    });
});

export { testData };