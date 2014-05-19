StructType = require '../../../../src/type/struct_type'
_          = require 'underscore'
should     = require 'should'
{intType}  = require '../../../spec_helpers'

describe "StructType#constructor", ->

  describe 'with valid components', ->
    subject = new StructType([intType])

    it 'should be a StructType', ->
      subject.should.be.an.instanceof(StructType)

  describe 'with invalid components', ->
    subject = ->
      new StructType("foo")

    it 'should raise an error', ->
      should(subject).throw()

      err = try
        subject()
      catch e
        e

      err.message.should.equal("[Finitio::Type] expected, got: foo")
