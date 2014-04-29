Feature: Relation#isSuperTypeOf

  Background:

    Given the System is
      """
      Top = {{ foo: Numeric, bar: Integer }}
      Sub = {{ foo: Real,    bar: Integer( i | i>0 ) }}
      """

  Scenario: Against itself

    Then Top is a super type of Top

  Scenario: Against a relation type with sbyc sub types

    Then Top is a super type of Sub
