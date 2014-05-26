Parser = require '../../../../src/finitio/parser'
should = require 'should'

describe "Parser#struct_type", ->

  parse = (source) ->
    Parser.parse(source, { startRule: "type" })

  it 'works', ()->
    s = parse('<.,.String>')
    should(s).eql({
      struct: {
        componentTypes: [
          { any: {} }
          { builtin: { jsType: 'String' } }
        ]
      }
    })

  it 'works with metadata', ()->
    s = parse('/- Foo -/ <.,.String>')
    should(s).eql({
      struct: {
        componentTypes: [
          { any: {} }
          { builtin: { jsType: 'String' } }
        ]
        metadata: { description: 'Foo' }
      }
    })
