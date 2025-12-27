module.exports = class ProductListingPage {
    elements = {
        pageTitle: ".page-title h1",
        productList: () => cy.get(".product-grid .item-box"),
        productImage: ".picture img",
        productPrice: ".prices .actual-price",
        productName: ".product-title a",

        sortingDropdown: () => cy.get("#products-orderby"),
        sortByNameAtoZ: "Name: A to Z",
        sortByNameZtoA: "Name: Z to A",
        sortByPriceLtoH: "Price: Low to High",
        sortByPriceHtoL: "Price: High to Low",

        priceFilter: () => cy.get(".price-range-selector a"),
        removePriceFilter: () => cy.get(".remove-price-range-filter")
    }

    verifyProductDisplayedProperly() {
        this.elements.productList().each($el => {

            cy.wrap($el).find(this.elements.productImage)
                .should("be.visible")
                .invoke("attr", "src")
                .then((url) => {
                    cy.request({
                        url: url,
                        failOnStatusCode: true
                    })
                })

            cy.wrap($el).find(this.elements.productName)
                .should("be.visible")
                .invoke('text')
                .then(text => expect(text.trim()).to.not.be.empty);

            cy.wrap($el).find(this.elements.productPrice)
                .should("be.visible")
                .invoke("text")
                .then(text => {
                    const price = parseFloat(text)
                    expect(price).to.be.greaterThan(0)
                })
        })
    }

    sortProducts(sortBy) {
        this.elements.sortingDropdown().select(sortBy);
    }

    getProductNameList() {
        const nameList = [];
        return this.elements.productList().find(this.elements.productName).each($el => {
            const name = $el.text().trim()
            nameList.push(name)
        }).then(() => nameList)
    }

    getProductPriceList() {
        const priceList = [];
        return this.elements.productList().find(this.elements.productPrice).each($el => {
            const price = parseFloat($el.text().trim())
            priceList.push(price)
        }).then(() => priceList)
    }

    verifyPriceFilters(index = 0) {
        this.elements.priceFilter().then($filters => {
            if (index >= $filters.length) return; // stop recursion

            const $el = $filters.eq(index);
            const text = $el.text().replace(/\s+/g, ' ').trim();
            const values = text.match(/\d+(\.\d+)?/g).map(Number);

            cy.wrap($el).click();

            this.getProductPriceList().then(priceList => {
                if (values.length === 2) {
                    expect(priceList.every(price => price >= values[0] && price <= values[1])).to.be.true;
                }
                else if (text.includes('Under')) {
                    expect(priceList.every(price => price <= values[0])).to.be.true;
                }
                else {
                    expect(priceList.every(price => price >= values[0])).to.be.true;
                }
            });

            this.elements.removePriceFilter().click();
            this.verifyPriceFilters(index + 1);
        });
    }


}