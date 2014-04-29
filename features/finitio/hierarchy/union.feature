Feature: UnionType#isSuperTypeOf

  Background:

    Given the System is
      """
      Top = Integer|Real
      Posint = Integer( i | i>0 )
      """

  Scenario: Against itself

    Then Top is a super type of Top

  Scenario: Against a component

    Then Top is a super type of Integer
    Then Top is a super type of Real

  Scenario: Against a subtype of component

    Then Top is a super type of Posint
