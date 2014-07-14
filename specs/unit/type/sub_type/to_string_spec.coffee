AnyType    = require '../../../../src/finitio/type/any_type'
Constraint = require '../../../../src/finitio/support/constraint'
SubType    = require '../../../../src/finitio/type/sub_type'
should     = require 'should'
{intType}  = require '../../../spec_helpers'

describe "SubType#toString", ->

  type = new SubType(new AnyType(), [
    new Constraint.Native('default', (i) -> i>0),
    new Constraint.Native('small', (i) -> i<255)
  ])

  it 'works', ->
    should(type.toString()).equal(".( x | ... )")
