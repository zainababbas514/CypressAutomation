module.exports = class FeaturedProducts {
    elements = {
        productList: () => cy.get(".product-grid .item-box"),
        productName: ".product-title a",
        productCard: ".item-box",
        addToCartBtn: ".product-box-add-to-cart-button",
        addToCartSuccessMessage: () => cy.get("div[class='bar-notification success']"),
        loader: () => cy.get(".ajax-loading-block-window"),
    }

    addProductToCart(productName) {
        this.elements.productList()
            .contains(this.elements.productName, productName)
            .closest(".item-box")
            .within(() => {
                cy.get(this.elements.addToCartBtn).click();
            });

        this.elements.loader().should("not.be.visible");
    }

    verifySuccessMessageDisplayed() {
        this.elements.addToCartSuccessMessage().should('be.visible')
    }

    getProductDetails(productName) {
        return this.elements.productList()
            .contains(this.elements.productName, productName)
            .closest(".item-box")
            .then($card => ({
                name: $card.find(this.elements.productName).text(),
                qty: "1",
            }));
    }
}