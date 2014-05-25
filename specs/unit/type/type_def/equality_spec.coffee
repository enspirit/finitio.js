TypeDef       = require '../../../../src/finitio/type/type_def'
should          = require 'should'
{intType}       = require '../../../spec_helpers'

describe "TypeDef#equals", ->

  it "works with the aliased type itself", ->
    type = new TypeDef(intType, "foo")
    should(type.equals(intType)).be.true

  it "works with another alias type", ->
    t1 = new TypeDef(intType, "foo")
    t2 = new TypeDef(intType, "bar")
    should(t1.equals(t2)).be.true

  it "works the other way round", ->
    t = new TypeDef(intType, "foo")
    should(intType.equals(t)).be.true
