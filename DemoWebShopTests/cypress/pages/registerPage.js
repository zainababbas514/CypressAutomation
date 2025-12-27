module.exports = class RegisterPage {
    elements = {
        gender_radios: () => cy.get("input[name='Gender']"),
        first_name_input: () => cy.get("#FirstName"),
        last_name_input: () => cy.get("#LastName"),
        email_input: () => cy.get("#Email"),
        password_input: () => cy.get("#Password"),
        confirm_password_input: () => cy.get("#ConfirmPassword"),
        register_button: () => cy.get("#register-button"),
        page_heading: ".registration-page h1"
    }

    selectGender(value) {
        this.elements.gender_radios().check(value)
    }

    enterFirstName(firstName) {
        this.elements.first_name_input().type(firstName)
    }

    enterLastName(lastName) {
        this.elements.last_name_input().type(lastName)
    }

    enterEmail(email) {
        this.elements.email_input().type(email)
    }

    enterPassword(password) {
        this.elements.password_input().type(password)
    }

    enterConfirmPassword(confirmPassword) {
        this.elements.confirm_password_input().type(confirmPassword)
    }

    clickRegisterButton() {
        this.elements.register_button().click()
    }
}