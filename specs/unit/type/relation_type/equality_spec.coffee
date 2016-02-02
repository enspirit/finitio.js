Attribute          = require '../../../../src/finitio/support/attribute'
Heading            = require '../../../../src/finitio/support/heading'
RelationType       = require '../../../../src/finitio/type/relation_type'
{intType}          = require '../../../spec_helpers'
should             = require 'should'

describe "RelationType#equality", ->

  r       = new Attribute('r', intType)
  b       = new Attribute('b', intType)
  maybe_b = new Attribute('b', intType, false)

  h1 = new Heading([r, maybe_b])
  h2 = new Heading([maybe_b, r])
  h3 = new Heading([b])
  h4 = new Heading([b, r])

  type1 = new RelationType(h1)
  type2 = new RelationType(h2)
  type3 = new RelationType(h3)
  type4 = new RelationType(h4)

  it 'should apply structural equality', ->
    type1.equals(type2).should.equal(true)
    type2.equals(type1).should.equal(true)

  it 'should apply distinguish different types', ->
    type1.equals(type3).should.equal(false)
    type2.equals(type3).should.equal(false)
    type1.equals(type4).should.equal(false)

  it 'should be a total function, with false for non types', ->
    type1.equals(12).should.equal(false)