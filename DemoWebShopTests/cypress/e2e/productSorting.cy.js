import HomePage from "../pages/homePage"
const homePage = new HomePage();

import ProductPage from "../pages/productListingPage";
const productPage = new ProductPage();

import ProductCategoryPage from "../pages/productListingPage";
const productCategoryPage = new ProductCategoryPage();

let sortingData;

describe("Test Sorting Functionality", () => {

    before(() => {
        cy.fixture("productSortingData").then((data) => {
            sortingData = data;
        })
    })

    beforeEach(() => {
        cy.visit("/")
    })

    it("Verify sorting products by Name: A to Z", () => {
        const data = sortingData["TC-012"];
        homePage.topMenu().openCategory(data.category, data.subCategory);
        productCategoryPage.sortProducts(productCategoryPage.elements.sortByNameAtoZ)
        productCategoryPage.getProductNameList().then($list => {
            const productNamesArrayCopy = [...$list]
            const productNamesArraySorted = $list.sort()
            expect(productNamesArraySorted).to.deep.equal(productNamesArrayCopy)
        })
    });

    it("Verify sorting products by Name: Z to A", () => {
        const data = sortingData["TC-013"];
        homePage.topMenu().openCategory(data.category, data.subCategory);
        productCategoryPage.sortProducts(productCategoryPage.elements.sortByNameZtoA)
        productCategoryPage.getProductNameList().then($list => {
            const productNamesArrayCopy = [...$list]
            const productNamesArraySorted = $list.sort().reverse()
            expect(productNamesArraySorted).to.deep.equal(productNamesArrayCopy)
        })
    });

    it("Verify sorting products by Price: Low to High", () => {
        const data = sortingData["TC-014"];
        homePage.topMenu().openCategory(data.category, data.subCategory);
        productCategoryPage.sortProducts(productCategoryPage.elements.sortByPriceLtoH)
        productCategoryPage.getProductPriceList().then($list => {
            const productPriceArrayCopy = [...$list]
            const productPricesArraySorted = $list.sort((a, b) => a - b);
            expect(productPricesArraySorted).to.deep.equal(productPriceArrayCopy)
        })
    });

    it("Verify sorting products by Price: High to Low", () => {
        const data = sortingData["TC-015"];
        homePage.topMenu().openCategory(data.category, data.subCategory);
        productCategoryPage.sortProducts(productCategoryPage.elements.sortByPriceHtoL)
        productCategoryPage.getProductPriceList().then($list => {
            const productPriceArrayCopy = [...$list]
            const productPricesArraySorted = $list.sort((a, b) => b - a);
            expect(productPricesArraySorted).to.deep.equal(productPriceArrayCopy)
        })
    });
})