AdType         = require '../../../../lib/type/ad_type'
{TypeError,
ArgumentError} = require '../../../../lib/errors'
should         = require 'should'

describe "AdType#dress", ->

  contracts = {
    timestamp:  [intType,    ((i) -> i*2),   (d)-> null ]
    utc_string: [stringType, ((s) -> "foo"), (d)-> null ]
  }

  describe 'when not bound to a javascript type', ->
    type = new AdType(null, contracts)

    subject = (arg) -> type.dress(arg)

    describe 'with a string', ->
      subject("bar").should.equal("foo")

  describe 'when bound to a javascript type', ->
    type = new AdType(Date, contracts)

    subject = (arg) -> type.dress(arg)

    describe 'with a date', ->
      d = new Date()
      subject(d).should.equal(d)

    describe 'with an integer', ->
      subject(12).should.equal(24)

    describe 'with a string', ->
      subject("bar").should.equal("foo")

    describe 'with an unrecognized', ->
      lambda = -> subject []

      it 'should raise an error', ->
        expect(lambda).toThrow()

        err = try
          lambda()
        catch e
          e

        err.should.be.an.instanceof TypeError
        err.message.should.equal "Invalid value `[]` for Date"

    describe 'when the upper raises an error', ->
      type = new AdType(Date,
        timestamp: [intType, ((t) -> throw new ArgumentError), ((d)-> null)])

      it 'should hide the error', ->

        err = try
          type.dress(12)
        catch e
          e

        err.should.be.an.instanceof TypeError
        err.message.should.equal "Invalid value `12` for Date"
