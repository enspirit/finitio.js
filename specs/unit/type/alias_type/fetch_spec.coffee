Attribute  = require '../../../../src/finitio/support/attribute'
Heading    = require '../../../../src/finitio/support/heading'
AliasType  = require '../../../../src/finitio/type/alias_type'
TupleType  = require '../../../../src/finitio/type/tuple_type'
should     = require 'should'
{intType}  = require '../../../spec_helpers'

describe "AliasType#fetch", ->

  a       = new Attribute('a', intType)
  heading = new Heading([a])
  tuplety = new TupleType(heading)

  it "delegates to the aliased type", ->
    type = new AliasType(tuplety, "foo")
    should(type.fetch('a')).equal(a)
