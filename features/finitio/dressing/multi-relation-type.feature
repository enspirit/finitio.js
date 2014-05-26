Feature: MultiRelationType

  Background:

    Given the System is
      """
      Age  = Integer( i | i>=0 )
      Info = {{ name : String, age :? Age }}
      """

  Scenario: Dressing a valid multi relation

    Given I dress JSON's '[{ "name": "Finitio", "age": 1 }]' with Info
    Then the result should be a representation for Info

  Scenario: Dressing when age is missing

    Given I dress JSON's '[{ "name": "Finitio" }]' with Info
    Then the result should be a representation for Info

  Scenario: Dressing when name is missing

    Given I dress JSON's '[{ "age": 1 }]' with Info
    Then it should be a TypeError
    And its root cause should be:
      | message                  |
      | Missing attribute `name` |

  Scenario: Dressing with an extra attribute

    Given I dress JSON's '[{ "name": "Finitio", "age": 1, "extra": "foo" }]' with Info
    Then it should be a TypeError
    And its root cause should be:
      | message                        |
      | Unrecognized attribute `extra` |

  Scenario: Dressing with an invalid attribute

    Given I dress JSON's '[{ "name": "Finitio", "age": -1 }]' with Info
    Then it should be a TypeError
    And its root cause should be:
      | message             |
      | Invalid value: `-1` |
