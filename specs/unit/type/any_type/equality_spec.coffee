AnyType = require '../../../../lib/type/any_type'
should  = require 'should'

describe 'AnyType#equals', ->

  anyType1  = new AnyType()
  anyType2  = new AnyType()

  it 'should apply structural equality', ->
    anyType1.equals(anyType2).should.be.true

  it 'should be a total function, with null for non types', ->
    anyType1.equals(12).should.be.false
