Parser      = require '../../../src/finitio/syntax/parser'
SetType     = require '../../../src/finitio/type/set_type'
BuiltinType = require '../../../src/finitio/type/builtin_type'
should      = require 'should'

describe "Parser#set_type", ->

  subject = Parser.parse("{.String}", startRule: "type")

  it 'should return a SetType', ->
    subject.should.be.an.instanceof(SetType)
    subject.elmType.should.be.an.instanceof(BuiltinType)
    subject.elmType.jsType.should.equal(String)
