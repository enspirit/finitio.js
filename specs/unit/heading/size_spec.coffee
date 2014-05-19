Attribute = require '../../../src/finitio/support/attribute'
Heading   = require '../../../src/finitio/support/heading'
should    = require 'should'
{intType} = require '../../spec_helpers'

describe "Heading#size", ->

  r = new Attribute('red', intType)
  g = new Attribute('green', intType)
  b = new Attribute('blue', intType)

  describe 'on an empty heading', ->
    heading = new Heading([])
    heading.size().should.equal(0)

  describe 'on an singleton heading', ->
    heading = new Heading([r])
    heading.size().should.equal(1)

  describe 'on an big heading', ->
    heading = new Heading([r, g, b])
    heading.size().should.equal(3)
