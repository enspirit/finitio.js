Finitio     = require '../../../../src/finitio'
Parser      = require '../../../../src/finitio/parser'
SetType     = require '../../../../src/finitio/type/set_type'
BuiltinType = require '../../../../src/finitio/type/builtin_type'
should      = require 'should'

describe "Parser#set_type", ->

  compile = (source, options) ->
    options.compiler = Finitio.compiler(options)
    Parser.parse(source, options)

  subject = compile("{.String}", startRule: "type")

  it 'should return a SetType', ->
    subject.should.be.an.instanceof(SetType)
    subject.elmType.should.be.an.instanceof(BuiltinType)
    subject.elmType.jsType.should.equal(String)
