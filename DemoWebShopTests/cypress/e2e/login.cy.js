const loginData = require("../fixtures/loginData.json");

import HomePage from "../pages/homePage"
const homePage = new HomePage();

import LoginPage from "../pages/loginPage"
const loginPage = new LoginPage();


describe("Login", () => {

    beforeEach(() => {
        cy.visit("/")
    })

    loginData['valid_credentials'].forEach((user) => {
        it("Login with valid credentials", () => {
            homePage.header().click_header_link("Log in")
            cy.waitForRedirection(loginPage.elements.login_heading)
            cy.login(user.email, user.password)
            homePage.header().verifyUserLoggedIn(user.email)
        });
    })

    loginData['invalid_credentials'].forEach((user) => {
        it("Login with invalid credentials", () => {
            homePage.header().click_header_link("Log in")
            cy.waitForRedirection(loginPage.elements.login_heading)
            cy.login(user.email, user.password)
            loginPage.verifyErrorMessageIsDisplayed()
        });
    })
})
