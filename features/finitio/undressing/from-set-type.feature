Feature: Undressing from a set type

  Scenario: Undressing to another compatible set type

    Given the System is
      """
      Source = {Date}
      Target = {String}
      """
    And I undress JSON's '["2014-03-13"]' from Source to Target
    Then the result should be a representation for Target

  Scenario: Undressing to a seq type

    Given the System is
      """
      Source = {Date}
      Target = [Date]
      """
    And I undress JSON's '["2014-03-13"]' from Source to Target
    Then the result should be a representation for Target

  Scenario: Undressing to an incompatible type

    Given the System is
      """
      Source = {Date}
      Target = Integer
      """
    And I undress JSON's '["2014-03-13"]' from Source to Target
    Then it should be a UndressError
