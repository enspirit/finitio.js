TypeRef  = require '../../../../src/finitio/type/type_ref'
TypeDef  = require '../../../../src/finitio/type/type_def'
should     = require 'should'
{intType,
 byteType} = require '../../../spec_helpers'

describe "TypeRef#isSuperTypeOf", ->

  it "works against itself", ->
    type = new TypeRef('int', null, intType)
    should(type.isSuperTypeOf(type)).equal(true)

  it "works against a real type", ->
    type = new TypeRef('int', null, intType)
    should(type.isSuperTypeOf(byteType)).equal(true)

  it "works against the other way round too", ->
    type = new TypeRef('int', null, byteType)
    should(intType.isSuperTypeOf(type)).equal(true)

  it "works against another proxy type", ->
    t1 = new TypeRef('int',  null, intType)
    t2 = new TypeRef('byte', null, byteType)
    should(t1.isSuperTypeOf(t2)).equal(true)

  it "works with an alias type", ->
    t1 = new TypeRef('int',  null, intType)
    t2 = new TypeDef(byteType, 'byte')
    should(t1.isSuperTypeOf(t2)).equal(true)

  it "works against an alias type", ->
    t1 = new TypeDef(intType, 'int')
    t2 = new TypeRef('byte', null, byteType)
    should(t1.isSuperTypeOf(t2)).equal(true)
