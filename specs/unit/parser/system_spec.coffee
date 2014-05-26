Parser = require '../../../src/finitio/parser'
should = require 'should'

describe "Parser#system", ->

  parse = (source) ->
    Parser.parse(source, { startRule: "system" })

  it 'works with a single type', ()->
    s = parse('.')
    expected = {
      types: [
        { name: 'Main', type: { any: {} } }
      ]
    }
    should(s).eql(expected)

  it 'works with a type def', ()->
    s = parse('Any = .')
    expected = {
      types: [
        { name: 'Any', type: { any: {} } }
      ]
    }
    should(s).eql(expected)

  it 'works with an import and a ref', ()->
    s = parse("@import finitio/data as f\nf.String")
    expected = {
      imports: [
        { qualifier: 'f', from: 'finitio/data' }
      ]
      types: [
        { name: 'Main', type: { ref: { typeName: 'f.String' } } }
      ]
    }
    should(s).eql(expected)
