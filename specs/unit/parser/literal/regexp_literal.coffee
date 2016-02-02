Parser = require '../../../../src/finitio/parser'
should = require 'should'

describe "Parser#regexp_literal", ->

  parse = (source) ->
    Parser.parse(source, { startRule: "literal" })

  it 'works with a regexp style', ()->
    s = parse('/[a-z]+/')
    should(s.toString()).equal("[a-z]+")
