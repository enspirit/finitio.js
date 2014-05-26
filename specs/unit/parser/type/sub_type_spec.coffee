Parser = require '../../../../src/finitio/parser'
should = require 'should'

describe "Parser#sub_type", ->

  parse = (source) ->
    Parser.parse(source, { startRule: "type" })

  it 'works with a single unnamed constraint', ()->
    s = parse('.( i | i>0 )')
    expected = {
      sub: {
        superType: { any: {} }
        constraints: [
          { native: ['i', 'i>0'] }
        ]
      }
    }
    should(s).eql(expected)

  it 'works with a single named constraint', ()->
    s = parse('.( i | positive: i>0 )')
    expected = {
      sub: {
        superType: { any: {} }
        constraints: [
          { name: 'positive', native: ['i', 'i>0'] }
        ]
      }
    }
    should(s).eql(expected)

  it 'works with multiple named constraints', ()->
    s = parse('.( i | positive: i>0, negative: i<0 )')
    expected = {
      sub: {
        superType: { any: {} }
        constraints: [
          { name: 'positive', native: ['i', 'i>0'] }
          { name: 'negative', native: ['i', 'i<0'] }
        ]
      }
    }
    should(s).eql(expected)

  it 'works with metadata', ()->
    s = parse('/- Foo -/ .( i | i>0 )')
    expected = {
      sub: {
        superType: { any: {} }
        constraints: [
          { native: ['i', 'i>0'] }
        ]
        metadata: { description: 'Foo' }
      }
    }
    should(s).eql(expected)
