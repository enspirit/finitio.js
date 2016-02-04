Parser = require '../../../../src/finitio/parser'
should = require 'should'

describe "Parser#funcref_literal", ->

  parse = (source) ->
    Parser.parse(source, { startRule: "literal" })

  it 'works with a global function style', ()->
    s = parse('&functionName')
    should(s).eql('functionName')

  it 'works with a dotted function style', ()->
    s = parse('&object.functionName')
    should(s).eql('object.functionName')
