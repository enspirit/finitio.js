Attribute        = require '../../../../src/support/attribute'
Heading          = require '../../../../src/support/heading'
MultiTupleType   = require '../../../../src/type/multi_tuple_type'
{intType}        = require '../../../spec_helpers'
{ArgumentError,
TypeError}       = require '../../../../src/errors'

should           = require 'should'

describe "MultiTupleType#constructor", ->

  heading = new Heading([new Attribute('a', intType)])

  context 'with a valid heading', ->
    subject = new MultiTupleType(heading)

    it 'should be a MultiTupleType', ->
      subject.should.be.an.instanceof(MultiTupleType)

    it 'correctly sets the instance variable', ->
      subject.heading.should.equal(heading)

  context 'with an invalid heading', ->
    subject = try
      new MultiTupleType("foo")
    catch e
      e

    it 'should raise an error', ->
      subject.should.be.an.instanceof ArgumentError
      subject.message.should.equal "Heading expected, got String"
