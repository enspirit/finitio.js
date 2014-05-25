TypeDef       = require '../../../../src/finitio/type/type_def'
should          = require 'should'
{intType}       = require '../../../spec_helpers'

describe "TypeDef#undress", ->

  it "delegates to the aliased type", ->
    type = new TypeDef(intType, "foo")
    should(type.undress(12, intType)).equal(12)

  it "works even with itself", ->
    type = new TypeDef(intType, "foo")
    should(type.undress(12, type)).equal(12)

  it "works even an equivalent alias", ->
    t1 = new TypeDef(intType, "foo")
    t2 = new TypeDef(intType, "bar")
    should(t1.undress(12, t2)).equal(12)
