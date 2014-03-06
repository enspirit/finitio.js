Feature: TestSystem.False

  Background:
    Given the type under test is False

  Scenario: Against false

    Given I dress JSON's 'false'
    Then the result should be a representation for False

  Scenario: Against true

    Given I dress JSON's 'true'

    Then it should be a TypeError as:
      | message                       | location    |
      | Invalid value `true` for True |             |

  Scenario: Against a string

    Given I dress JSON's '"foo"'

    Then it should be a TypeError as:
      | message                        | location    |
      | Invalid value `foo` for False  |             |
