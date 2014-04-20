Attribute         = require '../../../../src/support/attribute'
Heading           = require '../../../../src/support/heading'
MultiTupleType    = require '../../../../src/type/multi_tuple_type'
{TypeError}       = require '../../../../src/errors'
should            = require 'should'
{intType}         = require '../../../spec_helpers'

describe "MultiTupleType#equality", ->

  h1 = new Heading([new Attribute('r', intType, false), new Attribute('b', intType)])
  h2 = new Heading([new Attribute('b', intType), new Attribute('r', intType, false)])
  h3 = new Heading([new Attribute('b', intType)])

  type1 = new MultiTupleType(h1)
  type2 = new MultiTupleType(h2)
  type3 = new MultiTupleType(h3)

  it 'should apply structural equality', ->
    type1.equals(type2).should.be.true
    type2.equals(type1).should.be.true

  it 'should apply distinguish different types', ->
    type1.equals(type3).should.be.false
    type2.equals(type3).should.be.false

  it 'should be a total function, with nil for non types', ->
    type1.equals(12).should.be.false
