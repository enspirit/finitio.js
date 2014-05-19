AliasType       = require '../../../../src/finitio/type/alias_type'
should          = require 'should'
{intType}       = require '../../../spec_helpers'

describe "AliasType#name", ->

  it "uses the name", ->
    type = new AliasType(intType, "foo")
    should(type.name).equal("foo")
