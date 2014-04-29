Feature: Undressing towards super type

  Scenario: Undressing towards Any

    Given the System is
      """
      Source = Integer
      Target = .
      """
    Given I undress JSON's '12' from Source to Target
    Then the result should be the integer 12

  Scenario: Undressing towards the supertype of a SubType

    Given the System is
      """
      Source = Integer( i | i>0 )
      Target = Integer
      """
    Given I undress JSON's '12' from Source to Target
    Then the result should be the integer 12
