TypeDef   = require '../../../../src/finitio/type/type_def'
should    = require 'should'
{intType} = require '../../../spec_helpers'

describe "TypeDef#toString", ->

  type = new TypeDef(intType, "foo")

  it "works", ->
    should(type.toString()).equal("foo")
