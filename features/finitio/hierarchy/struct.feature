Feature: Struct#isSuperTypeOf

  Background:

    Given the System is
      """
      Top = <Numeric, Integer>
      Sub = <Real, Integer( i | i>0 )>
      """

  Scenario: Against itself

    Then Top is a super type of Top

  Scenario: Against a struct type with sbyc sub types

    Then Top is a super type of Sub
