Attribute  = require '../../../../src/finitio/support/attribute'
Heading    = require '../../../../src/finitio/support/heading'
TupleType  = require '../../../../src/finitio/type/tuple_type'
should     = require 'should'
{byteType} = require '../../../spec_helpers'

describe "TupleType#defaultName", ->

    heading = new Heading([
      new Attribute('a', byteType, true),
      new Attribute('b', byteType, false)
    ])

    subject = new TupleType(heading).defaultName()

    it 'should be the default name', ->
      subject.should.equal "{a: Byte, b :? Byte}"
