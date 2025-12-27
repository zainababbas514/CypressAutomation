Feature: Customer Withdrawal

    Scenario: Withdraw money with sufficient balance
        Given the user is logged in as a customer
        And the account balance is greater than or equal to 200
        And the user is on the Account page
        When the user clicks on the Withdrawl tab
        And the user enters 200 as withdrawal amount
        And the user clicks the Withdraw button
        Then a withdrawal success message should be displayed
        And the account balance should be reduced by 200

    Scenario: Withdraw money with insufficient balance
        Given the user is logged in as a customer
        And the user is on the Account page
        When the user clicks on the Withdrawl tab
        And the user enters 200000 as withdrawal amount
        And the user clicks the Withdraw button
        Then a withdrawal error message should be displayed
        And the account balance should remain the same
