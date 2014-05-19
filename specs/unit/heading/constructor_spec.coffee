Attribute = require '../../../src/finitio/support/attribute'
Heading   = require '../../../src/finitio/support/heading'
should     = require 'should'
{intType}  = require '../../spec_helpers'

describe "Heading#constructor", ->

  subject = (attributes) -> new Heading(attributes)

  it 'with no attribute', ->
    subject([]).should.be.an.instanceof Heading

  it 'with valid attributes', ->
    attrs = [ new Attribute('red', intType) ]
    subject(attrs).should.be.an.instanceof Heading

  describe 'with invalid attributes', ->
    attributes = [
        new Attribute('red', intType),
        new Attribute('red', intType)
      ]

    lambda = -> subject(attributes)

    it 'should raise an error', ->
      should(lambda).throw()
      try
        lambda()
        true.should.equal(false)
      catch e
        e.message.should.equal("Attribute names must be unique")
