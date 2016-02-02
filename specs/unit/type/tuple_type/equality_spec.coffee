Attribute         = require '../../../../src/finitio/support/attribute'
Heading           = require '../../../../src/finitio/support/heading'
TupleType         = require '../../../../src/finitio/type/tuple_type'
{TypeError}       = require '../../../../src/finitio/errors'
should            = require 'should'
{intType}         = require '../../../spec_helpers'

describe "TupleType#equality", ->

  maybe_r = new Attribute('r', intType, false)
  b = new Attribute('b', intType)

  h1 = new Heading([maybe_r, b])
  h2 = new Heading([b, maybe_r])
  h3 = new Heading([b])

  type1 = new TupleType(h1)
  type2 = new TupleType(h2)
  type3 = new TupleType(h3)

  it 'should apply structural equality', ->
    type1.equals(type2).should.equal(true)
    type2.equals(type1).should.equal(true)

  it 'should apply distinguish different types', ->
    type1.equals(type3).should.equal(false)
    type2.equals(type3).should.equal(false)

  it 'should be a total function, with nil for non types', ->
    type1.equals(12).should.equal(false)
