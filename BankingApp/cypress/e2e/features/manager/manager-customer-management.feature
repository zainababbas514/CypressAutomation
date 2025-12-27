Feature: Manager Customer Management

    Background:
        Given the user is logged in as a Manager
        And the user is on the Manager Home Page

    Scenario Outline: Verify customer search functionality
        When the user clicks on the Customers tab
        And the user enters "<searchText>" in the search field
        Then matching customer records should be displayed for "<searchText>"

        Examples:
            | searchText |
            | Harry      |
            | E55555     |
            | 1005       |

    Scenario: Verify delete customer functionality
        When the user clicks on the Customers tab
        And the user deletes the customer with account number "1005"
        Then the customer with account number "1005" should be removed from the list
