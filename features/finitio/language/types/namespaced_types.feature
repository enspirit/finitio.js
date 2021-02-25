Feature: Support for namespaces

  Scenario: Namespacing types

    Given the System is
      """
      Person.ID = Integer( i | i>0 )
      """
    Then it compiles fine

