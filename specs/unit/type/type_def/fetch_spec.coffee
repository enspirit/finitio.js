Attribute  = require '../../../../src/finitio/support/attribute'
Heading    = require '../../../../src/finitio/support/heading'
TypeDef  = require '../../../../src/finitio/type/type_def'
TupleType  = require '../../../../src/finitio/type/tuple_type'
should     = require 'should'
{intType}  = require '../../../spec_helpers'

describe "TypeDef#fetch", ->

  a       = new Attribute('a', intType)
  heading = new Heading([a])
  tuplety = new TupleType(heading)

  it "delegates to the aliased type", ->
    type = new TypeDef(tuplety, "foo")
    should(type.fetch('a')).equal(a)
