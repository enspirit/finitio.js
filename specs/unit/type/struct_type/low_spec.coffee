Type = require '../../../../src/finitio/type'
BuiltinType = require '../../../../src/finitio/type/builtin_type'
AnyType    = require '../../../../src/finitio/type/any_type'
StructType = require '../../../../src/finitio/type/struct_type'
_          = require 'underscore'
should     = require 'should'
{intType,
floatType} = require '../../../spec_helpers'

describe "StructType#low", ->

  builtinString = new BuiltinType(String)

  class HighType extends Type
    low: ()->
      builtinString

  type = new StructType([new HighType(), new HighType()])

  it 'works', ->
    expected = new StructType([builtinString, builtinString])
    should(type.low()).eql(expected)
