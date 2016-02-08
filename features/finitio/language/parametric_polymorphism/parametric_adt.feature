Feature: Support for parameterized ADTs, when all representations can be parameterized

  Background:

    Given the System is
      """
      ADT(x) = <asFoo> { foo : x }
               <asBar> { bar : x }
      ADT(String)
      """

  Scenario: Validating data against valid document (I)

    Given I dress the following JSON document:
      """
      {
        "foo": "qux"
      }
      """

    Then it should be a success

  Scenario: Validating data against valid document (II)

    Given I dress the following JSON document:
      """
      {
        "bar": "qux"
      }
      """

    Then it should be a success


  Scenario: Validating data against an invalid document (I)

    Given I dress the following JSON document:
      """
      {
        "baz": "qux"
      }
      """

    Then it should be a TypeError

  Scenario: Validating data against an invalid document (II)

    Given I dress the following JSON document:
      """
      {
        "foo": 5
      }
      """

    Then it should be a TypeError
