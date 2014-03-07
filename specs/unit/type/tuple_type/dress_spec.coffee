Attribute   = require '../../../../lib/support/attribute'
Heading     = require '../../../../lib/support/heading'
TupleType   = require '../../../../lib/type/tuple_type'
{TypeError} = require '../../../../lib/errors'
should      = require 'should'
_           = require 'underscore'
{byteType}  = require '../../../spec_helpers'

describe "TupleType#dress", ->

  heading = new Heading([
      new Attribute('r', byteType),
      new Attribute('g', byteType),
      new Attribute('b', byteType)
    ])

  type = new TupleType(heading, "color")

  lambda = (arg) -> type.dress(arg)

  describe 'with a valid Hash', ->
    subject = lambda { r: 12, g: 13, b: 255 }

    it 'should coerce to a tuple', ->
      _.isEqual(subject, r: 12, g: 13, b: 255).should.be.true

  describe 'when raising an error', ->

    lambda = (arg) ->
      try
        type.dress(arg)
      catch e
        e

    describe 'with something else than a Hash', ->
      subject = lambda("foo")

      it 'should raise a TypeError', ->
        subject.should.be.an.instanceof(TypeError)
        subject.message.should.equal("Invalid value `foo` for color")

      it 'should have no cause', ->
        should.equal(subject.cause, null)

      it 'should have an empty location', ->
        subject.location.should.equal('')

    describe 'with a missing attribute', ->
      subject = lambda { r: 12, g: 13 }

      it 'should raise a TypeError', ->
        subject.should.be.an.instanceof(TypeError)
        subject.message.should.equal("Missing attribute `b`")

      it 'should have no cause', ->
        should.equal(subject.cause, null)

      it 'should have an empty location', ->
        subject.location.should.equal('')

    describe 'with an extra attribute', ->
      subject = lambda { r: 12, g: 13, b: 255, extr: 165 }

      it 'should raise a TypeError', ->
        subject.should.be.an.instanceof(TypeError)
        subject.message.should.equal("Unrecognized attribute `extr`")

      it 'should have no cause', ->
        should.equal(subject.cause, null)

      it 'should have an empty location', ->
        subject.location.should.equal('')

    describe 'with an invalid attribute', ->
      subject = lambda { r: 'abc', g: 13, b: 255 }

      it 'should raise a TypeError', ->
        subject.should.be.an.instanceof(TypeError)
        subject.message.should.equal("Invalid value `abc` for Byte")

      it 'should have the correct cause', ->
        subject.cause.should.be.an.instanceof(TypeError)
        subject.cause.message.should.equal("Invalid value `abc` for intType")

      it 'should have the correct location', ->
        subject.location.should.equal("r")
