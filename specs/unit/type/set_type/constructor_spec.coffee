SetType   = require '../../../../src/type/set_type'
_         = require 'underscore'
should    = require 'should'
{intType} = require '../../../spec_helpers'

describe "SetType#initialize", ->

  subject = new SetType(intType)

  describe 'with valid arguments', ->
    subject.should.be.an.instanceof SetType

    it 'should set the instance variables', ->
      subject.elmType.should.equal(intType)

  describe 'with invalid arguments', ->
    lambda = -> new SetType("foo")

    it 'should raise an error', ->
      should(lambda).throw()

      err = try
        lambda()
      catch e
        e

      err.should.be.an.instanceof(Error)
      err.message.should.equal('Finitio.Type expected, got: foo')
