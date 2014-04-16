StructType      = require '../../../../src/type/struct_type'
{ArgumentError,
TypeError}      = require '../../../../src/errors'
_               = require 'underscore'
should          = require 'should'
{intType}       = require '../../../spec_helpers'

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

      err.should.be.an.instanceof ArgumentError
      err.message.should.equal("[Finitio::Type] expected, got String")
