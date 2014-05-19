StructType  = require '../../../../src/finitio/type/struct_type'
_           = require 'underscore'
should      = require 'should'
{intType,
floatType}  = require '../../../spec_helpers'


type1 = new StructType([intType, floatType])
type2 = new StructType([intType, floatType])

type2.equals(type1)

describe "StructType#equality", ->

  type1 = new StructType([intType, floatType])
  type2 = new StructType([intType, floatType])
  type3 = new StructType([floatType, intType])

  it 'should apply structural equality', ->
    type1.equals(type2).should.be.true
    type2.equals(type1).should.be.true

  it 'should apply distinguish different types', ->
    type1.equals(type3).should.be.false
    type2.equals(type3).should.be.false

  it 'should be a total function, with nil for non types', ->
    type1.equals(12).should.be.false