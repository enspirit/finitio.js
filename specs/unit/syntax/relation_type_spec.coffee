Parser       = require '../../../lib/syntax/parser'
BuiltinType  = require '../../../lib/type/builtin_type'
RelationType = require '../../../lib/type/relation_type'
Heading      = require '../../../lib/support/heading'
Attribute    = require '../../../lib/support/attribute'
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
