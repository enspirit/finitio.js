UnionType = require '../../../../lib/type/union_type'
should    = require 'should'

describe "UnionType#equality", ->

  uType  = new UnionType([intType, floatType])
  uType2 = new UnionType([floatType, intType])
  uType3 = new UnionType([floatType, intType])
  uType4 = new UnionType([intType])

  it 'should apply structural equality', ->
    uType.equals(uType2).should.be.true
    uType.equals(uType3).should.be.true
    uType2.equals(uType3).should.be.true
  
  it 'should apply distinguish different types', ->
    uType.equals(uType4).should.be.false
    uType.equals(intType).should.be.false

  it 'should be a total function, with nil for non types', ->
    uType.equals(12).should.be.false