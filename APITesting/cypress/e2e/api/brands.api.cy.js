describe('Brands API', () => {

  it('Get All Brands List', () => {
    cy.request("GET", "https://automationexercise.com/api/brandsList")
      .then((response) => {

        const body = typeof response.body === 'string'
          ? JSON.parse(response.body)
          : response.body

        expect(body.responseCode).to.equal(200);

        expect(body).to.have.property("brands");
        expect(body.brands.length).to.have.greaterThan(0);

        body.brands.forEach(element => {
            expect(element.brand).to.not.be.null;
            expect(element.brand).to.not.equal("");
        });

      })
  });

    it('Call API with unsupported method', () => {
    cy.request("POST", "https://automationexercise.com/api/brandsList")
      .then((response) => {

        const body = typeof response.body === 'string'
          ? JSON.parse(response.body)
          : response.body

        expect(body.responseCode).to.equal(405);
        expect(body.message).to.equal("This request method is not supported.");
      });
  });

})