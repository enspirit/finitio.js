SeqType         = require '../../../../lib/type/seq_type'
should          = require 'should'

describe "SeqType#defaultName", ->

  type = new SeqType(intType, "foo")
  subject = type.defaultName()
  subject.should.equal('[intType]')
