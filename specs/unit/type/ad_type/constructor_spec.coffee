Contract    = require '../../../../src/finitio/support/contract'
AdType      = require '../../../../src/finitio/type/ad_type'
should      = require 'should'
{intType,
stringType} = require '../../../spec_helpers'

describe "AdType#constructor", ->

  f = (arg)->

  subject = new AdType(Date, [
    Contract.explicit('timestamp', intType, f, f)
    Contract.explicit('utc',       stringType, f, f)
  ])

  describe 'with valid arguments', ->

    it 'builds an AdType', ->
      should(subject).be.an.instanceof(AdType)

    it 'should set the instance variables', ->
      should(subject.jsType).be.equal(Date)
      should(subject.contracts).be.an.instanceof(Array)

  describe 'with invalid arguments (I)', ->
    lambda = -> new AdType("foo")

    it 'should raise an error', ->
      should(lambda).throw()

      err = try
        lambda()
      catch e
        e

      err.message.should.equal 'Constructor (function) expected, got: foo'

  describe 'with invalid arguments (II)', ->
    lambda = -> new AdType(Date, "bar")

    it 'should raise an error', ->
      should(lambda).throw()

      err = try
        lambda()
      catch e
        e

      err.message.should.equal "[Contract] expected, got: bar"
