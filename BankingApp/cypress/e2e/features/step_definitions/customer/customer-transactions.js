import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import AccountPage from "../../../../pages/accountPage";
import TransactionsPage from "../../../../pages/transactionsPage";

const accountPage = new AccountPage();
const transactionsPage = new TransactionsPage();

When("the user clicks on the Transactions tab", () => {
    accountPage.clickTransactionsTab();
});

Then("the transaction table should be displayed", () => {
    transactionsPage.isTransactionTableDisplayed();
});

Then("credit and debit entries should be visible", () => {
    transactionsPage.verifyCreditAndDebitTransactionsExist();
});

// Scenario: Verify transaction reset functionality
When("the user clicks on the Reset button", () => {
    transactionsPage.resetTransactions();
});

Then("no transactions should be displayed", () => {
    transactionsPage.isTransactionsReset();
});
