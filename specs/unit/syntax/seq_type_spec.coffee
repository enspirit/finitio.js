Parser      = require '../../../src/syntax/parser'
SeqType     = require '../../../src/type/seq_type'
BuiltinType = require '../../../src/type/builtin_type'
should      = require 'should'

describe "Parser#seq_type", ->

  subject = Parser.parse("[.String]", startRule: "type")

  it 'should return a SeqType', ->
    subject.should.be.an.instanceof(SeqType)
    subject.elmType.should.be.an.instanceof(BuiltinType)
    subject.elmType.jsType.should.equal(String)
