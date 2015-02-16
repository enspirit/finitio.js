Type = require '../../../../src/finitio/type'
BuiltinType = require '../../../../src/finitio/type/builtin_type'
AnyType    = require '../../../../src/finitio/type/any_type'
Constraint = require '../../../../src/finitio/support/constraint'
SubType    = require '../../../../src/finitio/type/sub_type'
should     = require 'should'
{intType}  = require '../../../spec_helpers'

describe "SubType#low", ->

  builtinString = new BuiltinType(String)

  class HighType extends Type
    low: ()->
      builtinString

  type = new SubType(new HighType(), [
    new Constraint.Native('default', (i) -> i>0),
    new Constraint.Native('small', (i) -> i<255)
  ])

  it 'works', ->
    should(type.low()).eql(builtinString)
