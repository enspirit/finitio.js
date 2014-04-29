AliasType       = require '../../../../src/type/alias_type'
should          = require 'should'
{intType}       = require '../../../spec_helpers'

describe "AliasType#equals", ->

  it "works with the aliased type itself", ->
    type = new AliasType(intType, "foo")
    should(type.equals(intType)).be.true

  it "works with another alias type", ->
    t1 = new AliasType(intType, "foo")
    t2 = new AliasType(intType, "bar")
    should(t1.equals(t2)).be.true

  it "works the other way round", ->
    t = new AliasType(intType, "foo")
    should(intType.equals(t)).be.true
