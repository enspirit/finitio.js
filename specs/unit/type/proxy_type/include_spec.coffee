ProxyType       = require '../../../../src/finitio/type/proxy_type'
should          = require 'should'
{intType}       = require '../../../spec_helpers'

describe "ProxyType#include", ->

  it "when resolved", ->
    type = new ProxyType("Int", intType)
    should(type.include(12)).equal(true)
    should(type.include("foo")).equal(false)

  it "when not resolved", ->
    type = new ProxyType("Int")
    should(()-> type.include(12)).throw()
