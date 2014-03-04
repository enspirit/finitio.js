Attribute = require '../../../lib/support/attribute'
Heading   = require '../../../lib/support/heading'
should    = require 'should'

describe "Heading#equality", ->

  h1 = new Heading([new Attribute('r', intType), new Attribute('b', intType)])
  h2 = new Heading([new Attribute('b', intType), new Attribute('r', intType)])
  h3 = new Heading([new Attribute('b', intType)])

  it 'should apply structural equality', ->
    h1.equals(h2).should.be.true
    h2.equals(h1).should.be.true

  it 'should apply distinguish different types', ->
    h1.equals(h3).should.be.false
    h2.equals(h3).should.be.false

  it 'should be a total function, with null for non types', ->
    should.equal(h1.equals(12), null)
