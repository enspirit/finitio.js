Parser           = require '../../../src/syntax/parser'
BuiltinType      = require '../../../src/type/builtin_type'
TupleType        = require '../../../src/type/tuple_type'
Heading          = require '../../../src/support/heading'
Attribute        = require '../../../src/support/attribute'
should           = require 'should'

describe "Parser#tuple_type", ->

  compile = (input) ->
    Parser.parse(input, startRule: "type")

  describe 'when no optional attributes', ->

    subject = compile("{foo: .String, bar: .Number}")
    foo      = new Attribute('foo', new BuiltinType(String))
    bar      = new Attribute('bar', new BuiltinType(Number))
    heading  = new Heading([foo, bar])
    expected = new TupleType(heading)

    it 'should return a TupleType', ->
      subject.should.be.an.instanceof(TupleType)
      subject.equals(expected).should.be.true

  describe 'when using optional attributes', ->

    subject  = compile("{foo: .String, bar :? .Number}")
    foo      = new Attribute('foo', new BuiltinType(String))
    maybeBar = new Attribute('bar', new BuiltinType(Number), false)
    heading  = new Heading([foo, maybeBar])
    expected = new TupleType(heading)

    it 'should return a TupleType', ->
      subject.should.be.an.instanceof(TupleType)
      subject.equals(expected).should.be.true