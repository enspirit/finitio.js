Feature: TestSystem.True

  Background:
    Given the type under test is True

  Scenario: Against true

    Given I dress JSON's 'true'
    Then the result should be a representation for True

  Scenario: Against false

    Given I dress JSON's 'false'

    Then it should be a TypeError as:
      | message                        | location    |
      | Invalid value `false` for True |             |

  Scenario: Against a string

    Given I dress JSON's '"foo"'

    Then it should be a TypeError as:
      | message                        | location    |
      | Invalid value `foo` for True   |             |
