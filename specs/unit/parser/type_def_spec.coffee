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

  it 'works with type parameters', ()->
    s = parse('Map(a, b) = { foo: a, bar: b }')
    should(s).eql({
      name: ''
      type: {
        tuple: {
          attributes: [
            {
              name: 'foo',
              type: {
                ref: { typeName: 'a' }
              }
            },
            {
              name: 'bar',
              type: {
                ref: { typeName: 'b' }
              }
            }
          ]
        }
      }
      metadata: { description: 'Foo' }
    })
