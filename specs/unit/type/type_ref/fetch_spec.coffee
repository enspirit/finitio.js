Attribute  = require '../../../../src/finitio/support/attribute'
Heading    = require '../../../../src/finitio/support/heading'
TypeRef  = require '../../../../src/finitio/type/type_ref'
TupleType  = require '../../../../src/finitio/type/tuple_type'
should     = require 'should'
{intType}  = require '../../../spec_helpers'

describe "TypeRef#fetch", ->

  a       = new Attribute('a', intType)
  heading = new Heading([a])
  tuplety = new TupleType(heading)

  it "delegates to the aliased type", ->
    type = new TypeRef("tuple", tuplety)
    should(type.fetch('a')).equal(a)
