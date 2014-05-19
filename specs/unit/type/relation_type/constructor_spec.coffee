Attribute    = require '../../../../src/finitio/support/attribute'
Heading      = require '../../../../src/finitio/support/heading'
RelationType = require '../../../../src/finitio/type/relation_type'
{intType}    = require '../../../spec_helpers'
should       = require 'should'

describe 'RelationType#constructor', ->

  heading = new Heading([
      new Attribute('a', intType),
      new Attribute('b', intType, false)
    ])

  context 'with a valid heading', ->
    subject = new RelationType(heading)

    it 'should be a RelationType', ->
      subject.should.be.an.instanceof(RelationType)

  context 'with an invalid heading', ->
    lambda = ->
      try
        new RelationType("foo", "bar")
      catch e
        e

    it 'should raise an error', ->
      e = lambda()
      e.message.should.equal('Heading expected, got: foo')