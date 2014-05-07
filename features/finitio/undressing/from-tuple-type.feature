Feature: Undressing from a tuple type

  Scenario: Undressing from pure tuple type

    Given the System is
      """
      Source = { since: Date   }
      Target = { since: String }
      """
    And I undress JSON's '{ "since": "2014-03-13" }' from Source to Target
    Then the result should be a representation for Target

  Scenario: Undressing when attribute may be missing

    Given the System is
      """
      Source = { since :? Date   }
      Target = { since :? String }
      """
    And I undress JSON's '{ }' from Source to Target
    Then the result should be a representation for Target
    And the result should not have a 'since' attribute

  Scenario: Undressing when target type has an additional attribute

    Given the System is
      """
      Source = { since: Date }
      Target = { since: String, foo: Integer }
      """
    And I undress JSON's '{ "since": "2014-03-13" }' from Source to Target
    Then it should be a TypeError

  Scenario: Undressing when target type has a missing attribute

    Given the System is
      """
      Source = { since: Date }
      Target = { }
      """
    And I undress JSON's '{ "since": "2014-03-13" }' from Source to Target
    Then it should be a TypeError

  Scenario: Undressing when target type disagrees on required attribute

    Given the System is
      """
      Source = { since: Date }
      Target = { since :? Date }
      """
    And I undress JSON's '{ "since": "2014-03-13" }' from Source to Target
    Then it should be a TypeError
