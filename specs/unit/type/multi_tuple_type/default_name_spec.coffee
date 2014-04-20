Attribute        = require '../../../../src/support/attribute'
Heading          = require '../../../../src/support/heading'
MultiTupleType   = require '../../../../src/type/multi_tuple_type'
{TypeError}      = require '../../../../src/errors'
should           = require 'should'
{byteType}       = require '../../../spec_helpers'

describe "MultiTupleType#defaultName", ->

    heading = new Heading([
      new Attribute('a', byteType, true),
      new Attribute('b', byteType, false)
    ])

    subject = new MultiTupleType(heading).defaultName()

    it 'should be the default name', ->
      subject.should.equal "{a: Byte, b :? Byte}"
