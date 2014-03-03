Attribute   = require '../../../../lib/support/attribute'
Heading     = require '../../../../lib/support/heading'
TupleType   = require '../../../../lib/type/tuple_type'
{TypeError} = require '../../../../lib/errors'
should      = require 'should'

describe "TupleType#defaultName", ->

  heading = new Heading([new Attribute('a', byteType)])

  subject = new TupleType(heading).defaultName()

  subject.should.equal("{a: Byte}")
