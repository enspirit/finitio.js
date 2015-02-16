Parser      = require '../../../../src/finitio/parser'
should      = require 'should'

describe "Parser#array_literal", ->

  parse = (source) ->
    Parser.parse(source, { startRule: "literal" })

  it 'works with empty array', ()->
    s = parse('[]')
    should(s).eql([])

  it 'works with empty array with trailing spaces', ()->
    s = parse('[  ]')
    should(s).eql([])

  it 'works with singleton', ()->
    s = parse('[ 12 ]')
    should(s).eql([ 12 ])

  it 'works with non singleton', ()->
    s = parse('[ 12, 14 ]')
    should(s).eql([ 12, 14 ])
