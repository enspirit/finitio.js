StructType = require '../../../../src/finitio/type/struct_type'
should     = require 'should'
{intType}  = require '../../../spec_helpers'

describe "StructType's information contract", ->

  info = {
    componentTypes: [intType]
    metadata: {foo: 'bar'}
  }
  t = StructType.info(info)

  it 'dresses as expected', ->
    should(t).be.an.instanceof(StructType)
    should(t.componentTypes).eql([intType])
    should(t.metadata).eql({ foo: "bar" })

  it 'undresses as expected', ->
    should(t.toInfo()).eql(info)
