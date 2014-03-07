SetType         = require '../../../../lib/type/set_type'
{ArgumentError,
TypeError}      = require '../../../../lib/errors'
_               = require 'underscore'
should          = require 'should'
{byteType}      = require '../../../spec_helpers'

describe "SetType#dress", ->

  type = new SetType(byteType)

  subject = (arg) -> type.dress(arg)

  describe 'with an empty array', ->
    res = subject([])
    _.isEqual(res, []).should.be.true

  describe 'with a valid array', ->
    res = subject([12, 16])
    _.isEqual(res, [12, 16]).should.be.true

  describe 'with something else than array', ->
    lambda = -> subject("foo")

    should(lambda).throw()

    try
      lambda()
    catch e
      e.should.be.an.instanceof(TypeError)
      e.message.should.equal("Invalid value `foo` for {Byte}")

  describe 'when invalid', ->

    describe 'with an array with non bytes', ->
      arg = [2, 4, -12]

      subject =
        try
          type.dress(arg)
        catch e
          e

      it 'should raise an error', ->
        subject.should.be.an.instanceof(TypeError)
        subject.message.should.equal("Invalid value `-12` for Byte")

      it 'should have correct location', ->
        subject.location.should.equal("2")

    describe 'with an array with duplicates', ->
      arg2 = [2, 4, 2]

      subject2 =
        try
          type.dress(arg2)
        catch e
          e

      it 'should raise an error', ->
        subject2.should.be.an.instanceof(TypeError)
        subject2.message.should.equal("Duplicate value `2`")

      it 'should have correct location', ->
        subject2.location.should.equal("2")
