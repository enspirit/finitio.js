Attribute     = require '../../../../src/support/attribute'
Heading       = require '../../../../src/support/heading'
RelationType  = require '../../../../src/type/relation_type'
{byteType}    = require '../../../spec_helpers'
should        = require 'should'

describe "RelationType#name", ->

  heading = new Heading([new Attribute('a', byteType)])

  subject = (type) -> type.name

  describe 'when not provided', ->
    type = new RelationType(heading)
    subject(type).should.equal("{{a: Byte}}")

  describe 'when provided', ->
    type = new RelationType(heading, "colors")
    subject(type).should.equal("colors")
