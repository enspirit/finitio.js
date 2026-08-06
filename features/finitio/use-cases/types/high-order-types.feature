Feature: Using Finitio High-Order types

  Background:

    Given the System is
      """
      Data<T,A> = {
        type       : T
        id         : Integer
        attributes : A
      }

      Resource<Type,Attrs> = {
        data  : Data<Type,Attrs>
        links : [String]
      }

      Collection<Type,Attrs> = {
        data  : [Data<Type,Attrs>]
        links : [String]
      }

      People.Type = String(s | s=="People")
      People.Attrs = {
        firstname: String
        lastname: String
      }

      People = Resource<People.Type,People.Attrs>
      Peoples = Collection<People.Type,People.Attrs>
      """

  Scenario: Coercing a valid representation of an object

    Given I dress the following JSON document with People:
      """
      {
        "data": {
          "type": "People",
          "id": 1,
          "attributes": {
            "firstname": "Bernard",
            "lastname": "Lambeau"
          }
        },
        "links": []
      }
      """

    Then it should be a success

  Scenario: Coercing a valid representation of a collection

    Given I dress the following JSON document with Peoples:
      """
      {
        "data": [{
          "type": "People",
          "id": 1,
          "attributes": {
            "firstname": "Bernard",
            "lastname": "Lambeau"
          }
        },{
          "type": "People",
          "id": 2,
          "attributes": {
            "firstname": "Yoann",
            "lastname": "Guyot"
          }
        }],
        "links": []
      }
      """

    Then it should be a success

  # Binding a generic's parameters resolves the proxies in its body, and a
  # resolved proxy stays resolved. Each instantiation therefore works on its
  # own copy of the definition; sharing it made the second use of a generic
  # reuse the arguments of the first.

  Scenario: Two instantiations of one generic, in declaration order

    Given the System is
      """
      Page<T> = { items: [T] }
      Person  = { name: String }
      Product = { sku: String }

      { a: Page<Person>, b: Page<Product> }
      """
    Given I dress the following JSON document:
      """
      {
        "a": { "items": [ { "name": "Bernard" } ] },
        "b": { "items": [ { "sku": "FIO-1" } ] }
      }
      """
    Then the result should equal JSON's '{ "a": { "items": [ { "name": "Bernard" } ] }, "b": { "items": [ { "sku": "FIO-1" } ] } }'

  Scenario: The order of instantiation does not matter

    Given the System is
      """
      Page<T> = { items: [T] }
      Person  = { name: String }
      Product = { sku: String }

      { a: Page<Product>, b: Page<Person> }
      """
    Given I dress the following JSON document:
      """
      {
        "a": { "items": [ { "sku": "FIO-1" } ] },
        "b": { "items": [ { "name": "Bernard" } ] }
      }
      """
    Then the result should equal JSON's '{ "a": { "items": [ { "sku": "FIO-1" } ] }, "b": { "items": [ { "name": "Bernard" } ] } }'

  Scenario: Each instantiation keeps rejecting the other's payload

    Given the System is
      """
      Page<T> = { items: [T] }
      Person  = { name: String }
      Product = { sku: String }

      { a: Page<Person>, b: Page<Product> }
      """
    Given I dress the following JSON document:
      """
      {
        "a": { "items": [ { "sku": "FIO-1" } ] },
        "b": { "items": [ { "sku": "FIO-1" } ] }
      }
      """
    Then it should be a TypeError

  Scenario: Constraints survive into each instantiation

    Given the System is
      """
      Page<T> = { items: [T] }
      Age     = Integer( i | positive: i >= 0 )
      Name    = String( s | notEmpty: s.length > 0 )

      { ages: Page<Age>, names: Page<Name> }
      """
    Given I dress the following JSON document:
      """
      {
        "ages":  { "items": [ -3 ] },
        "names": { "items": [ "Bernard" ] }
      }
      """
    Then it should be a TypeError
