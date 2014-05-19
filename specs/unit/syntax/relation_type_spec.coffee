Parser            = require '../../../src/finitio/syntax/parser'
BuiltinType       = require '../../../src/finitio/type/builtin_type'
RelationType      = require '../../../src/finitio/type/relation_type'
Heading           = require '../../../src/finitio/support/heading'
Attribute         = require '../../../src/finitio/support/attribute'
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

    src       = "{{foo: .String, bar :? .Number}}"
    subject   = Parser.parse(src, startRule: "type")
    foo       = new Attribute('foo', new BuiltinType(String))
    maybeBar  = new Attribute('bar', new BuiltinType(Number), false)
    heading   = new Heading([foo, maybeBar])
    expected  = new RelationType(heading)

    it 'should return a RelationType', ->
      subject.should.be.an.instanceof(RelationType)
      subject.equals(expected).should.be.true
