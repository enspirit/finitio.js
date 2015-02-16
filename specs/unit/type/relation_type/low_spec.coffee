Type = require '../../../../src/finitio/type'
BuiltinType = require '../../../../src/finitio/type/builtin_type'
AnyType       = require '../../../../src/finitio/type/any_type'
Attribute     = require '../../../../src/finitio/support/attribute'
Heading       = require '../../../../src/finitio/support/heading'
RelationType  = require '../../../../src/finitio/type/relation_type'
should        = require 'should'

describe "RelationType#toString", ->

  builtinString = new BuiltinType(String)

  class HighType extends Type
    low: ()->
      builtinString

  a = new Attribute('a', new HighType())
  a_low = new Attribute('a', builtinString)

  heading = new Heading([a])
  heading_low = new Heading([a_low])

  type = new RelationType(heading)
  type_low = new RelationType(heading_low)

  it 'works', ->
    should(type.low()).eql(type_low)