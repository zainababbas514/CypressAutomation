import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import ManagerHomePage from "../../../../pages/managerHomePage";

const managerHomePage = new ManagerHomePage();

// Scenario: Verify Open Account functionality
When("the user clicks the Open Account tab", () => {
    managerHomePage.clickOpenAccountTab();
    managerHomePage.isOpenAccountFormDisplayed();
});

When('the user selects the customer {string}', (customerName) => {
    managerHomePage.selectCustomer(customerName);
});

When('the user selects the currency {string}', (currency) => {
    managerHomePage.selectCurrency(currency);
});

When("the user clicks the Process button", () => {
    managerHomePage.clickSubmitButton();
});

Then("the account should be created successfully", () => {
       cy.on("window:alert", (alertText) => {
        expect(alertText).to.contain("Account created successfully");
    });

    managerHomePage.clickSubmitButton();
});
