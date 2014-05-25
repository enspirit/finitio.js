TypeFactory = require '../../../src/finitio/support/factory'
SeqType     = require '../../../src/finitio/type/seq_type'
should      = require 'should'
{numType}   = require '../../spec_helpers'

describe "TypeFactory#seq", ->

  factory = new TypeFactory

  describe 'for sequences of scalars', ->
    expected = new SeqType(numType)

    describe 'when used with [Class]', ->
      subject = factory.type([Number])

      it 'should give expected result', ->
        subject.equals(expected).should.be.true

  describe 'for pseudo-relations', ->
    subject = factory.type([{r: Number}])

    expected = factory.seq(factory.tuple(r: Number))

    it 'should give expected result', ->
      subject.equals(expected).should.be.true
