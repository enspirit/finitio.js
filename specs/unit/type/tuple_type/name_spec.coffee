Attribute   = require '../../../../src/support/attribute'
Heading     = require '../../../../src/support/heading'
TupleType   = require '../../../../src/type/tuple_type'
{TypeError} = require '../../../../src/errors'
should      = require 'should'
{byteType}  = require '../../../spec_helpers'

describe "TupleType#name", ->

  heading = new Heading([new Attribute('a', byteType)])

  describe 'when not provided', ->
    t = new TupleType(heading)
    t.name.should.equal "{a: Byte}"

  describe 'when provided', ->
    t = new TupleType(heading, "Color")
    t.name.should.equal "Color"
