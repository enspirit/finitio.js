Attribute     = require '../../../../lib/support/attribute'
Heading       = require '../../../../lib/support/heading'
RelationType  = require '../../../../lib/type/relation_type'

{ArgumentError} = require '../../../../lib/errors'

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
