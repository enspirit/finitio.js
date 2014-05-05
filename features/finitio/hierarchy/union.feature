Feature: UnionType#isSuperTypeOf

  Scenario: Against itself

    Given the System is
      """
      Top = Integer|Real
      """
    Then Top is a super type of Top

  Scenario: Against one of the component

    Given the System is
      """
      Top = Integer|Real
      """
    Then Top is a super type of Integer
    Then Top is a super type of Real

  Scenario: Against a subtype of component

    Given the System is
      """
      Top = Integer|Real
      Posint = Integer( i | i>0 )
      """
    Then Top is a super type of Posint

  Scenario: Against the same union but with a different order

    Given the System is
      """
      Top = Integer|Real
      Sub = Real|Integer
      """
    Then Top is a super type of Sub

  Scenario: Against a sub union

    Given the System is
      """
      Posint = Integer( i | i>0 )
      Negint = Integer( i | i<0 )
      Zero   = Integer( i | i==0 )
      Top = Posint|Negint|Zero
      Sub = Posint|Zero
      """
    Then Top is a super type of Sub
