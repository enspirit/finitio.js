ProxyType  = require '../../../../src/finitio/type/proxy_type'
AliasType  = require '../../../../src/finitio/type/alias_type'
should     = require 'should'
{intType,
 byteType} = require '../../../spec_helpers'

describe "ProxyType#isSuperTypeOf", ->

  it "works against itself", ->
    type = new ProxyType('int', intType)
    should(type.isSuperTypeOf(type)).equal(true)

  it "works against a real type", ->
    type = new ProxyType('int', intType)
    should(type.isSuperTypeOf(byteType)).equal(true)

  it "works against the other way round too", ->
    type = new ProxyType('int', byteType)
    should(intType.isSuperTypeOf(type)).equal(true)

  it "works against another proxy type", ->
    t1 = new ProxyType('int',  intType)
    t2 = new ProxyType('byte', byteType)
    should(t1.isSuperTypeOf(t2)).equal(true)

  it "works with an alias type", ->
    t1 = new ProxyType('int',  intType)
    t2 = new AliasType(byteType, 'byte')
    should(t1.isSuperTypeOf(t2)).equal(true)

  it "works against an alias type", ->
    t1 = new AliasType(intType, 'int')
    t2 = new ProxyType('byte', byteType)
    should(t1.isSuperTypeOf(t2)).equal(true)
