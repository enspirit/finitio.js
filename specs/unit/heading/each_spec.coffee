Attribute = require '../../../lib/support/attribute'
Heading   = require '../../../lib/support/heading'
should    = require 'should'
_         = require 'underscore'
{intType} = require '../../spec_helpers'

describe "Heading#each", ->

  a = new Attribute('a', intType)
  b = new Attribute('b', intType)
  h = new Heading([a, b])

  describe 'without a block', ->

    it 'should be a function', ->
      h.each.should.be.a.function

  describe 'with a callback', ->

    it 'should call with each attribute in turn', ->
      seen = []
      h.each (attr) ->
        seen.push(attr)
      _.isEqual(seen, [a, b]).should.be.true
