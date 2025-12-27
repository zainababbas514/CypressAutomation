describe('Search API', () => {

    it('Search product with valid keyword', () => {
        cy.request({
            method: "POST",
            url: "https://automationexercise.com/api/searchProduct",
            form: true,
            body: {
                search_product: "jean"
            }
        }).then((response) => {
            const body = typeof response.body === "string"
                ? JSON.parse(response.body)
                : response.body

            expect(body.responseCode).to.equal(200);
            expect(body.products.length).to.be.greaterThan(0);
            body.products.forEach(product => {
                expect(product.name.toLowerCase()).to.contain("jean");
            });
        })
    });

    it('Search product with special characters', () => {
        cy.request({
            method: "POST",
            url: "https://automationexercise.com/api/searchProduct",
            form: true,
            body: {
                search_product: "jean@123"
            }
        }).then((response) => {
            const body = typeof response.body === "string"
                ? JSON.parse(response.body)
                : response.body

            expect(body.responseCode).to.equal(200);
        });
    });


    it('Search without keyword parameter', () => {
        cy.request({
            method: "POST",
            url: "https://automationexercise.com/api/searchProduct",
        }).then((response) => {
            const body = typeof response.body === "string"
                ? JSON.parse(response.body)
                : response.body

            expect(body.responseCode).to.equal(400);
            expect(body.message).to.equal("Bad request, search_product parameter is missing in POST request.");
        });
    });

    it('Call API with invalid method', () => {
        cy.request({
            method: "PUT",
            url: "https://automationexercise.com/api/searchProduct",
            form: true,
            body: {
                search_product: "tshirt"
            }
        }).then((response) => {
            const body = typeof response.body === "string"
                ? JSON.parse(response.body)
                : response.body

            expect(body.responseCode).to.equal(405);
            expect(body.message).to.equal("This request method is not supported.");
        });
    });

});