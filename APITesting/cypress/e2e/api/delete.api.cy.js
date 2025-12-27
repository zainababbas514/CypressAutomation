describe('DELETE API', () => {

    it('Delete account with valid credentials', () => {
        cy.request({
            method: "DELETE",
            url: "https://automationexercise.com/api/deleteAccount",
            form: true,
            body: {
                email: "test.user.1766824595465@example.com",
                password: "Test@123"
            }
        }).then((response) => {

            const body = typeof response.body === 'string'
                ? JSON.parse(response.body)
                : response.body
                        
            expect(body.responseCode).to.equal(200);
            expect(body.message).to.include("Account deleted!");
        })
    });

    it('Delete with invalid credentials', () => {
        cy.request({
            method: "DELETE",
            url: "https://automationexercise.com/api/deleteAccount",
            form: true,
            body: {
                email: "zainababbas@gmail.com",
                password: "zainab12345"
            }
        }).then((response) => {

            const body = typeof response.body === 'string'
                ? JSON.parse(response.body)
                : response.body

            expect(body.responseCode).to.equal(404);
            expect(body.message).to.include("Account not found!");
        });
    });

    it('Delete already deleted account', () => {
        cy.request({
            method: "DELETE",
            url: "https://automationexercise.com/api/deleteAccount",
            form: true,
            body: {
                email: "test.user.1766819302677@example.com",
                password: "Test@123"
            }
        }).then((response) => {

            const body = typeof response.body === 'string'
                ? JSON.parse(response.body)
                : response.body
              
            expect(body.responseCode).to.equal(404);
            expect(body.message).to.include("Account not found!");
        });
    });

});