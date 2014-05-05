AliasType       = require '../../../../src/type/alias_type'
should          = require 'should'
{intType}       = require '../../../spec_helpers'

describe "AliasType#undress", ->

  it "delegates to the aliased type", ->
    type = new AliasType(intType, "foo")
    should(type.undress(12, intType)).equal(12)

  it "works even with itself", ->
    type = new AliasType(intType, "foo")
    should(type.undress(12, type)).equal(12)

  it "works even an equivalent alias", ->
    t1 = new AliasType(intType, "foo")
    t2 = new AliasType(intType, "bar")
    should(t1.undress(12, t2)).equal(12)
