Feature: Access posts list

  Background:
    Given I am authenticated as "Fandresena"
  Scenario: See posts list
    When I navigate to the posts page
    Then I can see a the following posts:
      | title                             | author           | date             |
      | Innovative empowering protocol    | Elenor_Corkery17 | 18/01/2024 04:13 |
      | Up-sized background middleware    | Bertha.Heaney21  | 18/01/2024 04:13 |
      | Grass-roots homogeneous workforce | Kianna.Bergstrom | 18/01/2024 04:13 |
