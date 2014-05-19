ProxyType = require '../../../../src/finitio/type/proxy_type'
should    = require 'should'
{intType} = require '../../../spec_helpers'

describe "ProxyType#name", ->

  it "uses the name when set", ->
    type = new ProxyType("int", intType, "foo")
    should(type.name).equal("foo")

  it "uses the name", ->
    type = new ProxyType("int", intType)
    should(type.name).equal(intType.name)
