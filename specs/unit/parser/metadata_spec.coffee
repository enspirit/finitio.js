Parser      = require '../../../src/finitio/parser'
should      = require 'should'

describe "Parser#metadata", ->

  parse = (source) ->
    Parser.parse(source, { startRule: "metadata" })

  it 'works with text metadata', ()->
    s = parse('/- Some fooes and bars -/')
    should(s).eql({ description: 'Some fooes and bars' })

  it 'works with structured metadata', ()->
    s = parse('/- size: 12, descr: "Hello world" -/')
    should(s).eql({ size: 12, descr: "Hello world" })
