UnionType = require '../../../../src/finitio/type/union_type'
should    = require 'should'
{intType,
floatType}  = require '../../../spec_helpers'

describe "UnionType#name", ->

  describe 'when not provided', ->
    type = new UnionType([intType, floatType])
    type.name.should.equal('intType|floatType')

  describe 'when provided', ->
    type = new UnionType([intType, floatType], "union")
    type.name.should.equal('union')
