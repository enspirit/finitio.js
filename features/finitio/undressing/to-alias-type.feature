Feature: Undressing towards alias types

  Scenario: Undressing from an ADT

    Given the System is
      """
      Source = Date
      Alias  = String
      Target = Alias
      """
    Given I undress JSON's '"2014-03-13"' from Source to Target
    Then the result should be the string '2014-03-13'

  