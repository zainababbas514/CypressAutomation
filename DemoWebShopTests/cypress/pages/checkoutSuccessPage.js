module.exports = class CheckoutSuccessPage {
    elements = {
        successMessage: () => cy.get(".order-completed strong")
    }

    verifySuccessMessageDisplayed() {
        this.elements.successMessage().should('be.visible').and('have.text', 'Your order has been successfully processed!')
    }


}
