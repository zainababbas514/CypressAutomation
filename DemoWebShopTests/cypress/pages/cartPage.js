module.exports = class CartPage {
    elements = {
        cartTotalItems: () => cy.get(".cart-item-row"),
        productName: ".product-name",
        productUnitPrice: ".unit-price .product-unit-price",
        productUnitTotal: ".subtotal .product-subtotal",
        quantity: ".qty-input",
        updateCartBtn: () => cy.get(".update-cart-button"),
        countryDropdown: () => cy.get("#CountryId"),
        stateDropdown: () => cy.get("#StateProvinceId"),
        zipCodeInput: () => cy.get("#ZipPostalCode"),
        termsCheckbox: () => cy.get("#termsofservice"),
        cartTotalSectionHeadings: () => cy.get(".cart-total-left .nobr"),
        cartTotalSectionTotals: ".product-price",
        total: () => cy.get(".product-price.order-total"),
        checkoutBtn: () => cy.get("#checkout")
    }

    getCartProductsList() {
        const products = [];
        return this.elements.cartTotalItems().each($el => {
            products.push({
                name: $el.find(this.elements.productName).text().trim(),
                price: $el.find(this.elements.productUnitPrice).text().trim(),
                qty: $el.find(this.elements.quantity).val(),
                productSubtotal: $el.find(this.elements.productUnitTotal).text().trim()
            });
        }).then(() => {
            return products;
        });
    }

    verifyCartProducts(expectedProducts, actualProducts) {
        expectedProducts.forEach(expected => {
            const actual = actualProducts.find(p => p.name === expected.name);
            expect(actual.name).to.eq(expected.name);
            expect(actual.price).to.not.be.empty;
            expect(actual.qty).to.eq(expected.qty);
        });
    }

    verifyTotalUnitPrice() {
        const priceList = [];
        return this.elements.cartTotalItems().each(item => {
            const unitPrice = item.find(this.elements.productUnitPrice).text()
            const quantity = item.find(this.elements.quantity).val()
            const subtotal = parseFloat(unitPrice) * Number(quantity)
            const actualSubtotal = item.find(this.elements.productUnitTotal).text()
            expect(subtotal.toFixed(2)).to.equal(actualSubtotal)
            priceList.push(subtotal.toFixed(2))
        }).then(() => priceList);
    }

    changeCartQuantity(name, quantity) {
        this.elements.cartTotalItems().each((item) => {
            const productName = item.find(this.elements.productName).text();
            cy.log(productName, name, quantity)
            if (name == productName) {
                cy.wrap(item).find(this.elements.quantity).clear().type(quantity).blur().should('have.value', quantity)
            }
        })
    }

    clickUpdateCartBtn() {
        this.elements.updateCartBtn().click()
    }

    selectCountry(name) {
        this.elements.countryDropdown().select(name)
    }

    selectState(state) {
        this.elements.stateDropdown().select(state)
    }

    checkTermsConditions() {
        this.elements.termsCheckbox().check().should('be.checked')
    }

    calculateSubtotal(priceList) {
        var subtotal = 0;
        priceList.forEach((item) => {
            subtotal += parseFloat(item)
        });
        return subtotal;
    }

    getCartValueByLabel(label) {
        return this.elements.cartTotalSectionHeadings()
            .contains(label)
            .parent()
            .next()
            .find(this.elements.cartTotalSectionTotals)
            .invoke('text')
            .then(text => parseFloat(text.trim()))
    }

    verifySubtotal(expectedSubtotal) {
        this.getCartValueByLabel("Sub-Total").then(actualSubtotal => {
            expect(actualSubtotal).to.equal(expectedSubtotal);
        })
    }

    verifyCalculatedTotalMatchesDisplayedTotal() {
        this.getCartValueByLabel('Sub-Total:').then(subTotal => {
            this.getCartValueByLabel('Shipping:').then(shipping => {
                this.getCartValueByLabel('Tax:').then(tax => {

                    const calculatedTotal = subTotal + shipping + tax;

                    this.getCartValueByLabel('Total:').then(displayedTotal => {
                        expect(displayedTotal).to.equal(calculatedTotal);
                    });

                });
            });
        });
    }

    clickCheckoutBtn() {
        this.elements.checkoutBtn().click()
    }



}