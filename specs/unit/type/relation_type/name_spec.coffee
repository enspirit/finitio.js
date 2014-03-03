Attribute     = require '../../../../lib/support/attribute'
Heading       = require '../../../../lib/support/heading'
RelationType  = require '../../../../lib/type/relation_type'

should      = require 'should'

describe "RelationType#name", ->

  heading = new Heading([new Attribute('a', byteType)])
  
  subject = (type) -> type.name

  describe 'when not provided', ->
    type = new RelationType(heading)
    subject(type).should.equal("{{a: Byte}}")

  describe 'when provided', ->
    type = new RelationType(heading, "colors")
    subject(type).should.equal("colors")
