Feature: Support for passing a parameterized type as a parameter

  Background:

    Given the System is
      """
      InnerType(x) = [x]
      MiddleType(y) = {
        contents : InnerType(y)
      }
      OuterType(x) = {
        body : x
      }
      OuterType(InnerType(String))
      """

  Scenario: Validating data against valid document

    Given I dress the following JSON document:
      """
      {
        "body": {
          "contents": ["foo", "bar"]
        }
      }
      """

    Then it should be a success

  Scenario: Validating data against an invalid document (I)

    Given I dress the following JSON document:
      """
      {
        "body": {
          "contents": ["foo", 5]
        }
      }
      """

    Then it should be a TypeError
    And its root cause should be:
      | message                |
      | Invalid String: `5` |


  Scenario: Validating data against an invalid document (I)

    Given I dress the following JSON document:
      """
      {
        "body": {
          "contents": "foo"
        }
      }
      """

    Then it should be a TypeError
    And its root cause should be:
      | message                  |
      | Invalid InnerType: `foo` |


  Scenario: Validating data against an invalid document (II)

    Given I dress the following JSON document:
      """
      {
        "body": ["foo", "bar"]
      }
      """

    Then it should be a TypeError
    And its root cause should be:
      | message                              |
      | Invalid MiddleType: `["foo", "bar"]` |
