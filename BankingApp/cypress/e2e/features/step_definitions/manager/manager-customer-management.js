import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import ManagerHomePage from "../../../../pages/managerHomePage";

const managerHomePage = new ManagerHomePage();

// Scenario: Verify customer search functionality
When("the user clicks on the Customers tab", () => {
    managerHomePage.clickCustomersTab();
    managerHomePage.isCustomersTableDisplayed();
});

When('the user enters {string} in the search field', (searchText) => {
    search = searchText;
    managerHomePage.searchCustomer(searchText);
});

Then("matching customer records should be displayed for {string}", (searchText) => {
    managerHomePage.verifySeachResults(searchText);
});

// Scenario: Verify delete customer functionality
When("the user deletes the customer with account number {string}", (accountNumber) => {
    managerHomePage.deleteCustomerByAccountNumber(accountNumber);
});

Then("the customer with account number {string} should be removed from the list", (accountNumber) => {
    managerHomePage.verifyCustomerDeleted(accountNumber);
});
