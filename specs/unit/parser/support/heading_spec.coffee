Parser = require '../../../../src/finitio/parser'
should = require 'should'

describe "Parser#heading", ->

  parse = (source) ->
    Parser.parse(source, { startRule: "heading" })

  it 'works', ()->
    s = parse('name: .')
    should(s).eql({
      attributes: [
        {
          name: 'name',
          type: { any: {} }
        }
      ]
    })

  it 'works with an empty heading', ()->
    s = parse('')
    should(s).eql({
      attributes: [
      ]
    })

  it 'works with dots only', ()->
    s = parse('...')
    should(s).eql({
      attributes: [
      ]
      options: { allowExtra: { any: {} } }
    })

  it 'works with both', ()->
    s = parse('name: ., ...')
    should(s).eql({
      attributes: [
        {
          name: 'name',
          type: { any: {} }
        }
      ]
      options: { allowExtra: { any: {} } }
    })

  it 'works with dots and type only', ()->
    s = parse('...: .String')
    should(s).eql({
      attributes: [
      ]
      options: { allowExtra: { builtin: { jsType: 'String' } } }
    })

  it 'works with both', ()->
    s = parse('name: ., ...: .String')
    should(s).eql({
      attributes: [
        {
          name: 'name',
          type: { any: {} }
        }
      ]
      options: { allowExtra: { builtin: { jsType: 'String' } } }
    })
