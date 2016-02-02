BuiltinType = require '../../../../src/finitio/type/builtin_type'
should      = require 'should'

describe 'BuiltinType#equals', ->

  numType  = new BuiltinType(Number)
  numType2 = new BuiltinType(Number)
  strType  = new BuiltinType(String)

  it 'should apply structural equality', ->
    numType.equals(numType2).should.equal(true)

  it 'should apply distinguish different types', ->
    numType.equals(strType).should.equal(false)

  it 'should be a total function, with null for non types', ->
    numType.equals(12).should.equal(false)
