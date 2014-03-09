Attribute     = require '../../../../src/support/attribute'
Heading       = require '../../../../src/support/heading'
RelationType  = require '../../../../src/type/relation_type'
{intType}     = require '../../../spec_helpers'
should        = require 'should'

describe "RelationType#equality", ->

  h1 = new Heading([new Attribute('r', intType), new Attribute('b', intType)])
  h2 = new Heading([new Attribute('b', intType), new Attribute('r', intType)])
  h3 = new Heading([new Attribute('b', intType)])

  type1 = new RelationType(h1)
  type2 = new RelationType(h2)
  type3 = new RelationType(h3)

  it 'should apply structural equality', ->
    type1.equals(type2).should.be.true
    type2.equals(type1).should.be.true

  it 'should apply distinguish different types', ->
    type1.equals(type3).should.be.false
    type2.equals(type3).should.be.false

  it 'should be a total function, with null for non types', ->
    type1.equals(12).should.be.false
