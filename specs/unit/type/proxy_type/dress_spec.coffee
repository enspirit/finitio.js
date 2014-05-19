ProxyType       = require '../../../../src/finitio/type/proxy_type'
should          = require 'should'
{intType}       = require '../../../spec_helpers'

describe "ProxyType#dress", ->

  it "when resolved", ->
    type = new ProxyType("Int", intType)
    should(type.dress(12)).equal(12)

  it "when not resolved", ->
    type = new ProxyType("Int")
    should(()-> type.dress(12)).throw()
