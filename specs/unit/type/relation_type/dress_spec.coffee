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
      should(dress(arg)).be.an.instanceof(Array)
      should(dress(arg)).eql(expected)

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
      should(dress(arg)).be.an.instanceof(Array)
      should(dress(arg)).eql(expected)

  context 'with an empty array', ->
    arg = []
    expected = []

    it 'should coerce to an Array of tuples', ->
      should(dress(arg)).be.an.instanceof(Array)
      should(dress(arg)).eql(expected)

  context 'when raising an error', ->

    lambda = (arg) ->
      try
        type.dress(arg)
      catch e
        e

    context 'with something else than an Array', ->
      subject = lambda("foo")

      it 'should raise a TypeError', ->
        should(subject).be.an.instanceof(TypeError)
        should(subject.message).eql("Array expected, got: `foo`")

    context 'with Array of non-tuples', ->
      subject = lambda(["foo"])

      it 'should raise a TypeError', ->
        should(subject).be.an.instanceof(TypeError)
        should(subject.message).equal("Invalid Relation")

      it 'has expected root cause', ->
        rc = subject.getRootCause()
        should(rc.message).equal("Invalid Tuple: `foo`")

    context 'with a duplicate tuple', ->
      arg = [
        { "r": 12, "g": 13, "b": 255 },
        { "r": 12, "g": 192, "b": 13 },
        { "r": 12, "g": 13, "b": 255 }
      ]
      subject = lambda(arg)

      it 'should raise a TypeError', ->
        should(subject).be.an.instanceof(TypeError)

      it 'should have the expected root cause', ->
        rc = subject.getRootCause()
        should(rc.message).eql('Duplicate Tuple: `{"r":12,"g":13,"b":255}`')
