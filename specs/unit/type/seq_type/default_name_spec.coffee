SeqType         = require '../../../../src/finitio/type/seq_type'
should          = require 'should'
{intType}       = require '../../../spec_helpers'

describe "SeqType#defaultName", ->

  it 'returns the expected', ->
    type = new SeqType(intType, "foo")
    should(type.defaultName()).equal('[intType]')
