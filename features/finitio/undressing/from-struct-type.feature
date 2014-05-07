Feature: Undressing from a struct type

  Scenario: Undressing towards a super struct type

    Given the System is
      """
      Source = <Integer( i | i>0 ), String>
      Target = <Integer, String>
      """
    Given I undress JSON's '[12, "foo"]' from Source to Target
    Then the result should be a representation for Target

  Scenario: Undressing towards a compatible struct type

    Given the System is
      """
      Source = <Date>
      Target = <String>
      """
    Given I undress JSON's '["2014-03-13"]' from Source to Target
    Then the result should be a representation for Target

  Scenario: Undressing towards an incompatible struct type

    Given the System is
      """
      Source = <Date>
      Target = <String, Integer>
      """
    Given I undress JSON's '["2014-03-13"]' from Source to Target
    Then it should be a TypeError

  Scenario: Undressing when sub-undressing fails

    Given the System is
      """
      Source = <String>
      Target = <Integer>
      """
    Given I undress JSON's '["2014-03-13"]' from Source to Target
    Then it should be a TypeError
