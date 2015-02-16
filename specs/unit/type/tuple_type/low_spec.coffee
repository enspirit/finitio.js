Type = require '../../../../src/finitio/type'
BuiltinType = require '../../../../src/finitio/type/builtin_type'
AnyType   = require '../../../../src/finitio/type/any_type'
Attribute = require '../../../../src/finitio/support/attribute'
Heading   = require '../../../../src/finitio/support/heading'
TupleType = require '../../../../src/finitio/type/tuple_type'
should    = require 'should'

describe "TupleType#toString", ->

  builtinString = new BuiltinType(String)

  class HighType extends Type
    low: ()->
      builtinString

  a = new Attribute('a', new HighType())
  a_low = new Attribute('a', builtinString)

  maybe_b = new Attribute('b', new HighType(), false)
  maybe_b_low = new Attribute('b', builtinString, false)

  context 'without extra allowed', ->

    heading = new Heading([a, maybe_b])
    heading_low = new Heading([a_low, maybe_b_low])

    type = new TupleType(heading)
    type_low = new TupleType(heading_low)

    it 'works', ->
      should(type.low()).eql(type_low)

  context 'with extra allowed', ->

    heading = new Heading([a, maybe_b], allowExtra: true)
    heading_low = new Heading([a_low, maybe_b_low], allowExtra: true)

    type = new TupleType(heading)
    type_low = new TupleType(heading_low)

    it 'works', ->
      should(type.low()).eql(type_low)
