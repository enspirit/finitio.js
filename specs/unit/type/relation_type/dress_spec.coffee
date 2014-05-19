Attribute          = require '../../../../src/finitio/support/attribute'
Heading            = require '../../../../src/finitio/support/heading'
RelationType       = require '../../../../src/finitio/type/relation_type'
{TypeError}        = require '../../../../src/finitio/errors'
_                  = require 'underscore'
should             = require 'should'
{byteType}         = require '../../../spec_helpers'

describe "RelationType#dress", ->

  heading = new Heading([
    new Attribute('r', byteType),
    new Attribute('g', byteType),
    new Attribute('b', byteType, false)
  ])

  type = new RelationType(heading, "colors")

  dress = (arg) -> type.dress(arg)

  context 'with a valid array of Hashes', ->
    arg = [
      { "r": 12, "g": 13, "b": 255 },
      { "r": 12, "g": 15, "b": 198 }
    ]

    expected = [
      { r: 12, g: 13, b: 255 },
      { r: 12, g: 15, b: 198 }
    ]

    it 'should coerce to an Array of tuples', ->
      dress(arg).should.be.an.instanceof(Array)
      dress(arg).should.eql(expected)

  context 'with a valid array of Hashes with some optional missing', ->
    arg = [
      { "r": 12, "g": 13, "b": 255 },
      { "r": 12, "g": 15 }
    ]
    expected = [
      { r: 12, g: 13, b: 255 },
      { r: 12, g: 15 }
    ]

    it 'should coerce to an Array of tuples', ->
      dress(arg).should.be.an.instanceof(Array)
      dress(arg).should.eql(expected)

  context 'with an empty array', ->
    arg = []
    expected = []

    it 'should coerce to an Array of tuples', ->
      dress(arg).should.be.an.instanceof(Array)
      dress(arg).should.eql(expected)

  context 'when raising an error', ->

    lambda = (arg) ->
      try
        type.dress(arg)
      catch e
        e

    context 'with something else than an Array', ->
      subject = lambda("foo")

      it 'should raise a TypeError', ->
        subject.should.be.an.instanceof(TypeError)
        subject.message.should.equal("Invalid value `foo` for colors")

      it 'should have no cause', ->
        should(subject.cause).be.null

      it 'should have an empty location', ->
        subject.location.should.equal('')

    context 'with Array of non-tuples', ->
      subject = lambda(["foo"])

      it 'should raise a TypeError', ->
        subject.should.be.an.instanceof(TypeError)
        subject.message.should.equal("Invalid value `foo` for {r: Byte, g: Byte, b :? Byte}")

      it 'should have no cause', ->
        should(subject.cause).be.null

      it 'should have the correct location', ->
        subject.location.should.equal('0')

    context 'with a wrong tuple', ->
      arg = [
        { "r": 12, "g": 13, "b": 255 },
        { "r": 12, "b": 13 }
      ]
      subject = lambda(arg)

      it 'should raise a TypeError', ->
        subject.should.be.an.instanceof(TypeError)
        subject.message.should.equal("Missing attribute `g`")

      it 'should have no cause', ->
        should(subject.cause).be.null

      it 'should have the correct location', ->
        subject.location.should.equal('1')

    context 'with a tuple with extra attribute', ->
      arg = [
        { "r": 12, "g": 13, "b": 255 },
        { "r": 12, "g": 13, "f": 13 }
      ]

      it 'should raise a TypeError', ->
        lambda(arg).should.be.an.instanceof(TypeError)
        lambda(arg).message.should.equal("Unrecognized attribute `f`")

      it 'should have no cause', ->
        should(lambda(arg).cause).be.null

      it 'should have the correct location', ->
        lambda(arg).location.should.equal('1')

    context 'with a wrong tuple attribute', ->
      arg = [
        { "r": 12, "g": 13, "b": 255  },
        { "r": 12, "g": 13, "b": '12' }
      ]
      subject = lambda(arg)

      it 'should raise a TypeError', ->
        subject.should.be.an.instanceof(TypeError)
        subject.message.should.equal("Invalid value `12` for Byte")

      it 'should have a cause', ->
        should(subject.cause).not.be.null

      it 'should have the correct location', ->
        subject.location.should.equal('1/b')

    context 'with a duplicate tuple', ->
      arg = [
        { "r": 12, "g": 13, "b": 255 },
        { "r": 12, "g": 192, "b": 13 },
        { "r": 12, "g": 13, "b": 255 }
      ]
      subject = lambda(arg)

      it 'should raise a TypeError', ->
        subject.should.be.an.instanceof(TypeError)
        subject.message.should.equal("Duplicate tuple")

      it 'should have no cause', ->
        should(subject.cause).be.null

      it 'should have the correct location', ->
        subject.location.should.equal('2')
