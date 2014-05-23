SetType   = require '../../../../src/finitio/type/set_type'
should    = require 'should'
{intType} = require '../../../spec_helpers'

describe "SetType's information contract", ->

  info = {
    name: 'Foo',
    elmType: intType
    metadata: {foo: 'bar'}
  }
  t = SetType.info(info)

  it 'dresses as expected', ->
    should(t).be.an.instanceof(SetType)
    should(t.name).eql('Foo')
    should(t.elmType).equal(intType)
    should(t.metadata).eql({ foo: "bar" })

  it 'undresses as expected', ->
    should(t.toInfo()).eql(info)
