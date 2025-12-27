Feature: Customer Deposit

    Background:
        Given the user is logged in as a customer
        And the user is on the Account page

    Scenario: Deposit money with a valid amount
        When the user clicks on the Deposit tab
        And the user enters a valid deposit amount of 500
        And the user clicks the Deposit button
        Then a deposit success message should be displayed
        And the account balance should increase by 500

    Scenario: Deposit money with an invalid amount
        When the user clicks on the Deposit tab
        And the user enters an invalid deposit amount of -100
        And the user clicks the Deposit button
        Then the account balance should remain the same
