Attribute     = require '../../../../src/support/attribute'
Heading       = require '../../../../src/support/heading'
RelationType  = require '../../../../src/type/relation_type'
{byteType}    = require '../../../spec_helpers'

should      = require 'should'

describe "RelationType#default_name", ->

  heading = new Heading([new Attribute('a', byteType)])

  type = new RelationType(heading)

  subject = type.defaultName()

  subject.should.equal("{{a: Byte}}")
