UnionType = require '../../../../src/finitio/type/union_type'
should    = require 'should'
{intType} = require '../../../spec_helpers'

describe "UnionType's information contract", ->

  info = {
    candidates: [intType]
    metadata: {foo: 'bar'}
  }
  t = UnionType.info(info)

  it 'dresses as expected', ->
    should(t).be.an.instanceof(UnionType)
    should(t.candidates).eql([intType])
    should(t.metadata).eql({ foo: "bar" })

  it 'undresses as expected', ->
    should(t.toInfo()).eql(info)
