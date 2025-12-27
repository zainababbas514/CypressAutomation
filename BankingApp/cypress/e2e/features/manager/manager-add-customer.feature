Feature: Manager Add Customer

    Background:
        Given the user is logged in as a Manager
        And the user is on the Manager Home Page

    Scenario: Verify Add Customer functionality
        When the user clicks the Add Customer tab
        And the user enters the following customer details:
            | First Name | Last Name | Post Code |
            | John       | Doe       | 12345     |
        Then the customer should be added successfully
