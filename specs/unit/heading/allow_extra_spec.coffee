Attribute           = require '../../../src/finitio/support/attribute'
Heading             = require '../../../src/finitio/support/heading'
should              = require 'should'
_                   = require 'underscore'
{anyType, intType}  = require '../../spec_helpers'

describe 'Heading#allowExtra', ->

  r = new Attribute('r', intType)

  heading = (attributes, options) ->
    new Heading(attributes, options)

  it 'is false by default', ->
    h = heading([r])
    h.allowExtra().should.equal(false)

  it 'is false by default, given Any', ->
    h = heading([r])
    h.allowExtra(anyType).should.equal(false)

  it 'can be set to a type', ->
    h = heading([r], allowExtra: anyType)
    h.allowExtra().should.equal(true)

  it 'can be set to false explicitely', ->
    h = heading([r], allowExtra: false)
    h.allowExtra().should.equal(false)

  it 'is true if type is set and no type given', ->
    h = heading([r], allowExtra: intType)
    h.allowExtra().should.equal(true)

  it 'is false if type is set and wrong type given', ->
    h = heading([r], allowExtra: intType)
    h.allowExtra(anyType).should.equal(false)

  it 'is true if type is set and correct type given', ->
    h = heading([r], allowExtra: intType)
    h.allowExtra(intType).should.equal(true)

  it 'is true if type is set and subtype given', ->
    h = heading([r], allowExtra: anyType)
    h.allowExtra(intType).should.equal(true)
