Type        = require '../../../src/finitio/type'
BuiltinType = require '../../../src/finitio/type/builtin_type'
should      = require 'should'

describe "Type's information contract", ->

  info = {
    builtin: BuiltinType.info({
      jsType: Date,
      metadata: { foo: 'bar' }
    })
  }
  type = Type.factor(info)

  it 'dresses as expected', ->
    should(type).be.an.instanceof(BuiltinType)
    should(type.jsType).equal(Date)
    should(type.metadata).eql({foo: 'bar'})

  it 'undresses as expected', ->
    should(type.toFactor()).eql(info)
