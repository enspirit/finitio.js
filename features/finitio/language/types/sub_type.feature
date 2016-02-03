Feature: Support for sub typing by constraint

  Scenario: Through an explicit constraint

    Given the System is
      """
      Integer( i | i>0 )
      """
    Then it compiles to a sub type of Integer

  Scenario: Through a range constraint shortcut

    Given the System is
      """
      Integer :: 0..
      """
    Then it compiles to a sub type of Integer
