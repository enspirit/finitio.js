Finitio     = require '../../../../src/finitio'
Parser      = require '../../../../src/finitio/parser'
BuiltinType = require '../../../../src/finitio/type/builtin_type'
should      = require 'should'

describe "Parser#builtin_type", ->

  compile = (source, options) ->
    options.compiler = Finitio.compiler(options)
    Parser.parse(source, options)

  subject = compile(".String", startRule: "type")

  it 'should return a BuiltinType', ->
    subject.should.be.an.instanceof(BuiltinType)
    subject.jsType.should.equal(String)
