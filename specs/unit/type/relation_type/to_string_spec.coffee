AnyType       = require '../../../../src/finitio/type/any_type'
Attribute     = require '../../../../src/finitio/support/attribute'
Heading       = require '../../../../src/finitio/support/heading'
RelationType  = require '../../../../src/finitio/type/relation_type'
should        = require 'should'

describe "RelationType#toString", ->

  heading = new Heading([
    new Attribute('a', new AnyType),
  ])

  type = new RelationType(heading)

  it 'works', ->
    should(type.toString()).equal("{{ a : . }}")