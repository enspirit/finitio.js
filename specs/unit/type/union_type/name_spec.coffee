UnionType = require '../../../../lib/type/union_type'
should    = require 'should'

describe "UnionType#name", ->

  describe 'when not provided', ->
    type = new UnionType([intType, floatType])
    type.name.should.equal('intType|floatType')

  describe 'when provided', ->
    type = new UnionType([intType, floatType], "union")
    type.name.should.equal('union')
