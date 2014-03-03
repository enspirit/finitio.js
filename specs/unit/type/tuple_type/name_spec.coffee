Attribute   = require '../../../../lib/support/attribute'
Heading     = require '../../../../lib/support/heading'
TupleType   = require '../../../../lib/type/tuple_type'
{TypeError} = require '../../../../lib/errors'
should      = require 'should'

describe "TupleType#name", ->

  heading = new Heading([new Attribute('a', byteType)])
  
  describe 'when not provided', ->
    t = new TupleType(heading)
    t.name.should.equal "{a: Byte}"
  
  describe 'when provided', ->
    t = new TupleType(heading, "Color")
    t.name.should.equal "Color"
