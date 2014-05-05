Feature: Undressing when the value belongs to the target

  Scenario: Undressing towards Any

    Given the System is
      """
      Source = .
      Target = Integer
      """
    Given I undress JSON's '12' from Source to Target
    Then the result should be the integer 12
