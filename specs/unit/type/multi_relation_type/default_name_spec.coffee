Attribute          = require '../../../../src/support/attribute'
Heading            = require '../../../../src/support/heading'
MultiRelationType  = require '../../../../src/type/multi_relation_type'
{byteType}         = require '../../../spec_helpers'

describe 'MultiRelationType#defaultName', ->

  heading = new Heading([
      new Attribute('a', byteType),
      new Attribute('b', byteType, false)
    ])

  type = new MultiRelationType(heading)

  subject = type.defaultName

  it 'should be correct', ->
    subject.should.equal("{{a: Byte, b :? Byte}}")
