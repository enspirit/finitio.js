Parser      = require '../../../../src/finitio/parser'
should      = require 'should'

describe "Parser#real_literal", ->

  parse = (source) ->
    Parser.parse(source, { startRule: "literal", compiler: this })

  it 'works positive real', ()->
    s = parse('12.5')
    should(s).equal(12.5)

  it 'works with zero', ()->
    s = parse('0.0')
    should(s).equal(0.0)

  it 'works with zero II', ()->
    s = parse('.0')
    should(s).equal(0.0)

  it 'works with zero III', ()->
    s = parse('0.0000')
    should(s).equal(0.0)

  it 'works with negative reals', ()->
    s = parse('-12.0')
    should(s).equal(-12.0)

  it 'allows a zero-starting real', ()->
    s = parse('0.12')
    should(s).equal(0.12)

  it 'allows a negative zero-starting real', ()->
    s = parse('-0.12')
    should(s).equal(-0.12)
