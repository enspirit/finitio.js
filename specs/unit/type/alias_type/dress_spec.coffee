AliasType       = require '../../../../src/type/alias_type'
should          = require 'should'
{intType}       = require '../../../spec_helpers'

describe "AliasType#dress", ->

  it "delegates to the aliased type", ->
    type = new AliasType(intType, "foo")
    should(type.dress(12)).equal(12)
