Finitio     = require '../../../src/finitio'
Parser      = require '../../../src/finitio/parser'
BuiltinType = require '../../../src/finitio/type/builtin_type'
Heading     = require '../../../src/finitio/support/heading'
Attribute   = require '../../../src/finitio/support/attribute'
should      = require 'should'

describe "Parser#heading", ->

  compile = (source, options) ->
    options.compiler = Finitio.compiler(options)
    Parser.parse(source, options)

  subject = compile("foo: .String, bar: .Number", startRule: "heading")

  it 'should return a Heading', ->
    subject.should.be.an.instanceof(Heading)
    subject.size().should.equal(2)
