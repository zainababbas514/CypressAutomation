import HomePage from "../pages/homePage"
const homePage = new HomePage();

import CartPage from "../pages/cartPage";
const cartPage = new CartPage()

let productData;
var expectedCartCount = 0
let productDetail = []

describe("Test Cart Functionality", () => {

    before(() => {
        cy.fixture("shoppingCartData").then((data) => {
            productData = data;
        })
    })

    beforeEach(() => {
        cy.visit("/");
    })

    it("Verify that user can add a featured products to the shopping cart", () => {
        cy.addProductsToCart(productData["TC-005"]).then((info) => {
            productDetail = info.products;
            expectedCartCount = info.cartCount;
        })

        homePage.header().clickShoppingCartOption()
        cy.then(() => {
            homePage.header().checkCartQuantity(expectedCartCount)
        })

        cartPage.getCartProductsList().then((actualCartProducts) => {
            cartPage.verifyCartProducts(productDetail, actualCartProducts)
        })
    });

    it("Verify that user can update quantity of a product in the cart", () => {
        const testData = productData["TC-006"]
        cy.addProductsToCart(testData).then((info) => {
            productDetail = info.products;
            expectedCartCount = info.cartCount;
        });
        homePage.header().clickShoppingCartOption();
        cy.wrap(testData).each(($el) => {
            cartPage.changeCartQuantity($el.name, $el.qty)
        });

        cartPage.clickUpdateCartBtn()
        cartPage.verifyTotalUnitPrice()
    });
})