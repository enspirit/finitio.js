Parser = require '../../../../src/finitio/parser'
should = require 'should'

describe "Parser#type_ref", ->

  parse = (source) ->
    Parser.parse(source, { startRule: "type" })

  it 'works', ()->
    s = parse('String')
    should(s).eql({ ref: { typeName: 'String' } })
