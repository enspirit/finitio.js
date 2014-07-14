AnyType   = require '../../../../src/finitio/type/any_type'
UnionType = require '../../../../src/finitio/type/union_type'
should    = require 'should'

describe "UnionType#include", ->

  type = new UnionType([new AnyType(), new AnyType()])

  it 'works', ->
    should(type.toString()).equal('.|.')
