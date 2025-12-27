describe('Products API', () => {

  it('Get All Products List', () => {
    cy.request("GET", "https://automationexercise.com/api/productsList")
      .then((response) => {

        const body = typeof response.body === 'string'
          ? JSON.parse(response.body)
          : response.body

        expect(body.responseCode).to.equal(200);
        expect(body).to.have.property("products");
        expect(body.products.length).to.have.greaterThan(0);

        const product = body.products[0];
        expect(product).to.have.all.keys('id', 'name', 'price', 'brand', 'category');
      })
  });

  it('Call API with unsupported method', () => {
    cy.request("POST", "https://automationexercise.com/api/productsList")
      .then((response) => {

        const body = typeof response.body === 'string'
          ? JSON.parse(response.body)
          : response.body

        expect(body.responseCode).to.equal(405);
        expect(body.message).to.equal("This request method is not supported.");
      });
  });

});