{TypeError} = require '../../../src/errors'
System      = require '../../../src/system'
TupleType   = require '../../../src/type/tuple_type'
SubType     = require '../../../src/type/sub_type'

should = require 'should'

describe "System#constructor", ->

  system = new System

  describe 'for building a tuple type', ->
    subject = system.tuple(r: Number)

    it 'should be a TupleType', ->
      subject.should.be.an.instanceof TupleType

  describe 'for building a sub type', ->
    subject = system.sub_type(Number, (i) -> i>=0)

    it 'should be a SubType', ->
      subject.should.be.an.instanceof SubType

    it 'should apply the constraint', ->
      lambda = -> subject.dress(-9)

      should(lambda).throw()

      err = try
        lambda()
      catch e
        e

      err.should.be.an.instanceof TypeError
