Parser = require '../../../../src/finitio/parser'
should = require 'should'

describe "Parser#relation_type", ->

  parse = (source) ->
    Parser.parse(source, { startRule: "type" })

  it 'works', ()->
    s = parse('{{ name: . }}')
    expected = {
      relation: {
        heading: {
          attributes: [
            {
              name: 'name',
              type: { any: {} }
            }
          ]
        }
      }
    }
    should(s).eql(expected)

  it 'works with metadata', ()->
    s = parse('/- Foo -/ {{ name: . }}')
    expected = {
      relation: {
        heading: {
          attributes: [
            {
              name: 'name',
              type: { any: {} }
            }
          ]
        }
        metadata: { description: 'Foo'}
      }
    }
    should(s).eql(expected)
