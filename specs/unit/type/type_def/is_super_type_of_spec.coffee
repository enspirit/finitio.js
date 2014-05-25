TypeDef       = require '../../../../src/finitio/type/type_def'
should          = require 'should'
{intType,
 byteType}      = require '../../../spec_helpers'

describe "TypeDef#isSuperTypeOf", ->

  it "works against itself", ->
    type = new TypeDef(intType, 'sup')
    should(type.isSuperTypeOf(type)).equal(true)

  it "works against a real type", ->
    type = new TypeDef(intType, 'sup')
    should(type.isSuperTypeOf(byteType)).equal(true)

  it "works against the other way round too", ->
    type = new TypeDef(byteType, 'sup')
    should(intType.isSuperTypeOf(type)).equal(true)

  it "works against another alias type", ->
    t1 = new TypeDef(intType, 'sup')
    t2 = new TypeDef(byteType, 'sup')
    should(t1.isSuperTypeOf(t2)).equal(true)
