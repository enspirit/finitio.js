Attribute  = require '../../../../src/finitio/support/attribute'
Heading    = require '../../../../src/finitio/support/heading'
ProxyType  = require '../../../../src/finitio/type/proxy_type'
TupleType  = require '../../../../src/finitio/type/tuple_type'
should     = require 'should'
{intType}  = require '../../../spec_helpers'

describe "ProxyType#fetch", ->

  a       = new Attribute('a', intType)
  heading = new Heading([a])
  tuplety = new TupleType(heading)

  it "delegates to the aliased type", ->
    type = new ProxyType("tuple", tuplety)
    should(type.fetch('a')).equal(a)
