SubType  = require '../../../../lib/type/sub_type'
should   = require 'should'

describe 'SubType#equals', ->

  c1 = (i) -> i > 0
  c2 = (i) -> i < 255

  type  = new SubType(numType, default: c1)
  type2 = new SubType(numType, default: c1)
  type3 = new SubType(numType, another_name: c1)
  type4 = new SubType(numType, default: c2)
  type5 = new SubType(stringType, default: c1)

  it 'should apply structural equality', ->
    type.equals(type2).should.be.true
    type.equals(type3).should.be.true

  it 'should apply distinguish different types', ->
    type.equals(type4).should.be.false
    type.equals(type5).should.be.false

  it 'should be a total function, with null for non types', ->
    type.equals(12).should.be.false
