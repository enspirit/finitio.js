Parser      = require '../../../../src/finitio/parser'
should      = require 'should'

describe "Parser#string_literal", ->

  parse = (source) ->
    Parser.parse(source, { startRule: "literal", compiler: this })

  it 'works with a doubly-quoted string', ()->
    s = parse('"Hello"')
    should(s).equal("Hello")

  it 'supports escaping quotes', ()->
    s = parse('"O\\"Neil"')
    should(s).equal('O\"Neil')
