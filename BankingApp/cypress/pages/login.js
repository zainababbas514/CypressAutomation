module.exports = class LoginPage {
    elements = {
        customerLoginButton: () => cy.get("button[ng-click='customer()']"),
        managerLoginButton: () => cy.get("button[ng-click='manager()']"),
        usersDropdown: () => cy.get("#userSelect"),
        loginButton: () => cy.get("button[type='submit']")
    }

    clickCustomerLoginButton() {
        this.elements.customerLoginButton().click();
    }

    clickManagerLoginButton() {
        this.elements.managerLoginButton().click();
    }

    selectUser(username) {
        this.elements.usersDropdown().select(username);
    }

    clickLoginButton() {
        this.elements.loginButton().should('be.visible').click();
    }

    customerLogin(username) {
        this.clickCustomerLoginButton();
        this.selectUser(username);
        this.clickLoginButton();
    }
 
}