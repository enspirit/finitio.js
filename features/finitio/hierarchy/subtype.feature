Feature: SubType#isSuperTypeOf

  Background:

    Given the System is
      """
      Top = Integer
      Pos = Integer( i | i > 0 )
      Big = Pos( i | i > 100 )
      Sug = Top :: /[0..9]+/
      """

  Scenario: Against itself

    Then Top is a super type of Top

  Scenario: Against sbyc subtypes

    Then Top is a super type of Pos
    Then Top is a super type of Big

  Scenario: Against sbyc of sbyc

    Then Pos is a super type of Big

  Scenario: With syntactic sugar for constraints

    Then Top is a super type of Sug
