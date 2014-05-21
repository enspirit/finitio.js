Feature: Moving back and forth between physical and logical abstractions

  Background:
    Given the System is
      """
      Age = Integer( i | i>0 )

      High = {
        age: Age
        at:  Time
      }

      Low = {
        age: Integer
        at:  Time/iso8601
      }
      """

  Scenario: round tripping

    Given I dress JSON's '{ "age": 34, "at": "2014-06-22T12:00" }' with High
    Then the result should be a representation for High
    And its 'at' attribute should be a Time representation

    When I undress the result from High to Low
    Then the result should be a representation for Low
    And its 'at' attribute should be a String representation
    