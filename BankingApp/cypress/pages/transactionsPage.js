module.exports = class TransactionsPage {
    elements = {
        transactionsTable: () => cy.get("table.table-bordered"),
        transactionRows: () => cy.get("tbody tr[id*='anchor']"),
        resetButton: () => cy.get("button[ng-click='reset()']")
    }

    isTransactionTableDisplayed() {
        this.elements.transactionsTable().should('be.visible');
    }

    verifyCreditAndDebitTransactionsExist() {
        this.elements.transactionRows().should('have.length.greaterThan', 0);

        this.elements.transactionRows()
            .contains('Credit')
            .should('exist');

        this.elements.transactionRows()
            .contains('Debit')
            .should('exist');
    }

    resetTransactions() {
        this.elements.resetButton().click();
    }

    isTransactionsReset() {
        this.elements.transactionRows().should('have.length', 0);
    }
}