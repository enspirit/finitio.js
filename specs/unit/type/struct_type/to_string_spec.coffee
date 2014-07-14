AnyType    = require '../../../../src/finitio/type/any_type'
StructType = require '../../../../src/finitio/type/struct_type'
_          = require 'underscore'
should     = require 'should'
{intType,
floatType} = require '../../../spec_helpers'

describe "StructType#include", ->

  type = new StructType([new AnyType(), new AnyType()])

  it 'works', ->
    should(type.toString()).equal("<.,.>")
