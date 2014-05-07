Feature: Undressing from a relation type

  Scenario: Undressing to another compatible relation type

    Given the System is
      """
      Source = {{since: Date}}
      Target = {{since: String}}
      """
    And I undress JSON's '[{"since": "2014-03-13"}]' from Source to Target
    Then the result should be a representation for Target

  Scenario: Undressing to a compatible seq type

    Given the System is
      """
      Source = {{since: Date}}
      Target = [{since: String}]
      """
    And I undress JSON's '[{"since": "2014-03-13"}]' from Source to Target
    Then the result should be a representation for Target

  Scenario: Undressing to an incompatible type

    Given the System is
      """
      Source = {{since: Date}}
      Target = {{since: String, foo: Integer}}
      """
    And I undress JSON's '[{"since": "2014-03-13"}]' from Source to Target
    Then it should be a TypeError
