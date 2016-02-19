Feature: Support for rich tuple types

  Scenario: Pure tuple types

    Given the System is
      """
      { length: Integer, angle: Real }
      """
    Then it compiles to a tuple type
    And `length` and `angle` are mandatory
    And it does not allow extra attributes

  Scenario: Support for optional attributes

    Given the System is
      """
      { length: Integer, angle :? Real }
      """
    Then it compiles to a tuple type
    And `length` is mandatory, but `angle` is optional
    And it does not allow extra attributes

  Scenario: Support for extra attributes

    Given the System is
      """
      { length: Integer, ... }
      """
    Then it compiles to a tuple type
    And `length` is mandatory
    And it allows extra attributes

  Scenario: Support for catch all tuple type

    Given the System is
      """
      { ... }
      """
    Then it compiles to a tuple type
    And it allows extra attributes

  Scenario: Support for typed extra attributes

    Given the System is
      """
      { length: Integer, ...: String }
      """
    Then it compiles to a tuple type
    And `length` is mandatory
    And it allows extra attributes of type String

  Scenario: Support for catch all (typed) tuple type

    Given the System is
      """
      { ...: String }
      """
    Then it compiles to a tuple type
    And it allows extra attributes of type String
