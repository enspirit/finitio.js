Attribute   = require '../../../src/support/attribute'
Heading     = require '../../../src/support/heading'
BuiltinType = require '../../../src/type/builtin_type'
should      = require 'should'
{intType}   = require '../../spec_helpers'

describe "Heading#multi", ->

  red        = new Attribute('red', intType)
  blue       = new Attribute('blue', intType)
  maybe_blue = new Attribute('blue', intType, false)

  subject = (attributes, options) ->
    new Heading(attributes, options).multi()

  describe 'with no attribute', ->

    it 'should be false', ->
      subject([]).should.be.false

  describe 'with required attributes only', ->

    it 'should be false', ->
      subject([red, blue]).should.be.false

  describe 'with some optional attributes', ->

    it 'should be true', ->
      subject([red, maybe_blue]).should.be.true

  describe 'with allowExtra set to true', ->

    it 'should be false', ->
      subject([red, blue], {allowExtra: true}).should.be.true
