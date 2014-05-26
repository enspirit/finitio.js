Parser = require '../../../../src/finitio/parser'
should = require 'should'

describe "Parser#attribute", ->

  parse = (source) ->
    Parser.parse(source, { startRule: "attribute" })

  it 'works', ()->
    s = parse('name: .')
    should(s).eql({
      name: 'name',
      type: { any: {} }
    })

  it 'works with metadata', ()->
    s = parse('/- Foo -/ name: .')
    should(s).eql({
      name: 'name',
      type: { any: {} }
      metadata: { description: 'Foo' }
    })
