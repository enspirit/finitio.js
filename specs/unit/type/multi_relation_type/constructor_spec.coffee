Attribute          = require '../../../../src/support/attribute'
Heading            = require '../../../../src/support/heading'
MultiRelationType  = require '../../../../src/type/multi_relation_type'
{intType}          = require '../../../spec_helpers'

describe 'MultiRelationType#constructor', ->

  heading = new Heading([
      new Attribute('a', intType),
      new Attribute('b', intType, false)
    ])

  context 'with a valid heading', ->
    subject = new MultiRelationType(heading)

    it 'should be a MultiRelationType', ->
      subject.should.be.an.instanceof(MultiRelationType)

  context 'with an invalid heading', ->
    lambda = ->
      try
        new MultiRelationType("foo", "bar")
      catch e
        e

    it 'should raise an error', ->
      e = lambda()
      e.should.be.an.instanceof(ArgumentError)
      e.message.should.equal('Heading expected, got `foo`')