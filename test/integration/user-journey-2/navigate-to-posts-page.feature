Feature: Access posts list

  Background:
    Given I am authenticated as "Fandresena"
  Scenario: Navigate to posts page
    When I navigate to the posts page
    Then I can see "Index" in the header title
    And I can see "Fandresena" in the header username
