ProxyType  = require '../../../../src/finitio/type/proxy_type'
should     = require 'should'
{intType,
 byteType} = require '../../../spec_helpers'

describe "ProxyType#isSuperTypeOf", ->

  it "works against a real type", ->
    type = new ProxyType('int', intType)
    should(type.isSuperTypeOf(byteType)).be.true

  it "works against the other way round too", ->
    type = new ProxyType('int', byteType)
    should(intType.isSuperTypeOf(type)).be.true

  it "works against another alias type", ->
    t1 = new ProxyType('int',  intType)
    t2 = new ProxyType('byte', byteType)
    should(t1.isSuperTypeOf(t2)).be.true
