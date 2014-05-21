Contract    = require '../../../../src/finitio/support/contract'
AdType      = require '../../../../src/finitio/type/ad_type'
{TypeError} = require '../../../../src/finitio/errors'
should      = require 'should'
{intType,
stringType} = require '../../../spec_helpers'

describe "AdType#dress", ->

  f = (arg)->

  contracts = [
    new Contract('timestamp', intType,    ((i) -> i*2),   f)
    new Contract('utc',       stringType, ((s) -> "foo"), f)
  ]

  describe 'when not bound to a javascript type', ->
    type = new AdType(null, contracts)

    it 'with a string', ->
      type.dress("bar").should.equal("foo")

  describe 'when bound to a javascript type', ->
    type = new AdType(Date, contracts)

    it 'with a date', ->
      d = new Date()
      type.dress(d).should.equal(d)

    describe 'with an unrecognized', ->
      lambda = -> type.dress([])

      it 'should raise an error', ->
        should(lambda).throw()

        err = try
          lambda()
        catch e
          e

        err.should.be.an.instanceof TypeError
        err.message.should.equal "Invalid value `[]` for Date"

    describe 'when the upper raises an error', ->
      type = new AdType(Date, [
        new Contract('foo', intType, ((t) -> throw new Error), f)
      ])

      it 'should hide the error', ->

        err = try
          type.dress(12)
        catch e
          e

        err.should.be.an.instanceof TypeError
        err.message.should.equal "Invalid value `12` for Date"
