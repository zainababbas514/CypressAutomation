Feature: Customer Transactions

    Background:
        Given the user is logged in as a customer
        And the user is on the Account page

    Scenario: Verify transactions history is displayed
        When the user clicks on the Transactions tab
        Then the transaction table should be displayed
        And credit and debit entries should be visible

    Scenario: Verify transaction reset functionality
        When the user clicks on the Transactions tab
        And the user clicks on the Reset button
        Then no transactions should be displayed
