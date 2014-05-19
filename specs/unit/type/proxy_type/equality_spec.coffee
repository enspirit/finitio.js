ProxyType       = require '../../../../src/finitio/type/proxy_type'
should          = require 'should'
{intType}       = require '../../../spec_helpers'

describe "ProxyType#equals", ->

  it "works with the aliased type itself", ->
    type = new ProxyType("int", intType)
    should(type.equals(intType)).be.true

  it "works with another alias type", ->
    t1 = new ProxyType("int", intType)
    t2 = new ProxyType("int", intType)
    should(t1.equals(t2)).be.true

  it "works the other way round", ->
    t = new ProxyType("int", intType)
    should(intType.equals(t)).be.true
