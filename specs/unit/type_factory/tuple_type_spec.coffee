TupleType   = require '../../../src/finitio/type/tuple_type'
TypeFactory = require '../../../src/finitio/support/factory'
should      = require 'should'

describe "TypeFactory#tuple", ->

  factory = new TypeFactory

  expected = factory.tuple(r: Number)

  describe 'when use with {r: Number}', ->
    subject = factory.type(r: Number)

    it 'should give expected result', ->
      subject.equals(expected).should.be.true

  describe 'when use with {r: Number} and a name', ->
    subject = factory.type({r: Number}, "MyTuple")

    it 'should give expected result', ->
      subject.equals(expected).should.be.true

    it 'should have the correct name', ->
      subject.name.should.equal("MyTuple")
