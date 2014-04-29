AliasType       = require '../../../../src/type/alias_type'
should          = require 'should'
{intType}       = require '../../../spec_helpers'

describe "AliasType#defaultName", ->

  it "uses the name", ->
    type = new AliasType(intType, "foo")
    should(type.defaultName()).equal("foo")
