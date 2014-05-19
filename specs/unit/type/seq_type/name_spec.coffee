SeqType   = require '../../../../src/finitio/type/seq_type'
_         = require 'underscore'
should    = require 'should'
{intType} = require '../../../spec_helpers'

describe "SeqType#name", ->

  it 'when not specified', ->
    type = new SeqType(intType)

    type.name.should.equal('[intType]')

  it 'when specified', ->
    type = new SeqType(intType, "foo")

    type.name.should.equal('foo')
