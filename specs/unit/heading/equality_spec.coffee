Attribute = require '../../../src/finitio/support/attribute'
Heading   = require '../../../src/finitio/support/heading'
BuiltinType = require '../../../src/finitio/type/builtin_type'
should      = require 'should'
{intType}   = require '../../spec_helpers'

describe "Heading#equality", ->

  r = new Attribute('r', intType)
  g = new Attribute('g', intType)
  b = new Attribute('b', intType)
  a = new Attribute('a', intType)

  h1 = new Heading([r, g, b])
  h2 = new Heading([r, b, g])
  h3 = new Heading([r, b])
  h4 = new Heading([r, b, a])

  it 'should apply structural equality', ->
    h1.equals(h2).should.equal(true)
    h2.equals(h1).should.equal(true)

  it 'should distinguish different types', ->
    h1.equals(h3).should.equal(false)
    h1.equals(h4).should.equal(false)

  it 'should be a total function, with null for non types', ->
    h1.equals(12).should.equal(false)

  it 'should distinguish between extra allowance', ->
    no_extra = new Heading([r], allowExtra: false)
    extra    = new Heading([r], allowExtra: true)
    extra.equals(no_extra).should.equal(false)

