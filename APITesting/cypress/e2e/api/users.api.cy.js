describe("User Details by Email API", () => {

    it("Get user details with valid email", () => {
        cy.request({
            method: "GET",
            url: "https://automationexercise.com/api/getUserDetailByEmail",
            qs: {
                email: 'abbaszainab045@gmail.com'
            },
        }).then((response) => {

            const body = typeof response.body === 'string'
                ? JSON.parse(response.body)
                : response.body;

            expect(body.responseCode).to.equal(200);
            expect(body.user).to.exist;
            expect(body.user).to.be.an("object");
            expect(body.user.email).to.equal("abbaszainab045@gmail.com");
        });
    });

    it("Get user details with invalid email", () => {
        cy.request({
            method: "GET",
            url: "https://automationexercise.com/api/getUserDetailByEmail",
            qs: {
                email: 'abbaszainab@gmail.com'
            },
        }).then((response) => {

            const body = typeof response.body === 'string'
                ? JSON.parse(response.body)
                : response.body;

            expect(body.responseCode).to.equal(404);
            expect(body.message).to.include("Account not found with this email, try another email!");
        });
    });

    it("Get user details without email", () => {
        cy.request({
            method: "GET",
            url: "https://automationexercise.com/api/getUserDetailByEmail",
        }).then((response) => {

            const body = typeof response.body === 'string'
                ? JSON.parse(response.body)
                : response.body;
            
            expect(body.responseCode).to.equal(400);
            expect(body.message).to.equal("Bad request, email parameter is missing in GET request.");
        });
    });
});