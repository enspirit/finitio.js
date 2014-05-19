Parser      = require '../../../src/finitio/syntax/parser'
SeqType     = require '../../../src/finitio/type/seq_type'
BuiltinType = require '../../../src/finitio/type/builtin_type'
should      = require 'should'

describe "Parser#seq_type", ->

  subject = Parser.parse("[.String]", startRule: "type")

  it 'should return a SeqType', ->
    subject.should.be.an.instanceof(SeqType)
    subject.elmType.should.be.an.instanceof(BuiltinType)
    subject.elmType.jsType.should.equal(String)
