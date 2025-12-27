module.exports = class RegisterResultPage {
    elements = {
        success_message: () => cy.get(".registration-result-page .result")
    }

    verify_success_message_displayed() {
        this.elements.success_message()
            .should('be.visible')
            .and("contain.text", "Your registration completed")
    }
}