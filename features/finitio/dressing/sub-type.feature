Feature: SubType

  Background:

    Given the World is
      """
      {
        _: { isEven: function(i){ return i%2 == 0; } }
      }
      """

    Given the System is
      """
      Posint = Integer( i | i>= 0 )
      Name   = String :: /^[a-z]+$/
      Age    = Integer :: 1..99
      Score  = Integer :: { 1, 5, 10, 20 }
      Even   = Integer :: &_.isEven
      """

  Scenario: Dressing a valid integer

    Given I dress JSON's '12' with Posint
    Then the result should be a representation for Posint

  Scenario: Dressing an invalid integer

    Given I dress JSON's '-12' with Posint
    Then it should be a TypeError as:
      | message               |
      | Invalid Posint: `-12` |

  Scenario: Dressing a valid Name

    Given I dress JSON's '"hello"' with Name
    Then the result should be a representation for Name

  Scenario: Dressing an invalid Name

    Given I dress JSON's '"hello world"' with Name
    Then it should be a TypeError as:
      | message               |
      | Invalid Name: `hello world` |

  Scenario: Dressing a valid Age

    Given I dress JSON's '35' with Age
    Then the result should be a representation for Age

  Scenario: Dressing an invalid Age

    Given I dress JSON's '265' with Age
    Then it should be a TypeError as:
      | message            |
      | Invalid Age: `265` |

  Scenario: Dressing a valid Score

    Given I dress JSON's '10' with Score
    Then the result should be a representation for Score

  Scenario: Dressing an invalid Score

    Given I dress JSON's '265' with Score
    Then it should be a TypeError as:
      | message              |
      | Invalid Score: `265` |

  Scenario: Dressing a valid Even

    Given I dress JSON's '10' with Even
    Then the result should be a representation for Even

  Scenario: Dressing an invalid Even

    Given I dress JSON's '265' with Even
    Then it should be a TypeError as:
      | message              |
      | Invalid Even: `265`  |
