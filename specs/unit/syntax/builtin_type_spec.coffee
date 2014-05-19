Parser      = require '../../../src/finitio/syntax/parser'
BuiltinType = require '../../../src/finitio/type/builtin_type'
should      = require 'should'

describe "Parser#builtin_type", ->

  subject = Parser.parse(".String", startRule: "type")

  it 'should return a BuiltinType', ->
    subject.should.be.an.instanceof(BuiltinType)
    subject.jsType.should.equal(String)
