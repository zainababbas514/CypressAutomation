describe('Create Account API', () => {

    it('Create account with valid data', () => {
        const uniqueEmail = `test.user.${Date.now()}@example.com`;
        cy.log(uniqueEmail)
        cy.request({
            method: 'POST',
            url: 'https://automationexercise.com/api/createAccount',
            form: true,
            body: {
                name: 'Test User',
                email: uniqueEmail,
                password: 'Test@123',
                title: 'Mr',
                birth_date: '12',
                birth_month: '08',
                birth_year: '1996',
                firstname: 'Test',
                lastname: 'User',
                company: 'Demo Company',
                address1: '123 Demo Street',
                address2: 'Apartment 4B',
                country: 'India',
                zipcode: '560001',
                state: 'Karnataka',
                city: 'Bangalore',
                mobile_number: '9876543210'
            }
        }).then((response) => {

            const body = typeof response.body === 'string'
                ? JSON.parse(response.body)
                : response.body

            expect(body.responseCode).to.eq(201)
            expect(body.message).to.include('User created!')
        })
    });

    it('Create account with existing email', () => {
        cy.request({
            method: 'POST',
            url: 'https://automationexercise.com/api/createAccount',
            form: true,
            body: {
                name: 'Test User',
                email: 'abbaszainab045@gmail.com',
                password: 'Test@123',
                title: 'Mr',
                birth_date: '12',
                birth_month: '08',
                birth_year: '1996',
                firstname: 'Test',
                lastname: 'User',
                company: 'Demo Company',
                address1: '123 Demo Street',
                address2: 'Apartment 4B',
                country: 'India',
                zipcode: '560001',
                state: 'Karnataka',
                city: 'Bangalore',
                mobile_number: '9876543210'
            }
        }).then((response) => {

            const body = typeof response.body === 'string'
                ? JSON.parse(response.body)
                : response.body

            expect(body.responseCode).to.eq(400)
            expect(body.message).to.include('Email already exists!')
        });
    });

    it('Create account with missing fields', () => {
        cy.request({
            method: 'POST',
            url: 'https://automationexercise.com/api/createAccount',
            form: true,
            body: {
                name: 'Test User',
                email: 'abbaszainab045@gmail.com',
                password: 'Test@123',
                title: 'Mr',
                birth_month: '08',
                birth_year: '1996',
                firstname: 'Test',
                lastname: 'User',
                company: 'Demo Company',
                address1: '123 Demo Street',
                address2: 'Apartment 4B',
                country: 'India',
                state: 'Karnataka',
                city: 'Bangalore',
                mobile_number: '9876543210'
            }
        }).then((response) => {

            const body = typeof response.body === 'string'
                ? JSON.parse(response.body)
                : response.body

            expect(body.responseCode).to.eq(400)
            expect(body.message).to.include('parameter is missing in POST request.')
        });
    });

});