AliasType       = require '../../../../src/type/alias_type'
should          = require 'should'
{intType}       = require '../../../spec_helpers'

describe "AliasType#include", ->

  it "delegates to the aliased type", ->
    type = new AliasType(intType, "foo")
    should(type.include(12)).be.true
    should(type.include("12")).be.false
