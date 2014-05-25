TypeRef       = require '../../../../src/finitio/type/type_ref'
should          = require 'should'
{intType}       = require '../../../spec_helpers'

describe "TypeRef#include", ->

  it "when resolved", ->
    type = new TypeRef("Int", null, intType)
    should(type.include(12)).equal(true)
    should(type.include("foo")).equal(false)

  it "when not resolved", ->
    type = new TypeRef("Int")
    should(()-> type.include(12)).throw()
