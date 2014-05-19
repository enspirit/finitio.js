ProxyType = require '../../../../src/finitio/type/proxy_type'
should    = require 'should'
{intType} = require '../../../spec_helpers'

describe "ProxyType#undress", ->

  it "delegates to the aliased type", ->
    type = new ProxyType("int", intType)
    should(type.undress(12, intType)).equal(12)

  it "works even with itself", ->
    type = new ProxyType("int", intType)
    should(type.undress(12, type)).equal(12)

  it "works even an equivalent proxy", ->
    t1 = new ProxyType("int", intType)
    t2 = new ProxyType("int", intType)
    should(t1.undress(12, t2)).equal(12)
