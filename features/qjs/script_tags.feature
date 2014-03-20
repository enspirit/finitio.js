Feature: Q-lang Script Tags

  Background:
    Given That Q.js is loaded in a browser

  Scenario: When a script tag is present in the page

    Given the script content is
      """
      Byte   = Integer( i | i >= 0 && i <= 255 )
      Gender = <mf> String( s | s == 'M' || s == 'F' )
      """
    Given the script's data-system attribute is "mySystem"
    Then Qlang should have a system named "mySystem"
    Then 

  Scenario: Against a string

    Given I dress JSON's '12'
    Then the result should be the integer 12
