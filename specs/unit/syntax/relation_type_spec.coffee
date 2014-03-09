Parser       = require '../../../src/syntax/parser'
BuiltinType  = require '../../../src/type/builtin_type'
RelationType = require '../../../src/type/relation_type'
Heading      = require '../../../src/support/heading'
Attribute    = require '../../../src/support/attribute'
should       = require 'should'

describe "Parser#relation_type", ->

  subject  = Parser.parse("{{foo: .String, bar: .Number}}", startRule: "type")
  foo      = new Attribute('foo', new BuiltinType(String))
  bar      = new Attribute('bar', new BuiltinType(Number))
  heading  = new Heading([foo, bar])
  expected = new RelationType(heading)

  it 'should return a RelationType', ->
    subject.should.be.an.instanceof(RelationType)
    subject.equals(expected).should.be.true
