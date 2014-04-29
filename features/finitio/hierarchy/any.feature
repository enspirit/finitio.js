Feature: Any#isSuperType

  Background:

    Given the System is
      """
      Top    = .
      Int    = Integer
      Sub    = Integer( i | i>0 )
      Seq    = [Integer]
      Set    = {Integer}
      Tuple  = { age: Integer }
      Rel    = {{ age: Integer }}
      Struct = <Integer>
      """

  Scenario: Against itself

    Then Top is a super type of Top

  Scenario: Against any other type

    Then Top is a super type of Int
     And Top is a super type of Sub
     And Top is a super type of Seq
     And Top is a super type of Set
     And Top is a super type of Tuple
     And Top is a super type of Rel
     And Top is a super type of Struct
