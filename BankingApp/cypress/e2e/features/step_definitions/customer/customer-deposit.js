import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

import AccountPage from "../../../../pages/accountPage";
const accountPage = new AccountPage();

When("the user clicks on the Deposit tab", () => {
    accountPage.getAccountBalance().as("accountBalance");
    accountPage.clickDepositTab();
    accountPage.isDepositSectionVisible();
});

When("the user enters a valid deposit amount of {int}", (amount) => {
    accountPage.typeInDepositInput(amount);
});

When("the user clicks the Deposit button", () => {
    accountPage.clickDepositSubmitButton();
});

Then("a deposit success message should be displayed", () => {
    accountPage.isDepositSuccessMessageDisplayed();
});

Then("the account balance should increase by {int}", (amount) => {
    cy.get("@accountBalance").then(balance => {
        let balanceAfterDeposit = balance + amount;
        accountPage.elements.accountBalance().invoke('text').should('equal', balanceAfterDeposit.toString())
    });
});

When("the user enters an invalid deposit amount of {int}", (amount) => {
    accountPage.typeInDepositInput(amount);
});

