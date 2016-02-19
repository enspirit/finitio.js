Feature: Support for subtyping a parametric type by binding its parameters with alias syntax

  Background:

    Given the System is
      """
      TakesTwo(first, second) = {
        fieldOne : first,
        fieldTwo : second
      }
      BindsTwo(first) = TakesTwo(first, Boolean)
      BindsTwo(Integer)
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

