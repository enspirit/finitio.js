Attribute = require '../../../src/finitio/support/attribute'
Heading   = require '../../../src/finitio/support/heading'
should    = require 'should'
{intType} = require '../../spec_helpers'

describe "Heading#fetch", ->

  r = new Attribute('red', intType)
  g = new Attribute('green', intType)
  b = new Attribute('blue', intType)
  h = new Heading([r, g, b])

  it 'on works on an existing attribute', ->
    should(h.fetch('red')).equal(r)

  it 'yields the block when missing', ->
    got = h.fetch 'none', ()-> 12
    should(got).equal(12)

  it 'throws when no missing handler', ->
    l = ()-> h.fetch 'r'
    should(l).throw("No such attribute `r`")
