SeqType   = require '../../../../src/finitio/type/seq_type'
_         = require 'underscore'
should    = require 'should'
{intType} = require '../../../spec_helpers'

describe "SeqType#include", ->

  type = new SeqType(intType)

  subject = (arg) -> type.include(arg)

  it 'when included on empty array', ->
    subject([]).should.be.true

  it 'when included on non empty array', ->
    subject([12]).should.be.true

  it 'when not an array', ->
    subject({}).should.be.false

  it 'when an array with non ints', ->
    subject([12, "foo"]).should.be.false
