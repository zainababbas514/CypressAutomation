describe("Update Account API", () => {

    it("Update user with valid data", () => {
        cy.request({
            method: "PUT",
            url: "https://automationexercise.com/api/updateAccount",
            form: true,
            body: {
                email: 'test.user.1766824976218@example.com',
                firstname: 'UpdatedFirst',
                lastname: 'UpdatedLast',
                address1: '456 Updated Street',
                city: 'NewCity',
                password: 'Test@123'
            }
        }).then((response) => {
            const body = typeof response.body === 'string'
                ? JSON.parse(response.body)
                : response.body

            expect(body.responseCode).to.equal(200);
            expect(body.message).to.include("User updated!");
        })
    });

    it("Update with missing required fields", () => {
        cy.request({
            method: "PUT",
            url: "https://automationexercise.com/api/updateAccount",
            form: true,
            body: {
                email: 'abbaszainab045@gmail.com',
                firstname: 'UpdatedFirst',
                lastname: 'UpdatedLast',
                address1: '456 Updated Street',
                city: 'NewCity'
            }
        }).then((response) => {
            const body = typeof response.body === 'string'
                ? JSON.parse(response.body)
                : response.body

            expect(body.responseCode).to.equal(400);
            expect(body.message).to.include("parameter is missing in PUT request");
        });
    });


    it("Update non-existing user", () => {
        cy.request({
            method: "PUT",
            url: "https://automationexercise.com/api/updateAccount",
            form: true,
            body: {
                email: 'abbaszainab045@gmail.com',
                firstname: 'UpdatedFirst',
                lastname: 'UpdatedLast',
                address1: '456 Updated Street',
                city: 'NewCity',
                password: '12345678'
            }
        }).then((response) => {
            const body = typeof response.body === 'string'
                ? JSON.parse(response.body)
                : response.body

            expect(body.responseCode).to.equal(404);
            expect(body.message).to.include("Account not found!");
        })
    })
});