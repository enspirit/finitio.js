SeqType         = require '../../../../lib/type/seq_type'
{ArgumentError,
TypeError}      = require '../../../../lib/errors'
_               = require 'underscore'
should          = require 'should'
{intType,
floatType}      = require '../../../spec_helpers'

describe "SeqType#equality", ->

  type  = new SeqType(intType)
  type2 = new SeqType(intType)
  type3 = new SeqType(floatType)

  it 'should apply structural equality', ->
    type.equals(type2).should.be.true

  it 'should apply distinguish different types', ->
    type.equals(type3).should.be.false

  it 'should be a total function, with false for non types', ->
    type.equals(12).should.be.false
