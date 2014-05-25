Feature: Undressing from an union type

  Scenario: Undressing to Any

    Given the System is
      """
      Source = Integer|String
      Target = .
      """
    Given I undress JSON's '12' from Source to Target
    Then the result should be the integer 12

  Scenario: Undressing to an equivalent candidate

    Given the System is
      """
      Source = Integer|String
      Target = Integer
      """
    Given I undress JSON's '12' from Source to Target
    Then the result should be the integer 12

  Scenario: Undressing to a supertype of a candidate

    Given the System is
      """
      Posint = Integer( i | i>0 )
      Source = Posint|String
      Target = Integer
      """
    Given I undress JSON's '12' from Source to Target
    Then the result should be the integer 12

  Scenario: Undressing when no candidate

    Given the System is
      """
      Source = Integer|String
      Target = Integer( i | i < 0 )
      """
    Given I undress JSON's '12' from Source to Target
    Then it should be a UndressError
