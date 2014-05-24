{TypeError} = require '../../../../src/finitio/errors'
UnionType   = require '../../../../src/finitio/type/union_type'
should      = require 'should'
{intType,
floatType}  = require '../../../spec_helpers'

describe "UnionType#dress", ->

  # Let's reinvent JS' Number, shall we?
  type = new UnionType([intType, floatType], "union")

  it 'with an Integer', ->
    subject = type.dress(12)
    should(subject).equal(12)

  it 'with a Float', ->
    subject = type.dress(3.14)
    should(subject).equal(3.14)

  describe 'with a String', ->
    subject = try
      type.dress("foo")
    catch e
      e

    it 'should raise an Error', ->
      should(subject).be.an.instanceof(TypeError)
      should(subject.message).equal("Invalid value `foo`")

    it 'has the expected root cause', ->
      rc = subject.getRootCause()
      should(rc).be.an.instanceof(TypeError)
      should(rc.message).equal("Invalid Number `foo`")
