TypeRef = require '../../../../src/finitio/type/type_ref'
should    = require 'should'
{intType} = require '../../../spec_helpers'

describe "TypeRef#undress", ->

  it "delegates to the aliased type", ->
    type = new TypeRef("int", null, intType)
    should(type.undress(12, intType)).equal(12)

  it "works even with itself", ->
    type = new TypeRef("int", null, intType)
    should(type.undress(12, type)).equal(12)

  it "works even an equivalent proxy", ->
    t1 = new TypeRef("int", null, intType)
    t2 = new TypeRef("int", null, intType)
    should(t1.undress(12, t2)).equal(12)
