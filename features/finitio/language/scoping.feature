Feature: Friendly scoping of type definitions

  Scenario: Using a type definition that comes later

    Given the System is
      """
      Bigint = Posint( i | i >= 255 )
      Posint = Integer( i | i >= 0 )
      { length: Bigint }
      """
    Then it compiles fine

    When I dress JSON's '257' with Bigint
    Then the result should be the integer 257

    When I dress JSON's '257' with Posint
    Then the result should be the integer 257
