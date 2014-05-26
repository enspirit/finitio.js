Parser = require '../../../../src/finitio/parser'
should = require 'should'

describe "Parser#union_type", ->

  parse = (source) ->
    Parser.parse(source, { startRule: "type" })

  it 'works', ()->
    s = parse('.String|.Integer')
    expected = { union: {
      candidates: [
        { builtin: { jsType: 'String'  } }
        { builtin: { jsType: 'Integer' } }
      ]
    } }
    should(s).eql(expected)
