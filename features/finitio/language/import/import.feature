Feature: The ability to import systems

  Background:

    Given the following system is known as 'import/example'
      """
      Foo = Integer( i | i > 0 )
      Bar = Integer( i | i < 0 )
      """

  Scenario: Importing an entire system

    Given the System is
      """
      @import import/example
      """
    Then it includes a type named Foo
    Then it includes a type named Bar

  Scenario: Denoting a system by a prefix

    Given the System is
      """
      @import import/example as ex
      """
    Then it does not include a type named Foo
    Then it does not include a type named Bar
    Then it includes a type named ex.Foo
    Then it includes a type named ex.Bar

