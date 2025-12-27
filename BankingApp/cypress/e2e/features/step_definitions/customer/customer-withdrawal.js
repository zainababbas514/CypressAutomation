import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

import AccountPage from "../../../../pages/accountPage";
const accountPage = new AccountPage();

Given("the account balance is greater than or equal to {int}", (amount) => {
    accountPage.getAccountBalance().then(balance => {
        expect(balance).to.be.at.least(amount);
    });
});

When("the user clicks on the Withdrawl tab", () => {
    accountPage.getAccountBalance().as("accountBalance");
    accountPage.clickWithdrawTab();
});

When("the user enters {int} as withdrawal amount", (amount) => {
    accountPage.typeInWithdrawInput(amount);
});

When("the user clicks the Withdraw button", () => {
    accountPage.clickWithDrawSubmitButton();
});

Then("a withdrawal success message should be displayed", () => {
    accountPage.isWithDrawSuccessMessageDisplayed();
});

Then("the account balance should be reduced by {int}", (amount) => {
    cy.get("@accountBalance").then(balance => {
        let currentBalance = balance - amount;
        accountPage.elements.accountBalance().invoke('text').should('equal', currentBalance.toString())
    })
});

Then("a withdrawal error message should be displayed", () => {
    accountPage.isWithDrawErrorMessageDisplayed();
});

