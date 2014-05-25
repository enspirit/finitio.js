TypeRef       = require '../../../../src/finitio/type/type_ref'
should          = require 'should'
{intType}       = require '../../../spec_helpers'

describe "TypeRef#equals", ->

  it "works with the aliased type itself", ->
    type = new TypeRef("int", null, intType)
    should(type.equals(intType)).be.true

  it "works with another alias type", ->
    t1 = new TypeRef("int", null, intType)
    t2 = new TypeRef("int", null, intType)
    should(t1.equals(t2)).be.true

  it "works the other way round", ->
    t = new TypeRef("int", null, intType)
    should(intType.equals(t)).be.true
