Parser = require '../../../../src/finitio/parser'
should = require 'should'

describe "Parser#any_type", ->

  parse = (source) ->
    Parser.parse(source, { startRule: "type" })

  it 'works', ()->
    s = parse('.')
    should(s).eql({ any: {} })

  it 'works with metadata', ()->
    s = parse('/- Foo -/ .')
    should(s).eql({ any: {
      metadata: { description: 'Foo' }
    }})
