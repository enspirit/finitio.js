Attribute     = require '../../../../src/support/attribute'
Heading       = require '../../../../src/support/heading'
RelationType  = require '../../../../src/type/relation_type'
{intType}     = require '../../../spec_helpers'
{ArgumentError} = require '../../../../src/errors'

should      = require 'should'

describe "RelationType#initialize", ->

  heading = new Heading([new Attribute('a', intType)])

  describe 'with a valid heading', ->
    subject = new RelationType(heading)

    subject.should.be.an.instanceof(RelationType)

  describe 'with an invalid heading', ->
    lambda = ->
      try
        new RelationType("foo", "bar")
      catch e
        e

    it 'should raise an error', ->
      e = lambda()
      e.should.be.an.instanceof(ArgumentError)
      e.message.should.equal("Heading expected, got String")
