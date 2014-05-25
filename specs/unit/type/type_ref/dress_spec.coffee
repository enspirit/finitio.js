TypeRef       = require '../../../../src/finitio/type/type_ref'
should          = require 'should'
{intType}       = require '../../../spec_helpers'

describe "TypeRef#dress", ->

  it "when resolved", ->
    type = new TypeRef("Int", null, intType)
    should(type.dress(12)).equal(12)

  it "when not resolved", ->
    type = new TypeRef("Int")
    should(()-> type.dress(12)).throw()
