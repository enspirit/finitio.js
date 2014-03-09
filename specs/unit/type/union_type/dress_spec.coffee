{TypeError} = require '../../../../src/errors'
UnionType   = require '../../../../src/type/union_type'
should      = require 'should'
{intType,
floatType}  = require '../../../spec_helpers'

describe "UnionType#dress", ->

  # Let's reinvent JS' Number, shall we?
  type = new UnionType([intType, floatType], "union")

  describe 'with an Integer', ->
    subject = type.dress(12)
    subject.should.equal(12)

  describe 'with a Float', ->
    subject = type.dress(3.14)
    subject.should.equal(3.14)

  describe 'with a String', ->
    subject = try
      type.dress("foo")
    catch e
      e

    it 'should raise an Error', ->
      subject.should.be.an.instanceof(TypeError)
      subject.message.should.equal("Invalid value `foo` for union")

    it 'should have no cause', ->
      should.equal(subject.cause, null)

    it 'should have an empty location', ->
      subject.location.should.equal('')
