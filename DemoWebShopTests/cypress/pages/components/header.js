
module.exports = class Header {
    elements = {
        header_links: () => cy.get(".header-links ul li a"),
        shoppingCartOption: () => cy.get("#topcartlink .ico-cart"),
        cartQuantity: () => cy.get("#topcartlink .cart-qty"),
        headerLogo: () => cy.get(".header-logo a"),
        searchInput: () => cy.get(".search-box #small-searchterms"),
        searchBtn: () => cy.get(".search-box-button")
    }

    click_header_link(link_text) {
        this.elements.header_links()
            .contains("a", link_text)
            .should("be.visible")
            .click()
    }

    clickHeaderLogo() {
        this.elements.headerLogo().click()
    }

    verifyUserLoggedIn(email) {
        this.elements.header_links()
            .contains("Log out")
            .should("be.visible");

        this.elements.header_links()
            .contains(email)
            .should("be.visible");
    }

    clickShoppingCartOption() {
        this.elements.shoppingCartOption().click()
        cy.url().should("include", "cart")
    }

    checkCartQuantity(expectedQuantity) {
        this.elements.cartQuantity().then($quantity => {
            let cartQuantity = $quantity.text().match(/\d+/)[0]
            expect(cartQuantity).to.be.equal(expectedQuantity.toString())
        })
    }

    searchProducts(searchText) {
        this.elements.searchInput().type(searchText);
        this.elements.searchBtn().click()
    }
}