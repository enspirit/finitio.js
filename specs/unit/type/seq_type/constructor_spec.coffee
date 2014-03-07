SeqType         = require '../../../../lib/type/seq_type'
{ArgumentError,
TypeError}      = require '../../../../lib/errors'
_               = require 'underscore'
should          = require 'should'
{intType}       = require '../../../spec_helpers'

describe "SeqType#initialize", ->

  subject = new SeqType(intType)

  describe 'with valid arguments', ->
    subject.should.be.an.instanceof SeqType

    it 'should set the instance variables', ->
      subject.elmType.should.equal(intType)

  describe 'with invalid arguments', ->
    lambda = -> new SeqType("foo")

    it 'should raise an error', ->
      should(lambda).throw()

      err = try
        lambda()
      catch e
        e

      err.should.be.an.instanceof ArgumentError
      err.message.should.equal('Qjs.Type expected, got String')
