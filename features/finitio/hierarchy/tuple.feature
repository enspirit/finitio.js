Feature: Tuple#isSuperTypeOf

    Scenario: Against itself

      Given the System is
        """
        Top = { foo: Numeric, bar: Integer }
        """
      Then Top is a super type of Top

    Scenario: Against an equivalent type

      Given the System is
        """
        Top = { foo: Numeric, bar: Integer }
        Sub = { foo: Numeric, bar: Integer }
        """
      Then Top is a super type of Sub
       And Sub is a super type of Top

    Scenario: Against a tuple type with sbyc sub types

      Given the System is
        """
        Top = { foo: Numeric, bar: Integer }
        Sub = { foo: Real,    bar: Integer( i | i>0 ) }
        """
      Then Top is a super type of Sub
       And Sub is not a super type of Top

    Scenario: Against a tuple type that reinforces a maybe

      Given the System is
        """
        Top = { foo: Numeric, bar :? Integer }
        Sub = { foo: Numeric, bar :  Integer }
        """
      Then Top is a super type of Sub
       And Sub is not a super type of Top

   Scenario: Against a tuple type that reinforces an extra

     Given the System is
       """
       Top = { foo: Numeric, bar: Integer, ... }
       Sub = { foo: Numeric, bar: Integer }
       """
     Then Top is a super type of Sub
      And Sub is not a super type of Top

     Given the System is
       """
       Top = { foo: Numeric, bar: Integer, ... }
       Sub = { foo: Numeric, bar: Integer, ...: Integer }
       """
     Then Top is a super type of Sub
      And Sub is not a super type of Top

     Given the System is
       """
       Top = { foo: Numeric, bar: Integer, ...: Integer }
       Sub = { foo: Numeric, bar: Integer, ... }
       """
     Then Top is not a super type of Sub
      And Sub is a super type of Top
