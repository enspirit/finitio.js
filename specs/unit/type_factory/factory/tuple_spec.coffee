TypeFactory = require '../../../../lib/type/factory'
TupleType   = require '../../../../lib/type/tuple_type'
should      = require 'should'

describe 'TypeFactory#tuple', ->

  factory = new TypeFactory

  expected = factory.tuple(r: Number)

  describe 'when used with {r: Number}', ->
    subject = factory.type(r: Number)

    subject.should.equal(expected)

  describe 'when used with {r: Number} and a name', ->
    subject = factory.type(r: Number, 'MyTuple')

    subject.should.be.an.instanceof TupleType

    it 'should have the correct name', ->
      subject.name.should.equal("MyTuple")