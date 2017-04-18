Feature: Support for a schema ending in instantiation of a parametric type

  Background:

    Given the System is
      """
      Pagination(x) = {
        offset : Integer,
        total  : Integer,
        count  : Integer,
        data   : [x]
      }
      Pagination(Integer)
      """

  Scenario: Validating data against valid document

    Given I dress the following JSON document:
      """
      {
        "offset": 3,
        "total": 10,
        "count": 3,
        "data": [1, 2, 3]
      }
      """

    Then it should be a success

  Scenario: Validating data against an invalid document (I)

    Given I dress the following JSON document:
      """
      {
        "offset": 3,
        "total": 10,
        "count": 3,
        "data": [1, 2, "foo"]
      }
      """

    Then it should be a TypeError
    And its root cause should be:
      | message                |
      | Invalid Integer: `foo` |
