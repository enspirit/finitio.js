Type = require '../../../../src/finitio/type'
BuiltinType = require '../../../../src/finitio/type/builtin_type'
AnyType   = require '../../../../src/finitio/type/any_type'
SetType   = require '../../../../src/finitio/type/set_type'
_         = require 'underscore'
should    = require 'should'
{intType} = require '../../../spec_helpers'

describe "SetType#low", ->

  builtinString = new BuiltinType(String)

  class HighType extends Type
    low: ()->
      builtinString

  type = new SetType(new HighType())

  it 'works', ->
    expected = new SetType(builtinString)
    should(type.low()).eql(expected)
