Feature: Support for recursive types with parameters

  Background:

    Given the System is
      """
      LinkedList(x) = {
        current : x,
        next    : Foo(x) | Nil
      }
      LinkedList(String)
      """

  Scenario: Validating data against valid document

    Given I dress the following JSON document:
      """
      {
        current: "foo",
        next: {
          current: "bar",
          next: {
            current: "baz",
            next: null
          }
        }
      }
      """

    Then it should be a success


  Scenario: Validating data against an invalid document

    Given I dress the following JSON document:
      """
      {
        current: "foo",
        next: {
          current: "bar",
          next: {
            current: 5,
            next: null
          }
        }
      }
      """

    Then it should be a TypeError
    And its root cause should be:
      | message                |
      | Invalid String: `5` |
