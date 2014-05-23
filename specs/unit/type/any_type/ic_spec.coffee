AnyType   = require '../../../../src/finitio/type/any_type'
should    = require 'should'
{intType} = require '../../../spec_helpers'

describe "AnyType's information contract", ->

  context 'unnamed', ->
    info = {
      metadata: {foo: 'bar'}
    }
    t = AnyType.info(info)

    it 'dresses as expected', ->
      should(t).be.an.instanceof(AnyType)
      should(t.metadata).eql({ foo: "bar" })

    it 'undresses as expected', ->
      should(t.toInfo()).eql(info)

  context 'named', ->
    info = {
      name: 'Foo',
      metadata: {foo: 'bar'}
    }
    t = AnyType.info(info)

    it 'dresses as expected', ->
      should(t).be.an.instanceof(AnyType)
      should(t.name).eql('Foo')
      should(t.metadata).eql({ foo: "bar" })

    it 'undresses as expected', ->
      should(t.toInfo()).eql(info)
