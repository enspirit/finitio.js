Attribute   = require '../../../lib/support/attribute'
Heading     = require '../../../lib/support/heading'
BuiltinType = require '../../../lib/type/builtin_type'
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
    h1.equals(h2).should.be.true
    h2.equals(h1).should.be.true

  it 'should distinguish different types', ->
    h1.equals(h3).should.be.false
    h1.equals(h4).should.be.false

  it 'should be a total function, with null for non types', ->
    should.equal(h1.equals(12), null)
