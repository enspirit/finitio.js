Feature: Support for types which are polymorphic on multiple parameters

  Background:

    Given the System is
      """
      TakesTwo(first, second) = {
        fieldOne : first,
        fieldTwo : second
      }
      TakesTwo(Integer, Boolean)
      """

  Scenario: Validating data against valid document

    Given I dress the following JSON document:
      """
      {
        "fieldOne": 5,
        "fieldTwo": true
      }
      """

    Then it should be a success

  Scenario: Validating data against an invalid document (I)

    Given I dress the following JSON document:
      """
      {
        "fieldOne": 5,
        "fieldTwo": "foo"
      }
      """

    Then it should be a TypeError
    And its root cause should be:
      | message                |
      | Invalid Boolean: `foo` |
