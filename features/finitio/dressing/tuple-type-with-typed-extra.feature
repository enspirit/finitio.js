Feature: TupleType with typed extra

  Background:

    Given the System is
      """
      Age  = Integer( i | i>=0 )
      Info = { name: String, ...: Integer }
      """

  Scenario: Dressing a valid tuple

    Given I dress JSON's '{ "name": "Finitio", "age": 1, "foo": 42 }' with Info
    Then the result should be a representation for Info

  Scenario: Dressing with an invalid extra field

    Given I dress JSON's '{ "name": "Finitio", "age": 42, "foo": "42" }' with Info
    Then it should be a TypeError
    And its root cause should be:
      | message                  |
      | Invalid Integer: `42`    |
