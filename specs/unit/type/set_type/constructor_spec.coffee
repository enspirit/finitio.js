SetType         = require '../../../../lib/type/set_type'
{ArgumentError,
TypeError}      = require '../../../../lib/errors'
_               = require 'underscore'
should          = require 'should'

describe "SetType#initialize", ->

  subject = new SetType(intType)

  describe 'with valid arguments', ->
    subject.should.be.an.instanceof SetType

    it 'should set the instance variables', ->
      subject.elmType.should.equal(intType)

  describe 'with invalid arguments', ->
    lambda = -> new SetType("foo")

    it 'should raise an error', ->
      expect(lambda).toThrow

      err = try
        lambda()
      catch e
        e

      err.should.be.an.instanceof ArgumentError
      err.message.should.equal('Qjs.Type expected, got String')
