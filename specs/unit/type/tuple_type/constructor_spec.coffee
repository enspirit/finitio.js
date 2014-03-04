Attribute   = require '../../../../lib/support/attribute'
Heading     = require '../../../../lib/support/heading'
TupleType   = require '../../../../lib/type/tuple_type'

{ArgumentError,
TypeError}  = require '../../../../lib/errors'

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
