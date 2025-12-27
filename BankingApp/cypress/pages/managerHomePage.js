module.exports = class ManagerHomePage {
    elements = {
        addCustomerTab: () => cy.get("button[ng-click='addCust()']"),
        addCustomerForm: () => cy.get("form[ng-submit='addCustomer()']"),

        openAccountTab: () => cy.get("button[ng-click='openAccount()']"),
        openAccountForm: () => cy.get("form[ng-submit='process()']"),

        customerDropdown: () => cy.get("#userSelect"),
        currencyDropdown: () => cy.get("select#currency"),

        customersTab: () => cy.get("button[ng-click='showCust()']"),
        customersTable: () => cy.get("table.table-bordered"),
        customerSearchInput: () => cy.get("input[ng-model='searchCustomer']"),

        // Add customer
        firstNameInput: () => cy.get("input[ng-model='fName']"),
        lastNameInput: () => cy.get("input[ng-model='lName']"),
        postalCodeInput: () => cy.get("input[ng-model='postCd']"),
        submitFormButton: () => cy.get("button[type='submit']"),
    }

    clickAddCustomerTab() {
        this.elements.addCustomerTab().click();
    }

    clickOpenAccountTab() {
        this.elements.openAccountTab().click();
    }

    clickCustomersTab() {
        this.elements.customersTab().click();
    }

    isAddCustomerFormDisplayed() {
        this.elements.addCustomerForm().should('be.visible');
    }

    isOpenAccountFormDisplayed() {
        this.elements.openAccountForm().should('be.visible');
    }

    isCustomersTableDisplayed() {
        this.elements.customersTable().should('be.visible');
        this.elements.customersTable().find('thead').should('be.visible')
        this.elements.customersTable().find('tbody tr').should('have.length.greaterThan', 0)
    }

    typeInFirstName(firstName) {
        this.elements.firstNameInput().type(firstName);
    }

    typeInLastName(lastName) {
        this.elements.lastNameInput().type(lastName);
    }

    typeInPostalCode(postalCode) {
        this.elements.postalCodeInput().type(postalCode);
    }

    clickSubmitButton() {
        this.elements.submitFormButton().click();
    }

    selectCustomer(customerName) {
        this.elements.customerDropdown().select(customerName);
    }

    selectCurrency(currency) {
        this.elements.currencyDropdown().select(currency);
    }

    isManagerDashboardVisible() {
        this.elements.addCustomerTab().should('be.visible');
        this.elements.customersTab().should('be.visible');
        this.elements.openAccountTab().should('be.visible');
    }

    searchCustomer(searchText) {
        this.elements.customerSearchInput().type(searchText);
    }

    verifySeachResults(searchText) {
        this.elements.customersTable()
            .find('tr')
            .should('have.length.greaterThan', 0);

        this.elements.customersTable().each(($row) => {
            cy.wrap($row)
                .invoke('text')
                .should('contain', searchText)
        });
    }

    deleteCustomerByAccountNumber(accountNumber) {
        this.elements.customersTable().find('tbody tr')
            .contains('td', accountNumber)
            .parents('tr')
            .within(() => {
                cy.contains('Delete').click()
            });
    }

    verifyCustomerDeleted(accountNumber) {
        this.elements.customersTable().find('tbody tr')
            .should('not.contain', accountNumber);
    }
}