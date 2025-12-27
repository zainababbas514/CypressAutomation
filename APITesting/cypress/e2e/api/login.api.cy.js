describe("Login API", () => {

    it("Login with valid credentials", () => {
        cy.request({
            method: "POST",
            url: "https://automationexercise.com/api/verifyLogin",
            form: true,
            body: {
                email: "abbaszainab045@gmail.com",
                password: "DaMk6KR@yj9dumw"
            }
        }).then(response => {
            const body = typeof response.body === "string"
                ? JSON.parse(response.body)
                : response.body;

            expect(body.responseCode).to.equal(200);
            expect(body.message).to.equal("User exists!");
        })
    });

    it("Login with invalid password", () => {
        cy.request({
            method: "POST",
            url: "https://automationexercise.com/api/verifyLogin",
            form: true,
            body: {
                email: "abbaszainab045@gmail.com",
                password: "test123"
            }
        }).then(response => {
            const body = typeof response.body === "string"
                ? JSON.parse(response.body)
                : response.body;

            expect(body.responseCode).to.equal(404);
            expect(body.message).to.equal("User not found!");
        })
    })

    it("Login without email", () => {
        cy.request({
            method: "POST",
            url: "https://automationexercise.com/api/verifyLogin",
            form: true,
            body: {
                password: "test123"
            }
        }).then(response => {
            const body = typeof response.body === "string"
                ? JSON.parse(response.body)
                : response.body;

            expect(body.responseCode).to.equal(400);
            expect(body.message).to.equal("Bad request, email or password parameter is missing in POST request.");
        })
    })

    it("Login without password", () => {
        cy.request({
            method: "POST",
            url: "https://automationexercise.com/api/verifyLogin",
            form: true,
            body: {
                email: "test045@gmail.com"
            }
        }).then(response => {
            const body = typeof response.body === "string"
                ? JSON.parse(response.body)
                : response.body;

            expect(body.responseCode).to.equal(400);
            expect(body.message).to.equal("Bad request, email or password parameter is missing in POST request.");
        });
    })

    it("Call API with unsupported method", () => {
        cy.request("DELETE", "https://automationexercise.com/api/verifyLogin")
            .then((response) => {

                const body = typeof response.body === 'string'
                    ? JSON.parse(response.body)
                    : response.body

                expect(body.responseCode).to.equal(405);
                expect(body.message).to.equal("This request method is not supported.");
            });
    })

});