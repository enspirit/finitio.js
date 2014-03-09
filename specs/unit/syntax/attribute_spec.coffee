Parser      = require '../../../src/syntax/parser'
BuiltinType = require '../../../src/type/builtin_type'
Attribute   = require '../../../src/support/attribute'
should      = require 'should'

describe "Parser#attribute", ->

  subject = Parser.parse("foo: .String", startRule: "attribute")

  it 'should return an Attribute', ->
    subject.should.be.an.instanceof(Attribute)
    subject.name.should.equal('foo')
    subject.type.should.be.an.instanceof(BuiltinType)
