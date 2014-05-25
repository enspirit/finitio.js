Attribute        = require '../../../../src/finitio/support/attribute'
Heading          = require '../../../../src/finitio/support/heading'
TupleType        = require '../../../../src/finitio/type/tuple_type'
{TypeError}      = require '../../../../src/finitio/errors'
should           = require 'should'
_                = require 'underscore'
{byteType}       = require '../../../spec_helpers'

describe "TupleType#dress", ->

  r       = new Attribute('r', byteType)
  g       = new Attribute('g', byteType)
  maybe_b = new Attribute('b', byteType, false)

  context 'when not allowing extra', ->

    heading = new Heading([r, g, maybe_b])
    type    = new TupleType(heading, "color")

    dress = (arg) ->
      type.dress(arg)

    context 'with a valid Hash', ->
      arg = { "r": 12, "g": 13, "b": 255 }

      it 'should coerce to a tuple', ->
        should(dress(arg)).eql(r: 12, g: 13, b: 255)

    context 'with a valid Hash and no optional', ->
      arg = { "r": 12, "g": 13 }

      it 'should coerce to a tuple', ->
        should(dress(arg)).eql(r: 12, g: 13)

    context 'when raising an error', ->

      lambda = (arg) ->
        try
          type.dress(arg)
        catch e
          e

      context 'with something else than a Hash', ->
        subject = lambda("foo")

        it 'should raise a TypeError', ->
          should(subject).be.an.instanceof(TypeError)
          should(subject.message).equal("Invalid Tuple: `foo`")

      context 'with a missing attribute', ->
        arg = { "r": 12, "b": 13 }
        subject = lambda(arg)

        it 'should raise a TypeError', ->
          should(subject).be.an.instanceof(TypeError)
          should(subject.message).equal('Invalid Tuple')

        it 'should have expected root cause', ->
          should(subject.rootCause.message).equal("Missing attribute `g`")

      context 'with an extra attribute', ->
        arg = { "r": 12, "g": 13, "extr": 165 }
        subject = lambda(arg)

        it 'should raise a TypeError', ->
          should(subject).be.an.instanceof(TypeError)
          should(subject.message).eql('Invalid Tuple')

        it 'should have expected root cause', ->
          should(subject.rootCause.message).equal("Unrecognized attribute `extr`")

      context 'with an invalid attribute', ->
        arg = { "r": 12, "g": 13, "b": '255' }
        subject = lambda(arg)

        it 'should raise a TypeError', ->
          should(subject.rootCause.message).equal("Invalid Number: `255`")

  context 'when not allowing extra', ->
    heading = new Heading([r, g, maybe_b], allowExtra: true)
    type    = new TupleType(heading, "color")

    subject = (arg) -> type.dress(arg)

    context 'with an extra attribute', ->
      arg = { "r": 12, "g": 13, "extr": 165 }

      it 'should not raise a TypeError', ->
        should(subject(arg)).not.be.an.instanceof(TypeError)

      it 'should keep the attribute unchanged', ->
        subject(arg).should.eql({r: 12, g: 13, "extr": 165})
