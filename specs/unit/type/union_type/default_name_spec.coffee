UnionType = require '../../../../lib/type/union_type'
should    = require 'should'

describe "UnionType#defaultName", ->

  # Let's reinvent JS' Number, shall we?
  type = new UnionType([intType, floatType])

  type.defaultName().should.equal('intType|floatType')
