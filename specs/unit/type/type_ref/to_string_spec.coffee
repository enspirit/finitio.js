TypeRef       = require '../../../../src/finitio/type/type_ref'
should          = require 'should'
{intType}       = require '../../../spec_helpers'

describe "TypeRef#toString", ->

  type = new TypeRef("Int")

  it "works", ->
    should(type.toString()).equal("Int")
