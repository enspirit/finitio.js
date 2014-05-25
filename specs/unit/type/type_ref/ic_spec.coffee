TypeRef = require '../../../../src/finitio/type/type_ref'
should  = require 'should'

describe "TypeRef's information contract", ->

  info = {
    typeName: "Int"
    metadata: {foo: 'bar'}
  }
  type = TypeRef.info(info)

  it 'dresses as expected', ->
    should(type).be.an.instanceof(TypeRef)
    should(type.typeName).equal("Int")
    should(type.metadata).eql({foo: 'bar'})

  it 'undresses as expected', ->
    should(type.toInfo()).eql(info)
