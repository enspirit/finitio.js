UnionType   = require '../../../../src/finitio/type/union_type'
should      = require 'should'
{intType,
floatType}  = require '../../../spec_helpers'

describe "UnionType#defaultName", ->

  it 'works', ->
    type = new UnionType([intType, floatType])
    type.defaultName().should.equal('intType|floatType')
