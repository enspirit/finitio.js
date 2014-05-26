Parser = require '../../../../src/finitio/parser'
should = require 'should'

describe "Parser#boolean_literal", ->

  parse = (source) ->
    Parser.parse(source, { startRule: "literal" })

  it 'works with true', ()->
    s = parse('true')
    should(s).equal(true)

  it 'works with false', ()->
    s = parse('false')
    should(s).equal(false)
