Feature: Seq#isSuperTypeOf

  Background:

    Given the System is
      """
      Top  = [Integer]
      Sub  = [Integer( i | i > 100 )]
      Suub = Sub( s | size(s) > 0 )
      """

  Scenario: Against itself

    Then Top is a super type of Top

  Scenario: Against a subtype of the element type

    Then Top is a super type of Sub

  Scenario: Against a sbyc type subtyping it further

    Then Sub is a super type of Suub
    Then Top is a super type of Suub
