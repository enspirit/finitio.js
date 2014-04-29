Feature: Type Hierarchy in the TestSystem

  Scenario: True/False are subtypes of Boolean

    Then Boolean is a super type of Boolean
    Then Boolean is a super type of True
    Then Boolean is a super type of False

  Scenario: Numeric and its sub types

    Then Numeric is a super type of Numeric
    Then Numeric is a super type of Integer
    Then Numeric is a super type of Real

    Then Real is not a super type of Numeric
    Then Real is not a super type of Integer
