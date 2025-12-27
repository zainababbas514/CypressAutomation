module.exports = class AccountPage {
    elements = {
        accountDropdown: () => cy.get("#accountSelect"),
        loggedInUserName: () => cy.get('div.borderM strong span.fontBig'),

        // Deposit
        depositTabButton: () => cy.get("button[ng-class='btnClass2']"), // opens the deposit form
        depositForm: () => cy.get("form[ng-submit='deposit()']"), // form itself

        // Withdraw
        withdrawTabButton: () => cy.get("button[ng-class='btnClass3']"),
        withdrawForm: () => cy.get("form[ng-submit='withdrawl()']"),

        // Transactions
        transactionsButton: () => cy.get("button[ng-class='btnClass1']"),

        accountBalance: () => cy.get("div.center strong.ng-binding").eq(1),
        message: () => cy.get("span[ng-show='message']")
    }

    verifyLoggedInUser(userName) {
        this.elements.loggedInUserName().should('contain.text', userName);
    }

    clickTransactionsTab() {
        this.elements.transactionsButton().click();
    }

    clickDepositTab() {
        this.elements.depositTabButton().click();
    }

    clickWithdrawTab() {
        this.elements.withdrawTabButton().click();
    }

    isDepositSectionVisible() {
        return this.elements.depositForm().should('be.visible');
    }

    isWithdrawSectionVisible() {
        return this.elements.withdrawForm().should('be.visible');
    }

    typeInDepositInput(amount) {
        this.isDepositSectionVisible().find("input").type(amount);
    }

    typeInWithdrawInput(amount) {
        this.isWithdrawSectionVisible().find("input").type(amount);
    }

    clickDepositSubmitButton() {
        this.isDepositSectionVisible().find("button").click();
    }

    clickWithDrawSubmitButton() {
        this.isWithdrawSectionVisible().find("button").click();
    }

    getAccountBalance() {
        return this.elements.accountBalance()
            .invoke('text')
            .then(balance => parseFloat(balance.trim()));
    }

    isDepositSuccessMessageDisplayed() {
        this.elements.message().should('contain', 'Deposit Successful');
    }

    isWithDrawSuccessMessageDisplayed() {
        this.elements.message().should('contain', 'Transaction successful');
    }

    isWithDrawErrorMessageDisplayed() {
        this.elements.message().should('contain', 'Transaction Failed')
    }

}
