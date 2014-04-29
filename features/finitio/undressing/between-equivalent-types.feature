Feature: Undressing between equivalent types

  Scenario: Undressing between equivalent Integer types

    Given the System is
      """
      Source = Integer
      Target = Integer
      """
    Given I undress JSON's '12' from Source to Target
    Then the result should be the integer 12

  Scenario: Undressing between equivalent Tuple types

    Given the System is
      """
      Source = { age: Integer }
      Target = { age: Integer }
      """
    Given I undress JSON's '{ "age": 12 }' from Source to Target
    Then the result should be a representation for Target
