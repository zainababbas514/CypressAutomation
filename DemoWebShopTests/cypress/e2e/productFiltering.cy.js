const filteringData = require("../fixtures/productFilterData.json");

import HomePage from "../pages/homePage"
const homePage = new HomePage();

import ProductCategoryPage from "../pages/productListingPage";
const productCategoryPage = new ProductCategoryPage();

import SearchPage from "../pages/searchPage";
const searchPage = new SearchPage()

describe("Test filter and search functionality", () => {

    beforeEach(() => {
        cy.visit("/")
    })

    it("Verify price filter", () => {
        const data = filteringData["TC-009"];
        homePage.topMenu().openCategory(data.category, data.subCategory);
        productCategoryPage.verifyPriceFilters()
    });


    filteringData["TC-007"].forEach($el => {
        it("Verify product search functionality works", () => {
            homePage.header().searchProducts($el.searchText);
            searchPage.getProductNames().then(($nameList) => {
                searchPage.verifySearchResults($nameList, $el.searchText)
            })
        })

    });

});