import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import ManagerHomePage from "../../../../pages/managerHomePage";

const managerHomePage = new ManagerHomePage();

// Scenario: Verify Add Customer functionality
When("the user clicks the Add Customer tab", () => {
    managerHomePage.clickAddCustomerTab();
    managerHomePage.isAddCustomerFormDisplayed();
});

When("the user enters the following customer details:", (dataTable) => {
    const customer = dataTable.hashes()[0];
    managerHomePage.typeInFirstName(customer["First Name"]);
    managerHomePage.typeInLastName(customer["Last Name"]);
    managerHomePage.typeInPostalCode(customer["Post Code"]);
});

Then("the customer should be added successfully", () => {
    cy.on("window:alert", (alertText) => {
        expect(alertText).to.contain("Customer added successfully");
    });

    managerHomePage.clickSubmitButton();
});
