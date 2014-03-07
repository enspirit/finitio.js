SetType         = require '../../../../lib/type/set_type'
{ArgumentError,
TypeError}      = require '../../../../lib/errors'
_               = require 'underscore'
should          = require 'should'
{intType,
floatType}      = require '../../../spec_helpers'

describe "SetType#equality", ->

  type  = new SetType(intType)
  type2 = new SetType(intType)
  type3 = new SetType(floatType)

  it 'should apply structural equality', ->
    type.equals(type2).should.be.true

  it 'should apply distinguish different types', ->
    type.equals(type3).should.be.false

  it 'should be a total function, with false for non types', ->
    type.equals(12).should.be.false
