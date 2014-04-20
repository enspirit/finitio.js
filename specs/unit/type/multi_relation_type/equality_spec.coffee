Attribute          = require '../../../../src/support/attribute'
Heading            = require '../../../../src/support/heading'
MultiRelationType  = require '../../../../src/type/multi_relation_type'
{intType}          = require '../../../spec_helpers'
should             = require 'should'

describe "MultiRelationType#equality", ->

  h1 = new Heading([new Attribute('r', intType), new Attribute('b', intType, false)])
  h2 = new Heading([new Attribute('b', intType, false), new Attribute('r', intType)])
  h3 = new Heading([new Attribute('b', intType)])
  h4 = new Heading([new Attribute('b', intType), new Attribute('r', intType)])

  type1 = new MultiRelationType(h1)
  type2 = new MultiRelationType(h2)
  type3 = new MultiRelationType(h3)
  type4 = new MultiRelationType(h4)

  it 'should apply structural equality', ->
    type1.equals(type2).should.be.true
    type2.equals(type1).should.be.true

  it 'should apply distinguish different types', ->
    type1.equals(type3).should.be.false
    type2.equals(type3).should.be.false
    type1.equals(type4).should.be.false

  it 'should be a total function, with false for non types', ->
    type1.equals(12).should.equal(false)