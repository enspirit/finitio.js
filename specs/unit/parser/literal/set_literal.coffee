Parser      = require '../../../../src/finitio/parser'
should      = require 'should'

describe "Parser#set_literal", ->

  parse = (source) ->
    Parser.parse(source, { startRule: "literal" })

  it 'works with empty set', ()->
    s = parse('{}')
    should(s).eql([])

  it 'works with empty sey with trailing spaces', ()->
    s = parse('{   }')
    should(s).eql([])

  it 'works with a singleton', ()->
    s = parse('{ 12 }')
    should(s).eql([ 12 ])

  it 'works with non singleton', ()->
    s = parse('{ 12, 14 }')
    should(s).eql([ 12, 14 ])

  # Not sure it is wise for the parser to remove duplicates.
  # Javascript...
  # it 'works by removing duplicates', ()->
  #     s = parse('{ 12, 14, 12 }')
  #     should(s).eql([ 12, 14 ])
