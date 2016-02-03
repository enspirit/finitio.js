Parser = require '../../../../src/finitio/parser'
should = require 'should'

describe "Parser#range_literal", ->

  parse = (source) ->
    Parser.parse(source, { startRule: "literal" })

  it 'works with a closed range style', ()->
    s = parse('1..10')
    should(s).eql({ min: 1, max: 10, min_inclusive: true, max_inclusive: true })

  it 'works with a open range style', ()->
    s = parse('1...10')
    should(s).eql({ min: 1, max: 10, min_inclusive: true, max_inclusive: false })

  it 'works with a min only', ()->
    s = parse('1..')
    should(s).eql({ min: 1, min_inclusive: true })
