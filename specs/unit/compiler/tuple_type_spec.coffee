Finitio     = require '../../../src/finitio'
Parser      = require '../../../src/finitio/parser'
BuiltinType = require '../../../src/finitio/type/builtin_type'
TupleType   = require '../../../src/finitio/type/tuple_type'
Heading     = require '../../../src/finitio/support/heading'
Attribute   = require '../../../src/finitio/support/attribute'
should      = require 'should'

describe "Parser#tuple_type", ->

  compile = (source, options) ->
    options.compiler = Finitio.compiler(options)
    Parser.parse(source, options)

  describe 'when no optional attributes', ->

    subject = compile("{foo: .String, bar: .Number}", startRule: 'type')
    foo      = new Attribute('foo', new BuiltinType(String))
    bar      = new Attribute('bar', new BuiltinType(Number))
    heading  = new Heading([foo, bar])
    expected = new TupleType(heading)

    it 'should return a TupleType', ->
      subject.should.be.an.instanceof(TupleType)
      subject.equals(expected).should.be.true

  describe 'when using optional attributes', ->

    subject  = compile("{foo: .String, bar :? .Number}", startRule: 'type')
    foo      = new Attribute('foo', new BuiltinType(String))
    maybeBar = new Attribute('bar', new BuiltinType(Number), false)
    heading  = new Heading([foo, maybeBar])
    expected = new TupleType(heading)

    it 'should return a TupleType', ->
      subject.should.be.an.instanceof(TupleType)
      subject.equals(expected).should.be.true