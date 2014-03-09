Attribute   = require '../../../src/support/attribute'
BuiltinType = require '../../../src/type/builtin_type'
should      = require 'should'

describe "Attribute#equality", ->

  attr1 = new Attribute('red',  new BuiltinType(Number))
  attr2 = new Attribute('red',  new BuiltinType(Number))
  attr3 = new Attribute('blue', new BuiltinType(Number))

  it 'should apply structural equality', ->
    attr1.equals(attr2).should.be.true

  it 'should distinguish different attributes', ->
    attr1.equals(attr3).should.be.false

  it 'should return null if not equal', ->
    should.equal(attr1.equals(12), null)
