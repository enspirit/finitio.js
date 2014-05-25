Feature: Undressing from a seq type

  Scenario: Undressing to another compatible seq type

    Given the System is
      """
      Source = [Date]
      Target = [String]
      """
    And I undress JSON's '["2014-03-13"]' from Source to Target
    Then the result should be a representation for Target

  Scenario: Undressing to an incompatible type

    Given the System is
      """
      Source = [Date]
      Target = Integer
      """
    And I undress JSON's '["2014-03-13"]' from Source to Target
    Then it should be a UndressError

  Scenario: Undressing to an set type

    Given the System is
      """
      Source = [Date]
      Target = {Date}
      """
    And I undress JSON's '["2014-03-13"]' from Source to Target
    Then it should be a UndressError

