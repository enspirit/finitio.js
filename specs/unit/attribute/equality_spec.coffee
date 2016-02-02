Attribute   = require '../../../src/finitio/support/attribute'
BuiltinType = require '../../../src/finitio/type/builtin_type'
should      = require 'should'

describe "Attribute#equality", ->

  attr1 = new Attribute('red',  new BuiltinType(Number))
  attr2 = new Attribute('red',  new BuiltinType(Number))
  attr3 = new Attribute('blue', new BuiltinType(Number))

  it 'should apply structural equality', ->
    attr1.equals(attr2).should.equal(true)

  it 'should distinguish different attributes', ->
    attr1.equals(attr3).should.equal(false)

  it 'should false against non Attribute', ->
    attr1.equals(12).should.equal(false)
