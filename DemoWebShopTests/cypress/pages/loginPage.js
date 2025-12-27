module.exports = class LoginPage {
    elements = {
        email_input: () => cy.get("#Email"),
        password_input: () => cy.get("#Password"),
        login_button: () => cy.get(".login-button"),
        login_error_message: () => cy.get(".validation-summary-errors"),
        login_heading: ".login-page h1"
    }

    enterEmail(email) {
        this.elements.email_input().then((emailInput) => {
            if (email !== "") {
                cy.wrap(emailInput).type(email)
            }
        })
    }

    enterPassword(password) {
        this.elements.password_input().then((passwordInput) => {
            if (password !== "") {
                cy.wrap(passwordInput).type(password)
            }
        })
    }
    clickLoginButton() {
        this.elements.login_button().click()
    }

    login(email, password) {
        this.enterEmail(email)
        this.enterPassword(password)
        this.clickLoginButton()
    }

    verifyErrorMessageIsDisplayed() {
        this.elements.login_error_message()
            .should('be.visible')
            .and('contain', "Login was unsuccessful.")

        cy.url().should('include', "login")
    }
}