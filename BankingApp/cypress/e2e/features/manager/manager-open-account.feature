Feature: Manager Open Account

    Background:
        Given the user is logged in as a Manager
        And the user is on the Manager Home Page

    Scenario: Verify Open Account functionality
        When the user clicks the Open Account tab
        And the user selects the customer "Hermoine Granger"
        And the user selects the currency "Dollar"
        Then the account should be created successfully
