Parser = require '../../../../src/finitio/parser'
should = require 'should'

describe "Parser#seq_type", ->

  parse = (source) ->
    Parser.parse(source, { startRule: "type" })

  it 'works', ()->
    s = parse('[.]')
    expected = { seq: { elmType: { any: {} } } }
    should(s).eql(expected)

  it 'works with metadata', ()->
    s = parse('/- Foo -/ [.]')
    expected = { seq: {
      elmType: { any: {} },
      metadata: { description: 'Foo'}
    } }
    should(s).eql(expected)
