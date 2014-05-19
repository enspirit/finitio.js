Attribute          = require '../../../../src/finitio/support/attribute'
Heading            = require '../../../../src/finitio/support/heading'
RelationType       = require '../../../../src/finitio/type/relation_type'
{byteType}         = require '../../../spec_helpers'

should             = require 'should'

describe 'RelationType#defaultName', ->

  heading = new Heading([
      new Attribute('a', byteType),
      new Attribute('b', byteType, false)
    ])

  type = new RelationType(heading)

  subject = type.defaultName()

  it 'should be correct', ->
    subject.should.equal("{{a: Byte, b :? Byte}}")
