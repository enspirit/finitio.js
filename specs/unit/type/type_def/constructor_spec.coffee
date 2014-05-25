TypeDef = require '../../../../src/finitio/type/type_def'
_         = require 'underscore'
should    = require 'should'
{intType} = require '../../../spec_helpers'

describe "TypeDef#initialize", ->

  it 'creates a valid type', ->
    t = new TypeDef(intType, "Foo")
    should(t).be.an.instanceOf(TypeDef)

  it 'raises without name', ->
    l = ()-> new TypeDef(intType)
    should(l).throw()
