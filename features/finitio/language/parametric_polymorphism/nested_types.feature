Feature: Support for multiple levels of parameters in a tuple

  Background:

    Given the System is
      """
      TakesTwo(first, second) = {
        fieldOne : first,
        fieldTwo : second
      }
      WrappingType(x) = {
        foo : x,
        bar : TakesTwo(String, x)
      }
      WrappingType(Integer)
      """

  Scenario: Validating data against valid document

    Given I dress the following JSON document:
      """
      {
        "foo": 1,
        "bar": {
          "fieldOne": "baz",
          "fieldTwo": 5
        }
      }
      """

    Then it should be a success

  Scenario: Validating data against an invalid document (I)

    Given I dress the following JSON document:
      """
      {
        "foo": "qux",
        "bar": {
          "fieldOne": "baz",
          "fieldTwo": 5
        }
      }
      """

    Then it should be a TypeError
    And its root cause should be:
      | message                |
      | Invalid Integer: `qux` |

  Scenario: Validating data against an invalid document (II)

    Given I dress the following JSON document:
      """
      {
        "foo": 1,
        "bar": {
          "fieldOne": 8,
          "fieldTwo": 5
        }
      }
      """

    Then it should be a TypeError
    And its root cause should be:
      | message                |
      | Invalid String: `8` |

  Scenario: Validating data against an invalid document (III)

    Given I dress the following JSON document:
      """
      {
        "foo": 1,
        "bar": {
          "fieldOne": "baz",
          "fieldTwo": "qux"
        }
      }
      """

    Then it should be a TypeError
    And its root cause should be:
      | message                |
      | Invalid Integer: `qux` |
