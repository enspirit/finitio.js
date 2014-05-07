Feature: Undressing from an ADT type

  Scenario: Undressing from unbound ADT

    Given the System is
      """
      Source = <as> Integer
      Target = Integer
      """
    Given I undress JSON's '12' from Source to Target
    Then the result should be the integer 12

  Scenario: Undressing from bound ADT

    Given the System is
      """
      Source = Date
      Target = String
      """
    Given I undress JSON's '"2014-03-13"' from Source to Target
    And the result should be the string '2014-03-13'
