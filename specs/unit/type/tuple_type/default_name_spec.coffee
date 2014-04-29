Attribute        = require '../../../../src/support/attribute'
Heading          = require '../../../../src/support/heading'
TupleType        = require '../../../../src/type/tuple_type'
{TypeError}      = require '../../../../src/errors'
should           = require 'should'
{byteType}       = require '../../../spec_helpers'

describe "TupleType#defaultName", ->

    heading = new Heading([
      new Attribute('a', byteType, true),
      new Attribute('b', byteType, false)
    ])

    subject = new TupleType(heading).defaultName()

    it 'should be the default name', ->
      subject.should.equal "{a: Byte, b :? Byte}"
