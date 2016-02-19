Feature: TupleType with extra

  Background:

    Given the System is
      """
      Age  = Integer( i | i>=0 )
      Info = { name: String, ... }
      """

  Scenario: Dressing a valid tuple

    Given I dress JSON's '{ "name": "Finitio", "age": 1, "foo": 42 }' with Info
    Then the result should be a representation for Info

  Scenario: Dressing with extra attributes of different types

    Given I dress JSON's '{ "name": "Finitio", "age": 1, "extra": "foo" }' with Info
    Then the result should be a representation for Info

  Scenario: Dressing when an attribute is missing

    Given I dress JSON's '{ "age": 42, "foo": 42 }' with Info
    Then it should be a TypeError
    And its root cause should be:
      | message                  |
      | Missing attribute `name` |
