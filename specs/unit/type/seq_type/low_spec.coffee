Type = require '../../../../src/finitio/type'
BuiltinType = require '../../../../src/finitio/type/builtin_type'
AnyType   = require '../../../../src/finitio/type/any_type'
SeqType   = require '../../../../src/finitio/type/seq_type'
_         = require 'underscore'
should    = require 'should'
{intType} = require '../../../spec_helpers'

describe "SeqType#low", ->

  builtinString = new BuiltinType(String)

  class HighType extends Type
    low: ()->
      builtinString

  type = new SeqType(new HighType())

  it 'works', ->
    expected = new SeqType(builtinString)
    should(type.low()).eql(expected)
