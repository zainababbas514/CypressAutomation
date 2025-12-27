// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import LoginPage from "../pages/loginPage"
const loginPage = new LoginPage();

import HomePage from "../pages/homePage"
const homePage = new HomePage();

import ProductDetailPage from "../pages/productDetailPage";
const productDetailPage = new ProductDetailPage()

import CartPage from "../pages/cartPage";
const cartPage = new CartPage();

import ProductListingPage from "../pages/productListingPage";
const productPage = new ProductListingPage();

Cypress.Commands.add("waitForRedirection", (selector) => {
    cy.get(selector).should('be.visible')
})

Cypress.Commands.add("login", (email, password) => {
    loginPage.login(email, password)
})

Cypress.Commands.add("addProductsToCart", (products) => {
    const collectedProducts = [];
    var expectedCartCount = 0

    return cy.wrap(products).each(product => {

        if (product.category) {
            homePage.topMenu().openCategory(product.category, product.subCategory)
            cy.waitForRedirection(productPage.elements.pageTitle)
        }

        homePage.featuredProducts().addProductToCart(product.name);

        if (product.type !== "") {
            productDetailPage.applyConfiguration(product.type, product.selections);
            homePage.featuredProducts().verifySuccessMessageDisplayed()

            productDetailPage.getProductDetails().then(detail => {
                collectedProducts.push(detail);
                expectedCartCount += 1;
            });

            homePage.header().clickHeaderLogo();
        } else {
            homePage.featuredProducts().verifySuccessMessageDisplayed()
            homePage.featuredProducts().getProductDetails(product.name).then(detail => {
                collectedProducts.push(detail);
                expectedCartCount += 1;
            });
        }
    }).then(() => ({
        products: collectedProducts,
        cartCount: expectedCartCount
    }));
})