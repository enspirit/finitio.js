TypeRef = require '../../../../src/finitio/type/type_ref'
_         = require 'underscore'
should    = require 'should'
{intType} = require '../../../spec_helpers'

describe "TypeRef#initialize", ->

  it 'creates a valid type', ->
    t = new TypeRef("int")
    should(t).be.an.instanceOf(TypeRef)

  it 'supports setting the target', ->
    t = new TypeRef("int", null, intType)
    should(t.target).equal(intType)

  it 'raises without the proxied name', ->
    l = ()-> new TypeRef(null)
    should(l).throw()
