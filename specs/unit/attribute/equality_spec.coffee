Attribute = require '../../../lib/support/attribute'
should    = require 'should'

describe "Attribute#equality", ->

  attr1 = new Attribute('red', intType)
  attr2 = new Attribute('red', intType)
  attr3 = new Attribute('blue', intType)

  it 'should apply structural equality', ->
    attr1.equals(attr2).should.be.true

  it 'should distinguish different attributes', ->
    attr1.equals(attr3).should.be.false

  it 'should return null if not equal', ->
    should.equal(attr1.equals(12), null)