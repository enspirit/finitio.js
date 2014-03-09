SeqType         = require '../../../../src/type/seq_type'
should          = require 'should'
{intType}       = require '../../../spec_helpers'

describe "SeqType#defaultName", ->

  type = new SeqType(intType, "foo")
  subject = type.defaultName()
  subject.should.equal('[intType]')
