StructType = require '../../../../src/finitio/type/struct_type'
should     = require 'should'
{intType}  = require '../../../spec_helpers'

describe "StructType's information contract", ->

  info = {
    name: 'Foo',
    componentTypes: [intType]
    metadata: {foo: 'bar'}
  }
  t = StructType.info(info)

  it 'dresses as expected', ->
    should(t).be.an.instanceof(StructType)
    should(t.name).eql('Foo')
    should(t.componentTypes).eql([intType])
    should(t.metadata).eql({ foo: "bar" })

  it 'undresses as expected', ->
    should(t.toInfo()).eql(info)
