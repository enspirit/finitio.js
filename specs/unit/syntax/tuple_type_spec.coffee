Parser      = require '../../../src/syntax/parser'
BuiltinType = require '../../../src/type/builtin_type'
TupleType   = require '../../../src/type/tuple_type'
Heading     = require '../../../src/support/heading'
Attribute   = require '../../../src/support/attribute'
should      = require 'should'

describe "Parser#heading", ->

  subject  = Parser.parse("{foo: .String, bar: .Number}", startRule: "type")
  foo      = new Attribute('foo', new BuiltinType(String))
  bar      = new Attribute('bar', new BuiltinType(Number))
  heading  = new Heading([foo, bar])
  expected = new TupleType(heading)

  it 'should return a TupleType', ->
    subject.should.be.an.instanceof(TupleType)
    subject.equals(expected).should.be.true
