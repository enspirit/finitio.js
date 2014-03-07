Attribute     = require '../../../../lib/support/attribute'
Heading       = require '../../../../lib/support/heading'
RelationType  = require '../../../../lib/type/relation_type'
{byteType}    = require '../../../spec_helpers'

should      = require 'should'

describe "RelationType#default_name", ->

  heading = new Heading([new Attribute('a', byteType)])

  type = new RelationType(heading)

  subject = type.defaultName()

  subject.should.equal("{{a: Byte}}")
