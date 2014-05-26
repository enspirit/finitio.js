Parser = require '../../../src/finitio/parser'
should = require 'should'

describe "Parser#type_def", ->

  parse = (source) ->
    Parser.parse(source, { startRule: "type_def" })

  it 'works', ()->
    s = parse('String = .String')
    should(s).eql({
      name: 'String'
      type: { builtin: { jsType: 'String' } }
    })

  it 'works with metadata', ()->
    s = parse('/- Foo -/ String = .String')
    should(s).eql({
      name: 'String'
      type: { builtin: { jsType: 'String' } }
      metadata: { description: 'Foo' }
    })
