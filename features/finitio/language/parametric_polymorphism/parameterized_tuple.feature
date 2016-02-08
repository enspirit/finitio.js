Feature: Support for parametrically polymorphic types

  Background:

    Given the System is
      """
      Pagination(x) = {
        offset: Integer,
        total: Integer,
        count: Integer,
        data: [x]
      }
      {
        contents: Pagination(Boolean)
      }
      """

  Scenario: Validating data against valid document

    Given I dress the following JSON document:
      """
      {
        "contents": {
          "offset": 3,
          "total": 10,
          "count": 3,
          "data": [false, true, false]
        }
      }
      """

    Then it should be a success

  Scenario: Validating data against an invalid document (I)

    Given I dress the following JSON document:
      """
      {
        "contents": {
          "offset": 3,
          "total": 10,
          "count": 3,
          "data": [false, true, 5]
        }
      }
      """

    Then it should be a TypeError
    And its root cause should be:
      | message              |
      | Invalid Boolean: `5` |
