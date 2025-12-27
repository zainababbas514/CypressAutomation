import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../../pages/login";
import AccountPage from "../../../pages/accountPage";
import ManagerHomePage from "../../../pages/managerHomePage";

const loginPage = new LoginPage();
const accountPage = new AccountPage();
const managerHomePage = new ManagerHomePage();

beforeEach(() => {
    cy.visit("/");
});

Given("the user is logged in as a Manager", () => {
    loginPage.clickManagerLoginButton();
});

Given("the user is on the Manager Home Page", () => {
    managerHomePage.isManagerDashboardVisible();
});

Given("the user is logged in as a customer", () => {
    loginPage.customerLogin("Hermoine Granger");
});

Given("the user is on the Account page", () => {
    accountPage.verifyLoggedInUser("Hermoine Granger");
});

Then("the account balance should remain the same", () => {
    cy.get("@accountBalance").then(balance => {
        accountPage.elements.accountBalance().invoke('text').should('equal', balance.toString())
    });
});