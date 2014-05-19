AliasType = require '../../../../src/type/alias_type'
_         = require 'underscore'
should    = require 'should'
{intType} = require '../../../spec_helpers'

describe "AliasType#initialize", ->

  it 'creates a valid type', ->
    t = new AliasType(intType, "Foo")
    should(t).be.an.instanceOf(AliasType)

  it 'raises without name', ->
    l = ()-> new AliasType(intType)
    should(l).throw()
