import HomePage from "../pages/homePage"
const homePage = new HomePage();

import ProductPage from "../pages/productListingPage";
const productPage = new ProductPage();

let productData;

describe("Test products inside category shows correctly.", () => {

    beforeEach(() => {
        cy.visit("/")
    })

    before(() => {
        cy.fixture("productDisplay").then((data) => {
            productData = data["TC-001"];
        })
    })

    it("Verify that all products are displayed correctly when you open a category.", () => {
        homePage.topMenu().openCategory(productData.category)
        cy.waitForRedirection(productPage.elements.pageTitle)
        productPage.verifyProductDisplayedProperly()
    });
})
