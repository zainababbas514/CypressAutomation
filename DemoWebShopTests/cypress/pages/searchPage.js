module.exports = class SearchPage {
    elements = {
        productList: () => cy.get(".product-grid .item-box"),
        productName: ".product-title a",
    }

    getProductNames() {
        const nameList = [];
        return this.elements.productList().find(this.elements.productName).each($el => {
            nameList.push($el.text().trim().toLowerCase())
        }).then(() => nameList)
    }

    verifySearchResults(list, searchText) {
        const result = list.every(item => item.includes(searchText))
        expect(result).to.be.true;
    }
}