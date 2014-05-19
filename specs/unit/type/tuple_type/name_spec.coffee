Attribute        = require '../../../../src/finitio/support/attribute'
Heading          = require '../../../../src/finitio/support/heading'
TupleType        = require '../../../../src/finitio/type/tuple_type'
should           = require 'should'
{byteType}       = require '../../../spec_helpers'

describe "TupleType#name", ->

  heading = new Heading([new Attribute('a', byteType, false)])

  subject = (type) -> type.name

  context 'when not provided', ->
    type = new TupleType(heading)

    it 'should be the default one', ->
      subject(type).should.equal "{a :? Byte}"

  context 'when provided', ->
    type = new TupleType(heading, "Color")

    it 'should be the provided one', ->
      subject(type).should.equal("Color")
