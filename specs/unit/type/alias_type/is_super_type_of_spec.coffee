AliasType       = require '../../../../src/finitio/type/alias_type'
should          = require 'should'
{intType,
 byteType}      = require '../../../spec_helpers'

describe "AliasType#isSuperTypeOf", ->

  it "works against a real type", ->
    type = new AliasType(intType, 'sup')
    should(type.isSuperTypeOf(byteType)).be.true

  it "works against the other way round too", ->
    type = new AliasType(byteType, 'sup')
    should(intType.isSuperTypeOf(type)).be.true

  it "works against another alias type", ->
    t1 = new AliasType(intType, 'sup')
    t2 = new AliasType(byteType, 'sup')
    should(t1.isSuperTypeOf(t2)).be.true
