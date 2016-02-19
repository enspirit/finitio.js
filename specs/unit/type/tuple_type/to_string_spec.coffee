AnyType   = require '../../../../src/finitio/type/any_type'
Attribute = require '../../../../src/finitio/support/attribute'
Heading   = require '../../../../src/finitio/support/heading'
TupleType = require '../../../../src/finitio/type/tuple_type'
should    = require 'should'

describe "TupleType#toString", ->

  anyType = new AnyType()
  a       = new Attribute('a', anyType)
  maybe_b = new Attribute('b', anyType, false)

  context 'without extra allowed', ->

    heading = new Heading([a, maybe_b])
    type    = new TupleType(heading)

    it 'works', ->
      should(type.toString()).equal("{ a : ., b :? . }")

  context 'with extra allowed', ->

    heading = new Heading([a, maybe_b], allowExtra: anyType)
    type    = new TupleType(heading)

    it 'works', ->
      should(type.toString()).equal("{ a : ., b :? ., ... }")
