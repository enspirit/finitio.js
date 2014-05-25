BuiltinType = require '../../../../src/finitio/type/builtin_type'
should      = require 'should'

describe "BuiltinType's information contract", ->

  info = {
    jsType: Date,
    metadata: { foo: 'bar' }
  }
  type = BuiltinType.info(info)

  it 'dresses as expected', ->
    should(type).be.an.instanceof(BuiltinType)
    should(type.jsType).equal(Date)
    should(type.metadata).eql({foo: 'bar'})

  it 'undresses as expected', ->
    should(type.toInfo()).eql(info)
