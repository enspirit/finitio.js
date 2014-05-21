Parser      = require '../../../../src/finitio/parser'
should      = require 'should'

describe "Parser#integer_literal", ->

  parse = (source) ->
    Parser.parse(source, { startRule: "literal" })

  it 'works with single-digit positive integer', ()->
    s = parse('2')
    should(s).equal(2)

  it 'works with multi-digit positive integer', ()->
    s = parse('12')
    should(s).equal(12)

  it 'works with zero', ()->
    s = parse('0')
    should(s).equal(0)

  it 'works with negative integers', ()->
    s = parse('-12')
    should(s).equal(-12)
