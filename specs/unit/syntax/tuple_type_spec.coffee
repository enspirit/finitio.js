Parser      = require '../../../lib/syntax/parser'
BuiltinType = require '../../../lib/type/builtin_type'
TupleType   = require '../../../lib/type/tuple_type'
Heading     = require '../../../lib/support/heading'
Attribute   = require '../../../lib/support/attribute'
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
