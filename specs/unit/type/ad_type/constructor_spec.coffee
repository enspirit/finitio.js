AdType         = require '../../../../src/finitio/type/ad_type'
should         = require 'should'
{intType,
stringType}    = require '../../../spec_helpers'

describe "AdType#constructor", ->

  subject = new AdType(Date, {
    timestamp:  [intType,    Date, Date]
    utc_string: [stringType, Date, Date]})

  describe 'with valid arguments', ->
    subject.should.be.an.instanceof(AdType)

    it 'should set the instance variables', ->
      subject.jsType.should.equal(Date)
      (typeof(subject.contracts)).should.equal("object")

  describe 'with invalid arguments (I)', ->
    lambda = -> new AdType("foo", {})

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

      err.message.should.equal "Hash expected, got: bar"
