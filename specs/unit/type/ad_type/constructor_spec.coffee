AdType         = require '../../../../lib/type/ad_type'
{TypeError,
ArgumentError} = require '../../../../lib/errors'
should         = require 'should'

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

      err.should.be.an.instanceof ArgumentError
      err.message.should.equal 'Constructor (function) expected, got String'

  describe 'with invalid arguments (II)', ->
    lambda = -> new AdType(Date, "bar")

    it 'should raise an error', ->
      should(lambda).throw()

      err = try
        lambda()
      catch e
        e

      err.should.be.an.instanceof ArgumentError
      err.message.should.equal "Hash expected, got String"
