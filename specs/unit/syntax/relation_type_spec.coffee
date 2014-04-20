Parser            = require '../../../src/syntax/parser'
BuiltinType       = require '../../../src/type/builtin_type'
RelationType      = require '../../../src/type/relation_type'
MultiRelationType = require '../../../src/type/multi_relation_type'
Heading           = require '../../../src/support/heading'
Attribute         = require '../../../src/support/attribute'
should            = require 'should'

describe "Parser#relation_type", ->

  describe 'when not using optional attributes', ->

    subject  = Parser.parse("{{foo: .String, bar: .Number}}", startRule: "type")
    foo      = new Attribute('foo', new BuiltinType(String))
    bar      = new Attribute('bar', new BuiltinType(Number))
    heading  = new Heading([foo, bar])
    expected = new RelationType(heading)

    it 'should return a RelationType', ->
      subject.should.be.an.instanceof(RelationType)
      subject.equals(expected).should.be.true

  describe 'when using optional attributes', ->

    subject   = Parser.parse("{{foo: .String, bar :? .Number}}", startRule: "type")
    foo       = new Attribute('foo', new BuiltinType(String))
    maybeBar  = new Attribute('bar', new BuiltinType(Number), false)
    heading   = new Heading([foo, maybeBar])
    expected  = new MultiRelationType(heading)

    it 'should return a MultiRelationType', ->
      subject.should.be.an.instanceof(MultiRelationType)
      subject.equals(expected).should.be.true
