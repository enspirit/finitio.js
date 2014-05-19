Attribute = require '../../../../src/support/attribute'
Heading   = require '../../../../src/support/heading'
TupleType = require '../../../../src/type/tuple_type'
{intType} = require '../../../spec_helpers'
should    = require 'should'

describe "TupleType#constructor", ->

  heading = new Heading([new Attribute('a', intType)])

  context 'with a valid heading', ->
    subject = new TupleType(heading)

    it 'should be a TupleType', ->
      subject.should.be.an.instanceof(TupleType)

    it 'correctly sets the instance variable', ->
      subject.heading.should.equal(heading)

  context 'with an invalid heading', ->
    subject = try
      new TupleType("foo")
    catch e
      e

    it 'should raise an error', ->
      subject.message.should.equal "Heading expected, got: foo"
