TypeDef       = require '../../../../src/finitio/type/type_def'
should          = require 'should'
{intType}       = require '../../../spec_helpers'

describe "TypeDef#include", ->

  it "delegates to the aliased type", ->
    type = new TypeDef(intType, "foo")
    should(type.include(12)).equal(true)
    should(type.include("12")).equal(false)
