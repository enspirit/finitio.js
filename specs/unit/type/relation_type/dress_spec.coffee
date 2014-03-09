Attribute     = require '../../../../src/support/attribute'
Heading       = require '../../../../src/support/heading'
RelationType  = require '../../../../src/type/relation_type'
{TypeError}   = require '../../../../src/errors'
_             = require 'underscore'
should        = require 'should'
{byteType}    = require '../../../spec_helpers'

describe "RelationType#dress", ->

  heading = new Heading([
      new Attribute('r', byteType),
      new Attribute('g', byteType),
      new Attribute('b', byteType)
    ])

  type = new RelationType(heading, "colors")

  factor = (arg) -> type.dress(arg)

  describe 'with a valid array of Hashes', ->
    subject = factor [
        { "r": 12, "g": 13, "b": 255 },
        { "r": 12, "g": 15, "b": 198 }
      ]

    expected = [
        { r: 12, g: 13, b: 255 },
        { r: 12, g: 15, b: 198 }
      ]

    it 'should coerce to an array of tuples', ->
      _.isEqual(subject, expected).should.be.true

  describe 'with an empty array', ->
    subject = factor []

    expected = []

    it 'should coerce to an array of tuples', ->
      _.isEqual(subject, expected).should.be.true

  describe 'when raising an error', ->

    lambda = (arg) ->
      try
        type.dress(arg)
      catch e
        e

    describe 'with something else than an Array', ->
      subject = lambda("foo")

      it 'should raise a TypeError', ->
        subject.should.be.an.instanceof(TypeError)
        subject.message.should.equal("Invalid value `foo` for colors")

      it 'should have no cause', ->
        should.equal(subject.cause, null)

      it 'should have an empty location', ->
        subject.location.should.equal('')

    describe 'with Array of non-tuples', ->
      subject = lambda(["foo"])

      it 'should raise a TypeError', ->
        subject.should.be.an.instanceof(TypeError)
        subject.message.should.equal \
          "Invalid value `foo` for {r: Byte, g: Byte, b: Byte}"

      it 'should have no cause', ->
        should.equal(subject.cause, null)

      it 'should have the correct location', ->
        subject.location.should.equal('0')

    describe 'with a wrong tuple', ->
      subject = lambda [
          { "r": 12, "g": 13, "b": 255 },
          { "r": 12, "g": 13 }
        ]

      it 'should raise a TypeError', ->
        subject.should.be.an.instanceof(TypeError)
        subject.message.should.equal("Missing attribute `b`")

      it 'should have no cause', ->
        should.equal(subject.cause, null)

      it 'should have the correct location', ->
        subject.location.should.equal('1')

    describe 'with a wrong tuple attribute', ->
      subject = lambda [
          { "r": 12, "g": 13, "b": 255  },
          { "r": 12, "g": 13, "b": '12' }
        ]

      it 'should raise a TypeError', ->
        subject.should.be.an.instanceof(TypeError)
        subject.message.should.equal("Invalid value `12` for Byte")

      it 'should have a cause', ->
        subject.cause.should.not.be.null

      it 'should have the correct location', ->
        subject.location.should.equal('1/b')

    describe 'with a duplicate tuple', ->
      subject = lambda [
          { "r": 12, "g": 13, "b": 255 },
          { "r": 12, "g": 192, "b": 13 },
          { "r": 12, "g": 13, "b": 255 }
        ]

      it 'should raise a TypeError', ->
        subject.should.be.an.instanceof(TypeError)
        subject.message.should.equal("Duplicate tuple")

      it 'should have no cause', ->
        should.equal(subject.cause, null)

      it 'should have the correct location', ->
        subject.location.should.equal('2')
