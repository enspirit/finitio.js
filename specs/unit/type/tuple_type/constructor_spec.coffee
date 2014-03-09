Attribute   = require '../../../../src/support/attribute'
Heading     = require '../../../../src/support/heading'
TupleType   = require '../../../../src/type/tuple_type'
{intType}   = require '../../../spec_helpers'
{ArgumentError,
TypeError}  = require '../../../../src/errors'

should      = require 'should'

describe "TupleType#constructor", ->

  heading = new Heading([new Attribute('a', intType)])

  describe 'with a valid heading', ->
    subject = new TupleType(heading)

    subject.should.be.an.instanceof(TupleType)

    it 'correctly sets the instance variable', ->
      subject.heading.equals(heading).should.be.true

  describe 'with an invalid heading', ->
    subject = try
      new TupleType("foo")
    catch e
      e

    it 'should raise an error', ->
      subject.should.be.an.instanceof ArgumentError
      subject.message.should.equal "Heading expected, got String"
