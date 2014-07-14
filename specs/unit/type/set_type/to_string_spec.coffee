AnyType   = require '../../../../src/finitio/type/any_type'
SetType   = require '../../../../src/finitio/type/set_type'
_         = require 'underscore'
should    = require 'should'
{intType} = require '../../../spec_helpers'

describe "SetType#toString", ->

  type = new SetType(new AnyType())

  it 'works', ->
    should(type.toString()).equal('{.}')
