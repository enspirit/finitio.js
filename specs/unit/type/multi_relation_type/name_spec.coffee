Attribute     = require '../../../../src/support/attribute'
Heading       = require '../../../../src/support/heading'
RelationType  = require '../../../../src/type/relation_type'
{byteType}    = require '../../../spec_helpers'
should        = require 'should'

describe "RelationType#name", ->

  heading = new Heading([
    new Attribute('a', byteType),
    new Attribute('b', byteType, false)
  ])

  subject = (type) -> type.name

  context 'when not provided', ->
    type = new MultiRelationType(heading)

    it 'should be the default one', ->
      subject(type).should.equal('{{a: Byte, b :? Byte}}')

  context 'when provided', ->
    type = new MultiRelationType(heading, "colors")

    it 'should be the one provided', ->
      subject(type).should.equal('colors')
