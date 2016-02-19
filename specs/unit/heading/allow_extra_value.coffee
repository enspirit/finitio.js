Attribute           = require '../../../src/finitio/support/attribute'
Heading             = require '../../../src/finitio/support/heading'
should              = require 'should'
_                   = require 'underscore'
{anyType, intType}  = require '../../spec_helpers'

describe 'Heading#allowExtraValue', ->

  r = new Attribute('r', intType)

  heading = (attributes, options) ->
    new Heading(attributes, options)

  it 'is false by default', ->
    h = heading([r])
    h.allowExtraValue().should.equal(false)

  it 'is false by default, given any value', ->
    h = heading([r])
    h.allowExtraValue(12).should.equal(false)
    h.allowExtraValue(12.2).should.equal(false)
    h.allowExtraValue("12").should.equal(false)

  it 'is true if type is set and no value given', ->
    h = heading([r], allowExtra: intType)
    h.allowExtraValue().should.equal(true)

  it 'is false if type is set and wrong value given', ->
    h = heading([r], allowExtra: intType)
    h.allowExtraValue("foo").should.equal(false)

  it 'is true if type is set and correct type given', ->
    h = heading([r], allowExtra: intType)
    h.allowExtraValue(12).should.equal(true)

  it 'is true if type is set and subtype given', ->
    h = heading([r], allowExtra: anyType)
    h.allowExtraValue(12).should.equal(true)
