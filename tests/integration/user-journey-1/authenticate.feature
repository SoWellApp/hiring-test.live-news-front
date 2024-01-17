Feature: Login Functionality

  Scenario: Login Functionality

    Given User navigates to the application
    Then The login button is "disabled"
    When I enter the username as "Fandresena"
    When I enter the password as "Fandresen@1"
    Then The login button is "enabled"
    When I click on login button
    Then User should logged in successfully
