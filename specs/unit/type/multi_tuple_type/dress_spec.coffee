Attribute        = require '../../../../src/support/attribute'
Heading          = require '../../../../src/support/heading'
MultiTupleType   = require '../../../../src/type/multi_tuple_type'
{TypeError}      = require '../../../../src/errors'
should           = require 'should'
_                = require 'underscore'
{byteType}       = require '../../../spec_helpers'

describe "MultiTupleType#dress", ->

  r       = new Attribute('r', byteType)
  g       = new Attribute('g', byteType)
  maybe_b = new Attribute('b', byteType, false)

  context 'when not allowing extra', ->

    heading = new Heading([r, g, maybe_b])
    type    = new MultiTupleType(heading, "color")

    dress = (arg) ->
      type.dress(arg)

    context 'with a valid Hash', ->
      arg = { "r": 12, "g": 13, "b": 255 }

      it 'should coerce to a tuple', ->
        dress(arg).should.eql(r: 12, g: 13, b: 255)

    context 'with a valid Hash and no optional', ->
      arg = { "r": 12, "g": 13 }

      it 'should coerce to a tuple', ->
        dress(arg).should.eql(r: 12, g: 13)

    context 'when raising an error', ->

      lambda = (arg) ->
        try
          type.dress(arg)
        catch e
          e

      context 'with something else than a Hash', ->
        subject = lambda("foo")

        it 'should raise a TypeError', ->
          subject.should.be.an.instanceof(TypeError)
          subject.message.should.equal("Invalid value `foo` for color")

        it 'should have no cause', ->
          should(subject.cause).be.null

        it 'should have an empty location', ->
          subject.location.should.equal('')

      context 'with a missing attribute', ->
        arg = { "r": 12, "b": 13 }
        subject = lambda(arg)

        it 'should raise a TypeError', ->
          subject.should.be.an.instanceof(TypeError)
          subject.message.should.equal("Missing attribute `g`")

        it 'should have no cause', ->
          should(subject.cause).be.null

        it 'should have an empty location', ->
          subject.location.should.equal('')

      context 'with an extra attribute', ->
        arg = { "r": 12, "g": 13, "extr": 165 }
        subject = lambda(arg)

        it 'should raise a TypeError', ->
          subject.should.be.an.instanceof(TypeError)
          subject.message.should.eql("Unrecognized attribute `extr`")

        it 'should have no cause', ->
          should(subject.cause).be.null

        it 'should have an empty location', ->
          subject.location.should.equal('')

      context 'with an invalid attribute', ->
        arg = { "r": 12, "g": 13, "b": '255' }
        subject = lambda(arg)

        it 'should raise a TypeError', ->
          subject.should.be.an.instanceof(TypeError)
          subject.message.should.equal("Invalid value `255` for Byte")

        it 'should have the correct cause', ->
          subject.cause.should.be.an.instanceof(TypeError)
          subject.cause.message.should.equal("Invalid value `255` for intType")

        it 'should have the correct location', ->
          subject.location.should.equal("b")

  context 'when not allowing extra', ->
    heading = new Heading([r, g, maybe_b], allowExtra: true)
    type    = new MultiTupleType(heading, "color")

    subject = (arg) -> type.dress(arg)

    context 'with an extra attribute', ->
      arg = { "r": 12, "g": 13, "extr": 165 }

      it 'should not raise a TypeError', ->
        subject(arg).should.not.be.an.instanceof(TypeError)

      it 'should return a coerced/projection', ->
        subject(arg).should.eql({r: 12, g: 13})
