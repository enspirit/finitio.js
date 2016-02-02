SeqType    = require '../../../../src/finitio/type/seq_type'
_          = require 'underscore'
should     = require 'should'
{intType,
floatType} = require '../../../spec_helpers'

describe "SeqType#equality", ->

  type  = new SeqType(intType)
  type2 = new SeqType(intType)
  type3 = new SeqType(floatType)

  it 'should apply structural equality', ->
    type.equals(type2).should.equal(true)

  it 'should apply distinguish different types', ->
    type.equals(type3).should.equal(false)

  it 'should be a total function, with false for non types', ->
    type.equals(12).should.equal(false)
