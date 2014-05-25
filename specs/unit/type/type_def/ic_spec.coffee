TypeDef   = require '../../../../src/finitio/type/type_def'
should    = require 'should'
{intType} = require '../../../spec_helpers'

describe "TypeDef's information contract", ->

  info = {
    name: "Int"
    type: intType
    metadata: {foo: 'bar'}
  }
  type = TypeDef.info(info)

  it 'dresses as expected', ->
    should(type).be.an.instanceof(TypeDef)
    should(type.name).equal("Int")
    should(type.type).equal(intType)
    should(type.metadata).eql({foo: 'bar'})

  it 'undresses as expected', ->
    should(type.toInfo()).eql(info)
