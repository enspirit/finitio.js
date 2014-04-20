Attribute        = require '../../../../src/support/attribute'
Heading          = require '../../../../src/support/heading'
MultiTupleType   = require '../../../../src/type/multi_tuple_type'
{TypeError}      = require '../../../../src/errors'
should           = require 'should'
{byteType}       = require '../../../spec_helpers'

describe "MultiTupleType#name", ->

  heading = new Heading([new Attribute('a', byteType, false)])

  subject = (type) -> type.name

  context 'when not provided', ->
    type = new MultiTupleType(heading)

    it 'should be the default one', ->
      subject(type).should.equal "{a :? Byte}"

  context 'when provided', ->
    type = new MultiTupleType(heading, "Color")

    it 'should be the provided one', ->
      subject(type).should.equal("Color")
