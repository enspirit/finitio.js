Attribute       = require '../../../lib/support/attribute'
Heading         = require '../../../lib/support/heading'
{ArgumentError} = require '../../../lib/errors'
should          = require 'should'

describe "Heading#constructor", ->

  subject = (attributes) -> new Heading(attributes)

  describe 'with no attribute', ->
    subject([]).should.be.an.instanceof Heading

  describe 'with valid attributes', ->
    attrs = [ new Attribute('red', intType) ]
    subject(attrs).should.be.an.instanceof Heading

  describe 'with invalid attributes', ->
    attributes = [ 
        new Attribute('red', intType), 
        new Attribute('red', intType) 
      ]
    
    lambda = -> subject(attributes)

    it 'should raise an error', ->
      expect(lambda).toThrow()
      try
        lambda()
      catch e
        e.should.be.an.instanceof ArgumentError
        e.message.should.equal("Attribute names must be unique")
