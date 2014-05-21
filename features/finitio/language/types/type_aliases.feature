Feature: Support for type aliases

  Scenario: Aliasing a named type

    Given the System is
      """
      Posint = Integer( i | i>0 )
      Alias  = Posint
      """
    Then it compiles fine

  Scenario: Aliasing through information contracts

    Given the System is
      """
      Timestamp = <epoch> Integer
      Alias     = Timestamp/epoch
      """
    Then it compiles fine

